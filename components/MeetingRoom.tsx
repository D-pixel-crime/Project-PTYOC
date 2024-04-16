"use client";

import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from "lucide-react";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import EndCallForEveryone from "@/components/EndCallForEveryone";
import Loader from "./Loader";
import { useRouter } from "next/navigation";

type CallLayoutOptions = "grid" | "focus-left" | "focus-right";

const MeetingRoom = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const isPrivateRoom = !!useSearchParams().get("private");
  const [layout, setLayout] = useState<CallLayoutOptions>("focus-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const router = useRouter();

  if (callingState === CallingState.LEFT) router.push("/");
  if (
    callingState !== CallingState.JOINED &&
    callingState !== CallingState.LEFT
  )
    return <Loader />;

  const ApplyCallLayout = () => {
    switch (layout) {
      case "focus-right":
        return <SpeakerLayout participantsBarPosition={"left"} />;

      case "grid":
        return <PaginatedGridLayout />;

      default:
        return <SpeakerLayout participantsBarPosition={"right"} />;
    }
  };

  return (
    <section className="h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative size-full flex-center">
        <div className="flex items-center max-w-[1000px] size-full">
          <ApplyCallLayout />
        </div>
        <div
          className={`hidden ml-2 h-[calc(100vh-86px)] ${
            showParticipants ? "show-block" : ""
          }`}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="flex-center flex-wrap w-screen max-sm:mb-3 max-w-screen fixed bottom-0 gap-5">
        <CallControls
          onLeave={() => {
            router.push("/");
          }}
        />

        <DropdownMenu>
          <div className="flex-center">
            <DropdownMenuTrigger>
              <Button>
                <LayoutList className="text-gray-200 bg-black" />
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Layout</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {["grid", "focus-left", "focus-right"].map((element, index) => (
              <DropdownMenuItem
                className="cursor-pointer"
                key={index}
                onClick={() => setLayout(element as CallLayoutOptions)}
              >
                {element}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="border-transparent" />
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <Button onClick={() => setShowParticipants((prevState) => !prevState)}>
          <Users />
        </Button>
        {!isPrivateRoom ? <EndCallForEveryone /> : <></>}
      </div>
    </section>
  );
};
export default MeetingRoom;
