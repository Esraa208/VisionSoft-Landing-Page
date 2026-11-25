import type { Copy, Lang } from '../content'
import { cx } from '../cx'
import { Mark } from './Mark'

export function Footer({ copy, lang }: { copy: Copy; lang: Lang }) {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <a href="#top" className="flex items-center gap-2">
          <Mark className="h-8 w-8 text-white" />
          <span className={cx('text-sm font-semibold', lang === 'en' && 'font-display')}>{copy.nav.brand}</span>
        </a>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/70" aria-label="Footer">
          {copy.nav.links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>
        <p className="text-sm text-white/55">{copy.footer.rights}</p>
      </div>
    </footer>
  )
}
