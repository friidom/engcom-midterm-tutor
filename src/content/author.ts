import type { Lesson, Question } from '../types'

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type QIn = DistributiveOmit<Question, 'id' | 'similar'> & { similar?: QIn }

export type LessonIn = Omit<Lesson, 'questions'> & { questions: QIn[] }

export function finalizeQuestion(q: QIn, id: string): Question {
  const { similar, ...rest } = q
  return { ...rest, id, similar: similar ? finalizeQuestion(similar, `${id}s`) : undefined } as Question
}

// Question ids are derived from position so saved progress stays attached to the same question across reloads.
export function finalizeLesson(l: LessonIn): Lesson {
  return { ...l, questions: l.questions.map((q, i) => finalizeQuestion(q, `${l.id}-${i + 1}`)) }
}
