import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { theme } from "../theme";

export const TerminalWindow: React.FC<{
  children: React.ReactNode;
  title?: string;
}> = ({ children, title = "Terminal" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideUp = spring({ frame, fps, config: { damping: 20, stiffness: 100 } });
  const translateY = interpolate(slideUp, [0, 1], [40, 0]);
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        width: "90%",
        maxWidth: 920,
        borderRadius: 16,
        overflow: "hidden",
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "14px 20px",
          background: theme.colors.border,
        }}
      >
        <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#ef4444" }} />
        <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#fbbf24" }} />
        <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#22c55e" }} />
        <span
          style={{
            marginLeft: 12,
            color: theme.colors.muted,
            fontSize: 14,
            fontFamily: theme.font.body,
          }}
        >
          {title}
        </span>
      </div>
      {/* Content */}
      <div style={{ padding: "24px 28px", fontFamily: theme.font.mono, fontSize: 16, lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  );
};

export const TypingText: React.FC<{
  text: string;
  startFrame?: number;
  speed?: number;
  color?: string;
  prefix?: string;
  prefixColor?: string;
}> = ({ text, startFrame = 0, speed = 2, color = theme.colors.white, prefix = "$ ", prefixColor = theme.colors.green }) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const charsToShow = Math.min(Math.floor(elapsed / speed), text.length);
  const showCursor = elapsed < text.length * speed + 15;

  return (
    <div style={{ display: "flex" }}>
      <span style={{ color: prefixColor }}>{prefix}</span>
      <span style={{ color }}>
        {text.slice(0, charsToShow)}
        {showCursor && (
          <span
            style={{
              opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
              background: theme.colors.accent,
              width: 10,
              height: 20,
              display: "inline-block",
              marginLeft: 2,
              verticalAlign: "middle",
            }}
          />
        )}
      </span>
    </div>
  );
};

export const OutputLine: React.FC<{
  text: string;
  color?: string;
  appearFrame: number;
}> = ({ text, color = theme.colors.muted, appearFrame }) => {
  const frame = useCurrentFrame();
  if (frame < appearFrame) return null;

  const localFrame = frame - appearFrame;
  const opacity = interpolate(localFrame, [0, 5], [0, 1], { extrapolateRight: "clamp" });
  const translateX = interpolate(localFrame, [0, 5], [-10, 0], { extrapolateRight: "clamp" });

  return (
    <div style={{ opacity, transform: `translateX(${translateX}px)`, color }}>
      {text}
    </div>
  );
};
