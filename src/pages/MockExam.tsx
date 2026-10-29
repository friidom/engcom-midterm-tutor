import { useEffect, useMemo, useState } from 'react'
import { lessonById } from '../content'
import { mockQuestions, type MockQuestion } from '../content/mock'
import type { ProgressApi } from '../progress'
import type { Navigate } from '../App'
import { KeyPointsReview, questionLabel } from '../components/QuestionCard'
import { Inline, Rich } from '../components/Rich'

type Answer = number | boolean | string

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function autoScore(m: MockQuestion, a: Answer | undefined): number | null {
  const q = m.question
  if (q.kind === 'short') return null
  if (a === undefined) return 0
  return a === q.answer ? 1 : 0
}

function answerText(m: MockQuestion, a: Answer | undefined) {
  const q = m.question
  if (a === undefined || a === '') return '(no answer)'
  if (q.kind === 'mcq') return `${String.fromCharCode(65 + (a as number))}. ${q.options[a as number]}`
  if (q.kind === 'tf') return a ? 'True' : 'False'
  return String(a)
}

export function MockExam({ api, navigate }: { api: ProgressApi; navigate: Navigate }) {
  const { recordAnswer, recordMock } = api
  const [phase, setPhase] = useState<'intro' | 'exam' | 'results'>('intro')
  const [set, setSet] = useState<MockQuestion[]>([])
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [grades, setGrades] = useState<Record<string, number>>({})
  const [saved, setSaved] = useState(false)

  const start = (size: number | 'all') => {
    const shuffled = shuffle(mockQuestions)
    setSet(size === 'all' ? shuffled : shuffled.slice(0, size))
    setAnswers({})
    setGrades({})
    setIndex(0)
    setSaved(false)
    setPhase('exam')
    window.scrollTo({ top: 0 })
  }

  const submit = () => {
    const unanswered = set.filter((m) => answers[m.question.id] === undefined || answers[m.question.id] === '').length
    if (unanswered > 0 && !window.confirm(`${unanswered} question(s) are unanswered. Submit anyway?`)) return
    set.forEach((m) => {
      const s = autoScore(m, answers[m.question.id])
      if (s !== null) recordAnswer(m.question.id, m.lesson, s)
    })
    setPhase('results')
    window.scrollTo({ top: 0 })
  }

  const grade = (m: MockQuestion, s: number) => {
    setGrades((g) => ({ ...g, [m.question.id]: s }))
    recordAnswer(m.question.id, m.lesson, s)
  }

  const scores = useMemo(() => {
    const per: Record<string, number | null> = {}
    set.forEach((m) => {
      const auto = autoScore(m, answers[m.question.id])
      per[m.question.id] = auto !== null ? auto : (grades[m.question.id] ?? null)
    })
    return per
  }, [set, answers, grades])

  const ungraded = set.filter((m) => scores[m.question.id] === null).length
  const earned = set.reduce((s, m) => s + (scores[m.question.id] ?? 0), 0)
  const percent = set.length ? Math.round((earned / set.length) * 100) : 0

  const byLesson = useMemo(() => {
    const map: Record<string, { sum: number; n: number }> = {}
    set.forEach((m) => {
      const s = scores[m.question.id]
      if (s === null) return
      map[m.lesson] ??= { sum: 0, n: 0 }
      map[m.lesson].sum += s
      map[m.lesson].n += 1
    })
    return Object.entries(map)
      .map(([lesson, v]) => ({ lesson, acc: v.sum / v.n, n: v.n }))
      .sort((a, b) => a.acc - b.acc)
  }, [set, scores])

  const weak = byLesson.filter((r) => r.acc < 0.7).map((r) => r.lesson)

  useEffect(() => {
    if (phase === 'results' && ungraded === 0 && !saved && set.length > 0) {
      recordMock({ at: Date.now(), percent, weak })
      setSaved(true)
    }
  }, [phase, ungraded, saved, set.length, percent, weak, recordMock])

  if (phase === 'intro') {
    const counts = { mcq: 0, tf: 0, short: 0 }
    mockQuestions.forEach((m) => counts[m.question.kind]++)
    return (
      <div className="space-y-6">
        <header>
          <div className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Final check</div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Mock midterm</h1>
        </header>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-[15px] text-amber-950">
          <b>About the format:</b> your files don't describe the real midterm format, so this mock mixes the question types used in your course materials: {counts.mcq} multiple-choice, {counts.tf} true/false and {counts.short} short written answers, covering every lesson (more questions on High-priority topics). You won't see feedback until you submit, like a real exam.
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <button type="button" onClick={() => start(25)} className="rounded-xl border border-slate-200 bg-white p-5 text-left hover:border-indigo-400">
            <div className="text-lg font-semibold text-slate-900">Quick mock</div>
            <div className="text-[14px] text-slate-600">25 random questions · about 20 minutes</div>
          </button>
          <button type="button" onClick={() => start('all')} className="rounded-xl border border-slate-200 bg-white p-5 text-left hover:border-indigo-400">
            <div className="text-lg font-semibold text-slate-900">Full mock</div>
            <div className="text-[14px] text-slate-600">All {mockQuestions.length} questions · about 45 minutes</div>
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'exam') {
    const m = set[index]
    const q = m.question
    const a = answers[q.id]
    const setA = (v: Answer) => setAnswers((prev) => ({ ...prev, [q.id]: v }))
    const answeredCount = set.filter((x) => answers[x.question.id] !== undefined && answers[x.question.id] !== '').length
    return (
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-xl font-bold text-slate-900">
            Mock midterm · Question {index + 1} of {set.length}
          </h1>
          <span className="text-sm text-slate-500">{answeredCount} answered</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {set.map((x, i) => {
            const has = answers[x.question.id] !== undefined && answers[x.question.id] !== ''
            return (
              <button
                key={x.question.id}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-7 w-7 rounded text-[12px] font-semibold ${i === index ? 'bg-indigo-600 text-white' : has ? 'bg-indigo-100 text-indigo-900' : 'bg-slate-200 text-slate-600'}`}
                aria-label={`Go to question ${i + 1}`}
              >
                {i + 1}
              </button>
            )
          })}
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-indigo-600">{questionLabel(q)}</div>
          {q.scenario && (
            <div className="mb-3 rounded-lg border-l-4 border-indigo-300 bg-indigo-50/60 px-4 py-3 text-[15px] text-slate-700">
              <Rich text={q.scenario} />
            </div>
          )}
          <div className="mb-4 text-[16px] font-medium text-slate-900">
            <Rich text={q.prompt} />
          </div>
          {q.kind === 'mcq' && (
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setA(i)}
                  className={`flex w-full items-start gap-3 rounded-lg border px-4 py-2.5 text-left text-[15px] ${a === i ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500' : 'border-slate-200 hover:bg-slate-50'}`}
                >
                  <span className="font-semibold text-slate-500">{String.fromCharCode(65 + i)}</span>
                  <span>
                    <Inline text={opt} />
                  </span>
                </button>
              ))}
            </div>
          )}
          {q.kind === 'tf' && (
            <div className="flex gap-3">
              {[true, false].map((v) => (
                <button
                  key={String(v)}
                  type="button"
                  onClick={() => setA(v)}
                  className={`flex-1 rounded-lg border px-4 py-2.5 font-semibold ${a === v ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500' : 'border-slate-200 hover:bg-slate-50'}`}
                >
                  {v ? 'True' : 'False'}
                </button>
              ))}
            </div>
          )}
          {q.kind === 'short' && (
            <textarea
              value={(a as string) ?? ''}
              onChange={(e) => setA(e.target.value)}
              rows={5}
              placeholder="Write your answer…"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[15px] focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button type="button" disabled={index === 0} onClick={() => setIndex((i) => i - 1)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-40">
            ← Previous
          </button>
          <div className="flex gap-2">
            {index < set.length - 1 && (
              <button type="button" onClick={() => setIndex((i) => i + 1)} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                Next →
              </button>
            )}
            <button type="button" onClick={submit} className={`rounded-lg px-4 py-2 text-sm font-semibold ${index === set.length - 1 ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'border border-emerald-600 text-emerald-700 hover:bg-emerald-50'}`}>
              Submit exam
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <header>
        <div className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Results</div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          {ungraded > 0 ? `So far: ${percent}%` : `Final score: ${percent}%`}
        </h1>
        <p className="mt-1 text-slate-600">
          {earned % 1 === 0 ? earned : earned.toFixed(1)} of {set.length} points.{' '}
          {ungraded > 0 && <b className="text-amber-700">Self-grade the {ungraded} written answer(s) below to get your final score.</b>}
        </p>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-bold text-slate-900">Score by topic</h2>
        <div className="mt-3 space-y-1.5">
          {byLesson.map((r) => (
            <a key={r.lesson} href={`#/lesson/${r.lesson}`} className="flex items-center gap-3 text-[14px] hover:underline">
              <span className="w-56 shrink-0 truncate text-slate-800 sm:w-72">{lessonById[r.lesson]?.title}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                <span className={`block h-full rounded-full ${r.acc < 0.7 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${Math.max(4, r.acc * 100)}%` }} />
              </span>
              <span className={`w-12 text-right font-semibold ${r.acc < 0.7 ? 'text-rose-700' : 'text-emerald-700'}`}>{Math.round(r.acc * 100)}%</span>
            </a>
          ))}
        </div>
        {weak.length > 0 ? (
          <div className="mt-4 rounded-lg bg-rose-50 p-4">
            <div className="font-semibold text-rose-900">Weak topics (below 70%): {weak.length}</div>
            <p className="mt-1 text-[14px] text-rose-950">Reread these lessons, then do the targeted practice. It uses each lesson's practice questions, with similar follow-ups after mistakes.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={() => navigate(`/practice?lessons=${weak.join(',')}`)} className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700">
                Practice my weak topics →
              </button>
              <button type="button" onClick={() => setPhase('intro')} className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                Retake a mock
              </button>
            </div>
          </div>
        ) : (
          ungraded === 0 && (
            <div className="mt-4 rounded-lg bg-emerald-50 p-4 text-emerald-900">
              No weak topics, nice work. <button type="button" onClick={() => setPhase('intro')} className="underline">Retake a different mix</button>
            </div>
          )
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">Review every question</h2>
        {set.map((m, i) => {
          const q = m.question
          const s = scores[q.id]
          const a = answers[q.id]
          const border = s === null ? 'border-amber-300' : s >= 1 ? 'border-emerald-300' : s > 0 ? 'border-amber-300' : 'border-rose-300'
          return (
            <div key={q.id} className={`rounded-xl border-2 bg-white p-4 ${border}`}>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span>
                  Q{i + 1} · {questionLabel(q)} · {lessonById[m.lesson]?.title}
                </span>
                <span className="font-semibold">{s === null ? 'Needs self-grade' : s >= 1 ? 'Correct' : s > 0 ? 'Partly' : 'Wrong'}</span>
              </div>
              <div className="mt-1 font-medium text-slate-900">
                <Rich text={q.prompt} />
              </div>
              {q.kind !== 'short' ? (
                <div className="mt-2 space-y-1 text-[14.5px]">
                  <div>
                    <span className="text-slate-500">Your answer: </span>
                    <span className={s === 1 ? 'text-emerald-800' : 'text-rose-800'}>
                      <Inline text={answerText(m, a)} />
                    </span>
                  </div>
                  {s !== 1 && (
                    <div>
                      <span className="text-slate-500">Correct: </span>
                      <span className="text-emerald-800">
                        <Inline text={answerText(m, q.answer)} />
                      </span>
                    </div>
                  )}
                  <div className="rounded-lg bg-slate-50 px-3 py-2 text-slate-700">
                    <Rich text={q.explain} />
                  </div>
                </div>
              ) : (
                <div className="mt-2 space-y-3 text-[14.5px]">
                  <div className="rounded-lg bg-slate-50 px-3 py-2 text-slate-700">
                    <span className="text-slate-500">Your answer: </span>
                    {answerText(m, a)}
                  </div>
                  <KeyPointsReview q={q} answer={typeof a === 'string' ? a : ''} />
                  <div className="flex flex-wrap gap-2">
                    {[
                      { v: 1, label: 'Covered all key points' },
                      { v: 0.5, label: 'Covered some' },
                      { v: 0, label: 'Missed most' },
                    ].map((o) => (
                      <button
                        key={o.v}
                        type="button"
                        onClick={() => grade(m, o.v)}
                        className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${grades[q.id] === o.v ? 'border-indigo-500 bg-indigo-50 text-indigo-800' : 'border-slate-300 text-slate-700 hover:bg-slate-50'}`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </section>
    </div>
  )
}
