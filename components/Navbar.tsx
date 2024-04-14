import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav
      className="flex-between lg:flex lg:items-center lg:justify-end lg:gap-8 fixed z-50 w-full px-6 py-4 lg:px-10"
      style={{ backgroundColor: "#e2e3e3" }}
    >
      <Link href="/" className="flex items-center gap-1 cursor-default">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="Logo"
          className="max-sm:size-10"
        />
        <p className="font-extrabold text-black max-sm:hidden text-[26px]">
          PTYOC
        </p>
      </Link>

      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};
export default Navbar;
