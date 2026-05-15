const faqs = [
  {
    q: 'What is hrops.io?',
    a: 'hrops.io is an AI-powered applicant tracking system built for India. It connects employers, agencies, hiring managers, and candidates in one workflow.',
  },
  {
    q: 'How does AI resume screening work in hrops.io?',
    a: 'hrops.io scores resumes against your JD, returns Proceed/Maybe/Decline recommendations, and shows transparent reasoning so teams can decide faster.',
  },
  {
    q: 'What is a magic-link assessment?',
    a: 'A magic link is a candidate-specific URL sent over WhatsApp or email. Candidates can complete assessments without creating an account or installing an app.',
  },
  {
    q: 'Is hrops.io suitable for Indian compliance requirements?',
    a: 'Yes. hrops.io is built for Indian hiring workflows and supports compliance-focused operations with controlled access, auditability, and enterprise-ready practices.',
  },
  {
    q: 'Can agencies and employers use the same platform?',
    a: 'Yes. hrops.io supports role-based visibility so each stakeholder sees what they need while sharing one source of truth.',
  },
  {
    q: 'Does hrops.io support no-code pipeline building?',
    a: 'Yes. Teams can visually configure stages, branching logic, and workflow behavior without writing code.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: a,
    },
  })),
}

export default function FAQ() {
  return (
    <section className="section-light" id="faq">
      <div className="wrap">
        <div className="reveal" style={{ maxWidth: '980px', marginBottom: '28px' }}>
          <div className="eyebrow eyebrow-dark">
            <div className="ey-line"></div>
            FAQs
          </div>
          <h2 className="h2 h2-ink">
            Questions people ask,
            <br />
            <em>answered clearly.</em>
          </h2>
          <p className="lead lead-ink">
            Common questions about hrops.io, AI screening, workflow automation, and platform fit.
          </p>
        </div>

        <div className="faq-list reveal">
          {faqs.map((item) => (
            <details key={item.q} className="faq-item">
              <summary className="faq-q">{item.q}</summary>
              <p className="faq-a">{item.a}</p>
            </details>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </div>
    </section>
  )
}
