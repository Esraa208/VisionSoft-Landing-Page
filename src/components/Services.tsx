import type { Copy, Lang } from '../content'
import { cx } from '../cx'
import { Icon, type IconName } from './Icon'
import { SectionHeading } from './SectionHeading'

const icons: IconName[] = ['box', 'pin', 'spark', 'stack']

export function Services({ copy, lang }: { copy: Copy['services']; lang: Lang }) {
  return (
    <section id="services" className="px-5 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} lang={lang} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {copy.items.map((card, index) => {
            const featured = index === 0
            return (
              <li
                key={card.title}
                className={cx(
                  'relative overflow-hidden rounded-3xl',
                  featured
                    ? 'bg-navy p-6 text-white shadow-[0_24px_60px_-32px_rgba(12,39,68,0.7)] sm:p-8'
                    : 'bg-white px-5 py-5 shadow-[0_16px_36px_-26px_rgba(12,39,68,0.35)] ring-1 ring-ink/8',
                )}
              >
                {featured && (
                  <Icon name="box" className="pointer-events-none absolute -bottom-8 -end-6 h-44 w-44 text-white/10" />
                )}
                {featured ? (
                  <>
                    <div className="relative flex items-center justify-between gap-3">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-signal text-ink">
                        <Icon name={icons[index] ?? 'spark'} />
                      </span>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-signal">{card.tag}</span>
                    </div>
                    <h3 className="relative mt-6 text-xl font-bold leading-snug">{card.title}</h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-white/70">{card.body}</p>
                  </>
                ) : (
                  <>
                    <span className="inline-flex rounded-full bg-canvas px-2.5 py-1 text-[11px] font-semibold text-mist">{card.tag}</span>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-signal-soft text-signal-deep">
                        <Icon name={icons[index] ?? 'spark'} className="h-5 w-5" />
                      </span>
                      <h3 className="text-base font-semibold leading-snug text-ink">{card.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-mist">{card.body}</p>
                  </>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
