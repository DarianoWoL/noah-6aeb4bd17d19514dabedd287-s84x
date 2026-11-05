/** Sir Doge's head (ears, face, blinking eyes, talking mouth, tiny crown). Ported from public/doge-mascot.html. */
const MascotHead = () => (
  <g className="dm-head">
    <path d="M70 84 L76 30 L110 62 Z" className="dm-fur" />
    <path d="M80 70 L82 44 L100 62 Z" className="dm-ear" strokeWidth="3" />
    <path d="M170 84 L164 30 L130 62 Z" className="dm-fur" />
    <path d="M160 70 L158 44 L140 62 Z" className="dm-ear" strokeWidth="3" />
    <ellipse cx="120" cy="105" rx="54" ry="47" className="dm-fur" />
    <path d="M78 116 C84 98 104 102 120 108 C136 102 156 98 162 116 C160 140 140 151 120 151 C100 151 80 140 78 116 Z" className="dm-cream" stroke="none" />
    <ellipse cx="120" cy="105" rx="54" ry="47" fill="none" />
    <ellipse cx="98" cy="82" rx="7" ry="4" className="dm-cream" stroke="none" />
    <ellipse cx="142" cy="82" rx="7" ry="4" className="dm-cream" stroke="none" />

    <g className="dm-eyes" stroke="none">
      <ellipse cx="100" cy="98" rx="6.5" ry="8.5" className="dm-ink" />
      <circle cx="102.5" cy="94.5" r="2.4" className="dm-white" />
      <ellipse cx="140" cy="98" rx="6.5" ry="8.5" className="dm-ink" />
      <circle cx="142.5" cy="94.5" r="2.4" className="dm-white" />
    </g>
    <ellipse cx="86" cy="117" rx="8" ry="5" className="dm-blush" opacity="0.45" stroke="none" />
    <ellipse cx="154" cy="117" rx="8" ry="5" className="dm-blush" opacity="0.45" stroke="none" />

    <ellipse cx="120" cy="112" rx="8.5" ry="6" className="dm-ink" strokeWidth="2" />
    <ellipse cx="117.5" cy="110" rx="2.6" ry="1.6" className="dm-white" stroke="none" opacity="0.8" />
    <path className="dm-mouth-closed" d="M108 121 Q114 128 120 121 Q126 128 132 121" fill="none" strokeWidth="3" />
    <g className="dm-mouth-open">
      <path d="M109 120 Q120 120 131 120 Q130 140 120 140 Q110 140 109 120 Z" className="dm-mouth" strokeWidth="3" />
      <path d="M113 133 Q120 126 127 133 Q125 139 120 139 Q115 139 113 133 Z" className="dm-tongue" stroke="none" />
    </g>

    {/* Tiny crown */}
    <g transform="rotate(-8 120 56)">
      <path d="M102 66 L97 42 L109 53 L120 36 L131 53 L143 42 L138 66 Z" className="dm-gold" strokeWidth="3.5" />
      <path d="M102 66 L138 66" strokeWidth="3.5" />
      <circle cx="120" cy="56" r="3.6" className="dm-jewel" strokeWidth="2" />
      <circle cx="108" cy="60" r="2.6" className="dm-tunic" strokeWidth="2" />
      <circle cx="132" cy="60" r="2.6" className="dm-tunic" strokeWidth="2" />
    </g>
  </g>
);

export default MascotHead;
