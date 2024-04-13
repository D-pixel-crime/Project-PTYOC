import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/toaster";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";

const inter = Inter({ subsets: ["latin"] });

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
      <ClerkProvider
        appearance={{
          baseTheme: dark,
          signIn: {
            variables: {
              colorPrimary: "#299135",
            },
          },
          signUp: {
            variables: {
              colorPrimary: "#4b43e0",
            },
          },
          variables: {
            colorBackground: "#3c2559",
          },
          layout: {
            logoImageUrl: "/icons/logo.svg",
            logoPlacement: "outside",
          },
        }}
      >
        <body className={`${inter.className} bg-slate-200 scrollbar`}>
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
