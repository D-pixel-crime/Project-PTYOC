"use client";

import { sideBarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="flex flex-col justify-between sticky left-0 top-0 w-fit bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-col gap-6">
        {sideBarLinks.map((eachLink) => {
          const isActive =
            pathname === eachLink.route ||
            pathname.startsWith(`${eachLink.route}/`);

          return (
            <Link
              href={eachLink.route}
              key={eachLink.label}
              className={`flex gap-2.5 items-center p-4 rounded-lg justify-start ${
                isActive
                  ? "bg-violet-600"
                  : "hover:scale-105 transition hover:text-gray-400"
              }`}
            >
              <Image
                src={eachLink.imgUrl}
                width={25}
                height={25}
                alt={`${eachLink.label} Icon`}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {eachLink.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
export default Sidebar;
