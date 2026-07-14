/** UNDERSTAND → PLACE → LIVE as a continuous loop. */
export function LifecycleDiagram() {
  return (
    <svg
      viewBox="0 0 520 320"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="Diagram of Understand, Place, and Live as a continuous lifecycle loop"
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .wp-motion animate,
          .wp-motion animateMotion {
            display: none !important;
          }
        }
      `}</style>

      <defs>
        <marker id="lifeArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" opacity="0.45" />
        </marker>
      </defs>

      <text
        x="260"
        y="28"
        textAnchor="middle"
        className="fill-current"
        fontSize="12"
        fontFamily="ui-monospace, monospace"
        opacity="0.4"
      >
        A LIFE CYCLE — NOT A ONE-TIME SETUP
      </text>

      {/* Outer loop path */}
      <path
        id="lifeLoop"
        d="M260 70 C360 70, 420 120, 420 175 C420 240, 340 270, 260 270 C180 270, 100 240, 100 175 C100 120, 160 70, 260 70"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        opacity="0.25"
        strokeDasharray="5 6"
        className="wp-motion"
      >
        <animate attributeName="stroke-dashoffset" values="0;44" dur="8s" repeatCount="indefinite" />
      </path>

      {/* Travelling mote on the loop */}
      <circle r="3.5" fill="currentColor" opacity="0.55" className="wp-motion">
        <animateMotion dur="8s" repeatCount="indefinite" path="M260 70 C360 70, 420 120, 420 175 C420 240, 340 270, 260 270 C180 270, 100 240, 100 175 C100 120, 160 70, 260 70" />
      </circle>

      {/* UNDERSTAND */}
      <g transform="translate(260, 95)">
        <circle cx="0" cy="0" r="36" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <rect x="-14" y="-12" width="28" height="24" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.55" />
        <line x1="-8" y1="-4" x2="8" y2="-4" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="-8" y1="2" x2="6" y2="2" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <line x1="-8" y1="8" x2="4" y2="8" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <text
          x="0"
          y="56"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.5"
        >
          UNDERSTAND
        </text>
      </g>

      {/* PLACE */}
      <g transform="translate(380, 180)">
        <circle cx="0" cy="0" r="36" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <path d="M-18 -2 L0 -18 L18 -2" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.5" />
        <rect x="-14" y="-2" width="28" height="20" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.5" />
        <text
          x="0"
          y="56"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.5"
        >
          PLACE
        </text>
      </g>

      {/* LIVE */}
      <g transform="translate(140, 180)">
        <circle cx="0" cy="0" r="36" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <circle cx="0" cy="0" r="10" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.6" className="wp-motion">
          <animate attributeName="r" values="8;12;8" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <text
          x="0"
          y="56"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.5"
        >
          LIVE
        </text>
      </g>

      <text
        x="260"
        y="308"
        textAnchor="middle"
        className="fill-current"
        fontSize="10"
        fontFamily="ui-monospace, monospace"
        opacity="0.4"
      >
        EACH TURN DEEPENS LOYALTY — NOTHING LEAVES THE LOOP
      </text>
    </svg>
  );
}
