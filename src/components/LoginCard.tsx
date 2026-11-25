import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import type { Copy, Lang } from '../content'
import { displayFont } from '../content'
import { cx } from '../cx'
import { Mark } from './Mark'
import { btnBase, btnPrimary } from './styles'

const fieldClass =
  'w-full rounded-2xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none placeholder:text-mist/70 focus:border-signal focus:ring-4 focus:ring-signal/15'

export function LoginCard({ copy, lang }: { copy: Copy; lang: Lang }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (email.trim().length < 3 || password.length < 4) {
      setError(copy.login.error)
      return
    }
    setError(copy.login.error)
  }

  return (
    <main id="main" className="relative grid min-h-screen place-items-center overflow-hidden bg-ink px-5 py-32">
      <div aria-hidden="true" className="hero-bg pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="map-dots pointer-events-none absolute inset-0" />
      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-md rounded-[28px] bg-card p-6 text-ink shadow-[0_40px_100px_-30px_rgba(0,0,0,0.65)] sm:p-8"
      >
        <div className="flex flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy text-white">
            <Mark className="h-10 w-10" />
          </span>
          <h1 className={cx('mt-4 text-2xl font-bold', displayFont(lang))}>{copy.login.title}</h1>
        </div>
        <label className="mt-6 grid gap-1.5 text-sm font-medium">
          {copy.login.email}
          <input
            type="text"
            autoComplete="username"
            dir="ltr"
            className={fieldClass}
            placeholder={copy.login.emailPh}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label className="mt-4 grid gap-1.5 text-sm font-medium">
          {copy.login.password}
          <input
            type="password"
            autoComplete="current-password"
            dir="ltr"
            className={fieldClass}
            placeholder={copy.login.passwordPh}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {error && (
          <p className="mt-3 text-sm font-medium text-alert" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className={cx(btnBase, btnPrimary, 'mt-6 w-full rounded-2xl py-3.5')}>
          {copy.login.submit}
        </button>
        <Link to={`/${lang}`} className="mt-4 block text-center text-sm font-semibold text-mist transition hover:text-ink">
          {copy.nav.brand}
        </Link>
      </form>
    </main>
  )
}
