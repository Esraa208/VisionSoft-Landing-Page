import type { Copy, Lang } from '../content'
import { Icon, type IconName } from './Icon'
import { SectionHeading } from './SectionHeading'

const icons: IconName[] = ['user', 'pin', 'truck', 'wallet']

export function Process({ copy, lang }: { copy: Copy['process']; lang: Lang }) {
  return (
    <section id="process" className="paper-grid px-5 pb-16 pt-24 lg:pb-24 lg:pt-32">
      <div className="mx-auto max-w-6xl">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} lang={lang} />
      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {copy.steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-2xl bg-white px-5 py-6 shadow-[0_16px_36px_-26px_rgba(12,39,68,0.45)] ring-1 ring-ink/8"
          >
            <div className="flex items-center gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-signal-soft text-signal-deep">
                <Icon name={icons[index] ?? 'spark'} className="h-5 w-5" />
              </span>
              <div className="min-w-0 text-start">
                <span className="font-display text-xs font-semibold tracking-wide text-signal" dir="ltr">
                  0{index + 1}
                </span>
                <h3 className="text-base font-semibold leading-snug text-ink">{step.title}</h3>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-mist">{step.body}</p>
          </li>
        ))}
      </ol>
      </div>
    </section>
  )
}
