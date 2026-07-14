/** You ↔ Remote ↔ home network ↔ brain; optional thinking services outside private store. */
export function SystemShapeDiagram() {
  return (
    <svg
      viewBox="0 0 520 320"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="Diagram of person, iPhone Remote, home network, Centurion brain, and optional thinking services outside the private store"
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .wp-motion animate,
          .wp-motion animateTransform {
            display: none !important;
          }
        }
      `}</style>

      <defs>
        <marker id="sysArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" opacity="0.4" />
        </marker>
      </defs>

      <text
        x="260"
        y="24"
        textAnchor="middle"
        className="fill-current"
        fontSize="12"
        fontFamily="ui-monospace, monospace"
        opacity="0.4"
      >
        DEVICE LINK  ·  PRIVATE STORE
      </text>

      {/* Home trust envelope */}
      <rect
        x="28"
        y="40"
        width="340"
        height="250"
        rx="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        opacity="0.2"
        strokeDasharray="6 5"
      />
      <text
        x="48"
        y="58"
        className="fill-current"
        fontSize="10"
        fontFamily="ui-monospace, monospace"
        opacity="0.4"
      >
        YOUR NETWORK
      </text>

      {/* You */}
      <g transform="translate(70, 130)">
        <circle cx="0" cy="0" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
        <circle cx="0" cy="-4" r="7" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.5" />
        <path
          d="M-12 18 C-12 8, 12 8, 12 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.5"
        />
        <text
          x="0"
          y="48"
          textAnchor="middle"
          className="fill-current"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          opacity="0.45"
        >
          YOU
        </text>
      </g>

      {/* Wireless pulse path You → phone */}
      <path
        d="M100 130 L148 130"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.35"
        markerEnd="url(#sysArrow)"
      />

      {/* iPhone Remote */}
      <g transform="translate(168, 95)">
        <rect
          x="0"
          y="0"
          width="44"
          height="76"
          rx="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.55"
        />
        <rect x="10" y="12" width="24" height="40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <circle cx="22" cy="64" r="3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <text
          x="22"
          y="100"
          textAnchor="middle"
          className="fill-current"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          opacity="0.45"
        >
          REMOTE
        </text>
      </g>

      {/* Animated packets Remote → brain */}
      <path
        d="M220 133 L268 133"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.35"
        markerEnd="url(#sysArrow)"
        strokeDasharray="4 4"
        className="wp-motion"
      >
        <animate attributeName="stroke-dashoffset" values="0;16" dur="1.8s" repeatCount="indefinite" />
      </path>

      {/* Centurion brain appliance */}
      <g transform="translate(300, 105)">
        <rect
          x="0"
          y="0"
          width="52"
          height="60"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <circle cx="26" cy="28" r="14" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.55" className="wp-motion">
          <animate attributeName="opacity" values="0.4;0.75;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="26" cy="28" r="5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
        <text
          x="26"
          y="84"
          textAnchor="middle"
          className="fill-current"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          opacity="0.45"
        >
          BRAIN
        </text>
      </g>

      {/* Outside — thinking services */}
      <g transform="translate(420, 100)" opacity="0.55">
        <text
          x="40"
          y="-28"
          textAnchor="middle"
          className="fill-current"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          opacity="0.7"
        >
          OPTIONAL
        </text>
        <path
          d="M10 20 C10 0, 30 -6, 44 8 C54 -8, 76 -4, 78 16 C96 16, 100 36, 88 46 L20 46 C4 46, 2 28, 10 20 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.5"
        />
        <text
          x="44"
          y="72"
          textAnchor="middle"
          className="fill-current"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          opacity="0.5"
        >
          THINKING
        </text>
        <text
          x="44"
          y="86"
          textAnchor="middle"
          className="fill-current"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          opacity="0.5"
        >
          SERVICE
        </text>
      </g>

      {/* Dashed optional path — outside private store */}
      <path
        d="M352 135 L412 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
        strokeDasharray="3 5"
        markerEnd="url(#sysArrow)"
        className="wp-motion"
      >
        <animate attributeName="stroke-dashoffset" values="0;16" dur="2.4s" repeatCount="indefinite" />
      </path>
      <text
        x="390"
        y="160"
        textAnchor="middle"
        className="fill-current"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        opacity="0.35"
      >
        KEYS STAY ON BRAIN
      </text>

      <text
        x="198"
        y="275"
        textAnchor="middle"
        className="fill-current"
        fontSize="10"
        fontFamily="ui-monospace, monospace"
        opacity="0.4"
      >
        MEMORY · MISSION · HISTORY  STAY INSIDE
      </text>
    </svg>
  );
}
