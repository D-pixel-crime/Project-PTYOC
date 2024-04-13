"use client";

import { Button } from "@/components/ui/button";
import { useGetCallById } from "@/customHooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-cyan-400 lg:text-xl xl:min-w-32">
        {title}
      </h1>
      <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
        {description}
      </h1>
    </div>
  );
};

const PrivateMeeting = () => {
  const { user } = useUser();
  const meetingId = user?.id;
  const linkMeeting = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;
  const [isCopied, setIsCopied] = useState(false);
  const client = useStreamVideoClient();
  const { currentLiveCall, isCallLoading } = useGetCallById(meetingId!);
  const router = useRouter();

  const startPrivateRoom = async () => {
    if (!client || !user) return;

    if (!currentLiveCall) {
      const newCall = client.call("default", meetingId!);
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Private Room</h1>
      <div className="flex flex-col gap-8 xl:max-w-[900px]">
        <Table
          title="Topic"
          description={`${user?.username}'s Private Meeting`}
        />
        <Table title="Meeting Id" description={meetingId!} />
        <Table title="Invite Link" description={linkMeeting!} />
      </div>
      <div className="flex gap-5">
        <Button
          className="hover:bg-blue-600 flex-center border border-blue-600 bg-transparent text-blue-600 hover:text-white"
          onClick={startPrivateRoom}
        >
          Start Meeting
        </Button>
        <Button
          className="flex items-center gap-1.5 bg-blue-600 flex-center"
          onClick={() => {
            setIsCopied(true);
            navigator.clipboard.writeText(linkMeeting);
            setInterval(() => {
              setIsCopied(false);
            }, 2500);
          }}
        >
          <Image
            src={`/icons/${isCopied ? "tick" : "copy"}.svg`}
            alt="Copy Invitation"
            width={15}
            height={15}
          />
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};
export default PrivateMeeting;
