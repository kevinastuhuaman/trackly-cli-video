import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile, Audio, Sequence } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { theme } from "../theme";

const FONT_FAMILY = theme.font.body;

export const StartupCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // App icon pop-in
  const iconPop = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 12, stiffness: 60 },
  });
  const iconScale = interpolate(iconPop, [0, 1], [0.3, 1]);
  const iconOpacity = interpolate(iconPop, [0, 1], [0, 1]);

  // Pulsing glow on app icon
  const glowPulse = Math.sin(frame * 0.06) * 0.15 + 0.85;

  // App Store badge pulsing border
  const badgePulse = Math.sin(frame * 0.04) * 0.4 + 0.6;

  // Background gradient shift
  const gradientShift = Math.sin(frame * 0.01) * 10;

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
        background: `radial-gradient(ellipse at 50% ${50 + gradientShift}%, rgba(168, 85, 247, 0.06) 0%, ${theme.colors.bg} 70%)`,
        position: "relative",
      }}
    >
      {/* App icon with glow */}
      <div
        style={{
          opacity: iconOpacity,
          transform: `scale(${iconScale})`,
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: `0 0 ${50 * glowPulse}px rgba(168, 85, 247, ${0.4 * glowPulse}), 0 0 ${100 * glowPulse}px rgba(168, 85, 247, ${0.15 * glowPulse})`,
        }}
      >
        <Img src={staticFile("trackly-appicon.png")} width={100} height={100} />
      </div>

      {/* "1,204 companies." */}
      <FadeIn delay={25} direction="up" distance={25}>
        <span
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: theme.colors.white,
            fontFamily: theme.font.display,
            textAlign: "center",
          }}
        >
          1,204 companies.
        </span>
      </FadeIn>

      {/* "6,000+ startup jobs." */}
      <FadeIn delay={38} direction="up" distance={25}>
        <span
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: theme.colors.accentBright,
            fontFamily: theme.font.display,
            textAlign: "center",
          }}
        >
          6,000+ startup jobs.
        </span>
      </FadeIn>

      {/* Tagline */}
      <FadeIn delay={52} direction="up" distance={20}>
        <span
          style={{
            fontSize: 32,
            fontWeight: 500,
            color: theme.colors.white,
            fontFamily: theme.font.display,
            textAlign: "center",
          }}
        >
          See it first. Move first.
        </span>
      </FadeIn>

      {/* App Store badge */}
      <FadeIn delay={70} direction="up" distance={20}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            paddingLeft: 24,
            paddingRight: 28,
            paddingTop: 14,
            paddingBottom: 14,
            borderRadius: 14,
            background: "rgba(255, 255, 255, 0.08)",
            border: `1px solid rgba(168, 85, 247, ${badgePulse})`,
          }}
        >
          {/* Apple logo SVG inline */}
          <svg
            width={28}
            height={28}
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 400,
                color: "rgba(255, 255, 255, 0.7)",
                fontFamily: FONT_FAMILY,
                lineHeight: 1.2,
              }}
            >
              Download on the
            </span>
            <span
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: theme.colors.white,
                fontFamily: FONT_FAMILY,
                lineHeight: 1.2,
              }}
            >
              App Store
            </span>
          </div>
        </div>
      </FadeIn>

      {/* "Free on the App Store" */}
      <FadeIn delay={90} direction="up" distance={10}>
        <span
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: theme.colors.muted,
            fontFamily: FONT_FAMILY,
            textAlign: "center",
          }}
        >
          Free on the App Store
        </span>
      </FadeIn>

      {/* Sound effect */}
      <Sequence from={70} durationInFrames={60} layout="none">
        <Audio src={staticFile("sfx/resolve.wav")} volume={0.45} />
      </Sequence>
    </div>
  );
};
