import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { theme } from "../theme";

// Thumbs down icon
const ThumbsDownIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={theme.colors.white}>
    <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
  </svg>
);

// Bookmark icon
const BookmarkIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={theme.colors.dim} strokeWidth={2}>
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

// Location pin icon
const PinIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={theme.colors.dim}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const CARD_WIDTH = 680;
const CARD_HEIGHT = 120;

const RED = "#ef4444";

export const SwipeWebRight: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Card enters (0-30)
  const cardEnter = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 18, stiffness: 80 } });
  const cardEnterY = interpolate(cardEnter, [0, 1], [40, 0]);
  const cardEnterOpacity = interpolate(cardEnter, [0, 1], [0, 1]);

  // Phase 2: Card slides right revealing red action (35-80)
  const swipeStart = 35;
  const swipeProgress = spring({
    frame: Math.max(0, frame - swipeStart),
    fps,
    config: { damping: 20, stiffness: 60 },
  });
  const cardSlideX = interpolate(swipeProgress, [0, 1], [0, 200]);

  // Phase 3: Card flies off to the right (80-120)
  const flyStart = 80;
  const flyProgress = spring({
    frame: Math.max(0, frame - flyStart),
    fps,
    config: { damping: 25, stiffness: 80 },
  });
  const cardFlyX = interpolate(flyProgress, [0, 1], [0, 900]);

  // Combined card X
  const totalCardX = frame < swipeStart ? 0 : frame < flyStart ? cardSlideX : cardSlideX + cardFlyX;

  // Red reveal opacity
  const revealOpacity = interpolate(swipeProgress, [0, 0.3, 1], [0, 1, 1]);

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
      {/* Card container */}
      <div
        style={{
          opacity: cardEnterOpacity,
          transform: `translateY(${cardEnterY}px)`,
          position: "relative",
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
        }}
      >
        {/* Red reveal behind card */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            borderRadius: 16,
            background: `linear-gradient(135deg, #dc2626, ${RED})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: 40,
            gap: 12,
            opacity: revealOpacity,
          }}
        >
          <span
            style={{
              color: theme.colors.white,
              fontSize: 20,
              fontWeight: 700,
              fontFamily: theme.font.display,
            }}
          >
            Nope
          </span>
          <ThumbsDownIcon size={26} />
        </div>

        {/* Job card on top */}
        <div
          style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            background: theme.colors.surface,
            borderRadius: 16,
            border: `1px solid ${theme.colors.border}`,
            padding: "18px 22px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            transform: `translateX(${totalCardX}px)`,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          {/* Company logo placeholder */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#4285f4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
              color: theme.colors.white,
              fontFamily: theme.font.display,
              flexShrink: 0,
            }}
          >
            G
          </div>

          {/* Job info */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                color: theme.colors.white,
                fontSize: 19,
                fontWeight: 700,
                fontFamily: theme.font.display,
                marginBottom: 4,
              }}
            >
              Product Lead
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: theme.colors.muted, fontSize: 14, fontFamily: theme.font.body }}>
                Google
              </span>
              <PinIcon size={12} />
              <span style={{ color: theme.colors.dim, fontSize: 13, fontFamily: theme.font.body }}>
                Mountain View, CA
              </span>
            </div>
          </div>

          {/* Status badge */}
          <div
            style={{
              background: "rgba(168, 85, 247, 0.15)",
              border: `1px solid ${theme.colors.accent}`,
              borderRadius: 8,
              padding: "4px 10px",
              fontSize: 11,
              fontWeight: 600,
              color: theme.colors.accentBright,
              fontFamily: theme.font.body,
              marginRight: 8,
            }}
          >
            New
          </div>

          {/* Bookmark icon */}
          <BookmarkIcon size={20} />
        </div>
      </div>

      {/* Label */}
      <FadeIn delay={45}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              color: theme.colors.muted,
              fontSize: 22,
              fontFamily: theme.font.body,
            }}
          >
            Nope
          </span>
          <span
            style={{
              color: RED,
              fontSize: 22,
              fontWeight: 700,
              fontFamily: theme.font.display,
            }}
          >
            Swipe Right
          </span>
          {/* Right arrow SVG */}
          <svg width={28} height={28} viewBox="0 0 24 24" fill={RED}>
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
          </svg>
        </div>
      </FadeIn>
    </div>
  );
};
