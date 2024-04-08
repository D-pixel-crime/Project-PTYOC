import { StreamVideoProvider } from "@/providers/StreamClientProvider";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "PTYOC",
  description: "A video conferencing app",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>;
    </main>
  );
};
export default RootLayout;
