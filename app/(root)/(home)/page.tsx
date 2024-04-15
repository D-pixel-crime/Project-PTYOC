"use client";

import OptionsMeetingTypes from "@/components/OptionsMeetingTypes";
import { useAllCalls } from "@/customHooks/useAllCalls";
import { Call } from "@stream-io/video-react-sdk";

const Home = () => {
  const current = new Date();
  const timeNow = current.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    current
  );
  const { upcoming } = useAllCalls();

  return (
    <section className="flex size-full flex-col gap-10 text-black">
      <div className="h-[300px] w-full bg-hero bg-cover bg-center bg-no-repeat rounded-xl">
        <div className="flex flex-col-reverse h-full justify-between items-start px-5 py-5 md:px-7 md:py-8 lg:px-10 lg:py-7">
          <h2 className="flex flex-col glassmorphism py-2 px-4 text-base rounded-md font-normal w-fit shadow-md">
            <span className="font-bold">Upcoming Meeting :</span>
            <span>
              {(
                upcoming[upcoming.length - 1] as Call
              )?.state?.startsAt?.toLocaleString()}
            </span>
          </h2>
          <div className="flex flex-col gap-2 items-start">
            <h1 className="text-4xl font-extrabold lg:text-7xl bg-gradient-to-r from-blue-400 to-blue-400 via-purple-500 bg-clip-text text-transparent">
              {/* Present Time */}
              {timeNow}
            </h1>
            <p className="text-lg font-medium text-gray-600 lg:text-2xl">
              {/* Present Date */}
              {date}
            </p>
          </div>
        </div>
      </div>
      <OptionsMeetingTypes />
    </section>
  );
};
export default Home;
