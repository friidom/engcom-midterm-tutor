import { useState } from 'react'
import type { KeyPoint, Question, ShortAnswer } from '../types'
import { Inline, Rich } from './Rich'

const kindLabel: Record<string, string> = {
  mcq: 'Multiple choice',
  tf: 'True or false',
  short: 'Short answer',
}

export function questionLabel(q: Question) {
  if (q.kind === 'short' && q.ownWords) return 'Explain in your own words'
  if (q.scenario) return 'Practical scenario'
  return kindLabel[q.kind]
}

export function hintCovered(answer: string, point: KeyPoint) {
  const text = answer.toLowerCase()
  return point.hints.some((h) => text.includes(h.toLowerCase()))
}

export function QuestionCard({ question, onDone, tone = 'default' }: { question: Question; onDone: (score: number) => void; tone?: 'default' | 'similar' }) {
  return (
    <div className={`rounded-xl border p-5 ${tone === 'similar' ? 'border-amber-300 bg-amber-50/40' : 'border-slate-200 bg-white'}`}>
      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide">
        <span className="text-indigo-600">{questionLabel(question)}</span>
        {tone === 'similar' && <span className="rounded bg-amber-200 px-1.5 py-0.5 text-amber-900">Similar question</span>}
      </div>
      {question.scenario && (
        <div className="mb-3 rounded-lg border-l-4 border-indigo-300 bg-indigo-50/60 px-4 py-3 text-[15px] text-slate-700">
          <Rich text={question.scenario} />
        </div>
      )}
      <div className="mb-4 text-[16px] font-medium leading-relaxed text-slate-900">
        <Rich text={question.prompt} />
      </div>
      {question.kind === 'mcq' && <McqBody q={question} onDone={onDone} />}
      {question.kind === 'tf' && <TfBody q={question} onDone={onDone} />}
      {question.kind === 'short' && <ShortBody q={question} onDone={onDone} />}
    </div>
  )
}

function Feedback({ correct, text }: { correct: boolean; text: string }) {
  return (
    <div className={`mt-4 rounded-lg px-4 py-3 text-[15px] ${correct ? 'bg-emerald-50 text-emerald-900' : 'bg-rose-50 text-rose-900'}`}>
      <div className="mb-1 font-semibold">{correct ? 'Correct.' : 'Not quite.'}</div>
      <Rich text={text} />
    </div>
  )
}

function McqBody({ q, onDone }: { q: Extract<Question, { kind: 'mcq' }>; onDone: (s: number) => void }) {
  const [picked, setPicked] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)

  const check = () => {
    if (picked === null) return
    setChecked(true)
    onDone(picked === q.answer ? 1 : 0)
  }

  return (
    <div>
      <div className="space-y-2">
        {q.options.map((opt, i) => {
          let style = 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40'
          if (!checked && picked === i) style = 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500'
          if (checked && i === q.answer) style = 'border-emerald-500 bg-emerald-50'
          if (checked && picked === i && i !== q.answer) style = 'border-rose-400 bg-rose-50'
          if (checked && picked !== i && i !== q.answer) style = 'border-slate-200 opacity-60'
          return (
            <button
              key={i}
              type="button"
              disabled={checked}
              onClick={() => setPicked(i)}
              className={`flex w-full items-start gap-3 rounded-lg border px-4 py-2.5 text-left text-[15px] transition ${style}`}
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-[11px] font-semibold text-slate-500">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-slate-800">
                <Inline text={opt} />
              </span>
            </button>
          )
        })}
      </div>
      {!checked && (
        <button
          type="button"
          onClick={check}
          disabled={picked === null}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Check answer
        </button>
      )}
      {checked && picked !== null && (
        <Feedback
          correct={picked === q.answer}
          text={picked === q.answer ? q.explain : `The right answer is **${String.fromCharCode(65 + q.answer)}**. ${q.explain}`}
        />
      )}
    </div>
  )
}

function TfBody({ q, onDone }: { q: Extract<Question, { kind: 'tf' }>; onDone: (s: number) => void }) {
  const [picked, setPicked] = useState<boolean | null>(null)

  const pick = (v: boolean) => {
    if (picked !== null) return
    setPicked(v)
    onDone(v === q.answer ? 1 : 0)
  }

  const style = (v: boolean) => {
    if (picked === null) return 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40'
    if (v === q.answer) return 'border-emerald-500 bg-emerald-50'
    if (v === picked) return 'border-rose-400 bg-rose-50'
    return 'border-slate-200 opacity-60'
  }

  return (
    <div>
      <div className="flex gap-3">
        {[true, false].map((v) => (
          <button
            key={String(v)}
            type="button"
            disabled={picked !== null}
            onClick={() => pick(v)}
            className={`flex-1 rounded-lg border px-4 py-2.5 text-[15px] font-semibold text-slate-800 transition ${style(v)}`}
          >
            {v ? 'True' : 'False'}
          </button>
        ))}
      </div>
      {picked !== null && (
        <Feedback correct={picked === q.answer} text={picked === q.answer ? q.explain : `The statement is **${q.answer ? 'true' : 'false'}**. ${q.explain}`} />
      )}
    </div>
  )
}

export function KeyPointsReview({ q, answer }: { q: ShortAnswer; answer: string }) {
  return (
    <div className="space-y-3">
      <div>
        <div className="mb-2 text-sm font-semibold text-slate-800">A good answer includes:</div>
        <ul className="space-y-1.5">
          {q.keyPoints.map((kp, i) => {
            const covered = answer.trim().length > 0 && hintCovered(answer, kp)
            return (
              <li key={i} className="flex items-start gap-2 text-[15px]">
                <span
                  className={`mt-0.5 inline-flex h-5 shrink-0 items-center rounded px-1.5 text-[11px] font-semibold ${
                    covered ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {covered ? 'seen' : 'check'}
                </span>
                <span className="text-slate-800">
                  <Inline text={kp.text} />
                </span>
              </li>
            )
          })}
        </ul>
        <p className="mt-2 text-xs text-slate-500">
          "seen" means a related keyword appears in your answer. It is only a rough hint, so the app can't really grade your writing. Judge your own answer honestly against each point.
        </p>
      </div>
      <div className="rounded-lg bg-slate-50 px-4 py-3 text-[15px] text-slate-700">
        <div className="mb-1 text-sm font-semibold text-slate-800">Model answer</div>
        <Rich text={q.model} />
      </div>
    </div>
  )
}

function ShortBody({ q, onDone }: { q: ShortAnswer; onDone: (s: number) => void }) {
  const [text, setText] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [graded, setGraded] = useState<number | null>(null)

  const grade = (s: number) => {
    if (graded !== null) return
    setGraded(s)
    onDone(s)
  }

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={revealed}
        rows={4}
        placeholder={q.ownWords ? 'Explain it in your own words, as if teaching a friend...' : 'Type your answer...'}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[15px] focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-slate-50"
      />
      {!revealed && (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setRevealed(true)}
            disabled={text.trim().length < 5}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Check against key points
          </button>
          <button type="button" onClick={() => setRevealed(true)} className="text-sm text-slate-500 underline hover:text-slate-700">
            I'm stuck, show me
          </button>
        </div>
      )}
      {revealed && (
        <div className="mt-4">
          <KeyPointsReview q={q} answer={text} />
          <div className="mt-4">
            <div className="mb-2 text-sm font-semibold text-slate-800">How did you do?</div>
            <div className="flex flex-wrap gap-2">
              {[
                { s: 1, label: 'I covered all key points' },
                { s: 0.5, label: 'I covered some' },
                { s: 0, label: 'I missed most' },
              ].map((o) => (
                <button
                  key={o.s}
                  type="button"
                  disabled={graded !== null}
                  onClick={() => grade(o.s)}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                    graded === o.s ? 'border-indigo-500 bg-indigo-50 text-indigo-800' : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                  } disabled:cursor-default`}
                >
                  {o.label}
                </button>
              ))}
            </div>
            {graded !== null && graded < 1 && (
              <p className="mt-3 text-sm text-slate-600">Look again at the points marked "check" above. Those are the ones to add next time.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
