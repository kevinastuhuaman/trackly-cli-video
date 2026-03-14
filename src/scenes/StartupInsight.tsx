import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio, Sequence, staticFile } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { theme } from "../theme";

const FONT_FAMILY = theme.font.display;

const COMPANIES = [
  { name: "Cerebras", valuation: "$23B" },
  { name: "Mercor", valuation: "$10B" },
  { name: "Suno", valuation: "$2.5B" },
];

export const StartupInsight: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Pitch anyway." word-by-word stagger
  const pitchProgress = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 10, stiffness: 80 },
  });
  const pitchOpacity = interpolate(pitchProgress, [0, 1], [0, 1]);
  const pitchScale = interpolate(pitchProgress, [0, 1], [0.9, 1]);
  const pitchTranslateY = interpolate(pitchProgress, [0, 1], [20, 0]);

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
        position: "relative",
      }}
    >
      {/* "No open roles?" */}
      <FadeIn delay={10} direction="up" distance={25}>
        <span
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: theme.colors.white,
            fontFamily: FONT_FAMILY,
            textAlign: "center",
          }}
        >
          No open roles?
        </span>
      </FadeIn>

      {/* "Pitch anyway." — elastic spring entrance */}
      <div
        style={{
          opacity: pitchOpacity,
          transform: `scale(${pitchScale}) translateY(${pitchTranslateY}px)`,
        }}
      >
        <span
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: theme.colors.accentBright,
            fontFamily: FONT_FAMILY,
            textAlign: "center",
            letterSpacing: -1,
          }}
        >
          Pitch anyway.
        </span>
      </div>

      {/* Explanation */}
      <FadeIn delay={55} direction="up" distance={15}>
        <span
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: theme.colors.muted,
            fontFamily: theme.font.body,
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          Funded startups create positions for the right pitch.
        </span>
      </FadeIn>

      {/* Company pills */}
      <div style={{ display: "flex", flexDirection: "row", gap: 12, marginTop: 4 }}>
        {COMPANIES.map((company, i) => {
          const pillDelay = 75 + i * 8;
          const pillProgress = spring({
            frame: Math.max(0, frame - pillDelay),
            fps,
            config: { damping: 15, stiffness: 80 },
          });
          const pillOpacity = interpolate(pillProgress, [0, 1], [0, 1]);
          const pillTranslateY = interpolate(pillProgress, [0, 1], [10, 0]);

          return (
            <div
              key={company.name}
              style={{
                opacity: pillOpacity,
                transform: `translateY(${pillTranslateY}px)`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  paddingLeft: 14,
                  paddingRight: 14,
                  paddingTop: 8,
                  paddingBottom: 8,
                  borderRadius: 999,
                  background: "rgba(34, 197, 94, 0.12)",
                  border: "1px solid rgba(34, 197, 94, 0.25)",
                }}
              >
                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 600,
                    color: theme.colors.white,
                    fontFamily: theme.font.body,
                  }}
                >
                  {company.name}
                </span>
                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: theme.colors.green,
                    fontFamily: theme.font.body,
                  }}
                >
                  {company.valuation}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sound effect */}
      <Sequence from={30} durationInFrames={30} layout="none">
        <Audio src={staticFile("sfx/resolve.wav")} volume={0.45} />
      </Sequence>
    </div>
  );
};
