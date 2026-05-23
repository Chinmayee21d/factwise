import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Intelligence | Real-Time Procurement Cost Analytics",
  description:
    "Benchmark vendor prices, track cost trends, and surface savings opportunities across every category. FactWise pricing intelligence turns procurement data into competitive advantage.",
  keywords: [
    "procurement pricing intelligence",
    "purchase price analytics",
    "vendor price benchmarking",
    "cost analytics procurement",
    "spend analytics software",
    "procurement cost management",
  ],
  openGraph: {
    title: "Pricing Intelligence | Real-Time Procurement Analytics | FactWise",
    description:
      "Benchmark vendor prices, track cost trends, and surface savings opportunities across every category.",
    url: "https://factwise.io/platform/pricing-intelligence",
    type: "website",
  },
  alternates: { canonical: "https://factwise.io/platform/pricing-intelligence" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://factwise.io" },
    { "@type": "ListItem", position: 2, name: "Platform", item: "https://factwise.io/platform" },
    { "@type": "ListItem", position: 3, name: "Pricing Intelligence", item: "https://factwise.io/platform/pricing-intelligence" },
  ],
};

export default function PricingIntelligenceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
