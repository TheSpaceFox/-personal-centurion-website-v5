export function FamilyBeneficiaryDiagram() {
  return (
    <svg
      viewBox="0 0 520 320"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="Diagram: four colleague purchases earn one complimentary Centurion for a nominated family beneficiary"
    >
      <text
        x="260"
        y="28"
        textAnchor="middle"
        className="fill-current"
        fontSize="12"
        fontFamily="ui-monospace, monospace"
        opacity="0.4"
      >
        4 COLLEAGUES  →  1 FAMILY CENTURION
      </text>

      {/* Four colleague markers */}
      <g>
        <text
          x="120"
          y="58"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.45"
        >
          COLLEAGUES WHO BUY
        </text>
        {[0, 1, 2, 3].map((i) => {
          const x = 48 + i * 48;
          return (
            <g key={i}>
              <circle
                cx={x + 24}
                cy="110"
                r="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.5"
              />
              <circle cx={x + 24} cy="102" r="7" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.45" />
              <path
                d={`M${x + 10} 128 Q${x + 24} 118 ${x + 38} 128`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                opacity="0.4"
              />
              <text
                x={x + 24}
                y="152"
                textAnchor="middle"
                className="fill-current"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                opacity="0.4"
              >
                {i + 1}
              </text>
            </g>
          );
        })}
      </g>

      {/* Flow arrows down to reward */}
      <g opacity="0.4">
        <path
          d="M120 168 L120 192"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeDasharray="4 5"
        />
        <path
          d="M100 185 L120 198 L140 185"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        />
      </g>

      {/* Gift / family Centurion */}
      <g>
        <text
          x="380"
          y="58"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.55"
        >
          FOR SOMEONE YOU LOVE
        </text>

        {/* Connecting arcs from colleagues cluster to gift */}
        <path
          id="fbpGiftPath"
          d="M220 120 C 280 100, 300 130, 340 160"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeDasharray="4 6"
          opacity="0.45"
        />
        <circle r="3.5" fill="currentColor" opacity="0.5">
          <animateMotion dur="2.8s" repeatCount="indefinite">
            <mpath href="#fbpGiftPath" />
          </animateMotion>
        </circle>

        {/* Home roof over gift Centurion */}
        <path
          d="M320 175 L380 130 L440 175"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <rect
          x="335"
          y="175"
          width="90"
          height="70"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.4"
        />
        {/* Sphere gift */}
        <circle cx="380" cy="205" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <circle
          cx="380"
          cy="205"
          r="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.25"
          strokeDasharray="3 4"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 380 205"
            to="360 380 205"
            dur="16s"
            repeatCount="indefinite"
          />
        </circle>
        <path
          d="M366 205 Q380 196 394 205 Q380 214 366 205"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.4"
        />
        {/* Soft gift mark */}
        <line x1="380" y1="178" x2="380" y2="188" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <line x1="370" y1="183" x2="390" y2="183" stroke="currentColor" strokeWidth="1" opacity="0.3" />

        <text
          x="380"
          y="278"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.45"
        >
          COMPLIMENTARY CENTURION
        </text>
      </g>

      <text
        x="260"
        y="308"
        textAnchor="middle"
        className="fill-current"
        fontSize="11"
        fontFamily="ui-monospace, monospace"
        opacity="0.35"
      >
        FAMILY ARE THE REWARD · NOT THE REFERRAL
      </text>
    </svg>
  );
}
