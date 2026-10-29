import type { ComponentType } from 'react'

export type Priority = 'high' | 'medium' | 'low'

interface QuestionBase {
  id: string
  prompt: string
  scenario?: string
  similar?: Question
}

export interface MCQ extends QuestionBase {
  kind: 'mcq'
  options: string[]
  answer: number
  explain: string
}

export interface TrueFalse extends QuestionBase {
  kind: 'tf'
  answer: boolean
  explain: string
}

export interface KeyPoint {
  text: string
  hints: string[]
}

export interface ShortAnswer extends QuestionBase {
  kind: 'short'
  ownWords?: boolean
  keyPoints: KeyPoint[]
  model: string
}

export type Question = MCQ | TrueFalse | ShortAnswer

export interface Visual {
  title: string
  Diagram: ComponentType
  parts: { label: string; meaning: string }[]
  connections: string
  example: string
  examAngle: string
}

export interface Lesson {
  id: string
  unit: string
  title: string
  priority: Priority
  minutes: number
  sources: string[]
  what: string
  why: string[]
  how: string[]
  example: { title: string; text: string }
  visuals: Visual[]
  examTips: string[]
  confusions: string[]
  questions: Question[]
}

export interface Unit {
  id: string
  title: string
  weeks: string
}
