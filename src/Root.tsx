import React from "react";
import { Composition } from "remotion";
import { TracklyLaunch } from "./TracklyLaunch";
import { SwipeIOSTutorial } from "./SwipeIOSTutorial";
import { SwipeWebTutorial } from "./SwipeWebTutorial";
import { IOSFeatureUpdate } from "./IOSFeatureUpdate";
import { FavoritesPerks } from "./FavoritesPerks";
import { StartupExpansion } from "./StartupExpansion";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TracklyLaunch"
        component={TracklyLaunch}
        durationInFrames={1090}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="iOSSwipeTutorial"
        component={SwipeIOSTutorial}
        durationInFrames={750}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="WebSwipeTutorial"
        component={SwipeWebTutorial}
        durationInFrames={750}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="iOSFeatureUpdate"
        component={IOSFeatureUpdate}
        durationInFrames={1050}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="FavoritesPerks"
        component={FavoritesPerks}
        durationInFrames={1250}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="StartupExpansion"
        component={StartupExpansion}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};
