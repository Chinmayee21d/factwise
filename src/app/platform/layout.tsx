import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform Overview | Modular Source-to-Pay Modules",
  description:
    "Explore the full FactWise platform — AI-powered modules for sourcing, purchase orders, invoicing, payments, pricing intelligence, and more. Built for modern manufacturers.",
  keywords: [
    "procurement platform modules",
    "source to pay modules",
    "manufacturing procurement platform",
    "purchase order module",
    "sourcing software",
    "pricing intelligence software",
    "procurement module",
  ],
  openGraph: {
    title: "Platform Overview | Modular Source-to-Pay | FactWise",
    description:
      "AI-powered modules for sourcing, purchase orders, invoicing, payments, and pricing intelligence — the complete FactWise platform.",
    url: "https://factwise.io/platform",
    type: "website",
  },
  twitter: {
    title: "FactWise Platform | Modular S2P Modules",
    description:
      "AI-powered modules for every procurement workflow — sourcing, POs, invoicing, payments, and pricing intelligence.",
  },
  alternates: { canonical: "https://factwise.io/platform" },
};

const platformSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://factwise.io/platform",
  url: "https://factwise.io/platform",
  name: "FactWise Platform Overview",
  description:
    "AI-powered procurement modules for manufacturers: sourcing, purchase orders, invoicing, payments, and pricing intelligence.",
  publisher: { "@id": "https://factwise.io/#organization" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://factwise.io" },
      { "@type": "ListItem", position: 2, name: "Platform", item: "https://factwise.io/platform" },
    ],
  },
};

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchema) }} />
      {children}
    </>
  );
}
