import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { ScrollProgressIndicator } from "@/components/ui/ScrollProgressIndicator";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${geist.variable}`}>
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

