import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";

export const metadata: Metadata = {
  title: "PTYOC",
  description: "A video conferencing app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`main-background scrollbar overflow-x-hidden`}>
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
