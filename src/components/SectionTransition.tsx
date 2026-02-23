interface SectionTransitionProps {
  position: 'top' | 'bottom'
  variant?: 'wave' | 'curve' | 'gradient'
  flip?: boolean
}

export default function SectionTransition({ position, variant = 'curve', flip = false }: SectionTransitionProps) {
  if (variant === 'gradient') {
    return (
      <div
        className={`absolute left-0 right-0 h-32 pointer-events-none z-10 ${
          position === 'top' ? 'top-0' : 'bottom-0'
        }`}
        style={{
          background: position === 'top'
            ? 'linear-gradient(to bottom, var(--bg-base), transparent)'
            : 'linear-gradient(to top, var(--bg-base), transparent)'
        }}
      />
    )
  }

  if (variant === 'wave') {
    return (
      <div
        className={`absolute left-0 right-0 z-10 ${position === 'top' ? 'top-0' : 'bottom-0'}`}
        style={{ transform: flip ? 'scaleY(-1)' : 'none' }}
      >
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
          style={{ display: 'block', marginBottom: '-1px' }}
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V120Z"
            fill="var(--bg-base)"
          />
        </svg>
      </div>
    )
  }

  // Default: curve
  return (
    <div
      className={`absolute left-0 right-0 z-10 overflow-hidden ${
        position === 'top' ? '-top-px' : '-bottom-px'
      }`}
      style={{ transform: position === 'bottom' ? 'rotate(180deg)' : 'none' }}
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-16 sm:h-20"
        preserveAspectRatio="none"
      >
        <path
          d="M0 80L48 74.7C96 69 192 59 288 53.3C384 48 480 48 576 50.7C672 53 768 59 864 58.7C960 59 1056 53 1152 48C1248 43 1344 37 1392 34.7L1440 32V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V80Z"
          fill="var(--bg-base)"
        />
      </svg>
    </div>
  )
}
