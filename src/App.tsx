import { useEffect, useState } from 'react'
import { lessonById } from './content'
import { useProgress } from './progress'
import { Sidebar } from './components/Sidebar'
import { Home } from './pages/Home'
import { LessonPage } from './pages/LessonPage'
import { Revision } from './pages/Revision'
import { MockExam } from './pages/MockExam'
import { WeakPractice } from './pages/WeakPractice'

export type Navigate = (path: string) => void

function currentPath() {
  return window.location.hash.replace(/^#/, '') || '/'
}

export function App() {
  const api = useProgress()
  const [path, setPath] = useState(currentPath)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onHash = () => {
      setPath(currentPath())
      setMenuOpen(false)
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const navigate: Navigate = (p) => {
    window.location.hash = p
  }

  const [route, query = ''] = path.split('?')
  const lessonMatch = route.match(/^\/lesson\/(.+)$/)
  const lesson = lessonMatch ? lessonById[lessonMatch[1]] : undefined

  let page
  if (lesson) page = <LessonPage key={lesson.id} lesson={lesson} api={api} navigate={navigate} />
  else if (route === '/revision') page = <Revision navigate={navigate} />
  else if (route === '/mock') page = <MockExam api={api} navigate={navigate} />
  else if (route === '/practice') page = <WeakPractice key={query} query={query} api={api} navigate={navigate} />
  else page = <Home api={api} navigate={navigate} />

  return (
    <div className="min-h-screen lg:flex">
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <a href="#/" className="font-bold text-slate-900">
          EngCom Midterm Tutor
        </a>
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700"
          aria-expanded={menuOpen}
        >
          {menuOpen ? 'Close' : 'Lessons'}
        </button>
      </div>
      <aside
        className={`${menuOpen ? 'block' : 'hidden'} fixed inset-x-0 bottom-0 top-[57px] z-20 overflow-y-auto border-r border-slate-200 bg-white lg:sticky lg:top-0 lg:block lg:h-screen lg:w-80 lg:shrink-0`}
      >
        <Sidebar api={api} path={route} />
      </aside>
      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{page}</div>
      </main>
    </div>
  )
}
