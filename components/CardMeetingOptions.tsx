"use client";

import Image from "next/image";

interface cardProps {
  option: string;
  title: string;
  description: string;
  handleClick: () => void;
  cardImg: string;
}

const CardMeetingOptions = ({
  option,
  title,
  description,
  handleClick,
  cardImg,
}: cardProps) => {
  return (
    <div
      className={`px-4 py-6 w-full xl:max-w-[270px] bg-cover bg-no-repeat bg-center min-h-[260px] rounded-lg cursor-pointer flex flex-col justify-between hover:scale-105 transition-transform homeCards`}
      onClick={handleClick}
      style={{ backgroundImage: `url(${cardImg})` }}
    >
      <div className="flex-center glassmorphism size-12 rounded-md">
        <Image
          src={`icons/${option}.svg`}
          width={20}
          height={20}
          alt={`${option}`}
        />
      </div>
      <div className="flex flex-col gap-1 glassmorphism2 p-2 rounded-lg">
        {/* <h1 className="font-bold text-white text-2xl">{title}</h1> */}
        <p className="text-normal text-white text-center font-extrabold">
          {description}
        </p>
      </div>
    </div>
  );
};
export default CardMeetingOptions;
