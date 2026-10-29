import { lessonById, lessons } from '../content'
import { lessonAccuracy, type ProgressApi } from '../progress'
import type { Navigate } from '../App'
import { Practice } from '../components/Practice'

export function WeakPractice({ query, api, navigate }: { query: string; api: ProgressApi; navigate: Navigate }) {
  const { progress, recordAnswer } = api
  const requested = new URLSearchParams(query).get('lessons')?.split(',').filter((id) => lessonById[id]) ?? []
  const ids = requested.length
    ? requested
    : lessons.filter((l) => {
        const acc = lessonAccuracy(progress.answers, l.id)
        return acc !== null && acc < 0.7
      }).map((l) => l.id)

  const perLesson = ids.length > 4 ? 3 : 5
  const items = ids.flatMap((id) => lessonById[id].questions.slice(0, perLesson).map((q) => ({ question: q, lesson: id })))

  return (
    <div className="space-y-6">
      <header>
        <div className="text-sm font-semibold uppercase tracking-wide text-rose-600">Targeted practice</div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Practice your weak topics</h1>
        {ids.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {ids.map((id) => (
              <a key={id} href={`#/lesson/${id}`} className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-[13px] font-medium text-slate-700 hover:border-indigo-400">
                Reread: {lessonById[id].title}
              </a>
            ))}
          </div>
        )}
      </header>
      {items.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-5 text-slate-700">
          No weak topics yet. Answer some practice questions or take the mock midterm first.
          <div className="mt-3">
            <button type="button" onClick={() => navigate('/mock')} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
              Go to the mock midterm
            </button>
          </div>
        </div>
      ) : (
        <Practice items={items} onRecord={recordAnswer} onFinish={() => navigate('/mock')} finishLabel="Back to the mock midterm" />
      )}
    </div>
  )
}
