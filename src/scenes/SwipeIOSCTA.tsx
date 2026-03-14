import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig, staticFile, Img } from "remotion";
import { FadeIn, ScaleIn } from "../components/FadeIn";
import { theme } from "../theme";

// Apple icon SVG
const AppleIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={theme.colors.white}>
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

export const SwipeIOSCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const iconPop = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 12, stiffness: 60 } });
  const iconScale = interpolate(iconPop, [0, 1], [0.3, 1]);
  const iconOpacity = interpolate(iconPop, [0, 1], [0, 1]);

  // Pulse glow on app icon
  const glowPulse = Math.sin(frame * 0.06) * 0.15 + 0.85;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        background: theme.colors.bg,
      }}
    >
      {/* App icon with pulse glow */}
      <div
        style={{
          opacity: iconOpacity,
          transform: `scale(${iconScale})`,
          borderRadius: 32,
          overflow: "hidden",
          boxShadow: `0 0 ${60 * glowPulse}px rgba(168, 85, 247, ${0.4 * glowPulse}), 0 0 ${120 * glowPulse}px rgba(168, 85, 247, ${0.15 * glowPulse})`,
        }}
      >
        <Img src={staticFile("trackly-appicon.png")} width={130} height={130} />
      </div>

      {/* "Try it now" */}
      <FadeIn delay={20} direction="up" distance={40}>
        <div
          style={{
            color: theme.colors.white,
            fontSize: 48,
            fontWeight: 800,
            fontFamily: theme.font.display,
            textAlign: "center",
            letterSpacing: -1,
          }}
        >
          Try it now
        </div>
      </FadeIn>

      {/* App Store badge */}
      <FadeIn delay={40}>
        <ScaleIn delay={42}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: theme.colors.surface,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: 14,
              padding: "14px 28px",
            }}
          >
            <AppleIcon size={22} />
            <div>
              <div style={{ color: theme.colors.muted, fontSize: 11, fontFamily: theme.font.body }}>
                Available on the
              </div>
              <div style={{ color: theme.colors.white, fontSize: 18, fontWeight: 600, fontFamily: theme.font.display }}>
                App Store
              </div>
            </div>
          </div>
        </ScaleIn>
      </FadeIn>

      {/* Tagline */}
      <FadeIn delay={65} direction="up" distance={15}>
        <div
          style={{
            color: theme.colors.muted,
            fontSize: 18,
            fontFamily: theme.font.body,
            textAlign: "center",
          }}
        >
          Trackly: Apply first
        </div>
      </FadeIn>
    </div>
  );
};
