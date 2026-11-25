import type { Copy, Lang } from '../content'
import { displayFont } from '../content'
import { cx } from '../cx'
import { Icon, type IconName } from './Icon'
import { SectionHeading } from './SectionHeading'

const icons: IconName[] = ['spark', 'pin', 'shield', 'wallet', 'grid', 'headset']

export function Why({ copy, lang }: { copy: Copy['why']; lang: Lang }) {
  return (
    <section id="why" className="paper-grid px-5 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} lang={lang} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {copy.points.map((point, index) => (
            <li
              key={point.title}
              className="lift group relative overflow-hidden rounded-3xl bg-card p-6 ring-1 ring-ink/8"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-signal transition duration-300 group-hover:scale-x-100 rtl:origin-right"
              />
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-signal-soft text-signal-deep ring-1 ring-signal/15">
                <Icon name={icons[index] ?? 'spark'} />
              </span>
              <h3 className={cx('mt-5 text-lg font-bold', displayFont(lang))}>{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{point.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
