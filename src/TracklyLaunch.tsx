import React from "react";
import { Series, useCurrentFrame, interpolate } from "remotion";
import { Scene1Install } from "./scenes/Scene1Install";
import { Scene2Login } from "./scenes/Scene2Login";
import { Scene3Jobs } from "./scenes/Scene3Jobs";
import { Scene4Ask } from "./scenes/Scene4Ask";
import { Scene5MCP } from "./scenes/Scene5MCP";
import { Scene6ApiKey } from "./scenes/Scene6ApiKey";
import { Scene7Pillars } from "./scenes/Scene7Pillars";
import { Scene8CTA } from "./scenes/Scene8CTA";
import { theme } from "./theme";

const SceneTransition: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
}> = ({ children, durationInFrames }) => {
  const frame = useCurrentFrame();

  // Fade in first 8 frames, fade out last 8 frames (except last scene holds)
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

export const TracklyLaunch: React.FC = () => {
  return (
    <div style={{ background: theme.colors.bg, width: "100%", height: "100%" }}>
      <Series>
        <Series.Sequence durationInFrames={120}>
          <SceneTransition durationInFrames={120}>
            <Scene1Install />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={120}>
          <SceneTransition durationInFrames={120}>
            <Scene2Login />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={130}>
          <SceneTransition durationInFrames={130}>
            <Scene3Jobs />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={140}>
          <SceneTransition durationInFrames={140}>
            <Scene4Ask />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={130}>
          <SceneTransition durationInFrames={130}>
            <Scene5MCP />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={120}>
          <SceneTransition durationInFrames={120}>
            <Scene6ApiKey />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={120}>
          <SceneTransition durationInFrames={120}>
            <Scene7Pillars />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={210}>
          <Scene8CTA />
        </Series.Sequence>
      </Series>
    </div>
  );
};
