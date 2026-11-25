import type { Lang } from '../content'
import { cx } from '../cx'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  lede?: string
  lang: Lang
  tone?: 'light' | 'dark'
}

export function SectionHeading({ eyebrow, title, lede, lang, tone = 'light' }: SectionHeadingProps) {
  const dark = tone === 'dark'

  return (
    <div className="mx-auto max-w-2xl text-center">
      <p
        className={cx(
          'inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold',
          dark ? 'bg-white/10 text-signal ring-1 ring-white/10' : 'bg-signal-soft text-signal-deep',
        )}
      >
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-signal" />
        {eyebrow}
      </p>
      <h2
        className={cx(
          'mt-4 text-2xl font-bold leading-snug sm:text-3xl',
          dark ? 'text-white' : 'text-ink',
          lang === 'en' && 'font-display tracking-tight',
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p className={cx('mx-auto mt-3 max-w-xl text-sm leading-relaxed sm:text-base', dark ? 'text-white/65' : 'text-mist')}>
          {lede}
        </p>
      ) : null}
    </div>
  )
}
