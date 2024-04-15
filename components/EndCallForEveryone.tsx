"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";

const EndCallForEveryone = () => {
  const router = useRouter();
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  return (
    <Button
      onClick={async (e) => {
        e.preventDefault();
        await call.endCall();
        router.push("/");
      }}
      className="bg-transparent text-red-500 border-2 font-medium border-red-500 hover:bg-red-500 hover:text-white"
    >
      End Call
    </Button>
  );
};
export default EndCallForEveryone;
