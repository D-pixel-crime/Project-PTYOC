"use client";

import Image from "next/image";

interface cardProps {
  option: string;
  title: string;
  description: string;
  handleClick: () => void;
  cardColor: string;
}

const CardMeetingOptions = ({
  option,
  title,
  description,
  handleClick,
  cardColor,
}: cardProps) => {
  return (
    <div
      className={`px-4 py-6 w-full xl:max-w-[270px] min-h-[260px] rounded-lg cursor-pointer flex flex-col justify-between hover:scale-105 transition-transform homeCards`}
      onClick={handleClick}
    >
      <div className="flex-center glassmorphism size-12 rounded-md">
        <Image
          src={`icons/${option}.svg`}
          width={20}
          height={20}
          alt={`${option}`}
        />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-2xl">{title}</h1>
        <p className="text-lg text-gray-300 font-base">{description}</p>
      </div>
    </div>
  );
};
export default CardMeetingOptions;
