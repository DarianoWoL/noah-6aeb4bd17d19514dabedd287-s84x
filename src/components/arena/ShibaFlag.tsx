/** Small blue pennant with a Shiba face, planted on the front hill next to Sir Doge. */
const ShibaFlag = () => (
  <svg className="hero-flag" viewBox="0 0 60 92" aria-hidden>
    <g className="dm-ink-stroke" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
      {/* Pole + finial */}
      <rect x="6" y="6" width="5" height="84" rx="2.5" className="dm-mouth" />
      <circle cx="8.5" cy="6" r="4" className="dm-gold" />

      {/* Swallowtail cloth */}
      <g className="hero-flag-cloth">
        <path d="M11 11 L56 16 L46 29 L56 42 L11 46 Z" className="dm-tunic" />
        <path d="M11 41 L52 39" className="dm-s-gold" fill="none" strokeWidth="2.5" />

        {/* Shiba face */}
        <path d="M19 22 L20 13 L26 19 Z M37 22 L36 13 L30 19 Z" className="dm-fur" strokeWidth="2" />
        <circle cx="28" cy="27" r="9" className="dm-fur" strokeWidth="2" />
        <path d="M21 29 C23 25 26 26 28 27 C30 26 33 25 35 29 C34 34 31 36 28 36 C25 36 22 34 21 29 Z" className="dm-cream" stroke="none" />
        <circle cx="25" cy="25.5" r="1.4" className="dm-ink" stroke="none" />
        <circle cx="31" cy="25.5" r="1.4" className="dm-ink" stroke="none" />
        <ellipse cx="28" cy="29" rx="2" ry="1.4" className="dm-ink" stroke="none" />
      </g>
    </g>
  </svg>
);

export default ShibaFlag;
