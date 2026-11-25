import type { Copy, Lang } from '../content'
import { displayFont } from '../content'
import { cx } from '../cx'
import { Icon } from './Icon'
import { Mark } from './Mark'

export function Work({ copy, lang }: { copy: Copy['work']; lang: Lang }) {
  return (
    <section id="work" className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 lg:grid-cols-2 lg:py-28">
      <div>
        <p className="inline-flex rounded-full bg-teal/15 px-3 py-1 text-xs font-semibold text-teal-deep">{copy.eyebrow}</p>
        <h2 className={cx('mt-4 text-3xl font-bold tracking-tight sm:text-5xl', displayFont(lang))}>{copy.title}</h2>
        <p className="mt-4 text-base leading-relaxed text-mist sm:text-lg">{copy.lede}</p>
        <ul className="mt-8 grid gap-3">
          {copy.items.map((item) => (
            <li
              key={item.title}
              className="flex items-center justify-between gap-4 rounded-2xl bg-card px-4 py-4 shadow-[0_8px_24px_rgba(16,19,26,0.04)] ring-1 ring-ink/5"
            >
              <span className="text-sm font-semibold sm:text-base">{item.title}</span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-teal/15 text-teal-deep">
                <Icon name="check" className="h-4 w-4" />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex min-h-80 flex-col items-center justify-center rounded-[32px] bg-gradient-to-br from-[#123056] via-panel to-ink px-8 py-12 text-center text-white shadow-[0_24px_60px_rgba(7,21,37,0.22)]">
        <span className="flex h-28 w-28 items-center justify-center rounded-[28px] bg-white text-ink shadow-xl">
          <Mark className="h-16 w-16" />
        </span>
        <p className={cx('mt-6 text-xl font-bold', lang === 'en' && 'font-display')}>Vision Soft</p>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/60">{copy.panel}</p>
      </div>
    </section>
  )
}
