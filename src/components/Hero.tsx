import type { Copy, Lang } from '../content'
import { cx } from '../cx'
import { Icon, type IconName } from './Icon'
import { arrowNudge, btnBase, btnGhost, btnPrimary } from './styles'

const stageIcons: IconName[] = ['box', 'truck', 'route', 'check']
const assuranceIcons: IconName[] = ['shield', 'clock', 'wallet']
const CURRENT_STAGE = 2

export function Hero({ copy, lang }: { copy: Copy['hero']; lang: Lang }) {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-canvas text-ink">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-12 pt-28 sm:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-16 lg:pt-36">
        <div className="rise">
          <p className="inline-flex items-center gap-2 rounded-full bg-signal-soft px-3 py-1 text-xs font-bold text-signal-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            {copy.badge}
          </p>

          <h1
            className={cx(
              'mt-5 max-w-lg text-[1.7rem] font-extrabold leading-snug sm:text-4xl lg:text-[2.6rem]',
              lang === 'en' && 'font-display tracking-tight leading-[1.1]',
            )}
          >
            {copy.titleLead} <span className="text-signal">{copy.titleAccent}</span>
          </h1>

          <p className="mt-4 max-w-md text-base leading-relaxed text-mist">{copy.lede}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#preview" className={cx(btnBase, btnPrimary, 'rounded-full px-5 py-3')}>
              {copy.primary}
              <Icon name="arrow" className={arrowNudge} />
            </a>
            <a href="#register" className={cx(btnBase, btnGhost, 'rounded-full px-5 py-3')}>
              {copy.secondary}
            </a>
          </div>

          <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-5">
            {copy.assurances.map((item, index) => (
              <li key={item} className="inline-flex items-center gap-2 text-sm text-mist">
                <Icon name={assuranceIcons[index] ?? 'check'} className="h-4 w-4 shrink-0 text-signal-deep" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rise mx-auto w-full max-w-md lg:max-w-none" style={{ animationDelay: '120ms' }}>
          <article className="rounded-3xl bg-white p-5 shadow-[0_24px_60px_-32px_rgba(12,39,68,0.28)] ring-1 ring-ink/8 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-mist">{copy.console.badge}</p>
                <h2 className={cx('mt-1 text-lg font-bold', lang === 'en' && 'font-display tracking-tight')}>{copy.console.title}</h2>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-signal-soft px-2.5 py-1 text-[11px] font-bold text-signal-deep">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                {copy.console.stages[CURRENT_STAGE]}
              </span>
            </div>

            <p className="mt-6 text-xs text-mist">{copy.console.waybillLabel}</p>
            <p className="mt-1 font-display text-2xl font-bold tracking-wide text-ink">
              <span dir="ltr">{copy.console.sample}</span>
            </p>

            <ol className="relative mt-6 grid grid-cols-4">
              <span aria-hidden="true" className="absolute start-[12.5%] end-[12.5%] top-3.5 h-px bg-line" />
              <span aria-hidden="true" className="absolute start-[12.5%] top-3.5 h-px w-1/2 bg-signal" />
              {copy.console.stages.map((stage, index) => {
                const state = index < CURRENT_STAGE ? 'done' : index === CURRENT_STAGE ? 'current' : 'upcoming'
                return (
                  <li key={stage} className="relative flex flex-col items-center gap-2 text-center">
                    <span
                      className={cx(
                        'flex h-7 w-7 items-center justify-center rounded-full',
                        state === 'done' && 'bg-white text-signal ring-1 ring-signal',
                        state === 'current' && 'bg-signal text-ink',
                        state === 'upcoming' && 'bg-white text-mist ring-1 ring-line',
                      )}
                    >
                      <Icon name={stageIcons[index] ?? 'check'} className="h-3.5 w-3.5" />
                    </span>
                    <span className={cx('text-[11px] leading-tight', state === 'upcoming' ? 'text-mist/70' : 'font-medium text-ink')}>
                      {stage}
                    </span>
                  </li>
                )
              })}
            </ol>

            <form
              className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:rounded-full sm:bg-canvas sm:p-1.5 sm:ring-1 sm:ring-line"
              onSubmit={(event) => {
                event.preventDefault()
                const data = new FormData(event.currentTarget)
                const waybill = String(data.get('waybill') ?? '')
                window.dispatchEvent(new CustomEvent('track-waybill', { detail: waybill }))
                document.querySelector('#preview')?.scrollIntoView()
              }}
            >
              <label className="flex flex-1 items-center gap-2 rounded-full bg-canvas px-4 py-2.5 text-sm ring-1 ring-line sm:bg-transparent sm:py-0 sm:ring-0">
                <span className="sr-only">{copy.console.waybillLabel}</span>
                <Icon name="search" className="h-4 w-4 shrink-0 text-mist" />
                <input
                  name="waybill"
                  className="w-full bg-transparent text-ink outline-none placeholder:text-mist/70"
                  placeholder={copy.console.placeholder}
                />
              </label>
              <button type="submit" className={cx(btnBase, btnPrimary, 'rounded-full px-4 py-2.5')}>
                {copy.console.action}
              </button>
            </form>
          </article>
        </div>
      </div>
    </section>
  )
}
