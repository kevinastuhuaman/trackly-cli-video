import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { theme } from "../theme";

// SVG Icons for action sheet
const SendIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" fill={color} />
  </svg>
);

const ClockIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ThumbsDownIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
  </svg>
);

const ExternalLinkIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const actions = [
  { label: "Applying", icon: SendIcon, color: theme.colors.green },
  { label: "Check Later", icon: ClockIcon, color: theme.colors.amber },
  { label: "Not Interested", icon: ThumbsDownIcon, color: "#ef4444" },
  { label: "Open in Browser", icon: ExternalLinkIcon, color: theme.colors.accentBright },
];

export const SwipeIOSLongPress: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card appears
  const cardEntry = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 18, stiffness: 80 } });
  const cardScale = interpolate(cardEntry, [0, 1], [0.9, 1]);
  const cardOpacity = interpolate(cardEntry, [0, 1], [0, 1]);

  // Long press starts at frame 30 -- card scales down
  const pressStart = 30;
  const pressHold = 40; // frames of holding
  const pressProgress = interpolate(frame, [pressStart, pressStart + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pressScale = interpolate(pressProgress, [0, 1], [1, 0.96]);

  // Haptic ripple effect (concentric circles during press)
  const rippleProgress = interpolate(frame, [pressStart + 5, pressStart + 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bottom sheet slides up after hold completes (~frame 70)
  const sheetStart = pressStart + pressHold;
  const sheetProgress = spring({ frame: Math.max(0, frame - sheetStart), fps, config: { damping: 18, stiffness: 70 } });
  const sheetY = interpolate(sheetProgress, [0, 1], [400, 0]);
  const sheetOpacity = interpolate(sheetProgress, [0, 0.3, 1], [0, 1, 1]);

  // Card returns to normal after sheet appears
  const releaseScale = frame > sheetStart ? interpolate(
    spring({ frame: Math.max(0, frame - sheetStart), fps, config: { damping: 15, stiffness: 100 } }),
    [0, 1],
    [0.96, 1]
  ) : pressScale;

  // Final card scale combines entry + press
  const finalCardScale = frame < pressStart ? cardScale : cardScale * releaseScale;

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
      {/* Scene title */}
      <div style={{ position: "absolute", top: 100 }}>
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
            Long Press
          </div>
        </FadeIn>
      </div>

      {/* Card with ripple area */}
      <div
        style={{
          position: "relative",
          marginTop: -60,
        }}
      >
        {/* Haptic ripple circles */}
        {frame >= pressStart + 5 && frame < sheetStart + 10 && (
          <>
            {[0, 1, 2].map((i) => {
              const rippleDelay = i * 0.15;
              const thisRipple = Math.max(0, rippleProgress - rippleDelay);
              const rippleScale = interpolate(thisRipple, [0, 1], [0.8, 1.3 + i * 0.15]);
              const rippleOpacity = interpolate(thisRipple, [0, 0.3, 1], [0, 0.25, 0]);
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: 580,
                    height: 130,
                    marginTop: -65,
                    marginLeft: -290,
                    borderRadius: 20,
                    border: `2px solid ${theme.colors.accent}`,
                    opacity: rippleOpacity,
                    transform: `scale(${rippleScale})`,
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                />
              );
            })}
          </>
        )}

        {/* Job card */}
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
            opacity: cardOpacity,
            transform: `scale(${finalCardScale})`,
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Company logo */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "linear-gradient(135deg, #FF6B00, #FF9500)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ color: theme.colors.white, fontSize: 24, fontWeight: 700, fontFamily: theme.font.display }}>
              A
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ color: theme.colors.white, fontSize: 22, fontWeight: 700, fontFamily: theme.font.display }}>
              Staff PM, Ads
            </div>
            <div style={{ color: theme.colors.accentBright, fontSize: 16, fontWeight: 500, fontFamily: theme.font.body }}>
              Amazon
            </div>
            <div style={{ color: theme.colors.muted, fontSize: 14, fontFamily: theme.font.body }}>
              Seattle, WA
            </div>
          </div>
        </div>

        {/* Press-and-hold label */}
        {frame >= pressStart && frame < sheetStart && (
          <FadeIn delay={0} direction="none">
            <div
              style={{
                textAlign: "center",
                marginTop: 16,
                color: theme.colors.muted,
                fontSize: 14,
                fontFamily: theme.font.body,
              }}
            >
              Holding...
            </div>
          </FadeIn>
        )}
      </div>

      {/* Bottom sheet */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          opacity: sheetOpacity,
          transform: `translateY(${sheetY}px)`,
          background: theme.colors.surface,
          borderTop: `1px solid ${theme.colors.border}`,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          padding: "24px 60px 48px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {/* Sheet handle */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <div
            style={{
              width: 40,
              height: 5,
              borderRadius: 3,
              background: theme.colors.dim,
            }}
          />
        </div>

        {/* Action rows */}
        {actions.map((action, i) => {
          const rowDelay = sheetStart + 8 + i * 5;
          const rowProgress = spring({ frame: Math.max(0, frame - rowDelay), fps, config: { damping: 18, stiffness: 80 } });
          const rowOpacity = interpolate(rowProgress, [0, 1], [0, 1]);
          const rowX = interpolate(rowProgress, [0, 1], [30, 0]);
          const IconComponent = action.icon;

          return (
            <div
              key={action.label}
              style={{
                opacity: rowOpacity,
                transform: `translateX(${rowX}px)`,
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 20px",
                borderRadius: 14,
                background: i === 0 ? `${action.color}11` : "transparent",
                borderBottom: i < actions.length - 1 ? `1px solid ${theme.colors.border}` : "none",
              }}
            >
              <IconComponent size={22} color={action.color} />
              <span
                style={{
                  color: theme.colors.white,
                  fontSize: 18,
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
