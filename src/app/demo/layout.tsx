import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Demo | See FactWise in Action",
  description:
    "Schedule a personalized demo of FactWise. See how manufacturers automate requisitions, sourcing, purchase orders, invoice matching, and payments in one connected platform.",
  keywords: [
    "FactWise demo",
    "procurement software demo",
    "source to pay demo",
    "manufacturing platform demo",
    "book a demo FactWise",
  ],
  openGraph: {
    title: "Book a Demo | See FactWise in Action",
    description:
      "Schedule a personalized demo and see how manufacturers automate the full source-to-pay process with FactWise.",
    url: "https://factwise.io/demo",
    type: "website",
  },
  twitter: {
    title: "Book a FactWise Demo",
    description:
      "See FactWise in action. A personalized demo of the full source-to-pay platform for manufacturers.",
  },
  alternates: { canonical: "https://factwise.io/demo" },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
