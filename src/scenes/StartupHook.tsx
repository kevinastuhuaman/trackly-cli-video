import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { theme } from "../theme";

const FONT_FAMILY = theme.font.display;

const LOGOS = [
  { domain: "cerebras.ai", name: "Cerebras" },
  { domain: "suno.com", name: "Suno" },
  { domain: "mercor.com", name: "Mercor" },
  { domain: "maintainx.com", name: "MaintainX" },
  { domain: "ramp.com", name: "Ramp" },
  { domain: "brex.com", name: "Brex" },
];

export const StartupHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Drifting gradient orb
  const orbX = Math.sin(frame * 0.02) * 30;
  const orbY = Math.cos(frame * 0.015) * 20;

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
        background: theme.colors.bg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient gradient orb */}
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          transform: `translate(${orbX}px, ${orbY}px)`,
          top: "30%",
          left: "50%",
          marginLeft: -150,
          pointerEvents: "none",
        }}
      />

      {/* Big number "387" */}
      <FadeIn delay={0} direction="none" distance={0}>
        <span
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: theme.colors.white,
            fontFamily: FONT_FAMILY,
            letterSpacing: -3,
            lineHeight: 1,
          }}
        >
          387
        </span>
      </FadeIn>

      {/* Headline */}
      <FadeIn delay={8} direction="up" distance={25}>
        <span
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: theme.colors.white,
            fontFamily: FONT_FAMILY,
            textAlign: "center",
            lineHeight: 1.15,
            letterSpacing: -0.5,
          }}
        >
          venture-backed companies
        </span>
      </FadeIn>

      {/* Subtitle */}
      <FadeIn delay={20} direction="up" distance={20}>
        <span
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: theme.colors.muted,
            fontFamily: theme.font.body,
            textAlign: "center",
          }}
        >
          Curated by a Berkeley Haas startup advisor
        </span>
      </FadeIn>

      {/* PitchBook line */}
      <FadeIn delay={35} direction="up" distance={15}>
        <span
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: theme.colors.accentBright,
            fontFamily: theme.font.body,
            textAlign: "center",
          }}
        >
          from PitchBook data
        </span>
      </FadeIn>

      {/* Logo grid */}
      <FadeIn delay={45} direction="up" distance={20}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 16,
            marginTop: 8,
          }}
        >
          {LOGOS.map((logo, i) => (
            <div
              key={logo.domain}
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: theme.colors.surface,
                border: "1px solid #2F3336",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <Img
                src={`https://www.google.com/s2/favicons?domain=${logo.domain}&sz=128`}
                width={32}
                height={32}
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
};
