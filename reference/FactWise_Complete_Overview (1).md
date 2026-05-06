# FactWise — Complete Product & Business Overview

> Compiled from 5 confidential proposal decks: BKT (Jan 2025), Sahasra Electronics (Aug 2025), Tricolite (Nov 2025 + Dec 2025 follow-up), Varroc Engineering (Mar 2026)

---

## 1. What is FactWise?

FactWise (Fact Wise Tech Inc.) is a **complete end-to-end quoting, sourcing, and procurement platform** that modernizes and simplifies the interaction between suppliers and internal stakeholders, while integrating into existing ERP and accounting systems.

**Tagline:** *"Comprehensive quoting, sourcing and procurement solution"*

**Founder & CEO:** Stawan Kamani | stawan@factwise.io | +91 9869181851

The platform is designed specifically for manufacturing and industrial companies that deal with complex Bills of Materials (BOMs), multiple vendors, and high direct-spend procurement operations.

---

## 2. The Problem FactWise Solves

Procurement teams in manufacturing companies face four major pain points:

**Pain Point 1 — Time wasted on RfQ creation and tracking**
Over 35% of a procurement team's time is spent on simple, repetitive requests — creating RfQs, tracking items, following up with vendors.

**Pain Point 2 — Tedious vendor response collection and analysis**
Over 50% of procurement time is spent collecting, standardizing, and analyzing vendor responses. There is no smart way to compare quotes.

**Pain Point 3 — No centralized audit trail**
Lack of technology is one of the top 4 reasons for regulatory and contract lawsuit concerns. Without a digital trail, organizations are exposed to compliance risk.

**Pain Point 4 — Missed savings due to lack of actionable insights**
2 out of 3 Purchase Orders are made without analyzing purchase order history or holistic vendor data — meaning buyers make uninformed decisions that leave money on the table.

---

## 3. The Platform — Module Map

FactWise is organized into three workflow phases, plus additional features:

### Phase 1: Pre-RfX (Setup & Intake)
| Module | Description |
|---|---|
| **Vendor Onboarding** | Multi-stage onboarding with flexible approval/stage gating, auto reminders for document expiration, auto-verification of critical documents |
| **Supplier Management** | Holistic vendor profiles tracking quotes, POs, invoices, payments, and compliance |
| **Requisitions** | Create/clone requisitions in seconds; combine items across requisitions for bulk discounts; customized templates per factory or request type; ERP integration |
| **Materials Management** *(Alpha)* | End-to-end materials tracking |
| **Item Analytics** | 5+ live commodity indexes and currency exchanges; critical live updates affecting commodity prices; integrated with RfQs and/or POs |
| **Project Management** | Self-customizable workflow and fields per project; KPI tracking; milestone-based progress; assign section owners |
| **Quote Management** | For contract manufacturers: manage the full customer quote lifecycle |
| **Quote Calculator** | Auto-calculate fully landed cost including VA, NRE, Engineering costs per BOM; multi-currency support; customizable approval hierarchy |
| **BOM Management** | Create infinite child BOMs; multiple alternates for any item within a BOM; BOM/child-BOM level analysis; n-level sub-BOMs |

### Phase 2: RfX Events → Quote & PO
| Module | Description |
|---|---|
| **RfX Creation** | Create events at scale — 1000+ items with 100+ vendors in one event; customizable auto-reminders per event; smart warnings highlighting cost savings opportunities; customize requests to vendors as needed |
| **Automated Follow-ups** | Auto-reminders to vendors to fill RfQs, eliminating manual chasing |
| **Automated Negotiations** *(Alpha)* | FW Autobot auto-negotiates on behalf of the buyer (50% quicker) |
| **Buyer RfX Analytics** | Identify cheapest vendor using landed cost calculation (custom formulas for BCD, SWS, NRE, clearance etc.); auto-select vendors based on Total Cost of Ownership (TCO), not just unit price; create all POs across multiple vendors in 1 click |
| **Dynamic Analytics** | Real-time pricing data to make bids smarter; spend aggregation across events and users; anchoring — allow buyers to anchor sellers on pricing to drive best prices |
| **Vendor Analytics** | Track vendor performance over time; historical analytics per vendor |
| **PO Creation** | Create POs directly without creating an RfX (Direct-to-PO); ready-made integration with any 3rd-party ERP; custom multi-stage approval hierarchy |

### Phase 3: PO to Pay
| Module | Description |
|---|---|
| **PO Management** | Dual-side PO management; vendor provides real-time delivery schedule updates; buyers can rescind or cancel POs; vendors mandated to accept/reject POs and all terms |
| **PO Collaboration** | Vendor/internal chat for seamless communication |
| **Invoice Management** | Self-customizable ASN/Invoice workflow; auto-fill ASN document based on PO data; vendors can add unique fields; identify mismatches between ASN–Invoice–PO |
| **Goods Receival Check (GR)** | Multi-template GR screen; auto-hold enablement based on PO–Invoice–ASN mismatch; completely self-customizable GR intake form; integrated warnings/alerts with total PO quantity; customizable GR tolerance |
| **Quality Check (QC)** | Unlimited QC checks; auto-calculation of refund based on QC failure; customizable QC form with attachment capabilities; fully integrated with GR, ASN, Invoice, and Payment |
| **Quadruple Validation** | Four-way matching across GR, QC, Invoice, and PO |
| **Payments** | Combine multiple invoices in one payment or pay partial invoices; dual notifications (buyer and seller) for payment status updates; full rational of any changes; third-party integrations to automate payment reconciliation and optimize cash flows |

### Additional / Cross-Cutting Features
| Module | Description |
|---|---|
| **Contract Management** | Centralized contract repository; integrated with contract prices in analytics |
| **Advance Cost Tracking** | Finance tracking and BOM requirements tracking |
| **Historical/AI Analytics** *(Alpha)* | AI-powered historical analytics on all transactional data |
| **Vendor/Internal Chat** | Built-in communication between buyers, internal stakeholders, and vendors |

---

## 4. AI & Automation Features

FactWise has a suite of AI and automation tools:

**ChatWise** — Leverage an LLM on your own FactWise data (internal AI assistant for procurement queries)

**FW Assist** — Auto-fills RfQ requirements based on historical data and patterns

**FW Recommend** — Auto-selects the best vendors for you based on performance and pricing data

**FW Autobot** — Creates events and auto-negotiates with vendors (50% quicker for complex, urgent tasks)

**FW D2PO (Direct-to-PO)** — Creates POs across multiple vendors instantly (40% quicker for simple, urgent tasks)

**FW RfX Analytics** — Does the analysis so buyers can focus on insights rather than number-crunching (30% quicker for complex, non-urgent tasks)

*Coming soon: FW Auto Negotiate, FW Auto Create*

### Automation Decision Matrix

| | **Simple / Repeatable** | **Complex** |
|---|---|---|
| **Urgent** | FW D2PO (40% quicker) | FW Autobot (50% quicker) |
| **Not Urgent** | FW D2PO | FW RfX Analytics (30% quicker) |

---

## 5. End-to-End Process Flows

### 5.1 Standard Procurement Flow (e.g., BKT — Direct Manufacturer)

```
Requisitions
    ↓
Vendor Onboarding & Supplier Management
    ↓
RfX Creation (items floated to vendors)
    ↓
Automated Follow-ups (vendor fills quotes)
    ↓
RfX Analytics (landed cost calculation, vendor comparison)
    ↓
Negotiation (manual or FW Autobot)
    ↓
PO Creation (1-click across multiple vendors)
    ↓
PO Management (vendor accepts, delivery schedule)
    ↓
Goods Receival Check (GR)
    ↓
Quality Check (QC)
    ↓
Invoice Management (ASN → Invoice → 4-way match)
    ↓
Payments (reconciliation, cash flow optimization)
```

### 5.2 Quoting + Procurement Flow (Contract Manufacturers — Tricolite, Sahasra, Varroc)

This flow is designed for **Turnkey EMS/EMS/Contract Manufacturing** companies that first need to quote to their own customers before procuring.

```
Step 1: Customer Request
Sales team receives an RfQ from their customer.
Creates a quote project in FactWise.
    ↓
Step 2: Quote Request Execution
Procurement team floats an RfQ for all BOM components 
in FactWise (100 vendors, 3000 items — 1 click).
    ↓
Step 3: RfX Negotiation
Procurement team negotiates with vendors on FactWise 
(manual or automated).
    ↓
Step 4: RfX Analytics
Procurement team identifies cheapest cost using 
automated landed cost calculation (BCD, SWS, NRE, 
clearance charges, customs etc.).
    ↓
Step 5: Quote Creation
Multi-currency RfQ is created from the event in FactWise.
    ↓
Step 6: Quote Additional Cost
Additional value-added costs (VA, NRE, Engineering) 
are auto-filled based on custom formula created by the 
client company.
    ↓
Step 7: Customer Quote Submission
Final quote is generated automatically in FactWise 
and sent to the customer.
    ↓
Step 8: Customer Quote Decision
Customer makes award decision.
Quote/project status is updated in FactWise.
    ↓
Step 9: Vendor POs Created
If awarded → RfQ event goes live and POs are issued 
to shortlisted vendors in 2 clicks.
```

### 5.3 Sourcing Flow (Tricolite-specific, Dec 2025)

For sourcing new components or vendors:
- Ensure best price for **Class A and B items** → Create rapid RfQs in FactWise before final quote is sent
- Get accurate estimates for **Class C items** during quotation phase
- Auto-fill prices across all quotes, events, and contracts for consistent pricing
- Complete project-level and BOM-level tracking (Costing BOM vs Design BOM)
- Reduce over-ordering of Class C items via end-to-end tracking
- Structured negotiations with distinctive analytics for Class A and B items

---

## 6. Analytics — A Core Differentiator

FactWise positions its analytics as the primary differentiator. Analytics exist at every step:

| Analytics Type | What It Does |
|---|---|
| **Item Analytics** | Live commodity indexes, currency exchange rates, market news affecting prices |
| **Buyer RfX Analytics** | Landed cost comparison across all vendor quotes; TCO-based vendor selection |
| **Dynamic Analytics** | Real-time pricing data; spend aggregation across events/users; price anchoring |
| **Vendor Analytics** | Historical vendor performance; delivery reliability; pricing trends |
| **Historical / AI Analytics** | AI-powered analysis of all past transactional data |
| **Custom Analytics** | Users self-create dashboards, graphs, and reports with no-code tools; save and reuse |
| **Contract Analytics** | Integrated with contract prices to flag deviations |
| **Advance Cost Tracking** | Finance-level BOM and project cost tracking |

**Key analytics features:**
- Pre-created graphs with flexible filters
- Ability to create completely custom dashboards
- Self-create and save graphs for future use
- Custom formulas for landed cost (define BCD, SWS, NRE, clearance, and any other cost component)
- Automated alerts on unexpected pricing deviations
- Historical performance tracking per individual buyer

---

## 7. Governance & Compliance

FactWise provides a comprehensive governance framework:

- **Maker-Checker System** — Completely adjustable at all critical steps
- **Custom Approval Hierarchies** — Multi-stage, no-code configuration for POs, quotes, and requisitions
- **Digital Audit Trail** — End-to-end tracking of all changes made to quotes, POs, and invoices
- **Automated Alerts** — Flag unexpected deviations by any individual during the quotation process
- **Self-customizable Validations** — At every step of the procurement process
- **Automated Landed Cost Calculations** — Ensure best vendor selection is always based on full cost, not just price
- **ESG & Compliance Tracking** — Identify and track ESG-compliant vendors, MSME vendors, Indian vs. non-Indian vendors (for Make in India initiatives)
- **4-Way Matching** — GR × QC × Invoice × PO before payment release

**Result metrics claimed:**
- 60% reduction in maverick spend (improved compliance and oversight)
- 93% increase in payment compliance

---

## 8. Integration & Deployment

### Integration
- **Open APIs** — Instant connection to any 3rd-party ERP (SAP, Oracle, etc.) at no extra cost
- **Ready-made ERP integrations** — Pre-built connectors for common ERP systems
- **Accounting system integration** — For payment reconciliation and cash flow optimization
- **No-code architecture** — Clients can customize workflows, forms, formulas, and analytics without developer involvement

### Deployment Model
**Initial Setup Support:**
- In-person buyer training sessions (multiple)
- Vendor onboarding training sessions
- Integration support with ERP provider
- Open API connection

**Ongoing Support:**
- 24×7 buyer support (noted for BKT)
- Buyer re-training on request
- Ongoing vendor training
- 1-on-1 buyer and vendor support
- Platform upgrades
- Auto-scalable cloud infrastructure
- Integrated in-app help with videos, step-by-step guides, and FAQs

### Support Structure (BKT Example)
- **Escalation POC:** Stawan (Founder) — handles all new and existing requirements directly
- **Pre-deploy POC:** Mirish — handles new requirements
- **Post-deploy POC:** Shubhank — ensures smooth deployment and day-to-day tasks
- **Support Team:** 15+ cross-functional experts (Frontend, Backend, QA SMEs, Product Managers)

### Time to Value
- **< 2 weeks** to begin saving
- Begin using the platform from Day 1
- No admin setup required to create events or POs
- No training costs for end users (intuitive interface)
- $0 additional cost for customization (no-code)

---

## 9. Business Impact & ROI

### Overall ROI Claim
**15x – 20x ROI within the first year**, driven by three pillars:

| Pillar | Metric |
|---|---|
| Significant Savings | 2% – 10% reduction in direct spend |
| Increased Efficiency | 40% gain in team productivity |
| Instant Time to Value | Under 2 weeks to go live |

### Savings Mechanism
FactWise reduces spend through three levers:
1. **Dynamic Analytics** — Real-time pricing intelligence makes bids smarter
2. **Spend Aggregation** — Aggregate spend across multiple events and users to unlock volume discounts
3. **Price Anchoring** — Allow buyers to anchor vendors on pricing benchmarks to drive best prices

Overall spend reduction potential: **up to 25%**

### Client-Specific Financial Impact

**BKT (Tyre Manufacturer):**
- Revenue: ₹1,000 Cr | Materials Spend: ₹500–800 Cr
- Conservative savings: 5%–10% → **₹25 Cr – ₹80 Cr savings**
- Total profit increase: **2.5% – 8%**

**Tricolite (EMS/Contract Manufacturer):**
- Revenue: ₹1,000 Cr | Direct materials spend: ₹500–900 Cr
- Cost savings: 5%–10% → **₹25 Cr – ₹90 Cr**
- Revenue increase (better quotes, fewer errors, reduced delays): 1%–5% → **₹10 Cr – ₹50 Cr**
- Total profit increase: **3% – 14%**

**Varroc Engineering (Automotive Components):**
- Revenue: ₹7,000 Cr | Direct materials spend (~65%): ₹4,550 Cr
- Cost savings: 1%–3% → **₹49 Cr – ₹144 Cr**
- Revenue increase: 1%–2% → **₹10 Cr – ₹20 Cr**
- Total profit increase: **2% – 6%**

### Benchmark Performance Metrics
| Metric | Improvement |
|---|---|
| More savings via fact-based negotiations | 25% |
| FTE productivity increase | 40% |
| Reduction in maverick spend | 60% |
| Increase in payment compliance | 93% |
| Time reduction to create quotes | 60% |

---

## 10. What Makes FactWise Distinctive

Three core differentiators summarized across all decks:

**"Make Better Decisions Faster"**
Distinctive analytics at every step — historical analytics, custom analytics, dynamic analytics, item analytics, vendor analytics, RfX analytics — all designed to surface the right insight at the right moment.

**"Do Everything, Efficiently"**
Manage tremendous complexity with ease: 1000+ items with 500+ vendors in one event, infinite sub-BOMs with alternate items, combining multiple requisitions, end-to-end lifecycle tracking.

**"Even You Can Do It"**
Completely self-customizable features with no-code architecture: custom formulas, custom analytics, custom approval hierarchies, custom forms, custom workflows — zero additional cost, zero developer dependency.

---

## 11. Industries Served

FactWise targets companies where physical products are manufactured:

- Automotive
- Electronics / EMS
- Pharmaceuticals
- Industrial Machinery
- Telecom
- Food & Beverage
- Chemicals
- Hospitality

**Notable clients include:**
- 2 Fortune 50 companies
- One of the largest tyre manufacturers in the world
- Syrma SGS (Electronics manufacturing)
- Spark Minda (Automotive components)
- Gem Corp
- Amkette
- Driplex
- BPT
- Prasol

---

## 12. Stakeholder Value Map

FactWise creates value for all four stakeholder groups within a client organization:

| Stakeholder | Value Delivered |
|---|---|
| **Chief Procurement Officer** | Increased visibility over all procurement activities; AI-driven savings potential; full data consolidation |
| **Operational Procurement Team** | AI-driven supplier sourcing and negotiation; easy, efficient ordering and tracking; automated invoicing and payments reconciliation |
| **Accounting & Finance Team** | Custom analytics and reporting; cash flow maximization; full ERP and accounting system integration |
| **External Suppliers** | Access to new customers; simplified order submission, processing, and tracking; automated documentation; direct buyer communication |

---

## 13. Tricolite-Specific Implementation Notes (Dec 2025)

From the "Future State" follow-up document, three key concerns were identified for successful FactWise implementation at Tricolite:

1. **Process Rigidity** — Risk of teams wanting to replicate current processes exactly rather than adopting FactWise's optimized workflows
2. **Engineering Team Buy-In** — Engineering team needs to change current operating behaviour for the system to work end-to-end
3. **Unnecessary SAP Integrations** — Over-integrating with SAP can lead to longer lead times and slower systems; integration scope should be kept lean

**FactWise's strategic value for Tricolite:**
- More conversions: Best price for Class A/B items via rapid pre-quote RfQs; accurate Class C estimates; auto-calculated fully landed costs; automation speeds up quotation; analytics improve decision quality
- Lower procurement costs: Auto-fill cheapest prices across all quotes, events, and contracts; project-level and BOM-level tracking; reduced over-ordering of Class C; structured negotiations for Class A/B

---

## 14. Key Terminology

| Term | Meaning |
|---|---|
| **RfX / RfQ** | Request for Quotation — event sent to vendors to gather price quotes |
| **BOM** | Bill of Materials — list of components required to manufacture a product |
| **TCO** | Total Cost of Ownership — full landed cost including freight, duties, taxes, not just unit price |
| **Landed Cost** | Final all-in cost to procure an item (unit price + BCD + SWS + NRE + clearance + freight etc.) |
| **ASN** | Advance Shipment Notice — document from vendor confirming shipment details |
| **GR** | Goods Receival — process of receiving and inspecting delivered goods |
| **QC** | Quality Check — inspection of received goods against specifications |
| **4-Way Match** | Validation of GR × QC × Invoice × PO before payment |
| **Class A/B/C Items** | ABC classification of items by value/criticality (A = highest value, C = lowest) |
| **D2PO** | Direct-to-PO — creating a PO without going through an RfX event |
| **EMS** | Electronics Manufacturing Services (contract electronics manufacturing) |
| **EDM** | Electronic Design & Manufacturing |
| **NRE** | Non-Recurring Engineering cost |
| **VA** | Value-Added cost |
| **BCD** | Basic Customs Duty |
| **SWS** | Social Welfare Surcharge |
| **Maverick Spend** | Uncontrolled or off-process purchasing that bypasses procurement controls |
| **Maker-Checker** | Dual-control system where one person creates and another approves a transaction |

---

*Document compiled from FactWise confidential proposal decks. All figures are as presented in the source materials.*
