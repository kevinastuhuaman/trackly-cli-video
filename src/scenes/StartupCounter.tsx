import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio, Sequence, staticFile } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { theme } from "../theme";

const FONT_FAMILY = theme.font.body;

export const StartupCounter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Counter animation progress (for glow effect timing)
  const counterProgress = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 14, stiffness: 60 },
  });

  // Glow burst when counter lands (progress > 0.95)
  const glowIntensity = counterProgress > 0.95
    ? interpolate(
        frame,
        [15 + 30, 15 + 36, 15 + 60],
        [0, 40, 20],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 0;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        background: theme.colors.bg,
        position: "relative",
      }}
    >
      {/* Top label */}
      <FadeIn delay={5} direction="up" distance={15}>
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: theme.colors.accentBright,
            fontFamily: FONT_FAMILY,
            textTransform: "uppercase",
            letterSpacing: 1.5,
          }}
        >
          COMPANIES TRACKED
        </span>
      </FadeIn>

      {/* Animated counter */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Glow effect behind counter */}
        <div
          style={{
            position: "absolute",
            width: 200,
            height: 100,
            borderRadius: "50%",
            boxShadow: `0 0 ${glowIntensity}px rgba(168, 85, 247, 0.5), 0 0 ${glowIntensity * 2}px rgba(168, 85, 247, 0.2)`,
            pointerEvents: "none",
          }}
        />
        <AnimatedCounter from={775} to={1204} startFrame={15} />
      </div>

      {/* +56% growth badge */}
      <FadeIn delay={80} direction="up" distance={15}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 8,
            paddingBottom: 8,
            borderRadius: 999,
            background: "rgba(34, 197, 94, 0.15)",
            border: "1px solid rgba(34, 197, 94, 0.3)",
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: theme.colors.green,
              fontFamily: FONT_FAMILY,
            }}
          >
            +56% growth
          </span>
        </div>
      </FadeIn>

      {/* Why now explanation */}
      <FadeIn delay={95} direction="up" distance={15}>
        <span
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: theme.colors.white,
            fontFamily: FONT_FAMILY,
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          243 raised new rounds in 2026
        </span>
      </FadeIn>

      {/* Sound effect at counter landing */}
      <Sequence from={45} durationInFrames={30} layout="none">
        <Audio src={staticFile("sfx/notification.wav")} volume={0.50} />
      </Sequence>
    </div>
  );
};
