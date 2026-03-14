import React from "react";
import { Series, useCurrentFrame, interpolate } from "remotion";
import { SwipeWebIntro } from "./scenes/SwipeWebIntro";
import { SwipeWebLeft } from "./scenes/SwipeWebLeft";
import { SwipeWebRight } from "./scenes/SwipeWebRight";
import { SwipeWebLongPress } from "./scenes/SwipeWebLongPress";
import { SwipeWebCTA } from "./scenes/SwipeWebCTA";
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

export const SwipeWebTutorial: React.FC = () => {
  return (
    <div style={{ background: theme.colors.bg, width: "100%", height: "100%" }}>
      <Series>
        <Series.Sequence durationInFrames={90}>
          <SceneTransition durationInFrames={90}>
            <SwipeWebIntro />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={150}>
          <SceneTransition durationInFrames={150}>
            <SwipeWebLeft />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={150}>
          <SceneTransition durationInFrames={150}>
            <SwipeWebRight />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={150}>
          <SceneTransition durationInFrames={150}>
            <SwipeWebLongPress />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={210}>
          <SwipeWebCTA />
        </Series.Sequence>
      </Series>
    </div>
  );
};
