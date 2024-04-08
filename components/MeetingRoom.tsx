import {
  CallControls,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
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
import { LayoutList } from "lucide-react";

type CallLayoutOptions = "grid" | "focus-left" | "focus-right";

const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayoutOptions>("focus-left");
  const [showParticipants, setShowParticipants] = useState(false);

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
      <div className="flex-center w-full fixed bottom-0 gap-5 mx-4">
        <CallControls />

        <DropdownMenu>
          <div className="flex-center">
            <DropdownMenuTrigger className="rounded-full hover:bg-white hover:text-black">
              <LayoutList className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Layout</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {["grid", "focus-left", "focus-right"].map((element, index) => (
              <DropdownMenuItem className="cursor-pointer" key={index}>
                {element}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
};
export default MeetingRoom;
