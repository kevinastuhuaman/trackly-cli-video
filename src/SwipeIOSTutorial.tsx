import React from "react";
import { Series, useCurrentFrame, interpolate } from "remotion";
import { SwipeIOSIntro } from "./scenes/SwipeIOSIntro";
import { SwipeIOSLeft } from "./scenes/SwipeIOSLeft";
import { SwipeIOSRight } from "./scenes/SwipeIOSRight";
import { SwipeIOSLongPress } from "./scenes/SwipeIOSLongPress";
import { SwipeIOSCTA } from "./scenes/SwipeIOSCTA";
import { theme } from "./theme";

const SceneTransition: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
}> = ({ children, durationInFrames }) => {
  const frame = useCurrentFrame();

  // Fade in first 8 frames, fade out last 8 frames
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

export const SwipeIOSTutorial: React.FC = () => {
  return (
    <div style={{ background: theme.colors.bg, width: "100%", height: "100%" }}>
      <Series>
        <Series.Sequence durationInFrames={90}>
          <SceneTransition durationInFrames={90}>
            <SwipeIOSIntro />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={150}>
          <SceneTransition durationInFrames={150}>
            <SwipeIOSLeft />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={150}>
          <SceneTransition durationInFrames={150}>
            <SwipeIOSRight />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={150}>
          <SceneTransition durationInFrames={150}>
            <SwipeIOSLongPress />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={210}>
          <SwipeIOSCTA />
        </Series.Sequence>
      </Series>
    </div>
  );
};
