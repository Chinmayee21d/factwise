import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purchase Order Management | Automated PO Generation",
  description:
    "Generate, track, and manage purchase orders automatically. FactWise converts approved requisitions and vendor bids into accurate POs with zero manual data entry.",
  keywords: [
    "purchase order management software",
    "automated PO generation",
    "PO tracking system",
    "purchase order automation",
    "procurement order management",
  ],
  openGraph: {
    title: "Purchase Order Management | Automated PO Generation | FactWise",
    description:
      "Generate, track, and manage purchase orders automatically. From approved requisition to issued PO with zero manual entry.",
    url: "https://factwise.io/platform/purchase-orders",
    type: "website",
  },
  alternates: { canonical: "https://factwise.io/platform/purchase-orders" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://factwise.io" },
    { "@type": "ListItem", position: 2, name: "Platform", item: "https://factwise.io/platform" },
    { "@type": "ListItem", position: 3, name: "Purchase Orders", item: "https://factwise.io/platform/purchase-orders" },
  ],
};

export default function PurchaseOrdersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
