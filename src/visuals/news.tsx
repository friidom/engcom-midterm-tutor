import { Box, Cards, Compare, Flow, Label } from './kit'

export function DefamationMap() {
  return (
    <div className="space-y-3">
      <Box tone="indigo" title="Defamation = damaging someone's good reputation with a FALSE statement" className="text-center" />
      <div className="grid gap-3 sm:grid-cols-2">
        <Box tone="amber" title="Slander: SPOKEN">A false <b>spoken</b> statement that damages a person's reputation. (S = Spoken / Sound)</Box>
        <Box tone="rose" title="Libel: WRITTEN / PUBLISHED">A <b>published</b> false statement that damages reputation, i.e. written defamation. (L = Literature / Letters)</Box>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-3">
        <div className="mb-2 text-[13px] font-semibold text-slate-700">It's a <b>tort</b> (a civil wrong, not a crime in most US states):</div>
        <div className="flex flex-wrap items-center justify-center gap-2 text-[13px]">
          <Box tone="sky" title="Plaintiff">the person defamed</Box>
          <span className="font-semibold text-slate-500">sues for damages →</span>
          <Box tone="slate" title="Defendant">the person who defamed</Box>
        </div>
      </div>
      <div className="text-[13px] font-semibold text-slate-700">To win, the plaintiff typically must show ALL four:</div>
      <Flow
        numbered
        tone="emerald"
        steps={[
          { title: 'Published', sub: 'The defendant published a statement about the plaintiff.' },
          { title: 'False', sub: 'Objectively false. An **opinion** does not count.' },
          { title: 'Injurious', sub: 'Caused harm: fired, lost customers, shunned, harassed online.' },
          { title: 'Unprivileged', sub: 'Not protected by a privilege.' },
        ]}
      />
      <div className="text-[13px] font-semibold text-slate-700">US courts' 4 categories that bring someone into "hatred, contempt or ridicule":</div>
      <Cards
        cols={4}
        items={[
          { title: '1. Crime', body: 'Accusing someone of a crime.', tone: 'rose' },
          { title: '2. Office / profession', body: 'Damaging them in their public office, profession or occupation.', tone: 'rose' },
          { title: '3. Serious immorality', body: 'Accusing a person of serious immorality.', tone: 'rose' },
          { title: '4. Loathsome disease', body: 'Accusing someone of having a loathsome (contagious) disease.', tone: 'rose' },
        ]}
      />
    </div>
  )
}

export function LibelDefenses() {
  return (
    <div className="space-y-3">
      <div className="text-center">
        <span className="inline-block rounded-lg bg-slate-800 px-4 py-2 text-[14px] font-semibold text-white">3 traditional defenses against libel</span>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <Box tone="emerald" title={<span className="flex items-center gap-2">1. Truth <Label tone="emerald">best defense</Label></span>}>
          If it's true, it isn't libel. In cases about <b>matters of public concern</b>, the <b>burden of proof is on the plaintiff</b>.
        </Box>
        <div className="space-y-2">
          <Box tone="sky" title="2. Privilege">Covers reporting on the three branches of government.</Box>
          <Box tone="sky" title="Absolute privilege">Legislators, judges, government executives in their <b>official capacity</b>, plus judicial-proceeding participants (attorney, clerk, judge), may say anything, true or false.</Box>
          <Box tone="sky" title="Qualified privilege (reporters)">a.k.a. <b>neutral reporting</b> or <b>conditional privilege</b>. You may report what officials say IF your report is <b>full, fair and accurate</b>.</Box>
        </div>
        <Box tone="violet" title="3. Fair comment & criticism">
          You may publish <b>opinions</b> about public officials and public figures (actors, athletes, newsworthy people), as long as you <b>don't misstate the facts</b> behind the opinion or <b>imply secret damaging information</b>.
        </Box>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Box tone="amber" title="+ 2 constitutional standards">
          <b>Actual malice</b>: knowing the statement is false, OR reckless disregard for the truth. And the <b>negligence</b> test.
        </Box>
        <Box tone="slate" title="Ken Paulson's keys to avoiding libel">
          Have I reported… <b>fully</b>? <b>factually</b>? <b>fairly</b>? in <b>good faith</b>?
        </Box>
      </div>
    </div>
  )
}

export function PrivacyMap() {
  return (
    <div className="space-y-3">
      <Box tone="indigo" title="Invasion of privacy = violating a person's right to be left alone" className="text-center" />
      <div className="text-[13px] font-semibold text-slate-700">A reporter risks a privacy suit when they:</div>
      <Cards
        cols={4}
        items={[
          { title: 'Intrude physically', body: 'Enter a private area to get a story or picture (close to **trespass**).', tone: 'rose' },
          { title: 'Portray in a "false light"', body: 'Publish a **misleading** story/photo about someone.', tone: 'rose' },
          { title: 'Disclose private facts', body: 'Something **true** but **offensive** to a person of ordinary sensibilities.', tone: 'rose' },
          { title: 'Use name/picture for trade', body: 'In an **advertisement** or similar commercial purpose.', tone: 'rose' },
        ]}
      />
      <div className="grid gap-3 md:grid-cols-2">
        <Box tone="emerald" title="Defenses">
          <b>Consent</b> (don't go beyond what was consented to), and <b>newsworthiness</b>: courts usually protect reporting on matters of legitimate public interest.
        </Box>
        <Box tone="amber" title="…but newsworthiness does NOT protect">
          1. <b>Trespassing</b> (Life magazine staff posing as patients lost, even working with the DA). 2. <b>False light</b> (careful pedestrian's photo reused in a "careless pedestrians" story). 3. Causing <b>unwanted publicity</b>.
        </Box>
      </div>
    </div>
  )
}

export function CopyrightTimeline() {
  return (
    <div className="space-y-3">
      <Flow
        tone="sky"
        steps={[
          { title: 'Work is created', sub: 'Protected from the moment it is **fixed in tangible form**, published or not.' },
          { title: 'Author\'s life', sub: 'Copyright lasts the whole life of the author…' },
          { title: '+ 70 years', sub: '…and 70 years after the author\'s death.' },
        ]}
      />
      <Compare
        headers={['Type of work', 'How long it is protected']}
        rows={[
          ['Normal work (one known author)', 'Life of the author **+ 70 years**'],
          ['Works for hire, anonymous, pseudonymous', '**95 years from publication** or **100 years from creation**, whichever is **shorter**'],
          ['Fair use', 'A limit on the owner\'s rights: you may quote **small excerpts** without permission'],
        ]}
      />
      <Box tone="slate" title="Political correctness (also on the slide)">
        The belief that speech or behavior offensive to various groups' sensibilities should be eliminated, by regulations or penalties if necessary.
      </Box>
    </div>
  )
}

export function NewsValues() {
  return (
    <div className="space-y-3">
      <div className="text-[13px] font-semibold text-slate-700">Professional reporters decide what news is with three words:</div>
      <Flow
        steps={[
          { title: 'Relevance', sub: 'Does it matter to my audience?' },
          { title: 'Usefulness', sub: 'Can they use this information?' },
          { title: 'Interest', sub: 'Will they want to read it?' },
        ]}
      />
      <div className="text-[13px] font-semibold text-slate-700">The 8 elements of a good news story (The Missouri Group):</div>
      <Cards
        cols={4}
        items={[
          { title: 'Impact', body: 'How many people affected, how seriously? Wider + heavier = better story. Measures relevance & usefulness.', tone: 'indigo' },
          { title: 'Conflict', body: 'Struggles between people, nations, or with nature. Don\'t overdramatize or oversimplify.', tone: 'rose' },
          { title: 'Novelty', body: 'Unusual or bizarre people/events.', tone: 'violet' },
          { title: 'Prominence', body: 'Names make news: bigger name, bigger news. Can be exaggerated.', tone: 'amber' },
          { title: 'Proximity', body: 'Close to home, geographically OR by shared interest (a sport, hobby, issue).', tone: 'emerald' },
          { title: 'Timeliness', body: 'Listed on the slide (not explained there). News is new: recent events, or a fresh reason to report now.', tone: 'sky' },
          { title: 'Engagement', body: 'Listed on the slide (not explained there). How the story involves and connects with the audience.', tone: 'sky' },
          { title: 'Solutions', body: 'Listed on the slide (not explained there). Covering responses to problems, not only the problems.', tone: 'sky' },
        ]}
      />
      <p className="text-[12.5px] text-slate-500">The last three are only named on your slide. Their one-line meanings here are general journalism explanations, not slide text.</p>
    </div>
  )
}

export function InvertedPyramid() {
  const bands = [
    { y: 0, h: 62, label: 'LEAD: most important facts', sub: '1 sentence · 30–35 words · who, what, when, where', fill: '#4f46e5' },
    { y: 64, h: 56, label: '2nd paragraph: develop the lead', sub: 'Expand the lead (not chronological)', fill: '#6366f1' },
    { y: 122, h: 50, label: 'Supporting facts & quotes', sub: 'Attributed · quotes ≤ 2 sentences', fill: '#818cf8' },
    { y: 174, h: 44, label: 'Background', sub: '', fill: '#a5b4fc' },
    { y: 220, h: 40, label: 'Least important', sub: '', fill: '#c7d2fe' },
  ]
  return (
    <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-[1.2fr_1fr]">
      <svg viewBox="0 0 400 270" className="w-full" role="img" aria-label="Inverted pyramid: most important information at the wide top, least important at the narrow bottom">
        <defs>
          <clipPath id="tri">
            <polygon points="0,0 400,0 200,265" />
          </clipPath>
        </defs>
        <g clipPath="url(#tri)">
          {bands.map((b) => (
            <rect key={b.y} x="0" y={b.y} width="400" height={b.h} fill={b.fill} />
          ))}
        </g>
        {bands.map((b, i) => (
          <g key={b.y}>
            <text x="200" y={b.y + (b.sub ? 22 : b.h / 2 + 5)} textAnchor="middle" fontSize={i < 2 ? 15 : 12} fontWeight="700" fill={i < 3 ? 'white' : '#1e1b4b'}>
              {b.label}
            </text>
            {b.sub && i < 3 && (
              <text x="200" y={b.y + 40} textAnchor="middle" fontSize={i === 2 ? 9.5 : 10.5} fill="white" opacity="0.95">
                {b.sub}
              </text>
            )}
          </g>
        ))}
      </svg>
      <div className="space-y-2 text-[13px]">
        <Box tone="indigo" title="Descending order of importance">The reader can stop at any point and still have the most important news. An editor can cut from the bottom.</Box>
        <Box tone="slate" title="Checklist highlights">
          Attribute all major info · don't dump strings of quotes · quote, speaker, verb: "John did not go with her," he said. · AP style · past tense · avoid "it is / there are" · no comma splices · paragraphs ≤ 2 sentences (3 is probably too long) · cut wordiness · use transitions · don't copy the information sheet · check names.
        </Box>
        <Box tone="amber" title="Name + title">
          Title BEFORE name: no commas: Game warden Brad Fisher arrested… · Name BEFORE title: commas: Brad Fisher, the game warden, arrested…
        </Box>
      </div>
    </div>
  )
}

export function SummaryLeadParts() {
  const parts = [
    { t: 'DOVER —', l: 'where (dateline)', c: 'bg-emerald-100' },
    { t: 'A speeding car passed a minivan on a state highway', l: 'how', c: 'bg-sky-100' },
    { t: 'and slammed into a car traveling in the other direction near this eastern Ohio town,', l: 'what', c: 'bg-indigo-100' },
    { t: 'killing four people,', l: 'who / result', c: 'bg-rose-100' },
    { t: 'the Ohio Highway Patrol said', l: 'who said (attribution)', c: 'bg-amber-100' },
    { t: 'Friday.', l: 'when', c: 'bg-violet-100' },
  ]
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-slate-200 bg-white p-3 text-[14.5px] leading-[2.2]">
        {parts.map((p, i) => (
          <span key={i} className={`relative mr-1 rounded px-1 py-0.5 ${p.c}`}>
            {p.t}
            <span className="absolute -bottom-3.5 left-1 whitespace-nowrap text-[10px] font-semibold uppercase text-slate-500">{p.l}</span>
          </span>
        ))}
      </div>
      <p className="pt-2 text-[13px] text-slate-600">
        <b>Why?</b> Speed and bad judgment, perhaps; not yet known. A summary lead tells the <b>result/climax first</b>, like the thesis of a paper, but it saves minor details for the body. (Associated Press, July 6, 2002)
      </p>
    </div>
  )
}

export function LeadChooser() {
  return (
    <Compare
      headers={['Ask yourself…', 'Use this lead', 'Example from slides']}
      rows={[
        ['Is the **whole** event more important than any one part?', '**Summary**: who, what, where, when (+ how, why)', 'Four killed in Dover crash, Highway Patrol said Friday.'],
        ['Would all the facts crowd the lead, or do I want **suspense / an angle**?', '**Partial summary**: omits some details, sets a tone', '"Oprah Winfrey is keeping Miami Valley Hospital busy."'],
        ['Are **two or more actions equally important**, linked by time, place, type or cause?', '**Multiple element / roundup**', '"At least 10 people died in Ohio traffic accidents over the weekend, including three…"'],
        ['Is there a **local** angle on a national/international event?', '**Localized** (proximity)', '"More than 40 people, including a woman from Dayton, were killed…"'],
        ['Is this the **latest news about an earlier** event?', '**Follow-up**: newest info + a word of background', '"A 6-year-old boy taken from a train station Monday was found unharmed…"'],
        ['Is the "who" **prominent** (or the story is about what happened to that person)?', '**Immediate identification**: name in the lead', '"President Bush and Polish President Aleksander Kwasniewski agreed…"'],
        ['Is the "who" **not well known**, so the name means little?', '**Delayed identification**: describe by title, age, residence…', '"A 10-year-old Grand Ledge boy was seriously injured Saturday…"'],
        ['Is it a feature with **flair** and novelty?', '**Feature lead**: anecdote, description, staccato, zinger, flashback, direct address, representative example', '"In preparation for tonight\'s poetry reading, Charles Bukowski is out in the parking lot, vomiting."'],
      ]}
    />
  )
}

export function FeatureStructure() {
  return (
    <div className="space-y-3">
      <div className="grid gap-2 sm:grid-cols-4">
        {['Attract attention', 'Introduce the topic', 'Set the tone', 'Establish the point of view'].map((t, i) => (
          <Box key={t} tone="indigo" title={`Job ${i + 1}`}>{t}</Box>
        ))}
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-3">
        <div className="mb-2 text-[13px] font-semibold text-slate-700">A feature article is like an airplane: most likely to crash at takeoff and landing.</div>
        <Flow
          steps={[
            { title: '✈ Takeoff = Lead', sub: 'a.k.a. **hook** / **introduction**. Grabs and holds interest.', tone: 'indigo' },
            { title: 'Nutgraf / billboard', sub: 'Usually right after the lead: what the story is about "in a nutshell".', tone: 'amber' },
            { title: 'Body', sub: 'Remaining content in logical order.', tone: 'slate' },
            { title: '🛬 Landing = Ending', sub: 'Smooth, not abrupt. Know it before you start writing.', tone: 'indigo' },
          ]}
        />
        <p className="mt-2 text-[13px] text-slate-600">
          <b>Bookends</b>: the lead and the ending together hold everything in place. The lead gives <b>direction</b>, the ending gives a <b>destination</b>.
        </p>
      </div>
      <Compare
        headers={['Choose a lead by…', 'What it means']}
        rows={[
          ['The publication', 'Short articles/pages → editors depend on the "old workhorse" summary lead.'],
          ['The topic', 'How-to articles get to the point fast; profiles and complex issues allow a slower start.'],
          ['The audience', 'Age, profession, education. Readers for entertainment like description; readers for information like directness.'],
        ]}
      />
    </div>
  )
}

export function SixFeatureLeads() {
  return (
    <div className="space-y-3">
      <Cards
        cols={3}
        items={[
          { title: 'Anecdote lead', body: 'A little story about people at a specific place and time ("chocolate chips of feature writing"). Ex: Simon Wang, Shanghai, joins Weight Watchers.', tone: 'indigo' },
          { title: 'Scenario lead', body: 'Recreates a **place** so readers "see" the backdrop. Be selective, light hand. Ex: Meryl Streep at 4:20, Union Station.', tone: 'sky' },
          { title: 'Shock lead', body: 'A truly **surprising** fact. Ex: 47% of British men would give up sex for a plasma TV.', tone: 'rose' },
          { title: 'Blind lead', body: '**Withholds who** the subject is to raise curiosity. Ex: Duff McKagan named only in the third sentence.', tone: 'violet' },
          { title: 'Direct / indirect quote lead', body: 'A noteworthy **quote** that sums up the main idea, or its essence without exact words.', tone: 'amber' },
          { title: 'Direct-address lead', body: 'Talks to the reader as **"you"**. Risk: sounding condescending or assuming a shared scenario.', tone: 'emerald' },
        ]}
      />
      <Box tone="slate" title="McKinney's 4 basic ways to begin (Magazine Writing That Sells)">
        Tell a story · Let someone else talk · Thrust us into the action · Tell us what you're going to tell us. About <b>80%</b> of ~60 magazine articles surveyed mentioned a person in the lead.
      </Box>
    </div>
  )
}

export function AngleTree() {
  const angles = [
    { x: 200, y: 30, t: '"Outsourcing home cooking"', s: 'Time' },
    { x: 60, y: 120, t: '"How to go home earlier"', s: "Reader's Digest" },
    { x: 340, y: 120, t: '"How to do everything faster"', s: 'PC World' },
    { x: 200, y: 215, t: '"Cut down on telephone calls"', s: "Woman's Day" },
  ]
  return (
    <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-[1.1fr_1fr]">
      <svg viewBox="0 0 400 250" className="w-full" role="img" aria-label="Angle tree: broad idea Saving time in the center with four focused angles">
        {angles.map((a) => (
          <line key={a.t} x1="200" y1="125" x2={a.x} y2={a.y} stroke="#a5b4fc" strokeWidth="3" />
        ))}
        <circle cx="200" cy="125" r="44" fill="#4f46e5" />
        <text x="200" y="121" textAnchor="middle" fontSize="13" fontWeight="700" fill="white">Saving time</text>
        <text x="200" y="137" textAnchor="middle" fontSize="10" fill="#e0e7ff">(broad idea)</text>
        {angles.map((a) => (
          <g key={a.t}>
            <rect x={a.x - 72} y={a.y - 20} width="144" height="40" rx="8" fill="#eef2ff" stroke="#c7d2fe" />
            <text x={a.x} y={a.y - 3} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#1e1b4b">{a.t}</text>
            <text x={a.x} y={a.y + 12} textAnchor="middle" fontSize="9.5" fill="#4338ca">({a.s})</text>
          </g>
        ))}
      </svg>
      <div className="space-y-2">
        <Compare
          headers={['Too broad', 'Tighter angle']}
          rows={[
            ['Losing weight', 'Teacher Tells How She Lost 100 Pounds'],
            ['Quitting smoking', 'Can Hypnotism Help You Quit the Habit?'],
            ['Improving home security', 'An Ex-Burglar Tells How to Burglar-Proof Your Home'],
            ['Traveling on a budget', 'Five Ways to Find Cheap Hotels and Overnight Lodging'],
            ['Choosing a smartphone', "Don't Buy These Extra Features You Don't Need"],
          ]}
        />
        <Box tone="emerald" title="A focused angle has: Unity · Action · Concreteness">Pick ONE angle as the main focus and maybe a second as a sidebar. Covering all angles = no depth.</Box>
      </div>
    </div>
  )
}

export function OriginalIdeaTest() {
  const qs = [
    'So new you can\'t find books on it?',
    'Appeals to the magazine\'s special-interest readers?',
    'Deals with fundamental life issues (death, love, sickness, money, careers, health)?',
    'Strong, central unifying theme?',
    'Theme stated in ONE sentence with an action verb?',
    'Offers intelligent insight, not the obvious?',
    'Drama or conflict to attract and hold readers?',
    'Colorful anecdotes / human-interest stories available?',
    'Questions conventional wisdom?',
    'Access to the sources you need (participants, observers, experts)?',
  ]
  return (
    <div>
      <div className="mb-2 text-[13px] font-semibold text-slate-700">Answer "yes" to at least the majority of these 10 questions:</div>
      <ol className="grid gap-1.5 sm:grid-cols-2">
        {qs.map((q, i) => (
          <li key={i} className="flex gap-2 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-[13px] text-slate-800">
            <span className="font-bold text-indigo-600">{i + 1}</span>
            {q}
          </li>
        ))}
      </ol>
    </div>
  )
}
