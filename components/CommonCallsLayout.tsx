"use client";

import { useAllCalls } from "@/customHooks/useAllCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CardMeeting from "./CardMeeting";
import Loader from "./Loader";
import { toast } from "./ui/use-toast";

const CommonCallsLayout = ({
  type,
}: {
  type: "previous" | "upcoming" | "recordings";
}) => {
  const { previous, upcoming, recordings, isLoading } = useAllCalls();
  const router = useRouter();
  const [callRecordings, setCallRecordings] = useState<CallRecording[]>([]);

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          recordings.map((meeting) => meeting.queryRecordings())
        );

        const finalRecordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setCallRecordings(finalRecordings);
      } catch (error) {
        toast({ title: "Try Again Later", variant: "destructive" });
      }
    };
    if (type === "recordings") fetchRecordings();
  }, [type, recordings]);

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
              (meeting as Call).state?.custom?.description?.substring(0, 25) ||
              (meeting as CallRecording)?.filename?.substring(0, 20) ||
              "Private Meeting"
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
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
