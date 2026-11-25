import type { Copy, Lang } from '../content'
import { cx } from '../cx'
import { Icon, type IconName } from './Icon'

const icons: IconName[] = ['box', 'clock', 'users', 'headset']

export function Stats({ items, lang }: { items: Copy['stats']; lang: Lang }) {
  return (
    <section className="mt-10 pb-10 lg:mt-16">
      <div className="mx-auto max-w-6xl px-5">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line shadow-[0_18px_40px_-24px_rgba(12,39,68,0.28)] ring-1 ring-ink/8 lg:grid-cols-4">
          {items.map((item, index) => (
            <div key={item.label} className="flex items-center gap-3 bg-white px-4 py-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-signal-soft text-signal-deep">
                <Icon name={icons[index] ?? 'stack'} className="h-4 w-4" />
              </span>
              <div className="min-w-0 text-start">
                <dd className={cx('font-display text-xl font-semibold tracking-tight text-ink', lang === 'en' && 'tracking-tighter')}>
                  <span dir="ltr">{item.value}</span>
                </dd>
                <dt className="mt-0.5 text-xs leading-snug text-mist sm:text-sm">{item.label}</dt>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
