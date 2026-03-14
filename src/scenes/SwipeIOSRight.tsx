import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { theme } from "../theme";

const red = "#ef4444";

// ThumbsDown icon
const ThumbsDownIcon: React.FC<{ size?: number; color?: string }> = ({ size = 28, color = theme.colors.white }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
  </svg>
);

// Simulated job card
const JobCard: React.FC<{ offsetX: number; opacity?: number }> = ({ offsetX, opacity = 1 }) => (
  <div
    style={{
      width: 560,
      background: theme.colors.surface,
      border: `1px solid ${theme.colors.border}`,
      borderRadius: 20,
      padding: "28px 28px",
      display: "flex",
      alignItems: "center",
      gap: 20,
      transform: `translateX(${offsetX}px)`,
      opacity,
      position: "relative",
      zIndex: 2,
    }}
  >
    {/* Company logo placeholder */}
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: 14,
        background: "linear-gradient(135deg, #0668E1, #1877F2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span style={{ color: theme.colors.white, fontSize: 24, fontWeight: 700, fontFamily: theme.font.display }}>
        M
      </span>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ color: theme.colors.white, fontSize: 22, fontWeight: 700, fontFamily: theme.font.display }}>
        Senior PM
      </div>
      <div style={{ color: theme.colors.accentBright, fontSize: 16, fontWeight: 500, fontFamily: theme.font.body }}>
        Meta
      </div>
      <div style={{ color: theme.colors.muted, fontSize: 14, fontFamily: theme.font.body }}>
        Menlo Park, CA
      </div>
    </div>
  </div>
);

export const SwipeIOSRight: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card appears first
  const cardEntry = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 18, stiffness: 80 } });
  const cardEntryX = interpolate(cardEntry, [0, 1], [-60, 0]);

  // Swipe animation starts at frame 45, slides right
  const swipeStart = 45;
  const swipeProgress = spring({ frame: Math.max(0, frame - swipeStart), fps, config: { damping: 20, stiffness: 50 } });
  const cardSwipeX = interpolate(swipeProgress, [0, 1], [0, 320]);

  // Combined card offset
  const totalCardX = frame < swipeStart ? cardEntryX : cardSwipeX;

  // Red reveal behind card (grows as card moves right)
  const revealWidth = interpolate(swipeProgress, [0, 1], [0, 320], { extrapolateRight: "clamp" });
  const revealOpacity = interpolate(swipeProgress, [0, 0.2, 1], [0, 1, 1]);

  // Arrow indicator below
  const arrowEntry = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 15, stiffness: 70 } });
  const arrowOpacity = interpolate(arrowEntry, [0, 1], [0, 1]);
  const arrowY = interpolate(arrowEntry, [0, 1], [20, 0]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        background: theme.colors.bg,
      }}
    >
      {/* Scene title */}
      <FadeIn delay={3} direction="up">
        <div
          style={{
            color: theme.colors.dim,
            fontSize: 14,
            fontWeight: 600,
            fontFamily: theme.font.body,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          Swipe Gesture
        </div>
      </FadeIn>

      {/* Card area with reveal */}
      <div style={{ position: "relative", width: 560, height: 120 }}>
        {/* Red reveal behind (on left side) */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: revealWidth,
            opacity: revealOpacity,
            background: `linear-gradient(270deg, ${red}22, ${red}44)`,
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            overflow: "hidden",
            zIndex: 1,
          }}
        >
          {swipeProgress > 0.3 && (
            <>
              <ThumbsDownIcon size={24} color={red} />
              <span
                style={{
                  color: red,
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: theme.font.display,
                }}
              >
                Nope
              </span>
            </>
          )}
        </div>

        {/* Job card */}
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 2 }}>
          <JobCard offsetX={totalCardX} />
        </div>
      </div>

      {/* Arrow indicator */}
      <div
        style={{
          opacity: arrowOpacity,
          transform: `translateY(${arrowY}px)`,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            color: red,
            fontSize: 22,
            fontWeight: 700,
            fontFamily: theme.font.display,
          }}
        >
          Nope
        </span>
        <span
          style={{
            color: theme.colors.muted,
            fontSize: 22,
            fontFamily: theme.font.body,
          }}
        >
          with
        </span>
        <span
          style={{
            color: theme.colors.white,
            fontSize: 22,
            fontWeight: 700,
            fontFamily: theme.font.display,
          }}
        >
          Swipe Right
        </span>
        {/* Right-pointing arrow */}
        <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={red} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </div>
  );
};
