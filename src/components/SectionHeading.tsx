import type { Lang } from '../content'
import { displayFont } from '../content'
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
          'inline-flex rounded-full px-3 py-1 text-xs font-semibold',
          dark ? 'bg-white/10 text-teal' : 'bg-teal/15 text-teal-deep',
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cx(
          'mt-4 text-3xl font-bold tracking-tight sm:text-5xl',
          dark ? 'text-white' : 'text-ink',
          displayFont(lang),
        )}
      >
        {title}
      </h2>
      {lede && (
        <p className={cx('mt-4 text-base leading-relaxed sm:text-lg', dark ? 'text-white/70' : 'text-mist')}>{lede}</p>
      )}
    </div>
  )
}
