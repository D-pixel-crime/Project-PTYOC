"use client";

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/customHooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [isAudioVideoSetupDone, setIsAudioVideoSetupDone] = useState(false);
  const { currentLiveCall, isCallLoading } = useGetCallById(id);

  if (!isLoaded || isCallLoading) return <Loader />;

  return (
    <main className="w-full h-screen">
      <StreamCall call={currentLiveCall}>
        <StreamTheme>
          {!isAudioVideoSetupDone ? (
            <MeetingSetup setIsAudioVideoSetupDone={setIsAudioVideoSetupDone} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};
export default Meeting;
