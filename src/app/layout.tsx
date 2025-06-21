import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wubble QuickTune Mini - AI Music Generator",
  description: "Generate AI-powered music previews based on mood and genre",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black   min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
