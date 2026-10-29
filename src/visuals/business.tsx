import { Box, Cards, Compare, Flow, Label } from './kit'

export function MeaningExchanges() {
  const rows = [
    { name: 'Transmitted meaning', tone: 'emerald' as const, pm: '"The new app is on schedule."', boss: 'Great! It\'s on schedule, and I don\'t need to worry.', note: 'Meaning arrives intact; the boss accepts it at face value.' },
    { name: 'Negotiated meaning', tone: 'sky' as const, pm: '"Everything is fine." … "Well, two designers quit, but I\'m trying to replace them."', boss: '"Are you worried about anything?" … "So you are still on schedule, but now there is some risk of a slip."', note: 'They talk it through and AGREE on a meaning.' },
    { name: 'Re-created meaning', tone: 'rose' as const, pm: '"I think everything is fine."', boss: 'Uh oh. He doesn\'t sound confident or in control of the project.', note: 'The receiver reacts to the word "think" and builds her OWN (different) meaning.' },
  ]
  return (
    <div className="space-y-2">
      {rows.map((r) => (
        <div key={r.name} className="rounded-lg border border-slate-200 bg-white p-3">
          <div className="mb-2 flex items-center gap-2">
            <Label tone={r.tone}>{r.name}</Label>
            <span className="text-[12.5px] text-slate-600">{r.note}</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <Box tone="slate" title="Software project manager (sender)">{r.pm}</Box>
            <Box tone={r.tone} title="Boss (receiver)">{r.boss}</Box>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ConventionalModel() {
  const Step = ({ n, t, who }: { n: number; t: string; who: 'S' | 'R' }) => (
    <div className={`rounded-lg border px-2.5 py-2 text-[13px] ${who === 'S' ? 'border-indigo-200 bg-indigo-50' : 'border-emerald-200 bg-emerald-50'}`}>
      <span className="mr-1 font-bold">{n}.</span>
      {t}
    </div>
  )
  return (
    <div className="space-y-3">
      <div className="grid items-center gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
        <Step n={1} who="S" t="Sender has an idea" />
        <span className="hidden text-center text-slate-400 md:block">→</span>
        <Step n={2} who="S" t="Sender encodes the idea as a message" />
        <span className="hidden text-center text-slate-400 md:block">→</span>
        <Step n={3} who="S" t="Sender produces the message in a medium (oral, written, visual)" />
        <span className="hidden text-center text-slate-400 md:block">→</span>
        <Step n={4} who="S" t="Sender transmits it through a channel (email, Twitter…)" />
      </div>
      <div className="flex items-center justify-between px-2 text-[12px] font-semibold text-slate-500">
        <span>↑ 8. feedback goes back to the sender</span>
        <span>↓ message travels</span>
      </div>
      <div className="flex flex-col-reverse gap-2 md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">
        <Step n={8} who="R" t="Receiver may give feedback to the sender" />
        <span className="hidden text-center text-slate-400 md:block">←</span>
        <Step n={7} who="R" t="Receiver responds to the message" />
        <span className="hidden text-center text-slate-400 md:block">←</span>
        <Step n={6} who="R" t="Receiver decodes the message" />
        <span className="hidden text-center text-slate-400 md:block">←</span>
        <Step n={5} who="R" t="Receiver receives the message" />
      </div>
      <div className="rounded-lg border-2 border-dashed border-rose-300 bg-rose-50/60 p-3">
        <div className="mb-1 text-[13px] font-semibold text-rose-900">Communication barriers can block or distort the message along the way:</div>
        <div className="grid gap-1.5 text-[13px] text-rose-950 sm:grid-cols-4">
          <span><b>Noise & distractions</b>: external (uncomfortable room, pop-ups) or internal (thoughts, emotions, multitasking)</span>
          <span><b>Competing messages</b>: other messages fighting for attention</span>
          <span><b>Filters</b>: human or tech interventions (spam filter, company structure)</span>
          <span><b>Channel breakdowns</b>: the channel fails (colleague forgets to forward)</span>
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        <Box tone="sky" title="To RECEIVE (step 5)">Sense it → Select it → Perceive it as a message. (Selective attention can block it.)</Box>
        <Box tone="sky" title="To DECODE (step 6)">Personal: culture, experience, thinking style, ego, beliefs, mood. "You only hear what you want to hear."</Box>
        <Box tone="sky" title="To RESPOND (step 7)">Receiver must (a) remember it, (b) be able to act, (c) be motivated.</Box>
      </div>
    </div>
  )
}

export function SharedExperience() {
  const pairs = [
    { gap: 70, label: 'Little shared experience', a: 'Meanings dissimilar', b: 'Misunderstanding' },
    { gap: 40, label: 'Average shared experience', a: 'Meanings similar', b: 'Average understanding' },
    { gap: 16, label: 'Large shared experience', a: 'Meanings very similar', b: 'High understanding' },
  ]
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {pairs.map((p) => (
        <div key={p.label} className="rounded-lg border border-slate-200 bg-white p-2 text-center">
          <svg viewBox="0 0 160 90" className="mx-auto w-full max-w-[200px]">
            <circle cx={80 - p.gap / 2 - 10} cy="45" r="32" fill="#6366f1" fillOpacity="0.35" stroke="#4f46e5" />
            <circle cx={80 + p.gap / 2 + 10} cy="45" r="32" fill="#10b981" fillOpacity="0.35" stroke="#059669" />
          </svg>
          <div className="text-[13px] font-semibold text-slate-800">{p.label}</div>
          <div className="text-[12.5px] text-slate-600">{p.a} → {p.b}</div>
        </div>
      ))}
    </div>
  )
}

export function TwoPersonModel() {
  const S = ({ t }: { t: string }) => <span className="rounded bg-white px-1.5 py-0.5 text-[12.5px] font-medium text-slate-800 shadow-sm">{t}*</span>
  return (
    <div className="space-y-2">
      <div className="rounded-lg bg-slate-800 px-3 py-1.5 text-center text-[13px] font-semibold text-white">Reality → Stimulus</div>
      <div className="grid gap-2 md:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-3">
          <div className="mb-2 text-[13px] font-bold text-indigo-900">Person A (Alex)</div>
          <div className="flex flex-wrap items-center gap-1">
            <S t="Perception" />→<S t="Interpretation" />→<S t="Choice/Selection" />→<S t="Encoding" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center text-[12px] font-semibold text-slate-600">
          <span>Transmission through a channel*</span>
          <span className="text-lg">⇄</span>
          <span>Feedback*</span>
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <div className="mb-2 text-[13px] font-bold text-emerald-900">Person B (Barbara)</div>
          <div className="flex flex-wrap items-center gap-1">
            <S t="Perception" />→<S t="Decoding" />→<S t="Interpretation" />→<S t="Choice/Selection" />→<S t="Encoding" />
          </div>
        </div>
      </div>
      <div className="rounded-lg border-2 border-dashed border-rose-300 bg-rose-50/60 px-3 py-2 text-[13px] text-rose-950">
        <b>* Noise (and miscommunication) can occur at every starred step.</b> Physical noise: static, a lawn mower, bad handwriting. Psychological noise: disliking the speaker, worrying about something else, a mind already made up.
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <Box tone="amber" title="Channel overload">The <b>channel</b> can't carry all the messages (two phone lines, both busy).</Box>
        <Box tone="amber" title="Information overload">The <b>human receiver</b> gets more messages than they can process.</Box>
      </div>
    </div>
  )
}

export function SocialVsConventional() {
  return (
    <Compare
      headers={['Conventional: "We talk, you listen"', 'Social model: "Let\'s have a conversation"']}
      firstColBold={false}
      rows={[
        ['Publication, broadcast', 'Conversation'],
        ['Lecture', 'Discussion'],
        ['Intrusion', 'Permission'],
        ['Unidirectional', 'Bidirectional, multidirectional'],
        ['One to many; mass audience', 'One to one; many to many'],
        ['Control', 'Influence'],
        ['Low message frequency', 'High message frequency'],
        ['Few channels', 'Many channels'],
        ['Information hoarding', 'Information sharing'],
        ['Static', 'Dynamic'],
        ['Hierarchical', 'Egalitarian'],
        ['Structured', 'Amorphous'],
        ['Isolated', 'Collaborative'],
        ['Planned', 'Reactive'],
        ['Resistive', 'Responsive'],
      ]}
    />
  )
}

export function ProfessionalismSix() {
  return (
    <Cards
      cols={3}
      items={[
        { title: 'Be the best', body: 'Strive to excel at every level.', tone: 'indigo' },
        { title: 'Be dependable', body: 'Keep promises, meet commitments, learn from mistakes, take responsibility.', tone: 'sky' },
        { title: 'Be a team player', body: 'Contribute to a larger cause; make others better.', tone: 'emerald' },
        { title: 'Be respectful', body: 'Good business etiquette is a sign of respect.', tone: 'violet' },
        { title: 'Be positive', body: 'Keep a positive outlook, even when things get tough.', tone: 'amber' },
        { title: 'Be ethical', body: 'Avoid ethical lapses; weigh options carefully in ethical dilemmas.', tone: 'rose' },
      ]}
    />
  )
}

export function FormalNetwork() {
  const node = (x: number, y: number, t: string, w = 104) => (
    <g key={t}>
      <rect x={x - w / 2} y={y - 14} width={w} height="28" rx="6" fill="#f8fafc" stroke="#94a3b8" />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#0f172a">{t}</text>
    </g>
  )
  return (
    <div className="space-y-2">
      <svg viewBox="0 0 520 250" className="w-full" role="img" aria-label="Formal communication network showing downward, upward, horizontal and diagonal flows">
        <defs>
          {[
            ['down', '#4f46e5'],
            ['up', '#059669'],
            ['hor', '#d97706'],
            ['diag', '#e11d48'],
          ].map(([id, c]) => (
            <marker key={id} id={`m-${id}`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill={c} />
            </marker>
          ))}
        </defs>
        <g stroke="#cbd5e1" strokeWidth="1.5">
          <line x1="260" y1="44" x2="260" y2="70" />
          <line x1="90" y1="70" x2="430" y2="70" />
          {[90, 260, 430].map((x) => <line key={x} x1={x} y1="70" x2={x} y2="96" />)}
          <line x1="430" y1="124" x2="430" y2="166" />
          <line x1="90" y1="124" x2="90" y2="166" />
        </g>
        {node(260, 30, 'President')}
        {node(90, 110, 'VP Marketing')}
        {node(260, 110, 'VP Finance')}
        {node(430, 110, 'VP Production')}
        {node(90, 180, 'Director of Sales')}
        {node(430, 180, 'Plant Manager')}
        {node(430, 230, 'Line supervisor')}
        <line x1="430" y1="194" x2="430" y2="216" stroke="#cbd5e1" strokeWidth="1.5" />
        <path d="M 300 40 Q 360 60 400 92" fill="none" stroke="#4f46e5" strokeWidth="2.5" markerEnd="url(#m-down)" />
        <path d="M 60 166 Q 40 140 60 126" fill="none" stroke="#059669" strokeWidth="2.5" markerEnd="url(#m-up)" />
        <path d="M 145 102 L 205 102" fill="none" stroke="#d97706" strokeWidth="2.5" markerEnd="url(#m-hor)" />
        <path d="M 142 186 Q 280 210 375 228" fill="none" stroke="#e11d48" strokeWidth="2.5" strokeDasharray="5 3" markerEnd="url(#m-diag)" />
      </svg>
      <div className="grid gap-2 text-[13px] sm:grid-cols-4">
        <Box tone="indigo" title="Downward">Top → frontline: decisions, info to do the job.</Box>
        <Box tone="emerald" title="Upward">Employees → executives: problems, trends, grievances.</Box>
        <Box tone="amber" title="Horizontal (lateral)">Same level, across departments: coordinate, solve problems.</Box>
        <Box tone="rose" title="Diagonal">Across departments AND up or down.</Box>
      </div>
      <p className="text-[12.5px] text-slate-600">The <b>informal network</b> (grapevine) is everything outside these lines. It is healthy, but lots of rumors and gossip can be a sign that the formal network isn't working.</p>
    </div>
  )
}

export function EmailCompare() {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <div className="rounded-lg border border-rose-200 bg-white">
        <div className="rounded-t-lg bg-rose-600 px-3 py-1.5 text-[13px] font-semibold text-white">INEFFECTIVE</div>
        <div className="space-y-1.5 p-3 text-[13px] text-slate-800">
          <p><b>Subject:</b> Social Media Strategy <span className="text-rose-600">(a) vague</span></p>
          <p>All, <span className="text-rose-600">(b) cold greeting</span></p>
          <p>The consultant we discussed… This guy has helped… <span className="text-rose-600">(c) no background for people who missed the meeting</span></p>
          <p>…most of you just sat and stared during the Q&A. <span className="text-rose-600">(d) accusatory; who does what by when?</span></p>
          <p>Tuesday, 10:00 a.m. to whenever <span className="text-rose-600">(e) day but no date</span></p>
          <p>…if you won't attend, at least try to phone in <span className="text-rose-600">(f) assumes people don't want to come</span></p>
          <p>Shari <span className="text-rose-600">(g) no "Thank you" · (h) no contact info</span></p>
        </div>
      </div>
      <div className="rounded-lg border border-emerald-200 bg-white">
        <div className="rounded-t-lg bg-emerald-600 px-3 py-1.5 text-[13px] font-semibold text-white">EFFECTIVE</div>
        <div className="space-y-1.5 p-3 text-[13px] text-slate-800">
          <p><b>Subject:</b> Social Media Strategy meeting, 10:00 a.m. – 2:00 p.m. <span className="text-emerald-700">(a) informative</span></p>
          <p>Hi team, <span className="text-emerald-700">(b) friendly, not too casual</span></p>
          <p>For those of you who missed the meeting, Walter Johnson has helped… <span className="text-emerald-700">(c) fills in background</span></p>
          <p>…project leaders brainstorm questions; email them to Pete by end of day Thursday. <span className="text-emerald-700">(d) upbeat, clear request</span></p>
          <p>Tuesday, March 12, 10:00 a.m. to 2:00 p.m., Mt. Shasta room <span className="text-emerald-700">(e) exact date</span></p>
          <p>Can't attend in person? Dial in; slides on WebEx. Questions? Drop by Friday. <span className="text-emerald-700">(f) inclusive, invites questions</span></p>
          <p>Thanks, Shari Washington, Group Manager, office/mobile numbers <span className="text-emerald-700">(g) warm close · (h) signature</span></p>
        </div>
      </div>
    </div>
  )
}

export function EthicsMap() {
  return (
    <div className="space-y-3">
      <div className="text-[13px] font-semibold text-slate-700">Three forms of unethical communication:</div>
      <Cards
        cols={3}
        items={[
          { title: 'Withholding information', body: 'Hiding mistakes, incomplete facts. Related: **transparency**, **native advertising** (ads that look like news; must be labeled), **stealth marketing** (promoting without saying it\'s marketing).', tone: 'rose' },
          { title: 'Distorting information', body: 'Selective misquoting, averages that hide extremes, misleading trends ("sales up 40%" after a disastrous month), altered photos, rescaled graphs, **deep fakes**.', tone: 'rose' },
          { title: 'Plagiarizing', body: 'Presenting someone else\'s words or creative work as your own. Can also break **copyright** law.', tone: 'rose' },
        ]}
      />
      <div className="grid gap-3 md:grid-cols-2">
        <Box tone="amber" title="Ethical DILEMMA">A choice between alternatives that are <b>not clear-cut</b>: both may be ethical and valid, or in a gray area. (Employees want higher wages vs investors want low costs.)</Box>
        <Box tone="rose" title="Ethical LAPSE">A <b>clearly unethical</b> choice. (Promising a customer a date you know you can't meet.) No dilemma here.</Box>
      </div>
      <Box tone="emerald" title="5 questions to check if your message is ethical">
        1. Is my intention honorable and respectful? · 2. Am I giving all the information needed for an informed decision? · 3. Have I considered the effect on everyone affected? · 4. Am I respecting the legal and moral rights of people whose ideas I use? · 5. Could a different approach be better for everyone? <i>Still unsure? Imagine explaining it to someone whose opinion you value.</i>
      </Box>
      <Box tone="slate" title="Code of ethics: Apple's Business Conduct Policy (sample in your materials)">
        Principles: <b>Honesty</b> · <b>Respect</b> · <b>Confidentiality</b> · <b>Compliance</b>. Employees must speak up about violations, Apple promises <b>no retaliation</b>, and there are annual training and a helpline.
      </Box>
      <Cards
        cols={4}
        items={[
          { title: 'Bribe', body: 'Offering/giving **anything of value** (cash, gift cards, gifts, meals, travel) to get or keep business or an **improper advantage**. Public or private.', tone: 'violet', tag: 'highlighted' },
          { title: 'Kickback', body: 'A type of bribery: something of value in exchange for giving **information, a discount or a favor** to a third party.', tone: 'violet', tag: 'highlighted' },
          { title: 'Facilitating payment', body: 'A type of bribe used to **speed up routine, non-discretionary government action**.', tone: 'violet', tag: 'highlighted' },
          { title: 'Money laundering', body: 'Trying to **conceal illicit funds** or make them look legitimate.', tone: 'violet', tag: 'highlighted' },
        ]}
      />
    </div>
  )
}

export function Paiboc() {
  const items = [
    { l: 'P', t: 'Purposes', q: 'What must this message do? What do you want readers to know, think, do?' },
    { l: 'A', t: 'Audience', q: 'Who is (are) your audience(s)? How do they differ? Which characteristics matter here?' },
    { l: 'I', t: 'Information', q: 'What information must the message include?' },
    { l: 'B', t: 'Benefits', q: 'What reasons or reader benefits support your position? (Aim for 5.)' },
    { l: 'O', t: 'Objections', q: 'What objections will readers have? What negatives must you de-emphasize or overcome?' },
    { l: 'C', t: 'Context', q: 'How will the context affect response? Relationship, morale, economy, time of year, special circumstances.' },
  ]
  return (
    <div className="space-y-2">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div key={it.l} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-3">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl font-black ${it.l === 'P' ? 'bg-slate-700 text-white' : 'bg-indigo-600 text-white'}`}>{it.l}</span>
            <div>
              <div className="text-[14px] font-semibold text-slate-900">{it.t}</div>
              <div className="text-[13px] text-slate-600">{it.q}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[12.5px] text-slate-600">Module 2 note: five of the six questions (A, I, B, O, C, everything except P) relate to the <b>audience</b>. Your purposes come from you and your organization; the audience decides <i>how</i> you achieve them.</p>
    </div>
  )
}

export function GoodMessage() {
  return (
    <div className="space-y-3">
      <div className="text-[13px] font-semibold text-slate-700">3 basic purposes of messages in organizations (most messages have more than one):</div>
      <Flow
        steps={[
          { title: 'Inform', sub: 'Explain or tell readers something.' },
          { title: 'Request or persuade', sub: 'Request = easy, routine action. Persuade = you must motivate and convince.' },
          { title: 'Build goodwill', sub: 'Create a good image of you and your organization.' },
        ]}
      />
      <div className="grid gap-3 md:grid-cols-2">
        <Box tone="emerald" title="Locker: 5 criteria of good business writing">
          <ol className="mt-1 list-decimal space-y-0.5 pl-4">
            <li><b>Clear</b>: reader gets the meaning the writer intended.</li>
            <li><b>Complete</b>: all the reader's questions answered.</li>
            <li><b>Correct</b>: accurate info, no grammar/spelling errors.</li>
            <li><b>Saves the reader's time</b>: style, organization, visual impact.</li>
            <li><b>Builds goodwill</b>: positive image, treats the reader as a person.</li>
          </ol>
        </Box>
        <Box tone="sky" title="Bovée & Thill: effective messages are…">
          <ol className="mt-1 list-decimal space-y-0.5 pl-4">
            <li><b>Practical</b>: useful information.</li>
            <li><b>Factual</b>: facts, not vague impressions.</li>
            <li><b>Concise</b>: efficient, respects time.</li>
            <li><b>Clear</b> about expectations and responsibilities.</li>
            <li><b>Persuasive</b>: compelling arguments and recommendations.</li>
          </ol>
        </Box>
      </div>
      <p className="text-[12.5px] text-slate-600">One page of correspondence ≈ <b>$21.15</b> (54 minutes × $23.50/hour). Poor writing costs even more: wasted time, wasted effort, lost goodwill.</p>
    </div>
  )
}

export function SchoolVsBusiness() {
  return (
    <Compare
      headers={['', 'School writing', 'Business communication']}
      rows={[
        ['Purpose', 'Show you learned the material', 'Meet an **organizational need**'],
        ['Audience', 'Instructor (paid to read it)', 'Inside & outside readers who pay attention only if it seems important'],
        ['Information', 'Rarely new to the instructor', 'Usually **new** to the reader'],
        ['Organization', 'Essay: thesis, evidence, conclusion', 'Meets the reader\'s psychological needs; usually **main point first**'],
        ['Style', 'Formal; big words, long sentences', '**Friendly**; short words, mixed sentence lengths'],
        ['Document design', 'Long paragraphs, double spaced', '**Skimmable**: headings, lists, white space'],
        ['Visuals', 'Rare (except math/engineering)', 'Expected: tables, graphs, slides'],
      ]}
    />
  )
}

export function InternalExternal() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Box tone="indigo" title="Internal audiences: same organization">
        <div className="mt-1 space-y-1">
          <div><b>Superiors</b>: President, VPs (above the Sales Manager–West)</div>
          <div><b>Peers</b>: Sales managers East, Midwest, International</div>
          <div><b>Subordinates</b>: district managers, sales reps</div>
        </div>
      </Box>
      <Box tone="emerald" title="External audiences: outside the organization">
        Customers & clients · suppliers & vendors · unions · stockholders, investors, lenders · potential employees · government agencies & regulators · legislators · courts · the media · the general public · competitors · trade associations · special interest groups · distributors & retailers
      </Box>
    </div>
  )
}

export function FiveAudiences() {
  return (
    <div className="space-y-3">
      <Flow
        steps={[
          { title: 'Writer', sub: 'Account executive at an ad agency', tone: 'slate' },
          { title: 'Initial', sub: 'Gets it first, routes it; may assign it. **Her boss.**', tone: 'sky' },
          { title: 'Gatekeeper', sub: 'Can **stop** it before the primary audience. **Her boss** (must approve).', tone: 'amber' },
          { title: 'Primary', sub: '**Decides / acts.** Client\'s executive committee.', tone: 'indigo' },
          { title: 'Secondary', sub: 'Comments on it or **implements** it. Client\'s marketing staff; artists, writers, media buyers.', tone: 'emerald' },
        ]}
      />
      <Box tone="rose" title="👁 Watchdog audience (watches from the side)">
        Has <b>political, social or economic power</b>. Can't stop the message and won't act on it directly, but evaluates it and may act later. (Consulting report: <b>industry reviewers</b> whose goodwill mattered for future contracts.)
      </Box>
      <p className="text-[12.5px] text-slate-600">One person can play two roles, e.g. the boss here is both the <b>initial</b> audience and the <b>gatekeeper</b>. Different needs? Meet the needs of <b>gatekeepers and primary audiences first</b>.</p>
    </div>
  )
}

export function ChannelChoice() {
  return (
    <div className="space-y-2">
      <Compare
        headers={['Written messages make it easier to…', 'Oral messages make it easier to…']}
        firstColBold={false}
        rows={[
          ['Present many specific details (law, policy, procedure)', 'Answer questions, resolve conflicts, build consensus'],
          ['Present extensive or complex financial data', 'Use emotion to help persuade'],
          ['Minimize undesirable emotions', 'Get immediate action or response'],
          ['', 'Focus attention on specific points'],
          ['', 'Modify a proposal that may not be acceptable as-is'],
        ]}
      />
      <p className="text-[12.5px] text-slate-600">Channels vary in speed, accuracy, cost, number of messages carried, number of people reached, efficiency, and ability to build goodwill. <b>Important or big-audience messages → use multiple channels.</b></p>
    </div>
  )
}

export function TechBenefits() {
  return (
    <div className="space-y-3">
      <div className="text-[13px] font-semibold text-slate-700">5 potential benefits of communication technology:</div>
      <Cards
        cols={4}
        items={[
          { title: 'More effective', body: 'Clearer, more persuasive messages (e.g., augmented writing).', tone: 'indigo' },
          { title: 'More efficient', body: 'Less time to create, send, consume (chatbots, taskbots).', tone: 'indigo' },
          { title: 'Better research', body: 'Discover and analyze information (data/text mining).', tone: 'indigo' },
          { title: 'Better decisions', body: 'Guidance through complex data (cognitive automation).', tone: 'indigo' },
          { title: 'Fewer barriers', body: 'More people can take part (translation, augmented ability).', tone: 'indigo' },
        ]}
      />
      <div className="text-[13px] font-semibold text-slate-700">3 innovations reshaping communication:</div>
      <Cards
        cols={3}
        items={[
          { title: 'Social & workgroup systems', body: 'Social media let stakeholders share, revise, respond to and contribute content.', tone: 'sky' },
          { title: 'Mobile communication', body: 'Over half of internet access is mobile; small screens make reading/writing harder.', tone: 'sky' },
          { title: 'Intelligent communication technology (ICT)', body: 'AI for communication: machine/deep learning, NLP, computer vision.', tone: 'sky' },
        ]}
      />
      <Box tone="amber" title="Use technology wisely">Keep it in perspective (a tool, not a replacement) · guard against <b>information overload</b> · beware the <b>information technology paradox</b> (tools can waste as much time as they save) · use tools efficiently.</Box>
    </div>
  )
}
