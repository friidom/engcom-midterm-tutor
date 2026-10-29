import { useState, type ComponentType } from 'react'
import { lessonById } from '../content'
import { confusables, examples, glossary, lists } from '../content/revision'
import type { Navigate } from '../App'
import { Inline } from '../components/Rich'
import { DefamationMap, InvertedPyramid, LeadChooser, LibelDefenses, NewsValues, PrivacyMap } from '../visuals/news'
import { ConventionalModel, FiveAudiences, FormalNetwork, Paiboc, TwoPersonModel } from '../visuals/business'
import { ParagraphPatterns, SentencePatterns, SpqMatrix, QuotePunctuation } from '../visuals/writing'
import { ContextScale, ListeningStyles, Tuckman, ConflictSteps } from '../visuals/people'

const tabs = ['Lists to memorize', 'Key differences', 'Definitions', 'Visual cheat sheets', 'Key examples'] as const
type Tab = (typeof tabs)[number]

const sheets: { title: string; lesson: string; Diagram: ComponentType }[] = [
  { title: 'Quote vs summary vs paraphrase (Harvard table)', lesson: 'spq-rules', Diagram: SpqMatrix },
  { title: 'Quotation-mark punctuation', lesson: 'quotation-marks', Diagram: QuotePunctuation },
  { title: 'Sentence patterns', lesson: 'sentence-patterns', Diagram: SentencePatterns },
  { title: 'Nine paragraph patterns', lesson: 'paragraph-patterns', Diagram: ParagraphPatterns },
  { title: 'Defamation map', lesson: 'defamation', Diagram: DefamationMap },
  { title: 'Libel defenses', lesson: 'libel-defenses', Diagram: LibelDefenses },
  { title: 'Invasion of privacy', lesson: 'privacy-copyright', Diagram: PrivacyMap },
  { title: 'News criteria & 8 elements', lesson: 'news-values', Diagram: NewsValues },
  { title: 'Inverted pyramid', lesson: 'inverted-pyramid', Diagram: InvertedPyramid },
  { title: 'Lead chooser', lesson: 'lead-types', Diagram: LeadChooser },
  { title: 'Conventional communication model (8 steps)', lesson: 'comm-process', Diagram: ConventionalModel },
  { title: 'Two-person model with noise (Locker)', lesson: 'comm-process', Diagram: TwoPersonModel },
  { title: 'Formal communication network', lesson: 'professionalism', Diagram: FormalNetwork },
  { title: 'PAIBOC', lesson: 'business-writing', Diagram: Paiboc },
  { title: 'Five audiences', lesson: 'audience', Diagram: FiveAudiences },
  { title: 'Tuckman stages', lesson: 'teams', Diagram: Tuckman },
  { title: 'Conflict: 5 steps + 4 strategies', lesson: 'teams', Diagram: ConflictSteps },
  { title: 'Listening styles & active listening', lesson: 'listening', Diagram: ListeningStyles },
  { title: 'High- vs low-context cultures', lesson: 'intercultural', Diagram: ContextScale },
]

function LessonTag({ id }: { id: string }) {
  const l = lessonById[id]
  if (!l) return null
  return (
    <a href={`#/lesson/${id}`} className="text-[12px] font-medium text-indigo-600 hover:underline">
      {l.title} →
    </a>
  )
}

export function Revision({ navigate }: { navigate: Navigate }) {
  const [tab, setTab] = useState<Tab>('Lists to memorize')
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const terms = q ? glossary.filter((t) => t.term.toLowerCase().includes(q) || t.def.toLowerCase().includes(q)) : glossary

  return (
    <div className="space-y-6">
      <header>
        <div className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Final revision</div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Quick revision</h1>
        <p className="mt-2 text-[15.5px] text-slate-600">Go through the tabs in order. Cover the right side with your hand and test yourself, then check.</p>
      </header>

      <div className="flex flex-wrap gap-1.5">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-3.5 py-1.5 text-[14px] font-medium ${tab === t ? 'bg-slate-900 text-white' : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Lists to memorize' && (
        <div className="grid gap-3 sm:grid-cols-2">
          {lists.map((l) => (
            <div key={l.title} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-baseline justify-between gap-2">
                <div className="font-semibold text-slate-900">{l.title}</div>
                <LessonTag id={l.lesson} />
              </div>
              <ol className="mt-2 flex flex-wrap gap-1.5">
                {l.items.map((it, i) => (
                  <li key={it} className="rounded-md bg-indigo-50 px-2 py-0.5 text-[13px] text-indigo-950">
                    <span className="mr-1 font-bold text-indigo-500">{i + 1}</span>
                    {it}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}

      {tab === 'Key differences' && (
        <div className="space-y-2">
          {confusables.map((c) => (
            <div key={c.a + c.b} className="grid gap-2 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-[1fr_2fr]">
              <div className="font-semibold text-slate-900">
                {c.a} <span className="font-normal text-slate-400">vs</span> {c.b}
              </div>
              <div className="text-[14.5px] text-slate-700">
                {c.diff} <LessonTag id={c.lesson} />
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Definitions' && (
        <div className="space-y-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${glossary.length} terms…`}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-[15px] focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <dl className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {terms.map((t) => (
              <div key={t.term} className="grid gap-1 px-4 py-2.5 md:grid-cols-[220px_1fr]">
                <dt className="font-semibold text-slate-900">{t.term}</dt>
                <dd className="text-[14.5px] text-slate-700">
                  {t.def} <LessonTag id={t.lesson} />
                </dd>
              </div>
            ))}
            {terms.length === 0 && <div className="px-4 py-3 text-slate-500">No matching terms.</div>}
          </dl>
        </div>
      )}

      {tab === 'Visual cheat sheets' && (
        <div className="space-y-3">
          {sheets.map((s, i) => (
            <details key={s.title} open={i === 0} className="rounded-xl border border-slate-200 bg-white">
              <summary className="flex items-center justify-between gap-2 px-4 py-3 font-semibold text-slate-900">
                <span>{s.title}</span>
                <span className="text-xs font-normal text-slate-500">tap to open/close</span>
              </summary>
              <div className="border-t border-slate-200 p-4">
                <s.Diagram />
                <div className="mt-3">
                  <LessonTag id={s.lesson} />
                </div>
              </div>
            </details>
          ))}
        </div>
      )}

      {tab === 'Key examples' && (
        <div className="grid gap-3 sm:grid-cols-2">
          {examples.map((e) => (
            <div key={e.title} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="font-semibold text-slate-900">{e.title}</div>
              <p className="mt-1 text-[14px] text-slate-700">
                <Inline text={e.text} />
              </p>
              <div className="mt-2">
                <LessonTag id={e.lesson} />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5">
        <div className="font-semibold text-indigo-950">Ready to test yourself?</div>
        <button type="button" onClick={() => navigate('/mock')} className="mt-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
          Start the mock midterm →
        </button>
      </div>
    </div>
  )
}
