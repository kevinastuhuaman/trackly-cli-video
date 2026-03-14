import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, staticFile, Img } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { theme } from "../theme";

export const FavHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // App icon pop-in
  const iconPop = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 12, stiffness: 60 },
  });
  const iconScale = interpolate(iconPop, [0, 1], [0.3, 1]);
  const iconOpacity = interpolate(iconPop, [0, 1], [0, 1]);

  // Subtle pulse glow
  const glowPulse = Math.sin(frame * 0.08) * 0.15 + 0.85;

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
          opacity: iconOpacity,
          transform: `scale(${iconScale})`,
          borderRadius: 32,
          overflow: "hidden",
          boxShadow: `0 0 ${60 * glowPulse}px rgba(168, 85, 247, ${0.4 * glowPulse}), 0 0 ${120 * glowPulse}px rgba(168, 85, 247, ${0.15 * glowPulse})`,
        }}
      >
        <Img src={staticFile("trackly-appicon.png")} width={140} height={140} />
      </div>

      {/* Title */}
      <FadeIn delay={15} direction="up" distance={40}>
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
          Favorites
        </div>
      </FadeIn>

      {/* Subtitle */}
      <FadeIn delay={28} direction="up" distance={20}>
        <div
          style={{
            color: theme.colors.muted,
            fontSize: 22,
            fontWeight: 400,
            fontFamily: theme.font.body,
            textAlign: "center",
          }}
        >
          Two perks of starring companies
        </div>
      </FadeIn>
    </div>
  );
};
