import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import type { Copy, Lang } from '../content'
import { displayFont } from '../content'
import { cx } from '../cx'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'

type FieldName = 'name' | 'phone' | 'email' | 'governorate' | 'area' | 'address' | 'password' | 'confirm' | 'captcha'
type Errors = Partial<Record<FieldName, string>>

const fieldClass =
  'w-full rounded-2xl border border-ink/10 bg-canvas px-4 py-3 text-sm text-ink outline-none transition placeholder:text-mist/70 focus:border-teal focus:ring-4 focus:ring-teal/20'

function makeCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length: 5 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('')
}

export function Contact({ copy, lang }: { copy: Copy['contact']; lang: Lang }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [governorate, setGovernorate] = useState('')
  const [area, setArea] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [code, setCode] = useState(makeCode)
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
    if (captcha.trim().toUpperCase() !== code) next.captcha = copy.errors.captcha
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
    <section id="contact" className="bg-ink px-5 py-20 text-white lg:py-28">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} lang={lang} tone="dark" />
      <div id="register" className="mx-auto mt-10 max-w-3xl rounded-[28px] bg-card p-5 text-ink shadow-[0_30px_80px_rgba(0,0,0,0.28)] sm:p-8">
        {ready ? (
          <div>
            <h3 className={cx('text-2xl font-bold', displayFont(lang))}>{copy.successTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-mist">{copy.successBody}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex flex-1 items-center justify-center rounded-2xl bg-teal px-5 py-3.5 text-sm font-bold text-ink">
                {copy.whatsapp}
              </a>
              <a href={mailHref} className="inline-flex flex-1 items-center justify-center rounded-2xl border border-ink/15 px-5 py-3.5 text-sm font-semibold">
                {copy.emailCta}
              </a>
            </div>
            <button type="button" className="mt-4 text-sm font-semibold text-teal-deep underline underline-offset-4" onClick={() => setReady(false)}>
              {copy.edit}
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={copy.name} error={errors.name} htmlFor="biz-name" required>
                <input id="biz-name" className={fieldClass} placeholder={copy.namePh} value={name} onChange={(event) => setName(event.target.value)} />
              </Field>
              <Field label={copy.phone} error={errors.phone} htmlFor="biz-phone" required>
                <input id="biz-phone" dir="ltr" inputMode="tel" className={fieldClass} placeholder={copy.phonePh} value={phone} onChange={(event) => setPhone(event.target.value)} />
              </Field>
            </div>
            <Field label={copy.email} error={errors.email} htmlFor="biz-email">
              <input id="biz-email" dir="ltr" type="email" className={fieldClass} placeholder={copy.emailPh} value={email} onChange={(event) => setEmail(event.target.value)} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={copy.governorate} error={errors.governorate} htmlFor="biz-gov" required>
                <select id="biz-gov" className={fieldClass} value={governorate} onChange={(event) => setGovernorate(event.target.value)}>
                  <option value="">{copy.governoratePh}</option>
                  {copy.governorates.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={copy.area} error={errors.area} htmlFor="biz-area" required>
                <select id="biz-area" className={fieldClass} value={area} onChange={(event) => setArea(event.target.value)}>
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
              <input id="biz-address" className={fieldClass} placeholder={copy.addressPh} value={address} onChange={(event) => setAddress(event.target.value)} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={copy.password} error={errors.password} htmlFor="biz-password" required>
                <input id="biz-password" type="password" autoComplete="new-password" dir="ltr" className={fieldClass} value={password} onChange={(event) => setPassword(event.target.value)} />
              </Field>
              <Field label={copy.confirm} error={errors.confirm} htmlFor="biz-confirm" required>
                <input id="biz-confirm" type="password" autoComplete="new-password" dir="ltr" className={fieldClass} value={confirm} onChange={(event) => setConfirm(event.target.value)} />
              </Field>
            </div>
            <Field label={copy.captcha} error={errors.captcha} htmlFor="biz-captcha" required>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input id="biz-captcha" dir="ltr" className={cx(fieldClass, 'sm:max-w-xs')} value={captcha} onChange={(event) => setCaptcha(event.target.value)} />
                <div className="flex items-center gap-2">
                  <span dir="ltr" className="select-none rounded-xl bg-canvas-deep px-4 py-3 font-display text-lg font-bold tracking-[0.3em] text-ink">
                    {code}
                  </span>
                  <button type="button" className="inline-flex items-center gap-1 rounded-xl border border-ink/10 px-3 py-3 text-sm font-semibold" onClick={() => setCode(makeCode())}>
                    <Icon name="arrow" className="h-4 w-4" />
                    {copy.refresh}
                  </button>
                </div>
              </div>
            </Field>
            <button type="submit" className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-teal px-5 py-3.5 text-sm font-bold text-ink transition hover:bg-ink hover:text-white">
              {copy.submit}
              <Icon name="arrow" className="h-4 w-4" />
            </button>
          </form>
        )}
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
    <label htmlFor={htmlFor} className="grid gap-1.5 text-sm font-medium">
      <span>
        {label} {required && <span className="text-teal-deep">*</span>}
      </span>
      {children}
      {error && (
        <span className="text-xs font-medium text-teal-deep" role="alert">
          {error}
        </span>
      )}
    </label>
  )
}
