import { useState } from 'react'
import { lessonById } from '../content'
import { essayTopics } from '../content/essays'
import type { ProgressApi } from '../progress'
import { QuestionCard } from '../components/QuestionCard'

export function Essays({ api }: { api: ProgressApi }) {
  const { progress, recordAnswer } = api
  const [open, setOpen] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  return (
    <div className="space-y-6">
      <header>
        <div className="text-sm font-semibold uppercase tracking-wide text-violet-600">Exam part 3</div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Essay prep: your highlighted texts</h1>
        <p className="mt-2 text-[15.5px] leading-relaxed text-slate-600">
          The essay comes from the <b>highlighted texts in your lecture files</b>. These are every highlighted passage, grouped into {essayTopics.length} likely essay topics. For each one: read what's highlighted, open the lesson if anything is unclear, then write a practice essay and check it against the plan, key points and a model essay.
        </p>
      </header>

      <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-4 text-[14.5px] text-violet-950">
        <b>How to write a strong essay answer:</b> a 1–2 sentence introduction that defines the key term → 2–3 body paragraphs, each with one idea + an example from the readings → a short conclusion that answers the question. Use the exact course terms (they are bolded in each plan).
      </div>

      <div className="space-y-4">
        {essayTopics.map((t, i) => {
          const done = progress.answers[t.question.id]
          const isOpen = open === t.id
          return (
            <section key={t.id} className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-violet-600">Essay topic {i + 1}</div>
                  <h2 className="text-lg font-bold text-slate-900">{t.title}</h2>
                  <div className="mt-0.5 text-[13px] text-slate-500">Highlighted in: {t.highlightedIn}</div>
                </div>
                {done && <span className="rounded bg-emerald-100 px-2 py-0.5 text-[12px] font-semibold text-emerald-800">Practiced · self-grade {Math.round(done.score * 100)}%</span>}
              </div>
              <div className="mt-3">
                <div className="mb-1 text-sm font-semibold text-slate-800">What's highlighted (summarized)</div>
                <ul className="list-disc space-y-1 pl-5 text-[14.5px] text-slate-700">
                  {t.covers.map((c, j) => (
                    <li key={j}>{c}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(isOpen ? null : t.id)
                    setAttempt((a) => a + 1)
                  }}
                  className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
                >
                  {isOpen ? 'Close practice' : done ? 'Write it again' : 'Practice this essay'}
                </button>
                <a href={`#/lesson/${t.lesson}`} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Review lesson: {lessonById[t.lesson]?.title}
                </a>
              </div>
              {isOpen && (
                <div className="mt-4">
                  <QuestionCard key={`${t.id}-${attempt}`} question={t.question} onDone={(s) => recordAnswer(t.question.id, t.lesson, s)} />
                </div>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
