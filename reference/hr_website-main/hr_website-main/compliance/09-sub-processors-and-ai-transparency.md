# Sub-processor List

**HR Ops Technologies Private Limited**  
Last updated: 1 March 2026  
Version: 1.0

*This list is maintained in accordance with HR Ops's Data Processing Agreement (DPA) and GDPR Article 28 obligations. HR Ops will provide 30 days' notice before adding or replacing any sub-processor.*

*To receive notifications of sub-processor changes, ensure your account administrator email is current, or subscribe at: hrops.io/legal/sub-processors/subscribe*

---

## Current Sub-processors

| Sub-processor | Entity | Purpose | Data processed | Location | Transfer mechanism |
|---|---|---|---|---|---|
| **Amazon Web Services** | Amazon Web Services Inc. | Cloud infrastructure, database (RDS), object storage (S3), key management (KMS), email (SES) | All customer and candidate data | India — ap-south-1 (Mumbai) | Primary location — data stays in India |
| **Razorpay** | Razorpay Software Private Ltd. | Payment processing for Indian subscriptions | Billing name, email, payment method metadata (not card numbers) | India | Primary location |
| **Sentry** | Functional Software Inc. (Sentry) | Application error monitoring and performance tracking | Error logs, stack traces (may contain user IDs and session data — PII is scrubbed before transmission) | USA | EU SCCs (Module 2) / UK IDTA |
| **Intercom** | Intercom Inc. | Customer support chat widget | Support conversation content, user email, account name | USA | EU SCCs (Module 2) / UK IDTA |
| **PostHog** | Self-hosted by HR Ops | Product analytics — page views, feature usage, session data | Anonymous usage data, session identifiers | India (HR Ops infrastructure) | Primary location — self-hosted |
| **Stripe** | Stripe Inc. | Payment processing for international (non-INR) Enterprise subscriptions | Billing name, email, payment method metadata | USA / EU | EU SCCs (Module 2) / UK IDTA |
| **Cloudflare** | Cloudflare Inc. | DNS, CDN, DDoS protection, WAF | Request metadata (IP addresses), website traffic | Global (edge) / India (data at rest) | EU SCCs / UK IDTA for edge nodes outside India |

---

## Change History

| Date | Change | Notice provided |
|---|---|---|
| 1 March 2026 | Initial list published | N/A (initial) |

---

## How to Object to a Sub-processor Change

Under our DPA, you may object to a new or replacement sub-processor within **14 days** of notification. To object:

1. Email privacy@hrops.io with subject line "Sub-processor Objection — [Name of sub-processor]"
2. Include written reasons for the objection
3. HR Ops will consider the objection in good faith and respond within 7 days

If HR Ops cannot accommodate your objection and cannot continue to provide the service without the sub-processor, you may terminate the affected services with 30 days' notice and receive a pro-rata refund of prepaid fees.

---

---

# AI Transparency Report

**HR Ops Technologies Private Limited**  
Last updated: 1 March 2026  
Version: 1.0

*This report describes how HR Ops's AI resume screening feature works, how it is evaluated, and what its known limitations are. It is published in accordance with our commitment to transparency and in anticipation of EU AI Act Article 13 requirements.*

---

## 1. What the AI Does

HR Ops's AI resume screening feature evaluates job applications against job descriptions and produces:

- **A score** (0–100) representing the degree of match between the candidate's profile and the role requirements
- **A verdict** (Proceed / Maybe / Decline) based on configurable thresholds
- **Plain-English reasoning** explaining the verdict with reference to specific role requirements and candidate attributes

The AI is a **decision-support tool**. Every verdict is presented to a human recruiter or hiring manager who makes the actual hiring decision. The Platform does not allow any automatic action to be taken solely on the basis of an AI verdict.

---

## 2. What the AI Uses to Make Decisions

The AI evaluates candidates on the following attributes extracted from the resume and job description:

| Attribute | Used for scoring | Notes |
|---|---|---|
| Relevant skills match | Yes | Technical and functional skills listed in the JD |
| Years of experience | Yes | Matched against JD requirements |
| Experience level and seniority | Yes | IC levels, management experience as specified |
| Education (where required by JD) | Yes | Only where the JD specifies educational requirements |
| Role-relevant project and achievement descriptions | Yes | Assessed for relevance to the role |
| Geographic location | Only where role is location-specific and explicitly stated in JD | Not used for general ranking |
| Name, gender, age, photograph | **Never** | These attributes are actively filtered and not used |
| Caste, religion, nationality | **Never** | These attributes are actively filtered and not used |
| Gaps in employment | Only if explicitly required by JD criteria | Context is considered; gaps alone do not reduce score |
| Prior employer prestige | **Never used as a proxy** | Prior employer's name is not used as a ranking signal |

---

## 3. Training Data

HR Ops's AI models are trained on:

- Publicly available job description and resume datasets
- Synthetic data generated to represent diverse candidate profiles
- Anonymised, aggregated hiring outcome data from customers who have explicitly opted into model improvement (with written consent)

Training data is **never** used from:
- Any individual customer's candidate data without explicit written consent from that customer and the candidate
- Datasets containing special category personal data (health, caste, religion, sexual orientation, etc.)
- Datasets that have not undergone bias review

---

## 4. Bias Testing

HR Ops tests its AI models for demographic bias before deployment and on every significant model update.

### Testing methodology

We test for disparate impact across the following groups:
- **Gender:** Male / Female / Non-binary (where data is available in test sets)
- **Age:** Under 30 / 30–45 / Over 45
- **Geographic location:** Tier 1 cities / Tier 2 cities / other
- **Educational institution:** IIT/IIM / other institutions / no degree

**Pass criteria:** The difference in Proceed rate between any two demographic groups within a protected category must not exceed **5 percentage points** for equivalent qualifications. Models that fail this threshold are not deployed.

### Current results (as of 1 March 2026)

| Protected characteristic | Max observed disparity | Status |
|---|---|---|
| Gender | < 2% | ✓ Pass |
| Age group | < 3% | ✓ Pass |
| Geographic tier | < 4% | ✓ Pass |
| Educational institution type | < 4% | ✓ Pass |

*Full methodology and detailed results are available to Enterprise customers on request.*

---

## 5. Accuracy

| Metric | Value | Notes |
|---|---|---|
| AI screening accuracy (vs hiring manager final decision) | 91% | Based on retrospective analysis of hired/rejected candidates |
| False positive rate (Proceed verdicts for ultimately unsuitable candidates) | 9% | Human review catches these |
| False negative rate (Decline verdicts for potentially suitable candidates) | 6% | Recruiters can review all Decline verdicts |
| Verdict consistency (same resume, same JD, two runs) | 99.2% | AI is highly deterministic |

*Accuracy varies by role type and industry. Roles with highly objective requirements (specific technical skills, certifications) show higher accuracy than roles with subjective requirements (leadership potential, culture fit — which are not assessed by AI).*

---

## 6. Limitations and Known Risks

| Risk | Description | Mitigation |
|---|---|---|
| **Resume format bias** | Poorly formatted resumes may yield lower scores even for strong candidates | Recruiters are advised to check Decline verdicts for strong applicants; HR Ops's parser handles 95%+ of common formats |
| **JD quality dependency** | Vague or poorly written JDs produce less reliable screening | HR Ops provides JD quality feedback to users |
| **Underrepresented profiles** | Highly unconventional career paths may score lower than conventional ones | Human review of Decline verdicts is recommended for creative roles |
| **New skills** | Very recently emerged skills may not be well-understood by the model | Model is updated quarterly; customers can add custom skill tags |
| **Language** | Currently optimised for English-language resumes; limited support for regional language resumes | Resumes in Hindi and other Indian languages: processing supported but accuracy is lower — flagged to users |

---

## 7. Human Oversight Requirements

The following human oversight requirements are built into the Platform and must not be circumvented:

- ✅ All AI verdicts are displayed alongside the reasoning — not just the verdict label
- ✅ Recruiters must click to action a verdict (Proceed / Hold / Override) — there is no auto-advance
- ✅ All Decline verdicts are accessible for review for the duration of the hiring process
- ✅ Overrides (human overriding the AI verdict) are logged in the audit trail with a reason
- ✅ Panel scoring and interviewer assessments are always human-generated and separate from AI screening

---

## 8. Model Updates

HR Ops updates its AI models on the following schedule:

- **Patch updates** (bug fixes, minor accuracy improvements): deployed continuously
- **Minor updates** (new skill recognition, format improvements): monthly
- **Major updates** (model architecture, training data changes): quarterly — bias testing and accuracy evaluation required before deployment

Customers are notified of major model updates via the Platform changelog (hrops.io/changelog). Enterprise customers may request advance notice of major updates.

---

## 9. Regulatory Status

| Regulation | Status |
|---|---|
| EU AI Act (high-risk AI — recruitment) | Preparing for August 2026 applicability — technical documentation, human oversight, transparency measures in place |
| DPDP Act 2023 (automated processing) | Compliant — human review requirement, transparency to candidates |
| GDPR Article 22 (automated decisions) | Compliant — no solely automated decisions; human review mandatory |

---

## 10. Contact

For questions about AI transparency, bias reports, or to request full technical documentation:

**info@hrops.io**

Enterprise customers: contact your dedicated success manager.
