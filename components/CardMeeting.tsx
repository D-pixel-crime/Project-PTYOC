"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { avatarImages } from "@/constants";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Ellipsis } from "lucide-react";

interface propsCardMeeting {
  icon: string;
  title: string;
  date: string;
  isPreviousMeeting: boolean;
  buttonIcon1: string | undefined;
  buttonText: string;
  link: string;
  handleClick: () => void;
}

const CardMeeting = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  buttonText,
  handleClick,
  link,
}: propsCardMeeting) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="upcoming" width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-center relative", {})}>
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="participants"
              width={40}
              height={40}
              className={cn("rounded-full", { absolute: index > 0 })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-blue-600 bg-blue-600">
            <Ellipsis />
          </div>
        </div>
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button
              onClick={handleClick}
              className="rounded bg-transparent border border-blue-500 text-blue-500 px-6 text-center hover:bg-blue-600 hover:text-white"
            >
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              )}
              {buttonIcon1 && <>&nbsp;</>} {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                setIsCopied(true);
                setInterval(() => {
                  setIsCopied(false);
                }, 2500);
              }}
              className="bg-blue-600 px-6"
            >
              <Image
                src={`/icons/${isCopied ? "tick" : "copy"}.svg`}
                alt="feature"
                width={20}
                height={20}
              />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};
export default CardMeeting;
