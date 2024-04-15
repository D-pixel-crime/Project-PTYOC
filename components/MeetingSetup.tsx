"use client";

import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({
  setIsAudioVideoSetupDone,
}: {
  setIsAudioVideoSetupDone: (value: boolean) => void;
}) => {
  const [isMicCamOn, setIsMicCamOn] = useState(false);

  const call = useCall();

  if (!call) throw new Error("useCall() must be used in StreamCall component");

  useEffect(() => {
    if (isMicCamOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamOn, call?.camera, call?.microphone]);

  return (
    <div className="flex-center flex-col gap-3 h-screen w-full">
      <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
        Setup
      </h1>
      <VideoPreview />
      <div className="flex-center h-16 gap-3">
        <label className="flex-center gap-2 font-bold">
          <input
            type="checkbox"
            checked={isMicCamOn}
            onChange={(event) => setIsMicCamOn(event.target.checked)}
          />
          Join Without Mic & Camera
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="bg-green-600 text-white hover:border-2 font-medium hover:border-green-600 hover:text-green-600 hover:bg-transparent"
        onClick={(e) => {
          e.preventDefault();
          call.join();
          setIsAudioVideoSetupDone(true);
        }}
      >
        Join Meeting
      </Button>
    </div>
  );
};
export default MeetingSetup;
