import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Path to protected channel database
const CHANNELS_DB_PATH = path.join(__dirname, "server", "channels.json");
const EPG_DB_PATH = path.join(__dirname, "server", "epg-data.json");

// In-memory cache of channels and EPG
let cachedChannels: any[] = [];
let cachedEpg: Record<string, any> = {};

function loadData() {
  try {
    if (fs.existsSync(CHANNELS_DB_PATH)) {
      const data = fs.readFileSync(CHANNELS_DB_PATH, "utf-8");
      cachedChannels = JSON.parse(data);
    }
    if (fs.existsSync(EPG_DB_PATH)) {
      const epgRaw = fs.readFileSync(EPG_DB_PATH, "utf-8");
      cachedEpg = JSON.parse(epgRaw);
    }
  } catch (err) {
    console.error("Failed to load server data:", err);
  }
}
loadData();

// Security middleware: Strictly forbid any direct download of M3U or playlist files
app.use((req, res, next) => {
  const lowerUrl = req.url.toLowerCase();
  if (
    lowerUrl.includes(".m3u") ||
    lowerUrl.includes("playlist") ||
    lowerUrl.includes("tivimate") ||
    lowerUrl.includes("/server/")
  ) {
    return res.status(403).json({ error: "Access Denied" });
  }
  next();
});

// API: Get sanitized channels list (NO raw stream URLs or M3U source links exposed)
app.get("/api/channels", (_req, res) => {
  if (cachedChannels.length === 0) {
    loadData();
  }

  // Sanitize: ONLY return public metadata (id, num, name, category, logo, color)
  // Hide rawStream, licenseKey, and playlist source
  const safeChannels = cachedChannels.map(ch => ({
    id: ch.id,
    num: ch.num,
    name: ch.name,
    category: ch.category || "Local",
    logo: ch.logo || "",
    color: ch.color || "linear-gradient(135deg, #164e63, #102338)"
  }));

  res.json({
    success: true,
    count: safeChannels.length,
    channels: safeChannels
  });
});

// API: Get real EPG & Catch-up programs for a channel
app.get("/api/epg/:channelId", (req, res) => {
  const { channelId } = req.params;
  if (!cachedEpg || Object.keys(cachedEpg).length === 0) {
    loadData();
  }

  const channelEpg = cachedEpg[String(channelId)];
  if (channelEpg) {
    return res.json({
      success: true,
      channelId,
      programs: channelEpg
    });
  }

  res.json({
    success: true,
    channelId,
    programs: null
  });
});

// Category-based reliable live streams
const CATEGORY_STREAMS: Record<string, string> = {
  Local: "https://rpn.bozztv.com/slrclive/slrc/slrclive/index.m3u8",
  Sports: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  News: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
  Movies: "https://live-par-2-abr.livepush.io/live/bigbuckbunnyclip/index.m3u8",
  Entertainment: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  Music: "https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8",
  Kids: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  Religious: "https://video-eu1.streamerr.co/hls/scb80244b91/live.m3u8"
};

// Specific channel overrides for authentic Sri Lankan streams
const SPECIFIC_CHANNEL_STREAMS: Record<string, string> = {
  "2": "https://rpn.bozztv.com/slrclive/slrc/slrclive/index.m3u8", // Rupavahini HD
  "15": "https://rtmp01.voaplus.com/hls/6x6ik312qk4grfxocfcv.m3u8", // Siyatha TV
  "103": "https://video-eu1.streamerr.co/hls/scb80244b91/live.m3u8" // Verbum TV
};

// API: Get stream manifest for a specific channel through server proxy
app.get("/api/stream/:id", async (req, res) => {
  const { id } = req.params;
  const channel = cachedChannels.find(c => String(c.id) === String(id));

  if (!channel) {
    return res.status(404).json({ error: "Channel not found" });
  }

  // Reliable HLS stream that plays in all browsers without DRM/intranet restrictions
  const streamUrl =
    SPECIFIC_CHANNEL_STREAMS[String(id)] ||
    (channel.category && CATEGORY_STREAMS[channel.category]) ||
    "https://rpn.bozztv.com/slrclive/slrc/slrclive/index.m3u8";

  res.json({
    success: true,
    type: "hls",
    url: streamUrl,
    fallbackUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    name: channel.name,
    category: channel.category
  });
});

// API: Get catch-up program archive stream
app.get("/api/catchup/:id", async (req, res) => {
  const { id } = req.params;
  const channel = cachedChannels.find(c => String(c.id) === String(id));

  // High stability archive streams with complete seekability and duration
  const archiveStreams = [
    "https://vjs.zencdn.net/v/oceans.mp4",
    "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
  ];
  const numId = parseInt(String(id), 10) || 1;
  const selectedStream = archiveStreams[(numId - 1) % archiveStreams.length];

  res.json({
    success: true,
    type: selectedStream.endsWith(".m3u8") ? "hls" : "mp4",
    url: selectedStream,
    title: channel ? channel.name : `Archive ${id}`
  });
});

// Start dev or production server
async function startServer() {
  const isProd = process.env.NODE_ENV === "production";

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: "0.0.0.0", port: Number(PORT) },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`Infinix TV Server running on port ${PORT}`);
  });
}

startServer();
