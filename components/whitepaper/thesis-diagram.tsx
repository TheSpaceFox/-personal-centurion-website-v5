/** Cloud attention marketplace vs sealed home study. */
export function ThesisDiagram() {
  return (
    <svg
      viewBox="0 0 520 320"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="Diagram contrasting a public cloud attention marketplace with a sealed home study holding a Centurion"
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
        y="28"
        textAnchor="middle"
        className="fill-current"
        fontSize="12"
        fontFamily="ui-monospace, monospace"
        opacity="0.4"
      >
        PUBLIC ATTENTION  |  PRIVATE STUDY
      </text>

      {/* Left — marketplace */}
      <g opacity="0.5">
        <text
          x="130"
          y="58"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.7"
        >
          SHARED PLATFORM
        </text>
        <path
          d="M70 100 C70 78, 95 72, 115 82 C128 62, 160 64, 168 88 C192 88, 200 108, 192 124 L78 124 C62 124, 58 108, 70 100 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          className="wp-motion"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 0 -2; 0 0"
            dur="5s"
            repeatCount="indefinite"
          />
        </path>
        {/* Many thin user dots feeding the cloud */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} className="wp-motion">
            <circle
              cx={55 + i * 36}
              cy="200"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.45"
            />
            <line
              x1={55 + i * 36}
              y1="192"
              x2={110 + (i - 2) * 8}
              y2="126"
              stroke="currentColor"
              strokeWidth="0.75"
              opacity="0.25"
              strokeDasharray="3 4"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;14"
                dur={`${2.8 + i * 0.3}s`}
                repeatCount="indefinite"
              />
            </line>
          </g>
        ))}
        <text
          x="130"
          y="248"
          textAnchor="middle"
          className="fill-current"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          opacity="0.45"
        >
          MANY → ONE POOL
        </text>
      </g>

      {/* Divider */}
      <line
        x1="260"
        y1="48"
        x2="260"
        y2="280"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.25"
      />

      {/* Right — sealed study */}
      <g>
        <text
          x="390"
          y="58"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.55"
        >
          UNDER YOUR ROOF
        </text>
        <path
          d="M330 118 L390 72 L450 118"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <rect
          x="338"
          y="118"
          width="104"
          height="88"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.45"
        />
        {/* Centurion sphere — pulse */}
        <g className="wp-motion">
          <circle
            cx="390"
            cy="158"
            r="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.55"
          >
            <animate attributeName="r" values="20;24;20" dur="3.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="390" cy="158" r="8" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.7" />
        </g>
        <circle
          cx="390"
          cy="230"
          r="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.5"
        />
        <line
          x1="390"
          y1="182"
          x2="390"
          y2="218"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.35"
        />
        <text
          x="390"
          y="268"
          textAnchor="middle"
          className="fill-current"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          opacity="0.45"
        >
          ONE HUMAN · ONE AI
        </text>
      </g>
    </svg>
  );
}
