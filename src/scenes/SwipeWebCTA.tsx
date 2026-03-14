import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig, staticFile, Img } from "remotion";
import { FadeIn, ScaleIn } from "../components/FadeIn";
import { theme } from "../theme";

// Apple icon
const AppleIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={theme.colors.white}>
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

// Globe/web icon
const GlobeIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={theme.colors.white}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
);

// Phone icon
const PhoneIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={theme.colors.dim}>
    <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
  </svg>
);

export const SwipeWebCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // App icon
  const logoPop = spring({ frame: Math.max(0, frame - 8), fps, config: { damping: 12, stiffness: 60 } });
  const logoScale = interpolate(logoPop, [0, 1], [0.3, 1]);
  const logoOpacity = interpolate(logoPop, [0, 1], [0, 1]);

  // Pulse glow
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
        gap: 26,
        background: theme.colors.bg,
      }}
    >
      {/* App icon with pulse glow */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale * pulse})`,
          borderRadius: 28,
          overflow: "hidden",
          boxShadow: `0 0 60px rgba(168, 85, 247, 0.3)`,
        }}
      >
        <Img src={staticFile("trackly-appicon.png")} width={120} height={120} />
      </div>

      {/* Main CTA text */}
      <FadeIn delay={18}>
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

      {/* URL styled as browser address */}
      <FadeIn delay={30}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: 22,
            padding: "12px 30px",
          }}
        >
          {/* Lock icon */}
          <svg width={14} height={14} viewBox="0 0 24 24" fill={theme.colors.green}>
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
          <span
            style={{
              color: theme.colors.accentBright,
              fontSize: 22,
              fontWeight: 700,
              fontFamily: theme.font.body,
              letterSpacing: 0.5,
            }}
          >
            usetrackly.app
          </span>
        </div>
      </FadeIn>

      {/* Platform badges */}
      <FadeIn delay={42}>
        <div style={{ display: "flex", gap: 14, marginTop: 4 }}>
          {[
            { top: "Download on the", main: "iOS App Store", Icon: AppleIcon },
            { top: "Download on", main: "macOS TestFlight", Icon: AppleIcon },
            { top: "Open", main: "Web App", Icon: GlobeIcon },
          ].map((platform, i) => (
            <ScaleIn key={platform.main} delay={48 + i * 8}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: theme.colors.surface,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: 12,
                  padding: "12px 20px",
                  minWidth: 190,
                }}
              >
                <platform.Icon size={18} />
                <div>
                  <div
                    style={{
                      color: theme.colors.muted,
                      fontSize: 10,
                      fontFamily: theme.font.body,
                    }}
                  >
                    {platform.top}
                  </div>
                  <div
                    style={{
                      color: theme.colors.white,
                      fontSize: 15,
                      fontWeight: 600,
                      fontFamily: theme.font.display,
                    }}
                  >
                    {platform.main}
                  </div>
                </div>
              </div>
            </ScaleIn>
          ))}
        </div>
      </FadeIn>

      {/* "Works on any phone browser" */}
      <FadeIn delay={75}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: theme.colors.muted,
            fontSize: 15,
            fontFamily: theme.font.body,
            marginTop: 4,
          }}
        >
          <PhoneIcon size={16} />
          Works on any phone browser
        </div>
      </FadeIn>
    </div>
  );
};
