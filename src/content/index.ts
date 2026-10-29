import type { Lesson, Priority, Unit } from '../types'
import { finalizeLesson } from './author'
import { sourcesLessons } from './sources'
import { writingLessons } from './writing'
import { lawLessons } from './law'
import { newsLessons } from './news'
import { businessLessons } from './business'
import { peopleLessons } from './people'
import type { Order } from '../progress'

export const units: Unit[] = [
  { id: 'sources', title: 'Using sources honestly', weeks: 'Weeks 1–3' },
  { id: 'writing', title: 'Sentences & paragraphs', weeks: 'Week 2' },
  { id: 'law', title: 'Media law', weeks: 'Week 4' },
  { id: 'news', title: 'News & feature writing', weeks: 'Weeks 5–6' },
  { id: 'business', title: 'Business communication', weeks: 'Week 7' },
  { id: 'people', title: 'Working with people', weeks: 'Week 7' },
]

export const lessons: Lesson[] = [...sourcesLessons, ...writingLessons, ...lawLessons, ...newsLessons, ...businessLessons, ...peopleLessons].map(finalizeLesson)

export const lessonById: Record<string, Lesson> = Object.fromEntries(lessons.map((l) => [l.id, l]))

export const priorityRank: Record<Priority, number> = { high: 0, medium: 1, low: 2 }

export const priorityLabel: Record<Priority, string> = { high: 'High', medium: 'Medium', low: 'Low' }

export function orderedLessons(order: Order): Lesson[] {
  if (order === 'course') return lessons
  return [...lessons].sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority] || lessons.indexOf(a) - lessons.indexOf(b))
}

export function minutesFor(priority: Priority) {
  return lessons.filter((l) => l.priority === priority).reduce((s, l) => s + l.minutes, 0)
}
