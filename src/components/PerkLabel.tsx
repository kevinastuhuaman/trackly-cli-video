import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../theme";

const FONT_FAMILY = theme.font.body;

interface PerkLabelProps {
  text: string;
  delay?: number;
}

export const PerkLabel: React.FC<PerkLabelProps> = ({ text, delay = 5 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [-10, 0]);

  return (
    <div
      style={{
        position: "absolute",
        top: 36,
        left: "50%",
        transform: `translateX(-50%) translateY(${translateY}px)`,
        opacity,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 999,
        background: "rgba(168, 85, 247, 0.15)",
        border: "1px solid rgba(168, 85, 247, 0.3)",
        zIndex: 300,
      }}
    >
      <span
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: theme.colors.accentBright,
          fontFamily: FONT_FAMILY,
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}
      >
        {text}
      </span>
    </div>
  );
};
