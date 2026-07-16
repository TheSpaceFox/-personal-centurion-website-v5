/**
 * Animated security diagrams — same visual language as homepage PrivacyDiagram
 * (mono labels, line art, SMIL motion, prefers-reduced-motion).
 */

const motionCss = `
  @media (prefers-reduced-motion: reduce) {
    .sec-motion { animation: none !important; }
    .sec-motion animate,
    .sec-motion animateTransform,
    .sec-motion animateMotion {
      display: none !important;
    }
  }
`

/** Public AI exfiltrates mail vs Sovereign keeps work under the roof. */
export function CloudVsSovereignDiagram() {
  return (
    <svg
      viewBox="0 0 560 300"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="Comparison: public AI pulls company mail into a vendor cloud; Sovereign keeps work on owner hardware"
    >
      <style>{motionCss}</style>

      <text
        x="280"
        y="24"
        textAnchor="middle"
        className="fill-current"
        fontSize="11"
        fontFamily="ui-monospace, monospace"
        opacity="0.4"
      >
        PUBLIC AI  vs  SOVEREIGN
      </text>

      {/* Left — public AI */}
      <g>
        <text
          x="130"
          y="52"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.55"
        >
          PUBLIC AI
        </text>

        {/* Mail stack */}
        <rect x="70" y="72" width="48" height="32" rx="3" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
        <path d="M70 72 L94 90 L118 72" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <text x="94" y="120" textAnchor="middle" className="fill-current" fontSize="9" fontFamily="ui-monospace, monospace" opacity="0.4">
          MAIL
        </text>

        {/* Packets flying to cloud */}
        <g className="sec-motion">
          <circle r="3" fill="currentColor" opacity="0.45">
            <animateMotion dur="2.8s" repeatCount="indefinite" path="M118 88 L170 100" />
            <animate attributeName="opacity" values="0;0.5;0" dur="2.8s" repeatCount="indefinite" />
          </circle>
          <circle r="2.5" fill="currentColor" opacity="0.35">
            <animateMotion dur="3.2s" begin="0.6s" repeatCount="indefinite" path="M118 95 L175 115" />
            <animate attributeName="opacity" values="0;0.45;0" dur="3.2s" begin="0.6s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Vendor cloud */}
        <g className="sec-motion">
          <path
            d="M155 140 C155 122, 172 112, 190 116 C198 102, 222 102, 230 118 C248 118, 258 132, 254 148 L150 148 C142 148, 138 138, 146 130 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.35"
            opacity="0.5"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 0 -2.5; 0 0"
              dur="4s"
              repeatCount="indefinite"
            />
          </path>
        </g>
        <text x="200" y="172" textAnchor="middle" className="fill-current" fontSize="9" fontFamily="ui-monospace, monospace" opacity="0.4">
          VENDOR CLOUD
        </text>

        {/* Warning pulse */}
        <g className="sec-motion">
          <circle cx="200" cy="210" r="16" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.5">
            <animate attributeName="opacity" values="0.3;0.65;0.3" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <text x="200" y="214" textAnchor="middle" className="fill-current" fontSize="12" fontFamily="ui-monospace, monospace" opacity="0.55">
            !
          </text>
        </g>
        <text x="200" y="248" textAnchor="middle" className="fill-current" fontSize="10" fontFamily="ui-monospace, monospace" opacity="0.4">
          DATA LEAVES
        </text>
      </g>

      {/* Divider */}
      <line x1="280" y1="48" x2="280" y2="270" stroke="currentColor" strokeWidth="1" opacity="0.15" strokeDasharray="4 6" className="sec-motion">
        <animate attributeName="stroke-dashoffset" values="0;20" dur="3.5s" repeatCount="indefinite" />
      </line>

      {/* Right — Sovereign */}
      <g>
        <text
          x="420"
          y="52"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.55"
        >
          SOVEREIGN
        </text>

        {/* Roof + desk machine */}
        <path d="M350 100 L420 58 L490 100" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
        <rect x="360" y="100" width="120" height="88" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.45" />

        <circle cx="420" cy="140" r="28" fill="currentColor" opacity="0.04" className="sec-motion">
          <animate attributeName="opacity" values="0.03;0.08;0.03" dur="3.6s" repeatCount="indefinite" />
          <animate attributeName="r" values="26;32;26" dur="3.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="420" cy="140" r="22" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.55" />
        <circle
          cx="420"
          cy="140"
          r="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.25"
          strokeDasharray="3 4"
          className="sec-motion"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 420 140"
            to="-360 420 140"
            dur="16s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Private orbit */}
        <circle r="3" fill="currentColor" opacity="0.5" className="sec-motion">
          <animateMotion dur="5s" repeatCount="indefinite" path="M420 118 A22 22 0 1 1 419.9 118" />
        </circle>

        <text x="420" y="214" textAnchor="middle" className="fill-current" fontSize="9" fontFamily="ui-monospace, monospace" opacity="0.45">
          UNDER YOUR ROOF
        </text>
        <text x="420" y="248" textAnchor="middle" className="fill-current" fontSize="10" fontFamily="ui-monospace, monospace" opacity="0.45">
          STAYS HOME
        </text>
      </g>
    </svg>
  )
}

/** IdP-controlled mail: Entra / Google → OAuth → Sovereign only; Centurion company blocked. */
export function IdPMailFlowDiagram() {
  return (
    <svg
      viewBox="0 0 560 280"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="Company identity provider grants OAuth to the Sovereign; Centurion Limited never receives mail or tokens"
    >
      <style>{motionCss}</style>

      <text
        x="280"
        y="22"
        textAnchor="middle"
        className="fill-current"
        fontSize="11"
        fontFamily="ui-monospace, monospace"
        opacity="0.4"
      >
        COMPANY MAIL · BEST PRACTICE
      </text>

      {/* IdP box */}
      <g>
        <rect x="24" y="70" width="120" height="72" rx="4" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.5" />
        <text x="84" y="100" textAnchor="middle" className="fill-current" fontSize="11" fontFamily="ui-monospace, monospace" opacity="0.55">
          YOUR IdP
        </text>
        <text x="84" y="118" textAnchor="middle" className="fill-current" fontSize="9" fontFamily="ui-monospace, monospace" opacity="0.4">
          Entra / Google
        </text>
      </g>

      {/* Arrow IdP → Sovereign with traveling packet */}
      <line x1="144" y1="106" x2="250" y2="106" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
      <polygon points="250,106 242,101 242,111" fill="currentColor" opacity="0.4" />
      <text x="197" y="96" textAnchor="middle" className="fill-current" fontSize="9" fontFamily="ui-monospace, monospace" opacity="0.4">
        OAuth · least privilege
      </text>
      <circle r="3.5" fill="currentColor" opacity="0.55" className="sec-motion">
        <animateMotion dur="2.4s" repeatCount="indefinite" path="M150 106 L245 106" />
        <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2.4s" repeatCount="indefinite" />
      </circle>

      {/* Sovereign */}
      <g>
        <rect x="260" y="58" width="140" height="96" rx="4" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.55" />
        <text x="330" y="88" textAnchor="middle" className="fill-current" fontSize="11" fontFamily="ui-monospace, monospace" opacity="0.55">
          SOVEREIGN
        </text>
        <text x="330" y="108" textAnchor="middle" className="fill-current" fontSize="9" fontFamily="ui-monospace, monospace" opacity="0.4">
          Tokens on device
        </text>
        <text x="330" y="124" textAnchor="middle" className="fill-current" fontSize="9" fontFamily="ui-monospace, monospace" opacity="0.4">
          Mail stays local
        </text>
        <circle cx="330" cy="140" r="8" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.45" className="sec-motion">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.8s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Wall to Centurion company */}
      <line
        x1="430"
        y1="48"
        x2="430"
        y2="200"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.3"
      />
      <line
        x1="438"
        y1="48"
        x2="438"
        y2="200"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.15"
        strokeDasharray="4 5"
        className="sec-motion"
      >
        <animate attributeName="stroke-dashoffset" values="0;18" dur="3.2s" repeatCount="indefinite" />
      </line>
      <text x="434" y="42" textAnchor="middle" className="fill-current" fontSize="9" fontFamily="ui-monospace, monospace" opacity="0.35">
        WALL
      </text>

      {/* Centurion Limited — blocked */}
      <g opacity="0.5">
        <rect x="456" y="78" width="88" height="56" rx="3" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
        <text x="500" y="102" textAnchor="middle" className="fill-current" fontSize="9" fontFamily="ui-monospace, monospace" opacity="0.5">
          CENTURION
        </text>
        <text x="500" y="116" textAnchor="middle" className="fill-current" fontSize="9" fontFamily="ui-monospace, monospace" opacity="0.45">
          LIMITED
        </text>
      </g>

      {/* Blocked probe */}
      <circle r="2.5" fill="currentColor" opacity="0" className="sec-motion">
        <animate attributeName="cx" values="400;428;428" keyTimes="0;0.55;1" dur="3s" repeatCount="indefinite" />
        <animate attributeName="cy" values="106;106;106" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.5;0" keyTimes="0;0.4;1" dur="3s" repeatCount="indefinite" />
      </circle>
      <g className="sec-motion">
        <circle cx="500" cy="160" r="14" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <line x1="492" y1="152" x2="508" y2="168" stroke="currentColor" strokeWidth="1.3" opacity="0.5" />
        <line x1="508" y1="152" x2="492" y2="168" stroke="currentColor" strokeWidth="1.3" opacity="0.5" />
      </g>
      <text x="500" y="196" textAnchor="middle" className="fill-current" fontSize="9" fontFamily="ui-monospace, monospace" opacity="0.4">
        NO MAIL RELAY
      </text>

      {/* Footnote */}
      <text x="280" y="248" textAnchor="middle" className="fill-current" fontSize="10" fontFamily="ui-monospace, monospace" opacity="0.4">
        IT CONTROLS CONSENT · REVOKE ANYTIME
      </text>
    </svg>
  )
}

/** Compact four-pillar overview for homepage summary. */
export function SecurityPillarsDiagram() {
  return (
    <svg
      viewBox="0 0 520 240"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="Four security pillars: owned hardware, Crypto Chat, offline option, IdP-controlled mail"
    >
      <style>{motionCss}</style>

      <text
        x="260"
        y="22"
        textAnchor="middle"
        className="fill-current"
        fontSize="11"
        fontFamily="ui-monospace, monospace"
        opacity="0.4"
      >
        SECURITY MODEL
      </text>

      {[
        { x: 70, label: 'OWNED', sub: 'HARDWARE' },
        { x: 190, label: 'CRYPTO', sub: 'CHAT' },
        { x: 310, label: 'OFFLINE', sub: 'CAPABLE' },
        { x: 430, label: 'IdP', sub: 'MAIL' },
      ].map((node, i) => (
        <g key={node.label}>
          <circle
            cx={node.x}
            cy="100"
            r="36"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            opacity="0.45"
            className="sec-motion"
          >
            <animate
              attributeName="opacity"
              values="0.35;0.6;0.35"
              dur={`${2.8 + i * 0.35}s`}
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx={node.x}
            cy="100"
            r="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.25"
            strokeDasharray="3 4"
            className="sec-motion"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${node.x} 100`}
              to={`${i % 2 === 0 ? 360 : -360} ${node.x} 100`}
              dur={`${14 + i * 2}s`}
              repeatCount="indefinite"
            />
          </circle>
          <text
            x={node.x}
            y="96"
            textAnchor="middle"
            className="fill-current"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
            opacity="0.55"
          >
            {node.label}
          </text>
          <text
            x={node.x}
            y="110"
            textAnchor="middle"
            className="fill-current"
            fontSize="9"
            fontFamily="ui-monospace, monospace"
            opacity="0.4"
          >
            {node.sub}
          </text>
          {i < 3 && (
            <line
              x1={node.x + 40}
              y1="100"
              x2={node.x + 80}
              y2="100"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.2"
              strokeDasharray="3 4"
              className="sec-motion"
            >
              <animate attributeName="stroke-dashoffset" values="0;-14" dur="2s" repeatCount="indefinite" />
            </line>
          )}
        </g>
      ))}

      {/* Pulse traveling across pillars */}
      <circle r="3" fill="currentColor" opacity="0.5" className="sec-motion">
        <animateMotion dur="4.5s" repeatCount="indefinite" path="M70 100 L430 100" />
        <animate attributeName="opacity" values="0;0.6;0" dur="4.5s" repeatCount="indefinite" />
      </circle>

      <text
        x="260"
        y="175"
        textAnchor="middle"
        className="fill-current"
        fontSize="10"
        fontFamily="ui-monospace, monospace"
        opacity="0.4"
      >
        PRIVATE WORLD STAYS ON YOUR SOVEREIGN
      </text>
      <text
        x="260"
        y="198"
        textAnchor="middle"
        className="fill-current"
        fontSize="10"
        fontFamily="ui-monospace, monospace"
        opacity="0.35"
      >
        CENTURION LIMITED NEVER HOSTS IT
      </text>
    </svg>
  )
}

/** Animated trust wall — homepage-style alternative to static whitepaper diagram. */
export function AnimatedTrustBoundaryDiagram() {
  return (
    <svg
      viewBox="0 0 520 300"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="Trust boundary: private Sovereign and owner network on one side; Centurion company and public chat outside"
    >
      <style>{motionCss}</style>

      <text
        x="260"
        y="24"
        textAnchor="middle"
        className="fill-current"
        fontSize="11"
        fontFamily="ui-monospace, monospace"
        opacity="0.4"
      >
        TRUST BOUNDARY
      </text>

      {/* Private vault */}
      <ellipse
        cx="170"
        cy="155"
        rx="130"
        ry="95"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.4"
        className="sec-motion"
      >
        <animate attributeName="opacity" values="0.3;0.5;0.3" dur="4s" repeatCount="indefinite" />
      </ellipse>
      <text x="170" y="88" textAnchor="middle" className="fill-current" fontSize="11" fontFamily="ui-monospace, monospace" opacity="0.5">
        PRIVATE
      </text>
      <circle cx="170" cy="145" r="28" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.55" />
      <circle
        cx="170"
        cy="145"
        r="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.25"
        strokeDasharray="3 4"
        className="sec-motion"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 170 145"
          to="-360 170 145"
          dur="15s"
          repeatCount="indefinite"
        />
      </circle>
      <circle r="3" fill="currentColor" opacity="0.5" className="sec-motion">
        <animateMotion dur="5s" repeatCount="indefinite" path="M170 117 A28 28 0 1 1 169.9 117" />
      </circle>
      <text x="170" y="210" textAnchor="middle" className="fill-current" fontSize="9" fontFamily="ui-monospace, monospace" opacity="0.4">
        SOVEREIGN · CRYPTO CHAT
      </text>
      <text x="170" y="228" textAnchor="middle" className="fill-current" fontSize="9" fontFamily="ui-monospace, monospace" opacity="0.35">
        YOUR NETWORK
      </text>

      {/* Wall */}
      <line x1="320" y1="50" x2="320" y2="260" stroke="currentColor" strokeWidth="2" opacity="0.35" />
      <line
        x1="328"
        y1="50"
        x2="328"
        y2="260"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.15"
        strokeDasharray="4 6"
        className="sec-motion"
      >
        <animate attributeName="stroke-dashoffset" values="0;20" dur="3.8s" repeatCount="indefinite" />
      </line>
      <text x="324" y="44" textAnchor="middle" className="fill-current" fontSize="9" fontFamily="ui-monospace, monospace" opacity="0.35">
        WALL
      </text>

      {/* Outside */}
      <g opacity="0.55">
        <text x="420" y="88" textAnchor="middle" className="fill-current" fontSize="11" fontFamily="ui-monospace, monospace" opacity="0.6">
          OUTSIDE
        </text>
        <path
          d="M380 130 C380 112, 396 102, 412 106 C420 92, 444 92, 452 108 C470 108, 480 122, 476 138 L376 138 C368 138, 364 128, 372 120 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.45"
          className="sec-motion"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 0 -2; 0 0"
            dur="4.2s"
            repeatCount="indefinite"
          />
        </path>
        <text x="420" y="162" textAnchor="middle" className="fill-current" fontSize="9" fontFamily="ui-monospace, monospace" opacity="0.4">
          PUBLIC CHAT
        </text>
        <rect x="378" y="180" width="84" height="36" rx="3" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
        <text x="420" y="202" textAnchor="middle" className="fill-current" fontSize="9" fontFamily="ui-monospace, monospace" opacity="0.4">
          COMPANY
        </text>
      </g>

      {/* Blocked approach */}
      <circle r="2.5" fill="currentColor" opacity="0" className="sec-motion">
        <animate attributeName="cx" values="280;316;316" keyTimes="0;0.55;1" dur="3.4s" repeatCount="indefinite" />
        <animate attributeName="cy" values="145;145;145" dur="3.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.5;0" keyTimes="0;0.4;1" dur="3.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}
