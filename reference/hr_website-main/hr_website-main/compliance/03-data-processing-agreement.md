# Data Processing Agreement (DPA)

**HR Ops Technologies Private Limited**  
Last updated: 1 March 2026  
Version: 1.0

*This Data Processing Agreement ("DPA") is entered into between HR Ops Technologies Private Limited ("Processor") and the Customer identified in the HR Ops account ("Controller") and forms part of the Terms of Service.*

*This DPA is compliant with GDPR Article 28, India's Digital Personal Data Protection Act 2023 (DPDP Act), and is consistent with HR Ops's SOC 2 Type II and ISO/IEC 27001 obligations.*

---

## 1. Definitions

**"Applicable Data Protection Law"** means all laws and regulations applicable to the processing of Personal Data under this DPA, including:
- India: the Digital Personal Data Protection Act 2023 and any rules made thereunder
- EU/EEA: GDPR (Regulation 2016/679) and applicable Member State implementations
- UK: UK GDPR and Data Protection Act 2018
- Any other applicable national data protection legislation

**"Controller"** means the Customer, being the natural or legal person who determines the purposes and means of processing Personal Data through the Platform.

**"Data Subject"** means the identified or identifiable natural person to whom Personal Data relates — primarily: job candidates, employees, and individuals whose data is uploaded by the Controller.

**"Personal Data"** means any information relating to an identified or identifiable natural person, as defined under Applicable Data Protection Law.

**"Processing"** means any operation performed on Personal Data, including collection, recording, storage, adaptation, retrieval, use, disclosure, erasure, or destruction.

**"Processor"** means HR Ops Technologies Private Limited, who processes Personal Data on behalf of the Controller.

**"Sub-processor"** means any third party engaged by HR Ops to process Personal Data on behalf of the Controller.

**"Security Incident"** means any confirmed breach of security leading to accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to, Personal Data.

**"Standard Contractual Clauses" or "SCCs"** means the standard contractual clauses for the transfer of personal data approved by the European Commission under GDPR Article 46(2)(c), as updated from time to time.

---

## 2. Scope and Roles

### 2.1 Processor status

The Controller appoints HR Ops as a Processor to process Personal Data on behalf of the Controller solely for the purpose of providing the Platform and related services under the Terms of Service.

### 2.2 Processing details

| Element | Details |
|---|---|
| **Subject matter** | Operation of the HR Ops ATS platform for the Controller's hiring activities |
| **Duration** | For the term of the Terms of Service, and for such period as data must be retained under applicable law |
| **Nature of processing** | Collection, storage, analysis, display, transmission, and deletion of Personal Data through the Platform |
| **Purpose** | Recruitment and hiring process management, AI-assisted candidate screening, pipeline management, assessment delivery, and analytics |
| **Types of Personal Data** | See Schedule A |
| **Categories of Data Subjects** | Job candidates; hiring managers; interviewers; agency staff; HR personnel |

### 2.3 Controller obligations

The Controller remains responsible for:
- Ensuring there is a lawful basis for all processing instructions given to HR Ops
- Informing Data Subjects about the processing and their rights (see Clause 8)
- Complying with all applicable Data Protection Law as a Controller
- Ensuring instructions given to HR Ops are lawful

### 2.4 Instruction framework

HR Ops will process Personal Data only on the documented instructions of the Controller. If HR Ops considers an instruction to violate Applicable Data Protection Law, it will promptly notify the Controller. HR Ops is not obliged to carry out an unlawful instruction.

---

## 3. Technical and Organisational Security Measures (TOMs)

HR Ops implements and maintains the following measures, consistent with its SOC 2 Type II certification and ISO/IEC 27001 alignment:

### 3.1 Access control
- Role-based access control (RBAC) with principle of least privilege
- Multi-factor authentication (MFA) mandatory for all HR Ops employees with access to production systems
- Privileged access management (PAM) system for infrastructure access
- Access reviews conducted quarterly
- Immediate revocation on employee offboarding

### 3.2 Encryption
- **At rest:** AES-256 encryption for all data stored on HR Ops infrastructure
- **In transit:** TLS 1.2 minimum (TLS 1.3 preferred) for all data in motion
- **Key management:** AWS KMS with hardware security modules (HSM) — keys rotated annually
- **Database-level encryption:** enabled on all production databases

### 3.3 Infrastructure security
- All production infrastructure hosted in AWS ap-south-1 (Mumbai, India)
- Virtual private cloud (VPC) with network segmentation
- Web application firewall (WAF) and DDoS protection
- Intrusion detection and prevention system (IDS/IPS)
- Continuous vulnerability scanning; critical findings remediated within 72 hours
- Annual third-party penetration testing; results available to Enterprise customers under NDA

### 3.4 Data minimisation and retention
- Files (resumes, documents) processed via scoped time-limited links — not stored on HR Ops infrastructure
- Automated data deletion on configured retention expiry
- Separate retention periods per data category as specified in the Privacy Policy

### 3.5 Incident response
- Documented Security Incident Response Plan
- 24/7 automated alerting for anomalous activity
- Incident commander assigned within 1 hour of confirmed breach
- Customer notification within 72 hours of confirmed Security Incident (see Clause 7)

### 3.6 Business continuity
- Recovery Time Objective (RTO): 4 hours
- Recovery Point Objective (RPO): 1 hour
- Daily encrypted backups with geo-redundant storage
- Tested disaster recovery: annually

### 3.7 Personnel security
- Background verification for all HR Ops employees before access to production systems
- Annual data protection and security training
- Signed confidentiality agreements for all personnel

### 3.8 Supplier management
- All Sub-processors assessed for security posture before engagement
- Annual review of Sub-processor security practices
- Sub-processor contractual obligations mirror those in this DPA

### 3.9 Physical security
- No HR Ops-operated data centres — all infrastructure is in AWS managed facilities (ISO 27001 certified, SOC 2 audited)
- AWS facility security details available at aws.amazon.com/compliance/

---

## 4. Sub-processors

### 4.1 General authorisation

The Controller grants HR Ops general written authorisation to engage Sub-processors as listed in Schedule B and maintained at **hrops.io/legal/sub-processors**.

### 4.2 Change notification

HR Ops will notify the Controller via email to the account administrator at least **30 days** before adding or replacing any Sub-processor. The Controller may object to the change within 14 days by notifying HR Ops at privacy@hrops.io with written reasons. If the Controller objects and HR Ops cannot accommodate the objection, either party may terminate the affected services on 30 days' notice.

### 4.3 Sub-processor obligations

HR Ops imposes data protection obligations on all Sub-processors that are equivalent to those in this DPA, including by:
- Entering into written agreements with each Sub-processor
- Conducting security assessments
- Limiting Sub-processor access to the minimum data required for the Sub-processor's service

HR Ops remains liable to the Controller for Sub-processors' compliance with DPA obligations.

---

## 5. International Data Transfers

### 5.1 India-primary

HR Ops's primary infrastructure is in India (AWS ap-south-1, Mumbai). Processing of data within India complies with the DPDP Act's requirements on data localisation and cross-border transfer.

### 5.2 GDPR transfers — EU/EEA to India

Where the Controller is established in the EU/EEA and Personal Data of EU Data Subjects is transferred to HR Ops in India, the parties rely on:
- **Standard Contractual Clauses (EU SCCs)** — Module 2 (Controller to Processor), European Commission Decision 2021/914

The SCCs are incorporated into this DPA by this reference. In the event of conflict between this DPA and the SCCs, the SCCs prevail for EU/EEA to India transfers.

### 5.3 UK transfers

For transfers from the UK, the parties rely on the **UK International Data Transfer Agreement (IDTA)** or the UK Addendum to the EU SCCs, as applicable.

### 5.4 Sub-processor transfers

Where Sub-processors are located outside India or the EEA, HR Ops ensures that appropriate transfer mechanisms (SCCs, adequacy decisions, or equivalent safeguards) are in place.

---

## 6. Data Subject Rights Assistance

### 6.1 Obligation to assist

HR Ops will assist the Controller (insofar as possible, given the nature of the processing) to fulfil the Controller's obligation to respond to Data Subject rights requests under Applicable Data Protection Law.

Assistance includes:
- Providing data exports in machine-readable format on request
- Identifying and deleting Personal Data on Controller instruction
- Correcting or restricting Personal Data on Controller instruction
- Providing information about processing activities sufficient for the Controller to prepare a response

### 6.2 Direct Data Subject requests

If HR Ops receives a rights request directly from a Data Subject, HR Ops will:
- Acknowledge receipt within 3 business days
- Forward the request to the Controller
- Not respond to the Data Subject directly without the Controller's authorisation, except as required by law

### 6.3 DPIA assistance

HR Ops will provide reasonable assistance where the Controller must conduct a Data Protection Impact Assessment (DPIA) under GDPR Article 35 or equivalent requirements.

---

## 7. Security Incident Notification

### 7.1 Notification timeline

On becoming aware of a confirmed Security Incident affecting Personal Data processed under this DPA, HR Ops will notify the Controller:
- **Initial notification:** within **72 hours** of confirmation — may be incomplete if investigation is ongoing
- **Full notification:** within **5 business days** — with complete information known at that time

### 7.2 Notification content

Each notification will include, to the extent known:
- The nature of the Security Incident
- Categories and approximate number of Data Subjects affected
- Categories and approximate volume of Personal Data records affected
- Likely consequences of the Security Incident
- Measures taken or proposed to address the incident
- Name and contact details of the HR Ops data protection contact

### 7.3 Regulatory notification

The Controller is responsible for notifying the relevant supervisory authority (Data Protection Board of India, or EU/UK supervisory authority as applicable) and affected Data Subjects where required by law. HR Ops will provide reasonable assistance.

---

## 8. Audit Rights

### 8.1 Documentation

HR Ops will make available to the Controller all information reasonably necessary to demonstrate compliance with this DPA on request, including:
- Current SOC 2 Type II audit report (under NDA)
- ISO/IEC 27001 certificate
- Penetration testing summary (under NDA)
- Sub-processor list

### 8.2 Audits

The Controller (or a mandated auditor under NDA with HR Ops) may conduct an audit of HR Ops's processing activities under this DPA:
- No more than once per 12-month period, unless required by a supervisory authority
- With at least 30 days' prior written notice
- During normal business hours and without disrupting HR Ops's operations
- At the Controller's cost
- Subject to the auditor signing an NDA with HR Ops

HR Ops may satisfy audit requests by providing its SOC 2 Type II report in lieu of a bespoke audit, where the report reasonably addresses the Controller's concerns.

---

## 9. Return and Deletion of Data

### 9.1 On termination

Upon termination of the Terms of Service:
- HR Ops will make Customer Data available for export for **90 days**
- After 90 days, HR Ops will permanently delete all Customer Data from its systems (including backups)
- HR Ops will provide written confirmation of deletion on request

### 9.2 Exceptions

Data that HR Ops is required to retain by law (e.g. financial records, audit logs) will be retained only for the legally required period, in a manner that prevents further use for Platform services, and deleted as soon as the retention obligation expires.

### 9.3 Export formats

Customer Data is available for export in JSON and CSV format. Audit logs are available in PDF and CSV.

---

## 10. Specific DPDP Act Provisions

### 10.1 HR Ops as Data Processor under the DPDP Act

For the purposes of the Digital Personal Data Protection Act 2023 (India), HR Ops is a "Data Processor" processing Personal Data on behalf of the Controller (Data Fiduciary). HR Ops:

- Processes Personal Data only in accordance with the Controller's instructions
- Implements appropriate technical and organisational measures as required under the DPDP Act
- Does not engage another Data Processor without the Controller's consent
- Assists the Controller to fulfil obligations to Data Principals (persons)
- Returns or deletes Personal Data at the Controller's direction
- Makes available to the Controller information necessary to demonstrate compliance

### 10.2 Data localisation

All processing of Personal Data of Indian Data Principals is conducted within India (AWS ap-south-1), in compliance with applicable data localisation requirements.

### 10.3 Significant Data Fiduciary obligations

If the Controller is designated a Significant Data Fiduciary under the DPDP Act, HR Ops will provide additional assistance as required, including maintaining records of processing activities and supporting mandatory audits.

---

## 11. Specific EU AI Act Provisions (High-Risk AI)

HR Ops's AI resume screening feature constitutes a **high-risk AI system** under Annex III, point 4 of the EU AI Act (AI systems used for recruitment and selection of natural persons).

For Controllers using AI features to evaluate EU-resident candidates, HR Ops provides:

### 11.1 Technical documentation (Article 11)
Available to Enterprise customers upon request: hrops.io/legal/ai-documentation

### 11.2 Human oversight measures (Article 14)
The Platform requires human review before any AI screening verdict is acted upon. HR Ops will notify Controllers if any configuration would bypass this requirement.

### 11.3 Transparency to affected persons (Article 50)
HR Ops provides template candidate disclosure language. Controllers are obligated to use this or equivalent language before candidates interact with AI systems. See Platform Settings > Candidate Privacy Notice.

### 11.4 Accuracy and bias testing
HR Ops publishes its AI model evaluation methodology and bias testing results at hrops.io/ai-transparency. Controllers may request the full technical report under NDA.

---

## Schedule A — Categories of Personal Data

| Category | Examples | Data Subjects |
|---|---|---|
| Identification data | Full name, date of birth | Candidates |
| Contact data | Email, phone, address | Candidates, HR users, interviewers |
| Professional data | Employment history, job titles, education, qualifications, skills | Candidates |
| Assessment data | Test responses, scores, AI screening results and reasoning | Candidates |
| Communication data | WhatsApp delivery status, email open/click events | Candidates |
| Recruitment process data | Interview notes, panel scores, hiring decisions, offer details | Candidates, hiring managers |
| Account data | User names, work emails, roles | HR users, agency staff |
| Usage data | Login timestamps, feature usage, audit trail | HR users, agency staff |

**Special categories of personal data:** The Platform is not designed to process special categories of personal data (health, biometric, caste, religion, sexual orientation, etc.). Controllers must not upload special category data without prior written agreement and a separate addendum to this DPA.

---

## Schedule B — Sub-processors

Current as of 1 March 2026. Full list maintained at hrops.io/legal/sub-processors.

| Sub-processor | Purpose | Location | Transfer mechanism |
|---|---|---|---|
| Amazon Web Services (AWS) | Cloud infrastructure, database, storage, email | India (ap-south-1) | Primary — data stays in India |
| Razorpay | Payment processing | India | Primary |
| Sentry | Error monitoring and bug tracking | USA | EU SCCs / UK IDTA |
| Intercom | Customer support chat | USA | EU SCCs / UK IDTA |
| Stripe | International billing (Enterprise) | USA | EU SCCs / UK IDTA |
| PostHog (self-hosted) | Product analytics | India (HR Ops hosted) | Primary |

---

## Schedule C — Contact Details for DPA Matters

**Controller's DPA contact:** Account administrator email on file, or as updated in Platform settings.

**Processor's DPA contact:**

> Data Protection Contact  
> HR Ops Technologies Private Limited  
> privacy@hrops.io  
> Response: 72 hours acknowledgment; 30 days substantive response

---

*This Data Processing Agreement is governed by the laws of India. For matters relating to GDPR compliance, EU law governs to the extent required by the Standard Contractual Clauses.*

*Version 1.0 — 1 March 2026*
