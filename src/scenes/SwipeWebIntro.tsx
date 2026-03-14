import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig, staticFile, Img } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { theme } from "../theme";

// Lock icon for browser bar
const LockIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={theme.colors.green}>
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
  </svg>
);

export const SwipeWebIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // App icon spring
  const logoPop = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 12, stiffness: 60 } });
  const logoScale = interpolate(logoPop, [0, 1], [0.3, 1]);
  const logoOpacity = interpolate(logoPop, [0, 1], [0, 1]);

  // Subtle pulse glow
  const pulse = Math.sin(frame * 0.08) * 0.15 + 0.85;

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
      {/* App icon with purple glow */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          borderRadius: 28,
          overflow: "hidden",
          boxShadow: `0 0 ${60 + pulse * 40}px rgba(168, 85, 247, ${0.3 + pulse * 0.15})`,
        }}
      >
        <Img src={staticFile("trackly-appicon.png")} width={130} height={130} />
      </div>

      {/* Title */}
      <FadeIn delay={15}>
        <div
          style={{
            color: theme.colors.white,
            fontSize: 52,
            fontWeight: 800,
            fontFamily: theme.font.display,
            textAlign: "center",
            letterSpacing: -1,
          }}
        >
          Swipe to Act
        </div>
      </FadeIn>

      {/* Subtitle */}
      <FadeIn delay={25}>
        <div
          style={{
            color: theme.colors.muted,
            fontSize: 24,
            fontWeight: 500,
            fontFamily: theme.font.body,
            textAlign: "center",
            marginTop: -12,
          }}
        >
          Trackly Web on Mobile
        </div>
      </FadeIn>

      {/* Browser URL bar mockup */}
      <FadeIn delay={38}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: 22,
            padding: "10px 24px",
            marginTop: 8,
          }}
        >
          <LockIcon size={14} />
          <span
            style={{
              color: theme.colors.dim,
              fontSize: 15,
              fontFamily: theme.font.body,
            }}
          >
            https://
          </span>
          <span
            style={{
              color: theme.colors.white,
              fontSize: 15,
              fontWeight: 600,
              fontFamily: theme.font.body,
            }}
          >
            usetrackly.app
          </span>
        </div>
      </FadeIn>
    </div>
  );
};
