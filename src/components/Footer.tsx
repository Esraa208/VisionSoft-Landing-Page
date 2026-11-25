import type { Copy, Lang } from '../content'
import { cx } from '../cx'
import { Icon } from './Icon'
import { Mark } from './Mark'

export function Footer({ copy, lang }: { copy: Copy; lang: Lang }) {
  return (
    <footer className="bg-navy text-white">
      <div aria-hidden="true" className="h-px bg-signal" />
      <div className="mx-auto max-w-6xl px-5 py-12 lg:py-14">
        <div className="grid gap-10 md:grid-cols-[1.15fr_1fr_1fr] md:gap-12">
          <div>
            <a href="#top" className="inline-flex items-center gap-2.5">
              <Mark className="h-9 w-9 text-white" />
              <span className={cx('text-base font-semibold', lang === 'en' && 'font-display tracking-tight')}>{copy.nav.brand}</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/55">{copy.footer.blurb}</p>
          </div>

          <nav aria-label="Footer">
            <p className="text-xs font-semibold tracking-wide text-white/40">{copy.footer.linksTitle}</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {copy.nav.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/75 transition hover:text-signal">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-semibold tracking-wide text-white/40">{copy.footer.contactTitle}</p>
            <ul className="mt-4 grid gap-2.5">
              <li>
                <a
                  href={`mailto:${copy.contact.studioEmail}`}
                  className="flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-3 ring-1 ring-white/10 transition hover:bg-white/10"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-signal">
                    <Icon name="mail" className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] text-white/45">{copy.contact.emailLabel}</span>
                    <span dir="ltr" className="block truncate text-sm text-white/85">
                      {copy.contact.studioEmail}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${copy.contact.whatsappPhone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-3 ring-1 ring-white/10 transition hover:bg-white/10"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-signal">
                    <Icon name="chat" className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] text-white/45">{copy.contact.whatsappLabel}</span>
                    <span dir="ltr" className="block text-sm text-white/85">
                      +{copy.contact.whatsappPhone}
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-5 text-center text-xs text-white/40">{copy.footer.rights}</p>
      </div>
    </footer>
  )
}
