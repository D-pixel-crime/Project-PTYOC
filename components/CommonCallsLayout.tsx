"use client";

import { useAllCalls } from "@/customHooks/useAllCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

  return <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
    {calls && calls.length > 0?calls.map((meeting:Call | CallRecording)=><CardMeeting />:<h1>{noCallsMessage}</h1>)}
  </div>
};
export default CommonCallsLayout;
