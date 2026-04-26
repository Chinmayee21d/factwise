# Factwise — Website & Marketing Blueprint

> **Purpose:** Comprehensive business document for building the Factwise marketing website. Based on deep analysis of the entire backend codebase (50+ Django apps, 200+ models, 400+ API endpoints).

---

## Table of Contents

1. [Product Identity & Positioning](#1-product-identity--positioning)
2. [Complete Feature Map](#2-complete-feature-map)
3. [Module Deep-Dives (For Feature Pages)](#3-module-deep-dives)
4. [Website Structure & Sitemap](#4-website-structure--sitemap)
5. [Homepage Blueprint](#5-homepage-blueprint)
6. [Solution Pages (By Use Case)](#6-solution-pages)
7. [Solution Pages (By Persona)](#7-solution-pages-by-persona)
8. [Industry Pages](#8-industry-pages)
9. [Competitive Differentiators](#9-competitive-differentiators)
10. [Social Proof & Trust Signals](#10-social-proof--trust-signals)
11. [Technical Architecture (For Enterprise Page)](#11-technical-architecture)
12. [CTA Strategy](#12-cta-strategy)
13. [SEO Content Strategy](#13-seo-content-strategy)

---

## 1. Product Identity & Positioning

### What Factwise Is

Factwise is an **end-to-end procurement platform** that covers the entire source-to-pay lifecycle — from purchase requisitions through sourcing events, purchase orders, contracts, invoices, goods receipt, quality checks, and payments — in a single unified platform.

### One-Line Positioning Options

| Angle | Tagline |
|---|---|
| **Comprehensive** | "The complete procurement platform — from sourcing to payment" |
| **Intelligence** | "Procurement intelligence for every purchase decision" |
| **Speed** | "Source faster. Buy smarter. Pay on time." |
| **Unified** | "One platform for every procurement workflow" |
| **Control** | "Total visibility and control over your procurement spend" |

### Target Buyers

| Buyer | Title Examples | What They Care About |
|---|---|---|
| **CPO / VP Procurement** | Chief Procurement Officer, VP Strategic Sourcing | Cost savings, supplier consolidation, compliance, visibility |
| **Procurement Manager** | Category Manager, Sourcing Manager | RFQ efficiency, vendor comparison, bid analysis, cycle time |
| **Finance / CFO** | CFO, VP Finance, Controller | Spend visibility, 3-way matching, payment terms, budget adherence |
| **Operations / Supply Chain** | VP Operations, Supply Chain Director | Delivery performance, quality, lead times, GR/QC workflows |
| **IT / CTO** | CTO, IT Director, Systems Integrator | ERP integration, API, security, SSO, uptime |

### Industries Served (Based on Codebase Evidence)

- **Electronics Manufacturing** — MPN/CPN tracking, Digi-Key and Mouser live pricing, BOM-based sourcing
- **General Manufacturing** — Multi-level BOM, quality checks (primary/secondary/production line), GR tolerance
- **Industrial / Engineering** — HSN codes, incoterms, landed cost modeling, multi-currency
- **Automotive / Aerospace** — Tiered pricing, contract management, supplier qualification (RFI/RFP)
- **Pharmaceuticals / Healthcare** — Batch tracking, expiry dates, compliance (DPDP), audit trails
- **Retail / FMCG** — High-volume PO processing, PO groups, bulk operations
- **Energy / Utilities** — Project-based procurement, cost center/GL tracking

---

## 2. Complete Feature Map

### The Factwise Platform at a Glance

```
┌─────────────────────────────────────────────────────────────────┐
│                      FACTWISE PLATFORM                          │
├─────────┬──────────┬──────────┬──────────┬──────────┬──────────┤
│  SOURCE │  PROCURE │  RECEIVE │  PAY     │ MANAGE   │ ANALYZE  │
├─────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│ Requisi-│ Purchase │ Delivery │ Invoice  │ Supplier │ Pricing  │
│ tions   │ Orders   │ Schedule │ Mgmt     │ Mgmt     │ Intel    │
│         │          │          │          │          │          │
│ RFI/RFP │ Contract │ Goods    │ 3-Way    │ Item     │ Spend    │
│         │ Mgmt     │ Receipt  │ Matching │ Master   │ Analytics│
│         │          │          │          │          │          │
│ RFQ     │ Direct   │ Quality  │ Payment  │ Custom   │ Dash-    │
│ Events  │ PO       │ Checks   │ & Credit │ Fields   │ boards   │
│         │          │          │          │          │          │
│ Quotes  │ PO Group │ Batch    │ Prepay-  │ Appro-   │ Export   │
│ (Cost   │ (Bulk)   │ Tracking │ ments    │ vals     │ & Report │
│ Sheets) │          │          │          │          │          │
└─────────┴──────────┴──────────┴──────────┴──────────┴──────────┘

Underlying: Multi-Entity Org | Roles & Permissions | Templates & Custom Fields
            Chat & Collab | Notifications | Webhooks & API | Audit Trail
```

### Feature Inventory (Marketing-Ready)

#### SOURCE — Strategic Sourcing

| Feature | Description | Differentiator |
|---|---|---|
| **Purchase Requisitions** | Internal purchase requests with approval workflows, department routing, and budget tracking | Cart-to-requisition and order-request flows; auto-fulfillment tracking |
| **RFQ Events** | Create competitive sourcing events with multi-vendor bidding, deadlines, and auto-reminders | 15+ event states; pause/resume; version/revise live events with bid migration |
| **RFI Events** | Supplier pre-qualification questionnaires with template-based sections | Structured Overview + Scope + Questionnaire; reusable templates |
| **RFP Events** | Full proposal management with timelines, milestones, and scoring | Timeline engine; scoring deadlines; linked to RFI for staged qualification |
| **Multi-Round Bidding** | Vendors submit opening bids, buyers counteroffer, vendors re-quote — full negotiation chain preserved | Complete bid history with every revision; 6 bid types; parent-child bid chain |
| **Proxy / Sealed Bidding** | Buyer enters quotes on behalf of vendors (for offline/sealed scenarios) | Proxy quotes with future submission times; import support for bulk sealed bids |
| **N-Vendor Split Sourcing** | Algorithmic recommendation for splitting orders across N vendors | BACKUP vs SPLIT modes; matching criteria (payment, delivery, custom fields); % allocation |
| **Vendor Shortlisting & Allocation** | Shortlist bid items, allocate partial quantities, auto-match delivery schedules | Per-item granular allocation; auto-DS allocation; reset capability |
| **BOM-Based Sourcing** | Source entire Bills of Materials in a single RFQ event | Multi-level BOM with sub-BOMs; BOM-level cost totals; BOM cloning on revision |
| **Landed Cost Modeling** | Add insurance, freight, duty, taxes on top of bids to compare true total cost | Separate analytics cost layer; 3 cost types (AC, Tax, Discount); per-unit and % allocation |
| **Quote Calculator** | Sellers build detailed cost sheets with sections, approvals, and customer portal | Multi-section with user assignments; BOM integration; version history with revert; approval workflow |
| **Linked RFQ Events** | Create vendor-specific parallel RFQs linked to a parent event | Direct negotiation tracks within broader sourcing |
| **Auto-Reminders** | Configurable automatic seller reminders for bid submission | Initial + interval + max reminders; runs twice daily; per-event configuration |

#### PROCURE — Purchase & Contract Management

| Feature | Description | Differentiator |
|---|---|---|
| **Purchase Orders** | Full PO lifecycle from creation through acceptance to completion | 12+ statuses; revision/amendment with version chain; barcode + QR code generation |
| **Direct PO** | Create POs directly without going through an RFQ event | Draft → Approval → Issue → Accept flow; same rich capabilities as event-sourced POs |
| **Event-to-PO Flow** | Automatic PO creation from RFQ award stage | Award allocations → PO items → delivery schedules; auto-creates prepayment invoices |
| **PO Groups** | Batch multiple POs into a single group event for consolidated processing | Staging → bulk creation; file upload (CSV/Excel) for bulk PO generation |
| **PO Approval Workflow** | Multi-level approval with criteria-based routing through org hierarchy | Criteria: pricing thresholds, vendor preference, item type, customer; escalation up tree |
| **PO Hold & Termination** | Place POs on hold or initiate termination with seller acceptance workflow | Manual/automatic holds; termination request → seller accept → terminated; revocation support |
| **PO Revision / Amendment** | Revise issued POs with full version tracking | Clones PO + items; old version marked REVISED; `base_purchase_order_id` chains all versions |
| **Contract Management** | Create and manage vendor contracts with validity periods and pricing tiers | Volume-based pricing tiers (min/max qty brackets); revision workflow; auto-expire |
| **Delivery Schedules** | Manage planned deliveries across all modules with confirmation workflow | Per-delivery-date qty; buyer/seller confirmation flow; cost center + GL per delivery line; fulfillment tracking |

#### RECEIVE — Goods Receipt & Quality

| Feature | Description | Differentiator |
|---|---|---|
| **Goods Receipt (GRN)** | Record physical receipt of goods against invoices and POs | 3 types: final, draft, provisional; tolerance enforcement; revision support |
| **Quality Check** | Inspect received goods with configurable checklists and accept/reject quantities | 3 QC types: primary, secondary, production line; sample % configuration; payment toggle per QC |
| **Batch Tracking** | Track shipments at batch level with batch IDs and expiry dates | InvoiceItemBatch model; per-batch GR and QC; batch-level hold/terminate |
| **Credit Management** | Automatic credit generation for QC rejections, GR rejections, and invoice redos | 5 credit types; credit consumption against future payments; full credit lifecycle |

#### PAY — Invoice & Payment

| Feature | Description | Differentiator |
|---|---|---|
| **Invoice Management** | Process seller invoices with automatic validation against POs | 6 invoice types; auto-hold on 7 mismatch conditions; tier conversion approval |
| **3-Way Matching** | Automatic PO-Invoice-GR matching with exception handling | Price, shipping, tax, payment terms, discount mismatch detection; buyer/seller approval tiers |
| **Prepayment Invoices** | Automatic prepayment invoice generation on PO acceptance | Buyer prepayment auto-created; seller prepayment claims; credit netting |
| **Payment Processing** | Record and track payments with credit offset capability | Online/offline/balance-only; per-invoice-item or per-deliverable payment; overdue tracking |
| **Payment Terms** | Configurable net terms with applied-from date options | Receipt date / dispatch date / invoice date basis; milestone-based deliverables payment |

#### MANAGE — Master Data & Configuration

| Feature | Description | Differentiator |
|---|---|---|
| **Supplier Management** | Complete vendor lifecycle from onboarding to performance tracking | Preference tiers; contact management; identification/KYC verification; star ratings & reviews |
| **Supplier Profile (SRM)** | Rich vendor profiles with certifications, factory locations, and item catalogs | Buyer endorsements; factory photos with geo-coordinates; product competency tags |
| **Item Master** | Centralized item library with codes, attributes, and specifications | 4 item types; MPN/CPN/ERP/HSN codes; typed attributes; preferred vendor tracking |
| **Bill of Materials** | Multi-level BOM management with versioning and revision tracking | Sub-BOMs; alternate items; module linkages (RFQ, Project, Quote); bulk import |
| **Project Management** | Project-based procurement with BOM and item tracking | Manager/user assignments; cost centre linkages; event qty tolerance; ERP project codes |
| **Cost Centers & GL** | Financial tracking with cost center and general ledger assignment | Per-entity cost centers; GL accounts with types; linkage to delivery schedule items |
| **Custom Fields & Templates** | Enterprise-configurable form fields across all modules | 20+ field types; scoring/assessment support; rejectable sections; formula engine |
| **Approval Hierarchy** | Configurable per-module approval chains with criteria-based routing | AND/OR criteria trees; pricing/item/vendor/buyer conditions; escalation |
| **Roles & Permissions** | Granular 100+ named permissions across all modules | 7+ roles; per-entity permissions; event-level access control (default/restricted) |
| **Multi-Entity Organization** | One parent enterprise, multiple buyer/seller entities | Independent entity settings; cross-entity procurement; virtual entities |
| **Tax Management** | Tax master with geographic scoping and item/entity linkages | Country/state/city/pincode targeting; validity ranges; formula-based calculation |
| **Terms & Conditions** | T&C library with module-level defaults | Per-module defaults; template-linked; negotiable in bids |
| **Holiday Calendar** | Entity-specific holiday calendars for deadline calculations | By day-of-week or specific date; multi-entity support |

#### ANALYZE — Analytics & Intelligence

| Feature | Description | Differentiator |
|---|---|---|
| **Pricing Repository** | Unified pricing intelligence database aggregating all price sources | Contract, Quote, RFQ, PO, Digi-Key, Mouser prices in one searchable table; full-text search |
| **Live Distributor Pricing** | Real-time Digi-Key and Mouser pricing integration | Per-entity API credentials; smart cache; batch pricing jobs; background sync |
| **Spend Analytics** | Denormalized analytics table joining entire procurement chain | RFQ → Bid → PO → Invoice → GR → QC → Payment in one queryable table |
| **Procurement Dashboard** | Configurable tabbed dashboards with filters, search, and sort | 15+ dashboard views; built-in + custom field filters; gzip-compressed responses |
| **Quote Analytics** | Multi-dimensional costing sheet analysis | Cost view; BOM detail; project delta comparison; header analytics |
| **RFQ Analytics** | Bid comparison and vendor response metrics | Avg bids/item; vendor response time; N-vendor comparison; comprehensive event dashboard |
| **Export Engine** | Full data export to Excel/CSV across all modules | 25+ export types; async processing; S3 presigned download URLs |
| **Bulk Import** | Spreadsheet-based bulk data import with validation | Items, vendors, buyers, BOMs, RFQ items; cell-level validation; error reporting |

#### COLLABORATE — Communication & Documents

| Feature | Description | Differentiator |
|---|---|---|
| **Real-Time Chat** | WebSocket-powered buyer-seller messaging per RFQ | Threaded replies; broadcast to multiple sessions; file attachments; read receipts |
| **Notifications** | In-app + email notifications across entire procurement lifecycle | 50+ notification event types; user-configurable per-event enable/disable |
| **Document Sharing** | Buyer-seller document exchange with revision tracking | Seller-specific access; revision history; custom fields on documents |
| **Comments & Notes** | Threaded comments on procurement documents | On RFQ events, POs; structured notes for item analytics |
| **Attachments** | Centralized file management across all modules | 40+ attachment types; S3-backed with presigned URLs; barcode/QR support |

#### INTEGRATE — API & Connectivity

| Feature | Description | Differentiator |
|---|---|---|
| **Public REST API (OpenAPI)** | External API for ERP and system integrations | PO, Contract, Item, Vendor, Project, Quote CRUD; API key management |
| **Webhooks** | Outbound event notifications to external systems | PO create events; Teams, Slack, WhatsApp, Zapier endpoints |
| **ERP Integration** | Bi-directional sync with ERP systems | ERP codes on PO, Contract, Item, Project; OpenAPI for bulk sync |
| **Distributor APIs** | Live pricing from electronic component distributors | Digi-Key + Mouser; encrypted credentials; batch jobs with rate limiting |

---

## 3. Module Deep-Dives (For Feature Pages)

### 3.1 Strategic Sourcing (RFQ)

**Hero Message:** "Run competitive sourcing events that find the best price, terms, and quality — automatically."

**Key Capabilities to Showcase:**

1. **Create → Invite → Bid → Negotiate → Award → PO** in one seamless flow
2. **Multi-round negotiation**: Opening bid → Counteroffer → Re-quote → ... with complete history preserved
3. **15+ event states** with full lifecycle control (pause, resume, revise, terminate)
4. **BOM-based sourcing**: Import entire Bills of Materials; BOM-level cost rollups
5. **N-vendor split**: Algorithm recommends optimal vendor split by quantity
6. **Proxy bidding**: Enter bids on behalf of vendors for sealed/offline sourcing
7. **Landed cost comparison**: Layer insurance, freight, duty, taxes on top of bids
8. **Auto-reminders**: Configurable reminder schedules so vendors never miss deadlines
9. **Comprehensive bid comparison**: Side-by-side vendor comparison with full cost breakdowns
10. **Export**: Full bid history export to Excel with every negotiation round

**Walkthrough Flow for Website:**
```
Step 1: Create RFQ → Define items, quantities, delivery dates, terms
Step 2: Invite Vendors → Select from vendor master, assign items per vendor
Step 3: Collect Bids → Vendors submit quotes; auto-reminders ensure responses
Step 4: Compare & Negotiate → Side-by-side comparison; counteroffer; re-quote
Step 5: Award & Create PO → Allocate quantities; auto-generate purchase orders
```

**Stats to Display:**
- "Compare bids from N vendors in seconds, not hours"
- "Full negotiation history — every quote, counteroffer, and revision"
- "Auto-create POs from awarded bids in one click"

---

### 3.2 Purchase Order Management

**Hero Message:** "From requisition to receipt — manage every purchase order with full visibility and control."

**Key Capabilities:**
1. **Two creation paths**: Event-sourced (from RFQ award) and Direct PO
2. **Multi-level approval** with criteria-based routing
3. **PO revision/amendment** with full version history
4. **Hold and termination** workflows with seller acceptance
5. **Barcode and QR code** generation per PO
6. **Delivery schedule management** with buyer/seller confirmation
7. **Cost center and GL allocation** at PO and delivery-line level
8. **PO Groups** for consolidated batch processing
9. **ERP integration** via OpenAPI for bi-directional sync
10. **Full audit trail** on every status change

**Walkthrough Flow:**
```
Step 1: Requisition → Internal request with approvals
Step 2: Source → RFQ event or direct creation
Step 3: Approve → Multi-level criteria-based approval chain
Step 4: Issue → Send to vendor with barcode/QR
Step 5: Track → Delivery schedule, GR, QC, Invoice, Payment
```

---

### 3.3 Contract Lifecycle Management

**Hero Message:** "Manage vendor contracts from creation through renewal — with volume pricing tiers and automatic expiry tracking."

**Key Capabilities:**
1. **Contract creation** with templates, custom fields, and T&C
2. **Volume pricing tiers** (min/max quantity brackets per item)
3. **Revision workflow**: Pause → Revise → Submit new version
4. **Auto-expiry** via scheduled background tasks
5. **Seller access management** per contract
6. **Pricing repository sync** — contract prices flow into unified pricing intelligence
7. **ERP contract ID** for integration

---

### 3.4 Invoice & Payment

**Hero Message:** "Automate invoice processing with 3-way matching, automatic exception handling, and credit management."

**Key Capabilities:**
1. **6 invoice types**: Seller goods, proforma, buyer GR/QC, prepayment (buyer + seller)
2. **Automatic 3-way matching**: PO ↔ Invoice ↔ GR with 7 mismatch detection rules
3. **Auto-hold**: System flags price, tax, shipping, payment terms, and discount mismatches
4. **Batch-level tracking**: Invoice item batches with batch IDs and expiry dates
5. **Credit management**: Auto-generate credits for QC rejections, GR rejections, invoice redos
6. **Prepayment automation**: Auto-create prepayment invoices on PO acceptance
7. **Payment tracking**: Due dates, overdue alerts, partial payments, credit netting

---

### 3.5 Goods Receipt & Quality Check

**Hero Message:** "Verify every delivery with configurable goods receipt and multi-stage quality inspection workflows."

**Key Capabilities:**
1. **3 GR types**: Final, Draft (in-progress), Provisional (before full inspection)
2. **GR tolerance enforcement**: Configurable per entity
3. **3 QC types**: Primary, Secondary, Production Line
4. **Sample percentage configuration** for statistical quality control
5. **Accept/reject quantities** with automatic credit generation
6. **Payment toggle**: Control whether QC rejections affect payment
7. **Custom checklists and templates** per entity

---

### 3.6 Supplier Relationship Management

**Hero Message:** "Manage your entire supplier base — from onboarding and qualification to performance tracking and collaboration."

**Key Capabilities:**
1. **Vendor master**: Enterprise + entity level vendor records with codes, tags, custom fields
2. **Preference tiers**: Preferred, Standard, Blocked
3. **Onboarding**: Invitation workflow with email-domain auto-approval
4. **KYC/Identification**: PAN, GST, and other ID verification with states
5. **Supplier profiles**: Certificates, factory locations with photos, product competency tags
6. **Item catalogs**: Vendor-maintained item listings with pricing and reviews
7. **Star ratings and reviews**: Buyer reviews and endorsements
8. **Visit management**: Track field visits to suppliers/customers
9. **RFI/RFP**: Formal supplier qualification questionnaires
10. **Forms**: Dynamic multi-page evaluation forms with scoring

---

### 3.7 Pricing Intelligence

**Hero Message:** "Every price your organization has ever seen — contracts, quotes, bids, POs, and live distributor feeds — in one searchable repository."

**Key Capabilities:**
1. **6 price sources**: Contracts, Quotes, RFQ Bids, Purchase Orders, Digi-Key, Mouser
2. **Full-text search**: PostgreSQL GIN index for instant search across all fields
3. **Live distributor pricing**: Real-time Digi-Key and Mouser API integration
4. **Composite indexes**: Sub-millisecond query performance
5. **Sync modes**: Real-time, daily batch, or manual — configurable per enterprise
6. **Sync audit trail**: Full log of every sync operation
7. **Landed cost breakdown**: Additional costs, taxes, discounts per price entry
8. **Export**: Full pricing repository export to Excel

---

### 3.8 Analytics & Dashboards

**Hero Message:** "Real-time procurement analytics — from spend visibility to vendor performance to savings tracking."

**Key Capabilities:**
1. **Denormalized analytics table**: Joins RFQ → Bid → PO → Invoice → GR → QC → Payment
2. **Configurable dashboards**: 15+ views with tab counts, filters, search, sort
3. **Rich filtering**: GREATER_THAN, LESS_THAN, IN, CONTAINS, BETWEEN, IS_NULL + custom field filters
4. **Grouping**: By entity, vendor, year, quarter, month, week, item, approver
5. **Aggregations**: Sum, count, avg, min, max, array_agg
6. **Quote analytics**: Cost view, BOM detail, project delta comparison
7. **RFQ analytics**: Comprehensive event dashboard with 10K+ row CSV export
8. **Custom metrics**: Enterprise-level named formulas for KPI tracking

---

## 4. Website Structure & Sitemap

```
factwise.com/
├── Homepage
├── platform/
│   ├── overview                    — Platform overview (feature map)
│   ├── sourcing                    — RFQ, RFI, RFP, Quote Calculator
│   ├── purchase-orders             — PO management, Direct PO, PO Groups
│   ├── contracts                   — Contract lifecycle management
│   ├── invoicing-payments          — Invoice, 3-way matching, payments
│   ├── goods-receipt-quality       — GR, QC, batch tracking
│   ├── supplier-management         — SRM, vendor profiles, qualification
│   ├── pricing-intelligence        — Pricing repository, distributor feeds
│   ├── analytics-dashboards        — Spend analytics, dashboards, reporting
│   ├── approvals-workflows         — Approval engine, configurable hierarchy
│   ├── custom-fields-templates     — Template builder, custom fields, forms
│   └── integrations                — API, webhooks, ERP, Digi-Key, Mouser
├── solutions/
│   ├── by-role/
│   │   ├── procurement-teams       — For CPOs, sourcing managers
│   │   ├── finance-teams           — For CFOs, AP teams
│   │   ├── operations              — For supply chain, warehouse teams
│   │   └── it-teams                — For CTOs, system integrators
│   ├── by-use-case/
│   │   ├── source-to-pay           — End-to-end S2P
│   │   ├── strategic-sourcing      — RFQ/RFP/RFI focused
│   │   ├── spend-management        — Analytics + dashboards
│   │   ├── supplier-management     — SRM focused
│   │   ├── contract-management     — CLM focused
│   │   └── bom-sourcing            — BOM-based procurement
│   └── by-industry/
│       ├── electronics-manufacturing
│       ├── general-manufacturing
│       ├── automotive-aerospace
│       ├── pharmaceuticals
│       └── retail-fmcg
├── customers/
│   ├── case-studies                — Filterable by industry/size
│   └── [individual-case-study]     — Challenge → Solution → Results
├── pricing/                        — Tier comparison + Enterprise contact
├── resources/
│   ├── blog
│   ├── whitepapers
│   ├── webinars
│   ├── roi-calculator
│   └── glossary                    — Procurement term definitions (SEO)
├── developers/
│   ├── api-documentation           — OpenAPI reference
│   ├── webhooks                    — Webhook setup guide
│   └── changelog                   — Product updates
├── company/
│   ├── about
│   ├── careers
│   ├── press
│   └── contact
├── enterprise/                     — Security, compliance, SLAs
├── integrations/
│   ├── overview                    — Integration ecosystem
│   ├── sap                         — ERP integration pages
│   ├── oracle
│   ├── digikey                     — Distributor integration
│   └── mouser
├── demo/                           — Request demo form
├── login/                          — App login redirect
├── security/                       — SOC 2, ISO, GDPR, DPDP
└── legal/
    ├── privacy
    ├── terms
    └── cookie-policy
```

---

## 5. Homepage Blueprint

### Section 1: Sticky Navigation
```
[Factwise Logo]  Platform ▾  Solutions ▾  Customers  Pricing  Resources ▾  Developers ▾  [Login]  [Request Demo]
```

### Section 2: Hero
**Headline:** "The Complete Procurement Platform"
**Subheadline:** "From requisition to payment — source, procure, receive, and pay in one unified platform trusted by manufacturing and enterprise teams."
**Primary CTA:** [Request Demo] (filled)
**Secondary CTA:** [See Platform Overview] (outlined)
**Visual:** Animated product dashboard showing the RFQ → PO → Invoice flow

### Section 3: Trust Bar
Grayscale logos of top customers. Label: "Trusted by procurement teams at"

### Section 4: Problem Statement
Three columns:
- "Scattered across 5+ tools" → "One unified platform"
- "Blind to your best prices" → "Every price in one repository"
- "Weeks to close an RFQ" → "Source and award in days"

### Section 5: Feature Walkthrough (Tabbed or Sticky Scroll)

**Tab 1: Source**
- Screenshot: RFQ event with multiple vendor bids side-by-side
- Copy: "Run competitive sourcing events. Collect bids from multiple vendors, compare landed costs, negotiate in multiple rounds, and award — all in one flow."

**Tab 2: Procure**
- Screenshot: PO with approval workflow and delivery schedule
- Copy: "Create purchase orders from awards or directly. Route through multi-level approvals, track delivery schedules, and manage amendments with full version history."

**Tab 3: Receive**
- Screenshot: Goods receipt with quality check
- Copy: "Record goods receipt, run multi-stage quality inspections, and automatically handle exceptions. Every batch tracked from receipt to acceptance."

**Tab 4: Pay**
- Screenshot: Invoice with 3-way matching indicators
- Copy: "Process invoices with automatic 3-way matching. The system flags price, tax, and terms mismatches instantly — so you catch exceptions before they become problems."

**Tab 5: Analyze**
- Screenshot: Analytics dashboard with spend breakdown
- Copy: "See every price your organization has negotiated. Unified pricing intelligence from contracts, quotes, bids, POs, and live distributor feeds — searchable in milliseconds."

### Section 6: Stats Bar
- "X+" enterprises on the platform
- "X" countries served
- "Y%" average cost reduction reported
- "Z" seconds — average pricing query time

### Section 7: Social Proof
Featured case study card + 2-3 testimonial quotes

### Section 8: Integration Ecosystem
"Works with your existing ERP and tools" + logos (SAP, Oracle, NetSuite, Digi-Key, Mouser, Slack, Teams)

### Section 9: Built For Your Team (Tabs)
- For Procurement → sourcing efficiency, bid comparison, vendor management
- For Finance → spend visibility, 3-way matching, payment terms compliance
- For Operations → delivery tracking, GR/QC workflows, quality management
- For IT → REST API, webhooks, SSO, role-based access, audit trails

### Section 10: Enterprise Trust
"Enterprise-grade security and compliance" + badges (SOC 2, ISO 27001, GDPR, DPDP)

### Section 11: Final CTA
"Ready to streamline your procurement?" + [Request Demo] + [See Pricing]

### Section 12: Mega Footer
Full sitemap links organized by category

---

## 6. Solution Pages (By Use Case)

### 6.1 Source-to-Pay (S2P)

**URL:** `/solutions/source-to-pay`
**Hero:** "End-to-end source-to-pay in one platform — no handoffs, no data loss, no blind spots."
**Value Props:**
1. Requisition → RFQ → PO → Invoice → Payment — one connected flow
2. Every document linked: trace any payment back to its original requisition
3. Approval workflows at every stage with configurable hierarchy
4. Real-time spend visibility across the entire procurement chain

**Feature Highlights:**
- Requisition management with department routing
- Competitive sourcing (RFQ/RFI/RFP)
- PO creation from awards + direct PO
- Invoice 3-way matching
- GR/QC workflows
- Payment processing with credit management
- Analytics spanning the full chain

---

### 6.2 Strategic Sourcing

**URL:** `/solutions/strategic-sourcing`
**Hero:** "Find the best suppliers, at the best prices, with the best terms — through structured competitive sourcing."
**Value Props:**
1. Multi-round negotiation with complete bid history
2. N-vendor split sourcing with algorithmic recommendations
3. Landed cost modeling for true total cost comparison
4. BOM-based sourcing for complex assemblies

---

### 6.3 Spend Management

**URL:** `/solutions/spend-management`
**Hero:** "See where every dollar goes. Understand your spend across vendors, categories, entities, and time."
**Value Props:**
1. Denormalized analytics table joins the full procurement chain
2. Group and filter by entity, vendor, item, time period, approver
3. Custom metrics and KPI definitions
4. Full data export to Excel/CSV

---

### 6.4 Supplier Management

**URL:** `/solutions/supplier-management`
**Hero:** "From onboarding to performance tracking — manage your entire supplier base in one place."
**Value Props:**
1. Structured onboarding with KYC verification
2. Supplier profiles with certifications and factory locations
3. Performance tracking with star ratings and reviews
4. Formal qualification via RFI/RFP with scoring

---

### 6.5 Contract Management

**URL:** `/solutions/contract-management`
**Hero:** "Create, manage, and enforce vendor contracts with volume pricing tiers and automatic expiry tracking."
**Value Props:**
1. Volume-based pricing tiers per contract item
2. Revision workflow with version history
3. Auto-expiry alerts and scheduled checks
4. Contract prices sync to pricing repository for benchmarking

---

### 6.6 BOM-Based Procurement

**URL:** `/solutions/bom-sourcing`
**Hero:** "Source entire assemblies, not just individual parts. Import BOMs, source all components, and track costs at every level."
**Value Props:**
1. Multi-level BOM management with sub-BOMs and alternates
2. Import BOMs into RFQ events for competitive sourcing
3. BOM-level cost rollups across vendors
4. Pricing intelligence for every component (including live Digi-Key/Mouser pricing)

---

## 7. Solution Pages (By Persona)

### 7.1 For Procurement Teams

**URL:** `/solutions/procurement-teams`
**Messaging:** "Source faster. Negotiate better. Award smarter."
**Key Features:**
- RFQ events with multi-round bidding
- Landed cost comparison across vendors
- N-vendor split with matching criteria
- Requisition-to-PO flow
- Vendor qualification (RFI/RFP)
- Bid history export for audit

### 7.2 For Finance Teams

**URL:** `/solutions/finance-teams`
**Messaging:** "Full spend visibility. Automatic invoice matching. On-time payments."
**Key Features:**
- 3-way matching with auto-hold on exceptions
- Cost center and GL allocation at delivery-line level
- Payment terms tracking and overdue alerts
- Credit management (QC rejections, prepayment offsets)
- Spend analytics with grouping and aggregation
- Budget adherence via pricing repository benchmarks

### 7.3 For Operations Teams

**URL:** `/solutions/operations`
**Messaging:** "Track every delivery. Inspect every receipt. Ensure every item meets quality standards."
**Key Features:**
- Delivery schedule management with buyer/seller confirmation
- Goods receipt with tolerance enforcement
- Multi-stage quality checks (primary, secondary, production line)
- Batch tracking with expiry dates
- Fulfillment tracking across requisitions and POs

### 7.4 For IT Teams

**URL:** `/solutions/it-teams`
**Messaging:** "Enterprise-grade API. Role-based access. Full audit trail. Zero headaches."
**Key Features:**
- REST API with key management for ERP integration
- Webhooks for real-time event notifications
- 100+ granular permissions with role-based access
- Full audit trail via django-simple-history
- Multi-entity organization with isolated permissions
- Health monitoring with DB diagnostics, CPU/memory tracking

---

## 8. Industry Pages

### 8.1 Electronics Manufacturing

**URL:** `/solutions/electronics-manufacturing`
**Key Angles:**
- MPN/CPN tracking in item master
- Live Digi-Key and Mouser pricing integration
- BOM-based sourcing for PCB assemblies
- Part lifecycle status (Active/EOL/Obsolete) tracking
- Volume pricing tiers for component contracts
- Pricing repository with full-text search across all historical prices

### 8.2 General Manufacturing

**URL:** `/solutions/manufacturing`
**Key Angles:**
- Multi-level BOM management with sub-assemblies
- Quality checks (primary/secondary/production line)
- GR tolerance enforcement
- Incoterms management for import/export
- HSN code tracking for tax compliance
- Project-based procurement with cost center allocation

### 8.3 Automotive & Aerospace

**URL:** `/solutions/automotive-aerospace`
**Key Angles:**
- Supplier qualification via RFI/RFP with scoring
- Contract management with volume pricing tiers
- Multi-stage quality inspection workflows
- Full audit trail and compliance documentation
- Batch tracking with traceability
- Custom fields and templates for industry-specific data capture

---

## 9. Competitive Differentiators

### What Makes Factwise Different

| # | Differentiator | Detail | Competitor Gap |
|---|---|---|---|
| 1 | **Truly End-to-End** | Requisition → RFQ → PO → Invoice → GR → QC → Payment in ONE platform | Most competitors cover 2-3 of these; customers stitch together multiple tools |
| 2 | **Multi-Round Negotiation Engine** | Full bid chain: Opening → Counteroffer → Re-quote, all preserved with audit trail | Competitors typically support single-round or lose negotiation history |
| 3 | **Pricing Intelligence Repository** | Unified, materialized table aggregating 6 sources (contract, quote, RFQ, PO, Digi-Key, Mouser) with full-text search | Competitors have pricing data siloed within individual modules |
| 4 | **Live Distributor Pricing** | Real-time Digi-Key + Mouser API integration with smart caching | Unique for procurement platforms; typically requires separate tools |
| 5 | **BOM-Based Sourcing** | Import multi-level BOMs into sourcing events; BOM-level cost rollups | Most competitors treat items individually; no BOM awareness |
| 6 | **N-Vendor Split Algorithm** | Algorithmic vendor-split recommendations with matching criteria (payment, delivery, custom fields) | Typically manual allocation in competitor tools |
| 7 | **Configurable Everything** | 20+ field types, formula engine, template builder, criteria-based approvals, scoring | Most competitors have rigid forms with limited customization |
| 8 | **Buyer + Seller Portal** | Both sides (buyer and seller) in one platform with role-appropriate views | Most competitors are buyer-only; seller uses email/portal bolt-on |
| 9 | **Multi-Entity Architecture** | One enterprise → multiple buyer/seller entities with independent settings | Many competitors require separate accounts per entity |
| 10 | **Health Monitoring Built-In** | DB diagnostics, N+1 detection, deadlock detection, error rate tracking | Enterprise-grade observability rarely built into the product itself |

### Comparison Page Angles

**vs. SAP Ariba:**
- Faster implementation (SaaS-native vs. on-prem heritage)
- Multi-round negotiation (Ariba has limited counteroffer)
- Live distributor pricing integration
- BOM-based sourcing

**vs. Coupa:**
- Built-in pricing intelligence repository
- N-vendor split algorithm
- Multi-stage quality checks (primary/secondary/production line)
- Real-time chat between buyer and seller

**vs. Jaggaer:**
- Unified platform (Jaggaer is historically fragmented via acquisitions)
- Custom fields and formula engine
- Live Digi-Key/Mouser integration
- Modern API-first architecture

---

## 10. Social Proof & Trust Signals

### What to Collect/Create

| Type | Where to Display | Notes |
|---|---|---|
| **Customer logos** | Homepage trust bar, every page footer | Need 8-15 recognizable logos |
| **Testimonial quotes** | Homepage, solution pages, pricing page | Must reference specific outcomes ("reduced cycle time by X%") |
| **Case studies** | Dedicated hub + featured on homepage | Structure: Challenge → Solution → Results (3 metrics) |
| **Stats** | Homepage stats bar, solution pages | Cost reduction %, cycle time improvement, vendor adoption rate |
| **G2/Capterra badges** | Near pricing, near CTAs | If available — submit for review |
| **Compliance badges** | Enterprise page, footer | SOC 2, ISO 27001, GDPR, DPDP |
| **Uptime/SLA** | Enterprise page | "99.9% uptime SLA" |

### Recommended Metrics to Track and Display

From the codebase, these are quantifiable:
- Number of enterprises on the platform
- Total POs processed
- Total spend managed ($)
- Average RFQ cycle time (requisition → award)
- Vendor response rate (% of invited vendors who bid)
- Invoice exception rate (% auto-matched vs. auto-held)
- Pricing repository entries (total prices tracked)

---

## 11. Technical Architecture (For Enterprise Page)

### Security & Compliance

| Area | Implementation |
|---|---|
| **Authentication** | AWS Cognito (JWT + refresh tokens) + OTP passwordless login |
| **Authorization** | 100+ granular permissions, role-based, entity-scoped |
| **Encryption** | HTTPS in transit; Fernet AES encryption for API credentials at rest |
| **Audit Trail** | django-simple-history on critical models; full change event system |
| **Data Privacy** | DPDP (India) compliance module; field-level reporting |
| **Soft Delete** | All records soft-deleted (never hard-deleted); full data retention |

### Infrastructure

| Component | Technology |
|---|---|
| **Backend** | Django REST Framework on AWS Lambda (Zappa) + ECS |
| **Database** | PostgreSQL 12 with composite indexes, BRIN indexes, GIN full-text search |
| **Task Queue** | Celery with AWS SQS broker; dedicated queues for API and internal tasks |
| **File Storage** | AWS S3 with presigned URLs |
| **Real-Time** | Django Channels WebSocket server for chat and notifications |
| **Email** | AWS SES / Resend for transactional email |
| **Monitoring** | Built-in health monitor with DB diagnostics, memory/CPU tracking, error rate analysis |
| **Scheduling** | Celery Beat for periodic tasks (currency updates, auto-close, reminders, expiry checks) |

### Integration Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Your ERP    │◄───►│  OpenAPI     │◄───►│  Factwise    │
│  (SAP/Oracle │     │  (REST API   │     │  Platform    │
│   /NetSuite) │     │   + API Key) │     │              │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                     ┌──────────────┐              │
                     │  Webhooks    │◄─────────────┤
                     │  (Teams/Slack│              │
                     │   /Zapier)   │              │
                     └──────────────┘              │
                                                   │
                     ┌──────────────┐              │
                     │  Distributor │◄─────────────┘
                     │  APIs        │
                     │  (Digi-Key/  │
                     │   Mouser)    │
                     └──────────────┘
```

### API Coverage

| Module | Operations Available |
|---|---|
| **Purchase Orders** | Create, Bulk Create, Update, Status Change, Terminate |
| **Contracts** | Create, Bulk Create, Update, Bulk Update, Status |
| **Items** | Create, Bulk Create, Update, Bulk Update, Status |
| **Vendors** | Create, Bulk Create, Update, Contacts CRUD, Status |
| **Projects** | Create, Bulk Create |
| **Costing Sheets** | List, ID Mapping |
| **Addresses** | CRUD |
| **Custom Fields** | Read |
| **T&Cs** | CRUD |

---

## 12. CTA Strategy

### Primary CTA: "Request Demo"
- **Placement:** Nav bar (always visible), Hero, After features, After testimonials, Final banner, Footer
- **Form fields:** First Name, Last Name, Work Email, Company Name, Role, Company Size (optional)

### Secondary CTA: "See Platform Overview"
- **Placement:** Hero (alongside primary), Solution pages
- **Action:** Links to `/platform/overview` — the full feature walkthrough page

### Tertiary CTAs (Contextual):
| Page | CTA |
|---|---|
| Solution pages | "See how [module] works" → product walkthrough |
| Pricing page | "Talk to Sales" for Enterprise tier |
| Case studies | "Get similar results" → demo form |
| Developer docs | "Get API Access" → developer signup |
| Integration pages | "See integration guide" → docs |

### Trust Reducers (Below CTAs):
- "No credit card required"
- "Free guided demo"
- "See it in action in 30 minutes"

---

## 13. SEO Content Strategy

### High-Intent Bottom-of-Funnel Pages

| Page Type | Examples | Target Keywords |
|---|---|---|
| **Comparison** | Factwise vs Coupa, vs SAP Ariba, vs Jaggaer | "[competitor] alternative", "[competitor] vs" |
| **Use Case** | Source-to-Pay, Strategic Sourcing, BOM Sourcing | "source to pay software", "procurement platform" |
| **Industry** | Electronics Manufacturing, Automotive Procurement | "[industry] procurement software" |

### Mid-Funnel Content (Blog/Resources)

| Topic Cluster | Article Ideas |
|---|---|
| **RFQ Best Practices** | "How to run a competitive RFQ", "Multi-round bidding strategies", "Proxy bidding: when and how" |
| **Cost Optimization** | "Landed cost modeling explained", "N-vendor split: reducing supply risk", "Pricing intelligence for procurement" |
| **Supplier Management** | "Vendor onboarding checklist", "Supplier qualification with RFI", "Building a supplier scorecard" |
| **PO Management** | "PO approval workflows that scale", "3-way matching: reducing invoice exceptions", "Direct PO vs. event-sourced PO" |
| **Compliance** | "Procurement audit trails", "DPDP compliance in procurement", "SOC 2 for procurement platforms" |
| **ERP Integration** | "Integrating procurement with SAP", "OpenAPI for procurement automation", "Webhook-driven procurement workflows" |

### Glossary Pages (Top-of-Funnel SEO)

Terms from the codebase that are searchable procurement concepts:
- Request for Quotation (RFQ)
- Request for Information (RFI)
- Request for Proposal (RFP)
- Purchase Requisition
- Purchase Order
- Goods Receipt Note (GRN)
- 3-Way Matching
- Incoterms
- Landed Cost
- Bill of Materials (BOM)
- Cost Center
- General Ledger
- Quality Check
- Prepayment Invoice
- Vendor Qualification
- Proxy Bidding
- N-Vendor Split
- Delivery Schedule
- Payment Terms
- HSN Code
- MPN (Manufacturer Part Number)
- CPN (Customer Part Number)

---

## Appendix A: Entity Settings (Feature Switches)

The codebase reveals 50+ per-entity configurable settings. These represent toggleable features per customer:

**RFQ Settings:**
- Show/hide target price to vendors
- Enable price limit enforcement
- Allow vendor-requested items
- Enable proxy bidding
- Auto-create seller bids
- Allow live item addition
- Enable BOM-based sourcing

**PO Settings:**
- Enable PO hold
- Enable PO termination
- Allow direct PO creation
- PO barcode/QR generation
- ERP PO ID field
- Delivery schedule confirmation workflow

**Invoice Settings:**
- Enable invoice auto-hold
- Tier conversion approval
- Invoice redo capability
- Invoice item termination
- Prepayment invoice auto-creation

**GR/QC Settings:**
- GR tolerance percentage
- Allow invoice creation from GR
- QC primary sample percentage
- Generate ARN post-GR
- Allow unverified invoice for QC
- Number of secondary QC rounds

**General Settings:**
- Auto-generate custom codes
- Holiday calendar enforcement
- Multi-currency mode
- Template assignment rules
- Subscription quota enforcement

---

## Appendix B: Workflow State Machines (Complete Reference)

### Requisition
```
DRAFT → APPROVAL_PENDING ⇄ REWORK → REJECTED
     → SUBMITTED → ONGOING → PARTIALLY_FULFILLED → FULFILLED → COMPLETED
     → CLOSED
     → REVISING → REVISED (old version)
```

### RFQ Event
```
DRAFT → APPROVAL_PENDING ⇄ REWORK → REJECTED
     → ONGOING → PAUSED → AWARD_STAGE → PO_ISSUED → PO_ACCEPTED → COMPLETED
     → TERMINATED
     → REVISED (on version)
```

### RFQ Bid
```
DRAFT → ONGOING → REVISED (on re-quote) → INACTIVE → DELETED_DRAFT
```

### Purchase Order
```
DRAFT → APPROVAL_PENDING ⇄ REWORK → REJECTED
     → ISSUED → ONGOING → COMPLETED → TERMINATED
     → DECLINED (seller)
     → RESCINDED (buyer)
     → REVISED (on amendment)
```

### Contract
```
DRAFT → SUBMITTED → REVISING → SUBMITTED (new version)
     → TERMINATED
     → EXPIRED (auto)
     → REVISED (old version)
```

### Invoice
```
DRAFT → ISSUED → ONGOING → COMPLETED
     → RESCINDED → DECLINED → TERMINATED → REVISED
```

### Goods Receipt
```
DRAFT → VALID → REVISED → REJECTED
```

### Quality Check
```
ONGOING → REVISED
ONGOING_DRAFT → REVISED_DRAFT
```

### Approval (Generic)
```
PENDING → EDITING → ISSUED | REWORK | REJECTED | RESOLVED | NOT_REQUIRED
```

---

*Document generated from analysis of the Factwise backend codebase (mainV2 branch). For the frontend feature inventory and UI screenshots, the frontend repository should be analyzed separately.*
