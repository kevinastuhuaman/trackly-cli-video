import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { FadeIn, ScaleIn } from "../components/FadeIn";
import { theme } from "../theme";

const CodeBlock: React.FC<{
  lines: { text: string; color: string; indent: number }[];
  delay: number;
}> = ({ lines, delay }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: 12,
        padding: "20px 24px",
        fontFamily: theme.font.mono,
        fontSize: 14,
        lineHeight: 1.8,
      }}
    >
      {lines.map((line, i) => {
        const lineDelay = delay + i * 3;
        if (frame < lineDelay) return null;
        const localFrame = frame - lineDelay;
        const opacity = interpolate(localFrame, [0, 5], [0, 1], { extrapolateRight: "clamp" });
        return (
          <div key={i} style={{ opacity, paddingLeft: line.indent * 20, color: line.color }}>
            {line.text}
          </div>
        );
      })}
    </div>
  );
};

export const Scene5MCP: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        background: theme.colors.bg,
        padding: "0 60px",
      }}
    >
      <FadeIn delay={5}>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <span
            style={{
              color: theme.colors.accent,
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: 3,
              fontWeight: 600,
            }}
          >
            MCP Server
          </span>
          <div style={{ color: theme.colors.white, fontSize: 32, fontWeight: 700, marginTop: 8, fontFamily: theme.font.display }}>
            Works with your AI agent
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={20} direction="up">
        <div style={{ color: theme.colors.muted, fontSize: 13, marginBottom: 4 }}>
          ~/.claude/settings.json
        </div>
        <CodeBlock
          delay={25}
          lines={[
            { text: "{", color: theme.colors.white, indent: 0 },
            { text: '"mcpServers": {', color: theme.colors.white, indent: 1 },
            { text: '"trackly": {', color: theme.colors.accentBright, indent: 2 },
            { text: '"command": "trackly",', color: theme.colors.green, indent: 3 },
            { text: '"args": ["mcp"]', color: theme.colors.green, indent: 3 },
            { text: "}", color: theme.colors.accentBright, indent: 2 },
            { text: "}", color: theme.colors.white, indent: 1 },
            { text: "}", color: theme.colors.white, indent: 0 },
          ]}
        />
      </FadeIn>

      {frame >= 65 && (
        <FadeIn delay={65} direction="up">
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 8,
            }}
          >
            {[
              { name: "Claude Code", color: theme.colors.accent },
              { name: "OpenClaw", color: "#ef4444" },
              { name: "Codex", color: theme.colors.amber },
            ].map((agent, i) => (
              <ScaleIn key={agent.name} delay={70 + i * 8}>
                <div
                  style={{
                    background: theme.colors.surface,
                    border: `1.5px solid ${agent.color}`,
                    borderRadius: 10,
                    padding: "14px 28px",
                    color: theme.colors.white,
                    fontSize: 16,
                    fontWeight: 600,
                    textAlign: "center",
                    fontFamily: theme.font.display,
                  }}
                >
                  {agent.name}
                </div>
              </ScaleIn>
            ))}
          </div>
        </FadeIn>
      )}
    </div>
  );
};
