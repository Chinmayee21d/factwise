import type { Metadata } from "next";

// /solutions permanently redirects to /inquiry-to-quote
// noindex prevents duplicate indexing of the redirect page
export const metadata: Metadata = {
  title: "Inquiry to Quote | FactWise",
  alternates: { canonical: "https://factwise.io/inquiry-to-quote" },
  robots: { index: false, follow: false },
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
