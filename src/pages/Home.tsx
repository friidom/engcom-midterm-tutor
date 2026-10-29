import { lessons, minutesFor, orderedLessons, priorityLabel, units } from '../content'
import { lessonAccuracy, type ProgressApi } from '../progress'
import type { Navigate } from '../App'
import type { Priority } from '../types'
import { PriorityBadge, priorityStyle } from '../components/Sidebar'

const flow = ['Learn', 'See an example', 'Understand the visual', 'Practice', 'Check mistakes', 'Continue']

export function Home({ api, navigate }: { api: ProgressApi; navigate: Navigate }) {
  const { progress, reset } = api
  const done = new Set(progress.completed)
  const ordered = orderedLessons(progress.order)
  const next = (progress.current && !done.has(progress.current) ? lessons.find((l) => l.id === progress.current) : undefined) ?? ordered.find((l) => !done.has(l.id))
  const allDone = done.size === lessons.length

  const weak = lessons
    .map((l) => ({ l, acc: lessonAccuracy(progress.answers, l.id) }))
    .filter((x) => x.acc !== null && x.acc < 0.7)
    .sort((a, b) => (a.acc ?? 0) - (b.acc ?? 0))

  const passes: { p: Priority; label: string; note: string }[] = [
    { p: 'high', label: 'Pass 1: High priority', note: 'Week 7 (most fill-in questions) + every lesson with highlighted lecture text (essay sources).' },
    { p: 'medium', label: 'Pass 2: Medium priority', note: 'Weeks 1–6 core topics, mainly tested by multiple choice.' },
    { p: 'low', label: 'Pass 3: Low priority', note: 'Week 7 side sections: communication technology, collaboration tools.' },
  ]

  const lastMock = progress.mocks[progress.mocks.length - 1]

  return (
    <div className="space-y-8">
      <header>
        <div className="text-sm font-semibold uppercase tracking-wide text-indigo-600">One-Night Mode</div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Engineering Communication: midterm tutor</h1>
        <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-slate-600">
          {lessons.length} short lessons built from your Week 1–7 materials. Do them in the order below, then use Quick Revision and the Mock Midterm.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {next ? (
            <button type="button" onClick={() => navigate(`/lesson/${next.id}`)} className="rounded-lg bg-indigo-600 px-5 py-3 text-[15px] font-semibold text-white shadow-sm hover:bg-indigo-700">
              {done.size === 0 ? 'Start lesson 1' : 'Continue'}: {next.title} →
            </button>
          ) : (
            <button type="button" onClick={() => navigate('/mock')} className="rounded-lg bg-indigo-600 px-5 py-3 text-[15px] font-semibold text-white shadow-sm hover:bg-indigo-700">
              All lessons done. Take the mock midterm →
            </button>
          )}
          <button type="button" onClick={() => navigate('/revision')} className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-[15px] font-semibold text-slate-700 hover:bg-slate-50">
            Quick revision
          </button>
        </div>
      </header>

      <section className="rounded-xl border-2 border-indigo-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-indigo-700">Your midterm format</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div className="rounded-lg bg-indigo-50 p-3">
            <div className="font-semibold text-indigo-950">1 · Multiple choice</div>
            <div className="text-[13.5px] text-slate-700">Any week. Every lesson has multiple-choice practice.</div>
          </div>
          <div className="rounded-lg bg-emerald-50 p-3">
            <div className="font-semibold text-emerald-950">2 · Fill in the blanks</div>
            <div className="text-[13.5px] text-slate-700">Mostly Week 7. Know the exact terms; Week 7 lessons have extra fill-in practice.</div>
          </div>
          <a href="#/essays" className="rounded-lg bg-violet-50 p-3 hover:bg-violet-100">
            <div className="font-semibold text-violet-950">3 · Essay →</div>
            <div className="text-[13.5px] text-slate-700">From the highlighted texts in your lectures. See Essay prep for all 7 topics.</div>
          </a>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">How every lesson works</h2>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[14px]">
          {flow.map((f, i) => (
            <span key={f} className="flex items-center gap-2">
              <span className="rounded-full bg-indigo-50 px-3 py-1 font-medium text-indigo-900">
                {i + 1}. {f}
              </span>
              {i < flow.length - 1 && <span className="text-slate-400">→</span>}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[14px] text-slate-600">If you get a question wrong, you'll see why and then get one similar question before moving on.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">Tonight's plan</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {passes.map((pass) => {
            const items = lessons.filter((l) => l.priority === pass.p)
            const d = items.filter((l) => done.has(l.id)).length
            return (
              <div key={pass.p} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <span className={`rounded px-2 py-0.5 text-xs font-semibold ${priorityStyle[pass.p]}`}>{pass.label}</span>
                  <span className="text-xs text-slate-500">≈ {minutesFor(pass.p)} min</span>
                </div>
                <div className="mt-2 text-2xl font-bold text-slate-900">
                  {d}/{items.length} <span className="text-sm font-medium text-slate-500">lessons done</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(d / items.length) * 100}%` }} />
                </div>
                <p className="mt-2 text-[13px] leading-snug text-slate-600">{pass.note}</p>
              </div>
            )
          })}
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <a href="#/essays" className="rounded-xl border border-violet-200 bg-white p-4 hover:border-violet-400">
            <div className="font-semibold text-slate-900">Then: Essay prep (≈ 40 min)</div>
            <div className="text-[13px] text-slate-600">Write 2–3 practice essays on the highlighted topics and compare them with the model essays.</div>
          </a>
          <a href="#/revision" className="rounded-xl border border-slate-200 bg-white p-4 hover:border-indigo-300">
            <div className="font-semibold text-slate-900">Then: Quick revision (≈ 20 min)</div>
            <div className="text-[13px] text-slate-600">Lists to memorize, key differences, definitions, visual cheat sheets, key examples.</div>
          </a>
          <a href="#/mock" className="rounded-xl border border-slate-200 bg-white p-4 hover:border-indigo-300">
            <div className="font-semibold text-slate-900">Finally: Mock midterm (≈ 20–45 min)</div>
            <div className="text-[13px] text-slate-600">
              {lastMock ? `Last attempt: ${lastMock.percent}%. ` : ''}Score, weak topics, and targeted practice.
            </div>
          </a>
        </div>
      </section>

      {weak.length > 0 && (
        <section className="rounded-xl border border-rose-200 bg-rose-50/50 p-5">
          <h2 className="font-bold text-rose-900">Your weak topics so far (below 70%)</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {weak.map(({ l, acc }) => (
              <a key={l.id} href={`#/lesson/${l.id}`} className="rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-[13px] font-medium text-rose-900 hover:bg-rose-50">
                {l.title} · {Math.round((acc ?? 0) * 100)}%
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => navigate(`/practice?lessons=${weak.map((w) => w.l.id).join(',')}`)}
            className="mt-3 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
          >
            Practice weak topics
          </button>
        </section>
      )}

      <section>
        <h2 className="text-xl font-bold text-slate-900">Course roadmap</h2>
        <p className="mt-1 text-[14px] text-slate-600">Every topic in your materials, grouped the way the course runs. Click any lesson to open or revisit it.</p>
        <div className="mt-4 space-y-4">
          {units.map((u) => {
            const items = lessons.filter((l) => l.unit === u.id)
            return (
              <div key={u.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-slate-900">{u.title}</h3>
                  <span className="text-xs text-slate-500">
                    {u.weeks} · {items.filter((l) => done.has(l.id)).length}/{items.length} done
                  </span>
                </div>
                <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
                  {items.map((l) => {
                    const isDone = done.has(l.id)
                    const isCurrent = progress.current === l.id
                    return (
                      <a
                        key={l.id}
                        href={`#/lesson/${l.id}`}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-[13.5px] transition hover:border-indigo-300 ${
                          isCurrent ? 'border-indigo-400 bg-indigo-50' : 'border-slate-200'
                        }`}
                      >
                        <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] ${isDone ? 'bg-emerald-500 text-white' : isCurrent ? 'border-2 border-indigo-500' : 'border border-slate-300'}`}>
                          {isDone ? '✓' : ''}
                        </span>
                        <span className="flex-1 text-slate-800">{l.title}</span>
                        <PriorityBadge p={l.priority} />
                      </a>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-[14px] leading-relaxed text-slate-700">
        <h2 className="font-semibold text-slate-900">About your materials (read once)</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            Priorities follow <b>your midterm format</b>: <b>{priorityLabel.high}</b> = Week 7 (most fill-in questions) and the lessons with <b>highlighted text</b> in your lecture PDFs (essay sources: 6.2–6.4, 7.2, 7.5, 7.8.1, 7.10); <b>{priorityLabel.medium}</b> = Weeks 1–6 topics for multiple choice; <b>{priorityLabel.low}</b> = side sections.
          </li>
          <li>
            The mock exam copies the format: Part 1 multiple choice, Part 2 fill in the blanks (80% Week 7), Part 3 one essay from a highlighted topic. The point split between parts isn't known.
          </li>
          <li>
            The Week 7 <b>videos</b> (meeting minutes, meeting notes, cultural differences, three on gaslighting) can't be read here. Their topics are taught from the matching textbook chapters and the gaslighting article. Watch them if you have time.
          </li>
          <li>The Week 3 <b>Economist issue</b> (scanned magazine) is practice reading for quoting, summarizing and paraphrasing. It has no separate lesson.</li>
        </ul>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Reset all progress, answers and mock results?')) reset()
          }}
          className="mt-4 text-[13px] text-slate-500 underline hover:text-rose-700"
        >
          Reset my progress
        </button>
      </section>

      {allDone && <p className="text-center text-sm text-emerald-700">You've completed every lesson. Good luck tomorrow!</p>}
    </div>
  )
}
