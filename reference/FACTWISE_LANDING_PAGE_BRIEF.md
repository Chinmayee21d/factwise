# Factwise — Landing Page Design Brief

> **For:** Design & Development Team
> **From:** Product Team
> **Date:** March 2026
> **Version:** 1.1

---

## TL;DR — Read This First (1 Minute)

**Factwise** is a B2B procurement SaaS platform. We need a marketing website.

**V1 scope (launch in [TARGET DATE]):**
- Homepage
- 3 platform pages (Sourcing, Purchase Orders, Pricing Intelligence)
- Demo request page
- Pricing page
- Enterprise/Security page

**V2 (4 weeks after launch):** Remaining platform pages, solution pages, 1-2 case studies
**V3 (8 weeks after launch):** Industry pages, blog, comparison pages, glossary

**Visual feel:** Modern enterprise. Think Linear meets Coupa — clean, spacious, professional, not boring. Primarily light backgrounds with 1-2 dark accent sections.

**Primary CTA:** "Request Demo" (enterprise sales-led motion, not self-serve)

**Hero:** Outcome-focused headline (max 8 words) + product screenshot + dual CTA

**The one thing a visitor should remember after 5 seconds:** *Factwise is where enterprises source, procure, receive, and pay — in one platform.*

**Key:** Part B of this document contains the exhaustive, detailed feature specification for the entire platform — every module, every sub-feature, every workflow state, every data field. This is the complete source of truth for what Factwise does.

---

## How to Use This Document

This brief contains everything you need to design and build the Factwise marketing website. It is organized in the order you'll need it:

1. **Part A** — Who we are, who we sell to, what we sound like
2. **Part B** — What our product does (in plain English)
3. **Part C** — Page-by-page content blueprints
4. **Part D** — Visual direction and references
5. **Part E** — Assets, timeline, open questions, and technical requirements

No code, no technical jargon. If anything is unclear, the "Open Questions" section at the end lists decisions we need to make together.

### Copy Status

> **The copy in this document is DIRECTIONAL, not final.** Headlines, subheadlines, and body text are written to communicate intent and content structure. A copywriter should refine them before development. Designers should treat the copy length and tone as representative — the final version will be similar in length and structure, so layouts will not break.

---

# PART A — BRAND & AUDIENCE

---

## A1. What Factwise Is (The Elevator Pitch)

Factwise is a **procurement platform for enterprises**. It helps companies manage the entire lifecycle of buying — from the moment someone requests a purchase, through finding and negotiating with suppliers, placing orders, receiving goods, checking quality, and making payments.

Think of it as: **"Salesforce, but for procurement."** One platform that replaces the patchwork of spreadsheets, emails, ERPs, and point tools that procurement teams currently juggle.

**In one sentence:** Factwise is where enterprises source, procure, receive, and pay — all in one place.

---

## A2. Positioning & Tagline Options

Pick the angle that resonates. We recommend Option 1 or 3.

| # | Tagline | Tone |
|---|---|---|
| 1 | **"Source. Procure. Pay. One platform."** | Clean, confident, modern |
| 2 | **"The complete procurement platform"** | Direct, enterprise |
| 3 | **"Source faster. Buy smarter. Pay on time."** | Action-oriented, energetic |
| 4 | **"Procurement intelligence for every purchase decision"** | Premium, analytical |
| 5 | **"One platform for every procurement workflow"** | Comprehensive, safe |

---

## A3. Brand Personality

| Attribute | We ARE | We are NOT |
|---|---|---|
| **Tone** | Confident, clear, professional | Hype-driven, buzzwordy, vague |
| **Feel** | Modern enterprise — clean and sharp | Old-school enterprise — cluttered and stiff |
| **Complexity** | Simple on the surface, powerful underneath | Intimidating or overwhelming upfront |
| **Comparable vibe** | Linear, Stripe, Figma (modern SaaS) meets Coupa (enterprise credibility) | SAP (heavy), Generic WordPress (cheap) |

**Voice guidelines for copy:**
- Lead with outcomes, not features ("Reduce sourcing time by 60%" not "Multi-round bidding engine")
- Short sentences. No jargon. A procurement manager AND a CFO should both understand every word.
- Use active verbs: Source, Compare, Award, Track, Approve, Pay
- Never say: "leverage", "synergy", "best-in-class", "cutting-edge", "revolutionary"

---

## A4. Target Audience (Who Visits This Site)

### Primary Visitor: Procurement Leader

| | Detail |
|---|---|
| **Title** | VP Procurement, Director of Strategic Sourcing, Category Manager |
| **Company size** | 500–50,000 employees |
| **Industry** | Manufacturing, Electronics, Automotive, Pharma, Retail |
| **Day-to-day** | Running sourcing events, managing vendors, negotiating prices, tracking deliveries |
| **Frustrations** | Too many tools, no single source of truth for pricing, slow RFQ cycles, manual bid comparison, spreadsheet chaos |
| **What they want** | One platform that handles the entire buying process without switching tools |
| **How they evaluate** | Requests a demo, involves IT and Finance, runs a pilot, then enterprise rollout |

### Secondary Visitors

| Persona | What They Care About | What to Show Them |
|---|---|---|
| **CFO / Finance** | Spend visibility, invoice accuracy, payment compliance | Analytics dashboards, 3-way matching, cost center tracking |
| **Operations / Supply Chain** | Delivery reliability, quality, GR/QC process | Delivery schedules, goods receipt, quality check workflows |
| **IT / CTO** | Security, API, integration with existing ERP | Enterprise page, API docs, SSO, audit trails |
| **Seller / Vendor** | Easy to respond to RFQs, submit invoices, manage contracts | Seller portal experience, bid submission, quote builder |

---

## A5. Competitive Landscape

These are the companies our prospects compare us against. Study their websites for context, not to copy.

| Competitor | Website | Their Style | Our Advantage |
|---|---|---|---|
| **Coupa** | coupa.com | Corporate enterprise, blue-heavy, feature-dense pages | We're more modern, more unified (they're acquisitions stitched together) |
| **SAP Ariba** | ariba.sap.com | Heavy enterprise, SAP branding, complex navigation | We're lighter, faster to implement, better UX |
| **Jaggaer** | jaggaer.com | Traditional enterprise, text-heavy | We're end-to-end in one platform (they're fragmented) |
| **GEP** | gep.com | Clean enterprise, good use of white space | We have live distributor pricing and BOM sourcing they don't |
| **Zip** | ziphq.com | Modern, dark mode, startup feel | We go deeper (they focus on intake, we cover full S2P) |
| **Precoro** | precoro.com | Light, friendly SMB feel | We handle enterprise complexity they can't |

**Design takeaway:** We want to sit between the "modern SaaS" feel (Linear, Zip) and "enterprise credibility" (Coupa, GEP). Not too startup-y, not too corporate-heavy.

---

## A6. What We Have Today vs. What's Aspirational

> **This section is critical.** Designers must know what's real so they don't build sections around assets that don't exist. Do NOT put placeholder trust signals on the website — empty social proof is worse than no social proof.

| Asset | Status | Action for V1 |
|---|---|---|
| **Live product** | YES — fully functional, in production | Can capture real screenshots |
| **Paying customers** | [FILL IN: Yes/No. How many?] | If yes, collect logos + permission. If no, omit logo bar and say "Built for enterprise procurement teams" instead of "Trusted by" |
| **Customer testimonials** | [FILL IN: Yes/No] | If no, omit testimonial section from V1. Add after first 2-3 customers agree to be referenced |
| **Case studies with metrics** | [FILL IN: Yes/No] | If no, omit case study section from V1. Plan to write 1-2 within 60 days of launch |
| **SOC 2 Type II certification** | [FILL IN: Yes/No/In progress] | Only display badge if certified. If in progress, say "SOC 2 Type II in progress" |
| **ISO 27001 certification** | [FILL IN: Yes/No/In progress] | Same as above |
| **GDPR compliance** | [FILL IN: Yes/No] | Can claim if data handling follows GDPR principles |
| **DPDP compliance** | YES — module exists in product | Can display |
| **G2 / Capterra reviews** | [FILL IN: Yes/No] | If no, omit review badges. Submit product for review ASAP |
| **Brand guide (logo, colors, fonts)** | [FILL IN: Yes/No] | If no, brand identity design becomes the FIRST milestone before any page design |
| **Product demo video** | [FILL IN: Yes/No] | If no, plan to produce one post-design. Use screenshots for V1 |
| **Mobile app** | [FILL IN: Yes/No] | If no, remove mobile screenshot from screenshot list. Focus on responsive web |
| **Stats for stats bar** (customer count, countries, cost reduction %) | [FILL IN: Yes/No. What numbers?] | If no verified stats, REMOVE the stats bar section entirely. Do not use placeholder numbers |
| **Blog content** | [FILL IN: Yes/No. How many posts?] | If no, omit blog from V1 nav. Launch blog as part of V2 |

**Rule:** If a row says [FILL IN], the product team MUST fill it before the design kickoff. The designer cannot make layout decisions without knowing what content actually exists.

---

## A7. The Seller Side — Do We Market to Vendors?

Factwise has a full **seller-side portal** (vendors use the same platform to respond to RFQs, submit quotes, manage invoices, and maintain their supplier profile). This is a significant differentiator — most competitors are buyer-only.

**Decision required before design:**

| Option | What It Means | Recommendation |
|---|---|---|
| **A. Buyer-only website** | The website speaks only to procurement buyers. Sellers discover the platform when invited by a buyer | Simpler V1. Most procurement SaaS websites do this |
| **B. Buyer + seller section** | Add a "For Suppliers" page explaining the vendor portal experience | Recommended for V2. Shows the two-sided marketplace advantage |
| **C. Separate seller landing page** | A dedicated subdomain or page (e.g., /suppliers) with its own hero, features, and CTA | Recommended for V3. SAP Ariba and Coupa both have this |

**If Option B or C is chosen, the seller page should highlight:**
- Easy bid submission (respond to RFQs in a guided flow)
- Quote calculator (build detailed cost sheets with sections and approvals)
- Invoice submission and payment tracking
- Supplier profile management (certifications, factory photos, product catalogs)
- Real-time chat with buyers
- Contract and PO visibility
- "Get discovered by enterprise buyers" (if marketplace angle applies)

**For V1:** Add "For Suppliers" as a link in the footer and a single page with a brief overview + CTA "Learn more about the Factwise supplier portal." Full seller marketing track in V2/V3.

---

# PART B — PRODUCT FEATURES (PLAIN ENGLISH)

> This section describes what Factwise does. No code. No technical terms.
> Use this as the source of truth for writing copy.

---

## B1. The Big Picture — What Problems We Solve

### The Problem

Enterprise procurement today is broken across 5+ disconnected tools:

| Stage | What Companies Use Today | What Goes Wrong |
|---|---|---|
| **Need something** | Email, chat, spreadsheets | No visibility, no audit trail |
| **Find suppliers** | Emails, phone calls, manual spreadsheets | Weeks to collect comparable quotes |
| **Place orders** | ERP, email, fax | Manual data entry, no version control |
| **Receive goods** | Paper forms, ERP modules | Disconnected from PO, quality is afterthought |
| **Pay invoices** | AP automation tool, ERP | Mismatches caught late, disputes drag on |
| **Analyze spend** | Excel, BI tool | Data lives in silos, reports take days |

### The Solution

Factwise replaces all of that with one connected platform:

```
REQUEST  →  SOURCE  →  ORDER  →  RECEIVE  →  PAY  →  ANALYZE
   |           |          |          |          |         |
   └───────────┴──────────┴──────────┴──────────┴─────────┘
                    One platform. One data model.
                    Every document linked. Full audit trail.
```

---

## B2. Product Modules — Exhaustive Feature Detail

> This section lists EVERY feature in the product, organized by module. Nothing is omitted. An AI model generating website copy or page designs should use this as the complete source of truth for what Factwise can do.

---

### Module 1: REQUISITIONS

**One-liner:** Internal purchase requests with approval routing, department tracking, and fulfillment visibility.

**Complete feature list:**

- **Request creation:** Guided form with items, quantities, measurement units, delivery dates, preferred vendors, and attachments
- **Source types:** Default (manual), Cart (from item cart), Order Request
- **Per-item configuration:** Each line item can have its own quantity, unit, tolerance percentage, payment terms, delivery schedule, preferred vendors, and custom fields
- **Approval workflow:**
  - Multi-level approval routing through organizational hierarchy
  - Approvers auto-determined based on amount, category, department, or vendor using configurable criteria (greater than, less than, equals, contains — combined with AND/OR logic)
  - Approvers can approve, reject, or send back for rework with notes
  - Requester can rescind (cancel) a pending approval and return to draft
  - Escalation: if a senior person has already approved, juniors cannot re-route to an intermediate level
- **Versioning:** Revise a submitted requisition — creates a new version, old version marked as revised; full version chain preserved
- **Status lifecycle:** Draft → Approval Pending → Rework → Rejected → Submitted → Ongoing → Partially Fulfilled → Fulfilled → Completed → Closed → Revised
- **Access control:** Default (all entity users can view) or Restricted (only named users)
- **Fulfillment tracking per item:** Tracks how much of each requested quantity has been: ordered via PO, delivered, accepted, paid — updated automatically as downstream documents progress
- **Financial fields:** Payment type (per invoice item or per deliverable), payment terms (net days), prepayment percentage, deliverables payment terms (milestone-based percentage allocations)
- **Logistics fields:** Incoterm, lead time, lead time period, GR tolerance
- **Organizational fields:** Cost centre, general ledger, project, shipping address, department
- **Vendor assignment:** Preferred seller entities and specific seller contacts per item
- **Custom fields:** Template-driven custom sections and fields on both the requisition header and each item, with negotiation mode
- **Questions:** Per-item vendor questionnaire support
- **Event assigned users:** Assign specific users to a requisition
- **Clone:** Full deep clone of a requisition
- **Permissions:** Per-user VIEW/EDIT permissions on each requisition
- **Group by item:** View all requisitions grouped by enterprise item to see total demand
- **Downstream links:** See which RFQs and POs have been created from each requisition item
- **Bulk operations:** List, create, update, delete, clone, state change
- **Export:** Requisition data exportable

---

### Module 2: STRATEGIC SOURCING (RFQ / RFI / RFP)

**One-liner:** Competitive sourcing events where buyers invite vendors, collect bids, negotiate in multiple rounds, compare landed costs, and award business — with full negotiation history.

**Complete feature list:**

**2A. RFQ Events (Request for Quotation)**

- **Event creation:**
  - Event name, custom sequential ID, entity, template
  - Start and end datetime with automatic closure on deadline
  - Billing and shipping address
  - Base currency with multi-currency conversion rates (standard or custom exchange rates per vendor)
  - Event-level additional costs, taxes, and discounts
  - GR tolerance, prepayment percentage
  - Payment type (per invoice item or per deliverable), payment terms, deliverables payment terms
  - Incoterms, lead time, lead time period
  - Project, cost centre, general ledger, customer entity assignments
  - Access control: Default or Restricted (named users only)
  - Terms and conditions, additional information
  - Custom fields and custom sections (template-driven)
  - Linked RFQ events for vendor-specific parallel negotiation tracks

- **Event lifecycle (15+ states):** Draft → Approval Pending → Rework → Rejected → Ongoing → Paused → Award Stage → Purchase Order Issued → Purchase Order Accepted → Completed → Terminated → Revised

- **RFQ Items (per line item in the event):**
  - Linked to enterprise item master (with item code, ERP code, CPN, MPN, HSN code)
  - Buyer item info: name, description, custom tags, custom item name
  - Quantity with tolerance percentage and max awardable quantity
  - Desired/target price (configurable whether visible to vendors)
  - Per-item currency (can differ from event currency)
  - Per-item payment terms, incoterms, lead time (can override event defaults)
  - Per-item delivery schedule (multiple delivery dates and quantities)
  - Per-item additional costs, taxes, and discounts
  - Per-item custom fields and custom sections
  - Per-item questions for vendors
  - Per-item project, cost centre, GL, requisition linkage
  - Item attributes (buyer-defined specifications)
  - Global marketplace flag
  - Attachments per item
  - Fulfillment tracking: awarded quantity, PO pending quantity, PO issued quantity, PO accepted quantity, PO count, average rate, total amount
  - Confidential pricing flag

- **Vendor assignment per item:**
  - Selective invitation: assign specific vendors to specific items (not every vendor sees every item)
  - Vendor contacts: named individuals within vendor companies, auto-granted VIEW permissions
  - Vendor states: Invitation Pending → Bid Pending → Bid Submitted → Bid Received → PO Pending → PO Received → PO Reviewed → Deal Won / Deal Lost; also: Invitation Rejected, Invitation Lapsed, Deadline Passed, Invitation Requested

- **Bid types (3 types):**
  - QUOTE — vendor's own submitted quote
  - PROXY QUOTE — buyer enters a quote on behalf of a vendor (sealed/offline scenarios), with configurable future submission time
  - COUNTEROFFER — buyer-initiated counteroffer to negotiate

- **Bid response types:**
  - Opening Bid — first/initial quote from vendor
  - Accepted — vendor accepts buyer's terms
  - Renegotiating — negotiation in progress

- **Multi-round negotiation:**
  - Each new submission creates a new bid record linked via parent-child chain
  - Previous bids marked as Revised or Inactive — full history preserved forever
  - Complete negotiation timeline retrievable: Opening Bid → Counteroffer → Re-quote → Counteroffer → Final Quote
  - Bid history export to Excel with every round, every cost, every custom field, every delivery schedule

- **Per-bid-item data captured:**
  - Price per unit, currency, quantity, measurement unit
  - Seller-defined delivery schedule (dates and quantities)
  - Buyer-allocated delivery schedule (separate from seller's)
  - Incoterms (per bid item, can differ from event)
  - Lead time, payment type, payment terms, prepayment %, deliverables payment terms
  - Per-item additional costs, taxes, discounts
  - Landed costs totals (landed item additional costs total, landed total price)
  - Internal vendor quote reference ID
  - Notes, questions/answers
  - Shortlisted flag, allocated quantity
  - Custom fields in negotiate mode
  - Attachments
  - Item response type: Accepted, Renegotiating, Removed, Requested, Excluded, Added, Not Invited

- **Bid pricing calculations:**
  - Items subtotal, taxes total, additional costs total, discount total, items total
  - Vendor-side equivalents (dual-view for buyer and seller)
  - Landed items additional costs total, landed items total, landed bid total
  - Bulk discount percentage and minimum order value
  - Effective rate computation considering discounts
  - BOM-level cost rollups

- **N-Vendor Split Recommendation (algorithmic):**
  - Two modes: per-item recommendation or per-event (consistent vendor set across all items)
  - Also supports BOM-level N-vendor recommendation
  - Split types: Backup (one primary, others as backup) or Split (quantity split by percentage)
  - Rate types: Effective rate (after discounts), Base rate (before discounts), or Landed rate (including landed costs)
  - Matching criteria filters: vendors must match on prepayment terms, payment terms, lead time, delivery schedule, incoterms, and custom fields (configurable as Match/Mismatch/None)
  - Configurable percentage allocation per vendor

- **Vendor shortlisting and allocation:**
  - Toggle shortlist on individual bid items
  - Allocate specific quantities to specific vendor-item combinations (partial awards)
  - Auto-allocation of buyer delivery schedule to seller delivery schedule
  - Reset all allocations

- **Auto-reminders:**
  - Configurable initial reminder hours, reminder interval, and maximum number of reminders per event
  - Scheduled Celery task runs twice daily (05:30 and 17:30 UTC)
  - Manual remind individual vendors
  - Track latest reminder details per vendor

- **Event versioning/revision:**
  - While paused, create a new version of the RFQ event
  - All prior bids automatically migrated to the new version via bid migration service
  - Old version marked as Revised; new version inherits all items, sellers, settings

- **Clone:** Full deep clone including items, sellers, currency conversions, custom fields, attachments, BOMs

- **Approval workflow:** Same criteria-based multi-level approval as requisitions (pricing thresholds, vendor preference, item type, customer entity conditions)

- **Import flows:**
  - Import from requisition items (combine requisition items into RFQ items)
  - Import from project items and BOMs
  - Import from cart
  - Import from prior PO (load standard terms)
  - Bulk RFQ item import via spreadsheet

- **BOM-based sourcing:**
  - Import multi-level BOMs into an RFQ event
  - Sub-BOMs and BOM hierarchies tracked within the event
  - BOM-level cost totals computed separately from item-level totals
  - BOM cloning when versioning or cloning an RFQ

- **Analytics and reporting:**
  - Unique vendors with bids count
  - Average bids per item
  - Average vendor response time
  - Side-by-side latest quotes by all vendors
  - Comprehensive event dashboard across all RFQ events for an enterprise (optimized for 10K+ rows)
  - Compare two RFQ items on commercial terms
  - Event-level total with all cost breakdowns (buyer-view and vendor-view)
  - Full CSV export of comprehensive event dashboard

- **Landed cost modeling (analytics layer):**
  - Buyer adds additional costs (insurance, BCD, freight, SWS, etc.) on TOP of vendor bids
  - These analytics costs are separate from bid-level costs — they're the buyer's own cost analysis
  - Automatically applied across all bids for true total cost comparison
  - Three cost types: Additional Cost, Tax, Discount
  - Allocation types: per unit, total, percentage of subtotal
  - Recalculated across all bids when updated

- **Permissions:**
  - Event-level: VIEW, EDIT, APPROVE
  - Default (all entity users) or Restricted (named users only)
  - Hierarchy-aware: all managers up the org tree automatically get permissions
  - Full permission change history

- **Subscription quota enforcement:** Event creation and cloning consume quota; quota decremented on rollback

- **Export:** 6+ export types — RFQ list (buyer/seller), RFQ items (buyer/seller), bid items (buyer/seller), bid history (with vendor filtering), BOM items, comprehensive dashboard CSV

**2B. RFI Events (Request for Information)**

- Supplier pre-qualification questionnaire events
- Structured sections: Overview, Scope, Questionnaire — each with reusable templates
- Lifecycle: Draft → Approval Pending → Rework → Rejected → Ongoing → Terminated → Completed
- Vendor invitation with accept/reject/lapse flow
- Vendor responses with Draft/Completed states
- Linkable to a downstream RFP event

**2C. RFP Events (Request for Proposal)**

- Full proposal management with timeline and milestones
- Structured sections: Overview, Scope, Questions (Vendor Overview, Product Questionnaire)
- Configurable timeline with next-event tracking and deadlines
- Scoring deadlines for evaluation phase
- Lifecycle: Draft → Approval Pending → Rework → Rejected → Ongoing → Paused → Completed → Terminated
- Can reference a prior RFI event
- Multi-level permission roles: buyer event, buyer approval, buyer draft creation, buyer draft admin, buyer live admin, buyer live management, seller

---

### Module 3: PURCHASE ORDERS

**One-liner:** Full PO lifecycle from creation through approval, issuance, vendor acceptance, delivery tracking, revision, hold, and termination — with barcode/QR generation and ERP sync.

**Complete feature list:**

- **PO types (4):**
  - Final — standard event-sourced PO (from RFQ award)
  - PO Group — consolidated/grouped PO from batch operations
  - Staging — staging/draft for group POs
  - Direct PO — created directly without an RFQ event

- **PO lifecycle (12+ states):** Draft → Approval Pending → Rework → Rejected → Issued → Ongoing → Declined → Rescinded → Completed → Terminated → Revised → Deleted
- **Internal status:** Delivery Pending, Delivery Completed

- **PO header fields:**
  - Custom PO ID (auto-generated sequential), ERP PO ID
  - Buyer and seller enterprise/entity information (snapshot at creation time)
  - Buyer and seller contact lists
  - Billing and shipping addresses
  - Pricing information: total, subtotal, shipping, taxes, discounts, currency
  - Payment type (per invoice item or per deliverable), payment terms, deliverables payment terms, prepayment percentage
  - GR tolerance, lead time, lead time period, incoterm
  - Cost centre, project, general ledger
  - Requisition information, requisition department
  - Terms and conditions, additional information, custom fields
  - Final buyer approver
  - Submission datetime, acceptance datetime
  - Barcode and QR code (auto-generated, stored as S3 attachments)

- **PO items (per line):**
  - Item information (linked to item master), fulfillment information, quantity information, pricing information
  - Attribute information, property information
  - Per-item payment type, payment terms, deliverables payment terms, prepayment percentage
  - Procurement information (lead time)
  - Internal status: Delivery Pending / Delivery Completed
  - Linked items: for split-award scenarios — one parent PO item with multiple linked items for different cost centers/projects/delivery destinations
  - Alternate item handling (alternate exists, alternate shown flags)
  - Custom fields, custom fields negotiate
  - Delivery schedule items (multiple dates, quantities, with cost centre/GL/project per delivery line)
  - Additional costs, taxes, discounts per item

- **PO creation paths:**
  - From RFQ award stage: auto-create PO items per vendor per awarded item, attach delivery schedules
  - Direct PO: create from scratch, Draft → Approval → Issue
  - PO Group: bulk PO creation from file upload (CSV/Excel parsing)

- **Approval workflow:**
  - Same criteria-based multi-level approval as requisitions
  - Bulk state change: approve multiple POs in one request
  - Approval creates Approval records, updates PO notes

- **Issuance side effects (when PO moves to Issued):**
  - Increments RFQ item issued quantity, decrements awarded quantity
  - Updates event status
  - Updates delivery schedule fulfillment
  - Auto-creates prepayment invoice (via invoice service)

- **Vendor acceptance (when seller accepts → Ongoing):**
  - Increments accepted quantity
  - Auto-accepts delivery schedules
  - Creates prepayment invoice

- **Vendor decline / buyer rescind:** Decrements quantities, reverts event status to Award Stage

- **Hold and termination:**
  - Hold: manual or automatic (from invoice mismatches)
  - Termination workflow: Buyer requests → Seller accepts → PO Terminated (buyer can revoke before seller accepts)
  - On termination: PO group item status updated, PO group status re-evaluated
  - Open invoice items auto-hold on termination

- **Revision/amendment:**
  - Clones the PO and all items, increments version number
  - Old PO marked as Revised
  - All versions linked via base_purchase_order_id chain
  - Past versions queryable

- **Delivery schedules on POs:**
  - Per-delivery-date line items with quantity, date, GL, cost centre, project, customer entity
  - Buyer/seller confirmation flow: Buyer Confirmation Pending → Seller Confirmation Pending → Confirmed / Rejected
  - Fulfillment tracking per delivery line: PO quantity, RFQ quantity, delivered quantity
  - Delivery schedule items linked to requisition items for upstream fulfillment tracking

- **Barcode and QR code:** Auto-generated for each PO, stored as S3 attachments

- **Comments:** Threaded comments on POs

- **Export:** PO export to Excel, PO Group export

---

### Module 4: CONTRACT MANAGEMENT

**One-liner:** Manage vendor contracts with volume pricing tiers, revision workflows, auto-expiry, and pricing repository sync.

**Complete feature list:**

- **Contract header:**
  - Contract name, custom contract ID, ERP contract ID
  - Version number with parent-contract chain for revision tracking
  - Start date and end date (validity period)
  - Buyer and seller entity, address, and identification snapshots
  - Payment type, payment terms, deliverables payment terms, prepayment percentage
  - Lead time, lead time period, incoterm
  - Additional details, project information, terms and conditions
  - Status notes (revision/termination reason)
  - Custom fields, custom fields negotiate
  - Template-driven sections

- **Contract lifecycle:** Draft → Submitted → Revising → Submitted (new version) → Terminated → Expired (auto) → Renewed → Revised (old version) → Paused (during revision)

- **Contract items (per line):**
  - Linked to enterprise item master
  - Rate, pricing information (full cost breakdown)
  - Quantity (contracted volume), measurement unit, currency
  - Buyer SKUs for the item
  - Attribute information, procurement information
  - Per-item: payment type, payment terms, deliverables payment terms, prepayment percentage, incoterm
  - Additional costs, taxes, discounts
  - Custom fields, custom fields negotiate
  - Clone individual items

- **Volume pricing tiers:**
  - Multiple tiers per contract item
  - Each tier: min quantity, max quantity, rate, effective rate
  - System determines which tier applies based on order quantity

- **Revision workflow:**
  - From Submitted → Revising (pauses the contract)
  - Clones the contract, increments version
  - From Revising → Submitted (new version goes live, old marked Revised)
  - Full version chain preserved

- **Auto-expiry:** Scheduled daily task checks for contracts past end date and marks them Expired

- **Seller access management:** Control which sellers can see which contract items

- **Pricing repository sync:** Contract prices (including tier pricing) automatically sync to the unified pricing intelligence database

- **Operations:** List, create, update, delete, clone, state change, check name existence, list by entity, list by entity + item

---

### Module 5: INVOICING & PAYMENTS

**One-liner:** Invoice processing with automatic 3-way matching (7 exception types), batch tracking, prepayment automation, credit management, and overdue alerts.

**Complete feature list:**

**5A. Invoices**

- **Invoice types (6):**
  - Seller Goods Invoice — main seller invoice for goods shipped
  - Seller Proforma Invoice
  - Buyer GR Invoice — buyer-side goods receipt invoice
  - Buyer QC Invoice — buyer-side quality check invoice
  - Prepayment Invoice — buyer-created, auto-generated when seller accepts PO
  - Seller Prepayment Invoice — seller submits prepayment claim

- **Invoice lifecycle:** Draft → Issued → Ongoing → Goods Received → Completed → Rescinded → Declined → Terminated → Revised → Deleted

- **Verification status:** Unverified / Verified

- **Automatic 3-way matching (7 exception types):**
  1. Price mismatch (invoice price vs PO price)
  2. Shipping per-unit mismatch
  3. Taxes mismatch
  4. Payment terms mismatch
  5. Discount mismatch
  6. PO on hold
  7. PO terminated
  - When any mismatch detected: invoice auto-held (AUTO hold)
  - Buyer can also manually hold (MANUAL hold)

- **Tier conversion:** Buyer and seller approval tiers for resolving held invoices. Approver information captured.

- **Invoice items (per line):**
  - Linked to PO item
  - Item types: Standard Item, Prepayment Item, Seller Prepayment Item
  - Status: Not Applicable, Goods Pending, Goods Received, Terminated, Completed, Revised
  - Payment status: Not Applicable, Payment Pending, Payment Complete
  - Quantity information, pricing information, fulfillment information
  - Payment type, payment terms, deliverables payment terms
  - Hold information, termination information
  - Reference date, payment due date, payment completed datetime
  - Payment information breakdown (computed, pending, completed)
  - Custom fields, checklist, notes

- **Invoice item termination:**
  - Buyer requests termination → Seller accepts → Item terminated
  - Buyer can revoke before seller accepts
  - On acceptance: PO item on-hold quantity incremented

- **Invoice item batches (per shipment):**
  - Custom batch ID, alternate batch name, batch expiry date
  - Quantity information, fulfillment information
  - Status: Batch Ongoing, Batch Revised, Batch On Hold, Batch Terminated
  - Hold and termination information
  - Per-batch goods receipt and quality check records linked

- **Prepayment flow:**
  - On seller accept of PO: prepayment invoice auto-created for buyer
  - Seller submits separate prepayment invoice to claim prepayment
  - Processed against prepayment credit

- **Invoice redo:** Re-issue a revised invoice (creates new version)
- **Invoice history:** Full audit trail
- **Overdue tracking:** Scheduled weekly alert task for overdue payments

**5B. Payments**

- **Payment types:** Goods Payment, Pre-Payment
- **Transaction types:** Online, Offline, Balance Only
- **Payment creation:** Against specific invoice items with amount and currency
- **Payment items:** Per-invoice-item payment records with amount, item info, attribute info
- **Payment terms architecture:**
  - Per Invoice Item (standard net-terms) or Per Deliverable (milestone-based)
  - Applied-from types: Receipt Date, Dispatch Date, or Invoice Date
- **Views:** Pending payments (by items, by invoices, default view), payment list, payment detail

**5C. Credits**

- **Credit types (5):**
  1. Pre-Payment — unused prepayment balance
  2. QC Rejections — credit for quality-check-rejected quantity
  3. GR Rejections — credit for goods-receipt-rejected quantity
  4. Credit on Invoice Redo — credit when invoice is revised
  5. Invoice Item Termination — credit for terminated invoice item
- **Credit lifecycle:** Available → Expended → Invalid
- **Credit consumption:** Credits linked to payments via PaymentCreditItem for netting against future payments

---

### Module 6: GOODS RECEIPT & QUALITY CHECK

**One-liner:** Record goods receipt with tolerance enforcement, run multi-stage quality inspections (primary, secondary, production line), and auto-generate credits for rejections.

**Complete feature list:**

**6A. Goods Receipt (GRN)**

- **GR types (3):** Goods Receipt (final), Goods Receipt Draft (in-progress), Goods Receipt Provisional (before full inspection)
- **GR states:** Valid, Revised, Rejected
- **Fields:**
  - Custom GR ID
  - Linked to: invoice item batch, invoice item, invoice, PO, PO item, event
  - Quantity information: accepted quantity and units
  - Notes, checklist (configurable), custom fields (enterprise-specific)
  - Revision information (for GR revisions)
- **Features:**
  - GR tolerance enforcement: configurable acceptable variance per entity (e.g., accept up to 5% over-delivery)
  - Provisional GR creation (before full inspection)
  - Quantity tracking: delivered, on-hold, over-delivered
  - Tier-2 GR: secondary goods receipt for multi-tier shipments
  - Add items to existing Tier-2 GR
  - GR redo (create revised GR)
  - Full GR history
  - Allow invoice creation directly from GR (configurable per entity)
  - Custom fields via templates
  - Notifications to buyer and seller on GR creation

**6B. Quality Check (QC)**

- **QC types (3):** Primary, Secondary, Production Line
- **QC states:** Ongoing, Revised, Ongoing Draft, Revised Draft
- **Payment toggle per QC:** Payment Active (rejection affects payment) / Payment Inactive (rejection does NOT affect payment)
- **Fields:**
  - Custom QC ID, serial ID
  - Linked to: invoice item batch, invoice item, invoice
  - Accepted quantity, rejected quantity (with units)
  - Additional information (PO info + invoice info)
  - Checklist (configurable pass/fail criteria)
  - Custom fields
  - Revision information
  - Attachments
- **Features:**
  - Multiple secondary rounds configurable
  - Sample percentage configurable (e.g., inspect 10% of batch)
  - Generate ARN (Acceptance/Rejection Notice) post-GR
  - Allow unverified invoice for QC (configurable)
  - Draft mode for work-in-progress QC
  - QC redo (create revised QC)
  - Tier-2 QC for multi-tier shipments
  - QC rejections auto-generate credits (type: QC Rejections)
  - Notifications to buyer and seller on QC creation
  - Pending list by batch, pending list by invoice
  - Completed QC grouped by batch

---

### Module 7: SUPPLIER MANAGEMENT

**One-liner:** Full supplier lifecycle — vendor master, onboarding, KYC verification, profiles with factory photos and certifications, performance ratings, evaluation forms, and visit tracking.

**Complete feature list:**

**7A. Vendor Master**

- **Enterprise vendor master:** Enterprise-level vendor directory with vendor code, ERP vendor code, tags, notes, custom fields, status (Active, Inactive, Invited, Pending)
- **Entity vendor master:** Per-entity vendor relationships with preference tiers: Preferred, Blocked, Standard
- **Vendor contacts:** Primary and secondary contacts with designation, email, phone; buyer entity linkages; virtual user session swapping for vendor portal access
- **Vendor invitations:** Enterprise-level and contact-level invite flows; auto-approval for matching email domains
- **Vendor identification/KYC:** Legal ID storage (PAN, GST, Others) with verification states: Unverified, Pending, Rejected, Verified
- **Entity verification:** Entity-level verification status with document upload
- **Buyer-seller relationship tracking:** Explicit relationship object linking buyer and seller enterprises/entities
- **Bulk import:** Vendor bulk import via spreadsheet with cell-level validation, error reporting, and async processing

**7B. Supplier Profiles (SRM)**

- **Certificates:** Quality and compliance document management
- **Product competency tags:** With buyer endorsements
- **Factory locations:** Addresses with geo-coordinates (lat/lon) and factory photos
- **Item catalogue:** Vendor-specific item listing with pricing, attributes, and tags
- **Item catalogue reviews:** Star ratings (1-5) with descriptions from buyers
- **Vendor profile notes:** Buyer-written notes per vendor
- **Seller reviews:** Star ratings with description

**7C. Supplier Qualification**

- **RFI events:** Structured questionnaires (see Module 2B)
- **RFP events:** Proposal management with scoring (see Module 2C)
- **Evaluation forms:**
  - Multi-page forms with scoring
  - Per-page: approval type, passing score, maximum score
  - Seller-specific access control
  - Form lifecycle with validity dates

**7D. Visit Management**

- **Visit records:** Seller visits to customer with date, template, customer entity, address, contacts, notes, status
- **Custom fields per template**
- **Attachments**

---

### Module 8: PRICING INTELLIGENCE

**One-liner:** Unified pricing database aggregating 6 sources (contracts, quotes, RFQ bids, POs, Digi-Key, Mouser) with full-text search, sub-millisecond queries, and configurable sync.

**Complete feature list:**

- **Six price sources:**
  1. Contract pricing (with volume tier breakdowns)
  2. Quote/Costing Sheet pricing
  3. RFQ bid item pricing
  4. Purchase order pricing
  5. Digi-Key distributor pricing (live API)
  6. Mouser distributor pricing (live API)

- **Per-entry data stored:**
  - Pricing ID (MPN, CPN, ERP code, HSN code, item code)
  - Rate, effective rate, quoted rate (with admin currency conversions)
  - Volume price breaks
  - Item identifiers: MPN, CPN, ERP code, HSN code, SAP ID, manufacturer
  - Supplier and customer entity data
  - Source reference IDs (agreement, event, PO, quote)
  - Status with display labels
  - Fulfillment data: quantity delivered, invoiced, on hold, discarded
  - Lead time and delivery schedule
  - Payment terms and incoterm
  - Additional costs breakdown + landed costs breakdown
  - Part lifecycle status: Active, End of Life, Obsolete
  - Notes
  - Pricing team: SST, QuoteCell, External

- **Search:** Full-text search via PostgreSQL GIN index across all text fields (part number, description, manufacturer, supplier name)
- **Performance:** Composite indexes, BRIN indexes (time-series), partial indexes, covering indexes — sub-millisecond query time
- **Pre-computed stats:** Enterprise-level stats (total counts, average/min/max rate, unique items, unique suppliers)

- **Sync architecture:**
  - Single-item sync: triggered by signals when a PO, bid, quote, or contract is created/updated (2 retries)
  - Full sync: per-enterprise, full or incremental (since last successful sync), per-source or all sources
  - All-enterprises sync: fans out to per-enterprise tasks
  - Scheduled sync: runs every 5 minutes, checks enterprise sync config, triggers at configured time/timezone
  - Sync modes (configurable per enterprise): Real-time, Daily Batch, Manual Only
  - Sync audit trail: full log of every sync operation (source, type, status, record count)

- **Distributor integrations:**
  - Digi-Key: batch MPN pricing lookup (50 MPNs per batch), 500ms rate limiting, 3-hour task limit for 5000+ MPNs, per-entity encrypted API credentials
  - Mouser: same architecture
  - Smart pricing cache: returns cached prices instantly, starts background job for uncached MPNs, returns estimated duration
  - Job status polling for frontend

- **Export:** Full pricing repository export to Excel

---

### Module 9: ANALYTICS & DASHBOARDS

**One-liner:** Denormalized analytics joining the entire procurement chain (requisition → RFQ → bid → PO → invoice → GR → QC → payment) with configurable dashboards, grouping, aggregation, and export.

**Complete feature list:**

- **Analytics table (denormalized):** Single table joining data from: event, RFQ event, RFQ event item, PO, PO item, invoice, invoice item, batch (up to 3), goods receipt (per batch), quality checks (up to 3 per batch), payment (up to 2), payment items
- **Updated via:** Celery task triggered by change events throughout the system
- **Analytics explorer:**
  - Paginated, filtered, sorted analytics queries
  - Dynamic filter engine with comparison types: Greater Than, Less Than, In, Not In, Equals, Contains, Starts With, Ends With, Overlap, Between, Is Null
  - Multi-field sorting
  - Grouping types: buyer entity, seller entity, year, week, month, quarter, item, approver
  - Aggregations: sum, count, avg, min, max, array_agg
  - Currency conversion in results

- **Configurable dashboards:**
  - 15+ pre-built dashboard views across all modules (events, RFQ, bids, PO, PO Group, invoice, contract, costing sheet, QC, GR, payment, project, requisition)
  - Per-dashboard: tab configuration with item counts
  - Filter types: Built-in and Custom field filters
  - Search, sort, pagination
  - gzip-compressed API responses for performance

- **Quote analytics (seller-side):**
  - Header summary (total value, margins)
  - Cost view per item (breakdown by cost type)
  - BOM detail with overall additional costs view
  - Project delta comparison (comparing quotes across project revisions)

- **Custom metrics:** Enterprise-level named KPI formulas with CRUD

- **Metrics data:** Specialized PO-centric metrics per item per date — tracking PO status, creator, approver, value, base value, savings amount, target amount, lead time, prepayment, shipping rate

- **Export:** Analytics to CSV, comprehensive event dashboard to CSV (optimized for 10K+ rows), all major modules to Excel (25+ export types)

---

### Module 10: QUOTE CALCULATOR (Seller-Side Costing)

**One-liner:** Sellers build detailed multi-section cost sheets for customer inquiries, with approval workflows, version history, BOM integration, and customer portal.

**Complete feature list:**

- **Costing sheet header:**
  - Multiple sections with user assignments
  - Currency with multi-currency conversion management
  - Customer and seller entity context
  - Approval tree (multi-level approvers with final approver)
  - Template-driven

- **Costing sheet items (per line):**
  - Rate, MOQ (minimum order quantity), SPQ (standard pack quantity)
  - Quoted MPN, manufacturer, part status, validity period
  - Additional costs, taxes, discounts with formula support
  - Notes (internal and customer-facing)
  - Custom fields and sections

- **Features:**
  - Full approval workflow with multi-level approvers and final approver
  - Versioned history with full revert capability
  - Customer portal: buyer can view seller's quote
  - BOM-based quotes
  - Section-level user assignments and permissions
  - Clone, export to RFQ, import from project
  - Status machine with permissions at each stage
  - Approval tree visualization
  - Currency conversion management (multiple currencies per sheet, live rate updates)

- **Lifecycle:** Draft → Active → Approved → Sent to Customer → Closed

---

### Module 11: PLATFORM CAPABILITIES (Cross-Cutting)

**One-liner:** Enterprise-grade platform layer — multi-entity org, approval engine, custom fields, permissions, multi-currency, chat, notifications, documents, audit trail.

**Complete feature list:**

**11A. Organization & Multi-Entity**
- Enterprise: top-level tenant with logo, billing currency, module ID prefixes/counters, contacts, domain
- Entity: sub-company within enterprise; independent buyer and seller status; can be virtual entity
- One enterprise → many entities, each independently configured
- Entity settings: 50+ toggle/value settings per entity per module (RFQ, PO, Invoice, GR, QC, Payment, Project, Integrations)
- Enterprise settings: auto-generate item custom codes, etc.
- Department hierarchy per entity
- Holiday calendar: entity-specific holidays by day-of-week or specific date

**11B. User Management & Authentication**
- AWS Cognito integration: create, login, refresh, logout, global logout, password change/reset
- OTP/passwordless login: rate limited (max 3 attempts per 24 hours, 10-min expiry)
- Email/password login with multi-account discovery
- Self sign-up, admin-invited sign-up, vendor contact invite sign-up, enterprise invite sign-up
- User roles: Admin, Admin View, User
- Permission roles: Procurement Executive, Procurement Manager, Sales, Goods Receipt, Quality Check Analyst, Accounts Payable Executive, Analyst
- 100+ granular permissions covering every module (event view/edit/approve/export, PO view/edit/approve, invoice view/edit/verification, quote, contract, project, form, KPIs, pricing repository, etc.)
- User approval tree: parent-child reporting chains per module (Requisition, RFQ, Costing Sheet, PO)
- Per-user notification preferences (email/in-app) for every workflow event
- User status: Active, Invited, Inactive, Requested

**11C. Approval Engine**
- Generic multi-level approval applicable to: Purchase Orders, RFQ Events, RFI Events, Requisitions, PO Groups, Quote Calculator
- Approval states: Pending → Editing → Issued / Rework / Rejected / Resolved / Deleted / Not Required
- Requestor and approver with notes
- Criteria-based routing: walks UP the UserTree hierarchy, evaluates conditions (AND/OR trees) for Pricing, Items, Vendors, Buyers
- Escalation: if criteria don't match at one level, auto-escalates to next level up
- Full audit trail via django-simple-history

**11D. Custom Fields & Templates**
- Custom sections and fields attachable to 30+ object types: Items, Vendors, Buyers, BOMs, Projects, Requisitions, RFQ Events/Bids/Items, PO Groups, POs/Items, Contracts/Items, Costing Sheets/Items, Documents, Forms, Pages, Visits, Carts
- 20+ field types: Short Text, Long Text, Float, Integer, Percentage, DateTime, Date, Choice (Radio/Checkbox/Dropdown/Multi-Select), Boolean, Location, Currency, Period, Email, Attachment (single/multi), Template, Logo, Banner, Link, Collection
- Field properties: required, visible, negotiable, mandatory, locked
- Scoring system: obtained score, passing score, max score, weightage per field and section
- Rejectable sections: sections can be accepted/rejected with reason
- Custom field snapshots: import values from source with optional sync
- Formula engine: custom formulas with operands (number, field, formula), operators (add, subtract, multiply, divide, power), and field references

- Module templates: reusable templates defining form structure for every module type (RFQ, PO Group, Invoice Batch, GR, QC, Requisition, Contract, Quote, SRM, Item Cart, Visit, Project, Cost Centre, GL, Item, BOM, Vendor, Buyer)
- Template sections with sequence, permissions (VIEW/EDIT/ASSIGN)
- Field inclusion types: Disabled, Optional, Mandatory
- Global templates visible across enterprises
- Action rules: configurable rules engine with conditions and outputs (auto-assign template based on criteria)
- Assignment rules: auto-assign users/roles to items based on conditions

**11E. Item Master Data**
- Enterprise item master: custom code, ERP code, CPN (Customer Part Number), MPN (Manufacturer Part Number), HSN code
- Item types: Raw Material, Finished Good, Semi-Finished Good, Packaging Material
- Measurement units (multiple per item), typed attributes (Text, Whole Number, Integer, Decimal, Coded Options, Boolean), custom IDs, tags
- Preferred vendor tracking: Assigned, Partial, Unassigned
- Global item catalog: Factwise-maintained global item library with synonyms for search
- Entity item: per-entity item configuration on top of enterprise item
- Buyer custom unit conversions: item+vendor-specific unit conversion multipliers

**11F. Bill of Materials (BOM)**
- Multi-level BOM: BOM code, name, version management
- BOM states: Draft, Ongoing, Revised, Deprecated
- BOM items with sub-BOMs, alternate items, parent-child hierarchy
- Quantity, measurement unit, currency, total cost per BOM item
- Location tagging, subcontract flag
- Module linkages: BOM linked to RFQ, Project, Costing Sheet
- BOM bulk import and export

**11G. Financial Master Data**
- Cost centres: per-entity, with validity ranges, user assignments, linked general ledgers
- General ledger accounts: codes, account types, entity assignments, cost centre linkages
- Taxes: tax master with geographic scoping (country/state/city/pincode), validity ranges, item and entity linkages
- Currency: all ISO currencies with conversion rates (standard, custom enterprise overrides, entity-level variants); auto-updated every 2 days
- Incoterms: full ICC library (sea transport + all modes) with descriptions
- Code sequences: configurable auto-incrementing ID sequences per module per enterprise (e.g., RFQ-001, PO-001)

**11H. Multi-Currency**
- Base conversion rates from USD, EUR, INR, JPY
- Conversion types: Standard, Global Standard, Global Custom, Variant Standard, Variant Custom
- Per-event, per-seller custom exchange rates
- Automatic currency rate updates via scheduled task (production)
- All pricing stored with currency + symbol + converted admin-currency fields

**11I. Real-Time Chat**
- Per-RFQ chat sessions between buyer and seller
- Message types: Message, Broadcast, Broadcast Forwarded
- Broadcast messaging: send to multiple sessions simultaneously with attachment forwarding
- Threaded replies (parent message references)
- File attachments per message (S3-backed)
- Read receipts / acknowledgment tracking per user session
- Mute sessions per user
- WebSocket real-time delivery (Django Channels with Cognito auth)
- REST fallback for non-WebSocket clients
- Email notification on new messages

**11J. Notifications**
- In-app notifications: real-time push via WebSocket and/or Celery queue
- Email notifications: transactional emails across entire lifecycle — RFQ (ongoing, approval, rework, rejection, counteroffer, quote submitted, paused, deadline approaching, message received), PO (approval, issued, revised, declined, rescinded, hold, termination, delivery confirmation), Invoice (issued, auto-hold, verified, prepayment), GR/QC (created), Payment (overdue, received, completed), Project/Costing Sheet (assigned, submitted, approved), Requisition (approval, RFQ ongoing)
- Automated scheduled emails: payment overdue (weekly), event end reminders (daily), seller auto-reminders (twice daily)
- User-configurable alerts: per-user enable/disable for email and notification per event type
- 50+ notification event types

**11K. Document Sharing**
- Buyer creates documents with name, description, validity, logo, banner, attachments
- Seller-specific access control
- Seller submits revisions; buyer sees all seller revisions
- Document states: Draft, Submitted with revision history
- Custom fields on documents

**11L. Attachments**
- Centralized S3-backed attachment service
- 40+ module types supported: items, entities, RFQ events/bids/items, awards, POs (buyer/seller/items), invoices (buyer/seller), identifications, GR, QC, payments, contracts, requisitions, chat, vendor profiles (certificates, QC docs, factory photos), projects, costing sheets, BOMs, documents, forms, visits
- Attachment types: Attachment, Template, Logo, Banner, Barcode, QR Code
- Presigned URL generation for secure upload/download

**11M. Comments & Notes**
- Threaded comments on events and POs
- Structured notes for item analytics and CRM use cases

**11N. Audit Trail**
- django-simple-history on critical models: Approval, Custom Section, Custom Field, Delivery Schedule, RFQ Event, Costing Sheet, Project, User Tree
- Soft delete: all models use deleted_datetime (never hard-deleted)
- Change event system: internal event bus dispatching webhook, notification, email, chat, analytics, and async tasks

**11O. Project Management**
- Project with code, ERP project code, name
- Buyer enterprise/entity, customer entity
- Project managers, RFQ responsible users, quote responsible users (multi-user)
- Validity from/to dates
- Project status lifecycle
- Project items: linked to enterprise item, quantity, rate, amount, tags, notes, action, status
- Project item user assignments by role (RFQ Responsible, Quote Responsible)
- Cost centre linkages per project
- Event quantity tolerance
- Custom fields and sections
- Auto-expire via daily scheduled task

**11P. Subscription & Feature Gating**
- Chargebee integration for subscription billing
- Usage quotas per enterprise: items, vendors, RFQs, POs, users, etc.
- Quota enforcement: feature gating by quantity and on/off switches
- Quota reset webhooks

---

### Module 12: INTEGRATIONS

**One-liner:** REST API for ERP sync, outbound webhooks, live distributor pricing (Digi-Key, Mouser), and AWS infrastructure.

**Complete feature list:**

**12A. Public REST API (OpenAPI)**
- API key authentication: enterprise-level key creation, enable/disable
- Endpoints cover:
  - Purchase Orders: Create, Bulk Create, Update, Status Change, Terminate
  - Contracts: Create, Bulk Create, Update, Bulk Update, Status
  - Items: Create, Bulk Create, Update, Bulk Update, Status
  - Vendors: Create, Bulk Create, Update, Contacts CRUD, Status
  - Projects: Create, Bulk Create
  - Costing Sheets: List, ID Mapping
  - Addresses: CRUD
  - Custom Fields: Read
  - Terms & Conditions: CRUD
  - RFQ Events: Read
  - Identifications: CRUD

**12B. Webhooks**
- Configurable outbound webhooks per enterprise
- Event types: PO Create (and more)
- Destination: Teams, Slack, WhatsApp, Zapier endpoints
- Delivered via Celery task queue

**12C. Distributor Integrations**
- Digi-Key: per-entity encrypted API credentials (Fernet AES), batch MPN lookup (50/batch), 500ms rate limiting, pricing cache, background job queue
- Mouser: same architecture
- Smart pricing cache: returns cached instantly, enqueues background job for uncached, returns estimated duration

**12D. AWS Infrastructure**
- S3: file storage with presigned URLs
- Cognito: user pool authentication
- SES: transactional email
- SQS: Celery task broker (two queues: internal + OpenAPI)
- Secrets Manager: credential storage
- API Gateway: WebSocket support

**12E. Bulk Import/Export**
- Import services (9+): vendors, items, BOMs, BOM revisions, buyers, RFQ items, identification, item-tag-vendor linkages
- Import pipeline: upload → validate columns → validate rows → cell-level validation → save
- Import status tracking: Validation Error, Validated, Completed
- Export services (25+): items, BOMs, vendors, buyers, RFQ events (buyer/seller), RFQ items (buyer/seller), bid items (buyer/seller), bid history, PO, PO Group, costing sheet items, project items, pricing repository, analytics, item-tag-vendors
- Export format: Excel (.xlsx) via openpyxl/pandas, CSV for analytics
- Async export with S3 presigned download URLs

---

## B3. What Makes Factwise Different (Competitive Edge)

---

# PART C — PAGE-BY-PAGE CONTENT BLUEPRINT

> This section tells you exactly what goes on each page and in what order.

---

## C1. Homepage

### Section 1: Sticky Navigation Bar

```
[Factwise Logo]   Platform v   Solutions v   Customers   Pricing   Resources v   [Login]   [Request Demo]
```

- Transparent over the hero; transitions to solid on scroll (with subtle shadow)
- "Request Demo" button always visible — primary accent color, filled
- "Login" is text-only, no button styling
- Mega-menu dropdowns for Platform, Solutions, Resources (see C10 for mega-menu structure)

---

### Section 2: Hero

| Element | Content |
|---|---|
| **Announcement bar** (optional) | Thin strip above hero: "New: [Latest feature] — Learn more" |
| **Headline (H1)** | "Source. Procure. Pay. One platform." (or chosen tagline — max 8 words) |
| **Subheadline** | "The end-to-end procurement platform for enterprises. From requisitions and sourcing through purchase orders, invoicing, and payments — in one unified system." (max 30 words) |
| **Primary CTA** | [Request Demo] — filled button, accent color |
| **Secondary CTA** | [See How It Works] — outlined/ghost button |
| **Hero visual** | Animated product screenshot or video loop showing the platform in action (sourcing event with vendor comparison view) |
| **Trust anchor** | See A6. If customer logos available: "Trusted by procurement teams at" + 6-8 logos in grayscale. If not: omit this row entirely or replace with "Built for enterprise procurement teams" (no logos) |

**Design notes:**
- Headline must be readable in under 3 seconds
- Hero visual should be REAL product UI (see E2 for screenshot approach) — not stock photos, not abstract illustrations
- On mobile: stack headline, subheadline, CTAs vertically; hero visual goes below
- If no product screenshots are ready yet, designer should use a wireframe mockup as placeholder in the design comp and flag it for replacement

---

### Section 3: Problem Statement

**Heading:** "Your procurement workflow is scattered across a dozen tools"

Three columns, each with an icon:

| Column 1 | Column 2 | Column 3 |
|---|---|---|
| **Icon:** Scattered puzzle pieces | **Icon:** Blindfolded figure | **Icon:** Hourglass |
| **"5+ disconnected tools"** | **"No pricing visibility"** | **"Weeks to close a sourcing event"** |
| Requisitions in email, sourcing in spreadsheets, POs in ERP, invoices in AP tool, spend data in BI | Your best contract price is buried in a folder no one can find | Collecting quotes by email, comparing in Excel, re-entering into ERP |

**Below the 3 columns:** A single line — "Factwise replaces all of it."

---

### Section 4: Feature Walkthrough (The Core Section)

**Heading:** "One platform, end to end"

**Layout:** Tabbed interface OR sticky-scroll reveal (designer's choice). 6 tabs:

**Tab 1: Source**
- Visual: Screenshot of RFQ event with multiple vendor bids side-by-side
- Heading: "Find the best suppliers at the best price"
- Body: "Create sourcing events, invite vendors, collect competitive bids, negotiate in multiple rounds, and award — all in one flow. Every quote, counteroffer, and revision preserved."
- Highlight chips: Multi-round bidding | BOM sourcing | Landed cost comparison | Auto-reminders

**Tab 2: Procure**
- Visual: Screenshot of PO with approval workflow indicators
- Heading: "Place orders with confidence"
- Body: "Create purchase orders from awards or directly. Route through multi-level approvals, manage delivery schedules, and handle amendments — with full version history."
- Highlight chips: Auto-PO from awards | Multi-level approvals | PO revision tracking | Bulk operations

**Tab 3: Receive**
- Visual: Screenshot of goods receipt / quality check screen
- Heading: "Verify every delivery"
- Body: "Record goods receipt, run multi-stage quality inspections, and track every batch. Rejected goods automatically generate vendor credits."
- Highlight chips: 3-stage quality checks | Batch tracking | Auto-credit for rejections | Custom checklists

**Tab 4: Pay**
- Visual: Screenshot of invoice with 3-way matching indicators (green checks / red flags)
- Heading: "Pay accurately, every time"
- Body: "Process invoices with automatic 3-way matching. The system flags price, tax, and terms mismatches instantly — so you catch exceptions before they become disputes."
- Highlight chips: 7 auto-match checks | Prepayment handling | Credit management | Overdue alerts

**Tab 5: Manage**
- Visual: Screenshot of supplier profile with certifications and ratings
- Heading: "Your entire supplier base in one place"
- Body: "Onboard vendors, qualify them with RFI questionnaires, track performance with ratings, and manage contracts with volume pricing tiers."
- Highlight chips: Vendor onboarding | RFI/RFP qualification | Performance ratings | Contract tiers

**Tab 6: Analyze**
- Visual: Screenshot of analytics dashboard with charts and filters
- Heading: "See where every dollar goes"
- Body: "Unified analytics across the entire procurement chain. Plus, a pricing intelligence database that tracks every price from every source — including live distributor feeds."
- Highlight chips: Spend analytics | Pricing intelligence | Custom KPIs | Excel export

---

### Section 5: Stats Bar

> **CONDITIONAL SECTION — See A6.** Only include this section if we have verified, real numbers. If not, skip entirely and move Social Proof up. Fake stats destroy trust instantly.

**If we have real stats** — 4 large numbers in a row (animate counting up on scroll):

| Stat 1 | Stat 2 | Stat 3 | Stat 4 |
|---|---|---|---|
| **[Real #]** | **[Real #]** | **[Real %]** | **< 1 sec** |
| Enterprises | Countries served | Average cost reduction | Pricing query time |

**If we DON'T have customer stats yet** — Replace with a product capability bar (no fake numbers):

| Capability 1 | Capability 2 | Capability 3 | Capability 4 |
|---|---|---|---|
| **6** sources | **11** modules | **100+** permissions | **< 1 sec** queries |
| Unified pricing intelligence | End-to-end procurement | Granular access control | Pricing repository search |

These are product facts from the codebase — verifiable and honest.

---

### Section 6: Social Proof

> **CONDITIONAL SECTION — See A6.** Content depends on what we actually have.

**If we have case studies + testimonials (ideal):**
- **Featured case study card:** Dark/accent background. Company logo + "How [Company] reduced procurement costs by X% in Y months." + 3 metric callouts + "Read the full story" link
- **2-3 testimonial cards:** Quote, name, title, company logo. Quotes MUST reference specific outcomes (not "great product" — instead "reduced our RFQ cycle time by 60%")

**If we have customer logos but no case studies yet:**
- Expanded logo bar (10-15 logos) with label "Powering procurement for teams at"
- Skip testimonials entirely. Do not fabricate quotes.

**If we have no referenceable customers yet:**
- Skip this section entirely. Replace with an expanded "Built For Your Team" persona section (Section 8) moved up. Credibility will come from product quality and design polish — not from fake social proof.

---

### Section 7: Integration Ecosystem

**Heading:** "Works with your existing tools"

Grid of integration logos: SAP | Oracle | NetSuite | Digi-Key | Mouser | Slack | Teams | Zapier

**CTA:** "See all integrations" link

---

### Section 8: Built For Your Team (Persona Tabs)

4 tabs:

| Tab | Heading | Key Points |
|---|---|---|
| **For Procurement** | "Source faster. Negotiate better." | Competitive sourcing, bid comparison, vendor split, landed cost modeling |
| **For Finance** | "Full spend visibility. Accurate invoices." | 3-way matching, cost center allocation, spend analytics, payment tracking |
| **For Operations** | "Track every delivery and inspection." | Delivery schedules, goods receipt, quality checks, batch tracking |
| **For IT** | "Enterprise-grade. API-first." | REST API, webhooks, 100+ permissions, SSO-ready, audit trail |

---

### Section 9: Enterprise Trust

**Heading:** "Enterprise-grade security and compliance"

> **Only display certification badges we actually hold — see A6.** For certifications in progress, use text like "SOC 2 Type II — in progress" without the badge icon.

Row of badges/icons: [Only include badges for certifications confirmed in A6]

**Key points (small text below) — these are all TRUE based on the product architecture:**
- Role-based access control with 100+ granular permissions
- Full audit trail on every record — who changed what, when
- Data encryption in transit and at rest
- Soft-delete architecture — no data is ever permanently lost
- Multi-entity isolation — each subsidiary's data is independently controlled

---

### Section 10: Final CTA Banner

Full-width accent or dark section:
- **Heading:** "Ready to streamline your procurement?"
- **Primary CTA:** [Request Demo]
- **Secondary CTA:** [See Pricing]
- **Trust text:** "Free guided demo. No credit card required."

---

### Section 11: Mega Footer

```
PLATFORM              SOLUTIONS             RESOURCES           COMPANY            LEGAL
Sourcing              By Role               Blog                About              Privacy Policy
Purchase Orders       By Use Case           Case Studies        Careers            Terms of Service
Contracts             By Industry           Webinars            Press              Cookie Policy
Invoicing & Payments  Enterprise            API Docs            Contact
Goods Receipt & QC                          Changelog
Supplier Management                         ROI Calculator
Pricing Intelligence
Analytics
Integrations

[Social icons: LinkedIn, Twitter/X]

[Compliance badges: only those confirmed in A6]

[Secondary CTA: Request Demo | See Pricing]

(c) 2026 Factwise. All rights reserved.
```

---

## C2. Platform Pages (One Per Module)

Each platform page follows this template:

```
SECTION 1: Hero
  - H1: Module name + outcome-focused tagline
  - Subheadline: 1-2 sentences
  - CTA: [Request Demo] + [See All Platform Features]
  - Hero visual: Module-specific product screenshot

SECTION 2: Problem → Solution
  - Left: "The old way" (2-3 pain points)
  - Right: "The Factwise way" (2-3 solutions)

SECTION 3: Key Capabilities
  - 4-6 feature cards in a bento grid or alternating left-right layout
  - Each card: Icon + Heading + 2-sentence description + Screenshot

SECTION 4: Workflow Visualization
  - Step-by-step flow showing the typical user journey through the module
  - Numbered steps (3-5) with connecting arrows

SECTION 5: Related Modules
  - "Works seamlessly with:" + links to adjacent platform pages
  - e.g., Sourcing page links to → PO Management, Contracts, Pricing Intelligence

SECTION 6: CTA Banner
  - "See [module] in action" + [Request Demo]
```

**Pages to create:**

| Page | URL | H1 | Key Visual |
|---|---|---|---|
| Sourcing | /platform/sourcing | "Find the best suppliers at the best price" | RFQ event with bid comparison |
| Purchase Orders | /platform/purchase-orders | "Manage every purchase order with full control" | PO with approval workflow |
| Contracts | /platform/contracts | "Lock in the best prices with managed contracts" | Contract with pricing tiers |
| Invoicing & Payments | /platform/invoicing-payments | "Process invoices and payments without errors" | Invoice with 3-way match indicators |
| Goods Receipt & QC | /platform/goods-receipt-quality | "Verify every delivery and inspection" | GR with quality check |
| Supplier Management | /platform/supplier-management | "Your entire supplier base, managed" | Vendor profile with ratings |
| Pricing Intelligence | /platform/pricing-intelligence | "Every price. Every source. One search." | Pricing repository search results |
| Analytics | /platform/analytics | "See where every dollar goes" | Dashboard with spend breakdown |
| Integrations | /platform/integrations | "Connect Factwise to your existing tools" | Integration logo grid + API code sample |

---

## C3. Solution Pages — By Use Case

| Page | URL | Headline | Modules to Feature |
|---|---|---|---|
| Source-to-Pay | /solutions/source-to-pay | "End-to-end procurement in one platform" | All modules in sequence |
| Strategic Sourcing | /solutions/strategic-sourcing | "Structured sourcing that finds the best deal" | RFQ, RFI, RFP, Pricing Intel |
| Spend Management | /solutions/spend-management | "Visibility into every dollar spent" | Analytics, Dashboards, Export |
| Supplier Management | /solutions/supplier-management | "Manage vendors from onboarding to performance" | SRM, RFI, Forms, Profiles |
| Contract Management | /solutions/contract-management | "Manage contracts across their full lifecycle" | Contracts, Pricing Tiers |
| BOM-Based Procurement | /solutions/bom-sourcing | "Source entire assemblies, not just parts" | BOM, RFQ, Pricing Intel |

---

## C4. Solution Pages — By Role

| Page | URL | Headline | What to Show |
|---|---|---|---|
| Procurement Teams | /solutions/procurement-teams | "Source faster. Negotiate better. Award smarter." | RFQ workflow, bid comparison, vendor split, landed cost |
| Finance Teams | /solutions/finance-teams | "Full visibility. Accurate matching. On-time payments." | 3-way matching, analytics, cost centers, payment tracking |
| Operations | /solutions/operations | "Track every delivery and quality check" | Delivery schedules, GR, QC, batch tracking |
| IT Teams | /solutions/it-teams | "Enterprise-grade API. Zero headaches." | API, webhooks, permissions, audit trail, security |

---

## C5. Solution Pages — By Industry

| Page | URL | Key Angles |
|---|---|---|
| Electronics Manufacturing | /solutions/electronics | MPN tracking, live Digi-Key/Mouser pricing, BOM sourcing |
| General Manufacturing | /solutions/manufacturing | Multi-level BOM, quality inspections, incoterms, project-based procurement |
| Automotive & Aerospace | /solutions/automotive-aerospace | Supplier qualification (RFI/RFP with scoring), contract tiers, audit trail, batch traceability |

---

## C6. Enterprise Page

**URL:** /enterprise
**Headline:** "Built for enterprise scale, security, and compliance"

**Sections:**
1. Security overview (encryption, access control, audit trail) — these are product facts, always safe to display
2. Compliance badges — **only display certifications confirmed in A6**. For in-progress certs, use text without badge icon
3. Architecture overview (cloud-native, AWS infrastructure, no single point of failure)
4. Integration capabilities (API, webhooks, ERP sync)
5. Admin controls (100+ permissions, multi-entity, templates, approval chains) — product facts, always safe
6. Uptime SLA — **only display if we have a formal SLA commitment. If not, say "Cloud-native architecture designed for high availability"**
7. CTA: [Talk to Enterprise Sales]

---

## C7. Pricing Page

**URL:** /pricing
**Structure:**

3 tiers side by side:

| | Starter | Professional | Enterprise |
|---|---|---|---|
| **Best for** | Small teams getting started | Growing procurement teams | Large organizations with complex needs |
| **Key differentiators** | Core sourcing + PO | + Contracts, Analytics, Pricing Intel | + API, Multi-entity, Custom integrations |
| **CTA** | [Start Free Trial] | [Request Demo] | [Talk to Sales] |

*Note: Actual pricing/features per tier to be finalized by product team.*

---

## C8. Demo Request Page

**URL:** /demo
**Layout:** Split — left side is the form, right side is value reinforcement

**Form fields:**
1. First Name (required)
2. Last Name (required)
3. Work Email (required)
4. Company Name (required)
5. Job Title (required)
6. Company Size — dropdown: 1-50, 51-200, 201-500, 501-2000, 2000+ (required)
7. Phone (optional)
8. "What are you looking to solve?" — open text (optional)

**Right side content:**
- "See Factwise in action"
- "In 30 minutes, we'll show you how to:"
  - Run a competitive sourcing event
  - Auto-generate POs from awarded bids
  - Catch invoice mismatches with 3-way matching
  - Search your entire pricing history instantly
- Customer quote/testimonial
- "No credit card required. No commitment."

---

## C9. Customers / Case Studies

**URL:** /customers
**Layout:** Hero + filterable grid of case study cards

**Filters:** Industry | Company Size | Use Case
**Card format:** Company logo + Industry tag + Headline (the result) + 1-sentence summary + "Read case study" link

**Individual case study template:**
```
HEADER: Company logo + name + industry + size

SECTION 1: THE CHALLENGE
- 2-3 paragraphs describing what the company was dealing with before Factwise

SECTION 2: THE SOLUTION
- How Factwise was implemented
- Which modules they use
- How long implementation took

SECTION 3: THE RESULTS
- 3 metric callouts (large numbers): e.g., "34% cost reduction" | "60% faster RFQ cycles" | "99% supplier adoption"
- 2-3 paragraphs detailing the impact

SECTION 4: QUOTE
- Pull quote from the customer champion (name, title, photo)

SECTION 5: CTA
- "Get similar results" → [Request Demo]
```

---

## C10. Navigation Mega-Menu Structure

**Platform menu:**
```
MODULES                        CAPABILITIES                   NEW
Sourcing (RFQ/RFI/RFP)        Approval Workflows             What's New
Purchase Orders                Custom Fields & Templates      Product Updates
Contracts                      Roles & Permissions            Changelog
Invoicing & Payments           Multi-Currency Support
Goods Receipt & Quality        Real-Time Chat
Supplier Management            Bulk Import/Export
Pricing Intelligence
Analytics & Dashboards
                               [See Full Platform Overview →]
```

**Solutions menu:**
```
BY ROLE                        BY USE CASE                    BY INDUSTRY
For Procurement Teams          Source-to-Pay                  Electronics Manufacturing
For Finance Teams              Strategic Sourcing             General Manufacturing
For Operations                 Spend Management               Automotive & Aerospace
For IT Teams                   Supplier Management
                               Contract Management
                               BOM-Based Procurement
```

**Resources menu:**
```
LEARN                          DEVELOPERS                     COMPANY
Blog                           API Documentation              About Us
Case Studies                   Webhooks Guide                 Careers
Webinars                       Changelog                      Press
ROI Calculator                                                Contact
Glossary
```

---

# PART D — VISUAL DIRECTION

---

## D1. Mood & Style

| Dimension | Direction |
|---|---|
| **Overall feel** | Modern enterprise — clean, spacious, professional but not boring |
| **Light vs dark** | Primarily light (white/off-white backgrounds) with 1-2 dark accent sections (hero or final CTA) |
| **Density** | Spacious — generous padding between sections (80-120px), lots of white space |
| **Typography** | Clean geometric sans-serif (Inter, Geist, or similar). Large bold headlines (48-72px desktop), generous line-height on body text (1.6-1.7) |
| **Imagery** | Real product screenshots over stock photos. Minimal illustrations — only for the problem statement or empty states |
| **Animation** | Subtle and purposeful — fade-in on scroll, tab transitions, stat counter animations. No gratuitous motion |
| **Mobile** | Fully responsive. Tabs collapse to accordions. Hero stacks vertically. Same content, adapted layout |

---

## D2. Color Direction

We will provide exact brand colors (see E1). General guidance:

| Use | Direction |
|---|---|
| **Backgrounds** | White (#FFFFFF) and light gray (#F5F7FA) alternating sections |
| **Dark sections** | Deep navy or near-black for hero variant or final CTA banner |
| **Primary accent** | Used for CTA buttons, active tab indicators, links. Should be vibrant but professional |
| **Text** | Near-black (#1A1A2E) for headings, medium gray (#4A4A68) for body text |
| **Success/error** | Green for positive indicators (matched), Red/orange for flags (mismatched) — relevant for 3-way matching screenshots |

---

## D3. Reference Websites to Study

Study these for inspiration. We are not copying any of them — we're finding our own voice.

| Website | What to Study | Link |
|---|---|---|
| **Linear** (linear.app) | Clean dark hero, sticky scroll feature reveal, minimal animation, crisp typography | Product walkthrough pattern |
| **Stripe** (stripe.com) | Flowing gradients, tabbed feature showcase, trust through design quality | Visual craft and premium feel |
| **Zip** (ziphq.com) | Modern procurement SaaS, dark mode, clean layout | Closest competitor style |
| **Coupa** (coupa.com) | Enterprise procurement positioning, solution page structure | Content organization (not design) |
| **Notion** (notion.so) | Light mode hero, product screenshot focus, clear value prop | Simplicity in messaging |
| **GEP** (gep.com) | Enterprise procurement, good white space, clean enterprise feel | Enterprise credibility balance |
| **Vercel** (vercel.com) | Developer-friendly enterprise, bento grid features, dark sections | Feature card layout |

---

## D4. Design Patterns to Use

| Pattern | Where | Notes |
|---|---|---|
| **Sticky scroll reveal** | Homepage feature walkthrough | Left: feature list scrolls, Right: sticky screenshot updates. OR use tabbed interface — designer's choice |
| **Bento grid** | Platform pages, secondary features | Asymmetric card grid for feature capabilities |
| **Alternating sections** | All pages | White → light gray → white → dark accent creates visual rhythm |
| **Animated stat counters** | Homepage stats bar | Count up from 0 when scrolled into view |
| **Scroll-triggered fade-in** | All content sections | Elements gently fade in from below as they enter viewport |
| **Mega-menu** | Navigation | Categorized dropdowns for Platform, Solutions, Resources |
| **Split layout** | Demo request page, case study hero | Left: content/form. Right: visual/reinforcement |

---

## D5. Do NOT Do

| Avoid | Why |
|---|---|
| Stock photos of people shaking hands or looking at screens | Feels generic and cheap |
| Overly complex animations or parallax effects | Slows page load, distracts from content |
| Carousels that auto-rotate with no user control | Users miss content; feels dated |
| Tiny text below 14px on mobile | Accessibility and readability |
| More than 2 CTA buttons visible at any time | Decision fatigue; dilutes primary action |
| Icon-only feature lists without text | Icons are ambiguous; always pair with a label |
| Walls of text without visual breaks | Nobody reads long paragraphs; use bullets, cards, columns |
| Using screenshots from competitor products as placeholders | We should use wireframe mockups or real screenshots |

---

# PART E — ASSETS, TIMELINE & EXECUTION

---

## E1. Assets We Will Provide

| Asset | Status | Notes |
|---|---|---|
| **Logo** (SVG, PNG, dark/light variants) | TO PROVIDE | Need from brand team |
| **Brand colors** (primary, secondary, accent, neutrals) | TO PROVIDE | Need from brand team. If no brand guide exists, designer to propose palette |
| **Fonts / Typography** | TO DECIDE | Options: Inter, Geist, or custom. Decide during kickoff |
| **Product screenshots** | TO CAPTURE | Will provide real UI screenshots for each module. Need list of exact screens from designer |
| **Demo video / animation** | TO PRODUCE | For hero section. Will produce after design is approved |
| **Customer logos** | TO COLLECT | Need 8-15 logos with usage permission |
| **Testimonial quotes** | TO COLLECT | Need 3-5 quotes with name, title, company, photo |
| **Case study data** | TO WRITE | At least 1-2 full case studies before launch |
| **Team photos** | TO COLLECT | For About page |
| **Compliance badges** | TO PROVIDE | SOC 2, ISO 27001, GDPR logos |
| **Integration logos** | TO COLLECT | SAP, Oracle, NetSuite, Digi-Key, Mouser, Slack, Teams, Zapier |
| **Favicon & OG images** | TO CREATE | After brand is finalized |

---

## E2. Product Visuals — Screenshots & Mockups

> **The entire design hinges on product visuals.** The hero, every tab in the feature walkthrough, every platform page — all require product screenshots. Without them, the designer is designing blind.

### Approach (pick one at kickoff):

| Option | Pros | Cons |
|---|---|---|
| **A. Real screenshots** — Product team captures actual UI screenshots from the live product with sample data | Authentic, builds trust, low cost | May need UI cleanup first; sample data must look realistic |
| **B. Polished mockups** — Designer creates idealized product mockups based on the real UI | Pixel-perfect, beautiful for marketing | Higher design cost; must be updated when product changes |
| **C. Hybrid** — Real screenshots for hero + feature tabs; designer polishes with drop shadows, browser frames, and subtle adjustments | Best of both; authentic but polished | Requires both screenshot capture AND design time |

**Recommended: Option C (Hybrid).** Product team captures the raw screenshots below; designer adds polish (browser frame, drop shadow, background gradient, slight perspective tilt).

### Screenshots needed (V1 priority order):

| Priority | # | Screen | Used On | V1? |
|---|---|---|---|---|
| **MUST** | 1 | Vendor bid comparison (side-by-side view) | Homepage hero + Tab 1 | Yes |
| **MUST** | 2 | PO with approval workflow status indicators | Homepage Tab 2 | Yes |
| **MUST** | 3 | Invoice with 3-way matching indicators | Homepage Tab 4 | Yes |
| **MUST** | 4 | Pricing repository search results | Homepage Tab 6, Pricing Intel page | Yes |
| **MUST** | 5 | Analytics dashboard (spend breakdown chart) | Homepage Tab 6, Analytics page | Yes |
| **SHOULD** | 6 | Supplier profile (certifications, ratings) | Homepage Tab 5 | Yes |
| **SHOULD** | 7 | Goods receipt / quality check screen | Homepage Tab 3 | Yes |
| **SHOULD** | 8 | RFQ event creation (items, quantities, terms) | Sourcing page | Yes |
| **SHOULD** | 9 | Negotiation timeline (bid → counteroffer → re-quote) | Sourcing page | Yes |
| **NICE** | 10 | Delivery schedule view | PO page | V2 |
| **NICE** | 11 | Contract with pricing tiers | Contract page | V2 |
| **NICE** | 12 | Approval workflow chain visualization | Platform capabilities | V2 |
| **NICE** | 13 | Custom fields / template builder | Platform capabilities | V2 |

**Deadline:** Screenshots 1-7 (MUST + SHOULD) must be delivered before the designer begins homepage high-fidelity design. The designer can start the moodboard and style exploration without them, but cannot proceed to high-fidelity without real visuals.

**Guidelines for capturing screenshots:**
- Use realistic-looking sample data (real company names, plausible item descriptions — not "Test Item 1")
- Full browser width (1440px minimum)
- Clean state — no error banners, no debug info, no half-loaded states
- If the UI has a dark/light mode, capture in the mode that matches the website direction
- PNG format, retina resolution (2x) if possible

---

## E3. Phased Launch Plan

> **The full sitemap has 30+ pages. We are NOT building all of them at once.** Here is the phased rollout. Dates to be filled in at kickoff.

### Phase 1 — V1 Launch [Target date: ________]

**Goal:** Live website that can receive demo requests.

| Page | Status |
|---|---|
| Homepage | Design + build |
| /platform/sourcing | Design + build |
| /platform/purchase-orders | Design + build |
| /platform/pricing-intelligence | Design + build |
| /demo (request demo form) | Design + build |
| /pricing | Design + build |
| /enterprise (security & compliance) | Design + build |
| /login (redirect to app) | Build only |

**Total V1 pages: 8**

**Prerequisite milestones before V1 design starts:**
1. Brand identity finalized (logo, colors, fonts) — either provided by team or designed as first deliverable
2. A6 reality check filled in completely
3. Screenshots 1-7 captured and delivered
4. Open questions (E4) resolved at kickoff meeting

### Phase 2 — V2 [Target: 4 weeks after V1 launch]

| Page | Status |
|---|---|
| Remaining platform pages (Contracts, Invoicing, GR/QC, Supplier Mgmt, Analytics, Integrations) | Reuse V1 platform page template |
| /solutions/source-to-pay | Reuse solution page template |
| /solutions/strategic-sourcing | Reuse solution page template |
| /solutions/supplier-management | Reuse solution page template |
| /customers (with 1-2 case studies) | Design + build |
| /company/about | Design + build |
| For Suppliers page (see A7) | Design + build |

### Phase 3 — V3 [Target: 8 weeks after V1 launch]

| Page | Status |
|---|---|
| Industry pages (Electronics, Manufacturing, Automotive) | Reuse solution template |
| Remaining solution pages (by role, by use case) | Reuse solution template |
| Blog / Resources hub | Design + build |
| Comparison pages (vs Coupa, vs SAP Ariba) | New template |
| Glossary / learning center | New template |
| ROI Calculator | Design + build |

---

## E4. Open Questions (Decide at Kickoff — Before Design Starts)

These are decisions that MUST be made at the design kickoff meeting. No design work should begin until these are resolved.

### Must-Resolve (Blocking)

| # | Question | Options | Recommendation |
|---|---|---|---|
| 1 | **Do we have a brand guide?** If no, brand identity design becomes the first milestone | Yes (provide it) / No (designer creates as Milestone 0) | If no, add 1-2 weeks for brand exploration before page design |
| 2 | **Tagline selection** | See A2 for 5 options | Decide at kickoff. Affects hero, meta titles, everything |
| 3 | **Tech stack for the website?** | Next.js + Vercel / Webflow / Framer | Next.js for full control; Webflow if marketing team needs to edit without developers; Framer for speed |
| 4 | **Does the website speak to sellers too?** | Buyers only (V1) / Buyers + Sellers section | See A7. Recommend buyers-only for V1, add seller page in V2 |
| 5 | **Fill in A6 (reality check)** | Product team fills every row | Cannot proceed without this |

### Should-Resolve (Important)

| # | Question | Options | Recommendation |
|---|---|---|---|
| 6 | **Light hero or dark hero?** | Light (Notion/Figma) / Dark (Linear/Stripe) | Light for enterprise credibility; dark for modern tech. Designer should propose both in moodboard |
| 7 | **Homepage feature walkthrough: Tabbed or sticky scroll?** | Tabs (HubSpot style) / Sticky scroll (Linear style) | Designer proposes both in moodboard; team picks |
| 8 | **Pricing page: show prices or "Talk to Sales"?** | Show tier pricing / Contact us | Show tiers with Enterprise = "Talk to Sales" |
| 9 | **Interactive product demo on the site?** | Yes (Storylane/Navattic embed) / No (screenshots + video) | Not for V1. Consider for V2. Higher conversion but requires maintenance |
| 10 | **CMS for blog/resources?** | Headless CMS (Sanity/Contentful) / Webflow CMS / Ghost | Depends on tech stack. Not needed for V1 (no blog at launch) |

### Nice-to-Decide (Can Defer)

| # | Question | Options | Recommendation |
|---|---|---|---|
| 11 | **Multi-language support?** | English only / English + others | English only. Revisit when entering non-English markets |
| 12 | **Cookie consent banner style?** | Minimal bottom bar / Full modal | Minimal bottom bar. Required for GDPR |

---

## E5. Deliverables Expected from Design Team

### Milestone 0 — Brand Identity (only if no brand guide exists — see E4 Q1)

| # | Deliverable | Format |
|---|---|---|
| 0a | **Logo design** (wordmark + icon, dark/light variants) | SVG + PNG |
| 0b | **Color palette** (primary, secondary, accent, neutrals, semantic colors) | Figma styles + HEX/RGB values |
| 0c | **Typography selection** (heading + body fonts, scale, weights) | Figma styles + font files or CDN links |
| 0d | **Brand guidelines one-pager** (logo usage, color dos/don'ts, tone) | PDF or Figma page |

### Milestone 1 — Moodboard & Style Direction

| # | Deliverable | Format |
|---|---|---|
| 1 | **Moodboard / style exploration** (2-3 visual directions) | Figma board |
| 2 | **Homepage wireframe** (layout and content placement, no styling) | Figma, low-fidelity |

### Milestone 2 — V1 High-Fidelity Designs

| # | Deliverable | Format |
|---|---|---|
| 3 | **Homepage design** (desktop + tablet + mobile) | Figma, high-fidelity |
| 4 | **Platform page template** (one page, reusable for all 9 modules) | Figma, high-fidelity |
| 5 | **Demo request page** | Figma, high-fidelity |
| 6 | **Pricing page** | Figma, high-fidelity |
| 7 | **Enterprise page** | Figma, high-fidelity |
| 8 | **Mega-menu design** (Platform, Solutions, Resources dropdowns) | Figma component |
| 9 | **Footer design** | Figma component |
| 10 | **Component library** (buttons, cards, tabs, inputs, badges, section layouts, form elements) | Figma component library |

### Milestone 3 — V2 Templates & Remaining Pages

| # | Deliverable | Format |
|---|---|---|
| 11 | **Solution page template** (reusable for all use-case/role/industry pages) | Figma, high-fidelity |
| 12 | **Case study template** | Figma, high-fidelity |
| 13 | **For Suppliers page** (if decided in A7) | Figma, high-fidelity |
| 14 | **Blog listing + post template** | Figma, high-fidelity |

### Across All Milestones

| # | Deliverable | Format |
|---|---|---|
| 15 | **Responsive breakpoints** | Desktop (1440px), Tablet (768px), Mobile (375px) |
| 16 | **Interaction specs** (hover states, transitions, scroll animations, loading states) | Figma prototyping or written spec |
| 17 | **Development-ready handoff** | Figma Dev Mode or Zeplin — spacing, colors, typography, component specs |
| 18 | **Favicon + OG image templates** | Figma + exported assets |

---

## E6. Technical Requirements

### Performance
| Requirement | Target |
|---|---|
| **Page load time (LCP)** | Under 2.0 seconds on 4G connection |
| **First Contentful Paint** | Under 1.0 second |
| **Cumulative Layout Shift** | Under 0.1 |
| **Total page weight** | Under 2MB (including images) |
| **Image format** | WebP with JPEG/PNG fallback. Lazy-load below-the-fold images |

### SEO
| Requirement | Detail |
|---|---|
| **Meta titles** | Template: "[Page Topic] — Factwise" (under 60 characters) |
| **Meta descriptions** | Unique per page, 150-160 characters, include primary keyword |
| **Open Graph tags** | og:title, og:description, og:image for every page (for social sharing) |
| **Twitter Card tags** | summary_large_image format |
| **Structured data** | Organization schema on homepage; FAQ schema on pricing page; BreadcrumbList on all inner pages |
| **Sitemap** | Auto-generated XML sitemap at /sitemap.xml |
| **Robots.txt** | Allow all public pages; block /demo thank-you page from indexing |
| **Canonical URLs** | Self-referencing canonical on every page |
| **H1 per page** | Exactly one H1 per page; proper heading hierarchy (H1 → H2 → H3) |
| **Alt text** | Descriptive alt text on all images (screenshots, logos, icons) |

### Accessibility (WCAG 2.1 Level AA)
| Requirement | Detail |
|---|---|
| **Color contrast** | Minimum 4.5:1 for body text, 3:1 for large text |
| **Keyboard navigation** | All interactive elements reachable via Tab; visible focus indicators |
| **Screen reader** | Proper ARIA labels on navigation, buttons, form fields |
| **Font sizes** | Minimum 16px body text on desktop, 14px on mobile |
| **Touch targets** | Minimum 44x44px on mobile |
| **Reduced motion** | Respect `prefers-reduced-motion` — disable scroll animations for users who set this |

### Analytics
| Tool | Purpose |
|---|---|
| **Google Analytics 4** (or PostHog/Mixpanel — decide at kickoff) | Page views, session duration, bounce rate, conversion events |
| **Conversion events to track** | `demo_form_submit`, `pricing_page_view`, `cta_click` (with label), `scroll_depth_50`, `scroll_depth_100` |
| **UTM parameter support** | Pass UTM params through to demo form as hidden fields for attribution |
| **Heatmaps** (optional) | Hotjar or Microsoft Clarity for scroll depth and click patterns post-launch |

### Legal / Compliance
| Requirement | Detail |
|---|---|
| **Cookie consent** | GDPR-compliant cookie banner (load analytics scripts only after consent) |
| **Privacy policy** | Link in footer + cookie banner (content provided by legal team) |
| **Terms of service** | Link in footer (content provided by legal team) |

---

## E7. Success Metrics

After launch, we'll measure:

| Metric | Target | Tool |
|---|---|---|
| **Demo requests per month** | Track baseline → grow 20% MoM | Form submissions in analytics |
| **Homepage bounce rate** | Below 40% | GA4 |
| **Time on site** | Above 2 minutes | GA4 |
| **Pages per session** | Above 2.5 | GA4 |
| **Demo page conversion** | Above 15% (visitors who reach /demo → submit form) | GA4 conversion event |
| **Page load time (LCP)** | Under 2.0 seconds | PageSpeed Insights, Web Vitals |
| **Core Web Vitals** | All three "Good" in CrUX report | Google Search Console |
| **Mobile traffic conversion** | Within 80% of desktop conversion rate | GA4 device segment |
| **SEO: Organic traffic** | Track from 0; target 500+ sessions/month within 6 months | GA4 + Search Console |
| **SEO: Indexed pages** | 100% of published pages indexed within 2 weeks of launch | Search Console |

---

---

*End of document. This brief contains the complete Factwise product feature set in plain English alongside page-by-page content blueprints, visual direction, and technical requirements. The product feature detail in Part B is exhaustive — every module, every sub-feature, every capability is listed.*
