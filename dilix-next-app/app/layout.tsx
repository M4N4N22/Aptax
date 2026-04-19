import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";

import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-google",
});

export const metadata: Metadata = {
  title: "Aptax | Confidential Verification Infrastructure",
  description:
    "Aptax is a confidential verification infrastructure layer for AI-native and Web3-native workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[color:var(--text)]">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
