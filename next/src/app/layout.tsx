import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import AuthContext from "@/context/AuthContext";
const OpenSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "With",
  description: "Social Network Service by EVELO ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={OpenSans.className}>
      <body className="overflow-auto w-full mx-auto max-w-screen-xl">
        <AuthContext>
          <Navbar />
          <main>{children}</main>
        </AuthContext>
      </body>
    </html>
  );
}
