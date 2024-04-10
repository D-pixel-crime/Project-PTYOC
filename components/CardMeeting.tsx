import Image from "next/image";
import { Button } from "./ui/button";

const CardMeeting = ({ type }: { type: string }) => {
  return (
    <section className="flex flex-col justify-evenly bg-gray-800 text-white p-4 px-5 gap-4 rounded-lg">
      <div className="flex items-center">
        <Image
          src={`/icons/${type}.svg`}
          alt="Upcoming Meeting"
          width={25}
          height={25}
        />
      </div>
      <div className="flex justify-center flex-col">
        <h4>Meeting Name</h4>
        <p className="text-gray-300">{new Date().toISOString()}</p>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <Image
            src="/icons/play.svg"
            height={20}
            width={20}
            alt="Paticipants"
          />
        </div>
        {type === "upcoming" && (
          <div className="div flex items-center gap-2">
            <Button className="bg-blue-500">Start</Button>
            <Button className="flex gap-1">
              <Image
                src="/icons/copy.svg"
                alt="Copy Invitation"
                width={15}
                height={15}
              />
              <p>Copy Invitation</p>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
export default CardMeeting;
