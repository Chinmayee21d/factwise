"use client";

import React from "react";
import { FlickeringFooter } from "@/components/ui/flickering-footer";
import SolutionsHero from "./components/SolutionsHero";
import ProblemSection from "./components/ProblemSection";
import EcoSystemFeatures from "./components/EcoSystemFeatures";
import SolutionsFeatures from "./components/SolutionsFeatures";
import SolutionsTabbedFeatures from "./components/SolutionsTabbedFeatures";
import QuoteToOrderFeatures from "./components/QuoteToOrderFeatures";
import StackedCards from "./components/StackedCards";
import QuoteToOrderFlow from "./components/QuoteToOrderFlow";

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <SolutionsHero />
      <ProblemSection />
      {/* <EcoSystemFeatures />
      <SolutionsFeatures /> */}
      {/* <SolutionsTabbedFeatures /> */}
      <QuoteToOrderFlow />
      <QuoteToOrderFeatures />
      {/* <StackedCards /> */}
      <FlickeringFooter />
    </main>
  );
}
