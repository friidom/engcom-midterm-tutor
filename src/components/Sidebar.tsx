import { lessons, orderedLessons, priorityLabel, units } from '../content'
import type { ProgressApi } from '../progress'
import type { Lesson, Priority } from '../types'

export const priorityStyle: Record<Priority, string> = {
  high: 'bg-rose-100 text-rose-800',
  medium: 'bg-amber-100 text-amber-800',
  low: 'bg-slate-100 text-slate-600',
}

export function PriorityBadge({ p }: { p: Priority }) {
  return <span className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${priorityStyle[p]}`}>{priorityLabel[p]}</span>
}

function LessonLink({ l, done, current, active, showPriority }: { l: Lesson; done: boolean; current: boolean; active: boolean; showPriority: boolean }) {
  return (
    <a
      href={`#/lesson/${l.id}`}
      className={`flex items-start gap-2 rounded-lg px-2.5 py-1.5 text-[13.5px] leading-snug transition ${
        active ? 'bg-indigo-50 font-semibold text-indigo-900' : 'text-slate-700 hover:bg-slate-100'
      }`}
    >
      <span
        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] ${
          done ? 'bg-emerald-500 text-white' : current ? 'border-2 border-indigo-500' : 'border border-slate-300'
        }`}
        aria-label={done ? 'completed' : current ? 'current lesson' : 'not started'}
      >
        {done ? '✓' : ''}
      </span>
      <span className="flex-1">{l.title}</span>
      {showPriority && <PriorityBadge p={l.priority} />}
    </a>
  )
}

export function Sidebar({ api, path }: { api: ProgressApi; path: string }) {
  const { progress, setOrder } = api
  const done = new Set(progress.completed)
  const total = lessons.length
  const pct = Math.round((done.size / total) * 100)
  const activeId = path.startsWith('/lesson/') ? path.slice(8) : ''

  const groups: { title: string; sub?: string; items: Lesson[] }[] =
    progress.order === 'priority'
      ? (['high', 'medium', 'low'] as Priority[]).map((p) => ({
          title: `${priorityLabel[p]} priority`,
          items: orderedLessons('priority').filter((l) => l.priority === p),
        }))
      : units.map((u) => ({ title: u.title, sub: u.weeks, items: lessons.filter((l) => l.unit === u.id) }))

  const navItem = (href: string, label: string, match: string) => (
    <a
      href={href}
      className={`rounded-lg px-2.5 py-1.5 text-[14px] font-medium ${path === match ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
    >
      {label}
    </a>
  )

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="hidden lg:block">
        <a href="#/" className="block text-lg font-bold text-slate-900">
          EngCom Midterm Tutor
        </a>
        <div className="text-xs text-slate-500">Engineering Communication · Inha University in Tashkent</div>
      </div>

      <div>
        <div className="flex justify-between text-xs font-medium text-slate-600">
          <span>Overall progress</span>
          <span>
            {done.size}/{total} lessons · {pct}%
          </span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <nav className="flex flex-col gap-0.5">
        {navItem('#/', 'Start here: plan & roadmap', '/')}
        {navItem('#/essays', 'Essay prep (highlighted texts)', '/essays')}
        {navItem('#/revision', 'Quick revision', '/revision')}
        {navItem('#/mock', 'Mock midterm', '/mock')}
      </nav>

      <div>
        <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">Lesson order</div>
        <div className="grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1 text-[13px] font-medium">
          {(
            [
              ['priority', 'One-Night'],
              ['course', 'By week'],
            ] as const
          ).map(([o, label]) => (
            <button
              key={o}
              type="button"
              onClick={() => setOrder(o)}
              className={`rounded-md px-2 py-1 ${progress.order === o ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {groups.map((g) => {
        const groupDone = g.items.filter((l) => done.has(l.id)).length
        return (
          <div key={g.title}>
            <div className="mb-1 flex items-baseline justify-between px-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {g.title}
                {g.sub && <span className="ml-1 font-normal normal-case text-slate-400">{g.sub}</span>}
              </span>
              <span className="text-[11px] text-slate-400">
                {groupDone}/{g.items.length}
              </span>
            </div>
            <div className="flex flex-col">
              {g.items.map((l) => (
                <LessonLink key={l.id} l={l} done={done.has(l.id)} current={progress.current === l.id} active={activeId === l.id} showPriority={progress.order === 'course'} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
