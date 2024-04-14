"use client";

import { sideBarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section
      className="flex flex-col sticky left-0 top-0 w-fit p-6 pt-36 text-black max-sm:hidden lg:w-[264px]"
      style={{ backgroundColor: "#e2e3e3" }}
    >
      <div className="flex flex-col gap-10">
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
                  ? "bg-purple-400"
                  : "hover:scale-105 transition hover:text-purple-400 hover:border hover:border-purple-400"
              }`}
            >
              <Image
                src={eachLink.imgUrl}
                width={25}
                height={25}
                alt={`${eachLink.label} Icon`}
              />
              <p className="text-xl font-semibold max-lg:hidden">
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
