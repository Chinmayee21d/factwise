import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Sourcing & RFQ Management | Intelligent Vendor Sourcing",
  description:
    "Automate vendor discovery, RFQ distribution, bid comparison, and AI-powered negotiation. FactWise sourcing cuts time-to-PO from weeks to hours.",
  keywords: [
    "RFQ management software",
    "vendor sourcing automation",
    "AI procurement negotiation",
    "supplier bid comparison",
    "automated RFQ tool",
    "vendor discovery platform",
  ],
  openGraph: {
    title: "AI Sourcing & RFQ Management | FactWise",
    description:
      "Automate vendor discovery, RFQ distribution, bid comparison, and AI-powered negotiation. Cut time-to-PO from weeks to hours.",
    url: "https://factwise.io/platform/sourcing",
    type: "website",
  },
  alternates: { canonical: "https://factwise.io/platform/sourcing" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://factwise.io" },
    { "@type": "ListItem", position: 2, name: "Platform", item: "https://factwise.io/platform" },
    { "@type": "ListItem", position: 3, name: "Sourcing", item: "https://factwise.io/platform/sourcing" },
  ],
};

export default function SourcingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
