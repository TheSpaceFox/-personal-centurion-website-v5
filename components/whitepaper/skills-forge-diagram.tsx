/** Locked stranger store vs Centurion forging a skill under the roof. */
export function SkillsForgeDiagram() {
  return (
    <svg
      viewBox="0 0 520 320"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="Diagram showing stranger skill stores locked out while Centurion forges skills at home"
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
        SKILLS — FORGED AT HOME
      </text>

      {/* Left — stranger store rejected */}
      <g opacity="0.5">
        <text
          x="130"
          y="58"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.65"
        >
          STRANGER STORE
        </text>
        <rect
          x="55"
          y="78"
          width="150"
          height="140"
          rx="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.45"
        />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x="75"
            y={100 + i * 32}
            width="110"
            height="22"
            rx="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.35"
          />
        ))}
        {/* Lock overlay */}
        <g className="wp-motion" transform="translate(130, 230)">
          <rect x="-16" y="-4" width="32" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
          <path
            d="M-10 -4 V-14 A10 10 0 0 1 10 -14 V-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="130 230; 130 226; 130 230"
            dur="3s"
            repeatCount="indefinite"
          />
        </g>
        <text
          x="130"
          y="280"
          textAnchor="middle"
          className="fill-current"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          opacity="0.45"
        >
          REFUSED
        </text>
      </g>

      {/* Divider */}
      <line x1="260" y1="48" x2="260" y2="290" stroke="currentColor" strokeWidth="1.25" opacity="0.2" />

      {/* Right — forge at home */}
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
          YOUR CENTURION
        </text>
        <path
          d="M330 100 L390 58 L450 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          opacity="0.45"
        />
        <rect
          x="340"
          y="100"
          width="100"
          height="90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.45"
        />
        {/* Anvil / forge spark */}
        <g transform="translate(390, 155)">
          <path
            d="M-28 10 L-18 0 L18 0 L28 10 L20 10 L20 22 L-20 22 L-20 10 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            opacity="0.55"
          />
          <g className="wp-motion">
            <line x1="0" y1="-18" x2="0" y2="-6" stroke="currentColor" strokeWidth="1.5" opacity="0.7">
              <animate attributeName="opacity" values="0.3;0.9;0.3" dur="1.6s" repeatCount="indefinite" />
            </line>
            <line x1="-8" y1="-14" x2="-3" y2="-6" stroke="currentColor" strokeWidth="1" opacity="0.5">
              <animate attributeName="opacity" values="0.2;0.7;0.2" dur="1.6s" begin="0.2s" repeatCount="indefinite" />
            </line>
            <line x1="8" y1="-14" x2="3" y2="-6" stroke="currentColor" strokeWidth="1" opacity="0.5">
              <animate attributeName="opacity" values="0.2;0.7;0.2" dur="1.6s" begin="0.4s" repeatCount="indefinite" />
            </line>
          </g>
        </g>
        {/* Skill scroll emerging */}
        <g className="wp-motion" transform="translate(390, 230)">
          <rect
            x="-40"
            y="-16"
            width="80"
            height="32"
            rx="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            opacity="0.55"
          >
            <animate attributeName="opacity" values="0.35;0.7;0.35" dur="2.8s" repeatCount="indefinite" />
          </rect>
          <line x1="-28" y1="-4" x2="20" y2="-4" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          <line x1="-28" y1="4" x2="12" y2="4" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        </g>
        <text
          x="390"
          y="280"
          textAnchor="middle"
          className="fill-current"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          opacity="0.45"
        >
          SKILL · YOURS ONLY
        </text>
      </g>
    </svg>
  );
}
