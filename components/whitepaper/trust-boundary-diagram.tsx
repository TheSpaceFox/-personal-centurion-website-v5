/** What stays home vs what never crosses to company / public chat. */
export function TrustBoundaryDiagram() {
  return (
    <svg
      viewBox="0 0 520 320"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="Diagram of the trust boundary: private data stays home; company and public chat stay outside"
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .wp-motion animate,
          .wp-motion animateTransform {
            display: none !important;
          }
        }
      `}</style>

      <text
        x="260"
        y="26"
        textAnchor="middle"
        className="fill-current"
        fontSize="12"
        fontFamily="ui-monospace, monospace"
        opacity="0.4"
      >
        TRUST BOUNDARY
      </text>

      {/* Home vault */}
      <g>
        <ellipse
          cx="200"
          cy="170"
          rx="150"
          ry="110"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.35"
          className="wp-motion"
        >
          <animate attributeName="rx" values="148;154;148" dur="5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.28;0.42;0.28" dur="5s" repeatCount="indefinite" />
        </ellipse>
        <text
          x="200"
          y="72"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.5"
        >
          STAYS WITH YOU
        </text>

        {[
          { y: 120, label: "CONVERSATIONS" },
          { y: 150, label: "MISSION & SOUL" },
          { y: 180, label: "SKILLS YOU FORGE" },
          { y: 210, label: "DECISION HISTORY" },
        ].map((row) => (
          <g key={row.label}>
            <rect
              x="110"
              y={row.y - 12}
              width="180"
              height="24"
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.4"
            />
            <text
              x="200"
              y={row.y + 4}
              textAnchor="middle"
              className="fill-current"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              opacity="0.55"
            >
              {row.label}
            </text>
          </g>
        ))}
      </g>

      {/* Boundary seam */}
      <line
        x1="360"
        y1="50"
        x2="360"
        y2="280"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.3"
      />
      <line
        x1="368"
        y1="50"
        x2="368"
        y2="280"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.15"
        strokeDasharray="4 5"
        className="wp-motion"
      >
        <animate attributeName="stroke-dashoffset" values="0;18" dur="3.5s" repeatCount="indefinite" />
      </line>

      {/* Outside — never crosses */}
      <g opacity="0.5">
        <text
          x="440"
          y="72"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.7"
        >
          NEVER CROSSES
        </text>
        <g transform="translate(440, 130)">
          <rect x="-42" y="-18" width="84" height="36" rx="6" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.5" />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            className="fill-current"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
            opacity="0.55"
          >
            COMPANY
          </text>
        </g>
        <g transform="translate(440, 200)">
          <rect x="-42" y="-18" width="84" height="36" rx="6" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.5" />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            className="fill-current"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
            opacity="0.55"
          >
            PUBLIC CHAT
          </text>
        </g>
        {/* Blocked probes */}
        <g className="wp-motion">
          <circle r="2.5" fill="currentColor" opacity="0">
            <animate attributeName="cx" values="330;355;355" keyTimes="0;0.5;1" dur="3s" repeatCount="indefinite" />
            <animate attributeName="cy" values="130;130;130" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.5;0" keyTimes="0;0.4;1" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle r="2.5" fill="currentColor" opacity="0">
            <animate attributeName="cx" values="330;355;355" keyTimes="0;0.5;1" dur="3.4s" begin="0.8s" repeatCount="indefinite" />
            <animate attributeName="cy" values="200;200;200" dur="3.4s" begin="0.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.5;0" keyTimes="0;0.4;1" dur="3.4s" begin="0.8s" repeatCount="indefinite" />
          </circle>
        </g>
        <g transform="translate(440, 255)">
          <circle cx="0" cy="0" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          <line x1="-7" y1="-7" x2="7" y2="7" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          <line x1="7" y1="-7" x2="-7" y2="7" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        </g>
      </g>

      <text
        x="200"
        y="300"
        textAnchor="middle"
        className="fill-current"
        fontSize="10"
        fontFamily="ui-monospace, monospace"
        opacity="0.4"
      >
        OFFLINE WHEN THE ROOM MUST STAY SEALED
      </text>
    </svg>
  );
}
