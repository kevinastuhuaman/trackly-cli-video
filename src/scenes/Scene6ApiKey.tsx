import React from "react";
import { useCurrentFrame } from "remotion";
import { TerminalWindow, TypingText, OutputLine } from "../components/Terminal";
import { FadeIn } from "../components/FadeIn";
import { theme } from "../theme";

export const Scene6ApiKey: React.FC = () => {
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
        background: theme.colors.bg,
      }}
    >
      <TerminalWindow title="zsh — trackly api-key">
        <TypingText text='trackly api-key create --name "my-agent"' startFrame={5} speed={1.5} />
        <div style={{ marginTop: 16 }}>
          <OutputLine text="" color={theme.colors.muted} appearFrame={60} />
          <OutputLine text="API Key created successfully:" color={theme.colors.green} appearFrame={65} />
          <OutputLine text="" color={theme.colors.muted} appearFrame={70} />
          {frame >= 75 && (
            <FadeIn delay={75}>
              <div
                style={{
                  background: "rgba(168, 85, 247, 0.1)",
                  border: `1px solid ${theme.colors.accent}`,
                  borderRadius: 8,
                  padding: "14px 20px",
                  marginTop: 4,
                }}
              >
                <div style={{ color: theme.colors.dim, fontSize: 12, marginBottom: 6 }}>KEY</div>
                <div style={{ color: theme.colors.accentBright, fontSize: 16, fontFamily: theme.font.mono }}>
                  trk_live_a1b2c3d4e5f6g7h8i9j0...
                </div>
              </div>
            </FadeIn>
          )}
          <OutputLine text="" color={theme.colors.muted} appearFrame={90} />
          <OutputLine
            text="⚠ Save this key — it won't be shown again."
            color={theme.colors.amber}
            appearFrame={95}
          />
          <OutputLine text="" color={theme.colors.muted} appearFrame={100} />
          <OutputLine
            text="Use: TRACKLY_API_KEY=trk_live_... trackly jobs --json"
            color={theme.colors.muted}
            appearFrame={105}
          />
        </div>
      </TerminalWindow>
    </div>
  );
};
