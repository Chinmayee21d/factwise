export const NAV_LINKS = [
  { label: 'Platform', href: '#platform' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Customers', href: '#customers' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Resources', href: '#resources' },
];

export const HERO_STATS = [
  { value: 31, suffix: '%', label: 'Savings on goods purchased', prefix: 'up to' },
  { value: 20, suffix: '%', label: 'Productivity increase', prefix: '' },
  { value: 93, suffix: '%', label: 'Payment compliance rate', prefix: '' },
  { value: 50, suffix: '%', label: 'Less excess inventory spend', prefix: '' },
];

export const CUSTOMER_LOGOS = [
  { name: 'Tata Group', initials: 'TG' },
  { name: 'L&T Construction', initials: 'L&T' },
  { name: 'Mahindra Mfg', initials: 'MM' },
  { name: 'Asian Paints', initials: 'AP' },
  { name: 'Havells India', initials: 'HV' },
  { name: 'Bajaj Electricals', initials: 'BE' },
  { name: 'Godrej Industries', initials: 'GI' },
  { name: 'Thermax Ltd', initials: 'TX' },
];

export const PROBLEM_CARDS = [
  {
    before: {
      tag: 'BEFORE',
      headline: 'RFQs lost in email threads',
      pain: 'Your team sends 40+ emails per sourcing event. Vendor replies get buried. Comparisons are manual Excel sheets riddled with errors.',
      stat: '6–8 weeks per sourcing cycle',
    },
    after: {
      tag: 'AFTER FACTWISE',
      headline: 'One-click RFQ. Live bid comparison.',
      fix: 'Launch a multi-vendor RFQ in minutes. Auto-reminders chase suppliers. Landed cost comparisons happen in real time.',
      stat: 'Cycle time cut to 3–5 days',
    },
  },
  {
    before: {
      tag: 'BEFORE',
      headline: 'POs created manually in ERP',
      pain: 'Finance chases approvals on WhatsApp. No audit trail. POs don\'t match actual awarded prices. Delivery schedules drift.',
      stat: '2–3 days per PO creation',
    },
    after: {
      tag: 'AFTER FACTWISE',
      headline: 'Award → PO in one click',
      fix: 'Multi-level approval workflows with full audit trails. Auto-populated POs from bid awards. ERP sync on confirmation.',
      stat: 'PO in under 4 hours',
    },
  },
  {
    before: {
      tag: 'BEFORE',
      headline: 'Payment disputes every month',
      pain: 'Invoices don\'t match POs. QC rejections aren\'t credited. Finance pays wrong amounts. Suppliers lose trust.',
      stat: '15–20% invoices disputed',
    },
    after: {
      tag: 'AFTER FACTWISE',
      headline: '7-point auto-match. Zero disputes.',
      fix: '3-way match across PO, GR, and Invoice. Auto-hold on mismatch. Credit notes for QC rejections. 93% first-pass accuracy.',
      stat: '93% payment compliance',
    },
  },
];

export const PLATFORM_MODULES = [
  {
    id: 'source',
    label: 'Source',
    icon: '⚡',
    color: '#c9a84c',
    colorDim: 'rgba(201,168,76,0.08)',
    headline: 'Competitive sourcing at manufacturing scale',
    description: 'Run multi-vendor RFQs, RFIs, and reverse auctions with BOM-level precision. Compare landed costs, split orders across vendors, and close sourcing events 5× faster.',
    tags: ['RFQ / RFI / RFP', 'Multi-round bidding', 'BOM-based sourcing', 'N-vendor split', 'Landed cost', 'Auto-reminders'],
    steps: [
      'Create a sourcing event from BOM or item catalog — attach specs, delivery terms, and evaluation criteria',
      'Invite qualified vendors from your approved list or onboard new ones in minutes via email',
      'Collect multi-round bids with auto-reminders. Compare landed costs, payment terms, and delivery dates side-by-side',
      'Select winners per line item, split orders across vendors, and convert awards to POs in one click',
    ],
  },
  {
    id: 'procure',
    label: 'Procure',
    icon: '📋',
    color: '#4b8bff',
    colorDim: 'rgba(75,139,255,0.08)',
    headline: 'Purchase orders that run themselves',
    description: 'Generate POs from awarded bids or directly, enforce multi-level approval workflows, and sync to your ERP — all with a complete audit trail from day one.',
    tags: ['Multi-level approvals', 'Delivery schedules', 'Barcode / QR', 'ERP sync', 'Direct PO', 'Approval matrix'],
    steps: [
      'Convert bid awards to draft POs automatically — prices, quantities, and delivery schedules pre-populated',
      'Route through configurable approval chains: dept head → finance → director based on value thresholds',
      'Generate barcodes and QR codes per line item for warehouse tracking from day one',
      'Sync confirmed POs to SAP, Oracle, or NetSuite via REST API or native connectors',
    ],
  },
  {
    id: 'receive',
    label: 'Receive',
    icon: '📦',
    color: '#0cc8a8',
    colorDim: 'rgba(12,200,168,0.08)',
    headline: 'Warehouse-ready goods receipt with 3-stage QC',
    description: 'Record GRNs against open POs, run primary, secondary, and production-line QC checks, track batches with expiry dates, and auto-credit rejections.',
    tags: ['GRN against PO', '3-stage QC', 'Batch tracking', 'Expiry dates', 'Auto credit notes', 'GR tolerance'],
    steps: [
      'Scan QR or search PO number to start GRN — quantities pre-filled from delivery schedule',
      'Run primary QC at unloading dock, secondary in warehouse, production-line check before use',
      'Assign batch numbers and expiry dates; track FIFO consumption automatically',
      'Rejections auto-generate credit notes against the supplier\'s invoice for clean 3-way matching',
    ],
  },
  {
    id: 'pay',
    label: 'Pay',
    icon: '💳',
    color: '#7c5cfc',
    colorDim: 'rgba(124,92,252,0.08)',
    headline: '3-way match. Zero payment disputes.',
    description: 'Auto-match invoices against POs and GRNs across 7 checkpoints. Auto-hold mismatches, handle prepayments, manage credit periods, and track overdue with zero manual effort.',
    tags: ['3-way match', '7-point auto-match', 'Prepayment handling', 'Credit management', 'Overdue alerts', 'Auto-hold'],
    steps: [
      'Vendor uploads invoice through portal — OCR extracts line items and amounts automatically',
      '7-point auto-match checks vendor, item, quantity, price, tax, currency, and delivery address against PO + GR',
      'Mismatches trigger auto-hold with detailed exception report sent to both parties for resolution',
      'Approved invoices flow to payment with due-date tracking, early payment discount capture, and bank transfer logging',
    ],
  },
  {
    id: 'manage',
    label: 'Manage',
    icon: '🏢',
    color: '#c9a84c',
    colorDim: 'rgba(201,168,76,0.08)',
    headline: 'Vendor intelligence built into every decision',
    description: 'Onboard, qualify, and rate vendors continuously. Manage contracts, performance scores, KYC verification, and item catalogs — all in one vendor intelligence hub.',
    tags: ['Vendor onboarding', 'RFI qualification', 'Star ratings', 'Contract tiers', 'KYC / GSTIN', 'Performance KPIs'],
    steps: [
      'Vendors self-onboard via web form — GSTIN, bank details, and compliance docs verified automatically',
      'Score vendors on quality, delivery, responsiveness, and price competitiveness after each event',
      'Set contract tiers (Preferred, Approved, Qualified) to control sourcing event eligibility automatically',
      'Item-level catalogs with approved price bands — buyers select from catalog for direct POs with zero negotiation',
    ],
  },
  {
    id: 'analyze',
    label: 'Analyze',
    icon: '📊',
    color: '#e8433a',
    colorDim: 'rgba(232,67,58,0.08)',
    headline: 'Spend intelligence that drives decisions',
    description: 'Slice spend by category, vendor, site, or entity. Build custom KPI formulas. Pull live distributor pricing from Digi-Key and Mouser. Export to Excel with one click.',
    tags: ['Spend analytics', 'Pricing intelligence', 'Custom KPI formulas', 'Live distributor feeds', 'Excel / CSV export', 'Multi-entity'],
    steps: [
      'Auto-categorized spend dashboard by GL code, vendor, item, site, and entity — updated in real time',
      'Price intelligence database compares your last 12 purchase prices against market benchmarks per item',
      'Build custom KPI formulas: savings rate, vendor fill rate, PO cycle time, first-pass invoice match rate',
      'Live feeds from Digi-Key and Mouser for electronic components — compare market price before sourcing',
    ],
  },
];

export const ROLES_DATA = [
  {
    icon: '🎯',
    tag: 'Sourcing',
    color: '#c9a84c',
    headline: 'Run events, not spreadsheets',
    bullets: [
      'Launch RFQs in minutes, not days',
      'Side-by-side landed cost comparison',
      'Automated vendor reminders and scoring',
      'One-click award to PO conversion',
      'Full sourcing event audit history',
      '80% more spend to preferred vendors',
    ],
  },
  {
    icon: '💰',
    tag: 'Finance',
    color: '#4b8bff',
    headline: 'Pay right, every time',
    bullets: [
      '3-way PO ↔ Invoice ↔ GR matching',
      'Auto-hold on invoice exceptions',
      'Early payment discount capture',
      'Credit period and overdue tracking',
      'Real-time payment compliance KPIs',
      'ERP-synced payment records',
    ],
  },
  {
    icon: '⚙️',
    tag: 'Operations',
    color: '#0cc8a8',
    headline: 'Receive right, waste nothing',
    bullets: [
      'GRN scanning against open POs',
      '3-stage QC with rejection tracking',
      'Batch & expiry date management',
      'Auto credit notes for rejections',
      'Inventory receipt to production flow',
      'Tolerance-based GR approval',
    ],
  },
  {
    icon: '🔧',
    tag: 'IT / Admin',
    color: '#7c5cfc',
    headline: 'Integrate once. Control always.',
    bullets: [
      'Full REST API + OpenAPI spec',
      'Webhooks for Teams, Slack, WhatsApp',
      '100+ granular RBAC permissions',
      'Multi-entity and subsidiary isolation',
      'AWS Cognito + OTP passwordless login',
      'Complete audit trail on all models',
    ],
  },
];

export const INTEGRATIONS = [
  { name: 'SAP', category: 'ERP', color: '#0070f3' },
  { name: 'Oracle', category: 'ERP', color: '#e8433a' },
  { name: 'NetSuite', category: 'ERP', color: '#7c5cfc' },
  { name: 'SAP Ariba', category: 'Sourcing', color: '#0070f3' },
  { name: 'Salesforce', category: 'CRM', color: '#00a1e0' },
  { name: 'QuickBooks', category: 'Finance', color: '#2ca01c' },
  { name: 'Digi-Key', category: 'Distributor', color: '#c9a84c' },
  { name: 'Mouser', category: 'Distributor', color: '#e8433a' },
  { name: 'Slack', category: 'Comms', color: '#4a154b' },
  { name: 'Teams', category: 'Comms', color: '#5558af' },
  { name: 'Zapier', category: 'Automation', color: '#ff4a00' },
  { name: 'Chargebee', category: 'Billing', color: '#0cc8a8' },
];

export const INDUSTRIES = [
  { emoji: '🏗️', name: 'Construction & EPC', desc: 'Multi-site operations with site-wise budget control and subcontractor management' },
  { emoji: '🍔', name: 'Food & Beverage', desc: 'Batch tracking, expiry management, and FSSAI compliance for perishable inputs' },
  { emoji: '⚙️', name: 'Industrial Machinery', desc: 'BOM-based sourcing with engineering change order tracking and supplier qualification' },
  { emoji: '🤖', name: 'Factory Automation', desc: 'Electronic component sourcing with live Digi-Key / Mouser price benchmarking' },
  { emoji: '🚗', name: 'Automotive & Auto Parts', desc: 'Multi-tier supplier management with IATF-aligned quality tracking and releases' },
  { emoji: '💊', name: 'Pharma & Life Sciences', desc: 'CoA-linked goods receipt, batch genealogy, and Schedule M compliance workflows' },
];

export const API_CODE = `// Factwise REST API — Create Sourcing Event
const response = await fetch(
  'https://api.factwise.io/v1/events',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer fw_live_••••••••',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'Copper Wire 2.5mm — Q3 2024',
      type: 'RFQ',
      line_items: [
        { item_code: 'ELEC-CW-25',
          quantity: 5000, unit: 'kg' }
      ],
      vendors: ['VND-001', 'VND-012', 'VND-034'],
      deadline: '2024-09-15T18:00:00Z',
      rounds: 2,
    }),
  }
);

const event = await response.json();
// → { id: 'EVT-2941', status: 'live', ... }`;
