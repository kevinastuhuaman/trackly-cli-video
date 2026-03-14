import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { theme } from "../theme";

// Send / paper-plane icon
const SendIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={theme.colors.white}>
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
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

// Web-style job card component
const WebJobCard: React.FC<{
  company: string;
  title: string;
  location: string;
  initial: string;
  color: string;
  translateX: number;
  opacity?: number;
}> = ({ company, title, location, initial, color, translateX, opacity = 1 }) => (
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
      transform: `translateX(${translateX}px)`,
      opacity,
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
        background: color,
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
      {initial}
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
        {title}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: theme.colors.muted, fontSize: 14, fontFamily: theme.font.body }}>
          {company}
        </span>
        <PinIcon size={12} />
        <span style={{ color: theme.colors.dim, fontSize: 13, fontFamily: theme.font.body }}>
          {location}
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
);

export const SwipeWebLeft: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Card slides in and settles (0-30)
  const cardEnter = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 18, stiffness: 80 } });
  const cardEnterY = interpolate(cardEnter, [0, 1], [40, 0]);
  const cardEnterOpacity = interpolate(cardEnter, [0, 1], [0, 1]);

  // Phase 2: Card slides left revealing green action (30-80)
  const swipeStart = 35;
  const swipeProgress = spring({
    frame: Math.max(0, frame - swipeStart),
    fps,
    config: { damping: 20, stiffness: 60 },
  });
  const cardSlideX = interpolate(swipeProgress, [0, 1], [0, -200]);

  // Phase 3: Card flies off screen (80-120)
  const flyStart = 80;
  const flyProgress = spring({
    frame: Math.max(0, frame - flyStart),
    fps,
    config: { damping: 25, stiffness: 80 },
  });
  const cardFlyX = interpolate(flyProgress, [0, 1], [0, -900]);

  // Combined card X position
  const totalCardX = frame < swipeStart ? 0 : frame < flyStart ? cardSlideX : cardSlideX + cardFlyX;

  // Green reveal opacity (appears when swiping)
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
        {/* Green reveal behind card */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            borderRadius: 16,
            background: `linear-gradient(135deg, ${theme.colors.green}, #16a34a)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: 40,
            gap: 12,
            opacity: revealOpacity,
          }}
        >
          <SendIcon size={26} />
          <span
            style={{
              color: theme.colors.white,
              fontSize: 20,
              fontWeight: 700,
              fontFamily: theme.font.display,
            }}
          >
            Applying
          </span>
        </div>

        {/* Job card on top */}
        <WebJobCard
          company="Anthropic"
          title="Product Manager, API"
          location="San Francisco, CA"
          initial="A"
          color="#6d28d9"
          translateX={totalCardX}
        />
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
          {/* Left arrow SVG */}
          <svg width={28} height={28} viewBox="0 0 24 24" fill={theme.colors.green}>
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          <span
            style={{
              color: theme.colors.green,
              fontSize: 22,
              fontWeight: 700,
              fontFamily: theme.font.display,
            }}
          >
            Swipe Left
          </span>
          <span
            style={{
              color: theme.colors.muted,
              fontSize: 22,
              fontFamily: theme.font.body,
            }}
          >
            Apply
          </span>
        </div>
      </FadeIn>
    </div>
  );
};
