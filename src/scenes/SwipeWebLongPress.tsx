import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { theme } from "../theme";

// Send icon
const SendIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = theme.colors.green }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

// Clock icon
const ClockIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = theme.colors.amber }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
  </svg>
);

// Thumbs down icon
const ThumbsDownIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = "#ef4444" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
  </svg>
);

// External link icon
const ExternalLinkIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = theme.colors.accentBright }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
  </svg>
);

// Location pin icon
const PinIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={theme.colors.dim}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

// Bookmark icon
const BookmarkIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={theme.colors.dim} strokeWidth={2}>
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const CARD_WIDTH = 680;
const CARD_HEIGHT = 120;
const SHEET_WIDTH = 680;

const sheetActions = [
  { label: "Applying", icon: SendIcon, color: theme.colors.green },
  { label: "Check Later", icon: ClockIcon, color: theme.colors.amber },
  { label: "Not Interested", icon: ThumbsDownIcon, color: "#ef4444" },
  { label: "divider", icon: null, color: "" },
  { label: "Open in Browser", icon: ExternalLinkIcon, color: theme.colors.accentBright },
];

export const SwipeWebLongPress: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Card enters (0-20)
  const cardEnter = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 18, stiffness: 80 } });
  const cardEnterY = interpolate(cardEnter, [0, 1], [30, 0]);
  const cardEnterOpacity = interpolate(cardEnter, [0, 1], [0, 1]);

  // Phase 2: Long press - card scales down (25-65)
  const pressStart = 25;
  const pressProgress = spring({
    frame: Math.max(0, frame - pressStart),
    fps,
    config: { damping: 25, stiffness: 120 },
  });
  const pressScale = interpolate(pressProgress, [0, 1], [1, 0.96]);

  // Phase 3: Bottom sheet slides up (65-100)
  const sheetStart = 65;
  const sheetProgress = spring({
    frame: Math.max(0, frame - sheetStart),
    fps,
    config: { damping: 18, stiffness: 70 },
  });
  const sheetTranslateY = interpolate(sheetProgress, [0, 1], [400, 0]);
  const sheetOpacity = interpolate(sheetProgress, [0, 1], [0, 1]);

  // Backdrop overlay
  const backdropOpacity = interpolate(sheetProgress, [0, 1], [0, 0.5]);

  // Card scale: normal until press, then scale down
  const cardScale = frame >= pressStart ? pressScale : 1;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: theme.colors.bg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Job card - positioned higher */}
      <div
        style={{
          opacity: cardEnterOpacity,
          transform: `translateY(${cardEnterY - 120}px) scale(${cardScale})`,
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          background: theme.colors.surface,
          borderRadius: 16,
          border: `1px solid ${theme.colors.border}`,
          padding: "18px 22px",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Company logo */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "#0ea5e9",
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
          M
        </div>

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
            Senior PM, Ads
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: theme.colors.muted, fontSize: 14, fontFamily: theme.font.body }}>
              Meta
            </span>
            <PinIcon size={12} />
            <span style={{ color: theme.colors.dim, fontSize: 13, fontFamily: theme.font.body }}>
              Menlo Park, CA
            </span>
          </div>
        </div>

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

        <BookmarkIcon size={20} />
      </div>

      {/* Press-and-hold indicator */}
      {frame >= pressStart && frame < sheetStart && (
        <FadeIn delay={0} style={{ marginTop: 20, position: "absolute", top: "50%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: theme.colors.dim,
              fontSize: 14,
              fontFamily: theme.font.body,
            }}
          >
            {/* Touch/hold indicator circle */}
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: theme.colors.accent,
                opacity: 0.6 + Math.sin(frame * 0.15) * 0.4,
              }}
            />
            Hold to open actions
          </div>
        </FadeIn>
      )}

      {/* Dark backdrop */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `rgba(0, 0, 0, ${backdropOpacity})`,
          pointerEvents: "none",
        }}
      />

      {/* Bottom sheet (vaul-style drawer) */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: `translateX(-50%) translateY(${sheetTranslateY}px)`,
          opacity: sheetOpacity,
          width: SHEET_WIDTH + 40,
          background: theme.colors.surface,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          border: `1px solid ${theme.colors.border}`,
          borderBottom: "none",
          paddingTop: 12,
          paddingBottom: 32,
        }}
      >
        {/* Drag handle pill */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div
            style={{
              width: 40,
              height: 5,
              borderRadius: 3,
              background: theme.colors.dim,
            }}
          />
        </div>

        {/* Action items */}
        {sheetActions.map((action, i) => {
          if (action.label === "divider") {
            return (
              <div
                key="divider"
                style={{
                  height: 1,
                  background: theme.colors.border,
                  margin: "8px 28px",
                }}
              />
            );
          }

          const itemDelay = sheetStart + 8 + i * 5;
          const itemProgress = spring({
            frame: Math.max(0, frame - itemDelay),
            fps,
            config: { damping: 20, stiffness: 90 },
          });
          const itemOpacity = interpolate(itemProgress, [0, 1], [0, 1]);
          const itemX = interpolate(itemProgress, [0, 1], [20, 0]);

          const IconComponent = action.icon!;

          return (
            <div
              key={action.label}
              style={{
                opacity: itemOpacity,
                transform: `translateX(${itemX}px)`,
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "14px 28px",
              }}
            >
              <IconComponent size={22} color={action.color} />
              <span
                style={{
                  color: theme.colors.white,
                  fontSize: 17,
                  fontWeight: 500,
                  fontFamily: theme.font.body,
                }}
              >
                {action.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
