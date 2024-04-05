"use client";

import { useState } from "react";
import CardMeetingOptions from "./CardMeetingOptions";
import { useRouter } from "next/navigation";
import MeetingModal from "./modals/MeetingModal";

const OptionsMeetingTypes = () => {
  const [meetingState, setMeetingState] = useState<
    "isSchedule" | "isJoinExistingMeeting" | "isStartMeeting" | undefined
  >();
  const router = useRouter();

  const createMeeting = () => {};

  return (
    <section className="w-full grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-4">
      <CardMeetingOptions
        option="add-meeting"
        title="New Meeting"
        description="Start an quick meeting"
        cardColor="#8E44AD"
        handleClick={() => setMeetingState("isStartMeeting")}
      />
      <CardMeetingOptions
        option="join-meeting"
        title="Join Meeting"
        description="Join a pre-existing meeting"
        cardColor="#CB4335"
        handleClick={() => setMeetingState("isJoinExistingMeeting")}
      />
      <CardMeetingOptions
        option="schedule"
        title="Schedule Meeting"
        description="Schedule a meeting"
        cardColor="#239B56"
        handleClick={() => setMeetingState("isSchedule")}
      />
      <CardMeetingOptions
        option="recordings"
        title="View Recordings"
        description="See your recordings"
        cardColor="#B7950B"
        handleClick={() => router.push("/recordings")}
      />

      <MeetingModal
        isOpen={meetingState === "isStartMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Create/Start a quick meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};
export default OptionsMeetingTypes;
