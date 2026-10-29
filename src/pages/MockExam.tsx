import { useEffect, useMemo, useState } from 'react'
import { lessonById } from '../content'
import { mockQuestions } from '../content/mock'
import { mockFillBank } from '../content/fills'
import { essayTopics } from '../content/essays'
import type { ProgressApi } from '../progress'
import type { Navigate } from '../App'
import type { Question } from '../types'
import { FillAnswers, FillSentence, KeyPointsReview, fillScore } from '../components/QuestionCard'
import { Inline, Rich } from '../components/Rich'

type Part = 1 | 2 | 3
type Answer = number | string | string[]

interface Item {
  part: Part
  lesson: string
  question: Question
}

const partInfo: Record<Part, { title: string; note: string; tone: string }> = {
  1: { title: 'Part 1 · Multiple choice', note: 'All weeks', tone: 'text-indigo-700' },
  2: { title: 'Part 2 · Fill in the blanks', note: 'Mostly Week 7', tone: 'text-emerald-700' },
  3: { title: 'Part 3 · Essay', note: 'From the highlighted lecture texts', tone: 'text-violet-700' },
}

const sizes = {
  quick: { mcq: 15, fill: 10, minutes: 35, label: 'Quick mock' },
  full: { mcq: 30, fill: 20, minutes: 60, label: 'Full mock' },
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildExam(size: keyof typeof sizes): Item[] {
  const s = sizes[size]
  const mcqs = shuffle(mockQuestions.filter((m) => m.question.kind === 'mcq')).slice(0, s.mcq)
  const w7Count = Math.round(s.fill * 0.8)
  const fills = [
    ...shuffle(mockFillBank.filter((x) => x.week7)).slice(0, w7Count),
    ...shuffle(mockFillBank.filter((x) => !x.week7)).slice(0, s.fill - w7Count),
  ]
  const essay = shuffle(essayTopics)[0]
  return [
    ...mcqs.map((m) => ({ part: 1 as Part, lesson: m.lesson, question: m.question })),
    ...shuffle(fills).map((x, i) => ({ part: 2 as Part, lesson: x.lesson, question: { ...x.question, id: `mockfill-${x.lesson}-${i}` } as Question })),
    { part: 3 as Part, lesson: essay.lesson, question: essay.question },
  ]
}

function autoScore(it: Item, a: Answer | undefined): number | null {
  const q = it.question
  if (q.kind === 'mcq') return a === q.answer ? 1 : 0
  if (q.kind === 'fill') return fillScore(q, (a as string[]) ?? [])
  return null
}

function isAnswered(it: Item, a: Answer | undefined) {
  if (a === undefined) return false
  if (Array.isArray(a)) return a.some((x) => x.trim())
  if (typeof a === 'string') return a.trim().length > 0
  return it.question.kind === 'mcq'
}

export function MockExam({ api, navigate }: { api: ProgressApi; navigate: Navigate }) {
  const { recordAnswer, recordMock } = api
  const [phase, setPhase] = useState<'intro' | 'exam' | 'results'>('intro')
  const [items, setItems] = useState<Item[]>([])
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, Answer>>({})
  const [essayGrade, setEssayGrade] = useState<number | null>(null)
  const [saved, setSaved] = useState(false)

  const start = (size: keyof typeof sizes) => {
    setItems(buildExam(size))
    setAnswers({})
    setEssayGrade(null)
    setIndex(0)
    setSaved(false)
    setPhase('exam')
    window.scrollTo({ top: 0 })
  }

  const submit = () => {
    const unanswered = items.filter((it, i) => !isAnswered(it, answers[i])).length
    if (unanswered > 0 && !window.confirm(`${unanswered} question(s) are unanswered. Submit anyway?`)) return
    items.forEach((it, i) => {
      const s = autoScore(it, answers[i])
      if (s !== null) recordAnswer(it.question.id, it.lesson, s)
    })
    setPhase('results')
    window.scrollTo({ top: 0 })
  }

  const scores = useMemo(() => items.map((it, i) => (it.part === 3 ? essayGrade : autoScore(it, answers[i]))), [items, answers, essayGrade])

  const partScore = (p: Part) => {
    const idx = items.map((it, i) => (it.part === p ? i : -1)).filter((i) => i >= 0)
    const graded = idx.filter((i) => scores[i] !== null)
    const earned = graded.reduce((s, i) => s + (scores[i] ?? 0), 0)
    return { n: idx.length, earned, pct: idx.length && graded.length === idx.length ? Math.round((earned / idx.length) * 100) : null }
  }

  const p1 = partScore(1)
  const p2 = partScore(2)
  const p3 = partScore(3)
  const overall = p1.pct !== null && p2.pct !== null && p3.pct !== null ? Math.round((p1.pct + p2.pct + p3.pct) / 3) : null

  const byLesson = useMemo(() => {
    const map: Record<string, { sum: number; n: number }> = {}
    items.forEach((it, i) => {
      const s = scores[i]
      if (s === null) return
      map[it.lesson] ??= { sum: 0, n: 0 }
      map[it.lesson].sum += s
      map[it.lesson].n += 1
    })
    return Object.entries(map)
      .map(([lesson, v]) => ({ lesson, acc: v.sum / v.n }))
      .sort((a, b) => a.acc - b.acc)
  }, [items, scores])

  const weak = byLesson.filter((r) => r.acc < 0.7).map((r) => r.lesson)

  useEffect(() => {
    if (phase === 'results' && overall !== null && !saved) {
      recordMock({ at: Date.now(), percent: overall, weak })
      setSaved(true)
    }
  }, [phase, overall, saved, weak, recordMock])

  if (phase === 'intro') {
    return (
      <div className="space-y-6">
        <header>
          <div className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Final check</div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Mock midterm</h1>
          <p className="mt-2 text-[15.5px] text-slate-600">Built on your real midterm format. No feedback until you submit, like the real exam.</p>
        </header>
        <div className="grid gap-3 md:grid-cols-3">
          {([1, 2, 3] as Part[]).map((p) => (
            <div key={p} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className={`font-semibold ${partInfo[p].tone}`}>{partInfo[p].title}</div>
              <div className="text-[13.5px] text-slate-600">{partInfo[p].note}</div>
            </div>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {(Object.keys(sizes) as (keyof typeof sizes)[]).map((k) => (
            <button key={k} type="button" onClick={() => start(k)} className="rounded-xl border border-slate-200 bg-white p-5 text-left hover:border-indigo-400">
              <div className="text-lg font-semibold text-slate-900">{sizes[k].label}</div>
              <div className="text-[14px] text-slate-600">
                {sizes[k].mcq} multiple choice · {sizes[k].fill} fill-in (80% Week 7) · 1 essay · about {sizes[k].minutes} min
              </div>
            </button>
          ))}
        </div>
        <p className="text-[13px] text-slate-500">The point split between the three parts isn't known, so the overall score is the average of the three part scores.</p>
      </div>
    )
  }

  if (phase === 'exam') {
    const it = items[index]
    const q = it.question
    const a = answers[index]
    const setA = (v: Answer) => setAnswers((prev) => ({ ...prev, [index]: v }))
    const answeredCount = items.filter((x, i) => isAnswered(x, answers[i])).length
    return (
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-xl font-bold text-slate-900">
            Mock midterm · {index + 1} of {items.length}
          </h1>
          <span className="text-sm text-slate-500">{answeredCount} answered</span>
        </div>
        <div className="space-y-1.5">
          {([1, 2, 3] as Part[]).map((p) => (
            <div key={p} className="flex flex-wrap items-center gap-1">
              <span className={`mr-1 w-16 text-[11px] font-semibold uppercase ${partInfo[p].tone}`}>Part {p}</span>
              {items.map((x, i) =>
                x.part === p ? (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`h-7 min-w-7 rounded px-1 text-[12px] font-semibold ${i === index ? 'bg-indigo-600 text-white' : isAnswered(x, answers[i]) ? 'bg-indigo-100 text-indigo-900' : 'bg-slate-200 text-slate-600'}`}
                    aria-label={`Go to question ${i + 1}`}
                  >
                    {p === 3 ? 'Essay' : i + 1}
                  </button>
                ) : null,
              )}
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className={`mb-2 text-xs font-semibold uppercase tracking-wide ${partInfo[it.part].tone}`}>{partInfo[it.part].title}</div>
          {q.kind === 'mcq' && (
            <>
              {q.scenario && (
                <div className="mb-3 rounded-lg border-l-4 border-indigo-300 bg-indigo-50/60 px-4 py-3 text-[15px] text-slate-700">
                  <Rich text={q.scenario} />
                </div>
              )}
              <div className="mb-4 text-[16px] font-medium text-slate-900">
                <Rich text={q.prompt} />
              </div>
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
            </>
          )}
          {q.kind === 'fill' && (
            <FillSentence
              key={index}
              q={q}
              inputs={(a as string[]) ?? q.blanks.map(() => '')}
              checked={false}
              onChange={(i, v) => {
                const cur = ((a as string[]) ?? q.blanks.map(() => '')).slice()
                cur[i] = v
                setA(cur)
              }}
            />
          )}
          {q.kind === 'short' && (
            <>
              <div className="mb-3 text-[16px] font-medium text-slate-900">
                <Rich text={q.prompt} />
              </div>
              <textarea
                value={(a as string) ?? ''}
                onChange={(e) => setA(e.target.value)}
                rows={14}
                placeholder="Introduction → 2–3 body paragraphs with examples → conclusion"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[15px] focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button type="button" disabled={index === 0} onClick={() => setIndex((i) => i - 1)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-40">
            ← Previous
          </button>
          <div className="flex gap-2">
            {index < items.length - 1 && (
              <button type="button" onClick={() => setIndex((i) => i + 1)} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                Next →
              </button>
            )}
            <button type="button" onClick={submit} className={`rounded-lg px-4 py-2 text-sm font-semibold ${index === items.length - 1 ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'border border-emerald-600 text-emerald-700 hover:bg-emerald-50'}`}>
              Submit exam
            </button>
          </div>
        </div>
      </div>
    )
  }

  const essayIndex = items.findIndex((x) => x.part === 3)
  const essayItem = items[essayIndex]
  const fmt = (x: number) => (x % 1 === 0 ? x : x.toFixed(1))

  return (
    <div className="space-y-6">
      <header>
        <div className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Results</div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{overall !== null ? `Overall: ${overall}%` : 'Grade your essay to see your overall score'}</h1>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {[
            { p: 1 as Part, s: p1 },
            { p: 2 as Part, s: p2 },
            { p: 3 as Part, s: p3 },
          ].map(({ p, s }) => (
            <div key={p} className="rounded-lg border border-slate-200 bg-white px-4 py-3">
              <div className={`text-[13px] font-semibold ${partInfo[p].tone}`}>{partInfo[p].title}</div>
              <div className="text-xl font-bold text-slate-900">{s.pct !== null ? `${s.pct}%` : 'not graded'}</div>
              <div className="text-[12.5px] text-slate-500">
                {fmt(s.earned)} / {s.n} {p === 3 ? 'self-graded' : 'points'}
              </div>
            </div>
          ))}
        </div>
      </header>

      {essayItem && essayItem.question.kind === 'short' && (
        <section className="rounded-xl border-2 border-violet-300 bg-white p-5">
          <h2 className="font-bold text-violet-900">Part 3 · Grade your essay</h2>
          <div className="mt-1 font-medium text-slate-900">
            <Rich text={essayItem.question.prompt} />
          </div>
          <div className="mt-3 space-y-3 text-[14.5px]">
            <div className="whitespace-pre-wrap rounded-lg bg-slate-50 px-3 py-2 text-slate-700">{(answers[essayIndex] as string) || '(no answer)'}</div>
            <KeyPointsReview q={essayItem.question} answer={(answers[essayIndex] as string) ?? ''} />
            <div className="flex flex-wrap gap-2">
              {[
                { v: 1, label: 'Covered all key points, clearly organized' },
                { v: 0.5, label: 'Covered some' },
                { v: 0, label: 'Missed most' },
              ].map((o) => (
                <button
                  key={o.v}
                  type="button"
                  onClick={() => {
                    setEssayGrade(o.v)
                    recordAnswer(essayItem.question.id, essayItem.lesson, o.v)
                  }}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${essayGrade === o.v ? 'border-violet-500 bg-violet-50 text-violet-800' : 'border-slate-300 text-slate-700 hover:bg-slate-50'}`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-bold text-slate-900">Score by topic</h2>
        <div className="mt-3 space-y-1.5">
          {byLesson.map((r) => (
            <a key={r.lesson} href={`#/lesson/${r.lesson}`} className="flex items-center gap-3 text-[14px] hover:underline">
              <span className="w-48 shrink-0 truncate text-slate-800 sm:w-72">{lessonById[r.lesson]?.title}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                <span className={`block h-full rounded-full ${r.acc < 0.7 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${Math.max(4, r.acc * 100)}%` }} />
              </span>
              <span className={`w-12 text-right font-semibold ${r.acc < 0.7 ? 'text-rose-700' : 'text-emerald-700'}`}>{Math.round(r.acc * 100)}%</span>
            </a>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {weak.length > 0 && (
            <button type="button" onClick={() => navigate(`/practice?lessons=${weak.join(',')}`)} className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700">
              Practice my {weak.length} weak topic{weak.length > 1 ? 's' : ''} →
            </button>
          )}
          <button type="button" onClick={() => setPhase('intro')} className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700">
            Retake a new mock
          </button>
          <a href="#/essays" className="rounded-lg border border-violet-300 px-4 py-2 text-sm font-medium text-violet-700 hover:bg-violet-50">
            Practice the other essay topics
          </a>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">Review Parts 1 and 2</h2>
        {items.map((it, i) => {
          if (it.part === 3) return null
          const q = it.question
          const s = scores[i] ?? 0
          const border = s >= 1 ? 'border-emerald-300' : s > 0 ? 'border-amber-300' : 'border-rose-300'
          return (
            <div key={i} className={`rounded-xl border-2 bg-white p-4 ${border}`}>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span>
                  Q{i + 1} · {partInfo[it.part].title} · {lessonById[it.lesson]?.title}
                </span>
                <span className="font-semibold">{s >= 1 ? 'Correct' : s > 0 ? 'Partly' : 'Wrong'}</span>
              </div>
              {q.kind === 'mcq' && (
                <div className="mt-1 space-y-1 text-[14.5px]">
                  <div className="font-medium text-slate-900">
                    <Rich text={q.prompt} />
                  </div>
                  <div>
                    <span className="text-slate-500">Your answer: </span>
                    <span className={s === 1 ? 'text-emerald-800' : 'text-rose-800'}>{answers[i] === undefined ? '(no answer)' : <Inline text={q.options[answers[i] as number]} />}</span>
                  </div>
                  {s !== 1 && (
                    <div>
                      <span className="text-slate-500">Correct: </span>
                      <span className="text-emerald-800">
                        <Inline text={q.options[q.answer]} />
                      </span>
                    </div>
                  )}
                  <div className="rounded-lg bg-slate-50 px-3 py-2 text-slate-700">
                    <Rich text={q.explain} />
                  </div>
                </div>
              )}
              {q.kind === 'fill' && (
                <div className="mt-2 space-y-2 text-[14.5px]">
                  <FillSentence q={q} inputs={(answers[i] as string[]) ?? []} checked />
                  <FillAnswers q={q} inputs={(answers[i] as string[]) ?? []} />
                  <div className="rounded-lg bg-slate-50 px-3 py-2 text-slate-700">
                    <Rich text={q.explain} />
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
