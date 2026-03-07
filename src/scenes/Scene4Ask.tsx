import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { TerminalWindow, TypingText, OutputLine } from "../components/Terminal";
import { FadeIn } from "../components/FadeIn";
import { theme } from "../theme";

const StreamingText: React.FC<{
  lines: string[];
  startFrame: number;
  framesPerLine: number;
}> = ({ lines, startFrame, framesPerLine }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ marginTop: 12 }}>
      {lines.map((line, i) => {
        const lineStart = startFrame + i * framesPerLine;
        if (frame < lineStart) return null;
        const localFrame = frame - lineStart;
        const opacity = interpolate(localFrame, [0, 4], [0, 1], { extrapolateRight: "clamp" });
        return (
          <div key={i} style={{ opacity, color: theme.colors.muted, fontSize: 14, lineHeight: 1.8 }}>
            {line}
          </div>
        );
      })}
    </div>
  );
};

export const Scene4Ask: React.FC = () => {
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
      <TerminalWindow title="zsh — trackly ask">
        <TypingText text={'trackly ask "PM jobs at fintech companies in SF"'} startFrame={5} speed={1.2} />
        <div style={{ marginTop: 16 }}>
          <OutputLine text="Thinking..." color={theme.colors.accent} appearFrame={65} />
          {frame >= 80 && (
            <FadeIn delay={80}>
              <div
                style={{
                  marginTop: 12,
                  padding: "16px 20px",
                  background: "rgba(168, 85, 247, 0.08)",
                  borderLeft: `3px solid ${theme.colors.accent}`,
                  borderRadius: "0 8px 8px 0",
                }}
              >
                <StreamingText
                  startFrame={85}
                  framesPerLine={6}
                  lines={[
                    "Found 23 PM roles at fintech companies in San Francisco:",
                    "",
                    "  1. Senior PM, Payments — Stripe (Hybrid, posted 2h ago)",
                    "  2. PM, Risk & Compliance — Plaid (Remote, posted 5h ago)",
                    "  3. PM, Banking Platform — Mercury (SF, posted 1d ago)",
                    "  4. Staff PM, Lending — SoFi (Hybrid, posted 1d ago)",
                    "  5. PM, Crypto Products — Coinbase (Remote, posted 2d ago)",
                    "",
                    "Use trackly job <id> for details · 18 queries remaining today",
                  ]}
                />
              </div>
            </FadeIn>
          )}
        </div>
      </TerminalWindow>
    </div>
  );
};
