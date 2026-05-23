import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inquiry to Quote Automation | AI-Powered Quoting for Manufacturers",
  description:
    "Turn customer inquiries into profitable quotes in minutes. FactWise automates BOM costing, intelligent sourcing, landed cost analysis, and quote generation — quote faster, win more.",
  keywords: [
    "inquiry to quote software",
    "quoting automation for manufacturers",
    "BOM costing software",
    "manufacturing quote management",
    "RFQ response automation",
    "landed cost analysis tool",
    "customer quote generation",
    "AI-powered quoting",
  ],
  alternates: { canonical: "https://factwise.io/inquiry-to-quote" },
  openGraph: {
    title: "Inquiry to Quote Automation | AI-Powered Quoting | FactWise",
    description:
      "Turn customer inquiries into profitable quotes in minutes. BOM costing, intelligent sourcing, landed cost analysis, and quote generation — automated.",
    url: "https://factwise.io/inquiry-to-quote",
    type: "website",
  },
  twitter: {
    title: "Inquiry to Quote Automation | FactWise",
    description:
      "From BOM to profitable quote in minutes. AI-powered BOM costing, sourcing, landed cost analysis, and quote generation for manufacturers.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is inquiry-to-quote (IQ) automation for manufacturers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Inquiry-to-quote (IQ) automation converts customer RFQs or inquiries into priced, profitable quotes automatically — analyzing the bill of materials (BOM), sourcing components from vendors, calculating landed costs, applying margin intelligence, and generating a final customer quote.",
      },
    },
    {
      "@type": "Question",
      name: "What is BOM cost intelligence?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BOM (Bill of Materials) cost intelligence automatically prices every line item in a BOM using historical procurement data, live vendor quotes, and market benchmarks — giving manufacturers a real-time view of production costs before committing to a customer price.",
      },
    },
    {
      "@type": "Question",
      name: "How does intelligent sourcing work in the inquiry-to-quote process?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FactWise uses AI to automatically identify qualified vendors for each BOM component, send simultaneous RFQs, collect and compare bids, and recommend the best vendor combination based on price, lead time, and reliability — reducing sourcing time from days to hours.",
      },
    },
    {
      "@type": "Question",
      name: "What is landed cost analysis in manufacturing quotes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Landed cost analysis calculates the true cost of each purchased component by adding unit price, inbound freight, customs duties, packaging, and handling charges. Including landed costs in the quote prevents margin erosion from hidden import and logistics costs.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://factwise.io" },
    { "@type": "ListItem", position: 2, name: "Inquiry to Quote", item: "https://factwise.io/inquiry-to-quote" },
  ],
};

export default function InquiryToQuoteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
