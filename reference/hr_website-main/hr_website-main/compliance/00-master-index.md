# HR Ops Legal Documents — Master Index

**HR Ops Technologies Private Limited**  
Prepared: 1 March 2026

---

## Document Suite

| # | Document | URL | Compliance coverage | Audience |
|---|---|---|---|---|
| 1 | **Privacy Policy** | hrops.io/legal/privacy | DPDP, GDPR, CCPA, SOC 2, ISO 27001 | All users, candidates, public |
| 2 | **Terms of Service** | hrops.io/legal/terms | Indian contract law, Consumer Protection Act, EU AI Act | Customers (employers, agencies) |
| 3 | **Data Processing Agreement** | hrops.io/legal/dpa | GDPR Article 28, DPDP Act, EU AI Act, SOC 2 | Business customers only |
| 4 | **Cookie Policy** | hrops.io/legal/cookies | GDPR (ePrivacy), DPDP Act | All website visitors |
| 5 | **Acceptable Use Policy** | hrops.io/legal/acceptable-use | Indian IT Act 2000, employment law, DPDP | All customers and users |
| 6 | **Security Policy** | hrops.io/legal/security | SOC 2 Type II, ISO 27001, DPDP, GDPR | Customers, enterprise procurement |
| 7 | **DPDP Compliance Statement** | hrops.io/legal/dpdp | DPDP Act 2023 — full obligations | Indian customers, regulators |
| 8 | **EU/UK Privacy Notice** | hrops.io/legal/eu-privacy | GDPR, UK GDPR, EU AI Act | EU/UK data subjects and customers |
| 9 | **Sub-processor List** | hrops.io/legal/sub-processors | GDPR Article 28, DPDP Act | Business customers |
| 9 | **AI Transparency Report** | hrops.io/ai-transparency | EU AI Act, GDPR Article 22, DPDP | All customers, candidates, regulators |

---

## Compliance Coverage Matrix

| Document | DPDP 2023 | GDPR | UK GDPR | SOC 2 Type II | ISO 27001 | EU AI Act | CCPA |
|---|---|---|---|---|---|---|---|
| Privacy Policy | ✅ Full | ✅ Full | ✅ Full | ✅ Referenced | ✅ Referenced | ✅ Referenced | ✅ Partial |
| Terms of Service | ✅ Referenced | ✅ Referenced | ✅ Referenced | — | — | ✅ Full | — |
| DPA | ✅ Full | ✅ Full (Art. 28) | ✅ Full | ✅ TOMs | ✅ TOMs | ✅ Full | — |
| Cookie Policy | ✅ Full | ✅ Full (ePrivacy) | ✅ Full | — | — | — | ✅ Referenced |
| Acceptable Use Policy | ✅ Referenced | ✅ Referenced | — | ✅ Referenced | — | ✅ Full | — |
| Security Policy | ✅ Referenced | ✅ Referenced | ✅ Referenced | ✅ Full | ✅ Full | — | — |
| DPDP Statement | ✅ Full | — | — | ✅ Referenced | ✅ Referenced | ✅ Referenced | — |
| EU/UK Notice | — | ✅ Full | ✅ Full | — | — | ✅ Full | — |
| Sub-processor List | ✅ Full | ✅ Full (Art. 28) | ✅ Full | ✅ Referenced | — | — | — |
| AI Transparency | ✅ Referenced | ✅ Full (Art. 22) | ✅ Referenced | — | — | ✅ Full | — |

---

## What Needs To Be Completed Before Going Live

The following placeholders remain in the documents. These must be completed by HR Ops's legal and operations teams:

### Critical (must complete before publishing)

- [ ] **Registered address** — appears in all documents. Insert full registered office address.
- [ ] **CIN number** — Company Identification Number from Ministry of Corporate Affairs. Add to Terms of Service footer.
- [ ] **GST number** — Add to Terms of Service footer and billing notices.
- [ ] **EU Representative** — Required under GDPR Article 27 if processing EU personal data without an EU establishment. Appoint a representative in an EU member state and add their details to the EU/UK Privacy Notice (Section 2). Services like GDPR-Rep.eu or Bird & Bird can provide this.
- [ ] **UK Representative** — Required under UK GDPR. Add to EU/UK Privacy Notice (Section 2).
- [ ] **Google Search Console verification token** — Add to `metadata.verification.google` in Next.js layout.
- [ ] **Company email addresses** — Confirm all email addresses used in documents are active:
  - privacy@hrops.io
  - security@hrops.io
  - info@hrops.io
  - info@hrops.io
  - info@hrops.io
  - info@hrops.io
  - info@hrops.io

### Important (complete within 30 days of launch)

- [ ] **SOC 2 Type II report** — Obtain from your auditor (e.g. Deloitte, KPMG, Grant Thornton India) if not yet certified. Reference to "Active" certification in compliance section should be replaced with actual certification date and auditor.
- [ ] **ISO 27001 formal certification** — Currently described as "aligned" and "in progress." Update Security Policy and DPDP Statement when certification is obtained.
- [ ] **DPO appointment** — Assess formally whether a Data Protection Officer is required under GDPR Article 37. If yes, appoint and add their details to the EU/UK Notice.
- [ ] **G2 / Capterra listings** — Add links to sub-processor list page once listed.
- [ ] **Security PGP key** — Generate and publish at hrops.io/security.asc.
- [ ] **status.hrops.io** — Set up uptime monitoring page (e.g. via Betteruptime, Checkly, or self-hosted Uptime Kuma).
- [ ] **Candidate Privacy Notice template** — Ensure the template referenced in Platform Settings > Candidate Privacy Notice exists and covers all required elements.

### Before accepting Enterprise customers

- [ ] **Full SOC 2 Type II audit report** — Required before sharing with Enterprise procurement.
- [ ] **EU SCCs** — Ensure the Standard Contractual Clauses referenced in the DPA are signed as part of the Enterprise agreement flow. A signed SCC document should be available in the Enterprise agreement package.
- [ ] **Transfer Impact Assessment (TIA)** — Referenced in EU/UK Notice as available. Prepare the full TIA document before EU Enterprise deals.
- [ ] **AI technical documentation (EU AI Act Article 11)** — Required before marketing to EU companies. Referenced as available at hrops.io/legal/ai-documentation — this document needs to be prepared.
- [ ] **DPIA summaries** — Referenced as available on request. Ensure these are prepared for: (a) AI screening, (b) large-scale candidate processing.
- [ ] **Penetration test report** — Engage a CREST or CHECK-accredited firm for the annual pentest. Executive summary required for Enterprise customers.

---

## Implementation Guide

### Step 1 — Create the legal pages in Next.js

Create the following routes:

```
app/legal/privacy/page.tsx          → 01-privacy-policy.md
app/legal/terms/page.tsx            → 02-terms-of-service.md
app/legal/dpa/page.tsx              → 03-data-processing-agreement.md
app/legal/cookies/page.tsx          → 04-cookie-policy.md
app/legal/acceptable-use/page.tsx   → 05-acceptable-use-policy.md
app/legal/security/page.tsx         → 06-security-policy.md
app/legal/dpdp/page.tsx             → 07-dpdp-compliance-statement.md
app/legal/eu-privacy/page.tsx       → 08-eu-uk-privacy-notice.md
app/legal/sub-processors/page.tsx   → 09-sub-processors-and-ai-transparency.md (first half)
app/ai-transparency/page.tsx        → 09-sub-processors-and-ai-transparency.md (second half)
```

Recommended approach: use `@next/mdx` or a markdown-to-JSX library to render these documents, so they can be updated as `.md` files without touching code.

### Step 2 — Footer links

Ensure the Footer component links to all legal pages:

```tsx
// Footer legal links
<a href="/legal/privacy">Privacy Policy</a>
<a href="/legal/terms">Terms of Service</a>
<a href="/legal/dpdp">DPDP Compliance</a>
<a href="/legal/security">Security</a>
<a href="/legal/cookies">Cookie Policy</a>
<a href="/legal/acceptable-use">Acceptable Use</a>
```

### Step 3 — Cookie consent banner

Implement a cookie consent banner that:
- Appears on first visit for all users
- Offers Accept All / Reject Non-Essential / Manage Preferences options
- Records consent with timestamp and policy version
- Respects the Do Not Track (DNT) browser signal
- Links to hrops.io/legal/cookies

Recommended libraries: `react-cookie-consent`, `cookieconsent`, or a custom implementation using localStorage is **not supported in Anthropic artifacts** — implement in the live Next.js app.

### Step 4 — Structured legal metadata

Add appropriate `<meta>` and schema markup to each legal page:

```tsx
// Example for Privacy Policy page
export const metadata: Metadata = {
  title: 'Privacy Policy | HR Ops',
  description: 'How HR Ops collects, uses, and protects your personal data. DPDP, GDPR, and SOC 2 compliant.',
  robots: { index: true, follow: true },
}
```

### Step 5 — Candidate Privacy Notice

Add a Candidate Privacy Notice to Platform Settings. This notice is shown to candidates before they interact with Magic Link assessments. Template text:

> *"Your application is being processed by [Company Name] using HR Ops, a recruiting platform operated by HR Ops Technologies Private Limited. HR Ops uses AI tools to assist in evaluating your application — an AI-generated recommendation will be reviewed by a human before any decision is made. You have the right to access, correct, and delete your personal data. For more information, see: hrops.io/legal/privacy"*

### Step 6 — Audit log verification

Verify that the immutable audit log is capturing all events listed in the Security Policy. Run a test hiring process and confirm that the following events are logged:
- Job posting created
- Candidate application received
- AI screening verdict generated
- Human review action taken
- Offer sent
- Data export performed

---

## Version Control

All legal documents should be version-controlled in the HR Ops GitHub repository under `/legal/`. Each document includes a version number and effective date. When a document is updated:

1. Increment the version number
2. Update the "Last updated" and "Effective date" fields
3. Update this master index
4. Send notification to all active customers at least 30 days before material changes take effect (Terms of Service) or at least 14 days (AUP, Cookie Policy)
5. Reset the cookie consent banner if the Cookie Policy changes materially

---

*This master index is an internal document. Do not publish this file publicly.*

*Prepared by Claude, AI assistant, on behalf of HR Ops — to be reviewed by qualified legal counsel before publication.*

> **⚠️ Important disclaimer:** These documents have been prepared as a starting point based on current regulatory requirements as understood at March 2026. They do not constitute legal advice. HR Ops strongly recommends that these documents be reviewed by a qualified Indian lawyer (for DPDP and contract law compliance) and an EU-qualified data protection lawyer (for GDPR and EU AI Act compliance) before being published or relied upon. Regulatory requirements change, and this document will need to be updated as DPDP Act rules are notified and the EU AI Act comes into full effect.
