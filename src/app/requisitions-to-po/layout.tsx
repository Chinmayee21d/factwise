import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Requisitions to Purchase Orders | Automated Req-to-PO",
  description:
    "Automate the entire requisition-to-PO process — structured approvals, AI-powered sourcing, landed cost analysis, and one-click PO generation. No manual work, no missed steps.",
  keywords: [
    "requisition to purchase order",
    "req to PO automation",
    "purchase order management software",
    "procurement workflow automation",
    "requisition approval software",
    "RFQ management system",
    "AI negotiation procurement",
    "landed cost analysis",
    "automated PO generation",
  ],
  openGraph: {
    title: "Requisitions to Purchase Orders | Automated Req-to-PO | FactWise",
    description:
      "Automate the entire requisition-to-PO process — structured approvals, AI-powered sourcing, landed cost analysis, and one-click PO generation.",
    url: "https://factwise.io/requisitions-to-po",
    type: "website",
  },
  twitter: {
    title: "Requisitions to Purchase Orders | FactWise",
    description:
      "Automate the entire requisition-to-PO process — structured approvals, AI-powered sourcing, and one-click PO generation.",
  },
  alternates: { canonical: "https://factwise.io/requisitions-to-po" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is requisition-to-purchase-order (Req-to-PO) automation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Req-to-PO automation converts internal purchase requisitions into approved purchase orders automatically — handling multi-level approval workflows, vendor RFQs, comparative bid analysis, AI-based negotiation, and PO generation without manual data entry.",
      },
    },
    {
      "@type": "Question",
      name: "How does FactWise automate the requisition approval process?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FactWise routes requisitions through configurable multi-level approval workflows. Approvers receive notifications and can approve or reject from any device. The system automatically consolidates requisitions, identifies bulk-buy opportunities, and escalates pending approvals to prevent bottlenecks.",
      },
    },
    {
      "@type": "Question",
      name: "What is AI negotiation in procurement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI negotiation in procurement uses machine learning to automatically send counter-offers to vendors, benchmark bids against historical prices and market data, and identify the optimal time and terms to lock in better pricing — reducing manual back-and-forth and improving cost savings by up to 20%.",
      },
    },
    {
      "@type": "Question",
      name: "How does FactWise generate purchase orders automatically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Once the best vendor bid is selected and approved, FactWise auto-populates a purchase order with all item details, quantities, pricing, delivery terms, and vendor information — eliminating manual data entry and reducing the risk of errors that stop production.",
      },
    },
    {
      "@type": "Question",
      name: "What is landed cost analysis in procurement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Landed cost analysis calculates the true total cost of purchasing an item by adding unit price, freight, customs duties, and packaging charges. FactWise surfaces this automatically so buyers can compare vendor bids on total cost — not just unit price — before issuing a PO.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to implement FactWise Req-to-PO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most manufacturing teams are live on FactWise Req-to-PO within 2–4 weeks. The platform connects to existing ERP systems and requires minimal configuration before teams can begin raising and approving requisitions.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://factwise.io" },
    { "@type": "ListItem", position: 2, name: "Requisitions to PO", item: "https://factwise.io/requisitions-to-po" },
  ],
};

export default function ReqToPoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
