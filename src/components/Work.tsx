import type { Copy, Lang } from '../content'
import { cx } from '../cx'
import { Icon } from './Icon'
import { Mark } from './Mark'
import { SectionHeading } from './SectionHeading'

export function Work({ copy, lang }: { copy: Copy['work']; lang: Lang }) {
  return (
    <section id="work" className="paper-grid px-5 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} lang={lang} />
      <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <ul className="grid gap-3">
          {copy.items.map((item) => (
            <li key={item.title} className="flex items-center gap-3 rounded-2xl bg-card px-4 py-4 ring-1 ring-ink/8">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal text-ink">
                <Icon name="check" className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold sm:text-base">{item.title}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative min-h-96 overflow-hidden rounded-[32px] bg-navy px-8 py-12 text-white shadow-[0_24px_60px_-32px_rgba(12,39,68,0.7)]">
        <div aria-hidden="true" className="map-dots pointer-events-none absolute inset-0" />
        <RoutePanel />
        <div className="relative flex h-full flex-col items-start justify-between gap-10">
          <span className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-white text-navy shadow-xl">
            <Mark className="h-12 w-12" />
          </span>
          <div>
            <p className={cx('text-2xl font-bold', lang === 'en' && 'font-display tracking-tight')}>Vision Soft</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/65">{copy.panel}</p>
          </div>
        </div>
      </div>
      </div>
      </div>
    </section>
  )
}

function RoutePanel() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 480 520"
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
    >
      <path
        d="M40 420C120 360 150 300 220 280S340 220 390 120"
        stroke="url(#work-route)"
        strokeWidth="3"
        strokeDasharray="2 10"
        strokeLinecap="round"
        className="route-path"
      />
      <circle cx="40" cy="420" r="8" className="fill-route" />
      <circle cx="220" cy="280" r="8" className="fill-amber" />
      <circle cx="390" cy="120" r="10" className="fill-signal" />
      <defs>
        <linearGradient id="work-route" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: 'var(--color-route)' }} />
          <stop offset="1" style={{ stopColor: 'var(--color-signal)' }} />
        </linearGradient>
      </defs>
    </svg>
  )
}
