import { useEffect, useState, type FormEvent } from 'react'
import type { Copy, Lang } from '../content'
import { displayFont } from '../content'
import { cx } from '../cx'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'

export function Preview({ copy, lang }: { copy: Copy['preview']; lang: Lang }) {
  const [code, setCode] = useState('')
  const [shown, setShown] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const onTrack = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail.trim()
      setCode(detail)
      if (detail.length < 3) {
        setError(copy.error)
        setShown('')
        return
      }
      setError('')
      setShown(detail)
    }
    window.addEventListener('track-waybill', onTrack)
    return () => window.removeEventListener('track-waybill', onTrack)
  }, [copy.error])

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const next = code.trim()
    if (next.length < 3) {
      setError(copy.error)
      setShown('')
      return
    }
    setError('')
    setShown(next)
  }

  return (
    <section id="preview" className="px-5 pb-8">
      <div className="mx-auto max-w-6xl rounded-[32px] bg-canvas-deep px-5 py-16 sm:px-10 lg:py-20">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} lang={lang} />
        <form
          onSubmit={onSubmit}
          className="mx-auto mt-10 max-w-3xl rounded-[28px] bg-card p-4 shadow-[0_16px_50px_rgba(16,19,26,0.06)] ring-1 ring-ink/5 sm:p-5"
        >
          <p className="flex items-center justify-center gap-2 text-sm font-semibold text-teal-deep">
            <Icon name="pin" className="h-4 w-4" />
            {copy.fieldLabel}
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <label className="flex flex-1 items-center gap-3 rounded-2xl border border-ink/10 bg-canvas px-4 py-3 text-sm text-ink">
              <Icon name="search" className="h-4 w-4 text-mist" />
              <input
                id="waybill"
                name="waybill"
                value={code}
                placeholder={copy.placeholder}
                className="w-full bg-transparent outline-none placeholder:text-mist/70"
                onChange={(event) => setCode(event.target.value)}
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-teal px-6 py-3 text-sm font-bold text-ink transition hover:bg-ink hover:text-white"
            >
              <Icon name="search" className="h-4 w-4" />
              {copy.button}
            </button>
          </div>
          {error && (
            <p className="mt-3 text-center text-sm font-medium text-teal-deep" role="alert">
              {error}
            </p>
          )}
          {shown && (
            <p className={cx('mt-4 text-center text-sm', displayFont(lang))}>
              <span dir="ltr" className="font-semibold">
                {shown}
              </span>
              <span className="mx-2 text-mist">·</span>
              <span className="font-semibold text-teal-deep">
                {copy.resultLabel}: {copy.result}
              </span>
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
