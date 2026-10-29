import { useCallback, useEffect, useState } from 'react'

export type Order = 'priority' | 'course'

export interface AnswerRecord {
  score: number
  lesson: string
  at: number
}

export interface MockRecord {
  at: number
  percent: number
  weak: string[]
}

export interface Progress {
  completed: string[]
  current?: string
  answers: Record<string, AnswerRecord>
  order: Order
  mocks: MockRecord[]
}

const KEY = 'engcom-midterm-progress-v1'

const empty: Progress = { completed: [], answers: {}, order: 'priority', mocks: [] }

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return empty
    return { ...empty, ...JSON.parse(raw) }
  } catch {
    return empty
  }
}

function save(p: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p))
  } catch {
    // Private windows or blocked storage: progress just lasts for this tab.
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(load)

  useEffect(() => save(progress), [progress])

  const update = useCallback((fn: (p: Progress) => Progress) => setProgress(fn), [])

  const recordAnswer = useCallback(
    (questionId: string, lesson: string, score: number) =>
      update((p) => ({ ...p, answers: { ...p.answers, [questionId]: { score, lesson, at: Date.now() } } })),
    [update],
  )

  const setCompleted = useCallback(
    (lessonId: string, done: boolean) =>
      update((p) => ({
        ...p,
        completed: done ? Array.from(new Set([...p.completed, lessonId])) : p.completed.filter((id) => id !== lessonId),
      })),
    [update],
  )

  const setCurrent = useCallback((lessonId: string) => update((p) => (p.current === lessonId ? p : { ...p, current: lessonId })), [update])

  const setOrder = useCallback((order: Order) => update((p) => ({ ...p, order })), [update])

  const recordMock = useCallback((m: MockRecord) => update((p) => ({ ...p, mocks: [...p.mocks, m] })), [update])

  const reset = useCallback(() => update(() => empty), [update])

  return { progress, recordAnswer, setCompleted, setCurrent, setOrder, recordMock, reset }
}

export type ProgressApi = ReturnType<typeof useProgress>

export function lessonAccuracy(answers: Record<string, AnswerRecord>, lessonId: string) {
  const rows = Object.values(answers).filter((a) => a.lesson === lessonId)
  if (rows.length === 0) return null
  return rows.reduce((s, a) => s + a.score, 0) / rows.length
}
