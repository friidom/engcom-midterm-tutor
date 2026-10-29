import { useEffect, type ReactNode } from 'react'
import { lessons, orderedLessons, units } from '../content'
import type { ProgressApi } from '../progress'
import type { Navigate } from '../App'
import type { Lesson } from '../types'
import { Practice } from '../components/Practice'
import { Inline, Rich } from '../components/Rich'
import { PriorityBadge } from '../components/Sidebar'

const sections = [
  { id: 'learn', label: '1 Learn' },
  { id: 'example', label: '2 Example' },
  { id: 'visual', label: '3 Visual' },
  { id: 'tips', label: '4 Exam tip' },
  { id: 'practice', label: '5 Practice' },
]

function Section({ id, step, title, children }: { id: string; step: number; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-36 lg:scroll-mt-20">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">{step}</span>
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      </div>
      {children}
    </section>
  )
}

export function LessonPage({ lesson, api, navigate }: { lesson: Lesson; api: ProgressApi; navigate: Navigate }) {
  const { progress, setCurrent, setCompleted, recordAnswer } = api
  const ordered = orderedLessons(progress.order)
  const idx = ordered.findIndex((l) => l.id === lesson.id)
  const prev = ordered[idx - 1]
  const next = ordered[idx + 1]
  const unit = units.find((u) => u.id === lesson.unit)
  const isDone = progress.completed.includes(lesson.id)

  useEffect(() => setCurrent(lesson.id), [lesson.id, setCurrent])

  const completeAndContinue = () => {
    setCompleted(lesson.id, true)
    const after = ordered.slice(idx + 1).find((l) => !progress.completed.includes(l.id)) ?? next
    if (after) {
      setCurrent(after.id)
      navigate(`/lesson/${after.id}`)
    } else navigate('/')
  }

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <article className="space-y-10">
      <header>
        <div className="text-sm text-slate-500">
          {unit?.title} · {unit?.weeks} · Lesson {lessons.indexOf(lesson) + 1} of {lessons.length}
        </div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{lesson.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <PriorityBadge p={lesson.priority} />
          <span>≈ {lesson.minutes} min</span>
          {isDone && <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-800">Completed</span>}
        </div>
        <div className="mt-2 text-[13px] text-slate-500">
          <span className="font-medium">From your files:</span> {lesson.sources.join(' · ')}
        </div>
      </header>

      <div className="sticky top-[57px] z-10 -mx-1 !mt-4 flex flex-wrap gap-1.5 bg-slate-50/95 px-1 py-2 backdrop-blur lg:top-0">
        {sections.map((s) => (
          <button key={s.id} type="button" onClick={() => scrollTo(s.id)} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-[13px] font-medium text-slate-700 hover:border-indigo-400 hover:text-indigo-700">
            {s.label}
          </button>
        ))}
      </div>

      <Section id="learn" step={1} title="Learn">
        <div className="space-y-5">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-5">
            <div className="mb-1 text-sm font-semibold uppercase tracking-wide text-indigo-700">What is it?</div>
            <Rich text={lesson.what} className="text-[16px] leading-relaxed text-slate-800" />
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">Why does it matter?</h3>
            <ul className="list-disc space-y-1.5 pl-5 text-[15.5px] leading-relaxed text-slate-700">
              {lesson.why.map((w, i) => (
                <li key={i}>
                  <Inline text={w} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">How does it work?</h3>
            <ol className="space-y-2">
              {lesson.how.map((h, i) => (
                <li key={i} className="flex gap-3 text-[15.5px] leading-relaxed text-slate-700">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">{i + 1}</span>
                  <span>
                    <Inline text={h} />
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section id="example" step={2} title="See an example">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
          <div className="mb-2 font-semibold text-emerald-900">{lesson.example.title}</div>
          <Rich text={lesson.example.text} className="text-[15.5px] leading-relaxed text-slate-800" />
        </div>
      </Section>

      <Section id="visual" step={3} title={lesson.visuals.length > 1 ? 'Understand the visuals' : 'Understand the visual'}>
        <div className="space-y-8">
          {lesson.visuals.map((v, i) => (
            <div key={i} className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">{v.title}</h3>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <v.Diagram />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-1.5 text-sm font-semibold text-slate-800">What each part means</div>
                  <dl className="space-y-1.5 text-[14.5px]">
                    {v.parts.map((p, j) => (
                      <div key={j}>
                        <dt className="inline font-semibold text-slate-900">{p.label}: </dt>
                        <dd className="inline text-slate-700">
                          <Inline text={p.meaning} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="space-y-3 text-[14.5px]">
                  <div>
                    <div className="mb-1 text-sm font-semibold text-slate-800">How the parts connect</div>
                    <p className="text-slate-700">
                      <Inline text={v.connections} />
                    </p>
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-semibold text-slate-800">Practical example</div>
                    <p className="text-slate-700">
                      <Inline text={v.example} />
                    </p>
                  </div>
                  <div className="rounded-lg bg-amber-50 px-3 py-2">
                    <div className="mb-0.5 text-sm font-semibold text-amber-900">How you might be asked</div>
                    <p className="text-amber-950">
                      <Inline text={v.examAngle} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="tips" step={4} title="Exam tip">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-5">
            <div className="mb-2 font-semibold text-amber-900">Remember</div>
            <ul className="list-disc space-y-1.5 pl-5 text-[15px] text-slate-800">
              {lesson.examTips.map((t, i) => (
                <li key={i}>
                  <Inline text={t} />
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-5">
            <div className="mb-2 font-semibold text-rose-900">Students often confuse</div>
            <ul className="list-disc space-y-1.5 pl-5 text-[15px] text-slate-800">
              {lesson.confusions.map((t, i) => (
                <li key={i}>
                  <Inline text={t} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="practice" step={5} title="Practice">
        <Practice
          key={lesson.id}
          items={lesson.questions.map((q) => ({ question: q, lesson: lesson.id }))}
          onRecord={recordAnswer}
          onFinish={completeAndContinue}
          finishLabel={next ? 'Mark complete & go to next lesson →' : 'Mark complete & finish'}
        />
      </Section>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6">
        {prev ? (
          <a href={`#/lesson/${prev.id}`} className="text-sm font-medium text-slate-600 hover:text-indigo-700">
            ← {prev.title}
          </a>
        ) : (
          <span />
        )}
        <div className="flex flex-wrap gap-2">
          {isDone ? (
            <button type="button" onClick={() => setCompleted(lesson.id, false)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100">
              Mark as not done
            </button>
          ) : (
            <button type="button" onClick={completeAndContinue} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
              Mark complete & continue
            </button>
          )}
          {next && (
            <a href={`#/lesson/${next.id}`} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
              Next: {next.title} →
            </a>
          )}
        </div>
      </footer>
    </article>
  )
}
