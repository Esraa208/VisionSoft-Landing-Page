import { useEffect, useState, type FormEvent } from 'react'
import type { Copy, Lang } from '../content'
import { cx } from '../cx'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'
import { btnBase, btnPrimary } from './styles'

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
    <section id="preview" className="px-5 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} lang={lang} />
        <form
          onSubmit={onSubmit}
          className="mx-auto mt-10 max-w-3xl rounded-3xl bg-white p-5 shadow-[0_18px_40px_-28px_rgba(12,39,68,0.35)] ring-1 ring-ink/8 sm:p-7"
        >
          <p className="flex items-center justify-center gap-2 text-sm font-semibold text-mist">
            <Icon name="pin" className="h-4 w-4 text-signal" />
            {copy.fieldLabel}
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <label className="flex flex-1 items-center gap-3 rounded-full border border-line bg-canvas px-4 py-3 text-sm text-ink transition focus-within:border-signal focus-within:ring-4 focus-within:ring-signal/15">
              <Icon name="search" className="h-4 w-4 shrink-0 text-mist" />
              <input
                id="waybill"
                name="waybill"
                value={code}
                placeholder={copy.placeholder}
                className="w-full bg-transparent outline-none placeholder:text-mist/70"
                onChange={(event) => setCode(event.target.value)}
              />
            </label>
            <button type="submit" className={cx(btnBase, btnPrimary, 'rounded-full px-6 py-3')}>
              <Icon name="search" className="h-4 w-4" />
              {copy.button}
            </button>
          </div>
          {error && (
            <p className="mt-3 text-center text-sm font-medium text-alert" role="alert">
              {error}
            </p>
          )}

          <div className="mt-5 rounded-2xl bg-canvas px-4 py-4">
            {shown ? (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0 text-start">
                    <p className="text-xs font-semibold text-mist">{copy.resultLabel}</p>
                    <p dir="ltr" className="mt-1 font-display text-lg font-semibold tracking-wide text-ink">
                      {shown}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-signal-soft px-3 py-1.5 text-xs font-bold text-signal-deep">
                    <span className="pulse-dot h-2 w-2 rounded-full bg-signal" />
                    {copy.result}
                  </span>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line">
                  <div className="h-full w-2/3 rounded-full bg-signal" />
                </div>
              </div>
            ) : (
              <p className="flex items-center justify-center gap-2 text-center text-sm leading-relaxed text-mist">
                <Icon name="box" className="h-4 w-4 shrink-0 text-signal" />
                {copy.empty}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
