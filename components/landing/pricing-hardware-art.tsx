/** Line-art hardware for the Secure yours pricing cards — matches homepage diagram style. */

import type { ReactNode } from 'react'

function IllustrationFrame({
  children,
  label,
  className = '',
  labelClassName = '',
}: {
  children: ReactNode
  label: string
  className?: string
  labelClassName?: string
}) {
  return (
    <figure className={className}>
      <div className="flex h-32 items-center justify-center sm:h-36">{children}</div>
      <figcaption
        className={`mt-2 text-center font-mono text-[10px] tracking-widest uppercase sm:text-xs ${labelClassName}`}
      >
        {label}
      </figcaption>
    </figure>
  )
}

/** MSI Cubi-style compact mini PC — Sovereign personal edition. */
export function SovereignHardwareArt({
  className = '',
  labelClassName = 'text-muted-foreground',
}: {
  className?: string
  labelClassName?: string
}) {
  return (
    <IllustrationFrame
      className={className}
      labelClassName={labelClassName}
      label="Sovereign brain · MSI Cubi mini"
    >
      <svg
        viewBox="0 0 200 120"
        className="h-full w-full max-w-[220px] text-foreground"
        role="img"
        aria-label="Line drawing of a compact MSI Cubi mini PC"
      >
        {/* Top face */}
        <path
          d="M52 28 L148 28 L168 42 L72 42 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.35"
        />
        {/* Side face */}
        <path
          d="M148 28 L168 42 L168 88 L148 74 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.45"
        />
        {/* Front face */}
        <rect
          x="52"
          y="42"
          width="96"
          height="46"
          rx="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          opacity="0.7"
        />
        {/* Vent slots */}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1="62"
            y1={52 + i * 8}
            x2="138"
            y2={52 + i * 8}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.25"
          />
        ))}
        {/* Power / status */}
        <circle cx="132" cy="56" r="3" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.55" />
        <circle cx="132" cy="56" r="1.2" fill="currentColor" opacity="0.45" />
        {/* Front ports */}
        <rect x="64" y="78" width="14" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <rect x="82" y="78" width="10" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <rect x="96" y="78" width="10" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        {/* MSI wordmark area — abstract lines, not trademark */}
        <text
          x="78"
          y="70"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          fill="currentColor"
          opacity="0.35"
          letterSpacing="0.12em"
        >
          MINI
        </text>
        {/* Desk line */}
        <line x1="40" y1="96" x2="176" y2="96" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      </svg>
    </IllustrationFrame>
  )
}

function LogoSphere({ x, y, r, opacity = 0.65 }: { x: number; y: number; r: number; opacity?: number }) {
  return (
    <g opacity={opacity}>
      <circle cx={x} cy={y} r={r} fill="none" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx={x} cy={y} rx={r} ry={r * 0.32} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <ellipse cx={x} cy={y} rx={r * 0.32} ry={r} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <circle cx={x - r * 0.22} cy={y - r * 0.18} r={r * 0.12} fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.35" />
    </g>
  )
}

function LogoPedestal({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <path
      d={`M${x - w} ${y} L${x + w} ${y} L${x + w * 0.72} ${y + 14} L${x - w * 0.72} ${y + 14} Z`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      opacity="0.45"
    />
  )
}

/** Brand mark sphere on pedestal — Prime board edition. */
export function PrimeHardwareArt({
  className = '',
  labelClassName = 'text-muted-foreground',
}: {
  className?: string
  labelClassName?: string
}) {
  return (
    <IllustrationFrame
      className={className}
      labelClassName={labelClassName}
      label="Prime · Centurion mark"
    >
      <svg
        viewBox="0 0 200 120"
        className="h-full w-full max-w-[200px] text-foreground"
        role="img"
        aria-label="Line drawing of the Centurion logo sphere on its pedestal"
      >
        <LogoSphere x={100} y={48} r={26} />
        <LogoPedestal x={100} y={76} w={34} />
        <line x1="66" y1="96" x2="134" y2="96" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      </svg>
    </IllustrationFrame>
  )
}

/** Three logo marks — Prime Pilot (three Sovereign units). */
export function PrimePilotHardwareArt({
  className = '',
  labelClassName = 'text-muted-foreground',
}: {
  className?: string
  labelClassName?: string
}) {
  return (
    <IllustrationFrame
      className={className}
      labelClassName={labelClassName}
      label="Prime Pilot · three units"
    >
      <svg
        viewBox="0 0 200 120"
        className="h-full w-full max-w-[240px] text-foreground"
        role="img"
        aria-label="Line drawing of three Centurion logo spheres for Prime Pilot"
      >
        {[
          { x: 52, y: 50, r: 18 },
          { x: 100, y: 46, r: 20 },
          { x: 148, y: 50, r: 18 },
        ].map((s) => (
          <g key={s.x}>
            <LogoSphere x={s.x} y={s.y} r={s.r} opacity={0.6} />
            <LogoPedestal x={s.x} y={s.y + s.r + 2} w={s.r * 0.9} />
          </g>
        ))}
        <line x1="36" y1="96" x2="164" y2="96" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      </svg>
    </IllustrationFrame>
  )
}

export function PricingHardwareArt({
  planId,
  className = '',
  inverted = false,
}: {
  planId: 'personal' | 'pilot' | 'board'
  className?: string
  /** Dark beta card — lighten caption */
  inverted?: boolean
}) {
  const labelClass = inverted ? 'text-[#f4f1ec]/55' : 'text-muted-foreground'

  if (planId === 'personal') {
    return <SovereignHardwareArt className={className} labelClassName={labelClass} />
  }
  if (planId === 'pilot') {
    return <PrimePilotHardwareArt className={className} labelClassName={labelClass} />
  }
  return <PrimeHardwareArt className={className} labelClassName={labelClass} />
}
