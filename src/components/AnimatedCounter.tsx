import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../theme";

interface AnimatedCounterProps {
  from: number;
  to: number;
  startFrame?: number;
  style?: React.CSSProperties;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from,
  to,
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config: { damping: 14, stiffness: 60 },
  });

  const value = Math.round(interpolate(progress, [0, 1], [from, to]));

  return (
    <span
      style={{
        fontSize: 80,
        fontWeight: 800,
        color: theme.colors.white,
        fontFamily: theme.font.display,
        letterSpacing: -2,
        lineHeight: 1,
        fontVariantNumeric: "tabular-nums",
        ...style,
      }}
    >
      {value.toLocaleString()}
    </span>
  );
};
