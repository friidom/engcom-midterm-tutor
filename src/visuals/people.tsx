import type { ReactNode } from 'react'
import { Box, Cards, Compare, Flow } from './kit'

export function Tuckman() {
  return (
    <div className="space-y-2">
      <Flow
        numbered
        steps={[
          { title: 'Forming', sub: 'Team comes together; members take roles; define the goal if not set.', tone: 'sky' },
          { title: 'Storming', sub: 'Conflict, disagreement, uncertainty: natural. Constructive helps; destructive must be addressed.', tone: 'rose' },
          { title: 'Norming', sub: 'Behavioral norms become clear; the group starts enforcing them.', tone: 'amber' },
          { title: 'Performing', sub: 'Productive work, alone or together.', tone: 'emerald' },
          { title: 'Adjourning', sub: 'Temporary teams disband; post-project analysis; advice for future teams.', tone: 'slate' },
        ]}
      />
      <div className="rounded-lg border-2 border-dashed border-rose-300 bg-rose-50/60 px-3 py-2 text-[13px] text-rose-950">
        ↺ If new conflict appears while <b>performing</b>, the team may go back to <b>storming</b> and <b>re-norming</b>. The stages are not always one-way.
      </div>
    </div>
  )
}

export function TeamProsCons() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Box tone="emerald" title="Advantages of teams">
        More information & knowledge · learning opportunities · boldness · accountability · trust building · broader viewpoints · <b>buy-in</b> for solutions · improved performance · sense of community
      </Box>
      <Box tone="rose" title="Disadvantages to counter">
        <b>Groupthink</b>: peer pressure makes members hide contrary opinions and go along. · <b>Hidden agendas</b>: private, counterproductive motives. · <b>Cost</b>: time and money to coordinate. · <b>Overload</b>: too many team assignments.
      </Box>
      <Box tone="indigo" title="Team-maintenance roles">Interpersonal side: enforce norms, make sure everyone is heard, encourage, compromise, mediate.</Box>
      <Box tone="sky" title="Task-oriented roles">Work side: technical expertise, new ideas, integrate ideas, explore options, keep schedule.</Box>
    </div>
  )
}

export function ConflictSteps() {
  return (
    <div className="space-y-3">
      <Flow
        numbered
        tone="indigo"
        steps={[
          { title: 'Worth addressing?', sub: 'Minor, or will disappear (team disbanding)? Maybe live with it.' },
          { title: 'Examine yourself', sub: 'Your own beliefs and behaviors may be part of it.' },
          { title: 'Find the true origin', sub: 'The real difference may lie below the surface.' },
          { title: 'Establish common ground', sub: 'What does everyone agree on? Build from there.' },
          { title: 'Choose a strategy', sub: 'Avoid · accommodate · compromise · collaborate' },
        ]}
      />
      <Compare
        headers={['Strategy', 'What happens', 'Outcome']}
        rows={[
          ['Avoidance', 'Avoid the circumstances that create conflict (don\'t assign the two to the same task)', 'Efficient sometimes, but doesn\'t fix the cause'],
          ['Accommodation', 'One side sacrifices for the organization or harmony', 'One side gives in'],
          ['Compromise', 'Both sides give up something', 'Balanced: a hallmark of successful teams'],
          ['Collaboration', 'Both work on a NEW solution that satisfies everyone', '**Win-win**'],
        ]}
      />
      <div className="grid gap-2 sm:grid-cols-2">
        <Box tone="emerald" title="Constructive conflict">Forces important issues into the open, increases involvement, generates creative ideas.</Box>
        <Box tone="rose" title="Destructive conflict">Diverts energy, destroys morale, polarizes the team → win-lose or lose-lose.</Box>
      </div>
    </div>
  )
}

export function FeedbackCompare() {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        <Box tone="emerald" title="Constructive feedback">Focuses on the <b>process and outcomes</b> of the communication, not the person. "Your proposal could be more effective with a clearer description of the manufacturing process…"</Box>
        <Box tone="rose" title="Destructive feedback">Complaining or bullying with no guidance. "This proposal is a confusing mess, and you failed to convince me of anything."</Box>
      </div>
      <Cards
        cols={4}
        items={[
          { title: 'Think it through', body: 'Isolated, superficial edits can do more harm than good.' },
          { title: 'Improvements, not flaws', body: 'Say HOW to make it clearer, not just "confusing".' },
          { title: 'Controllable behavior', body: 'Focus on what the writer can actually control.' },
          { title: 'Be specific', body: '"I don\'t get this" gives no direction.' },
          { title: 'Keep it impersonal', body: 'Comment on the message, not the person.' },
          { title: 'Verify understanding', body: 'Confirm the person understood your feedback.' },
          { title: 'Time it well', body: 'Respond early enough to make changes.' },
          { title: 'State your limits', body: 'Say if you skimmed or aren\'t an expert in some part.' },
        ]}
      />
      <Box tone="sky" title="Collaborative writing tips">Agree on goals · map out how work will be done · use each person's strengths · frequent checkpoints · accept different writing styles. If you divide the writing, <b>outline first</b>, then one person does a final pass for consistent style.</Box>
    </div>
  )
}

function Room({ kind }: { kind: 'conference' | 'u' | 'theater' | 'breakout' | 'classroom' }) {
  const seat = (x: number, y: number, k: string | number) => <circle key={k} cx={x} cy={y} r="4.5" fill="#6366f1" />
  const front = <rect x="40" y="6" width="40" height="5" rx="2" fill="#0f172a" />
  let body: ReactNode = null
  if (kind === 'conference') {
    body = (
      <>
        <rect x="30" y="30" width="60" height="30" rx="4" fill="#e2e8f0" />
        {[40, 55, 70, 80].map((x, i) => seat(x, 23, `t${i}`))}
        {[40, 55, 70, 80].map((x, i) => seat(x, 67, `b${i}`))}
        {seat(22, 45, 'l')}
        {seat(98, 45, 'r')}
      </>
    )
  } else if (kind === 'u') {
    body = (
      <>
        <path d="M25 22 V68 H95 V22" fill="none" stroke="#cbd5e1" strokeWidth="9" />
        {[30, 42, 54].map((y, i) => seat(16, y, `l${i}`))}
        {[30, 42, 54].map((y, i) => seat(104, y, `r${i}`))}
        {[40, 60, 80].map((x, i) => seat(x, 78, `b${i}`))}
        {front}
      </>
    )
  } else if (kind === 'theater') {
    body = (
      <>
        {front}
        {[24, 38, 52, 66, 80].map((y, r) => [20, 34, 48, 62, 76, 90, 100].map((x, c) => seat(x, y, `${r}-${c}`)))}
      </>
    )
  } else if (kind === 'breakout') {
    body = (
      <>
        {[
          [32, 30],
          [88, 30],
          [32, 66],
          [88, 66],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="9" fill="#e2e8f0" />
            {seat(cx - 14, cy, `${i}a`)}
            {seat(cx + 14, cy, `${i}b`)}
            {seat(cx, cy - 14, `${i}c`)}
            {seat(cx, cy + 14, `${i}d`)}
          </g>
        ))}
      </>
    )
  } else {
    body = (
      <>
        {front}
        {[28, 48, 68].map((y, r) => (
          <g key={r}>
            <rect x="14" y={y} width="40" height="5" fill="#cbd5e1" />
            <rect x="66" y={y} width="40" height="5" fill="#cbd5e1" />
            {[22, 34, 46, 74, 86, 98].map((x, c) => seat(x, y + 11, `${r}-${c}`))}
          </g>
        ))}
      </>
    )
  }
  return (
    <svg viewBox="0 0 120 90" className="h-24 w-full">
      <rect x="1" y="1" width="118" height="88" rx="6" fill="white" stroke="#e2e8f0" />
      {body}
    </svg>
  )
}

export function MeetingRooms() {
  const rooms = [
    { k: 'conference' as const, t: 'Conference room', d: 'Small meetings & working sessions; conversation among all.' },
    { k: 'u' as const, t: 'U-shape', d: 'Mid-sized meetings; presenter can walk inside the U; supports conversation.' },
    { k: 'theater' as const, t: 'Theater / auditorium', d: 'Large audiences; limits interaction; hard to use documents/devices.' },
    { k: 'breakout' as const, t: 'Breakout sessions', d: 'Groups do role play, brainstorming, problem solving; no interaction between groups.' },
    { k: 'classroom' as const, t: 'Classroom style', d: 'Like theater but with work surfaces; less interaction than U-shape.' },
  ]
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
      {rooms.map((r) => (
        <div key={r.k} className="rounded-lg border border-slate-200 bg-slate-50 p-2">
          <Room kind={r.k} />
          <div className="mt-1 text-[13px] font-semibold text-slate-900">{r.t}</div>
          <div className="text-[12px] leading-snug text-slate-600">{r.d}</div>
        </div>
      ))}
    </div>
  )
}

export function MeetingFlow() {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-3">
        <Box tone="sky" title="A. Prepare">
          <b>Is a meeting necessary?</b> Then: 1. define the purpose (picture the best outcome) · 2. select participants (only who's needed; &gt;10–12 gets unmanageable) · 3. choose venue & time (mornings) · 4. set and send the agenda.
        </Box>
        <Box tone="indigo" title="B. Lead & participate">
          Keep discussion on track · follow agreed rules (Robert's Rules of Order) · encourage & moderate participation · participate actively · don't interrupt · use mobile devices respectfully · close effectively (summarize, confirm actions).
        </Box>
        <Box tone="emerald" title="C. Use the results">
          Distribute <b>minutes</b> to participants and interested people · make sure task assignments are clearly communicated.
        </Box>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-3">
        <div className="mb-2 text-[13px] font-semibold text-slate-700">A good agenda answers 3 questions:</div>
        <div className="grid gap-2 text-[13px] sm:grid-cols-3">
          <Box tone="slate">1. What do we need to do in this meeting to accomplish our goals?</Box>
          <Box tone="slate">2. What issues matter most to all participants?</Box>
          <Box tone="slate">3. What information must be available to discuss them?</Box>
        </div>
      </div>
      <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-3">
        <div className="mb-2 text-[13px] font-semibold text-amber-950">Anatomy of meeting minutes (Fig. 2.7, "Employee Onboarding Update")</div>
        <div className="grid gap-1.5 text-[13px] text-amber-950 sm:grid-cols-2">
          <span>▸ Title, date, start & end time</span>
          <span>▸ Called by, facilitator, note taker, type of meeting</span>
          <span>▸ Attendees present (and invited but absent)</span>
          <span>▸ Each agenda item + presenter + objective summary of discussion</span>
          <span>▸ <b>Decisions</b> reached</span>
          <span>▸ <b>Action items</b>: task, person responsible, deadline</span>
          <span>▸ Subjects deferred to a later meeting</span>
          <span>▸ Attach handouts/slides</span>
        </div>
      </div>
    </div>
  )
}

export function ListeningStyles() {
  return (
    <div className="space-y-3">
      <Compare
        headers={['Style', 'Goal', 'Watch out']}
        rows={[
          ['Content listening', 'Understand and **retain** the information. Agreeing doesn\'t matter.', 'Ask questions, but don\'t challenge or correct the speaker.'],
          ['Critical listening', 'Understand and **evaluate**: logic, evidence, conclusions, implications, motives, omissions.', 'Not "criticizing". Separate facts from opinions; look for bias.'],
          ['Empathic listening', 'Understand the speaker\'s **feelings, needs, wants**, even if you disagree.', 'Silence your critical side; hard for "fixers".'],
        ]}
      />
      <div className="text-[13px] font-semibold text-slate-700">Active listening (all three styles are active) has 5 elements:</div>
      <Cards
        cols={4}
        items={[
          { title: 'Open, positive mind', body: 'Commit to the person and the time; be ready to be challenged.', tone: 'indigo' },
          { title: 'Stay engaged', body: 'Your brain is 3–4× faster than speech; don\'t let it wander.', tone: 'indigo' },
          { title: 'Respect silence', body: 'Don\'t jump in at the first pause or finish their sentence.', tone: 'indigo' },
          { title: 'Nonverbal awareness', body: 'Signals can strengthen, weaken or replace the words.', tone: 'indigo' },
          { title: 'Thoughtful notes', body: 'Don\'t rely on memory for important info.', tone: 'indigo' },
        ]}
      />
      <div className="grid gap-2 sm:grid-cols-3">
        <Box tone="rose" title="3 unique challenges of listening">Real time · invisible (no record to scroll back) · sound must be converted to language.</Box>
        <Box tone="amber" title="External vs internal barriers">External: noise, bad connection, mumbling. Internal: your thoughts, emotions, multitasking, <b>defensive listening</b> (tuning out what threatens your ego).</Box>
        <Box tone="sky" title="3 steps to listen better">1. Minimize barriers · 2. Adapt your listening style · 3. Listen actively.</Box>
      </div>
    </div>
  )
}

export function NonverbalSix() {
  return (
    <div className="space-y-3">
      <Flow
        steps={[
          { title: 'Strengthen', sub: 'Signals match the words.', tone: 'emerald' },
          { title: 'Weaken / contradict', sub: 'Signals don\'t match the words.', tone: 'rose' },
          { title: 'Replace', sub: 'Signals take the place of words.', tone: 'sky' },
        ]}
      />
      <Cards
        cols={3}
        items={[
          { title: 'Facial expressions', body: 'Main way to show emotion (type + intensity); eyes show attention, interest, dominance.', tone: 'indigo' },
          { title: 'Vocal characteristics', body: 'Pitch, pace, stress. "What are **you** doing?" vs "What are you **doing**?"', tone: 'indigo' },
          { title: 'Gesture & posture', body: 'Slouching, leaning forward, fidgeting, brisk walking reveal confidence or nerves.', tone: 'indigo' },
          { title: 'Personal appearance', body: 'People respond to appearance, fairly or not.', tone: 'indigo' },
          { title: 'Touch', body: 'Powerful but easily misread. Workplace rule: nothing beyond handshakes.', tone: 'indigo' },
          { title: 'Use of time & space', body: 'Punctuality, keeping someone waiting, personal distance, who sits where.', tone: 'indigo' },
        ]}
      />
      <Box tone="amber" title="Myth alert: the 7% / 38% / 55% rule">The famous claim that words carry only 7% of meaning comes from limited 50-year-old experiments about <b>feelings</b> and was never confirmed. Your textbook says to ignore it. Also: avoiding eye contact is <b>not</b> a reliable sign of lying.</Box>
    </div>
  )
}

export function EtiquetteZones() {
  return (
    <div className="space-y-3">
      <Cards
        cols={3}
        items={[
          { title: 'In the workplace', body: 'Be on time, don\'t interrupt, watch language, no strong scents, keep noise down, respect personal space, no gossip, don\'t come in sick, avoid religion/politics.', tone: 'indigo' },
          { title: 'In social settings', body: 'Firm handshake (North America) / bow (Japan); stand to shake hands; introduce with first + last name + role; younger to older, lower rank to higher rank; meals are for business.', tone: 'sky' },
          { title: 'Online', body: 'No personal attacks, stay on topic, proper spelling, virus protection, control emotions, don\'t multitask, never assume privacy, respect time boundaries.', tone: 'violet' },
          { title: 'On the telephone', body: 'Vary your voice; identify yourself and ask if it\'s a good time; answer promptly; double-check details at the end; keep voicemail useful.', tone: 'emerald' },
          { title: 'With mobile devices', body: 'Mute in meetings; no loud talking or personal calls at work; no texting during meals or conversations; ask before using the camera.', tone: 'amber' },
        ]}
      />
      <Compare
        headers={['Dress level', 'Looks like']}
        rows={[
          ['Business formal', 'Tailored conservative suits; most formal occasions, top executives'],
          ['Business professional', 'Suits or coordinated jackets; slightly freer'],
          ['Business casual', 'Slacks or skirts, button-up shirts, blouses, sweaters'],
          ['Casual', 'Varies most: nice jeans… to shorts and sandals'],
        ]}
      />
    </div>
  )
}

export function CulturalDimensions() {
  return (
    <Cards
      cols={4}
      items={[
        { title: 'Context', body: 'Pattern of physical cues, environment and implicit understanding.', tone: 'indigo' },
        { title: 'Laws & ethics', body: 'Explicit legal rules and implicit ethical guidelines (contracts, bribery).', tone: 'sky' },
        { title: 'Social customs', body: 'Formal and informal rules: work & success, roles & status, manners, time, future orientation, openness.', tone: 'emerald' },
        { title: 'Nonverbal signals', body: 'Greetings, personal space, touching, facial expressions, eye contact, posture, formality.', tone: 'violet' },
        { title: 'Age', body: 'Silent Gen, Boomers, Gen X, Millennials, Post-Millennials: broad generalities only.', tone: 'amber' },
        { title: 'Gender', body: 'Perceptions of roles; men tend to stress content, women relationship (broadly).', tone: 'rose' },
        { title: 'Religion', body: 'Expression of faith at work; reasonable accommodation (US law).', tone: 'slate' },
        { title: 'Ability', body: 'Full spectrum of physical & cognitive ability; neurodiversity; assistive technologies.', tone: 'sky' },
      ]}
    />
  )
}

export function ContextScale() {
  return (
    <div className="space-y-3">
      <div className="relative h-3 rounded-full bg-gradient-to-r from-sky-400 via-slate-300 to-rose-400" />
      <div className="grid gap-3 md:grid-cols-2">
        <Box tone="sky" title="LOW-context culture (e.g., US, Germany, Switzerland)">
          Meaning is in the <b>explicit words</b>; rules spelled out; focus on <b>exchanging information</b> and <b>results</b> of decisions; time is a limited resource; a signed contract ends negotiation.
        </Box>
        <Box tone="rose" title="HIGH-context culture (e.g., China, Japan, many Arab nations)">
          Meaning is in <b>nonverbal actions and setting</b>; communication builds <b>relationships</b>; focus on the <b>means/method</b> of deciding; time is flexible; contracts may stay open to renegotiation.
        </Box>
      </div>
    </div>
  )
}

export function InterculturalComponents() {
  return (
    <div className="space-y-3">
      <div className="grid gap-2 sm:grid-cols-3">
        <Box tone="indigo" title="Overcome ethnocentrism">Avoid assumptions · avoid judgments · acknowledge distinctions</Box>
        <Box tone="indigo" title="Recognize cultural variations">The 8 dimensions of diversity</Box>
        <Box tone="indigo" title="Enhance sensitivity">to culture and diversity</Box>
      </div>
      <div className="text-center text-slate-400">↓ Improve intercultural communication skills ↓</div>
      <Cards
        cols={3}
        items={[
          { title: '1. Study other cultures', body: 'Research, ask questions, sample media (but not only movies).', tone: 'emerald' },
          { title: '2. Study other languages', body: 'Even a few phrases show commitment.', tone: 'emerald' },
          { title: '3. Respect style preferences', body: 'Many cultures are more formal and less direct than the US.', tone: 'emerald' },
          { title: '4. Write clearly', body: 'Short words & sentences, one meaning per word, transitions, local date/number formats, no slang, idioms or humor.', tone: 'emerald' },
          { title: '5. Speak & listen carefully', body: 'Speak slowly; don\'t rephrase too soon; ask for feedback; don\'t talk down; double-check agreement. Use interpreters for important meetings.', tone: 'emerald' },
          { title: '6. Help others adapt', body: 'Offer respectful language help; ask for written input instead of a conference call.', tone: 'emerald' },
        ]}
      />
      <Box tone="amber" title="4 guidelines for ANY business culture">
        1. Become aware of your <b>own biases</b> · 2. Be careful with the <b>Golden Rule</b>: treat people the way <b>they</b> want to be treated · 3. Be accommodating and respectful · 4. Be patient and keep a sense of humor.
      </Box>
    </div>
  )
}

export function GaslightingTactics() {
  return (
    <div className="space-y-3">
      <Cards
        cols={3}
        items={[
          { title: 'Countering', body: 'Denying your version of reality. "That never happened."', tone: 'rose' },
          { title: 'Diverting', body: 'Changing the subject to avoid responsibility.', tone: 'rose' },
          { title: 'Trivialising', body: 'Brushing off your concerns and feelings. "You\'re overreacting about this."', tone: 'rose' },
          { title: 'Withholding', body: 'Refusing to have a conversation about your concerns.', tone: 'rose' },
          { title: 'Stereotyping', body: 'Using stereotypes about your identity to dismiss your concerns.', tone: 'rose' },
        ]}
      />
      <div className="grid gap-3 md:grid-cols-2">
        <Box tone="amber" title="Signs you may be gaslighted">Second-guessing yourself · feeling you must apologize a lot · struggling to decide · more anxiety · making excuses for their behavior · nothing feels good enough · isolated · low self-esteem.</Box>
        <Box tone="emerald" title="What to do">Trust your instincts · talk to a trusted person · contact a support service · make a safety plan. To help others: listen without judgment, validate, encourage them to keep a secure record.</Box>
      </div>
      <p className="text-[12.5px] text-slate-600">Origin: Patrick Hamilton's 1938 play <i>Gas Light</i>: a husband dims the gas lights and then denies it, so his wife loses trust in her own reality. It also happens <b>at work</b>, between neighbors, family, friends, even with professionals.</p>
    </div>
  )
}
