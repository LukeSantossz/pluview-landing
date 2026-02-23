// Custom SVG icons for institutions

export function InstitutoCultivarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Seedling / Plant representing cultivation */}
      <path d="M12 22V12" />
      <path d="M12 12C12 12 8 8 8 5C8 3 10 2 12 2C14 2 16 3 16 5C16 8 12 12 12 12Z" />
      <path d="M7 15C4 15 3 17 3 19C3 21 5 22 7 22" />
      <path d="M17 15C20 15 21 17 21 19C21 21 19 22 17 22" />
    </svg>
  )
}

export function GrupoProgressoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Growth chart / Progress arrow */}
      <path d="M3 20L9 14L13 18L21 10" />
      <path d="M17 10H21V14" />
      {/* Ground line */}
      <path d="M3 22H21" />
    </svg>
  )
}

export function PluViewLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
    >
      {/* Background circle */}
      <circle cx="32" cy="32" r="30" fill="url(#pluview-gradient)" />

      {/* Rain drop / Data point */}
      <path
        d="M32 14C32 14 22 28 22 36C22 41.5228 26.4772 46 32 46C37.5228 46 42 41.5228 42 36C42 28 32 14 32 14Z"
        fill="white"
        opacity="0.95"
      />

      {/* Signal waves (IoT representation) */}
      <path
        d="M18 48C18 48 24 44 32 44C40 44 46 48 46 48"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M14 52C14 52 22 46 32 46C42 46 50 52 50 52"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* Center data point */}
      <circle cx="32" cy="36" r="4" fill="url(#pluview-gradient)" opacity="0.9" />

      <defs>
        <linearGradient id="pluview-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  )
}
