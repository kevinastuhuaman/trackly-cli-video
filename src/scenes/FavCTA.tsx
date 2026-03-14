import React from "react";
import { Audio, Sequence, useCurrentFrame, staticFile, Img } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { theme } from "../theme";

const FONT_FAMILY = theme.font.body;

export const FavCTA: React.FC = () => {
  const frame = useCurrentFrame();

  // Pulsing glow on app icon (sinusoidal)
  const glowPulse = Math.sin(frame * 0.06) * 0.15 + 0.85;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        background: theme.colors.bg,
      }}
    >
      {/* Line 1 */}
      <FadeIn delay={0} direction="up" distance={30}>
        <span
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: theme.colors.white,
            fontFamily: theme.font.display,
            textAlign: "center",
          }}
        >
          Your companies.
        </span>
      </FadeIn>

      {/* Line 2 */}
      <FadeIn delay={10} direction="up" distance={30}>
        <span
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: theme.colors.accent,
            fontFamily: theme.font.display,
            textAlign: "center",
          }}
        >
          Your alerts.
        </span>
      </FadeIn>

      {/* Line 3 */}
      <FadeIn delay={25} direction="up" distance={30}>
        <span
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: theme.colors.white,
            fontFamily: theme.font.display,
            textAlign: "center",
          }}
        >
          Your edge.
        </span>
      </FadeIn>

      {/* App icon with pulsing glow — real Trackly icon */}
      <FadeIn delay={50} direction="up" distance={20}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: `0 0 ${40 * glowPulse}px rgba(168, 85, 247, ${0.4 * glowPulse}), 0 0 ${80 * glowPulse}px rgba(168, 85, 247, ${0.15 * glowPulse})`,
          }}
        >
          <Img src={staticFile("trackly-appicon.png")} width={80} height={80} />
        </div>
      </FadeIn>

      {/* Brand stack: Company → Slogan → Availability */}
      <FadeIn delay={65} direction="up" distance={15}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <span
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: theme.colors.white,
              fontFamily: theme.font.display,
              letterSpacing: -0.5,
            }}
          >
            Trackly
          </span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: theme.colors.accentBright,
              fontFamily: FONT_FAMILY,
              letterSpacing: 0.3,
            }}
          >
            Apply first. Get Hired.
          </span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: theme.colors.dim,
              fontFamily: FONT_FAMILY,
              marginTop: 2,
            }}
          >
            Available on TestFlight
          </span>
        </div>
      </FadeIn>

      {/* Sound effect — brand reveal */}
      <Sequence from={50} durationInFrames={60} layout="none">
        <Audio src={staticFile("sfx/resolve.wav")} volume={0.45} />
      </Sequence>
    </div>
  );
};
