import type { Copy, Lang } from '../content'
import { displayFont } from '../content'
import { cx } from '../cx'
import { Icon, type IconName } from './Icon'
import { SectionHeading } from './SectionHeading'

const icons: IconName[] = ['user', 'pin', 'truck', 'wallet']

export function Process({ copy, lang }: { copy: Copy['process']; lang: Lang }) {
  return (
    <section id="process" className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} lang={lang} />
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {copy.steps.map((step, index) => (
          <li key={step.title} className="lift rounded-3xl bg-card p-5 shadow-[0_10px_40px_rgba(16,19,26,0.05)] ring-1 ring-ink/5">
            <div className="flex items-center justify-between" dir="ltr">
              <span className={cx('text-sm font-bold text-ink/25', lang === 'en' && 'font-display')}>{index + 1}</span>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal/15 text-teal-deep shadow-[inset_0_0_0_1px_rgba(12,111,120,0.12)]">
                <Icon name={icons[index] ?? 'spark'} />
              </span>
            </div>
            <h3 className={cx('mt-6 text-lg font-bold', displayFont(lang))}>{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
