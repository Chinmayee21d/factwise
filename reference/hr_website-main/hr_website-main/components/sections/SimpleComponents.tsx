export function Logos() {
  const logos = ['Razorpay','PhonePe','CRED','Zepto','Meesho','Groww','Polygon']
  return (
    <div className="logos-strip">
      <div className="logos-inner">
        <span className="logo-lbl">Trusted by teams at</span>
        {logos.map(l => <span key={l} className="logo-name">{l}</span>)}
      </div>
    </div>
  )
}

export function CTA() {
  return (
    <div className="cta-banner">
      <div className="cta-inner">
        <div className="cta-left">
          <h2>Ready to hire with<br/><em>intelligence?</em></h2>
          <p>Set up in 15 minutes. No credit card required.</p>
        </div>
        <div className="cta-right">
          <a href="#pricing" className="btn-hero-gold">Start hiring smarter</a>
          <a href="mailto:info@hrops.io?subject=HR%20Ops%20Sales%20Enquiry" className="btn-hero-outline">Talk to sales</a>
        </div>
      </div>
    </div>
  )
}
