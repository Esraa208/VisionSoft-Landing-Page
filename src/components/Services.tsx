import type { Copy, Lang } from '../content'
import { displayFont } from '../content'
import { cx } from '../cx'
import { Icon, type IconName } from './Icon'
import { SectionHeading } from './SectionHeading'

const icons: IconName[] = ['box', 'pin', 'spark', 'stack']

export function Services({ copy, lang }: { copy: Copy['services']; lang: Lang }) {
  const cards = copy.items

  return (
    <section id="services" className="px-5 pb-8">
      <div className="mx-auto max-w-6xl rounded-[32px] bg-canvas-deep px-5 py-16 sm:px-10 lg:py-20">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} lang={lang} />
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {cards.map((card, index) => (
            <li key={card.title} className="lift rounded-3xl bg-card p-6 shadow-[0_10px_40px_rgba(16,19,26,0.05)] ring-1 ring-white">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal/15 text-teal-deep shadow-[inset_0_0_0_1px_rgba(12,111,120,0.12)]">
                  <Icon name={icons[index] ?? 'spark'} />
                </span>
                <span className="rounded-full bg-canvas-deep px-2.5 py-1 text-[11px] font-semibold text-mist">{card.tag}</span>
              </div>
              <h3 className={cx('mt-6 text-xl font-bold', displayFont(lang))}>{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{card.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
