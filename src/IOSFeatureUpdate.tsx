import React from "react";
import { Series, useCurrentFrame, interpolate } from "remotion";
import { FeatureIntro } from "./scenes/FeatureIntro";
import { FeatureFilterChips } from "./scenes/FeatureFilterChips";
import { FeatureSwipeApplying } from "./scenes/FeatureSwipeApplying";
import { FeatureSwipeNope } from "./scenes/FeatureSwipeNope";
import { FeatureLongPress } from "./scenes/FeatureLongPress";
import { FeatureCTA } from "./scenes/FeatureCTA";
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

export const IOSFeatureUpdate: React.FC = () => {
  return (
    <div style={{ background: theme.colors.bg, width: "100%", height: "100%" }}>
      <Series>
        <Series.Sequence durationInFrames={100}>
          <SceneTransition durationInFrames={100}>
            <FeatureIntro />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={210}>
          <SceneTransition durationInFrames={210}>
            <FeatureFilterChips />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={180}>
          <SceneTransition durationInFrames={180}>
            <FeatureSwipeApplying />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={180}>
          <SceneTransition durationInFrames={180}>
            <FeatureSwipeNope />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={180}>
          <SceneTransition durationInFrames={180}>
            <FeatureLongPress />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={200}>
          <FeatureCTA />
        </Series.Sequence>
      </Series>
    </div>
  );
};
