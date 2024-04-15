import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { Button } from "../ui/button";

interface meetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  buttonText?: string;
  handleClick?: () => void;
  children?: ReactNode;
  buttonIcon?: string;
  img?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  buttonText,
  img,
  buttonIcon,
  handleClick,
  children,
}: meetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger className="hidden overflow-hidden">Open</DialogTrigger>
      <DialogContent className="flex w-fit px-6 py-9 text-black bg-slate-200">
        <div className="flex flex-col gap-6">
          {img && (
            <div className="flex justify-center">
              <Image src={img} alt="Image" width={72} height={72} />
            </div>
          )}
          <h1 className={`text-3xl font-bold leading-[42px] ${className}`}>
            {title}
          </h1>
          {children}
          <Button
            className="bg-blue-500 font-medium hover:border-2 hover:border-blue-500 hover:bg-transparent hover:text-blue-500"
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image
                alt="Button Icon"
                src={buttonIcon}
                width={13}
                height={13}
              />
            )}
            &nbsp;
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default MeetingModal;
