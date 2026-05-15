# Security Policy

**HR Ops Technologies Private Limited**  
Last updated: 1 March 2026  
Effective date: 1 March 2026  
Version: 1.0

*This document is the public-facing summary of HR Ops's information security programme. The full internal Information Security Management System (ISMS) documentation is maintained separately and is available to Enterprise customers under NDA.*

---

## 1. Our Security Commitment

Security is not a feature of HR Ops — it is a foundational property of how the platform is built and operated. Hiring data is among the most sensitive data a company holds: it encompasses personal information about thousands of candidates, compensation details, internal assessment scores, and strategic hiring decisions.

HR Ops holds **SOC 2 Type II** certification and maintains an information security programme aligned to **ISO/IEC 27001**. This document describes the controls and practices we maintain.

---

## 2. Certifications and Compliance

| Standard | Status | Scope |
|---|---|---|
| **SOC 2 Type II** | Active — audited annually | Security, Availability, Confidentiality trust service criteria |
| **ISO/IEC 27001** | Aligned — formal certification in progress | Full ISMS covering Platform and HR Ops operations |
| **DPDP Act 2023** | Compliant | All processing of Indian personal data |
| **GDPR** | Compliant | Processing of EU/EEA personal data |
| **EU AI Act** | High-risk AI system obligations met | AI resume screening feature |

Current SOC 2 Type II audit reports and ISO 27001 documentation are available to Enterprise customers under NDA. Contact security@hrops.io.

---

## 3. Infrastructure Security

### 3.1 Hosting environment

- All production infrastructure runs on **Amazon Web Services (AWS) ap-south-1** (Mumbai, India)
- AWS itself holds ISO 27001, SOC 2, PCI DSS, and numerous other certifications — details at aws.amazon.com/compliance
- No production data is stored or processed outside India without explicit customer instruction and an applicable transfer mechanism (SCCs for GDPR transfers)

### 3.2 Network security

- All services run inside a Virtual Private Cloud (VPC) with strict inbound and outbound rules
- Network segmentation separates production, staging, and development environments — no production data exists in non-production environments
- Web Application Firewall (WAF) protects all public-facing endpoints
- DDoS protection is active at the network edge
- Intrusion Detection System (IDS) monitors for anomalous traffic patterns

### 3.3 Encryption

| Data state | Standard | Details |
|---|---|---|
| At rest | AES-256 | All databases, object storage, and backups |
| In transit | TLS 1.2 minimum, TLS 1.3 preferred | All connections; TLS 1.0 and 1.1 are disabled |
| Database-level | Transparent data encryption | All production RDS instances |
| Backup encryption | AES-256 | Separate encryption keys from primary data keys |

- Encryption keys are managed via **AWS Key Management Service (KMS)** with Hardware Security Module (HSM) backing
- Keys are rotated annually (or immediately on suspected compromise)
- HR Ops staff do not have access to plaintext encryption keys

### 3.4 Data residency

All customer data (including candidate personal data) is stored and processed in **India (AWS ap-south-1)** by default. This satisfies the data localisation requirements of the DPDP Act 2023.

---

## 4. Application Security

### 4.1 Secure development lifecycle

HR Ops follows a Secure Development Lifecycle (SDLC):

- Security requirements are defined at the start of every feature build
- All code changes are peer-reviewed before merge — no unreviewed code reaches production
- Automated static analysis security testing (SAST) runs on every pull request
- Dependency scanning identifies vulnerable libraries on every build (updated within 7 days for critical CVEs)
- Secrets are never committed to version control — all credentials are managed through environment variables and secrets management services

### 4.2 Penetration testing

- **Annual** third-party penetration test by an accredited security firm
- Scope: web application, API, internal network, and social engineering
- Critical findings are remediated within **72 hours**
- High findings are remediated within **7 days**
- Medium/low findings are remediated within **30 days** or accepted with documented risk
- Executive summaries are available to Enterprise customers under NDA

### 4.3 Vulnerability management

- Continuous automated vulnerability scanning of all production systems
- Critical CVEs in dependencies: patch and deploy within 72 hours
- Critical infrastructure vulnerabilities: isolate affected system within 2 hours, remediate within 72 hours
- HR Ops maintains a responsible disclosure programme (see Section 10)

### 4.4 AI model security

- AI models are isolated from customer data except during active inference
- Prompt injection and adversarial input attacks are tested as part of our security programme
- Model outputs (screening verdicts and reasoning) are stored separately from model weights
- No customer data is used to update model weights in real time (learning loop operates on anonymised, aggregated signals)

---

## 5. Access Control

### 5.1 HR Ops internal access controls

| Control | Detail |
|---|---|
| Authentication | SSO with MFA mandatory for all HR Ops employees |
| Privileged access | Separate privileged accounts; production access requires PAM checkout with logging |
| Principle of least privilege | Employees access only the systems and data required for their role |
| Access review | Quarterly access review; quarterly removal of inactive access |
| Offboarding | Access revoked within 2 hours of employment end |
| Shared credentials | Prohibited — individual accounts required for all personnel |

### 5.2 Customer access controls

Customers control access within their own accounts:
- Role-based access control (RBAC): Admin, Hiring Manager, Interviewer, Agency, Read-only
- MFA is available to all plans and strongly recommended; it is mandatory for Enterprise plans
- Session expiry: 8 hours of inactivity (configurable for Enterprise)
- All login events, permission changes, and data exports are recorded in the immutable audit log

### 5.3 Production access controls for HR Ops staff

- Production database access requires a time-limited PAM checkout, requires manager approval, and is fully logged
- HR Ops engineers do not have standing read access to customer data
- Customer data access by HR Ops staff (e.g. for support) requires a support ticket linking the access to a specific customer request and is logged in the audit trail

---

## 6. Data Security

### 6.1 Data minimisation by architecture

HR Ops is designed around the principle that data which is never stored cannot be breached:

- **Resume and document files** are never stored on HR Ops servers. The Platform generates scoped, time-limited access URLs to files stored in the customer's own Google Drive, OneDrive, or Box. After AI text extraction, only the extracted text is retained — not the original file.
- **Assessment responses** are encrypted at rest and only accessible to users with the appropriate role
- **AI screening reasoning** is stored separately from assessment content and is only accessible by users with Hiring Manager role or above

### 6.2 Backups

- Full encrypted backups: daily
- Incremental backups: every 4 hours
- Backup retention: 90 days (configurable to 7 years for Enterprise)
- Backups are stored in a separate AWS region with separate encryption keys
- Backup restoration is tested quarterly

### 6.3 Immutable audit log

Every action on the Platform that touches personal data or produces a hiring decision is recorded in an append-only, tamper-evident audit log:

- Hiring decisions and overrides
- AI screening verdicts and reasoning (with version of AI model used)
- Commission triggers and approvals
- Data access by HR Ops staff
- Data exports
- User permission changes
- Login events (including failed attempts)

Audit logs are retained for **7 years** and cannot be modified or deleted by any user, including administrators. Audit log exports are available in PDF and CSV format.

---

## 7. Personnel Security

| Measure | Detail |
|---|---|
| Background verification | All employees before production system access: identity, address, prior employment, criminal record check |
| NDAs | All employees and contractors sign confidentiality agreements on day one |
| Security training | Annual mandatory security awareness training; phishing simulation quarterly |
| Insider threat programme | Behavioural analytics on privileged account activity; anomaly alerts |
| Clean desk / screen lock | Required for all employees with access to production systems |
| Personal device policy | Production systems accessible only from HR Ops-managed or MDM-enrolled devices |

---

## 8. Business Continuity and Disaster Recovery

| Metric | Target | Tested |
|---|---|---|
| Recovery Time Objective (RTO) | 4 hours | Annually |
| Recovery Point Objective (RPO) | 1 hour | Annually |
| Platform uptime SLA | 99.5% monthly | Monitored continuously |

- Business Continuity Plan (BCP) covers loss of primary infrastructure, loss of key personnel, supply chain failure, and security incident scenarios
- DR tests are conducted annually; results are documented and reviewed
- Status and incident history: **status.hrops.io**

---

## 9. Incident Response

### 9.1 Process overview

HR Ops maintains a documented Security Incident Response Plan (SIRP):

| Phase | Action | Timelines |
|---|---|---|
| Detection | Automated alerts, employee reports, third-party notification | Continuous monitoring |
| Triage | Incident commander assigned; severity assessed | Within 1 hour of detection |
| Containment | Affected systems isolated or access revoked | Within 2 hours of confirmed incident |
| Notification | Customer notification sent | Within 72 hours of confirmed breach |
| Investigation | Root cause analysis, scope of impact | Within 5 business days |
| Remediation | Fix deployed, re-test | Before affected systems return to production |
| Post-incident review | Written report; process improvement | Within 30 days |

### 9.2 Customer notification

On a confirmed Security Incident affecting your data, HR Ops will notify you:
- Within **72 hours** of confirmation — initial notification (may be partial while investigation is ongoing)
- Within **5 business days** — full notification including root cause, scope, and remediation

Notification will be sent to the account administrator email address. Enterprise customers may designate a specific security contact in their account settings.

### 9.3 Regulatory notification

- **DPDP Act:** HR Ops will notify the Data Protection Board of India as required by applicable rules
- **GDPR:** HR Ops will provide information sufficient for Controllers to notify their relevant supervisory authority within 72 hours
- HR Ops will not make public statements about security incidents affecting specific customers without their consent, except where legally required

---

## 10. Responsible Disclosure

HR Ops operates a responsible disclosure programme for security researchers.

If you discover a potential security vulnerability in the Platform:

1. **Do not** exploit the vulnerability or access customer data beyond what is necessary to confirm its existence
2. **Do not** publicly disclose the vulnerability before HR Ops has had 90 days to respond
3. **Report** to security@hrops.io with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Your contact details (optional but helpful for follow-up)

**PGP key:** Available at hrops.io/security.asc

**What we commit to:**
- Acknowledgment within **2 business days**
- A substantive response (fix timeline or acceptance/rejection with reasoning) within **10 business days**
- Not pursuing legal action against researchers who act in good faith and follow this process
- Public credit in our security acknowledgements page if you wish

**Scope:** hrops.io, app.hrops.io, api.hrops.io, and any HR Ops-operated subdomain.

**Out of scope:** Social engineering of HR Ops staff, physical security of premises, denial of service attacks, and third-party services (AWS, Razorpay, etc.) that are not under HR Ops's direct control.

---

## 11. Third-Party Security

HR Ops conducts security assessments of all significant third-party vendors and sub-processors before engagement, and annually thereafter. Assessment criteria include:

- Security certifications (SOC 2, ISO 27001, or equivalent)
- Data processing and sub-processing practices
- Incident notification commitments
- Data deletion and portability practices
- Financial stability and business continuity

A list of current sub-processors is maintained at **hrops.io/legal/sub-processors**.

---

## 12. Physical Security

HR Ops does not operate its own data centres. All infrastructure runs on AWS managed facilities, which maintain:
- 24/7 physical security guards and CCTV
- Biometric access controls
- N+1 power redundancy with on-site generators
- Environmental monitoring (temperature, humidity, flood detection)
- ISO 27001 and SOC 2 certifications

AWS facility compliance details: aws.amazon.com/compliance/data-center/

---

## 13. Security Roadmap

The following security enhancements are planned or in progress:

| Enhancement | Target |
|---|---|
| Formal ISO/IEC 27001 certification (third-party audit) | Q3 2026 |
| Customer-managed encryption keys (BYOK encryption) | Q2 2026 |
| SIEM implementation (centralised security event management) | Q2 2026 |
| Zero-trust network architecture (internal) | Q4 2026 |
| Public bug bounty programme | Q4 2026 |

---

## 14. Contact

| Topic | Contact |
|---|---|
| Security incidents | security@hrops.io |
| Responsible disclosure | security@hrops.io |
| SOC 2 / ISO 27001 reports (Enterprise) | security@hrops.io |
| Data protection and privacy | privacy@hrops.io |
| General security questions | security@hrops.io |

**Emergency contact (active incident only):** +91 [to be added] — available 24/7

---

*This Security Policy is reviewed annually and updated to reflect changes in our security programme, the threat landscape, and applicable regulatory requirements.*

*HR Ops Technologies Private Limited | Bengaluru, Karnataka, India*
