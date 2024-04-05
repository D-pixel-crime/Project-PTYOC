"use client";

import Image from "next/image";

const CardMeetingOptions = ({
  option,
  title,
  description,
  handleClick,
}: {
  option: String;
  title: String;
  description: String;
  handleClick: Function;
}) => {
  return (
    <div className="bg-orange-500 px-4 py-6 w-full xl:max-w-[270px] min-h-[260px] rounded-lg cursor-pointer flex flex-col justify-between">
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
