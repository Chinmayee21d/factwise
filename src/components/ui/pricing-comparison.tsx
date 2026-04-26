'use client';

import React from 'react';
import { Check, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

const COMPARISON_DATA = [
  { category: 'Usage', rows: [
    { feature: 'Records created', startup: 'Up to 50,000', pro: 'Up to 100,000', growth: 'Custom' },
    { feature: 'Workflow events', startup: '1,000 / month', pro: '20,000 / month', growth: 'Custom' },
  ]},
  { category: 'AI Intelligence', rows: [
    { feature: 'Agent queries (Q&A)', startup: true, pro: true, growth: true },
    { feature: 'Agent actions (Proposals, tasks, notes)', startup: true, pro: true, growth: true },
    { feature: 'AI email drafts', startup: true, pro: true, growth: true },
    { feature: 'Target account list creation', startup: false, pro: false, growth: true },
    { feature: 'Third party signal enrichment', startup: false, pro: false, growth: true },
    { feature: 'Warm intro paths', startup: false, pro: false, growth: true },
    { feature: 'Automated sequence delivery', startup: false, pro: false, growth: true },
    { feature: 'Web enrichment', startup: true, pro: true, growth: true },
    { feature: 'AI task management', startup: true, pro: true, growth: true },
    { feature: 'AI report generation', startup: true, pro: true, growth: true },
    { feature: 'AI account plans', startup: true, pro: true, growth: true },
    { feature: 'AI deal reviews', startup: true, pro: true, growth: true },
  ]},
  { category: 'Platform', rows: [
    { feature: 'Automatic record creation', startup: true, pro: true, growth: true },
    { feature: 'Continuous record updates', startup: true, pro: true, growth: true },
    { feature: 'Automatic data enrichment', startup: true, pro: true, growth: true },
    { feature: 'List management', startup: true, pro: true, growth: true },
    { feature: 'Pipeline management', startup: true, pro: true, growth: true },
    { feature: 'Custom properties & data backfill', startup: true, pro: true, growth: true },
    { feature: 'Custom objects', startup: false, pro: true, growth: true },
  ]},
  { category: 'Meetings & Voice', rows: [
    { feature: 'Meeting recording & transcription', startup: true, pro: true, growth: true },
    { feature: 'Meeting recording', startup: true, pro: true, growth: true },
    { feature: 'Meeting transcription', startup: true, pro: true, growth: true },
    { feature: 'Meeting prep and summaries', startup: true, pro: true, growth: true },
    { feature: 'Call intelligence', startup: true, pro: true, growth: true },
  ]},
  { category: 'Workflows & Automation', rows: [
    { feature: 'Agent workflow builder', startup: true, pro: true, growth: true },
    { feature: 'Event-triggered workflows', startup: true, pro: true, growth: true },
    { feature: 'Data sync & automation', startup: true, pro: true, growth: true },
    { feature: 'Basic reporting', startup: true, pro: true, growth: true },
    { feature: 'Custom dashboards', startup: false, pro: true, growth: true },
  ]},
  { category: 'Integrations & Access', rows: [
    { feature: 'Integrations & connectors', startup: true, pro: true, growth: true },
    { feature: 'API access', startup: true, pro: true, growth: true },
    { feature: 'API rate limits', startup: 'Standard', pro: 'Higher', growth: 'Custom' },
    { feature: 'MCP server', startup: true, pro: true, growth: true },
    { feature: 'Advanced user permissioning', startup: false, pro: true, growth: true },
  ]},
  { category: 'Services & Support', rows: [
    { feature: 'MIRA-ready support', startup: false, pro: false, growth: true },
    { feature: 'Migration services', startup: false, pro: false, growth: true },
    { feature: 'Support model', startup: 'Slack and email', pro: 'Dedicated CSM', growth: 'Forward-deployed team' },
  ]}
];

const ComparisonValue = ({ value }: { value: string | boolean }) => {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="size-4 text-[#7c5cfc]" strokeWidth={3} />
    ) : (
      <Minus className="size-4 text-[#3f3f5a]" />
    );
  }
  return <span className="text-[13px] text-[#f4f4f5] font-medium">{value}</span>;
};

export const PricingComparison = () => {
  return (
    <section className="w-full bg-[#0a0a0c] py-24 px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16">
          <h2 className="text-[32px] md:text-[42px] font-light text-white tracking-tight leading-tight">
            Compare our <span className="text-[#6b6b7a]">detailed features.</span>
          </h2>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="py-6 px-4 text-left text-[14px] font-semibold text-white/40 uppercase tracking-widest w-1/4">Features</th>
                <th className="py-6 px-4 text-left text-[14px] font-semibold text-white uppercase tracking-widest w-1/4">Startup</th>
                <th className="py-6 px-4 text-left text-[14px] font-semibold text-white uppercase tracking-widest w-1/4">Pro</th>
                <th className="py-6 px-4 text-left text-[14px] font-semibold text-white uppercase tracking-widest w-1/4">Growth</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.map((section, idx) => (
                <React.Fragment key={idx}>
                  <tr className="bg-white/[0.02]">
                    <td colSpan={4} className="py-4 px-4 text-[11px] font-bold text-[#7c5cfc] uppercase tracking-[0.2em]">
                      {section.category}
                    </td>
                  </tr>
                  {section.rows.map((row, rowIdx) => (
                    <tr key={rowIdx} className="border-b border-white/5 group hover:bg-white/[0.01] transition-colors">
                      <td className="py-4 px-4 text-[13px] text-[#6b6b7a] group-hover:text-white transition-colors">
                        {row.feature}
                      </td>
                      <td className="py-4 px-4">
                        <ComparisonValue value={row.startup} />
                      </td>
                      <td className="py-4 px-4">
                        <ComparisonValue value={row.pro} />
                      </td>
                      <td className="py-4 px-4">
                        <ComparisonValue value={row.growth} />
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
