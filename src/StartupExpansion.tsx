import React from "react";
import { Audio, Series, useCurrentFrame, interpolate, staticFile } from "remotion";
import { StartupHook } from "./scenes/StartupHook";
import { StartupReveal } from "./scenes/StartupReveal";
import { StartupCounter } from "./scenes/StartupCounter";
import { StartupInsight } from "./scenes/StartupInsight";
import { StartupCTA } from "./scenes/StartupCTA";
import { theme } from "./theme";

const SceneTransition: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
}> = ({ children, durationInFrames }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 8, durationInFrames - 8, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div style={{ opacity, width: "100%", height: "100%", background: theme.colors.bg }}>
      {children}
    </div>
  );
};

export const StartupExpansion: React.FC = () => {
  return (
    <div style={{ background: theme.colors.bg, width: "100%", height: "100%" }}>
      {/* Lo-fi chill beat — low volume, SFX stay on top */}
      <Audio
        src={staticFile("sfx/lofi-beat.wav")}
        volume={(f) => {
          if (f < 60) return interpolate(f, [0, 60], [0, 0.18]);
          if (f > 810) return interpolate(f, [810, 900], [0.18, 0]);
          return 0.18;
        }}
      />
      <Series>
        {/* Scene 1: Hook — 120 frames / 4s */}
        <Series.Sequence durationInFrames={120}>
          <SceneTransition durationInFrames={120}>
            <StartupHook />
          </SceneTransition>
        </Series.Sequence>

        {/* Scene 2: Reveal — 180 frames / 6s */}
        <Series.Sequence durationInFrames={180}>
          <SceneTransition durationInFrames={180}>
            <StartupReveal />
          </SceneTransition>
        </Series.Sequence>

        {/* Scene 3: Counter — 150 frames / 5s */}
        <Series.Sequence durationInFrames={150}>
          <SceneTransition durationInFrames={150}>
            <StartupCounter />
          </SceneTransition>
        </Series.Sequence>

        {/* Scene 4: Insight — 150 frames / 5s (4f black hold before CTA) */}
        <Series.Sequence durationInFrames={150}>
          <SceneTransition durationInFrames={150}>
            <StartupInsight />
          </SceneTransition>
        </Series.Sequence>

        {/* Scene 5: CTA — 300 frames / 10s (no SceneTransition, holds solid) */}
        <Series.Sequence durationInFrames={300}>
          <StartupCTA />
        </Series.Sequence>
      </Series>
    </div>
  );
};
