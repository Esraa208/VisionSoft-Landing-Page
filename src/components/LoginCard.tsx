import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import type { Copy, Lang } from '../content'
import { displayFont } from '../content'
import { cx } from '../cx'
import { Mark } from './Mark'

const fieldClass =
  'w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-teal'

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
    <main id="main" className="grid min-h-screen place-items-center bg-ink px-5 py-28">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-[28px] border border-white/10 bg-panel p-6 text-white shadow-2xl sm:p-8">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-ink">
            <Mark className="h-10 w-10" />
          </span>
          <h1 className={cx('mt-4 text-2xl font-bold', displayFont(lang))}>{copy.login.title}</h1>
        </div>
        <label className="mt-6 grid gap-1.5 text-sm">
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
        <label className="mt-4 grid gap-1.5 text-sm">
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
          <p className="mt-3 text-sm text-teal" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-teal py-3.5 text-sm font-bold text-ink">
          {copy.login.submit}
        </button>
        <Link to={`/${lang}`} className="mt-4 block text-center text-sm text-white/60">
          {copy.nav.brand}
        </Link>
      </form>
    </main>
  )
}
