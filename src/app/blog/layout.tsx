import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Procurement & Manufacturing Blog",
  description:
    "Expert insights on procurement automation, source-to-pay best practices, manufacturing operations, vendor management, RFQ strategies, and supply chain optimization.",
  keywords: [
    "procurement blog",
    "manufacturing procurement insights",
    "source to pay best practices",
    "vendor management tips",
    "RFQ strategy",
    "supply chain optimization",
    "invoice processing guide",
    "purchase order management",
    "procurement automation blog",
  ],
  openGraph: {
    title: "Procurement & Manufacturing Blog | FactWise",
    description:
      "Expert insights on procurement automation, source-to-pay best practices, manufacturing operations, and vendor management.",
    url: "https://factwise.io/blog",
    type: "website",
  },
  twitter: {
    title: "FactWise Blog | Procurement & Manufacturing Insights",
    description:
      "Expert insights on procurement automation, source-to-pay best practices, and manufacturing operations.",
  },
  alternates: { canonical: "https://factwise.io/blog" },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://factwise.io/blog",
  url: "https://factwise.io/blog",
  name: "FactWise Procurement & Manufacturing Blog",
  description:
    "Expert insights on procurement automation, source-to-pay best practices, manufacturing operations, vendor management, and supply chain optimization.",
  publisher: { "@id": "https://factwise.io/#organization" },
  inLanguage: "en-US",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://factwise.io" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://factwise.io/blog" },
    ],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      {children}
    </>
  );
}
