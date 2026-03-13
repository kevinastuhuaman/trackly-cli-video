import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../theme";

interface NotificationBannerProps {
  appName: string;
  title: string;
  body: string;
  enterFrame: number;
  exitFrame?: number;
}

export const NotificationBanner: React.FC<NotificationBannerProps> = ({
  appName,
  title,
  body,
  enterFrame,
  exitFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < enterFrame) return null;

  // Enter animation
  const enterLocal = Math.max(0, frame - enterFrame);
  const enterProgress = spring({
    frame: enterLocal,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  let translateY = interpolate(enterProgress, [0, 1], [-100, 0]);
  let opacity = interpolate(enterProgress, [0, 1], [0, 1]);

  // Exit animation
  if (exitFrame !== undefined && frame >= exitFrame) {
    const exitLocal = Math.max(0, frame - exitFrame);
    const exitProgress = spring({
      frame: exitLocal,
      fps,
      config: { damping: 18, stiffness: 120 },
    });

    translateY = interpolate(exitProgress, [0, 1], [0, -100]);
    opacity = interpolate(exitProgress, [0, 1], [1, 0]);
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        left: "50%",
        transform: `translateX(-50%) translateY(${translateY}px)`,
        opacity,
        zIndex: 200,
        width: 340,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          padding: 12,
          background: "rgba(30, 30, 46, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: 16,
          fontFamily: theme.font.body,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        }}
      >
        {/* App icon */}
        <div
          style={{
            width: 36,
            height: 36,
            minWidth: 36,
            borderRadius: 8,
            background: theme.colors.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "#FFFFFF",
              fontSize: 18,
              fontWeight: 700,
              lineHeight: 1,
              fontFamily: theme.font.body,
            }}
          >
            T
          </span>
        </div>

        {/* Text content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            flex: 1,
            minWidth: 0,
          }}
        >
          {/* App name row + time */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: theme.colors.muted,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                lineHeight: 1.2,
                fontFamily: theme.font.body,
              }}
            >
              {appName}
            </span>
            <span
              style={{
                fontSize: 10,
                color: theme.colors.muted,
                lineHeight: 1.2,
                fontFamily: theme.font.body,
              }}
            >
              now
            </span>
          </div>

          {/* Title */}
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: theme.colors.white,
              lineHeight: 1.3,
              fontFamily: theme.font.body,
            }}
          >
            {title}
          </span>

          {/* Body */}
          <span
            style={{
              fontSize: 13,
              color: theme.colors.muted,
              lineHeight: 1.3,
              fontFamily: theme.font.body,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {body}
          </span>
        </div>
      </div>
    </div>
  );
};
