import React from "react";
import { Series, useCurrentFrame, interpolate } from "remotion";
import { FavHook } from "./scenes/FavHook";
import { FavHowToStar } from "./scenes/FavHowToStar";
import { FavSmartFilter } from "./scenes/FavSmartFilter";
import { FavSmartNotifications } from "./scenes/FavSmartNotifications";
import { FavNoNoise } from "./scenes/FavNoNoise";
import { FavCTA } from "./scenes/FavCTA";
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

export const FavoritesPerks: React.FC = () => {
  return (
    <div style={{ background: theme.colors.bg, width: "100%", height: "100%" }}>
      <Series>
        <Series.Sequence durationInFrames={90}>
          <SceneTransition durationInFrames={90}>
            <FavHook />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={210}>
          <SceneTransition durationInFrames={210}>
            <FavHowToStar />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={210}>
          <SceneTransition durationInFrames={210}>
            <FavSmartFilter />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={210}>
          <SceneTransition durationInFrames={210}>
            <FavSmartNotifications />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={120}>
          <SceneTransition durationInFrames={120}>
            <FavNoNoise />
          </SceneTransition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={200}>
          <FavCTA />
        </Series.Sequence>
      </Series>
    </div>
  );
};
