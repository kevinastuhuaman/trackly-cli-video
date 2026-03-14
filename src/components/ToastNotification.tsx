import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

interface ToastNotificationProps {
  message: string;
  icon?: string;
  iconColor?: string;
  showUndo?: boolean;
  enterFrame: number;
  style?: React.CSSProperties;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  icon = "\u2713",
  iconColor = "#22C55E",
  showUndo = true,
  enterFrame,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < enterFrame) return null;

  const localFrame = Math.max(0, frame - enterFrame);

  const progress = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const translateY = interpolate(progress, [0, 1], [60, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 70,
        left: "50%",
        transform: `translateX(-50%) translateY(${translateY}px)`,
        opacity,
        zIndex: 100,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "#18181B",
          border: "1px solid rgba(168, 85, 247, 0.3)",
          borderRadius: 999,
          minHeight: 48,
          paddingLeft: 16,
          paddingRight: 16,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          whiteSpace: "nowrap",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: iconColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            color: "#ffffff",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>

        {/* Message */}
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#ffffff",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif',
          }}
        >
          {message}
        </span>

        {/* Undo button */}
        {showUndo && (
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#A855F7",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif',
              cursor: "pointer",
            }}
          >
            Undo
          </span>
        )}
      </div>
    </div>
  );
};
