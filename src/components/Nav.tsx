import { useEffect, useState } from 'react'
import type { Copy, Lang } from '../content'
import { cx } from '../cx'
import { Mark } from './Mark'

export function Nav({
  copy,
  lang,
  setLang,
}: {
  copy: Copy
  lang: Lang
  setLang: (lang: Lang) => void
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/90 text-white backdrop-blur-xl">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-teal focus:px-4 focus:py-2 focus:text-ink"
      >
        {copy.nav.skip}
      </a>
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#top" className="flex items-center gap-2.5" onClick={close}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-ink shadow-[0_0_0_4px_rgba(30,212,194,0.15)]">
            <Mark className="h-7 w-7" />
          </span>
          <span className="whitespace-nowrap text-sm font-semibold tracking-tight">{copy.nav.brand}</span>
        </a>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Main">
          {copy.nav.links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-white/70 transition hover:text-teal">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full border border-white/15 p-0.5 text-xs font-bold">
            <button
              type="button"
              className={cx('rounded-full px-2.5 py-1', lang === 'ar' ? 'bg-white text-ink' : 'text-white/70')}
              aria-pressed={lang === 'ar'}
              aria-label={copy.nav.langArLabel}
              onClick={() => setLang('ar')}
            >
              {copy.nav.langAr}
            </button>
            <button
              type="button"
              className={cx(
                'rounded-full px-2.5 py-1',
                lang === 'en' ? 'bg-white text-ink' : 'text-white/70',
                lang === 'en' && 'font-display',
              )}
              aria-pressed={lang === 'en'}
              aria-label={copy.nav.langEnLabel}
              onClick={() => setLang('en')}
            >
              {copy.nav.langEn}
            </button>
          </div>
          <a
            href={`/${lang}/login`}
            className="hidden items-center rounded-full bg-teal px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-white sm:inline-flex"
          >
            {copy.nav.login}
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 xl:hidden"
            aria-expanded={open}
            aria-label={open ? copy.nav.close : copy.nav.menu}
            onClick={() => setOpen((value) => !value)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-white/10 bg-ink px-5 py-4 xl:hidden" aria-label="Mobile">
          <ul className="grid gap-1">
            {copy.nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={close} className="block rounded-2xl px-3 py-3 text-base font-medium hover:bg-white/5">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`/${lang}/login`}
            onClick={close}
            className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-teal px-4 py-3 text-sm font-semibold text-ink"
          >
            {copy.nav.login}
          </a>
        </nav>
      )}
    </header>
  )
}
