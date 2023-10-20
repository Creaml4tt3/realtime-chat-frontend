// import './globals.css'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Session } from "next-auth";
import SessionWrapper from "@/app/components/wrapper/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Realtime Chat",
  description: "Made By creaml4tt3",
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <SessionWrapper session={session}>{children}</SessionWrapper>
      </body>
    </html>
  );
}
