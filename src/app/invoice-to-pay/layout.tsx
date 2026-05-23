import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoice to Pay Automation | 4-Way Invoice Matching",
  description:
    "Automate invoice capture, 4-way matching across PO, GR, QC, and contract, and payment processing. Every invoice verified, every discrepancy caught, every rupee accounted for.",
  keywords: [
    "invoice automation software",
    "4-way invoice matching",
    "accounts payable automation",
    "invoice processing software",
    "payment automation",
    "invoice to pay",
    "AP automation manufacturing",
    "goods receipt verification",
    "invoice discrepancy management",
    "overpayment prevention",
  ],
  openGraph: {
    title: "Invoice to Pay Automation | 4-Way Matching | FactWise",
    description:
      "Automate invoice capture, 4-way matching across PO, GR, QC, and contract, and payment processing. Every invoice verified, every discrepancy caught.",
    url: "https://factwise.io/invoice-to-pay",
    type: "website",
  },
  twitter: {
    title: "Invoice to Pay Automation | FactWise",
    description:
      "4-way validation across PO, GR, QC, and contract — every discrepancy caught before a single payment moves.",
  },
  alternates: { canonical: "https://factwise.io/invoice-to-pay" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is 4-way matching in accounts payable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "4-way matching verifies an invoice against four documents: the purchase order (PO), goods receipt (GR), quality control (QC) report, and contract terms. FactWise performs this automatically to prevent overpayments, duplicate payments, and fraud before any payment is released.",
      },
    },
    {
      "@type": "Question",
      name: "How does automated invoice processing work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Automated invoice processing uses AI to extract data from invoices in any format (PDFs, photos, scans), match them to purchase orders and goods receipts, flag discrepancies, route for approval, and process payment — replacing manual data entry and paper-based workflows entirely.",
      },
    },
    {
      "@type": "Question",
      name: "What is goods receipt (GR) verification?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Goods receipt (GR) verification confirms that the items ordered on a purchase order were actually delivered in the correct quantity and condition before an invoice is approved for payment. FactWise integrates GR data directly into the invoice matching workflow.",
      },
    },
    {
      "@type": "Question",
      name: "How does FactWise prevent invoice overpayments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FactWise prevents overpayments by automatically matching every invoice against the PO price, received quantity, QC acceptance status, and contract terms before payment is approved. Any discrepancy triggers an exception workflow — no payment moves without a full 4-way match.",
      },
    },
    {
      "@type": "Question",
      name: "What invoice formats does FactWise support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FactWise supports invoices in all common formats including PDF, scanned images, photos, email attachments, and structured electronic formats. The AI extraction engine handles varied vendor layouts without manual template configuration.",
      },
    },
    {
      "@type": "Question",
      name: "How does FactWise handle quality control in the invoice process?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FactWise integrates quality check (QC) data as the third layer of its 4-way matching process. QC inspections are recorded in the platform, and payment is only approved once the QC report confirms the delivered goods meet specification — preventing payment for rejected or substandard items.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://factwise.io" },
    { "@type": "ListItem", position: 2, name: "Invoice to Pay", item: "https://factwise.io/invoice-to-pay" },
  ],
};

export default function InvoiceToPayLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
