import React from "react";
import { Audio, Series, useCurrentFrame, interpolate, staticFile } from "remotion";
import { FavHook } from "./scenes/FavHook";
import { FavHowToStar } from "./scenes/FavHowToStar";
import { FavSmartFilter } from "./scenes/FavSmartFilter";
import { FavSmartNotifications } from "./scenes/FavSmartNotifications";
import { FavNotificationSettings } from "./scenes/FavNotificationSettings";
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
      {/* Lo-fi chill beat — low volume, SFX stay on top */}
      <Audio
        src={staticFile("sfx/lofi-beat.wav")}
        volume={(f) => {
          if (f < 60) return interpolate(f, [0, 60], [0, 0.18]);
          if (f > 1160) return interpolate(f, [1160, 1250], [0.18, 0]);
          return 0.18;
        }}
      />
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

        <Series.Sequence durationInFrames={210}>
          <SceneTransition durationInFrames={210}>
            <FavNotificationSettings />
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
