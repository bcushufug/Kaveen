/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import Hls from "hls.js";
import { PLAYLIST_CHANNELS, SafeChannel } from "./channelData.ts";
import { getChannelPrograms, ProgramItem } from "./catchupData.ts";
import InfinixNeonLogo from "./components/InfinixNeonLogo.tsx";
import {
  Home,
  Star,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Clock,
  RefreshCw,
  Search,
  X,
  TvMinimalPlay,
  Check
} from "lucide-react";

export default function App() {
  // Splash Screen State
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [splashFade, setSplashFade] = useState<boolean>(false);

  // Bottom Navigation Tab State: 'home' | 'favourite'
  const [activeTab, setActiveTab] = useState<"home" | "favourite">("home");

  // Channels state
  const [channels] = useState<SafeChannel[]>(PLAYLIST_CHANNELS);
  // CRITICAL: On initial load, DO NOT autoplay! currentChannel is null until user clicks a channel!
  const [currentChannel, setCurrentChannel] = useState<SafeChannel | null>(null);
  const [failedLogos, setFailedLogos] = useState<Set<string | number>>(new Set());
  const [failedThumbs, setFailedThumbs] = useState<Set<string>>(new Set());

  // Real EPG data from API
  const [channelEpg, setChannelEpg] = useState<{
    today: ProgramItem[];
    yesterday: ProgramItem[];
    twoDaysAgo: ProgramItem[];
    upcoming: ProgramItem[];
  } | null>(null);
  const [isLoadingEpg, setIsLoadingEpg] = useState<boolean>(false);

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<Set<string | number>>(() => {
    try {
      const saved = localStorage.getItem("infinix_fav_ids");
      if (saved) return new Set(JSON.parse(saved));
    } catch {
      // ignore
    }
    return new Set<string | number>(["1", "2", "4"]);
  });

  // Catchup & Program state
  const [selectedDay, setSelectedDay] = useState<"today" | "yesterday" | "twoDaysAgo" | "upcoming">("today");
  const [activeCatchupProgram, setActiveCatchupProgram] = useState<ProgramItem | null>(null);
  const [isCatchupMode, setIsCatchupMode] = useState<boolean>(false);

  // Video playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.9);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(100);
  const [controlsForced, setControlsForced] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoadingStream, setIsLoadingStream] = useState<boolean>(false);

  // Quality selector
  const [qualityOptions] = useState<string[]>(["Auto", "1080p HD", "720p HD", "480p", "360p"]);
  const [selectedQuality, setSelectedQuality] = useState<string>("Auto");
  const [showQualityMenu, setShowQualityMenu] = useState<boolean>(false);

  // Channel browsing
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const screenRef = useRef<HTMLDivElement | null>(null);
  const dashPlayerRef = useRef<any>(null);
  const hlsPlayerRef = useRef<Hls | null>(null);
  const hideControlsTimeout = useRef<any>(null);

  // Suppress third-party stream capability noise from dumping unhandled errors
  useEffect(() => {
    const origError = console.error;
    console.error = (...args: any[]) => {
      const str = args.map(a => (typeof a === "object" ? JSON.stringify(a) : String(a || ""))).join(" ");
      if (str.includes("No streams to play") || str.includes("[Stream]")) {
        return;
      }
      origError.apply(console, args);
    };
    return () => {
      console.error = origError;
    };
  }, []);

  // Splash Screen Timer
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setSplashFade(true);
    }, 1200);

    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 1700);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Save favorites
  useEffect(() => {
    try {
      localStorage.setItem("infinix_fav_ids", JSON.stringify(Array.from(favorites)));
    } catch {
      // ignore
    }
  }, [favorites]);

  const toggleFavorite = (id: string | number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Back to Channels: stops playback and returns to channel list
  const handleBackToChannels = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("src");
      videoRef.current.load();
    }
    if (dashPlayerRef.current) {
      try {
        dashPlayerRef.current.reset();
      } catch {
        // ignore
      }
      dashPlayerRef.current = null;
    }
    if (hlsPlayerRef.current) {
      try {
        hlsPlayerRef.current.destroy();
      } catch {
        // ignore
      }
      hlsPlayerRef.current = null;
    }
    setCurrentChannel(null);
    setIsCatchupMode(false);
    setActiveCatchupProgram(null);
    setIsPlaying(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // User selects a channel to play (ONLY PLAY WHEN CLICKED)
  const handleSelectChannel = (ch: SafeChannel) => {
    setCurrentChannel(ch);
    setIsCatchupMode(false);
    setActiveCatchupProgram(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fetch REAL EPG & Catch-up Programs when currentChannel is set
  useEffect(() => {
    if (!currentChannel) return;
    setIsLoadingEpg(true);

    fetch(`/api/epg/${currentChannel.id}`)
      .then(res => res.json())
      .then(data => {
        setIsLoadingEpg(false);
        if (data && data.success && data.programs) {
          setChannelEpg(data.programs);
        } else {
          const fallback = getChannelPrograms(
            currentChannel.id,
            currentChannel.name,
            currentChannel.category
          );
          setChannelEpg(fallback);
        }
      })
      .catch(() => {
        setIsLoadingEpg(false);
        const fallback = getChannelPrograms(
          currentChannel.id,
          currentChannel.name,
          currentChannel.category
        );
        setChannelEpg(fallback);
      });
  }, [currentChannel]);

  // Current program list for active tab
  const currentProgramList: ProgramItem[] = React.useMemo(() => {
    if (!currentChannel) return [];
    const defaultPrograms = getChannelPrograms(
      currentChannel.id,
      currentChannel.name,
      currentChannel.category
    );

    const activeData = channelEpg || defaultPrograms;

    let list =
      selectedDay === "today"
        ? activeData.today
        : selectedDay === "yesterday"
        ? activeData.yesterday
        : selectedDay === "twoDaysAgo"
        ? activeData.twoDaysAgo
        : activeData.upcoming;

    if (!list || list.length === 0) {
      list =
        selectedDay === "today"
          ? defaultPrograms.today
          : selectedDay === "yesterday"
          ? defaultPrograms.yesterday
          : selectedDay === "twoDaysAgo"
          ? defaultPrograms.twoDaysAgo
          : defaultPrograms.upcoming;
    }

    return list || [];
  }, [channelEpg, currentChannel, selectedDay]);

  // Stream loader (Only executes when currentChannel is chosen)
  useEffect(() => {
    if (!currentChannel) return;
    const video = videoRef.current;
    if (!video) return;

    // Reset any previously running players
    if (dashPlayerRef.current) {
      try {
        dashPlayerRef.current.reset();
      } catch {
        // ignore
      }
      dashPlayerRef.current = null;
    }
    if (hlsPlayerRef.current) {
      try {
        hlsPlayerRef.current.destroy();
      } catch {
        // ignore
      }
      hlsPlayerRef.current = null;
    }

    setIsLoadingStream(true);

    const streamEndpoint =
      isCatchupMode && activeCatchupProgram
        ? `/api/catchup/${currentChannel.id}?start=${(activeCatchupProgram as any).start || ""}&end=${(activeCatchupProgram as any).stop || ""}`
        : `/api/stream/${currentChannel.id}`;

    const playWithHls = (url: string, fallbackUrl?: string) => {
      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 90
        });
        hlsPlayerRef.current = hls;
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setIsLoadingStream(false);
          video.play().then(() => setIsPlaying(true)).catch(() => {
            video.muted = true;
            setIsMuted(true);
            video.play().then(() => setIsPlaying(true)).catch(() => {});
          });
        });
        hls.on(Hls.Events.ERROR, (_event, errorData) => {
          if (errorData.fatal) {
            switch (errorData.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls.recoverMediaError();
                break;
              default:
                hls.destroy();
                hlsPlayerRef.current = null;
                if (fallbackUrl && url !== fallbackUrl) {
                  playWithHls(fallbackUrl);
                } else {
                  setIsLoadingStream(false);
                }
                break;
            }
          }
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = url;
        video.load();
        video.play().then(() => {
          setIsPlaying(true);
          setIsLoadingStream(false);
        }).catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().then(() => setIsPlaying(true)).catch(() => {});
          setIsLoadingStream(false);
        });
      } else {
        video.src = url;
        video.load();
        video.play().then(() => {
          setIsPlaying(true);
          setIsLoadingStream(false);
        }).catch(() => {
          setIsLoadingStream(false);
        });
      }
    };

    fetch(streamEndpoint)
      .then(res => res.json())
      .then(async data => {
        if (!data || !data.url) {
          setIsLoadingStream(false);
          return;
        }

        const targetUrl = data.url;
        const fallbackUrl = data.fallbackUrl || "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

        // Check if DASH stream (.mpd)
        if (targetUrl.toLowerCase().includes(".mpd")) {
          try {
            const dashjsModule = (await import("dashjs")) as any;
            const dashjs = dashjsModule.default || dashjsModule;

            if (dashPlayerRef.current) {
              dashPlayerRef.current.reset();
            }

            const player = dashjs.MediaPlayer().create();
            dashPlayerRef.current = player;

            // Completely silence dash.js console logger to eliminate [Stream] No streams to play
            player.updateSettings({
              debug: {
                logLevel: 0
              }
            });

            if (data.license) {
              player.setProtectionData({
                "com.widevine.alpha": {
                  serverURL: data.license,
                  httpRequestHeaders: {
                    "User-Agent": "viu"
                  }
                }
              });
            }

            player.initialize(video, targetUrl, true);
            player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
              setIsLoadingStream(false);
              video.play().then(() => setIsPlaying(true)).catch(() => {
                video.muted = true;
                setIsMuted(true);
                video.play().then(() => setIsPlaying(true)).catch(() => {});
              });
            });

            player.on(dashjs.MediaPlayer.events.ERROR, () => {
              try {
                player.reset();
              } catch {
                // ignore
              }
              dashPlayerRef.current = null;
              playWithHls(fallbackUrl);
            });
          } catch {
            playWithHls(fallbackUrl);
          }
        } else if (targetUrl.toLowerCase().includes(".mp4")) {
          // Direct MP4 archive video (instant load & seek)
          video.src = targetUrl;
          video.load();
          video.play().then(() => {
            setIsPlaying(true);
            setIsLoadingStream(false);
          }).catch(() => {
            video.muted = true;
            setIsMuted(true);
            video.play().then(() => setIsPlaying(true)).catch(() => {});
            setIsLoadingStream(false);
          });
        } else {
          // HLS stream (.m3u8)
          playWithHls(targetUrl, fallbackUrl);
        }
      })
      .catch(() => {
        playWithHls("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8");
      });

    return () => {
      if (dashPlayerRef.current) {
        try {
          dashPlayerRef.current.reset();
        } catch {
          // ignore
        }
        dashPlayerRef.current = null;
      }
      if (hlsPlayerRef.current) {
        try {
          hlsPlayerRef.current.destroy();
        } catch {
          // ignore
        }
        hlsPlayerRef.current = null;
      }
    };
  }, [currentChannel, isCatchupMode, activeCatchupProgram]);

  // Video time updates
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleUserActivity = () => {
    setControlsForced(true);
    if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
    hideControlsTimeout.current = setTimeout(() => {
      if (isPlaying) {
        setControlsForced(false);
        setShowQualityMenu(false);
      }
    }, 4000);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const seekRelative = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(video.currentTime + seconds, video.duration || 100));
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  // ONLY ONE FULLSCREEN FUNCTION - KEPT CLEAN & ACCESSIBLE
  const toggleFullscreen = async () => {
    const screen = screenRef.current;
    if (!screen) return;

    try {
      if (!document.fullscreenElement) {
        await screen.requestFullscreen();
        setIsFullscreen(true);
        try {
          if ((window.screen as any)?.orientation?.lock) {
            await (window.screen as any).orientation.lock("landscape");
          }
        } catch {
          // ignore
        }
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs) || !isFinite(secs)) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const formatRemainingTime = (curr: number, dur: number) => {
    const rem = Math.max(0, dur - curr);
    return `-${formatTime(rem)}`;
  };

  const handlePlayCatchup = (prog: ProgramItem) => {
    setActiveCatchupProgram(prog);
    setIsCatchupMode(true);
    setCurrentTime(0);
    screenRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleReturnToLive = () => {
    setIsCatchupMode(false);
    setActiveCatchupProgram(null);
  };

  // Categories
  const categories = [
    "All",
    "Local",
    "Sports",
    "News",
    "Movies",
    "Kids",
    "Edutainment",
    "Music",
    "English Entertainment",
    "Hindi Entertainment",
    "Tamil Entertainment",
    "Religious",
    "Education"
  ];

  // Filtering channels
  const filteredChannels = channels.filter(ch => {
    const isFav = favorites.has(ch.id);
    if (activeTab === "favourite" && !isFav) return false;

    const matchesCat =
      activeCategory === "All" ||
      ch.category?.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      ch.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      ch.category.toLowerCase().includes(searchQuery.toLowerCase().trim());

    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#050608] text-[#f7f8fb]">
      {/* 1. APP OPENING SPLASH SCREEN */}
      {showSplash && (
        <div className={`splash-overlay ${splashFade ? "fade-out" : ""}`}>
          <div className="flex flex-col items-center">
            <InfinixNeonLogo size="xl" />
            <div className="splash-spinner"></div>
            <p className="text-xs text-[#00d9ff] font-bold tracking-widest uppercase mt-4 opacity-80">
              Live TV & Catchup Replay
            </p>
          </div>
        </div>
      )}

      {/* 2. TOP NAVBAR */}
      <header className="navbar">
        <div
          className="cursor-pointer flex items-center"
          onClick={() => {
            setActiveTab("home");
            setActiveCategory("All");
            if (currentChannel) handleBackToChannels();
          }}
        >
          <InfinixNeonLogo size="md" />
        </div>

        <div className="top-actions">
          <div className="live-badge">
            <span className="live-badge-dot"></span>
            <span>LIVE STREAM</span>
          </div>
        </div>
      </header>

      {/* 3. MAIN CONTAINER */}
      <main className="container-app flex-1">
        {/* CASE A: USER CLICKED AND IS CURRENTLY WATCHING A CHANNEL */}
        {currentChannel ? (
          <div>
            {/* BACK BUTTON TO EXIT CURRENT CHANNEL AND PICK A NEW ONE */}
            <div className="flex items-center justify-between mb-3">
              <button onClick={handleBackToChannels} className="back-nav-btn">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Channels</span>
              </button>

              <span className="text-xs text-gray-400 font-mono">
                Watching CH {currentChannel.num < 10 ? `0${currentChannel.num}` : currentChannel.num}
              </span>
            </div>

            {/* VIDEO PLAYER */}
            <section className="player-container">
              <div
                className={`video-screen ${isPlaying ? "playing" : ""} ${
                  controlsForced ? "controls-forced" : ""
                }`}
                id="videoScreen"
                ref={screenRef}
                onMouseMove={handleUserActivity}
                onTouchStart={handleUserActivity}
                onDoubleClick={toggleFullscreen}
              >
                <video
                  ref={videoRef}
                  id="mainVideo"
                  playsInline
                  crossOrigin="anonymous"
                  preload="metadata"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onError={() => setIsLoadingStream(false)}
                  onClick={togglePlay}
                />

                {/* OVERLAY CONTROLS */}
                <div className="player-overlay">
                  {/* TOP BAR */}
                  <div className="overlay-top">
                    <div className="flex items-center gap-2">
                      {isCatchupMode && (
                        <button
                          onClick={handleReturnToLive}
                          className="p-1.5 rounded-lg bg-black/50 hover:bg-black/80 text-white transition mr-1"
                          title="Return to Live Stream"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                      )}
                      <span className="overlay-channel-title">
                        {currentChannel.name}
                        {isCatchupMode && activeCatchupProgram && (
                          <span className="text-xs text-[#00d9ff] font-normal truncate max-w-[180px]">
                            · {activeCatchupProgram.title}
                          </span>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 relative">
                      {/* Quality selector dropdown */}
                      <button
                        onClick={() => setShowQualityMenu(prev => !prev)}
                        className="hq-badge hover:border-[#00d9ff] transition"
                        title="Select Quality"
                      >
                        <span className="text-[10px] bg-[#00d9ff]/20 text-[#00d9ff] px-1 rounded">HQ</span>
                        <span>{selectedQuality}</span>
                      </button>

                      {/* Quality Popover */}
                      {showQualityMenu && (
                        <div className="absolute right-0 top-9 bg-[#0b0e14] border border-[#202735] rounded-xl p-1.5 shadow-2xl z-30 min-w-[130px] flex flex-col gap-1">
                          {qualityOptions.map(q => (
                            <button
                              key={q}
                              onClick={() => {
                                setSelectedQuality(q);
                                setShowQualityMenu(false);
                              }}
                              className={`text-xs px-3 py-1.5 rounded-lg flex items-center justify-between text-left transition ${
                                selectedQuality === q
                                  ? "bg-[#00d9ff] text-black font-bold"
                                  : "text-gray-300 hover:bg-[#151c27]"
                              }`}
                            >
                              <span>{q}</span>
                              {selectedQuality === q && <Check className="w-3.5 h-3.5" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CENTER CONTROLS (ONLY IN CATCH-UP ARCHIVE MODE) */}
                  {isCatchupMode && (
                    <div className="overlay-center-controls">
                      <button
                        className="center-btn"
                        onClick={() => seekRelative(-10)}
                        title="Rewind 10 seconds"
                      >
                        <RotateCcw className="w-5 h-5" />
                      </button>

                      <button
                        className="center-btn center-btn-main"
                        onClick={togglePlay}
                        title={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
                      </button>

                      <button
                        className="center-btn"
                        onClick={() => seekRelative(10)}
                        title="Forward 10 seconds"
                      >
                        <RotateCw className="w-5 h-5" />
                      </button>
                    </div>
                  )}

                  {/* BOTTOM BAR (ONLY ONE FULLSCREEN BUTTON HERE) */}
                  <div className="overlay-bottom">
                    {isCatchupMode ? (
                      /* Catchup Mode with timeline */
                      <>
                        <input
                          type="range"
                          min="0"
                          max={duration || 100}
                          step="0.5"
                          value={currentTime}
                          onChange={e => {
                            const val = Number(e.target.value);
                            setCurrentTime(val);
                            if (videoRef.current) videoRef.current.currentTime = val;
                          }}
                          className="timeline-scrubber"
                          aria-label="Timeline"
                        />

                        <div className="overlay-bottom-bar">
                          <span>{formatTime(currentTime)}</span>
                          <div className="flex items-center gap-3">
                            <span>{formatRemainingTime(currentTime, duration)}</span>
                            {/* SINGLE CLEAN FULLSCREEN BUTTON */}
                            <button
                              onClick={toggleFullscreen}
                              className="p-1 rounded hover:text-[#00d9ff] transition"
                              title="Full screen"
                            >
                              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Live Mode without timeline scrubber */
                      <div className="overlay-bottom-bar">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={togglePlay}
                            className="p-1.5 rounded-lg bg-black/40 hover:bg-black/70 text-white"
                            title={isPlaying ? "Pause" : "Play"}
                          >
                            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                          </button>

                          <button
                            onClick={toggleMute}
                            className="p-1.5 rounded-lg bg-black/40 hover:bg-black/70 text-white"
                            title={isMuted ? "Unmute" : "Mute"}
                          >
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          </button>

                          <span className="flex items-center gap-1.5 text-xs font-bold text-red-500">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                            LIVE
                          </span>
                        </div>

                        {/* SINGLE CLEAN FULLSCREEN BUTTON */}
                        <button
                          onClick={toggleFullscreen}
                          className="p-1.5 rounded-lg bg-black/40 hover:bg-black/70 text-white hover:text-[#00d9ff] transition"
                          title="Full screen"
                        >
                          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Loading spinner */}
                {isLoadingStream && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10 pointer-events-none">
                    <div className="w-10 h-10 border-3 border-[#00d9ff] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xs text-[#00d9ff] mt-3 font-semibold">
                      Connecting to Stream...
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* CHANNEL HEADER CARD */}
            <div className="channel-meta-card">
              <div className="channel-meta-info">
                <h2>{currentChannel.name}</h2>
                <div className="channel-status-label">
                  {isCatchupMode ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-[#00d9ff] inline-block shadow-[0_0_8px_#00d9ff]"></span>
                      <span className="text-[#00d9ff] font-medium">Archive Playback (Catchup)</span>
                      {activeCatchupProgram && (
                        <span className="text-gray-400">· {activeCatchupProgram.title}</span>
                      )}
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 rounded-full bg-red-500 inline-block shadow-[0_0_8px_#ff3355] animate-pulse"></span>
                      <span className="text-gray-300">Live Stream</span>
                      <span className="text-gray-500 text-xs">· {currentChannel.category}</span>
                    </>
                  )}
                </div>
              </div>

              <div>
                {isCatchupMode ? (
                  <button onClick={handleReturnToLive} className="go-live-btn">
                    <RefreshCw className="w-4 h-4" />
                    <span>Go Live</span>
                  </button>
                ) : (
                  <button
                    onClick={e => toggleFavorite(currentChannel.id, e)}
                    className="p-2.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-yellow-400 transition"
                    title={favorites.has(currentChannel.id) ? "Remove Favorite" : "Add Favorite"}
                  >
                    <Star
                      className={`w-6 h-6 ${
                        favorites.has(currentChannel.id)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                )}
              </div>
            </div>

            {/* CATCHUP SECTION */}
            <section className="section-catchup">
              <div className="catchup-title-row">
                <Clock className="w-4 h-4 text-[#00d9ff]" />
                <span>Select Past Program:</span>
                {isLoadingEpg && (
                  <span className="text-xs text-gray-400 font-normal ml-2 animate-pulse">
                    (Updating schedule...)
                  </span>
                )}
              </div>

              {/* Date Tabs */}
              <div className="date-tabs-row">
                <button
                  className={`date-pill ${selectedDay === "today" ? "active" : ""}`}
                  onClick={() => setSelectedDay("today")}
                >
                  Today
                </button>
                <button
                  className={`date-pill ${selectedDay === "yesterday" ? "active" : ""}`}
                  onClick={() => setSelectedDay("yesterday")}
                >
                  Yesterday
                </button>
                <button
                  className={`date-pill ${selectedDay === "twoDaysAgo" ? "active" : ""}`}
                  onClick={() => setSelectedDay("twoDaysAgo")}
                >
                  2 Days Ago
                </button>
                <button
                  className={`date-pill ${selectedDay === "upcoming" ? "active" : ""}`}
                  onClick={() => setSelectedDay("upcoming")}
                >
                  Upcoming
                </button>
              </div>

              {/* Program list */}
              <div className="program-cards-list">
                {currentProgramList.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 text-xs">
                    No programs listed for this day.
                  </div>
                ) : (
                  currentProgramList.map(item => {
                    const isActive = isCatchupMode && activeCatchupProgram?.id === item.id;
                    const isThumbFailed = failedThumbs.has(item.id);

                    return (
                      <div
                        key={item.id}
                        className={`program-card ${isActive ? "active-program" : ""}`}
                        onClick={() => handlePlayCatchup(item)}
                      >
                        <div className="program-thumb">
                          {item.thumbnail && !isThumbFailed ? (
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              loading="lazy"
                              onError={() => setFailedThumbs(prev => new Set(prev).add(item.id))}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#151b27] text-[#00d9ff]">
                              <TvMinimalPlay className="w-5 h-5 opacity-70" />
                            </div>
                          )}
                        </div>

                        <div className="program-details">
                          <div className="program-tag-time">
                            <span>{item.isUpcoming ? "UPCOMING" : "CATCHUP"}</span>
                            <span>{item.timeRange}</span>
                          </div>
                          <div className="program-name">{item.title}</div>
                        </div>

                        <button
                          className="play-action-icon"
                          onClick={e => {
                            e.stopPropagation();
                            handlePlayCatchup(item);
                          }}
                          title="Play Program"
                        >
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </section>

            {/* SWITCH CHANNEL QUICK LIST */}
            <section className="channels-section">
              <div className="channels-header">
                <h3>Switch Channel</h3>
                <button
                  onClick={handleBackToChannels}
                  className="text-xs text-[#00d9ff] font-semibold hover:underline"
                >
                  View All Directory
                </button>
              </div>

              <div className="channel-grid">
                {channels.slice(0, 8).map(ch => (
                  <div
                    key={ch.id}
                    className={`channel-card-item ${currentChannel.id === ch.id ? "selected-channel" : ""}`}
                    onClick={() => handleSelectChannel(ch)}
                  >
                    <div className="channel-card-art" style={{ background: ch.color }}>
                      {ch.logo && !failedLogos.has(ch.id) ? (
                        <img src={ch.logo} alt={ch.name} loading="lazy" />
                      ) : (
                        <TvMinimalPlay className="w-8 h-8 text-[#00d9ff]" />
                      )}
                    </div>
                    <div className="channel-card-info">
                      <h4>{ch.name}</h4>
                      <p>{ch.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          /* CASE B: HOME / DIRECTORY VIEW (NO CHANNEL AUTOPLAYING!) */
          <div>
            {/* HERO / WELCOME BANNER */}
            <div className="mb-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0c121e] to-[#07090e] border border-[#1a2230] relative overflow-hidden">
              <div className="max-w-xl relative z-10">
                <span className="text-[11px] font-bold text-[#00d9ff] tracking-widest uppercase mb-2 inline-block">
                  Live TV & 3-Day Archive
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight">
                  {activeTab === "favourite"
                    ? "My Favourite Channels"
                    : "Select a channel to start watching"}
                </h1>
                <p className="text-xs text-gray-400 leading-relaxed mb-0">
                  {activeTab === "favourite"
                    ? "Quick access to your personal starred channels. Tap any card to begin instant streaming."
                    : "Browse 130+ national and international live channels with 3-day catch-up replay. Tap any channel card below to open and watch."}
                </p>
              </div>
            </div>

            {/* CHANNELS SECTION */}
            <section className="channels-section">
              <div className="channels-header">
                <h3>
                  {activeTab === "favourite"
                    ? `Favourite Channels (${filteredChannels.length})`
                    : `Live Channels (${filteredChannels.length})`}
                </h3>

                {/* Search Input */}
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search channel or category..."
                    className="w-full bg-[#0c1017] border border-[#1a2230] text-xs px-3.5 py-2 rounded-xl text-white focus:outline-none focus:border-[#00d9ff]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter Pills (When on Home tab) */}
              {activeTab === "home" && (
                <div className="category-pills">
                  {categories.map(cat => {
                    const isActive = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        className={`cat-pill ${isActive ? "active" : ""}`}
                        onClick={() => setActiveCategory(cat)}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Channels Grid */}
              {filteredChannels.length === 0 ? (
                <div className="text-center py-16 px-4 bg-[#0c1017] border border-[#1a2230] rounded-2xl">
                  {activeTab === "favourite" ? (
                    <>
                      <Star className="w-12 h-12 mx-auto mb-3 text-yellow-400 opacity-60" />
                      <h4 className="text-base font-bold text-white mb-1">No Favourite Channels Yet</h4>
                      <p className="text-xs text-gray-400 max-w-sm mx-auto mb-4">
                        Tap the star (⭐) icon on any channel card while browsing Home to save your top channels here.
                      </p>
                      <button
                        onClick={() => setActiveTab("home")}
                        className="px-4 py-2 rounded-xl bg-[#00d9ff] text-black font-bold text-xs"
                      >
                        Browse Home Channels
                      </button>
                    </>
                  ) : (
                    <>
                      <TvMinimalPlay className="w-12 h-12 mx-auto mb-3 text-gray-500 opacity-50" />
                      <h4 className="text-base font-bold text-white mb-1">No Channels Found</h4>
                      <p className="text-xs text-gray-400">Try adjusting your search query or category filter.</p>
                    </>
                  )}
                </div>
              ) : (
                <div className="channel-grid">
                  {filteredChannels.map(ch => {
                    const isFav = favorites.has(ch.id);
                    const isFailed = failedLogos.has(ch.id);

                    return (
                      <div
                        key={ch.id}
                        className="channel-card-item"
                        onClick={() => handleSelectChannel(ch)}
                      >
                        <div className="channel-card-art" style={{ background: ch.color }}>
                          {ch.logo && !isFailed ? (
                            <img
                              src={ch.logo}
                              alt={ch.name}
                              loading="lazy"
                              onError={() => setFailedLogos(prev => new Set(prev).add(ch.id))}
                            />
                          ) : (
                            <TvMinimalPlay className="w-10 h-10 text-[#00d9ff]" />
                          )}

                          <span className="absolute left-2.5 top-2.5 text-[9px] font-bold px-2 py-0.5 rounded bg-red-600 text-white">
                            ● LIVE
                          </span>

                          <button
                            className="absolute right-2.5 top-2 text-white/80 hover:text-yellow-400 p-1"
                            onClick={e => toggleFavorite(ch.id, e)}
                            title="Toggle Favourite"
                          >
                            <Star
                              className={`w-4 h-4 ${
                                isFav ? "fill-yellow-400 text-yellow-400" : "text-white/70"
                              }`}
                            />
                          </button>
                        </div>

                        <div className="channel-card-info">
                          <h4 title={ch.name}>{ch.name}</h4>
                          <div className="flex items-center justify-between mt-1">
                            <p>{ch.category}</p>
                            <span className="text-[10px] text-[#00d9ff] font-bold">Watch ▶</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      {/* 4. TWO TABS AT THE BOTTOM: HOME & FAVOURITE */}
      <nav className="bottom-nav-bar" aria-label="Bottom Navigation">
        <button
          className={`bottom-nav-btn ${activeTab === "home" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("home");
            if (currentChannel) handleBackToChannels();
          }}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          className={`bottom-nav-btn ${activeTab === "favourite" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("favourite");
            if (currentChannel) handleBackToChannels();
          }}
        >
          <Star className={`w-5 h-5 ${favorites.size > 0 ? "fill-current" : ""}`} />
          <span>Favourite {favorites.size > 0 && `(${favorites.size})`}</span>
        </button>
      </nav>
    </div>
  );
}
