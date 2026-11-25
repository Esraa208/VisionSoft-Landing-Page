import { useEffect, useState } from 'react'
import type { Copy, Lang } from '../content'
import { cx } from '../cx'
import { Icon } from './Icon'
import { Mark } from './Mark'
import { btnBase, btnPrimary } from './styles'

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
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  const sectionIds = copy.nav.links.map((link) => link.href).join(' ')

  useEffect(() => {
    const links = sectionIds.split(' ')
    const onScroll = () => {
      setScrolled(window.scrollY > 16)
      const probe = Math.round(window.innerHeight * 0.28)
      const visible = links
        .map((href) => {
          const section = document.querySelector(href)
          if (!section) return null
          const rect = section.getBoundingClientRect()
          return { href, top: rect.top, bottom: rect.bottom }
        })
        .filter((section): section is { href: string; top: number; bottom: number } => section !== null)
        .filter((section) => section.top <= probe && section.bottom > probe)
        .sort((a, b) => b.top - a.top)
      setActive(visible[0]?.href ?? '')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sectionIds])

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
  const solid = scrolled || open

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-signal focus:px-4 focus:py-2 focus:text-ink"
      >
        {copy.nav.skip}
      </a>
      <div
        className={cx(
          'mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-full border border-line ps-3 pe-2 text-ink transition-all duration-300 sm:ps-4',
          solid ? 'bg-white/95 shadow-[0_10px_30px_-18px_rgba(12,39,68,0.35)] backdrop-blur-xl' : 'bg-white/75 backdrop-blur-md',
        )}
      >
        <a href="#top" className="flex items-center gap-2.5" onClick={close}>
          <Mark className="h-8 w-8 text-navy" />
          <span className={cx('whitespace-nowrap text-base font-bold', lang === 'en' && 'font-display tracking-tight')}>
            {copy.nav.brand}
          </span>
        </a>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main">
          {copy.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? 'true' : undefined}
              className={cx(
                'rounded-full px-3 py-1.5 text-sm font-medium transition',
                active === link.href ? 'bg-canvas text-ink' : 'text-mist hover:bg-canvas hover:text-ink',
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full border border-line bg-canvas p-0.5 text-xs font-bold">
            <button
              type="button"
              className={cx('rounded-full px-2.5 py-1.5 transition', lang === 'ar' ? 'bg-ink text-white' : 'text-mist hover:text-ink')}
              aria-pressed={lang === 'ar'}
              aria-label={copy.nav.langArLabel}
              onClick={() => setLang('ar')}
            >
              {copy.nav.langAr}
            </button>
            <button
              type="button"
              className={cx(
                'rounded-full px-2.5 py-1.5 font-display transition',
                lang === 'en' ? 'bg-ink text-white' : 'text-mist hover:text-ink',
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
            className={cx(
              btnPrimary,
              'group hidden items-center justify-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm font-bold transition duration-300 sm:inline-flex',
            )}
          >
            <Icon name="user" className="h-4 w-4" />
            {copy.nav.login}
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white xl:hidden"
            aria-expanded={open}
            aria-label={open ? copy.nav.close : copy.nav.menu}
            onClick={() => setOpen((value) => !value)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h10M4 17h16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="rise mx-auto mt-2 max-w-6xl rounded-2xl border border-line bg-white p-3 text-ink shadow-xl xl:hidden"
          aria-label="Mobile"
        >
          <ul className="grid gap-1">
            {copy.nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={close}
                  aria-current={active === link.href ? 'true' : undefined}
                  className={cx(
                    'flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium transition',
                    active === link.href ? 'bg-canvas text-ink' : 'hover:bg-canvas',
                  )}
                >
                  {link.label}
                  <Icon name="arrow" className="h-4 w-4 text-mist" />
                </a>
              </li>
            ))}
          </ul>
          <a href={`/${lang}/login`} onClick={close} className={cx(btnBase, btnPrimary, 'mt-3 w-full rounded-xl px-4 py-3.5')}>
            <Icon name="user" className="h-4 w-4" />
            {copy.nav.login}
          </a>
        </nav>
      )}
    </header>
  )
}
