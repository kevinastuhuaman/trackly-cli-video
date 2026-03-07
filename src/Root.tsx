import React from "react";
import { Composition } from "remotion";
import { TracklyLaunch } from "./TracklyLaunch";

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
    </>
  );
};
