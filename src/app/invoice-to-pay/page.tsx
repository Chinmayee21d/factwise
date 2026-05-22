"use client";

import React from "react";
import { FlickeringFooter } from "@/components/ui/flickering-footer";
import InvoiceHero from "./components/InvoiceHero";
import InvoiceProblemSection from "./components/InvoiceProblemSection";
import InvoiceToPayFlow from "./components/InvoiceToPayFlow";

export default function InvoiceToPayPage() {
  return (
    <main className="min-h-screen bg-white">
      <InvoiceHero />
      <InvoiceProblemSection />
      <InvoiceToPayFlow />
      <FlickeringFooter />
    </main>
  );
}
