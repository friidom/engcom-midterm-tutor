import type { ReactNode } from 'react'
import { Inline } from '../components/Rich'

export type Tone = 'indigo' | 'emerald' | 'rose' | 'amber' | 'sky' | 'slate' | 'violet'

export const toneBox: Record<Tone, string> = {
  indigo: 'border-indigo-200 bg-indigo-50 text-indigo-950',
  emerald: 'border-emerald-200 bg-emerald-50 text-emerald-950',
  rose: 'border-rose-200 bg-rose-50 text-rose-950',
  amber: 'border-amber-200 bg-amber-50 text-amber-950',
  sky: 'border-sky-200 bg-sky-50 text-sky-950',
  slate: 'border-slate-200 bg-slate-50 text-slate-900',
  violet: 'border-violet-200 bg-violet-50 text-violet-950',
}

export const toneSolid: Record<Tone, string> = {
  indigo: 'bg-indigo-600 text-white',
  emerald: 'bg-emerald-600 text-white',
  rose: 'bg-rose-600 text-white',
  amber: 'bg-amber-500 text-white',
  sky: 'bg-sky-600 text-white',
  slate: 'bg-slate-600 text-white',
  violet: 'bg-violet-600 text-white',
}

export function Box({ tone = 'slate', title, children, className = '' }: { tone?: Tone; title?: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border px-3 py-2 ${toneBox[tone]} ${className}`}>
      {title && <div className="text-[14px] font-semibold leading-snug">{title}</div>}
      {children && <div className="mt-0.5 text-[13px] leading-snug opacity-90">{children}</div>}
    </div>
  )
}

export function Arrow({ dir = 'right', label }: { dir?: 'right' | 'down'; label?: string }) {
  return (
    <div className={`flex shrink-0 items-center justify-center text-slate-400 ${dir === 'down' ? 'flex-col py-0.5' : 'px-1'}`}>
      {label && <span className="text-[11px] text-slate-500">{label}</span>}
      <span className="text-lg leading-none">{dir === 'down' ? '↓' : '→'}</span>
    </div>
  )
}

export interface Step {
  title: string
  sub?: string
  tone?: Tone
}

export function Flow({ steps, numbered = false, tone = 'indigo' }: { steps: Step[]; numbered?: boolean; tone?: Tone }) {
  return (
    <div className="flex flex-col items-stretch gap-1 md:flex-row md:items-stretch">
      {steps.map((s, i) => (
        <div key={i} className="flex flex-col items-stretch md:flex-1 md:flex-row md:items-center">
          <Box tone={s.tone ?? tone} className="md:h-full md:flex-1" title={numbered ? `${i + 1}. ${s.title}` : s.title}>
            {s.sub && <Inline text={s.sub} />}
          </Box>
          {i < steps.length - 1 && (
            <>
              <span className="md:hidden">
                <Arrow dir="down" />
              </span>
              <span className="hidden md:block">
                <Arrow />
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export function VStack({ steps, tone = 'indigo', numbered = false }: { steps: Step[]; tone?: Tone; numbered?: boolean }) {
  return (
    <div className="flex flex-col items-stretch">
      {steps.map((s, i) => (
        <div key={i} className="flex flex-col items-stretch">
          <Box tone={s.tone ?? tone} title={numbered ? `${i + 1}. ${s.title}` : s.title}>
            {s.sub && <Inline text={s.sub} />}
          </Box>
          {i < steps.length - 1 && <Arrow dir="down" />}
        </div>
      ))}
    </div>
  )
}

export function Compare({ headers, rows, firstColBold = true }: { headers: string[]; rows: string[][]; firstColBold?: boolean }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse text-[14px]">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="border-b-2 border-slate-300 bg-slate-100 px-3 py-2 text-left font-semibold text-slate-800">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="align-top odd:bg-white even:bg-slate-50/70">
              {r.map((c, j) => (
                <td key={j} className={`border-b border-slate-200 px-3 py-2 text-slate-700 ${j === 0 && firstColBold ? 'font-semibold text-slate-900' : ''}`}>
                  <Inline text={c} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Cards({ items, cols = 3 }: { items: { title: string; body: string; tone?: Tone; tag?: string }[]; cols?: 2 | 3 | 4 }) {
  const grid = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[cols]
  return (
    <div className={`grid grid-cols-1 gap-2 ${grid}`}>
      {items.map((it, i) => (
        <div key={i} className={`rounded-lg border px-3 py-2.5 ${toneBox[it.tone ?? 'slate']}`}>
          <div className="flex items-start justify-between gap-2">
            <div className="text-[14px] font-semibold leading-snug">{it.title}</div>
            {it.tag && <span className="shrink-0 rounded bg-white/70 px-1.5 text-[11px] font-semibold">{it.tag}</span>}
          </div>
          <div className="mt-1 text-[13px] leading-snug opacity-90">
            <Inline text={it.body} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function Label({ children, tone = 'slate' }: { children: ReactNode; tone?: Tone }) {
  return <span className={`inline-block rounded px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${toneSolid[tone]}`}>{children}</span>
}

export function Mark({ children, tone = 'rose' }: { children: ReactNode; tone?: Tone }) {
  const bg = { rose: 'bg-rose-200/80', emerald: 'bg-emerald-200/80', amber: 'bg-amber-200/80', indigo: 'bg-indigo-200/80', sky: 'bg-sky-200/80', slate: 'bg-slate-200', violet: 'bg-violet-200/80' }[tone]
  return <mark className={`rounded px-0.5 text-inherit ${bg}`}>{children}</mark>
}
