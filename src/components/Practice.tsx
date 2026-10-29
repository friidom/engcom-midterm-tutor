import { useMemo, useState } from 'react'
import type { Question } from '../types'
import { QuestionCard } from './QuestionCard'
import { Inline } from './Rich'

export interface PracticeItem {
  question: Question
  lesson: string
}

interface Props {
  items: PracticeItem[]
  onRecord: (questionId: string, lesson: string, score: number) => void
  onFinish?: (percent: number) => void
  finishLabel?: string
}

export function Practice({ items: initial, onRecord, onFinish, finishLabel }: Props) {
  const [items, setItems] = useState(initial)
  const [round, setRound] = useState(0)
  const [index, setIndex] = useState(0)
  const [mainScore, setMainScore] = useState<number | null>(null)
  const [similarDone, setSimilarDone] = useState(false)
  const [scores, setScores] = useState<Record<string, number>>({})

  const item = items[index]
  const finished = index >= items.length

  const needsSimilar = mainScore !== null && mainScore < 1 && !!item?.question.similar
  const canAdvance = mainScore !== null && (!needsSimilar || similarDone)

  const onMain = (s: number) => {
    setMainScore(s)
    setScores((prev) => ({ ...prev, [item.question.id]: s }))
    onRecord(item.question.id, item.lesson, s)
  }

  const onSimilar = (s: number) => {
    setSimilarDone(true)
    if (item.question.similar) onRecord(item.question.similar.id, item.lesson, s)
  }

  const next = () => {
    setIndex((i) => i + 1)
    setMainScore(null)
    setSimilarDone(false)
  }

  const total = items.length
  const earned = useMemo(() => items.reduce((sum, it) => sum + (scores[it.question.id] ?? 0), 0), [items, scores])
  const missed = items.filter((it) => (scores[it.question.id] ?? 0) < 1)

  const retryMissed = () => {
    setItems(missed)
    setScores({})
    setIndex(0)
    setMainScore(null)
    setSimilarDone(false)
    setRound((r) => r + 1)
  }

  if (total === 0) return <p className="text-slate-500">No questions here yet.</p>

  if (finished) {
    const percent = Math.round((earned / total) * 100)
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="text-sm font-medium uppercase tracking-wide text-slate-500">Practice summary</div>
        <div className="mt-1 text-2xl font-bold text-slate-900">
          {earned % 1 === 0 ? earned : earned.toFixed(1)} / {total} <span className="text-base font-medium text-slate-500">({percent}%)</span>
        </div>
        {missed.length > 0 ? (
          <>
            <div className="mt-4 text-sm font-semibold text-slate-800">Check these mistakes again:</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] text-slate-700">
              {missed.map((m) => (
                <li key={m.question.id}>
                  <Inline text={m.question.prompt.split('\n')[0]} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mt-3 text-[15px] text-emerald-700">Everything correct. You're ready to move on.</p>
        )}
        <div className="mt-5 flex flex-wrap gap-3">
          {missed.length > 0 && (
            <button type="button" onClick={retryMissed} className="rounded-lg border border-indigo-300 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50">
              Retry the {missed.length} I missed
            </button>
          )}
          {onFinish && (
            <button type="button" onClick={() => onFinish(percent)} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
              {finishLabel ?? 'Continue'}
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-sm text-slate-500">
        <span>
          Question {index + 1} of {total}
          {round > 0 && ' (retry round)'}
        </span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${(index / total) * 100}%` }} />
        </div>
      </div>
      <QuestionCard key={`${round}-${item.question.id}`} question={item.question} onDone={onMain} />
      {needsSimilar && item.question.similar && (
        <div className="space-y-2">
          <p className="text-[15px] text-slate-700">Read the explanation above, then try this similar question before moving on:</p>
          <QuestionCard key={`${round}-${item.question.similar.id}`} question={item.question.similar} onDone={onSimilar} tone="similar" />
        </div>
      )}
      {canAdvance && (
        <button type="button" onClick={next} className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
          {index + 1 < total ? 'Next question →' : 'See my results'}
        </button>
      )}
    </div>
  )
}
