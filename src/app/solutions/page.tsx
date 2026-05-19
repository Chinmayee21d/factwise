"use client";

import React from "react";
import { FlickeringFooter } from "@/components/ui/flickering-footer";
import SolutionsHero from "./components/SolutionsHero";
import SolutionsFeatures from "./components/SolutionsFeatures";
import SolutionsTabbedFeatures from "./components/SolutionsTabbedFeatures";
import EcoSystemFeatures from "./components/EcoSystemFeatures";
import QuoteToOrderFlow from "./components/QuoteToOrderFlow";
import QuoteToOrderFeatures from "./components/QuoteToOrderFeatures";
import StackedCards from "./components/StackedCards";

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <SolutionsHero />
      <EcoSystemFeatures />
      <SolutionsFeatures />
      <SolutionsTabbedFeatures />
      <QuoteToOrderFlow />
      <QuoteToOrderFeatures />
      {/* <StackedCards /> */}
      <FlickeringFooter />
    </main>
  );
}
