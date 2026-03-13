import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { theme } from "../theme";

const FONT_FAMILY = theme.font.body;

export const FavNoNoise: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 48,
        background: theme.colors.bg,
      }}
    >
      {/* Stats comparison row */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
        }}
      >
        {/* Left stat: 775+ companies */}
        <FadeIn delay={0} direction="up" distance={25}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: theme.colors.white,
                fontFamily: FONT_FAMILY,
                letterSpacing: -1,
                lineHeight: 1,
              }}
            >
              775+
            </span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 400,
                color: theme.colors.muted,
                fontFamily: FONT_FAMILY,
              }}
            >
              companies tracked
            </span>
          </div>
        </FadeIn>

        {/* Divider + "vs" */}
        <FadeIn delay={5} direction="none">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 1,
                height: 40,
                background: theme.colors.border,
              }}
            />
            <span
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: theme.colors.dim,
                fontFamily: FONT_FAMILY,
              }}
            >
              vs
            </span>
            <div
              style={{
                width: 1,
                height: 40,
                background: theme.colors.border,
              }}
            />
          </div>
        </FadeIn>

        {/* Right stat: 20 favorites */}
        <FadeIn delay={10} direction="up" distance={25}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: theme.colors.accent,
                fontFamily: FONT_FAMILY,
                letterSpacing: -1,
                lineHeight: 1,
              }}
            >
              20
            </span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 400,
                color: theme.colors.muted,
                fontFamily: FONT_FAMILY,
              }}
            >
              your favorites
            </span>
          </div>
        </FadeIn>
      </div>

      {/* Tagline */}
      <FadeIn delay={30} direction="up" distance={20}>
        <span
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: theme.colors.white,
            fontFamily: FONT_FAMILY,
            textAlign: "center",
          }}
        >
          No noise. Just signal.
        </span>
      </FadeIn>
    </div>
  );
};
