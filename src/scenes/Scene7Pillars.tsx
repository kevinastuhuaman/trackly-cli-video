import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { theme } from "../theme";

// Terminal icon - white prompt on dark bg, matching macOS Terminal.app
const TerminalIcon: React.FC = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
    <rect x="2" y="2" width="56" height="56" rx="13" fill="#1c1c1e" stroke={theme.colors.green} strokeWidth="2" />
    <path d="M18 38L28 28L18 18" stroke={theme.colors.white} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="32" y1="38" x2="42" y2="38" stroke={theme.colors.muted} strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

// Claude Code icon - sparkle/tilde on purple
const ClaudeCodeIcon: React.FC = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
    <rect x="2" y="2" width="56" height="56" rx="13" fill="rgba(168, 85, 247, 0.15)" stroke={theme.colors.accent} strokeWidth="2" />
    {/* Anthropic sparkle */}
    <path d="M30 14L33 24L43 27L33 30L30 40L27 30L17 27L27 24Z" fill={theme.colors.accentBright} />
    <circle cx="42" cy="16" r="3" fill={theme.colors.accent} opacity="0.6" />
    <circle cx="18" cy="40" r="2.5" fill={theme.colors.accent} opacity="0.4" />
  </svg>
);

// OpenClaw icon - claw/asterisk on amber
const OpenClawIcon: React.FC = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
    <rect x="2" y="2" width="56" height="56" rx="13" fill="rgba(251, 191, 36, 0.12)" stroke={theme.colors.amber} strokeWidth="2" />
    {/* Claw shape */}
    <path d="M30 18V42" stroke={theme.colors.amber} strokeWidth="3.5" strokeLinecap="round" />
    <path d="M18 24L42 36" stroke={theme.colors.amber} strokeWidth="3.5" strokeLinecap="round" />
    <path d="M18 36L42 24" stroke={theme.colors.amber} strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="30" cy="30" r="4" fill={theme.colors.amber} />
  </svg>
);

const Pillar: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
  delay: number;
}> = ({ icon, title, subtitle, color, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const adjustedFrame = Math.max(0, frame - delay);
  const progress = spring({ frame: adjustedFrame, fps, config: { damping: 14, stiffness: 80 } });
  const scale = interpolate(progress, [0, 1], [0.7, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        width: 260,
      }}
    >
      <div
        style={{
          width: 88,
          height: 88,
          borderRadius: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 8px 32px ${color}30`,
        }}
      >
        {icon}
      </div>
      <div style={{ color: theme.colors.white, fontSize: 24, fontWeight: 700, fontFamily: theme.font.display }}>
        {title}
      </div>
      <div
        style={{
          color: theme.colors.muted,
          fontSize: 15,
          textAlign: "center",
          lineHeight: 1.6,
          fontFamily: theme.font.body,
          maxWidth: 220,
        }}
      >
        {subtitle}
      </div>
    </div>
  );
};

export const Scene7Pillars: React.FC = () => {
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
        gap: 48,
        background: theme.colors.bg,
      }}
    >
      <FadeIn delay={5}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              color: theme.colors.accent,
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: 3,
              fontWeight: 600,
              marginBottom: 12,
              fontFamily: theme.font.body,
            }}
          >
            Three ways to access
          </div>
          <div
            style={{
              color: theme.colors.white,
              fontSize: 42,
              fontWeight: 700,
              fontFamily: theme.font.display,
            }}
          >
            Your job hunt, everywhere
          </div>
        </div>
      </FadeIn>

      <div style={{ display: "flex", gap: 48, marginTop: 16 }}>
        <Pillar
          icon={<TerminalIcon />}
          title="Terminal"
          subtitle="Full CLI with filters, search, and apply tracking"
          color={theme.colors.green}
          delay={25}
        />
        <Pillar
          icon={<ClaudeCodeIcon />}
          title="Claude Code"
          subtitle="MCP server for natural language job queries"
          color={theme.colors.accent}
          delay={40}
        />
        <Pillar
          icon={<OpenClawIcon />}
          title="OpenClaw"
          subtitle="Same MCP tools in your favorite open-source agent"
          color={theme.colors.amber}
          delay={55}
        />
      </div>

      {frame >= 80 && (
        <FadeIn delay={80}>
          <div
            style={{
              color: theme.colors.dim,
              fontSize: 15,
              marginTop: 8,
              fontFamily: theme.font.body,
            }}
          >
            + Public API with API key access for any integration
          </div>
        </FadeIn>
      )}
    </div>
  );
};
