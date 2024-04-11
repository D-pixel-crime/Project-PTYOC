"use client";

import { useAllCalls } from "@/customHooks/useAllCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CardMeeting from "./CardMeeting";
import Loader from "./Loader";

const CommonCallsLayout = ({
  type,
}: {
  type: "previous" | "upcoming" | "recordings";
}) => {
  const { previous, upcoming, recordings, isLoading } = useAllCalls();
  const router = useRouter();
  const [callRecordings, setCallRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case "previous":
        return previous;

      case "recordings":
        return callRecordings;

      case "upcoming":
        return upcoming;

      default:
        return [];
    }
  };

  const noCalls = () => {
    switch (type) {
      case "previous":
        return "No Previous Meetings";

      case "recordings":
        return "No Recordings";

      case "upcoming":
        return "No Upcoming Meetings";

      default:
        return "";
    }
  };

  const calls = getCalls();
  const noCallsMessage = noCalls();

  if (isLoading) return <Loader />;

  console.log(type, calls, noCallsMessage);

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <CardMeeting
            icon={
              type === "previous"
                ? "/icons/previous.svg"
                : type === "upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/recordings.svg"
            }
            title={
              (meeting as Call).state.custom.description.substring(0, 25) ||
              "No Description"
            }
            date={
              (meeting as Call).state.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time.toLocaleString()
            }
            isPreviousMeeting={type === "previous"}
            buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
            buttonText={type === "recordings" ? "Play" : "Start"}
            link={
              type === "recordings"
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (meeting as Call).id
                  }`
            }
            handleClick={() => {
              type === "recordings"
                ? router.push(`${(meeting as CallRecording).url}`)
                : router.push(`/meeting/${(meeting as Call).id}`);
            }}
            key={(meeting as Call)?.id}
          />
        ))
      ) : (
        <h1 className="text-2xl font-bold">{noCallsMessage}</h1>
      )}
    </div>
  );
};
export default CommonCallsLayout;
