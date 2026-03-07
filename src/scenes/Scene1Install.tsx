import React from "react";
import { useCurrentFrame, staticFile, Img, interpolate, spring, useVideoConfig } from "remotion";
import { TerminalWindow, TypingText, OutputLine } from "../components/Terminal";
import { FadeIn } from "../components/FadeIn";
import { theme } from "../theme";

export const Scene1Install: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // App icon pop-in at the top
  const iconPop = spring({ frame: Math.max(0, frame - 0), fps, config: { damping: 15, stiffness: 80 } });
  const iconScale = interpolate(iconPop, [0, 1], [0.5, 1]);
  const iconOpacity = interpolate(iconPop, [0, 1], [0, 1]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        background: theme.colors.bg,
      }}
    >
      {/* Trackly branding at top */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: iconOpacity,
          transform: `scale(${iconScale})`,
          marginBottom: 8,
        }}
      >
        <div style={{ borderRadius: 14, overflow: "hidden", boxShadow: "0 0 40px rgba(168, 85, 247, 0.35)" }}>
          <Img
            src={staticFile("trackly-appicon.png")}
            width={56}
            height={56}
          />
        </div>
        <div>
          <div style={{ color: theme.colors.white, fontSize: 28, fontWeight: 700, fontFamily: theme.font.display }}>
            Trackly CLI
          </div>
          <div style={{ color: theme.colors.muted, fontSize: 14, fontFamily: theme.font.body }}>
            Apply first. Get Hired.
          </div>
        </div>
      </div>

      <TerminalWindow title="zsh">
        <TypingText text="npm install -g trackly-cli" startFrame={15} speed={1.5} />
        <div style={{ marginTop: 16 }}>
          <OutputLine text="added 42 packages in 3.2s" color={theme.colors.muted} appearFrame={55} />
          <OutputLine text="" color={theme.colors.muted} appearFrame={65} />
          <OutputLine
            text="  ╔════════════════════════════════════╗"
            color={theme.colors.accent}
            appearFrame={70}
          />
          <OutputLine
            text="  ║         T R A C K L Y              ║"
            color={theme.colors.accent}
            appearFrame={75}
          />
          <OutputLine
            text="  ║   CLI + MCP Server  v0.1.0         ║"
            color={theme.colors.accentBright}
            appearFrame={80}
          />
          <OutputLine
            text="  ╚════════════════════════════════════╝"
            color={theme.colors.accent}
            appearFrame={85}
          />
          <OutputLine text="" color={theme.colors.muted} appearFrame={90} />
          <OutputLine
            text="✓ Installed globally. Run: trackly --help"
            color={theme.colors.green}
            appearFrame={95}
          />
        </div>
      </TerminalWindow>
    </div>
  );
};
