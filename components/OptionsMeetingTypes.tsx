"use client";

import { useState } from "react";
import CardMeetingOptions from "./CardMeetingOptions";
import { useRouter } from "next/navigation";
import MeetingModal from "./modals/MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";

const OptionsMeetingTypes = () => {
  const [meetingState, setMeetingState] = useState<
    "isSchedule" | "isJoinExistingMeeting" | "isStartMeeting" | undefined
  >();
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [info, setInfo] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast();
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  const createMeeting = async () => {
    if (!client || !user) return;

    const callId = crypto.randomUUID();

    const call = client.call("default", callId);

    if (!call) throw new Error("New call couldn't created !");

    try {
      if (!info.dateTime) {
        toast({
          variant: "destructive",
          title: "Please select a date and time !",
        });
        return;
      }

      const callStartAt =
        info.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = info.description || "New Quick Meeting";

      await call.getOrCreate({
        data: {
          starts_at: callStartAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!info.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({
        title: "Meeting created successfully !",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Meeting couldn't be created !",
      });
    }
  };

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

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isSchedule"}
          onClose={() => setMeetingState(undefined)}
          title="Schedule a Meeting"
          handleClick={createMeeting}
          className="w-full"
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-white">
              Description
            </label>
            <Textarea
              className="border-none bg-dark-1"
              onChange={(e) =>
                setInfo({ ...info, description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col w-full gap-2.5">
            <label className="text-base text-normal leading-[22px] text-white">
              Select Date & Time
            </label>
            <ReactDatePicker
              selected={info.dateTime}
              onChange={(date) => setInfo({ ...info, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-1 p-2"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isSchedule"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          buttonText="Copy Meeting Link"
          buttonIcon="/icons/copy.svg"
          img="/icons/checked.svg"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link Copied" });
          }}
        />
      )}

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
