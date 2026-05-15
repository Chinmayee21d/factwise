export default function LegalHeader() {
  return (
    <header className="legal-header">
      <a href="/" className="legal-logo" aria-label="HR Ops home">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 370 130"
          aria-label="HR Ops"
          role="img"
          style={{ height: '32px', width: 'auto', display: 'block' }}
        >
          <text y="105" x="8" fontSize="112" fontFamily="'Cormorant Garamond', 'Garamond', 'Georgia', serif" fontWeight="700" fontStyle="italic">
            <tspan fill="#C6A85E">HR</tspan>
            <tspan fill="#6B7A8D" fontWeight="300" dx="-6">OPS</tspan>
          </text>
        </svg>
      </a>
    </header>
  )
}