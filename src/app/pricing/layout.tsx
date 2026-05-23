import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Source-to-Pay Platform Plans",
  description:
    "Simple, transparent pricing for manufacturers. Modular plans that scale from small procurement teams to enterprise operations — start with one workflow, expand as you grow.",
  keywords: [
    "FactWise pricing",
    "procurement software pricing",
    "source to pay platform cost",
    "manufacturing software plans",
    "purchase order software pricing",
  ],
  openGraph: {
    title: "Pricing | FactWise Source-to-Pay Platform",
    description:
      "Simple, transparent pricing for manufacturers. Modular plans that scale from small teams to enterprise operations.",
    url: "https://factwise.io/pricing",
    type: "website",
  },
  twitter: {
    title: "FactWise Pricing | Modular S2P Plans for Manufacturers",
    description:
      "Transparent pricing for manufacturers. Start with one workflow, scale to the full source-to-pay suite.",
  },
  alternates: { canonical: "https://factwise.io/pricing" },
};

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://factwise.io/pricing",
  url: "https://factwise.io/pricing",
  name: "FactWise Pricing",
  description:
    "Simple, transparent pricing for manufacturers. Modular source-to-pay plans that scale from small teams to enterprise operations.",
  publisher: { "@id": "https://factwise.io/#organization" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://factwise.io" },
      { "@type": "ListItem", position: 2, name: "Pricing", item: "https://factwise.io/pricing" },
    ],
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }} />
      {children}
    </>
  );
}
