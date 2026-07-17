/** Line-art hardware for the Secure yours pricing cards — matches homepage diagram style. */

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

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
      <div className="flex h-40 items-center justify-center sm:h-44">{children}</div>
      <figcaption
        className={`mt-3 text-center font-mono text-[10px] tracking-widest uppercase sm:text-xs ${labelClassName}`}
      >
        {label}
      </figcaption>
    </figure>
  )
}

function SvgShell({
  children,
  ariaLabel,
  className,
  inverted,
}: {
  children: ReactNode
  ariaLabel: string
  className?: string
  inverted?: boolean
}) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={cn(
        'h-full w-full',
        inverted ? 'text-[#f4f1ec]' : 'text-foreground',
        className,
      )}
      role="img"
      aria-label={ariaLabel}
    >
      {children}
    </svg>
  )
}

/** MSI Cubi-style compact mini PC — Sovereign personal edition. */
export function SovereignHardwareArt({
  className = '',
  labelClassName = 'text-muted-foreground',
  inverted = false,
}: {
  className?: string
  labelClassName?: string
  inverted?: boolean
}) {
  return (
    <IllustrationFrame
      className={className}
      labelClassName={labelClassName}
      label="Sovereign brain · MSI Cubi mini"
    >
      <SvgShell
        ariaLabel="Line drawing of a compact MSI Cubi mini PC"
        className="max-w-[240px]"
        inverted={inverted}
      >
        {/* Top face */}
        <path
          d="M52 28 L148 28 L168 42 L72 42 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          opacity="0.55"
        />
        {/* Side face */}
        <path
          d="M148 28 L168 42 L168 88 L148 74 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          opacity="0.65"
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
          strokeWidth="2"
          opacity="0.9"
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
            strokeWidth="1.25"
            opacity="0.4"
          />
        ))}
        {/* Power / status */}
        <circle cx="132" cy="56" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.75" />
        <circle cx="132" cy="56" r="1.5" fill="currentColor" opacity="0.7" />
        {/* Front ports */}
        <rect x="64" y="78" width="14" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.55" />
        <rect x="82" y="78" width="10" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.5" />
        <rect x="96" y="78" width="10" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.5" />
        <text
          x="78"
          y="70"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          fill="currentColor"
          opacity="0.5"
          letterSpacing="0.12em"
        >
          MINI
        </text>
        <line x1="40" y1="96" x2="176" y2="96" stroke="currentColor" strokeWidth="1.25" opacity="0.35" />
      </SvgShell>
    </IllustrationFrame>
  )
}

function LogoMarkRow({
  count,
  showPlus = false,
  inverted = false,
  ariaLabel,
}: {
  count: number
  showPlus?: boolean
  inverted?: boolean
  ariaLabel: string
}) {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-center gap-2 sm:gap-3',
        count >= 4 ? 'max-w-[320px]' : 'max-w-[260px]',
        inverted && 'brightness-0 invert',
      )}
      role="img"
      aria-label={ariaLabel}
    >
      {Array.from({ length: count }, (_, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src="/logo-full.png"
          alt=""
          width={120}
          height={128}
          className={cn(
            'shrink-0 object-contain object-center',
            count >= 4 ? 'h-14 w-auto sm:h-16' : 'h-16 w-auto sm:h-[4.5rem]',
          )}
          aria-hidden
        />
      ))}
      {showPlus && (
        <span
          className={cn(
            'select-none font-display text-2xl leading-none sm:text-3xl',
            inverted ? 'text-[#f4f1ec]' : 'text-foreground',
          )}
          aria-hidden
        >
          +
        </span>
      )}
    </div>
  )
}

/** Four logo marks + plus — Prime Board (marble & brass, min. four). */
export function PrimeHardwareArt({
  className = '',
  labelClassName = 'text-muted-foreground',
  inverted = false,
}: {
  className?: string
  labelClassName?: string
  inverted?: boolean
}) {
  return (
    <IllustrationFrame
      className={className}
      labelClassName={labelClassName}
      label="Prime Board · marble & brass"
    >
      <LogoMarkRow
        count={4}
        showPlus
        inverted={inverted}
        ariaLabel="Four Centurion logo marks in a row with a plus, for Prime Board"
      />
    </IllustrationFrame>
  )
}

/** Three logo marks — Prime Pilot (walnut & copper, min. three). */
export function PrimePilotHardwareArt({
  className = '',
  labelClassName = 'text-muted-foreground',
  inverted = false,
}: {
  className?: string
  labelClassName?: string
  inverted?: boolean
}) {
  return (
    <IllustrationFrame
      className={className}
      labelClassName={labelClassName}
      label="Prime Pilot · walnut & copper"
    >
      <LogoMarkRow
        count={3}
        inverted={inverted}
        ariaLabel="Three Centurion logo marks in a row for Prime Pilot"
      />
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
  /** Dark beta card — light stroke + caption */
  inverted?: boolean
}) {
  const labelClass = inverted ? 'text-[#f4f1ec]/65' : 'text-muted-foreground'
  const props = { className, labelClassName: labelClass, inverted }

  if (planId === 'personal') {
    return <SovereignHardwareArt {...props} />
  }
  if (planId === 'pilot') {
    return <PrimePilotHardwareArt {...props} />
  }
  return <PrimeHardwareArt {...props} />
}
