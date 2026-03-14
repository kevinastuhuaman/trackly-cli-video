import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export interface TapEvent {
  x: number;
  y: number;
  frame: number;
}

interface TouchIndicatorProps {
  taps: TapEvent[];
  duration?: number;
  size?: number;
  expandScale?: number;
  zIndex?: number;
}

const SingleTap: React.FC<{
  tap: TapEvent;
  duration: number;
  size: number;
  expandScale: number;
}> = ({ tap, duration, size, expandScale }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - tap.frame;

  if (localFrame < 0 || localFrame >= duration) return null;

  // Phase 1: Press-down (frames 0-4)
  // Phase 2: Expand-out (frames 4-duration)
  const pressEnd = 4;

  let scale: number;
  let opacity: number;

  if (localFrame <= pressEnd) {
    // Press down: scale 1.0 → 0.85, opacity 0 → 0.35
    scale = interpolate(localFrame, [0, pressEnd], [1.0, 0.85], {
      extrapolateRight: "clamp",
    });
    opacity = interpolate(localFrame, [0, pressEnd], [0, 0.35], {
      extrapolateRight: "clamp",
    });
  } else {
    // Expand out: scale 0.85 → expandScale, opacity 0.35 → 0
    scale = interpolate(localFrame, [pressEnd, duration], [0.85, expandScale], {
      extrapolateRight: "clamp",
    });
    opacity = interpolate(localFrame, [pressEnd, duration], [0.35, 0], {
      extrapolateRight: "clamp",
    });
  }

  return (
    <div
      style={{
        position: "absolute",
        left: tap.x - size / 2,
        top: tap.y - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `rgba(255, 255, 255, ${opacity * 0.6})`,
        border: `1.5px solid rgba(255, 255, 255, ${opacity * 0.5})`,
        boxShadow: `0 0 8px rgba(255, 255, 255, ${opacity * 0.15})`,
        transform: `scale(${scale})`,
        pointerEvents: "none" as const,
      }}
    />
  );
};

export const TouchIndicator: React.FC<TouchIndicatorProps> = ({
  taps,
  duration = 18,
  size = 44,
  expandScale = 1.4,
  zIndex = 50,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none" as const,
        zIndex,
      }}
    >
      {taps.map((tap, i) => (
        <SingleTap
          key={i}
          tap={tap}
          duration={duration}
          size={size}
          expandScale={expandScale}
        />
      ))}
    </div>
  );
};
