import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import type { Copy, Lang } from '../content'
import { displayFont } from '../content'
import { cx } from '../cx'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'
import { arrowNudge, btnBase, btnPrimary } from './styles'

type FieldName = 'name' | 'phone' | 'email' | 'governorate' | 'area' | 'address' | 'password' | 'confirm'
type Errors = Partial<Record<FieldName, string>>

const fieldClass =
  'w-full rounded-2xl border border-line bg-canvas py-3 text-sm text-ink outline-none transition placeholder:text-mist/70 focus:border-signal focus:ring-4 focus:ring-signal/15'

export function Contact({ copy, lang }: { copy: Copy['contact']; lang: Lang }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [governorate, setGovernorate] = useState('')
  const [area, setArea] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setErrors({})
  }, [lang])

  const message = useMemo(() => {
    return [copy.title, `${copy.name}: ${name}`, `${copy.phone}: ${phone}`, `${copy.email}: ${email}`, `${copy.governorate}: ${governorate}`, `${copy.area}: ${area}`, `${copy.address}: ${address}`].join('\n')
  }, [address, area, copy, email, governorate, name, phone])

  function validate() {
    const next: Errors = {}
    if (name.trim().length < 2) next.name = copy.errors.name
    const digits = phone.replace(/[^\d]/g, '')
    if (digits.length < 8 || digits.length > 15) next.phone = copy.errors.phone
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = copy.errors.email
    if (!governorate) next.governorate = copy.errors.governorate
    if (!area) next.area = copy.errors.area
    if (address.trim().length < 6) next.address = copy.errors.address
    if (password.length < 8) next.password = copy.errors.password
    if (password !== confirm) next.confirm = copy.errors.confirm
    return next
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length === 0) setReady(true)
  }

  const whatsappHref = `https://wa.me/${copy.whatsappPhone}?text=${encodeURIComponent(message)}`
  const mailHref = `mailto:${copy.studioEmail}?subject=${encodeURIComponent(copy.title)}&body=${encodeURIComponent(message)}`

  return (
    <section id="contact" className="px-5 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} lang={lang} />
        <div className="mx-auto mt-8 max-w-3xl">
          <p className="text-center text-sm font-semibold text-ink">{copy.reachTitle}</p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            <li>
              <a
                href={`https://wa.me/${copy.whatsappPhone}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl bg-card px-4 py-4 ring-1 ring-ink/8 transition hover:ring-go-deep/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-go-soft text-go-deep">
                  <Icon name="chat" />
                </span>
                <span>
                  <span className="block text-xs font-semibold text-mist">{copy.whatsappLabel}</span>
                  <span dir="ltr" className="font-display text-sm font-bold text-ink">
                    +{copy.whatsappPhone}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${copy.studioEmail}`}
                className="flex items-center gap-3 rounded-2xl bg-card px-4 py-4 ring-1 ring-ink/8 transition hover:ring-signal/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-signal-soft text-signal-deep">
                  <Icon name="mail" />
                </span>
                <span>
                  <span className="block text-xs font-semibold text-mist">{copy.emailLabel}</span>
                  <span dir="ltr" className="text-sm font-bold text-ink">
                    {copy.studioEmail}
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div id="register" className="mx-auto mt-6 max-w-3xl rounded-[28px] bg-card p-5 text-ink shadow-[0_24px_70px_-36px_rgba(7,19,28,0.35)] ring-1 ring-ink/8 sm:p-8">
          {ready ? (
            <div>
              <h3 className={cx('text-2xl font-bold', displayFont(lang))}>{copy.successTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">{copy.successBody}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-2xl bg-go-deep px-5 py-3.5 text-sm font-bold text-white"
                >
                  {copy.whatsapp}
                </a>
                <a
                  href={mailHref}
                  className="inline-flex flex-1 items-center justify-center rounded-2xl border border-line px-5 py-3.5 text-sm font-semibold"
                >
                  {copy.emailCta}
                </a>
              </div>
              <button
                type="button"
                className="mt-4 text-sm font-semibold text-signal-deep underline underline-offset-4"
                onClick={() => setReady(false)}
              >
                {copy.edit}
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={copy.name} error={errors.name} htmlFor="biz-name" required>
                  <input id="biz-name" className={cx(fieldClass, 'px-4')} placeholder={copy.namePh} value={name} onChange={(event) => setName(event.target.value)} />
                </Field>
                <Field label={copy.phone} error={errors.phone} htmlFor="biz-phone" required>
                  <input id="biz-phone" dir="ltr" inputMode="tel" className={cx(fieldClass, 'px-4')} placeholder={copy.phonePh} value={phone} onChange={(event) => setPhone(event.target.value)} />
                </Field>
              </div>
              <Field label={copy.email} error={errors.email} htmlFor="biz-email">
                <input id="biz-email" dir="ltr" type="email" className={cx(fieldClass, 'px-4')} placeholder={copy.emailPh} value={email} onChange={(event) => setEmail(event.target.value)} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={copy.governorate} error={errors.governorate} htmlFor="biz-gov" required>
                  <select id="biz-gov" className={cx(fieldClass, 'field-select ps-4')} value={governorate} onChange={(event) => setGovernorate(event.target.value)}>
                    <option value="">{copy.governoratePh}</option>
                    {copy.governorates.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={copy.area} error={errors.area} htmlFor="biz-area" required>
                  <select id="biz-area" className={cx(fieldClass, 'field-select ps-4')} value={area} onChange={(event) => setArea(event.target.value)}>
                    <option value="">{copy.areaPh}</option>
                    {copy.areas.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label={copy.address} error={errors.address} htmlFor="biz-address" required>
                <input id="biz-address" className={cx(fieldClass, 'px-4')} placeholder={copy.addressPh} value={address} onChange={(event) => setAddress(event.target.value)} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={copy.password} error={errors.password} htmlFor="biz-password" required>
                  <input id="biz-password" type="password" autoComplete="new-password" dir="ltr" className={cx(fieldClass, 'px-4')} value={password} onChange={(event) => setPassword(event.target.value)} />
                </Field>
                <Field label={copy.confirm} error={errors.confirm} htmlFor="biz-confirm" required>
                  <input id="biz-confirm" type="password" autoComplete="new-password" dir="ltr" className={cx(fieldClass, 'px-4')} value={confirm} onChange={(event) => setConfirm(event.target.value)} />
                </Field>
              </div>
              <button type="submit" className={cx(btnBase, btnPrimary, 'mt-2 rounded-2xl px-5 py-3.5')}>
                {copy.submit}
                <Icon name="arrow" className={arrowNudge} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  htmlFor,
  error,
  required = false,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="grid content-start gap-1.5 self-start text-sm font-medium">
      <span>
        {label} {required && <span className="text-signal-deep">*</span>}
      </span>
      {children}
      {error && (
        <span className="text-xs font-medium text-alert" role="alert">
          {error}
        </span>
      )}
    </label>
  )
}
