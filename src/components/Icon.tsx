export type IconName =
  | 'check'
  | 'search'
  | 'arrow'
  | 'stack'
  | 'grid'
  | 'lang'
  | 'pin'
  | 'user'
  | 'pen'
  | 'code'
  | 'flag'
  | 'clock'
  | 'users'
  | 'headset'
  | 'eye'
  | 'phone'
  | 'window'
  | 'box'
  | 'truck'
  | 'shield'
  | 'wallet'
  | 'spark'

export function Icon({ name, className = 'h-5 w-5' }: { name: IconName; className?: string }) {
  const common = { viewBox: '0 0 24 24', className, 'aria-hidden': true as const, fill: 'none' }
  switch (name) {
    case 'check':
      return (
        <svg {...common}>
          <path d="M5 12.5 9.2 17 19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'search':
      return (
        <svg {...common} className={`${className} mirror`}>
          <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    case 'arrow':
      return (
        <svg {...common} className={`${className} mirror`}>
          <path d="M4 12h16M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'stack':
      return (
        <svg {...common}>
          <path d="m12 3 8 4.5-8 4.5L4 7.5 12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="m4 12 8 4.5 8-4.5M4 16.5 12 21l8-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      )
    case 'grid':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
          <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
          <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
          <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )
    case 'lang':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 12h16M12 4c2.4 2.6 3.6 5.2 3.6 8s-1.2 5.4-3.6 8c-2.4-2.6-3.6-5.2-3.6-8s1.2-5.4 3.6-8Z" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )
    case 'pin':
      return (
        <svg {...common}>
          <path d="M12 21s6-5.1 6-10a6 6 0 1 0-12 0c0 4.9 6 10 6 10Z" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )
    case 'user':
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M5.5 19.2c1.2-2.6 3.5-4 6.5-4s5.3 1.4 6.5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'pen':
      return (
        <svg {...common}>
          <path d="M4 20h4L19 9l-4-4L4 16v4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="m13 7 4 4" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )
    case 'code':
      return (
        <svg {...common}>
          <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 6l-2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'flag':
      return (
        <svg {...common}>
          <path d="M6 21V4M6 5h9l-1.5 3.5L15 12H6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 8v4.5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'users':
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="16" cy="10" r="2.1" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4.8 18c.7-2.2 2.4-3.4 4.2-3.4s3.5 1.2 4.2 3.4M13.2 14.8c1.5-.2 3 .4 3.8 2.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'headset':
      return (
        <svg {...common}>
          <path d="M5 13v-1a7 7 0 0 1 14 0v1" stroke="currentColor" strokeWidth="1.6" />
          <rect x="3.5" y="13" width="4" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <rect x="16.5" y="13" width="4" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )
    case 'eye':
      return (
        <svg {...common}>
          <path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12Z" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )
    case 'phone':
      return (
        <svg {...common}>
          <rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M11 18h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'window':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 9h18" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )
    case 'box':
      return (
        <svg {...common}>
          <path d="m12 3 8 4v10l-8 4-8-4V7l8-4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M12 12 20 7.5M12 12v9M12 12 4 7.5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )
    case 'truck':
      return (
        <svg {...common} className={`${className} mirror`}>
          <path d="M3 7h11v8H3V7Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M14 10h4l3 3v2h-7v-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <circle cx="7" cy="17.5" r="1.5" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="17" cy="17.5" r="1.5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3 19 6v6c0 4.2-2.8 6.8-7 8-4.2-1.2-7-3.8-7-8V6l7-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      )
    case 'wallet':
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="16" cy="14" r="1" fill="currentColor" />
        </svg>
      )
    case 'spark':
      return (
        <svg {...common}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
  }
}
