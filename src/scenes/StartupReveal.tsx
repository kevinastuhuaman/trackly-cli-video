import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio, Sequence, staticFile } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { IPhoneFrame } from "../components/iPhoneFrame";
import { StartupCompanyRow } from "../components/StartupCompanyRow";
import { TabBar } from "../components/TabBar";
import { theme } from "../theme";

const FONT_FAMILY = theme.font.body;

const COMPANIES = [
  { name: "Cerebras Systems", domain: "cerebras.ai", valuation: "$23B", jobCount: 91 },
  { name: "Mercor", domain: "mercor.com", valuation: "$10B", jobCount: 32 },
  { name: "Suno Studio", domain: "suno.com", valuation: "$2.5B", jobCount: 43 },
  { name: "MaintainX", domain: "maintainx.com", valuation: "$2.5B", jobCount: 161 },
];

export const StartupReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Annotation appears at frame 70
  const annProgress = spring({
    frame: Math.max(0, frame - 70),
    fps,
    config: { damping: 18, stiffness: 80 },
  });
  const annOpacity = interpolate(annProgress, [0, 1], [0, 1]);
  const annTranslateY = interpolate(annProgress, [0, 1], [15, 0]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        background: theme.colors.bg,
        position: "relative",
      }}
    >
      {/* Phone on left */}
      <div style={{ marginRight: 40 }}>
        <IPhoneFrame screenBackground={theme.colors.bg}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              fontFamily: FONT_FAMILY,
              position: "relative",
            }}
          >
            {/* Nav title */}
            <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }}>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: theme.colors.white,
                  fontFamily: FONT_FAMILY,
                  letterSpacing: -0.5,
                }}
              >
                Companies
              </span>
            </div>

            {/* Company rows -- staggered spring entrance */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 4,
              }}
            >
              {COMPANIES.map((company, i) => {
                const rowDelay = 15 + i * 10;
                const rowProgress = spring({
                  frame: Math.max(0, frame - rowDelay),
                  fps,
                  config: { damping: 12, stiffness: 80 },
                });
                const rowOpacity = interpolate(rowProgress, [0, 1], [0, 1]);
                const rowTranslateY = interpolate(rowProgress, [0, 1], [20, 0]);

                return (
                  <div
                    key={company.domain}
                    style={{
                      opacity: rowOpacity,
                      transform: `translateY(${rowTranslateY}px)`,
                    }}
                  >
                    <StartupCompanyRow
                      name={company.name}
                      domain={company.domain}
                      valuation={company.valuation}
                      jobCount={company.jobCount}
                    />
                  </div>
                );
              })}
            </div>

            {/* Tab bar */}
            <TabBar activeTab="companies" />
          </div>
        </IPhoneFrame>
      </div>

      {/* Annotation on right */}
      <div
        style={{
          position: "absolute",
          right: 50,
          top: "50%",
          transform: "translateY(-50%)",
          maxWidth: 260,
          opacity: annOpacity,
        }}
      >
        <div style={{ transform: `translateY(${annTranslateY}px)` }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: theme.colors.accentBright,
                fontFamily: FONT_FAMILY,
                lineHeight: 1.3,
              }}
            >
              PM, Growth, Strategy, Ops
            </span>
            <span
              style={{
                fontSize: 24,
                fontWeight: 400,
                color: theme.colors.white,
                fontFamily: FONT_FAMILY,
                lineHeight: 1.4,
              }}
            >
              roles at companies your classmates haven't found yet
            </span>
          </div>
        </div>
      </div>

      {/* Sound effect */}
      <Sequence from={15} durationInFrames={20} layout="none">
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.20} />
      </Sequence>
    </div>
  );
};
