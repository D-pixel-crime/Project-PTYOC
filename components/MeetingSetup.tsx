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
    <div className="flex-center flex-col gap-3 text-white h-screen w-full">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex-center h-16 gap-3">
        <label className="flex-center gap-2 font-medium">
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
        className="hover:bg-green-600 hover:text-white border border-green-600 text-green-600"
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
