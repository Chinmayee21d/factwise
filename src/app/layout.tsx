import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ScrollProgressIndicator } from "@/components/ui/ScrollProgressIndicator";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: ["400"],
  style: ["italic", "normal"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FactWise | Strategic Sourcing & Operations Platform",
  description: "The next-generation source-to-pay platform. Unifying your entire supply chain in one intelligent ecosystem.",
};

import SmoothScroll from "@/components/ui/SmoothScroll";
import { Header } from "@/components/ui/header-2";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className={inter.className} suppressHydrationWarning>
        <div className="noise-bg" />
        <ScrollProgressIndicator />
        <Header />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

