import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig, staticFile, Img } from "remotion";
import { FadeIn, ScaleIn } from "../components/FadeIn";
import { theme } from "../theme";

// GitHub SVG icon - white, clearly visible
const GitHubIcon: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={theme.colors.white}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

// Apple icon SVG
const AppleIcon: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={theme.colors.white}>
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

export const Scene8CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoPop = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 12, stiffness: 60 } });
  const logoScale = interpolate(logoPop, [0, 1], [0.3, 1]);
  const logoOpacity = interpolate(logoPop, [0, 1], [0, 1]);

  // Subtle pulse on app icon
  const pulse = Math.sin(frame * 0.06) * 0.04 + 1;

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
      }}
    >
      {/* Trackly app icon */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale * pulse})`,
          borderRadius: 28,
          overflow: "hidden",
          boxShadow: `0 0 60px rgba(168, 85, 247, 0.25)`,
        }}
      >
        <Img src={staticFile("trackly-appicon.png")} width={120} height={120} />
      </div>

      <FadeIn delay={20}>
        <div
          style={{
            color: theme.colors.white,
            fontSize: 38,
            fontWeight: 800,
            fontFamily: theme.font.display,
            textAlign: "center",
          }}
        >
          Apply first. Get Hired.
        </div>
      </FadeIn>

      {/* Platform badges */}
      <FadeIn delay={35}>
        <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
          {[
            { top: "Download on the", main: "iOS App Store", showApple: true },
            { top: "Download on", main: "macOS TestFlight", showApple: true },
            { top: "Open", main: "usetrackly.app", showApple: false },
          ].map((platform, i) => (
            <ScaleIn key={platform.main} delay={40 + i * 8}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: theme.colors.surface,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: 12,
                  padding: "12px 22px",
                  minWidth: 200,
                }}
              >
                {platform.showApple && <AppleIcon size={18} />}
                {!platform.showApple && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={theme.colors.white}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                )}
                <div>
                  <div style={{ color: theme.colors.muted, fontSize: 10, fontFamily: theme.font.body }}>
                    {platform.top}
                  </div>
                  <div style={{ color: theme.colors.white, fontSize: 15, fontWeight: 600, fontFamily: theme.font.display }}>
                    {platform.main}
                  </div>
                </div>
              </div>
            </ScaleIn>
          ))}
        </div>
        <FadeIn delay={68}>
          <div style={{ color: theme.colors.dim, fontSize: 13, textAlign: "center", marginTop: 10, fontFamily: theme.font.body }}>
            Mac App Store coming soon
          </div>
        </FadeIn>
      </FadeIn>

      {/* GitHub + npm */}
      <FadeIn delay={70}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <GitHubIcon size={24} />
            <span style={{ color: theme.colors.accentBright, fontSize: 16, fontFamily: theme.font.mono }}>
              kevinastuhuaman/trackly-cli
            </span>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={80}>
        <div
          style={{
            background: "rgba(168, 85, 247, 0.1)",
            border: `1px solid ${theme.colors.accent}`,
            borderRadius: 10,
            padding: "12px 28px",
            fontFamily: theme.font.mono,
            fontSize: 17,
            color: theme.colors.white,
          }}
        >
          npm install -g trackly-cli
        </div>
      </FadeIn>

    </div>
  );
};
