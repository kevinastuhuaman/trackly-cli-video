import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { theme } from "../theme";

export const FavIntro: React.FC = () => {
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

  // Subtle sparkle particles
  const particles = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i * 45 + frame * 1.2) % 360;
    const rad = (angle * Math.PI) / 180;
    const radius = 120 + Math.sin(frame * 0.05 + i) * 30;
    const x = Math.cos(rad) * radius;
    const y = Math.sin(rad) * radius;
    const sparkleOpacity =
      Math.sin(frame * 0.1 + i * 1.5) * 0.3 + 0.3;
    const size = 2 + Math.sin(frame * 0.08 + i) * 1;
    return { x, y, opacity: sparkleOpacity, size };
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        background: `radial-gradient(circle at 50% 45%, rgba(168, 85, 247, 0.08) 0%, ${theme.colors.bg} 60%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Sparkle particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: theme.colors.amber,
            opacity: p.opacity,
            transform: `translate(${p.x}px, ${p.y - 40}px)`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* App icon — purple rounded square with "T" */}
      <FadeIn delay={0} direction="none">
        <div
          style={{
            opacity: iconOpacity,
            transform: `scale(${iconScale})`,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: theme.colors.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 40px rgba(168, 85, 247, 0.4)`,
            }}
          >
            <span
              style={{
                color: "#FFFFFF",
                fontSize: 40,
                fontWeight: 700,
                lineHeight: 1,
                fontFamily: theme.font.body,
              }}
            >
              T
            </span>
          </div>
        </div>
      </FadeIn>

      {/* Title */}
      <FadeIn delay={8} direction="up" distance={30}>
        <div
          style={{
            color: theme.colors.white,
            fontSize: 36,
            fontWeight: 800,
            fontFamily: theme.font.display,
            textAlign: "center",
            letterSpacing: -0.5,
          }}
        >
          Favorites
        </div>
      </FadeIn>

      {/* Subtitle */}
      <FadeIn delay={16} direction="up" distance={20}>
        <div
          style={{
            color: theme.colors.muted,
            fontSize: 18,
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
