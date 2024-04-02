import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex-1 flex-col min-h-screen flex px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};
export default RootLayout;
