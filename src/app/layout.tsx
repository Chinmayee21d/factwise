import type { Metadata } from "next";
import { DM_Sans, Sora } from "next/font/google";
import "./globals.css";
import { ScrollProgressIndicator } from "@/components/ui/ScrollProgressIndicator";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FactWise | Strategic Sourcing & Operations Platform",
  description: "The next-generation source-to-pay platform. Unifying your entire supply chain in one intelligent ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${dmSans.variable} ${sora.variable}`}>
      <body className={dmSans.className} suppressHydrationWarning>
        <div className="noise-bg" />
        <ScrollProgressIndicator />
        {children}
      </body>
    </html>
  );
}
