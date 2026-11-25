import type { Copy, Lang } from '../content'
import { displayFont } from '../content'
import { cx } from '../cx'
import { Icon, type IconName } from './Icon'
import { SectionHeading } from './SectionHeading'

const icons: IconName[] = ['spark', 'pin', 'shield', 'wallet', 'grid', 'headset']

export function Why({ copy, lang }: { copy: Copy['why']; lang: Lang }) {
  return (
    <section id="why" className="mx-auto max-w-6xl px-5 py-20 lg:py-24">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} lang={lang} />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {copy.points.map((point, index) => (
          <li key={point.title} className="lift rounded-3xl bg-card p-6 shadow-[0_10px_40px_rgba(16,19,26,0.05)] ring-1 ring-ink/5">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal/15 shadow-[inset_0_0_0_1px_rgba(12,111,120,0.12)] text-teal-deep">
              <Icon name={icons[index] ?? 'spark'} />
            </span>
            <h3 className={cx('mt-5 text-lg font-bold', displayFont(lang))}>{point.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">{point.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
