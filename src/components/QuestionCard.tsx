import { useState } from 'react'
import type { FillIn, KeyPoint, Question, ShortAnswer } from '../types'
import { Inline, Rich } from './Rich'

const kindLabel: Record<string, string> = {
  mcq: 'Multiple choice',
  tf: 'True or false',
  short: 'Short answer',
  fill: 'Fill in the blank',
}

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9%$ ]/g, ' ')
    .replace(/\b(a|an|the)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function editDistance(a: string, b: string) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 1; j <= b.length; j++) dp[0][j] = j
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
  return dp[a.length][b.length]
}

// Small spelling slips are accepted so the check tests knowledge of the term, not typing.
export function checkBlank(input: string, accepted: string[]) {
  const given = normalize(input)
  if (!given) return false
  return accepted.some((a) => {
    const want = normalize(a)
    if (given === want) return true
    const allowed = want.length >= 10 ? 2 : want.length >= 5 ? 1 : 0
    return editDistance(given, want) <= allowed
  })
}

export function fillScore(q: FillIn, inputs: string[]) {
  return q.blanks.filter((acc, i) => checkBlank(inputs[i] ?? '', acc)).length / q.blanks.length
}

export function questionLabel(q: Question) {
  if (q.kind === 'short' && q.essay) return 'Essay question'
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
      {question.kind !== 'fill' && (
        <div className="mb-4 text-[16px] font-medium leading-relaxed text-slate-900">
          <Rich text={question.prompt} />
        </div>
      )}
      {question.kind === 'mcq' && <McqBody q={question} onDone={onDone} />}
      {question.kind === 'tf' && <TfBody q={question} onDone={onDone} />}
      {question.kind === 'short' && <ShortBody q={question} onDone={onDone} />}
      {question.kind === 'fill' && <FillBody q={question} onDone={onDone} />}
    </div>
  )
}

export function FillSentence({ q, inputs, onChange, checked }: { q: FillIn; inputs: string[]; onChange?: (i: number, v: string) => void; checked: boolean }) {
  const parts = q.prompt.split('___')
  return (
    <div className="text-[16px] leading-[2.4] text-slate-900">
      {parts.map((part, i) => {
        const ok = checked && checkBlank(inputs[i] ?? '', q.blanks[i] ?? [])
        return (
          <span key={i}>
            <Inline text={part} />
            {i < parts.length - 1 && (
              <input
                value={inputs[i] ?? ''}
                onChange={(e) => onChange?.(i, e.target.value)}
                disabled={checked || !onChange}
                aria-label={`Blank ${i + 1}`}
                className={`mx-1 inline-block w-44 rounded-md border-b-2 px-2 py-0.5 text-center text-[15px] font-semibold focus:outline-none ${
                  !checked ? 'border-indigo-400 bg-indigo-50/60 focus:bg-indigo-50' : ok ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-rose-400 bg-rose-50 text-rose-900'
                }`}
              />
            )}
          </span>
        )
      })}
    </div>
  )
}

export function FillAnswers({ q, inputs }: { q: FillIn; inputs: string[] }) {
  return (
    <ul className="space-y-1 text-[14.5px]">
      {q.blanks.map((acc, i) => {
        const ok = checkBlank(inputs[i] ?? '', acc)
        return (
          <li key={i}>
            <span className={ok ? 'text-emerald-700' : 'text-rose-700'}>{ok ? '✓' : '✗'}</span> Blank {i + 1}: <b>{acc[0]}</b>
            {!ok && inputs[i] && <span className="text-slate-500"> (you wrote "{inputs[i]}")</span>}
          </li>
        )
      })}
    </ul>
  )
}

function FillBody({ q, onDone }: { q: FillIn; onDone: (s: number) => void }) {
  const [inputs, setInputs] = useState<string[]>(() => q.blanks.map(() => ''))
  const [checked, setChecked] = useState(false)
  const score = fillScore(q, inputs)

  const check = () => {
    setChecked(true)
    onDone(score)
  }

  return (
    <div>
      <FillSentence q={q} inputs={inputs} checked={checked} onChange={(i, v) => setInputs((prev) => prev.map((x, j) => (j === i ? v : x)))} />
      {!checked ? (
        <button
          type="button"
          onClick={check}
          disabled={inputs.every((x) => !x.trim())}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Check answer
        </button>
      ) : (
        <div className={`mt-4 rounded-lg px-4 py-3 text-[15px] ${score === 1 ? 'bg-emerald-50 text-emerald-900' : 'bg-rose-50 text-rose-900'}`}>
          <div className="mb-1 font-semibold">{score === 1 ? 'Correct.' : score > 0 ? 'Partly right.' : 'Not quite.'}</div>
          <FillAnswers q={q} inputs={inputs} />
          <div className="mt-2">
            <Rich text={q.explain} />
          </div>
        </div>
      )}
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
      {q.plan && <EssayPlan plan={q.plan} />}
      <div>
        <div className="mb-2 text-sm font-semibold text-slate-800">{q.essay ? 'A strong essay covers:' : 'A good answer includes:'}</div>
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

export function EssayPlan({ plan }: { plan: string[] }) {
  return (
    <div className="rounded-lg border border-violet-200 bg-violet-50/60 px-4 py-3">
      <div className="mb-1 text-sm font-semibold text-violet-900">Suggested essay plan</div>
      <ol className="list-decimal space-y-1 pl-5 text-[14.5px] text-slate-800">
        {plan.map((p, i) => (
          <li key={i}>
            <Inline text={p} />
          </li>
        ))}
      </ol>
    </div>
  )
}

function ShortBody({ q, onDone }: { q: ShortAnswer; onDone: (s: number) => void }) {
  const [text, setText] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [graded, setGraded] = useState<number | null>(null)
  const [showPlan, setShowPlan] = useState(false)

  const grade = (s: number) => {
    if (graded !== null) return
    setGraded(s)
    onDone(s)
  }

  return (
    <div>
      {q.essay && q.plan && !revealed && (
        <div className="mb-3">
          {showPlan ? (
            <EssayPlan plan={q.plan} />
          ) : (
            <button type="button" onClick={() => setShowPlan(true)} className="text-sm font-medium text-violet-700 underline">
              Show me a plan before I write
            </button>
          )}
        </div>
      )}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={revealed}
        rows={q.essay ? 12 : 4}
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
