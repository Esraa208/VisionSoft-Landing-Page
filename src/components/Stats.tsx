import type { Copy, Lang } from '../content'
import { displayFont } from '../content'
import { cx } from '../cx'
import { Icon, type IconName } from './Icon'

const icons: IconName[] = ['box', 'check', 'users', 'clock']

export function Stats({ items, lang }: { items: Copy['stats']; lang: Lang }) {
  return (
    <div className="relative z-10 -mt-16 px-5">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 overflow-hidden rounded-[28px] bg-card shadow-[0_18px_50px_rgba(16,19,26,0.12)] ring-1 ring-ink/5 lg:grid-cols-4">
        {items.map((item, index) => (
          <div
            key={item.label}
            className={cx(
              'flex items-center gap-3 px-4 py-5 sm:gap-4 sm:px-6 sm:py-7',
              index % 2 === 1 && 'border-s border-ink/8',
              index > 1 && 'border-t border-ink/8 lg:border-t-0',
              index > 0 && 'lg:border-s',
            )}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal/15 shadow-[inset_0_0_0_1px_rgba(12,111,120,0.12)] text-teal-deep">
              <Icon name={icons[index] ?? 'stack'} />
            </span>
            <div>
              <dt className={cx('text-xl font-bold text-ink sm:text-2xl', displayFont(lang))}>{item.value}</dt>
              <dd className="mt-0.5 text-xs leading-snug text-mist sm:text-sm">{item.label}</dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  )
}
