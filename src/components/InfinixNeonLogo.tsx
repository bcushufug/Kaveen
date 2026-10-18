import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function InfinixNeonLogo({ className = "", size = "md" }: LogoProps) {
  // Dimensions based on size
  const heightMap = {
    sm: "h-7",
    md: "h-9",
    lg: "h-14",
    xl: "h-20"
  };

  return (
    <div className={`inline-flex items-center gap-1.5 select-none ${heightMap[size]} ${className}`}>
      <svg
        viewBox="0 0 340 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto max-w-full drop-shadow-[0_0_20px_rgba(0,255,180,0.25)]"
      >
        <defs>
          {/* Neon Rainbow Gradient for the TV Bezel */}
          <linearGradient id="neonGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ff9d" />
            <stop offset="25%" stopColor="#00d9ff" />
            <stop offset="50%" stopColor="#7b2ff7" />
            <stop offset="75%" stopColor="#ff007f" />
            <stop offset="100%" stopColor="#ffaa00" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="neonBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* "Infinix" typography */}
        <text
          x="6"
          y="62"
          fill="#ffffff"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif"
          fontWeight="900"
          fontSize="56"
          letterSpacing="-1.5"
        >
          Infinix
        </text>

        {/* Tilted Neon TV Screen Bezel */}
        <g transform="translate(230, 8)" filter="url(#neonBlur)">
          {/* Outer glow stroke */}
          <path
            d="M 5,14 L 88,4 Q 96,2 96,12 L 91,58 Q 90,66 82,67 L 14,68 Q 4,68 4,58 L 1,22 Q 0,14 5,14 Z"
            stroke="url(#neonGlowGrad)"
            strokeWidth="5"
            strokeLinejoin="round"
            fill="#050608"
          />

          {/* Inner subtle glow */}
          <path
            d="M 8,16 L 85,7 Q 92,5 92,13 L 88,56 Q 87,63 80,64 L 16,65 Q 7,65 7,56 L 4,23 Q 4,16 8,16 Z"
            fill="#0a0d14"
            opacity="0.8"
          />

          {/* "TV" inside neon screen */}
          <text
            x="48"
            y="49"
            fill="#ffffff"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif"
            fontWeight="900"
            fontSize="32"
            letterSpacing="-0.5"
            textAnchor="middle"
          >
            TV
          </text>
        </g>
      </svg>
    </div>
  );
}
