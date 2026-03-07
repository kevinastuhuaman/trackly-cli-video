import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { TerminalWindow, TypingText, OutputLine } from "../components/Terminal";
import { FadeIn } from "../components/FadeIn";
import { theme } from "../theme";

export const Scene2Login: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const browserPop = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 14 } });
  const browserScale = interpolate(browserPop, [0, 1], [0.8, 1]);
  const browserOpacity = interpolate(browserPop, [0, 1], [0, 1]);

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
      <TerminalWindow title="zsh — trackly login">
        <TypingText text="trackly login" startFrame={5} speed={2} />
        <OutputLine text="Opening browser for Google OAuth..." color={theme.colors.amber} appearFrame={40} />
        <OutputLine text="Waiting for authentication..." color={theme.colors.muted} appearFrame={50} />
        {frame >= 85 && (
          <OutputLine text="✓ Logged in as kevin@usetrackly.app" color={theme.colors.green} appearFrame={85} />
        )}
        {frame >= 95 && (
          <OutputLine text="✓ Token saved to ~/.trackly/config.json" color={theme.colors.green} appearFrame={95} />
        )}
      </TerminalWindow>

      {frame >= 50 && (
        <div
          style={{
            position: "absolute",
            top: 160,
            right: 80,
            opacity: browserOpacity,
            transform: `scale(${browserScale})`,
            background: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: 12,
            padding: "20px 32px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          }}
        >
          <div style={{ color: theme.colors.muted, fontSize: 14, marginBottom: 8 }}>accounts.google.com</div>
          <div style={{ color: theme.colors.white, fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
            Sign in with Google
          </div>
          <div
            style={{
              background: "#4285f4",
              color: "white",
              padding: "10px 24px",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            kevin.astuhuaman.flores@gmail.com
          </div>
        </div>
      )}
    </div>
  );
};
