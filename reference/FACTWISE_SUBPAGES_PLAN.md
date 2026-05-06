# Factwise — Sub-Pages Build Plan
> Based on: Website Blueprint + Landing Page Brief
> Assumes: Homepage (V1) is DONE. This plan covers all remaining pages.

---

## Overview: What We're Building & When

The full site has **30+ pages** across three releases. The homepage is live. Everything below is what comes next — organized by release phase, with full section-by-section specs for each page.

```
V1 (NOW)       →  5 pages   — Core platform + conversion pages
V2 (+4 weeks)  →  11 pages  — Remaining platform, solutions, company
V3 (+8 weeks)  →  12+ pages — Industry, comparison, SEO, resources
```

---

# PHASE 1 — V1 (Build Now)

These 5 pages must go live as the next milestone. They complete the core conversion funnel.

---

## PAGE 1: Strategic Sourcing
**URL:** `/platform/sourcing`
**Priority:** MUST — featured in nav, referenced from homepage Tab 1

### Page Goal
Convert procurement managers researching RFQ tools. Show Factwise replaces the Excel-and-email sourcing workflow with a structured, competitive, multi-round process.

### Section Blueprint

**SECTION 1 — Hero**
- H1: "Find the best suppliers at the best price"
- Subheadline: "Run structured sourcing events, collect competitive bids, negotiate in multiple rounds, and award — all in one place. Every revision preserved."
- CTA Primary: [Request Demo]
- CTA Secondary: [See All Platform Features]
- Hero Visual: Screenshot of RFQ event with multiple vendor bids side-by-side

**SECTION 2 — Problem → Solution (2-column)**
| The Old Way | The Factwise Way |
|---|---|
| RFQs sent by email to individual suppliers | One event — invite all vendors, track submissions |
| Quotes collected in Excel, manually compared | Side-by-side bid comparison with landed cost |
| Re-negotiation via phone with no record | Multi-round bidding with full revision history |

**SECTION 3 — Key Capabilities (Bento Grid, 6 cards)**

| Card | Heading | Body |
|---|---|---|
| 1 | Multi-Round Bidding | Vendors submit opening bids. You counteroffer. Vendors re-quote. Complete negotiation chain preserved — every bid, every revision. |
| 2 | BOM-Based Sourcing | Source entire Bills of Materials in a single event. Multi-level BOM with sub-assemblies; total cost roll-up per assembly. |
| 3 | Landed Cost Modeling | Add freight, insurance, duty, and taxes on top of bids to compare true total cost — not just unit price. |
| 4 | N-Vendor Split | Algorithmic recommendation for splitting orders across multiple suppliers. Set allocation percentages; compare backup vs split scenarios. |
| 5 | Proxy & Sealed Bidding | Enter quotes on behalf of vendors for offline/sealed scenarios. Import bulk sealed bids from file. |
| 6 | Auto-Reminders | Configurable automatic vendor reminders for bid submission. Set initial, interval, and max reminders per event. |

**SECTION 4 — Workflow Visualization (Numbered Steps)**
1. Create sourcing event → add items, quantities, delivery dates, payment terms
2. Invite vendors → set bidding deadline, auto-reminders triggered
3. Vendors submit bids → compare side-by-side with landed cost analysis
4. Negotiate → counteroffer, vendors re-quote, full history preserved
5. Award → shortlist, allocate quantities, auto-generate Purchase Orders

**SECTION 5 — Feature Detail (Expandable accordion or 2-col list)**
- RFI pre-qualification before RFQ (structured questionnaire with scoring)
- RFP with timeline milestones and proposal scoring
- Linked RFQ events for vendor-specific parallel negotiation tracks
- 15+ event states including Pause/Resume capability
- BOM cloning on event revision
- Per-item currency (can differ from event currency)
- Access control: Default or Restricted (named users only)
- Approval workflow on events before they go live

**SECTION 6 — Related Modules**
"Works seamlessly with:" → Purchase Orders | Pricing Intelligence | Supplier Management | Contracts

**SECTION 7 — CTA Banner**
Dark background. "See a live sourcing event in action" + [Request Demo]

---

## PAGE 2: Purchase Orders
**URL:** `/platform/purchase-orders`
**Priority:** MUST — featured in nav, referenced from homepage Tab 2

### Page Goal
Show finance/procurement leaders that Factwise handles the full PO lifecycle — from auto-creation through amendments, delivery tracking, and termination — with full version history.

### Section Blueprint

**SECTION 1 — Hero**
- H1: "Manage every purchase order with full control"
- Subheadline: "From sourcing award to vendor acceptance, delivery tracking, and amendments — every PO has a complete history, approval chain, and audit trail."
- CTA Primary: [Request Demo]
- Hero Visual: PO screen with approval workflow status indicators

**SECTION 2 — Problem → Solution**
| The Old Way | The Factwise Way |
|---|---|
| POs created manually in ERP, emailed as PDF | Auto-generated from RFQ awards; one click |
| Amendments tracked by version number in filename | Full version chain; every revision linked |
| Delivery dates tracked in a separate spreadsheet | Delivery schedules per PO line item, with confirmation workflow |

**SECTION 3 — Key Capabilities (6 cards)**

| Card | Heading | Body |
|---|---|---|
| 1 | Auto-PO from Awards | When you award an RFQ, POs are created automatically — pre-filled with vendor details, items, pricing, delivery schedules, and payment terms. |
| 2 | Multi-Level Approval | Route POs through configurable approval chains. Criteria: value thresholds, vendor preference, item type, department. Auto-escalation up the org hierarchy. |
| 3 | PO Revision / Amendment | Revise issued POs with full version tracking. Every amendment creates a new version; all versions linked. Old versions preserved for audit. |
| 4 | Direct PO | Create POs directly without a sourcing event — for repeat purchases, preferred vendors, and catalogue items. Same approval and tracking capabilities. |
| 5 | Delivery Schedules | Per-delivery-date line items on every PO. Buyer/seller confirmation flow. Cost centre and GL code per delivery line. Real-time fulfillment tracking. |
| 6 | Bulk PO Operations | PO Groups for consolidated batch processing. Bulk creation from file upload (CSV/Excel). Barcode and QR code auto-generation per PO. |

**SECTION 4 — Workflow Visualization**
1. RFQ awarded → PO auto-created with all terms pre-filled
2. Approval routing → criteria-based multi-level sign-off
3. PO issued to vendor → vendor accepts or declines
4. Delivery schedules confirmed → fulfillment tracked per line
5. Completion / amendment → version chain preserved, invoicing triggered

**SECTION 5 — Feature Detail**
- Hold and termination workflow (buyer requests → vendor accepts → terminated)
- 12+ PO statuses for granular lifecycle visibility
- Prepayment invoice auto-created on vendor acceptance
- Vendor decline / buyer rescind with quantity reversion to award stage
- PO groups: staging → bulk creation
- Comments and collaboration on POs
- Export to Excel

**SECTION 6 — Related Modules**
→ Strategic Sourcing | Invoicing & Payments | Delivery Schedules | Contracts

**SECTION 7 — CTA Banner**
"See automated PO creation in action" + [Request Demo]

---

## PAGE 3: Pricing Intelligence
**URL:** `/platform/pricing-intelligence`
**Priority:** MUST — featured in V1 nav, flagship differentiator

### Page Goal
This is Factwise's most unique differentiator. Target procurement managers and CFOs who currently have no idea what they paid for an item last quarter — or what the market rate is today. Show the unified pricing repository.

### Section Blueprint

**SECTION 1 — Hero**
- H1: "Every price. Every source. One search."
- Subheadline: "A unified pricing repository that aggregates prices from every RFQ, contract, and live distributor feed — so you always know what you should be paying."
- CTA Primary: [Request Demo]
- Hero Visual: Pricing repository search results screen (multiple price sources for one item)

**SECTION 2 — The Problem (Full-width, bold)**
"Your best price is buried somewhere in last year's emails. Finding it takes 3 days. Factwise surfaces it in under a second."

**SECTION 3 — How It Works (3-column)**
| Column | Icon | Heading | Body |
|---|---|---|---|
| 1 | Database icon | Aggregated automatically | Every RFQ bid, awarded price, contract rate, and distributor quote is indexed the moment it's created. No manual entry. |
| 2 | Lightning icon | Searched instantly | Search any item and see every price, from every vendor, across every time period. Filter by date, vendor, quantity, currency. |
| 3 | Globe icon | Live distributor feeds | For electronics, pull live pricing from Digi-Key and Mouser alongside your historical bid data — in the same search. |

**SECTION 4 — Key Capabilities (Bento Grid)**

| Card | Heading | Body |
|---|---|---|
| 1 | Multi-Source Aggregation | Prices from RFQ bids, contracts (with volume tiers), direct POs, quote calculators, and live distributor APIs — all in one repository. |
| 2 | Landed Cost Analysis | Compare prices not just at face value — add freight, duty, insurance, and tax to see true landed cost for each source. |
| 3 | Target Price Setting | Set target/desired prices per item. Track whether incoming bids beat your target. Configurable visibility to vendors. |
| 4 | MPN / CPN Tracking | For electronics: track prices at the Manufacturer Part Number and Customer Part Number level. Cross-reference across distributors. |
| 5 | Currency Normalization | Compare prices across currencies with standard or custom exchange rates per vendor. |
| 6 | Historical Trends | See how prices have moved over time for any item. Spot inflation, negotiate with data, and validate supplier claims. |

**SECTION 5 — Who Benefits (2-column persona split)**
- **Procurement Manager:** "Never negotiate blind again. Walk into every RFQ knowing exactly what you paid last time and what the market is showing today."
- **CFO / Finance:** "Every price decision is traceable. Build accurate budgets with real pricing data — not gut feel."

**SECTION 6 — Related Modules**
→ Strategic Sourcing | Contracts | BOM Sourcing | Analytics

**SECTION 7 — CTA Banner**
"Search your pricing history in 30 seconds" + [Request Demo]

---

## PAGE 4: Demo Request
**URL:** `/demo`
**Priority:** MUST — this is the primary conversion page for all traffic

### Page Goal
Convert site visitors into qualified demo requests. Simple, clean, no distractions. High-trust signals on the right.

### Section Blueprint

**LAYOUT:** Split — Left: Form | Right: Value reinforcement

**LEFT: The Form**
- Heading: "See Factwise in action"
- Subheadline: "A 30-minute live demo, tailored to your procurement workflow."
- Fields:
  1. First Name (required)
  2. Last Name (required)
  3. Work Email (required)
  4. Company Name (required)
  5. Job Title (required)
  6. Company Size — dropdown: 1-50 / 51-200 / 201-500 / 501-2000 / 2000+
  7. Phone (optional)
  8. "What are you looking to solve?" — open text (optional, 3-line textarea)
- Submit Button: "Request My Demo" (not just "Submit")
- Below button: "No credit card. No commitment. We'll reach out within 1 business day."

**RIGHT: Value Reinforcement**
- Heading: "In 30 minutes, we'll show you:"
- Checklist (with checkmark icons):
  - How to run a competitive sourcing event from scratch
  - Auto-generating POs from awarded bids
  - Catching invoice mismatches with 3-way matching
  - Searching your entire pricing history instantly
  - Setting up approval workflows across your org
- (CONDITIONAL) Customer testimonial quote — only if real quotes available (see A6)
- Trust signals: [Only display badges confirmed in A6 — SOC 2, GDPR, etc.]

**Thank-You State (after form submit):**
- Heading: "You're booked."
- Body: "We'll reach out to confirm your demo time within 1 business day. In the meantime, explore how Factwise works."
- CTA: Links to 2-3 platform pages
- Note: This /demo/thank-you page should be blocked from search indexing (robots.txt)

---

## PAGE 5: Pricing
**URL:** `/pricing`
**Priority:** MUST — every buyer will check this before requesting a demo

### Page Goal
Give buyers enough pricing context to self-qualify, while routing enterprise prospects to sales. Use the FAQ section for common pricing objections.

### Section Blueprint

**SECTION 1 — Header**
- H1: "Simple pricing that scales with your team"
- Subheadline: "Start with the modules you need. Add more as your procurement team grows."

**SECTION 2 — Pricing Tiers (3-column card layout)**

| | Starter | Professional | Enterprise |
|---|---|---|---|
| **Best for** | Small procurement teams getting started | Growing teams needing full Source-to-Pay | Large orgs with multi-entity, API, and custom needs |
| **Included modules** | Requisitions, RFQ/Sourcing, Purchase Orders | + Contracts, Invoicing & Payments, GR/QC, Analytics, Pricing Intelligence | Everything + API access, Multi-entity, Custom integrations, Dedicated support |
| **CTA** | [Start Free Trial] | [Request Demo] | [Talk to Enterprise Sales] |

*Note: Actual per-seat pricing to be added by product team before launch.*

**SECTION 3 — Feature Comparison Table (Collapsible by category)**
Rows: All major features. Columns: Starter | Pro | Enterprise. Use ✓ / — / custom value.
Categories:
- Sourcing (RFQ, RFI, RFP, multi-round bidding, BOM sourcing)
- Purchase Orders (direct PO, PO groups, approval workflows)
- Invoicing & Payments (3-way matching, prepayments, credits)
- Contracts (volume tiers, revision workflow)
- Receive (GR, QC rounds, batch tracking)
- Analytics & Pricing Intelligence
- Platform (multi-entity, permissions, API, webhooks, SSO)
- Support (SLA, onboarding, CSM)

**SECTION 4 — FAQ (Accordion)**
- Q: Is there a free trial?
- Q: How is pricing calculated — per seat, per transaction, or flat?
- Q: Can I start with just sourcing and add modules later?
- Q: Do you offer discounts for annual billing?
- Q: What does implementation involve? How long does it take?
- Q: Is our data secure?
- Q: What ERP systems do you integrate with?
- Q: Do you charge for vendor/supplier accounts?

**SECTION 5 — CTA Banner**
"Not sure which plan fits?" + [Talk to our team] — routes to contact/demo form

---

# PHASE 2 — V2 (4 Weeks After V1 Launch)

---

## PAGE 6: Enterprise & Security
**URL:** `/enterprise`
**Priority:** HIGH — IT/CTO decision-maker page; required for enterprise sales

### Section Blueprint

**SECTION 1 — Hero**
- H1: "Built for enterprise scale, security, and compliance"
- Subheadline: "Factwise is architected for organizations that cannot afford downtime, data leaks, or audit gaps."
- CTA: [Talk to Enterprise Sales]

**SECTION 2 — Security Architecture (3 cards)**
- Encryption at rest and in transit
- Role-based access control with 100+ granular permissions (verifiable product fact)
- Full audit trail — every record, every change, timestamp + user (verifiable product fact)

**SECTION 3 — Compliance (CONDITIONAL — fill based on A6)**
Display only certifications confirmed:
- SOC 2 Type II (badge if certified; "In progress" text if not)
- ISO 27001 (same)
- GDPR compliance
- DPDP compliance (confirmed: module exists)

**SECTION 4 — Architecture Overview**
- Cloud-native on AWS
- No single point of failure
- Daily automated backups
- Uptime SLA — only display if formal SLA exists; otherwise use "Designed for high availability"

**SECTION 5 — Integration & API**
- REST API with full endpoint coverage
- Webhook-driven automation
- ERP sync: SAP, Oracle, NetSuite
- SSO-ready (enterprise identity providers)
- OpenAPI documentation

**SECTION 6 — Admin Controls**
- 100+ granular permission settings
- Multi-entity organization structure
- Template management (event, PO, invoice templates)
- Approval chain configuration
- Holiday calendar enforcement
- Custom field controls

**SECTION 7 — CTA**
Split: [Talk to Enterprise Sales] + [View API Documentation]

---

## PAGE 7: Contracts
**URL:** `/platform/contracts`
**Template:** Platform page template (same as Sourcing, PO)

### Key Content Points
- H1: "Lock in the best prices with managed contracts"
- Pain: Best negotiated price gets buried in a PDF that no one can find at renewal time
- Capabilities: Volume pricing tiers, revision workflow, auto-expiry alerts, pricing repository sync
- Workflow: Draft → Submit → Revise → Renewed/Expired
- Differentiator: Contract prices automatically sync to Pricing Intelligence — so when you run an RFQ, you already know your contracted rate

---

## PAGE 8: Invoicing & Payments
**URL:** `/platform/invoicing-payments`
**Template:** Platform page template

### Key Content Points
- H1: "Process invoices and payments without errors"
- Pain: Invoice disputes that drag on because mismatches were caught after payment, not before
- Capabilities: 7 automated mismatch checks (price, shipping, tax, payment terms, discount), prepayment handling, 5 credit types, overdue alerts
- Workflow: Invoice received → 3-way match → exception flagged → approval → payment
- Differentiator: System auto-holds invoices on 7 different mismatch types — no manual checking

---

## PAGE 9: Goods Receipt & Quality
**URL:** `/platform/goods-receipt-quality`
**Template:** Platform page template

### Key Content Points
- H1: "Verify every delivery and inspection"
- Pain: Quality rejections discovered after invoices are paid
- Capabilities: 3 GR types (final/draft/provisional), 3 QC stages (primary/secondary/production line), batch tracking with expiry dates, auto-credit for rejections
- Workflow: Delivery arrives → GR recorded → QC inspection → accept/reject per batch → credit auto-generated for rejections
- Differentiator: Quality check toggles payment — rejected goods don't trigger payment

---

## PAGE 10: Supplier Management
**URL:** `/platform/supplier-management`
**Template:** Platform page template

### Key Content Points
- H1: "Your entire supplier base, managed"
- Pain: Vendor information scattered across email contacts, ERP, and a shared spreadsheet
- Capabilities: Supplier onboarding, RFI/RFP qualification with scoring, rich profiles (certifications, factory locations, item catalogs), performance ratings, KYC/identification verification
- Workflow: Invite vendor → RFI pre-qualification → approve → active supplier → performance tracking
- Differentiator: Supplier profiles include factory photos with geo-coordinates, product competency tags, and buyer endorsements

---

## PAGE 11: Analytics & Dashboards
**URL:** `/platform/analytics`
**Template:** Platform page template

### Key Content Points
- H1: "See where every dollar goes"
- Pain: Spend data lives in 4 different tools and the report takes 3 days to build
- Capabilities: Spend breakdown by vendor/category/cost center/time period, KPI dashboards, Excel export, real-time data (no ETL delay)
- Audience: CFO + Finance primarily
- Differentiator: Analytics span the entire procurement chain — from requisition to payment — in one data model

---

## PAGE 12: Integrations
**URL:** `/platform/integrations`
**Template:** Custom (integration directory layout)

### Section Blueprint

**SECTION 1 — Hero**
- H1: "Connect Factwise to your existing tools"
- Integration logo grid: SAP | Oracle | NetSuite | Digi-Key | Mouser | Slack | Teams | Zapier

**SECTION 2 — Integration Categories (tabs)**
- ERP Systems (SAP, Oracle, NetSuite)
- Live Distributor Pricing (Digi-Key, Mouser)
- Communication (Slack, Teams)
- Automation (Zapier, Webhooks)
- Identity & SSO (enterprise providers)

**SECTION 3 — API Section**
- "API-first architecture"
- REST API with OpenAPI documentation
- Webhook-driven event notifications
- Full endpoint coverage across all modules
- CTA: [View API Docs]

---

## PAGE 13: Source-to-Pay (Solution)
**URL:** `/solutions/source-to-pay`
**Template:** Solution page template

### Key Content Points
- H1: "End-to-end procurement in one platform"
- Audience: CPO, VP Procurement evaluating a full platform replacement
- Angle: Show the connected flow from requisition → sourcing → PO → GR → invoice → payment as one continuous workflow with no data re-entry
- Key message: Every document is linked. You can trace a payment back to the original purchase request in 2 clicks.
- Modules to feature: All 9, shown as a connected flow

---

## PAGE 14: Strategic Sourcing (Solution)
**URL:** `/solutions/strategic-sourcing`
**Template:** Solution page template

### Key Content Points
- H1: "Structured sourcing that finds the best deal, every time"
- Audience: Sourcing Manager, Category Manager
- Angle: Replace the email/Excel sourcing workflow with a competitive, structured, auditable process
- Key modules: RFQ, RFI, RFP, Pricing Intelligence, multi-round bidding, landed cost

---

## PAGE 15: Supplier Management (Solution)
**URL:** `/solutions/supplier-management`
**Template:** Solution page template

### Key Content Points
- H1: "Manage vendors from onboarding to performance"
- Audience: Procurement team + Operations
- Modules: SRM, RFI, Supplier profiles, performance ratings, contract management
- Angle: Go from a spreadsheet of vendor contacts to a structured qualification and performance tracking system

---

## PAGE 16: Customers / Case Studies
**URL:** `/customers`
**Note:** Only build this page if at least 1 case study is ready (see A6). Do not launch with an empty page.

### Section Blueprint
- Hero: "Procurement teams running on Factwise" + key aggregate metrics (if real numbers available)
- Filter bar: Industry | Company Size | Use Case
- Case study card grid
- Individual case study template: Challenge → Solution → Results (3 metrics) → Quote → CTA

---

## PAGE 17: About Us
**URL:** `/company/about`

### Section Blueprint
- Mission statement
- Founding story (1-2 paragraphs — why was Factwise built?)
- Team section (photos + titles — only if team photos are available)
- Company values (3-4 values with brief descriptions)
- Office location / headquarters
- CTA: [We're hiring] → Careers | [Get in touch] → Contact

---

## PAGE 18: For Suppliers
**URL:** `/suppliers`
**Note:** Recommended for V2. Decision from A7 in brief.

### Key Content Points
- H1: "Respond to RFQs and manage your customer relationships — all in one place"
- Audience: Vendors/suppliers who have been invited by a buyer
- Features to highlight:
  - Guided bid submission (respond to RFQs in a structured flow)
  - Quote calculator (build detailed cost sheets with sections)
  - Invoice submission and payment status tracking
  - Supplier profile management (certifications, factory photos, catalogs)
  - Real-time chat with buyers
  - Contract and PO visibility
- CTA: "Learn more about the Factwise supplier portal" or "Your buyer uses Factwise — get started"

---

# PHASE 3 — V3 (8 Weeks After V1 Launch)

---

## PAGE 19: Electronics Manufacturing (Industry)
**URL:** `/solutions/electronics`
**Template:** Solution page template

### Key Content Points
- H1: "Procurement built for electronics teams"
- Unique angles: MPN/CPN tracking, live Digi-Key + Mouser pricing in the same search as your RFQ bids, BOM-based sourcing for assemblies, multi-level sub-BOM support
- Pain: Component pricing changes daily; your last negotiated price is outdated by the time you run the next RFQ
- Proof: Show a pricing repository screenshot with live distributor data alongside historical bid data

---

## PAGE 20: General Manufacturing (Industry)
**URL:** `/solutions/manufacturing`

### Key Content Points
- Multi-level BOM management with versioning
- 3-stage quality inspections (primary, secondary, production line)
- Incoterms and landed cost modeling for import sourcing
- Project-based procurement with cost center tracking
- GR tolerance configuration per item

---

## PAGE 21: Automotive & Aerospace (Industry)
**URL:** `/solutions/automotive-aerospace`

### Key Content Points
- Supplier qualification with RFI/RFP scoring before PO award
- Tiered pricing contracts with volume brackets
- Complete audit trail for compliance and traceability
- Batch-level traceability through GR and QC
- Multi-round bidding for high-value part negotiations

---

## PAGE 22: For Procurement Teams (Role)
**URL:** `/solutions/procurement-teams`

### Key Content Points
- H1: "Source faster. Negotiate better. Award smarter."
- Pain: RFQ cycles that take weeks, bid comparison in Excel, no pricing history
- Features: Competitive sourcing, multi-round bidding, landed cost, vendor split, pricing intelligence
- Outcome metrics (if real): Reduction in RFQ cycle time, cost savings from competitive bidding

---

## PAGE 23: For Finance Teams (Role)
**URL:** `/solutions/finance-teams`

### Key Content Points
- H1: "Full spend visibility. Accurate invoices. On-time payments."
- Pain: Invoice disputes, no spend visibility by cost center, AP team manually checking PO vs invoice
- Features: 3-way matching with 7 auto-checks, cost center tracking per delivery line, payment status, overdue alerts, spend analytics
- Outcome: Fewer invoice exceptions, faster month-end close

---

## PAGE 24: For Operations (Role)
**URL:** `/solutions/operations`

### Key Content Points
- H1: "Track every delivery, inspection, and batch"
- Pain: No visibility on whether a scheduled delivery is on track until the truck arrives
- Features: Delivery schedules with buyer/seller confirmation, GR, 3-stage QC, batch tracking with expiry dates, credit for rejections

---

## PAGE 25: For IT Teams (Role)
**URL:** `/solutions/it-teams`

### Key Content Points
- H1: "Enterprise-grade API. 100+ permissions. Zero headaches."
- Pain: Procurement tool doesn't integrate with ERP; IT team ends up building custom connectors
- Features: REST API, webhooks, 100+ granular permissions, SSO-ready, full audit trail, multi-entity org structure
- Tone: More technical than other pages; can show API code samples

---

## PAGE 26: Spend Management (Solution)
**URL:** `/solutions/spend-management`

### Key Content Points
- Unified view of spend across all procurement — from requisition to payment
- Breakdown by vendor, category, cost center, project, time period
- No data re-entry — analytics powered by the same data model as the transactions
- Export to Excel for further analysis

---

## PAGE 27: Contract Management (Solution)
**URL:** `/solutions/contract-management`

### Key Content Points
- H1: "Manage contracts across their full lifecycle"
- Full contract lifecycle: Draft → Active → Revision → Renewed/Expired
- Volume pricing tiers (min/max quantity brackets)
- Auto-expiry alerts
- Prices sync to Pricing Intelligence repository

---

## PAGE 28: BOM-Based Procurement (Solution)
**URL:** `/solutions/bom-sourcing`

### Key Content Points
- H1: "Source entire assemblies, not just parts"
- Pain: Running a separate RFQ for every component; no visibility into total assembly cost
- Features: Multi-level BOM import, BOM-level cost totals, sub-BOM sourcing, alternate item handling
- Audience: Manufacturing and electronics procurement teams

---

## PAGE 29: Blog / Resources Hub
**URL:** `/resources`
**Note:** Do not launch this page until at least 3-4 articles are published. An empty blog hurts SEO.

### Structure
- Featured article hero
- Filter by topic: RFQ Best Practices | Supplier Management | PO Management | ERP Integration | Compliance
- Article cards: Thumbnail + Category tag + Title + Date + Read time
- Newsletter signup (optional)

**Priority article topics (from Blueprint section 13):**
1. "How to run a competitive RFQ" (high search volume, relevant to core user)
2. "3-way matching explained" (common CFO/AP question)
3. "Multi-round bidding strategies"
4. "Vendor onboarding checklist"
5. "Procurement audit trails: what they are and why they matter"

---

## PAGE 30: Comparison Pages
**URL pattern:** `/compare/factwise-vs-[competitor]`
**Pages:** vs Coupa | vs SAP Ariba | vs Jaggaer | vs GEP | vs Zip

### Template Structure
- H1: "Factwise vs [Competitor]: Which is right for your team?"
- Intro: 1 paragraph, neutral framing
- Side-by-side feature comparison table
- Where we're stronger (honest, specific)
- Where they're stronger (honest — builds trust)
- Who should choose Factwise
- CTA: [Request Demo]

**Design note:** These pages must be honest and specific — not generic "we're better at everything" pages. Credibility comes from acknowledging tradeoffs.

---

## PAGE 31: Glossary
**URL pattern:** `/glossary/[term]`

### Priority Terms (from Blueprint, section 13)
Request for Quotation (RFQ) | Request for Information (RFI) | Request for Proposal (RFP) | Purchase Requisition | Purchase Order | Goods Receipt Note (GRN) | 3-Way Matching | Incoterms | Landed Cost | Bill of Materials (BOM) | N-Vendor Split | Proxy Bidding | Delivery Schedule | Payment Terms | HSN Code | MPN | CPN

### Template Structure
- H1: Term name
- Definition (2-3 paragraphs, plain English)
- How it works in practice (example)
- How Factwise handles this (feature link)
- Related terms (internal links)
- CTA: "See [term] in Factwise" → [Request Demo]

**Note:** These pages are pure SEO plays. They rank for procurement terminology searches and funnel into demo requests. Build them in bulk once blog/CMS infrastructure is set up.

---

# BUILD SUMMARY TABLE

| Phase | Page | URL | Template | Priority |
|---|---|---|---|---|
| **V1** | Strategic Sourcing | /platform/sourcing | Platform | MUST |
| **V1** | Purchase Orders | /platform/purchase-orders | Platform | MUST |
| **V1** | Pricing Intelligence | /platform/pricing-intelligence | Platform | MUST |
| **V1** | Demo Request | /demo | Unique | MUST |
| **V1** | Pricing | /pricing | Unique | MUST |
| **V2** | Enterprise & Security | /enterprise | Unique | HIGH |
| **V2** | Contracts | /platform/contracts | Platform | HIGH |
| **V2** | Invoicing & Payments | /platform/invoicing-payments | Platform | HIGH |
| **V2** | Goods Receipt & QC | /platform/goods-receipt-quality | Platform | HIGH |
| **V2** | Supplier Management | /platform/supplier-management | Platform | HIGH |
| **V2** | Analytics | /platform/analytics | Platform | HIGH |
| **V2** | Integrations | /platform/integrations | Custom | HIGH |
| **V2** | Source-to-Pay | /solutions/source-to-pay | Solution | HIGH |
| **V2** | Strategic Sourcing (Sol) | /solutions/strategic-sourcing | Solution | MEDIUM |
| **V2** | Supplier Management (Sol) | /solutions/supplier-management | Solution | MEDIUM |
| **V2** | Customers | /customers | Unique | MEDIUM |
| **V2** | About Us | /company/about | Unique | MEDIUM |
| **V2** | For Suppliers | /suppliers | Unique | MEDIUM |
| **V3** | Electronics Manufacturing | /solutions/electronics | Solution | MEDIUM |
| **V3** | General Manufacturing | /solutions/manufacturing | Solution | MEDIUM |
| **V3** | Automotive & Aerospace | /solutions/automotive-aerospace | Solution | MEDIUM |
| **V3** | For Procurement Teams | /solutions/procurement-teams | Solution | MEDIUM |
| **V3** | For Finance Teams | /solutions/finance-teams | Solution | MEDIUM |
| **V3** | For Operations | /solutions/operations | Solution | MEDIUM |
| **V3** | For IT Teams | /solutions/it-teams | Solution | MEDIUM |
| **V3** | Spend Management | /solutions/spend-management | Solution | LOW |
| **V3** | Contract Management | /solutions/contract-management | Solution | LOW |
| **V3** | BOM-Based Procurement | /solutions/bom-sourcing | Solution | LOW |
| **V3** | Blog / Resources | /resources | Unique | LOW |
| **V3** | Comparison Pages (5) | /compare/factwise-vs-* | Comparison | LOW |
| **V3** | Glossary (17+ pages) | /glossary/* | Glossary | LOW |

---

# TEMPLATES TO BUILD (ONE TEMPLATE → MANY PAGES)

Building these 4 templates unlocks the majority of pages:

| Template | Used By | Sections |
|---|---|---|
| **Platform Page** | 9 platform module pages | Hero → Problem/Solution → Capabilities (Bento) → Workflow Steps → Related Modules → CTA |
| **Solution Page** | 14 solution pages (use case + role + industry) | Hero → Pain Points → Key Modules → Who It's For → Related Pages → CTA |
| **Case Study** | /customers detail pages | Challenge → Solution → Results (3 metrics) → Quote → CTA |
| **Glossary Term** | 17+ glossary pages | Definition → How It Works → Factwise Feature → Related Terms → CTA |

---

# ASSETS REQUIRED BEFORE BUILD

Before development starts on each phase, these assets must be ready:

**For V1:**
- [ ] Brand guide (logo, colors, fonts)
- [ ] Product screenshots #1-7 (see brief E2 — bid comparison, PO, invoice match, pricing search, analytics dashboard)
- [ ] Demo form confirmed working (form service, email routing)
- [ ] Pricing tiers finalized (or placeholder confirmed)
- [ ] A6 reality check filled in (customers, certs, stats)

**For V2:**
- [ ] Screenshots #8-13 (contracts, delivery schedule, approval chain, custom fields)
- [ ] 1-2 case studies written and approved
- [ ] About page content (founding story, team bios, photos)
- [ ] Enterprise certifications status confirmed (SOC 2, ISO 27001)
- [ ] Supplier portal screenshots

**For V3:**
- [ ] 4+ blog articles written and edited
- [ ] Comparison research complete (vs each competitor, specific claims verified)
- [ ] Glossary articles written (can be batched)

---

*This plan is directly derived from the Factwise Website Blueprint and Landing Page Brief. Every page listed maps to content specified in those documents. No pages have been invented — all are sourced from the brief's sitemap, section C, and the phased plan in section E3.*
