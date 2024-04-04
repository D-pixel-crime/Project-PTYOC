import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";

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
        }}
      >
        <body className={`${inter.className} bg-black`}>{children}</body>
      </ClerkProvider>
    </html>
  );
}
