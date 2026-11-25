import type { Copy, Lang } from '../content'
import { displayFont } from '../content'
import { cx } from '../cx'
import { Icon, type IconName } from './Icon'

const stageIcons: IconName[] = ['box', 'truck', 'pin', 'check']

const btn =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal'

export function Hero({ copy, lang }: { copy: Copy['hero']; lang: Lang }) {
  const glow = lang === 'ar' ? '88% 0%' : '12% 0%'

  return (
    <section id="top" className="relative overflow-hidden bg-ink pt-28 text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(900px 520px at ${glow}, rgba(30,212,194,0.28), transparent 58%), linear-gradient(165deg, #123056 0%, #071525 48%, #04101c 100%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-28 lg:grid-cols-2 lg:pb-36">
        <div>
          <h1 className={cx('max-w-xl text-4xl font-bold leading-[1.15] sm:text-5xl lg:text-6xl', displayFont(lang))}>
            {copy.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">{copy.lede}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#preview" className={cx(btn, 'bg-teal text-ink hover:bg-white')}>
              {copy.primary}
              <Icon name="arrow" className="h-4 w-4" />
            </a>
            <a href="#register" className={cx(btn, 'border border-white/15 bg-white/10 text-white hover:bg-white/15')}>
              {copy.secondary}
            </a>
          </div>
          <ul className="mt-8 flex flex-col gap-3 text-sm text-white/75 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {copy.assurances.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-teal/70 text-teal">
                  <Icon name="check" className="h-3.5 w-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <article className="rounded-[28px] border border-teal/20 bg-panel/90 p-5 shadow-[0_30px_80px_rgba(4,16,28,0.45),0_0_0_1px_rgba(30,212,194,0.08)] backdrop-blur-md sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className={cx('text-lg font-bold', displayFont(lang))}>{copy.console.title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-white/55">{copy.console.lede}</p>
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal/15 text-teal">
              <Icon name="box" />
            </span>
          </div>

          <ol className="relative mt-8 grid grid-cols-4">
            <span className="absolute start-5 end-5 top-5 h-px bg-white/15" aria-hidden="true" />
            <span className="absolute start-5 top-5 h-px w-2/3 bg-teal" aria-hidden="true" />
            {copy.console.stages.map((stage, index) => {
              const state = index < 2 ? 'done' : index === 2 ? 'current' : 'upcoming'
              return (
                <li key={stage} className="relative flex flex-col items-center gap-2 text-center">
                  <span
                    className={cx(
                      'flex h-10 w-10 items-center justify-center rounded-full border',
                      state === 'done' && 'border-teal bg-panel text-teal',
                      state === 'current' && 'pulse-dot border-teal bg-teal text-ink',
                      state === 'upcoming' && 'border-white/15 bg-panel text-white/45',
                    )}
                  >
                    <Icon name={stageIcons[index] ?? 'check'} className="h-4 w-4" />
                  </span>
                  <span className={cx('text-[11px] font-medium sm:text-xs', state === 'current' ? 'text-teal' : 'text-white/60')}>
                    {stage}
                  </span>
                </li>
              )
            })}
          </ol>

          <form
            className="mt-6 grid gap-3"
            onSubmit={(event) => {
              event.preventDefault()
              const data = new FormData(event.currentTarget)
              const waybill = String(data.get('waybill') ?? '')
              window.dispatchEvent(new CustomEvent('track-waybill', { detail: waybill }))
              document.querySelector('#preview')?.scrollIntoView()
            }}
          >
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm">
              <Icon name="search" className="h-4 w-4 shrink-0 text-white/40" />
              <input
                name="waybill"
                className="w-full bg-transparent text-white outline-none placeholder:text-white/35"
                placeholder={copy.console.placeholder}
              />
            </label>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-teal py-3.5 text-sm font-bold text-ink transition hover:bg-white"
            >
              {copy.console.action}
              <Icon name="arrow" className="h-4 w-4" />
            </button>
          </form>
        </article>
      </div>
    </section>
  )
}
