import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

export const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, direction = "up", distance = 30, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);
  const progress = spring({ frame: adjustedFrame, fps, config: { damping: 18, stiffness: 80 } });

  const transforms: Record<string, string> = {
    up: `translateY(${interpolate(progress, [0, 1], [distance, 0])}px)`,
    down: `translateY(${interpolate(progress, [0, 1], [-distance, 0])}px)`,
    left: `translateX(${interpolate(progress, [0, 1], [distance, 0])}px)`,
    right: `translateX(${interpolate(progress, [0, 1], [-distance, 0])}px)`,
    none: "none",
  };

  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div style={{ opacity, transform: transforms[direction], ...style }}>
      {children}
    </div>
  );
};

export const ScaleIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);
  const progress = spring({ frame: adjustedFrame, fps, config: { damping: 15, stiffness: 100 } });

  const scale = interpolate(progress, [0, 1], [0.85, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div style={{ opacity, transform: `scale(${scale})`, ...style }}>
      {children}
    </div>
  );
};
