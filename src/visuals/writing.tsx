import { Box, Cards, Compare, Flow, Label, Mark } from './kit'

const Yes = () => <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-base font-bold text-emerald-700" title="Necessary">✓</span>
const No = () => <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-base font-bold text-rose-700" title="Prohibited">⦸</span>
const NotReq = () => <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-base font-bold text-slate-500" title="Not required">–</span>

export function SpqMatrix() {
  const cols = ['Author & year', 'Exact text', 'Quotation marks', 'Page number(s)', 'Your own words', 'Your own structure']
  const rows: { name: string; cells: ('y' | 'n' | '-')[]; notes?: Record<number, string> }[] = [
    { name: 'Quote', cells: ['y', 'y', 'y', 'y', 'n', 'n'], notes: { 2: '#' } },
    { name: 'Summary & Paraphrase', cells: ['y', 'n', '-', '-', 'y', 'y'], notes: { 2: '*' } },
  ]
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-center text-[13px]">
          <thead>
            <tr>
              <th className="bg-slate-800 px-2 py-2 text-left text-white"> </th>
              {cols.map((c) => (
                <th key={c} className="bg-slate-800 px-2 py-2 font-semibold text-white">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="odd:bg-slate-50 even:bg-white">
                <td className="px-2 py-2 text-left font-semibold text-slate-900">{r.name}</td>
                {r.cells.map((c, i) => (
                  <td key={i} className="px-2 py-2">
                    <span className="relative inline-block">
                      {c === 'y' ? <Yes /> : c === 'n' ? <No /> : <NotReq />}
                      {r.notes?.[i] && <span className="absolute -right-2 -top-1 text-sm font-bold text-slate-700">{r.notes[i]}</span>}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-4 text-[13px] text-slate-700">
        <span className="flex items-center gap-1.5"><Yes /> Necessary</span>
        <span className="flex items-center gap-1.5"><No /> Prohibited</span>
        <span className="flex items-center gap-1.5"><NotReq /> Not required</span>
      </div>
      <div className="space-y-1 text-[13px] text-slate-600">
        <p><b>#</b> APA: quotation marks for quotes of <b>39 words or fewer</b>; a <b>block quote</b> (indented, no marks) for <b>40 words or more</b>.</p>
        <p><b>*</b> If you borrow an exact phrase inside a paraphrase or summary, that phrase still needs quotation marks.</p>
      </div>
    </div>
  )
}

export function ParaphraseCompare() {
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      <Box tone="slate" title={<span className="flex items-center gap-2"><Label>Original</Label> Lester (1976), pp. 46–47</span>}>
        <p className="mt-1 text-[13.5px] leading-relaxed">
          Students frequently overuse direct quotation in taking notes, and as a result they overuse quotations in the final [research] paper. Probably only about 10% of your final manuscript should appear as directly quoted matter. Therefore, you should strive to limit the amount of exact transcribing of source materials while taking notes.
        </p>
      </Box>
      <Box tone="rose" title={<span className="flex items-center gap-2"><Label tone="rose">Plagiarized</Label> same skeleton</span>}>
        <p className="mt-1 text-[13.5px] leading-relaxed">
          Students often use <Mark>too many direct quotations when they take notes</Mark>, resulting in too many of them <Mark>in the final research paper</Mark>. In fact, <Mark>probably only about 10% of the final</Mark> copy should consist of <Mark>directly quoted material</Mark>. So it is important to <Mark>limit the amount of source material</Mark> copied while taking notes.
        </p>
        <p className="mt-2 text-[12.5px] font-medium">Same order of ideas, same sentence shapes, words swapped for synonyms. Even with a citation, this is plagiarism.</p>
      </Box>
      <Box tone="emerald" title={<span className="flex items-center gap-2"><Label tone="emerald">Legitimate</Label> new words + new structure</span>}>
        <p className="mt-1 text-[13.5px] leading-relaxed">
          In research papers students often quote excessively, failing to keep quoted material down to a desirable level. Since the problem usually originates during note taking, it is essential to minimize the material recorded verbatim (Lester 46–47).
        </p>
        <p className="mt-2 text-[12.5px] font-medium">The ideas are re-ordered (problem first, cause second), the wording is new, and the source is cited.</p>
      </Box>
    </div>
  )
}

export function NotEnoughList() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Box tone="rose" title="NOT enough to make a paraphrase (Harvard tutorial)">
        <ul className="mt-1 list-disc space-y-0.5 pl-4">
          <li>Changing one or a few words</li>
          <li>Rearranging the words</li>
          <li>Replacing words with synonyms</li>
          <li>Omitting a few words</li>
          <li>Changing the punctuation</li>
          <li>Reordering phrases in a sentence</li>
          <li>Reordering sentences in a paragraph</li>
        </ul>
      </Box>
      <Box tone="emerald" title="What paraphrasing is really about">
        <ul className="mt-1 list-disc space-y-0.5 pl-4">
          <li>Understanding the passage</li>
          <li>Internalizing (absorbing) its meaning</li>
          <li>Restating the important points in <b>your own voice</b></li>
          <li>…and still citing the author</li>
        </ul>
      </Box>
    </div>
  )
}

export function FourRs() {
  return (
    <div className="space-y-4">
      <Flow
        numbered
        steps={[
          { title: 'Reword', sub: 'Use your own vocabulary.' },
          { title: 'Rephrase', sub: 'Say each idea a new way.' },
          { title: 'Restructure', sub: 'New sentence structure and a new order of ideas.' },
          { title: 'Recheck', sub: 'Compare with the original: own words? own structure? same meaning?', tone: 'emerald' },
        ]}
      />
      <div className="text-[13px] font-semibold text-slate-700">Harvard's approach, using the Newsweek antibiotics passage (Raymond, 2005):</div>
      <Flow
        tone="sky"
        steps={[
          { title: 'Read & understand', sub: 'Reread the passage until you really get it.' },
          { title: 'Highlight', sub: 'Mark only the ideas that support your argument.' },
          { title: 'Bulleted list', sub: '44% of 34,000 patients… / within 1 hour = best practice / errors → preventable infections' },
          { title: 'Write without looking', sub: 'Turn the bullets into sentences in your own voice + cite.' },
          { title: 'Recheck', sub: 'Reworded, rephrased, restructured? Meaning still accurate?', tone: 'emerald' },
        ]}
      />
    </div>
  )
}

export function SpqLengths() {
  const rows = [
    { name: 'Original article', w: 100, tone: 'bg-slate-400', note: '"Man Gets 12 Years for Fraud": 5 paragraphs, many details' },
    { name: 'Summary', w: 46, tone: 'bg-sky-500', note: 'Main idea + key supporting points (here: the three scams). Own words.' },
    { name: 'Paraphrase', w: 32, tone: 'bg-indigo-500', note: 'One specific idea/passage restated fully in own words and structure.' },
    { name: 'Quote', w: 22, tone: 'bg-amber-500', note: 'Exact words in quotation marks + who said it (+ page).' },
  ]
  return (
    <div className="space-y-2.5">
      {rows.map((r) => (
        <div key={r.name}>
          <div className="flex items-baseline justify-between text-[13px]">
            <span className="font-semibold text-slate-800">{r.name}</span>
          </div>
          <div className="mt-1 h-3 rounded-full bg-slate-100">
            <div className={`h-3 rounded-full ${r.tone}`} style={{ width: `${r.w}%` }} />
          </div>
          <div className="mt-0.5 text-[12.5px] text-slate-600">{r.note}</div>
        </div>
      ))}
      <p className="pt-1 text-[12.5px] text-slate-500">Bar lengths are illustrative only. They show that a summary keeps less detail than the original, a paraphrase restates one passage, and a quote copies a few exact words.</p>
    </div>
  )
}

export function QuotePunctuation() {
  const P = ({ c }: { c: string }) => <span className="rounded bg-amber-200 px-0.5 font-bold">{c}</span>
  return (
    <div className="space-y-3 text-[14px]">
      <Compare
        headers={['Rule', 'Example']}
        rows={[
          ['Comma before an opening quote', 'Tom said**,** "I enjoy playing football."'],
          ['Quote first? Comma goes INSIDE the closing mark', '"I enjoy playing football**,**" said Tom.'],
          ['American English: periods/commas inside', 'I said, "I don\'t like rain**.**"'],
          ['British English: period outside', 'I said, "I don\'t like rain"**.**'],
          ['Parenthetical citation follows: period after it', 'Lauren said, "The beach is hot and humid" (16)**.**'],
          ['? or ! part of the quote: inside', '"Stop**!**" shouted the police officer.'],
          ['? or ! not part of the quote: outside', 'Have you heard the song "Don\'t Stop Believing"**?**'],
          ['Quote inside a quote: single marks', 'I said, "My father used to tell me, **\'**Always give it your all.**\'**"'],
        ]}
      />
      <div className="grid gap-2 sm:grid-cols-3">
        <Box tone="sky" title="Capitalize?">Full sentence quoted: capital first letter. Fragment/phrase: no capital: The phrase "don't win in practice"…</Box>
        <Box tone="violet" title="Brackets [ ]">Add a word to clarify: "John thinks that this brother <P c="[Jeff]" /> will be a great dad," said Andrew.</Box>
        <Box tone="emerald" title="Titles in quotes">Short works: songs, essays, poems, short stories, one-act plays, chapters, TV episodes, articles.</Box>
      </div>
    </div>
  )
}

export function SentencePatterns() {
  const C = ({ c, t }: { c: string; t: string }) => <span className={`inline-flex items-center rounded-md px-2 py-1 text-[12.5px] font-semibold ${t}`}>{c}</span>
  const IC = <C c="Independent clause" t="bg-indigo-100 text-indigo-900" />
  const DC = <C c="Dependent clause" t="bg-amber-100 text-amber-900" />
  const rows = [
    { n: 1, name: 'Simple', formula: <>{IC}<b>.</b></>, ex: 'Snow fell.' },
    { n: 2, name: 'Compound (cc)', formula: <>{IC}<b>,</b> <C c="cc" t="bg-emerald-100 text-emerald-900" /> {IC}</>, ex: 'Snow fell, but it felt warm.' },
    { n: 3, name: 'Compound (semicolon)', formula: <>{IC}<b className="text-lg">;</b> {IC}</>, ex: 'Snow fell; it felt warm, though.' },
    { n: 4, name: 'Compound (independent marker)', formula: <>{IC}<b className="text-lg">;</b> <C c="independent marker" t="bg-sky-100 text-sky-900" /><b>,</b> {IC}</>, ex: 'Snow fell; therefore, it felt cold.' },
    { n: 5, name: 'Complex', formula: <><C c="dependent marker" t="bg-rose-100 text-rose-900" /> + {DC}<b>,</b> {IC}</>, ex: 'When snow fell, it felt cold.' },
    { n: 6, name: 'Compound-complex', formula: <>{DC}<b>,</b> {IC}<b>,</b> <C c="cc" t="bg-emerald-100 text-emerald-900" /> {IC}</>, ex: 'When snow fell, it felt cold, but I liked it anyway.' },
  ]
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r.n} className="rounded-lg border border-slate-200 bg-white px-3 py-2">
            <div className="text-[13px] font-semibold text-slate-500">Pattern {r.n}: {r.name}</div>
            <div className="mt-1 flex flex-wrap items-center gap-1">{r.formula}</div>
            <div className="mt-1 text-[13.5px] italic text-slate-700">{r.ex}</div>
          </div>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        <Box tone="emerald" title="Coordinating conjunctions (cc)">and, but, for, or, nor, so, yet (FANBOYS). Use a <b>comma</b> before them.</Box>
        <Box tone="sky" title="Independent markers">therefore, moreover, thus, consequently, however, also. Use a <b>semicolon before</b>, comma after.</Box>
        <Box tone="rose" title="Dependent markers">because, before, since, while, although, if, until, when, after, as, as if. They make a clause dependent.</Box>
      </div>
      <p className="text-[12.5px] text-slate-500">The slides also show a "Pattern Seven: Complex Sentence — ANY CLUE?" slide with no answer, left for class discussion. A likely answer is the reverse of Pattern 5: Independent clause + dependent clause, with no comma ("It felt cold when snow fell."). This is our suggestion, not from your slides.</p>
    </div>
  )
}

export function ParagraphPatterns() {
  return (
    <Cards
      cols={3}
      items={[
        { title: 'Exemplification', body: 'Explain a statement with **examples**, details, specific instances. (The poorly made shirt: colors faded, button cracked…)', tone: 'indigo' },
        { title: 'Narration', body: 'Tell a **story in chronological order** with details. (Jumping the puddle in front of friends.)', tone: 'sky' },
        { title: 'Description', body: 'Vivid words that appeal to the **senses**: sight, hearing, taste, smell, touch. (The thick reddish-brown shag rug.)', tone: 'violet' },
        { title: 'Process analysis', body: 'Explain **how to do/make** something in a sequence of steps. (How to cook a perfect steak.)', tone: 'emerald' },
        { title: 'Cause and effect', body: '"Detective work": examine the **causes** of something or its **effects**. (A selfie on a cliff edge → a fatal fall.)', tone: 'rose' },
        { title: 'Comparison and contrast', body: 'Show how two things are **similar** (compare) and **different** (contrast). (Energy drinks vs reckless driving.)', tone: 'amber' },
        { title: 'Definition', body: 'Give an informal **definition** of what a term means. (What is death, according to Aristotle?)', tone: 'slate' },
        { title: 'Classification', body: 'Sort many things into **categories** to manage/understand them. (Data: Top Secret, Secret, Confidential…)', tone: 'sky' },
        { title: 'Argument / Persuasion', body: 'Make a **claim/thesis** and defend it with solid points of **evidence**.', tone: 'indigo' },
      ]}
    />
  )
}
