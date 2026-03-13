import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../theme";

interface StarIconProps {
  filled: boolean;
  size?: number;
  animateAt?: number;
}

const PARTICLE_COUNT = 6;

export const StarIcon: React.FC<StarIconProps> = ({
  filled,
  size = 24,
  animateAt,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Determine if we should show filled state
  const isFilled =
    filled || (animateAt !== undefined && frame >= animateAt);

  // Animation progress (only animates when animateAt is set)
  const animating = animateAt !== undefined && frame >= animateAt;
  const localFrame = animating ? Math.max(0, frame - animateAt) : 0;

  const fillProgress = animating
    ? spring({
        frame: localFrame,
        fps,
        config: { damping: 12, stiffness: 120 },
      })
    : isFilled
      ? 1
      : 0;

  // Scale bounce
  const scaleBounce = animating
    ? spring({
        frame: localFrame,
        fps,
        config: { damping: 8, stiffness: 200 },
      })
    : 1;

  const scale = animating
    ? interpolate(scaleBounce, [0, 1], [0.6, 1])
    : 1;

  // Particle animation
  const particleProgress = animating
    ? spring({
        frame: localFrame,
        fps,
        config: { damping: 20, stiffness: 80 },
      })
    : 0;

  const particleOpacity = animating
    ? interpolate(localFrame, [0, 6, 12], [0, 1, 0], {
        extrapolateRight: "clamp",
      })
    : 0;

  // Star SVG path (5-point star)
  const starPath =
    "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z";

  const goldColor = "#FBBF24";

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale})`,
      }}
    >
      {/* Burst particles */}
      {animating &&
        Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
          const angle = (i * 360) / PARTICLE_COUNT;
          const rad = (angle * Math.PI) / 180;
          const distance = interpolate(particleProgress, [0, 1], [0, size * 0.9]);
          const px = Math.cos(rad) * distance;
          const py = Math.sin(rad) * distance;
          const dotSize = interpolate(particleProgress, [0, 1], [3, 1.5]);

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: dotSize,
                height: dotSize,
                borderRadius: "50%",
                background: goldColor,
                opacity: particleOpacity,
                transform: `translate(${px}px, ${py}px)`,
                top: "50%",
                left: "50%",
                marginTop: -dotSize / 2,
                marginLeft: -dotSize / 2,
                pointerEvents: "none",
              }}
            />
          );
        })}

      {/* Star SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={starPath}
          fill={isFilled ? goldColor : "none"}
          stroke={isFilled ? goldColor : theme.colors.muted}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={isFilled ? fillProgress : 1}
        />
        {/* Outline layer (visible while transitioning) */}
        {animating && fillProgress < 1 && (
          <path
            d={starPath}
            fill="none"
            stroke={theme.colors.muted}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={1 - fillProgress}
          />
        )}
      </svg>
    </div>
  );
};
