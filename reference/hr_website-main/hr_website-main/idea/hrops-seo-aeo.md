# HR Ops — SEO & AEO Optimisation Playbook

> **Scope:** Next.js 14 App Router site at `hrops.io` — single-page marketing site with 11 sections.  
> **Goal:** Rank for high-intent hiring-tech keywords in India AND appear as a cited source in AI answers (ChatGPT, Gemini, Perplexity, Google SGE).

---

## Table of Contents

1. [Current State Audit](#1-current-state-audit)
2. [Technical SEO](#2-technical-seo)
3. [On-Page SEO](#3-on-page-seo)
4. [Structured Data (Schema.org)](#4-structured-data-schemaorg)
5. [AEO — Answer Engine Optimisation](#5-aeo--answer-engine-optimisation)
6. [Content Expansion](#6-content-expansion)
7. [Performance & Core Web Vitals](#7-performance--core-web-vitals)
8. [India-Specific SEO](#8-india-specific-seo)
9. [Link & Authority Building](#9-link--authority-building)
10. [Tracking & Measurement](#10-tracking--measurement)
11. [Implementation Priority Order](#11-implementation-priority-order)

---

## 1. Current State Audit

### What exists today

| Element | Current State | Problem |
|---|---|---|
| `<title>` | `HR Ops — Hiring Intelligence for India` | Too short, no primary keyword |
| `<meta description>` | `Every other ATS is a filing cabinet. HR Ops thinks.` | Clever but unindexable — no keyword signal |
| `lang` attribute | `lang="en"` | Should be `lang="en-IN"` |
| Canonical tag | Missing | Crawler confusion risk |
| Open Graph tags | Missing entirely | No rich previews on LinkedIn/WhatsApp |
| Twitter Card | Missing | No rich previews on X |
| Robots.txt | Missing | Crawlers have no guidance |
| Sitemap.xml | Missing | Pages may not be discovered |
| Structured data | None | Zero eligibility for rich results |
| `<h1>` | Not a real `<h1>` — hero text is styled `<div>` | Critical heading hierarchy failure |
| `<h2>` tags | Section headings use `.h2` class on real `<h2>` — good | ✓ Already correct |
| Image alt text | Hero floating cards have no `alt` attributes | Accessibility + SEO miss |
| Font loading | Google Fonts via `<link>` — render blocking | CLS / LCP risk |
| `next.config.js` | Empty — no headers, no redirects | Missing security + SEO headers |
| `/public` folder | Empty — no favicon, no OG image | Link previews will be blank |

### Target keyword clusters

**Primary (commercial intent — India ATS market)**
- `AI ATS India`
- `applicant tracking system India`
- `hiring software India`
- `recruitment automation India`
- `AI recruitment platform India`

**Secondary (feature-level — long tail)**
- `AI resume screening India`
- `no-code hiring pipeline builder`
- `magic link candidate assessment`
- `DPDP compliant ATS`
- `agency hiring software India`

**AEO queries (question format — what AI answers)**
- *What is the best ATS for Indian companies?*
- *How does AI resume screening work?*
- *What does DPDP compliance mean for HR software?*
- *What is a magic link assessment?*
- *How do I build a hiring pipeline without code?*

---

## 2. Technical SEO

### 2.1 Metadata — `app/layout.tsx`

Replace the thin metadata object with the full Next.js 14 `Metadata` API:

```tsx
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://hrops.io'),

  title: {
    default: 'HR Ops — AI Applicant Tracking System Built for India',
    template: '%s | HR Ops',
  },
  description:
    'HR Ops is an AI-powered ATS for Indian employers and recruitment agencies. AI resume screening, no-code pipeline builder, magic link assessments, and DPDP compliance — built for how India hires.',

  keywords: [
    'ATS India', 'AI recruitment India', 'applicant tracking system India',
    'hiring software India', 'AI resume screening', 'DPDP compliant ATS',
    'recruitment automation India', 'no-code hiring pipeline',
  ],

  authors: [{ name: 'HR Ops', url: 'https://hrops.io' }],
  creator: 'HR Ops',
  publisher: 'HR Ops',

  alternates: {
    canonical: 'https://hrops.io',
    languages: { 'en-IN': 'https://hrops.io' },
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://hrops.io',
    siteName: 'HR Ops',
    title: 'HR Ops — AI Applicant Tracking System Built for India',
    description:
      'One platform for employers, agencies, and candidates. AI that screens, learns, and automates — so your team makes decisions, not admin.',
    images: [{
      url: '/og-image.png',       // 1200×630px — see §7
      width: 1200,
      height: 630,
      alt: 'HR Ops — AI Hiring Intelligence for India',
    }],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'HR Ops — AI ATS Built for India',
    description: 'AI resume screening, no-code pipelines, magic link assessments. DPDP compliant.',
    images: ['/og-image.png'],
    creator: '@hrops_io',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },

  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN',
  },
}
```

**Why this matters for AEO:** Perplexity and ChatGPT Browse both read `og:description` and `<meta description>` when deciding what to surface. Keyword-rich, factual descriptions increase citation likelihood.

---

### 2.2 `<html>` language tag

```tsx
// app/layout.tsx — <html> element
<html lang="en-IN">
```

Google uses `lang` to serve regional results. `en-IN` signals Indian English content for queries from Indian users.

---

### 2.3 Canonical + Robots.txt + Sitemap

**`public/robots.txt`**
```
User-agent: *
Allow: /

# Block crawling of internal API routes
Disallow: /api/

Sitemap: https://hrops.io/sitemap.xml
```

**`app/sitemap.ts`** (Next.js generates the XML automatically)
```ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://hrops.io',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://hrops.io/for-employers',   // future page
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://hrops.io/for-agencies',    // future page
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://hrops.io/blog',            // future page
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]
}
```

---

### 2.4 Security & SEO headers — `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',    value: 'nosniff' },
          { key: 'X-Frame-Options',           value: 'DENY' },
          { key: 'X-XSS-Protection',          value: '1; mode=block' },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },

  // Compress output
  compress: true,

  // Enable image optimisation
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 768, 1024, 1280, 1600, 1920],
  },

  // Enforce trailing slash consistency
  trailingSlash: false,
}

module.exports = nextConfig
```

---

### 2.5 Heading hierarchy fix — `Hero.tsx`

The hero heading is currently rendered as a styled `<div>`. It **must** be an `<h1>` — there should be exactly one `<h1>` per page, and it must contain the primary keyword.

```tsx
// components/sections/Hero.tsx — change this:
<div class="hero-h1">
  Every other ATS is a filing cabinet.<br />
  <em>HR Ops thinks.</em>
</div>

// To this:
<h1 className="hero-h1">
  Every other ATS is a filing cabinet.<br />
  <em>HR Ops thinks.</em>
</h1>
```

Also add a visually hidden subtitle with keyword context beneath — visible to crawlers, hidden from visual display:

```tsx
<p className="sr-only">
  HR Ops is an AI applicant tracking system built for India — for employers,
  recruitment agencies, and candidates. AI resume screening, no-code pipeline
  builder, DPDP compliant.
</p>
```

```css
/* globals.css */
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border-width: 0;
}
```

---

### 2.6 Image alt text

Every image in the hero floating cards and section illustrations needs descriptive alt text. Examples:

```tsx
// Hero cards
<img src="/pipeline-card.png" alt="HR Ops pipeline view showing Senior Backend Engineer hiring stages" />
<img src="/ai-score-card.png" alt="AI screening scorecard with resume match percentage" />

// Section illustrations
<img src="/hub-diagram.png" alt="HR Ops hiring hub connecting employers, agencies, and candidates in one workflow" />
```

---

### 2.7 Font loading — eliminate render blocking

Replace the Google Fonts `<link>` approach with Next.js built-in font optimisation. This eliminates the render-blocking request, serves fonts from the same origin, and improves CLS:

```tsx
// app/layout.tsx
import { Fraunces, Geist } from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-fraunces',
})

const geist = Geist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-geist',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${geist.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

```css
/* globals.css — update font-family references */
body { font-family: var(--font-geist), sans-serif; }
.hero-h1, .h2, .hstat-num { font-family: var(--font-fraunces), serif; }
```

---

## 3. On-Page SEO

### 3.1 Section `id` attributes as anchor targets

Each section already has `id` attributes (`#platform`, `#hub-animation`, `#workflow-builder`). Make sure every section has one — these become linkable anchors that distribute link equity within the page.

Add missing ones:

```html
<section id="pricing">...</section>
<section id="compliance">...</section>
<section id="personas">...</section>
```

---

### 3.2 Keyword placement in section headings

Current headings are brand-voice heavy but keyword-thin. Add a secondary subtitle under each `<h2>` that is keyword-rich:

| Section | Current h2 | Add as `<p class="section-kw">` |
|---|---|---|
| Platform | *Everyone in the hire, on the same page* | "One AI-powered ATS connecting HR teams, recruitment agencies, hiring managers, and candidates" |
| Hub | *One hire. Zero friction.* | "End-to-end recruitment automation for Indian companies — from JD to offer letter" |
| Pipeline | *Every role, its own pipeline.* | "No-code hiring pipeline builder — configure interview stages, assessments, and branching logic" |
| Compliance | *Compliance isn't a feature you turn on.* | "DPDP-compliant ATS with SOC 2 Type II certification for enterprise procurement" |
| Pricing | *Transparent pricing. No per-user fees.* | "ATS pricing for Indian employers and recruitment agencies — no per-seat fees" |

```css
/* globals.css */
.section-kw {
  font-size: 14px;
  color: var(--text3);
  margin-top: -8px;
  margin-bottom: 28px;
  font-weight: 300;
}
```

---

### 3.3 `<main>` landmark and ARIA

The `<main>` element exists but needs an ARIA label:

```tsx
<main aria-label="HR Ops — AI Hiring Platform">
```

Add `<nav aria-label="Main navigation">` to the Nav component.

---

### 3.4 Internal linking in Footer

The footer links (`For Employers`, `For Agencies`, `AI Intelligence`, etc.) currently link to `#`. These should link to real URLs when the pages exist, but in the interim, point them to on-page anchors:

```html
<a href="#personas">For Employers</a>
<a href="#personas">For Agencies</a>
<a href="#hub-animation">AI Intelligence</a>
<a href="#workflow-builder">Magic Link</a>
<a href="#pricing">Pricing</a>
```

---

## 4. Structured Data (Schema.org)

Structured data is the single most impactful AEO lever. Add a `<script type="application/ld+json">` block in `app/layout.tsx` or as a dedicated `JsonLd` component.

### 4.1 SoftwareApplication schema

```tsx
// components/ui/JsonLd.tsx
export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [

      // ── 1. The product itself ──────────────────────────────────────────
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://hrops.io/#software',
        name: 'HR Ops',
        url: 'https://hrops.io',
        description:
          'AI-powered applicant tracking system (ATS) built for India. HR Ops connects employers, recruitment agencies, hiring managers, and candidates on one platform. Features include AI resume screening, no-code pipeline builder, magic link assessments, and DPDP compliance.',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: [
          {
            '@type': 'Offer',
            name: 'Basic',
            price: '4999',
            priceCurrency: 'INR',
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: '4999',
              priceCurrency: 'INR',
              unitText: 'MONTH',
            },
          },
          {
            '@type': 'Offer',
            name: 'Professional',
            price: '12999',
            priceCurrency: 'INR',
          },
          {
            '@type': 'Offer',
            name: 'Enterprise',
            price: '0',
            priceCurrency: 'INR',
            description: 'Custom pricing — contact sales',
          },
        ],
        featureList: [
          'AI resume screening with reasoning',
          'No-code hiring pipeline builder',
          'Magic link candidate assessments',
          'Multi-stakeholder hiring hub',
          'DPDP compliant data handling',
          'SOC 2 Type II certified',
          'Agency and employer portals',
          'ERP integration',
        ],
        screenshot: 'https://hrops.io/og-image.png',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '124',   // update with real numbers
          bestRating: '5',
        },
      },

      // ── 2. The organisation ────────────────────────────────────────────
      {
        '@type': 'Organization',
        '@id': 'https://hrops.io/#org',
        name: 'HR Ops',
        url: 'https://hrops.io',
        logo: {
          '@type': 'ImageObject',
          url: 'https://hrops.io/logo.png',
          width: 200,
          height: 200,
        },
        sameAs: [
          'https://www.linkedin.com/company/hrops-in',
          'https://twitter.com/hrops_io',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: 'hello@hrops.io',
          availableLanguage: ['English', 'Hindi'],
        },
        areaServed: {
          '@type': 'Country',
          name: 'India',
        },
        foundingDate: '2024',
      },

      // ── 3. WebSite for sitelinks searchbox ────────────────────────────
      {
        '@type': 'WebSite',
        '@id': 'https://hrops.io/#website',
        url: 'https://hrops.io',
        name: 'HR Ops',
        publisher: { '@id': 'https://hrops.io/#org' },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://hrops.io/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },

    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

Add `<JsonLd />` inside `<head>` in `app/layout.tsx`.

---

### 4.2 FAQ schema — highest AEO impact

FAQ schema is the most direct route to appearing in Google's AI Overviews and as cited answers in Perplexity/ChatGPT. Add a visible FAQ section to the page (also good for AEO content) and mark it up:

```tsx
// components/sections/FAQ.tsx — new section to add before CTA
const faqs = [
  {
    q: 'What is HR Ops?',
    a: 'HR Ops is an AI-powered applicant tracking system (ATS) built specifically for Indian companies. It connects employers, recruitment agencies, hiring managers, and candidates on a single platform — with AI resume screening, no-code pipeline building, magic link assessments, and full DPDP compliance.',
  },
  {
    q: 'How does AI resume screening work in HR Ops?',
    a: 'HR Ops uses AI to read every incoming resume against the job description, score candidates on relevant criteria (skills, experience, role fit), and return a Proceed / Maybe / Decline verdict with reasoning. Screening happens overnight so your team arrives to a shortlist — not a pile.',
  },
  {
    q: 'What is a magic link assessment?',
    a: 'A magic link is a personalised, single-click URL sent to a candidate via WhatsApp or email. It opens their assessment without requiring login or app download. HR Ops verifies identity, prevents tab-switching, and submits results automatically.',
  },
  {
    q: 'Is HR Ops compliant with India\'s DPDP Act?',
    a: 'Yes. HR Ops was built with India\'s Digital Personal Data Protection (DPDP) Act in mind. It includes consent tracking, the right to erasure, data localisation within India, and a full audit log. It also holds SOC 2 Type II certification.',
  },
  {
    q: 'Can recruitment agencies use HR Ops?',
    a: 'Yes. HR Ops has a dedicated agency portal. Agencies can submit candidates, track pipeline stages, view AI screening results for their submissions, and receive commission tracking — all within the same platform the employer uses, with role-based access.',
  },
  {
    q: 'What does no-code pipeline builder mean?',
    a: 'HR Ops lets you drag and drop hiring stages — application review, AI screening, technical assessment, panel interview, offer — into a visual canvas. You can configure conditional branching (e.g. if score < 60, auto-reject), set stage timers, and assign interviewers. No engineering required.',
  },
  {
    q: 'How is HR Ops priced?',
    a: 'HR Ops charges per company, not per user. Employer plans start at ₹4,999/month (Basic) and ₹12,999/month (Professional). Agency pricing is slot-based — starting at ₹999 per active slot. Enterprise pricing is custom. Annual billing saves two months.',
  },
  {
    q: 'Which Indian companies use HR Ops?',
    a: 'HR Ops is trusted by teams at Razorpay, PhonePe, CRED, Zepto, Meesho, Groww, and Polygon, among others.',
  },
]

// Schema markup
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}
```

---

### 4.3 BreadcrumbList (for future multi-page)

When sub-pages (`/for-employers`, `/for-agencies`, `/blog`) are added:

```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://hrops.io" },
    { "@type": "ListItem", "position": 2, "name": "For Employers", "item": "https://hrops.io/for-employers" }
  ]
}
```

---

## 5. AEO — Answer Engine Optimisation

AEO is about being the source that AI assistants cite. These are the specific changes that make HR Ops citable.

### 5.1 Principle: write for both humans and answer engines

AI answer engines (Perplexity, ChatGPT Browse, Google SGE) prefer content that:
- States facts directly in the first sentence of each paragraph
- Uses the question as a heading (or near-heading)
- Gives a definition before an explanation
- Uses numbered lists for processes
- Keeps answers self-contained (can be understood without surrounding context)

### 5.2 Add an "About HR Ops" definition block

Add a concise, crawlable definition block on the page — structured so an AI can lift it verbatim as an answer to *"What is HR Ops?"*:

```tsx
// In Hero.tsx, after the hero-sub paragraph, add:
<div itemScope itemType="https://schema.org/SoftwareApplication" className="sr-only">
  <meta itemProp="name" content="HR Ops" />
  <meta itemProp="applicationCategory" content="Applicant Tracking System" />
  <span itemProp="description">
    HR Ops is an AI-powered applicant tracking system (ATS) built for India.
    It provides AI resume screening, a no-code hiring pipeline builder,
    magic link candidate assessments, and full DPDP compliance — for
    employers, recruitment agencies, hiring managers, and candidates
    on a single platform.
  </span>
</div>
```

### 5.3 Write the FAQ section with answer-first formatting

Each answer in the FAQ must be structured as: **direct answer → explanation → supporting detail**. Never bury the answer.

❌ **Weak (buries the answer):**
> "When candidates receive a link via WhatsApp, they can click it to open their personalised assessment environment. This is what we call a magic link…"

✅ **Strong (answer-first):**
> "A magic link is a personalised, single-click URL that opens a candidate's assessment without requiring login or app download. HR Ops sends it via WhatsApp or email, verifies identity automatically, and submits results when complete."

### 5.4 Add a Glossary / How It Works page (new content)

Create `app/how-it-works/page.tsx` with a structured explainer. This is the highest-leverage AEO content because it answers multiple *"how does X work"* queries at once:

**Target queries this page answers:**
- *How does AI resume screening work?*
- *How does magic link assessment work?*
- *What is an ATS and how does it work?*
- *How does a no-code hiring pipeline work?*

Structure each section as:

```markdown
## How AI Resume Screening Works

AI resume screening is the automated process of evaluating job applications 
against a job description without human review.

HR Ops AI screening works in four steps:
1. **Ingestion** — the system reads each resume in PDF, Word, or LinkedIn format
2. **Matching** — AI scores the candidate against role requirements: skills, experience, seniority
3. **Reasoning** — a plain-English explanation is generated for each score
4. **Verdict** — the candidate is tagged Proceed, Maybe, or Decline with full audit trail
```

### 5.5 Citations and credibility signals

AI engines heavily weight sources that are cited by others. Increase citation likelihood by:

- **Publishing original data:** *"HR Ops screened X resumes in 2024. The average AI screening accuracy was 94%."*
- **Defining new terms:** Be the source that defines "magic link assessment" and "hiring intelligence" as concepts
- **Getting press coverage:** A single mention in YourStory, The Ken, or Inc42 carries significant AEO weight
- **Guest posts with backlinks:** Publish on HR/TA communities (ETHRWorld, PeopleMatters, SightsIn+)

### 5.6 `speakable` schema for voice + AI

Add `speakable` schema to mark sections that are ideal for voice assistants and AI extraction:

```json
{
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".faq-answer", ".hero-sub", ".section-kw"]
  }
}
```

---

## 6. Content Expansion

The current site is a single marketing page. To rank for long-tail keywords and be cited by AI, HR Ops needs crawlable, indexable content beyond the homepage.

### 6.1 Priority pages to build

| Page | Target keyword | Format |
|---|---|---|
| `/for-employers` | *ATS for Indian employers* | Feature deep-dive |
| `/for-agencies` | *recruitment agency software India* | Feature deep-dive |
| `/how-it-works` | *how does AI resume screening work* | Step-by-step explainer |
| `/compliance` | *DPDP compliant HR software* | Trust/compliance detail |
| `/pricing` | *ATS pricing India* | Pricing detail with comparison |
| `/blog` | Multiple long-tail clusters | Editorial content |
| `/vs/naukri-rms` | *Naukri RMS alternative* | Competitor comparison |
| `/vs/greenhouse` | *Greenhouse alternative India* | Competitor comparison |
| `/case-studies/[slug]` | *[Company] hiring results* | Social proof + story |

### 6.2 Blog topics with high AEO value

These topics directly answer questions that Indian hiring managers search and AI engines synthesise:

1. *What is DPDP and what does it mean for HR software in India?*
2. *AI resume screening vs manual screening — accuracy comparison*
3. *How to build a hiring pipeline for a 50-person startup*
4. *What is a magic link assessment and why candidates prefer it*
5. *ATS vs Excel for Indian SMEs — when to switch*
6. *How agencies can use one ATS alongside their employer clients*
7. *Hiring for Tier 2 cities — what Indian ATS platforms get wrong*
8. *The real cost of a bad hire in India (2025 data)*

---

## 7. Performance & Core Web Vitals

Google uses Core Web Vitals as ranking signals. The current site has several risks.

### 7.1 LCP (Largest Contentful Paint) — target < 2.5s

The hero `<h1>` and background are the LCP candidates. Risks:
- Google Fonts request blocks rendering (fix: use `next/font` — see §2.7)
- No `priority` prop on the OG image

```tsx
// If using next/image for the hero background:
<Image src="/hero-bg.jpg" alt="" priority fill />
```

### 7.2 CLS (Cumulative Layout Shift) — target < 0.1

Risks:
- Font swap causes layout shift if fallback metrics differ from Fraunces/Geist
- Hero floating cards are `position:absolute` — safe
- Fix: use `size-adjust` on the font fallback, or use `next/font` which handles this automatically

### 7.3 INP (Interaction to Next Paint) — target < 200ms

The animation scripts (Hub, Pipeline, Platform) run on the main thread every `requestAnimationFrame`. Risks:
- Long tasks during animation can delay interaction response
- Fix: add `content-visibility: auto` to off-screen sections so the browser skips rendering them until needed

```css
/* globals.css — apply to all sections except hero */
.section-light,
.section-dark,
.section-mid {
  content-visibility: auto;
  contain-intrinsic-size: 0 800px; /* estimated height */
}
```

### 7.4 OG Image

Create a static `public/og-image.png` at **1200×630px** containing:
- HR Ops logo top-left
- Headline: *AI Hiring Intelligence for India*
- Subtext: *AI screening · No-code pipelines · DPDP compliant*
- Dark navy background matching the brand

This is required for rich previews on LinkedIn, WhatsApp, Twitter, and Slack — all high-referral channels for B2B SaaS in India.

### 7.5 Favicon set

Add to `/public`:
- `favicon.ico` (32×32)
- `icon.png` (512×512 — used by Next.js App Router automatically)
- `apple-icon.png` (180×180)
- `manifest.json` (for PWA eligibility)

```tsx
// app/layout.tsx — Next.js reads these automatically if named correctly
// Just place the files in /app:
// app/icon.png → generates <link rel="icon">
// app/apple-icon.png → generates <link rel="apple-touch-icon">
```

---

## 8. India-Specific SEO

### 8.1 Hreflang for Indian English

```tsx
alternates: {
  canonical: 'https://hrops.io',
  languages: {
    'en-IN': 'https://hrops.io',
    'en':    'https://hrops.io',
  },
},
```

### 8.2 India-specific content signals

- Use INR pricing consistently (already done — ✓)
- Mention Indian cities where relevant in content (*"used by teams in Bengaluru, Mumbai, Delhi, Hyderabad"*)
- Reference Indian compliance context (DPDP, already done — ✓)
- Reference Indian job platforms in content (*"works alongside Naukri, LinkedIn, Instahyre"*)
- Publish salary benchmarks for Indian tech roles on the blog — extremely high search volume

### 8.3 Google Business Profile

Create a Google Business Profile for HR Ops even as a software company. Category: *Software Company*. This helps appear in local/brand searches and can contribute to Knowledge Panel.

### 8.4 `.in` domain authority

`hrops.io` is correctly using an Indian ccTLD. Ensure:
- Hosting is in India (or use a CDN with Indian PoPs — Vercel, Cloudflare, AWS Mumbai)
- Server response time from India < 200ms

---

## 9. Link & Authority Building

### 9.1 Priority link targets

| Source | How | Timeline |
|---|---|---|
| Product Hunt launch | Submit HR Ops — generates high-DA backlinks | Month 1 |
| YourStory / Inc42 | Founder story / funding announcement | Month 1–2 |
| PeopleMatters | Guest post on AI in Indian hiring | Month 2 |
| ETHRWorld | Thought leadership on DPDP + HR | Month 2 |
| G2 / Capterra | List HR Ops — each is a DA 90+ backlink | Month 1 |
| GitHub | Open source any tooling — devs link to it | Month 2–3 |
| IndiaStack blog | DPDP + data localisation angle | Month 3 |
| IIM / ISB placement cells | Partner / list as preferred ATS | Month 3–6 |

### 9.2 Unlinked brand mentions

Set up Google Alerts for *HR Ops hiring* and *hrops.io*. When someone mentions HR Ops without linking, reach out and ask for a link. Convert these first — easiest wins.

### 9.3 HARO / SourceBottle

Sign up for journalist query services (Help A Reporter Out, SourceBottle). Respond to queries about:
- HR technology in India
- AI in recruitment
- DPDP compliance for companies
- Startup hiring challenges

Each placement is a high-authority backlink from a media domain.

---

## 10. Tracking & Measurement

### 10.1 Google Search Console

- Verify ownership (add token to `metadata.verification.google`)
- Submit sitemap: `https://hrops.io/sitemap.xml`
- Monitor: *Coverage*, *Core Web Vitals*, *Search appearance* weekly

### 10.2 Analytics

```tsx
// app/layout.tsx — add Google Analytics 4 via next/third-parties
import { GoogleAnalytics } from '@next/third-parties/google'

// In <body>:
<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

Track these events:
- `cta_click` — "Start hiring smarter" button
- `pricing_view` — when pricing section enters viewport
- `tab_switch` — platform role tab clicks
- `faq_open` — FAQ accordion interactions

### 10.3 Track AEO performance

AEO is harder to measure than SEO but track:
- **Branded search volume** in Google Search Console (rising = AI is mentioning you)
- **Referral traffic from Perplexity.ai** in GA4 (filter by source)
- **Direct traffic spikes** after AI tool citations (correlate with PR)
- Manual checks: ask ChatGPT/Perplexity *"What is the best ATS for Indian companies?"* monthly and record whether HR Ops appears

---

## 11. Implementation Priority Order

### Phase 1 — This sprint (highest impact, lowest effort)

1. ✅ Fix `<h1>` tag in Hero component
2. ✅ Expand metadata in `layout.tsx` (title, description, OG, Twitter)
3. ✅ Add `lang="en-IN"` to `<html>`
4. ✅ Switch to `next/font` (remove Google Fonts `<link>`)
5. ✅ Create `public/robots.txt`
6. ✅ Create `app/sitemap.ts`
7. ✅ Add `JsonLd` component with SoftwareApplication + Organization schema
8. ✅ Add image alt text to all hero cards and section images
9. ✅ Update `next.config.js` with headers and image config
10. ✅ Create OG image (1200×630px) and favicon set

### Phase 2 — Next 2 weeks (AEO foundations)

11. ✅ Add FAQ section to page with FAQPage schema
12. ✅ Add `.section-kw` keyword subtitle to each section
13. ✅ Add `sr-only` definition block in Hero
14. ✅ Add `speakable` schema
15. ✅ Add `content-visibility: auto` to off-screen sections
16. ✅ Fix footer internal anchor links
17. ✅ Register on G2 and Capterra
18. ✅ Set up Google Search Console and GA4

### Phase 3 — Month 2 (content & authority)

19. 🔲 Build `/how-it-works` page
20. 🔲 Build `/for-employers` and `/for-agencies` pages
21. 🔲 Build `/compliance` detail page
22. 🔲 Launch blog — publish first 3 posts from §6.2 list
23. 🔲 Product Hunt launch
24. 🔲 Pitch YourStory / Inc42 founder story
25. 🔲 Submit to PeopleMatters, ETHRWorld guest post

### Phase 4 — Month 3+ (scale)

26. 🔲 Competitor comparison pages (`/vs/naukri-rms`, `/vs/greenhouse`)
27. 🔲 Case study pages
28. 🔲 Salary benchmark content (extremely high search volume in India)
29. 🔲 HARO / journalist outreach programme
30. 🔲 IIM/ISB campus placement partnerships

---

*Last updated: March 2026 · Prepared for HR Ops engineering and marketing teams*

