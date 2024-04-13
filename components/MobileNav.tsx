"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sideBarLinks } from "@/constants";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/openSidebar.svg"
            width={36}
            height={36}
            alt="Open Sidebar"
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left" className="bg-gray-300 max-w-[250px]">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icons/logo.svg"
              width={32}
              height={32}
              alt="Logo"
              className="max-sm:size-10"
            />
            <p className="font-extrabold text-black text-xl">PTYOC</p>
          </Link>
          <div className="flex h-[calc{100vh-72px}] flex-col justify-between overflow-hidden">
            <section className="flex flex-col h-full gap-6 pt-16 text-back">
              {sideBarLinks.map((eachLink) => {
                const isActive =
                  pathname === eachLink.route ||
                  pathname.startsWith(`${eachLink.route}/`);

                return (
                  <SheetClose asChild key={eachLink.route}>
                    <Link
                      href={eachLink.route}
                      className={`flex gap-2.5 items-center p-4 rounded-lg justify-start ${
                        isActive
                          ? "bg-purple-400"
                          : "hover:scale-110 transition"
                      }`}
                    >
                      <Image
                        src={eachLink.imgUrl}
                        width={25}
                        height={25}
                        alt={`${eachLink.label} Icon`}
                      />
                      <p className="text-lg font-semibold">{eachLink.label}</p>
                    </Link>
                  </SheetClose>
                );
              })}
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};
export default MobileNav;
