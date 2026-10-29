import type { QIn } from './author'

type Fill = Extract<QIn, { kind: 'fill' }>

const f = (prompt: string, blanks: string[][], explain: string, similar?: Fill): Fill => ({ kind: 'fill', prompt, blanks, explain, similar })

// Extra fill-in-the-blank practice, appended after each lesson's other questions. The midterm's
// fill-in part is mostly Week 7, so Week 7 lessons get the most.
export const lessonFills: Record<string, Fill[]> = {
  plagiarism: [f('Plagiarism is using someone else\'s ideas or ___ without acknowledging that you did not create them.', [['language', 'words']], 'Slide definition: ideas **or language**, from any source.')],
  'spq-rules': [
    f('In APA style, quotes of 40 words or more go in a ___ quote, without quotation marks.', [['block']], '39 words or fewer → quotation marks; 40+ → block quote.', f('If a source has no author, use its ___ in place of the author\'s name.', [['title']], 'No author → title; no date → (n.d.).')),
  ],
  'paraphrase-method': [f('Harvard\'s four Rs are reword, rephrase, ___ and recheck.', [['restructure']], 'Reword, Rephrase, **Restructure**, Recheck.')],
  defamation: [f('Spoken defamation is called ___; published (written) defamation is called ___.', [['slander'], ['libel']], 'S = spoken (slander); L = published/written (libel).')],
  'news-values': [f('Editors decide what news is with three words: relevance, ___ and interest.', [['usefulness', 'useful']], 'Relevance, **usefulness**, interest.')],
  'feature-leads': [
    f(
      'A feature introduction has four jobs: attract attention, introduce the topic, set the ___ and establish the point of ___.',
      [['tone'], ['view']],
      'Highlighted in 6.2: attract attention, introduce the topic, set the tone, establish the point of view.',
      f('Anecdotes are often called the "___ chips of feature writing."', [['chocolate']], 'Highlighted in 6.2: anecdotes are the chocolate chips of feature writing.'),
    ),
    f(
      'Feature articles, like airplanes, are most vulnerable to crash during ___ and ___.',
      [['takeoff', 'take off', 'take-off'], ['landing']],
      'The lead is the takeoff; the ending is the landing.',
      f('A ___ lead raises curiosity by not immediately identifying the person by name.', [['blind']], 'The blind lead keeps the subject\'s identity a mystery until later.'),
    ),
  ],
  'ideas-angles': [
    f('A focused angle has unity, ___ and concreteness.', [['action']], 'Unity, action, concreteness. Unity means everything hangs together around a central idea.', f('Writing a broad topic in a center circle and brainstorming four directions is the angle ___ exercise.', [['tree']], 'The angle tree.')),
  ],
  'comm-basics': [
    f('Communication is the process of transferring information, ___ and ___ between senders and receivers.', [['meaning'], ['understanding']], 'Information, meaning and understanding.', f('Persons or organizations significantly affected by a company\'s decisions are called ___.', [['stakeholders', 'stakeholder']], 'Stakeholders: employees, customers, investors, suppliers, communities.')),
    f('Communication is important to a company in three areas: operations, ___ and ___.', [['intelligence', 'relationships'], ['relationships', 'intelligence']], 'Operations, intelligence, relationships.', f('When the receiver builds a different meaning than the sender intended, the meaning is ___.', [['re-created', 'recreated', 're created']], 'Figure 1.1: transmitted, negotiated, **re-created** meaning.')),
  ],
  'comm-process': [
    f('Putting an idea into a message is called ___; extracting the idea from a message is called ___.', [['encoding', 'encode'], ['decoding', 'decode']], 'Sender encodes; receiver decodes.', f('The form of a message (oral, written, visual) is the ___; the system that delivers it (email, Twitter) is the ___.', [['medium'], ['channel']], 'Medium = form; channel = delivery system.')),
    f('The four communication barriers are noise and distractions, competing messages, ___ and channel ___.', [['filters', 'filter'], ['breakdowns', 'breakdown']], 'Noise & distractions, competing messages, filters, channel breakdowns.', f('Receiving more information than you can effectively process is called information ___.', [['overload']], 'Information overload.')),
    f('To receive a message, audience members must sense it, ___ it and ___ it as a message.', [['select'], ['perceive']], 'Sense → select → perceive.'),
  ],
  'social-tech': [f('The social communication model is interactive, ___ and open to all who wish to participate.', [['conversational']], 'Interactive, conversational, open.', f('Tools that can waste as much time as they save illustrate the information technology ___.', [['paradox']], 'The information technology paradox.'))],
  professionalism: [
    f('Professionalism is performing at a high level and conducting oneself with purpose and ___.', [['pride']], 'Purpose and pride.', f('Reading other people\'s emotions accurately and managing your own is called emotional ___.', [['intelligence']], 'Emotional intelligence.')),
    f('Communication that crosses departments while moving up or down the hierarchy is ___ communication.', [['diagonal']], 'Diagonal = across departments AND up/down.', f('Communication between departments at the same level is horizontal or ___ communication.', [['lateral']], 'Horizontal = lateral.')),
  ],
  ethics: [
    f('An ethical ___ is a choice between alternatives that aren\'t clear-cut; an ethical ___ is a clearly unethical choice.', [['dilemma'], ['lapse']], 'Dilemma = gray area; lapse = clearly wrong.', f('Advertising designed to look like a regular news story is called ___ advertising.', [['native']], 'Native advertising (sponsored content) must be labeled.')),
    f('When someone is offered money or something of value in exchange for providing information, a discount or a favor to a third party, it is a ___.', [['kickback', 'kickbacks']], 'Highlighted in Apple\'s policy: kickbacks are a type of bribery and are strictly prohibited.', f('Trying to conceal illicit funds or make them look legitimate is called money ___.', [['laundering']], 'Highlighted in Apple\'s policy: money laundering.')),
    f('A ___ is offering or giving anything of value to any person to obtain or retain business or to secure an improper advantage.', [['bribe', 'bribery']], 'Highlighted in Apple\'s policy. Gifts, meals, travel and gift cards all count.', f('Payments used to speed up routine, non-discretionary government action are called ___ payments.', [['facilitating', 'facilitation']], 'Highlighted in Apple\'s policy: facilitating payments are a type of bribe.')),
  ],
  'business-writing': [
    f('In PAIBOC: P = purposes, A = audience, I = information, B = ___, O = ___, C = context.', [['benefits', 'benefit', 'reader benefits'], ['objections', 'objection']], 'Purposes, Audience, Information, **Benefits**, **Objections**, Context.', f('The three purposes of business messages are to inform, to request or persuade, and to build ___.', [['goodwill', 'good will']], 'Inform, request/persuade, build goodwill.')),
    f('Good business writing is clear, complete, ___, saves the reader\'s time and builds goodwill.', [['correct']], 'Locker\'s five criteria.', f('Mintzberg: managers collect and convey information, make decisions, and promote interpersonal ___.', [['unity']], 'Interpersonal unity: making people want to work together.')),
  ],
  audience: [
    f('The audience that can stop your message before it reaches the primary audience is the ___.', [['gatekeeper']], 'Gatekeeper.', f('The audience that decides whether to accept your recommendation is the ___ audience.', [['primary']], 'Primary audience decides/acts.')),
    f('A group sharing assumptions about channels, formats, styles, topics and evidence is a ___ community.', [['discourse']], 'Discourse community.', f('Values, beliefs, goals and lifestyles are ___ characteristics.', [['psychographic']], 'Psychographic = qualitative; demographic = measurable.')),
  ],
  teams: [
    f('Tuckman\'s stages are forming, ___, norming, ___ and adjourning.', [['storming'], ['performing']], 'Forming, storming, norming, performing, adjourning.', f('When peer pressure makes members withhold contrary opinions, it is called ___.', [['groupthink', 'group think']], 'Groupthink.')),
    f('The four strategies for resolving conflict are avoid, ___, compromise and ___.', [['accommodate', 'accommodation'], ['collaborate', 'collaboration']], 'Highlighted in 7.5: avoid, accommodate, compromise, collaborate, plus respectful, calm communication.', f('A team whose members work in at least two locations and rely on technology is a ___ team.', [['virtual']], 'Virtual team.')),
  ],
  'collab-feedback': [f('Feedback that focuses on the process and outcomes of communication, not on the people, is ___ feedback.', [['constructive']], 'Constructive vs destructive feedback.', f('A website that lets anyone with access add and edit material is a ___.', [['wiki']], 'Wiki.'))],
  meetings: [
    f('A written summary of the important information presented and the decisions made in a meeting is called the ___.', [['minutes', 'meeting minutes']], 'Minutes.', f('The best-known guide to parliamentary procedure is Robert\'s Rules of ___.', [['order']], 'Robert\'s Rules of Order.')),
    f('The seating arrangement best for large audiences, but that limits interaction, is the ___ style.', [['theater', 'theatre', 'auditorium']], 'Theater/auditorium style.', f('For mid-sized meetings where the presenter can walk among attendees, use a ___ arrangement.', [['u-shape', 'u shape', 'u-shaped', 'u']], 'U-shape.')),
  ],
  listening: [
    f('The three listening styles are content, ___ and ___ listening.', [['critical', 'empathic', 'empathetic'], ['empathic', 'empathetic', 'critical']], 'Content, critical, empathic.', f('Protecting your ego by tuning out anything that doesn\'t confirm your beliefs is ___ listening.', [['defensive']], 'Defensive listening, an internal barrier.')),
    f('Listening is hard because it happens in real time, speech is ___, and incoming sounds must be converted to ___.', [['invisible'], ['language', 'words']], 'The three unique challenges of listening.'),
  ],
  'nonverbal-etiquette': [
    f('Nonverbal signals can strengthen, ___ or ___ a verbal message.', [['weaken', 'contradict', 'replace'], ['replace', 'weaken', 'contradict']], 'Strengthen, weaken (contradict), replace.', f('A popular claim says words carry only ___ percent of meaning; your textbook says to ignore it.', [['7', 'seven']], 'Highlighted in 7.5: the 7% / 38% (voice) / 55% (body language) claim is unconfirmed.')),
    f('Tailored suits in conservative colors describe business ___ dress.', [['formal']], 'Highlighted in 7.5: business formal. Business professional is still suit-based but slightly freer.', f('Slacks or skirts with button-up shirts, blouses and sweaters describe business ___.', [['casual']], 'Business casual.')),
  ],
  intercultural: [
    f('In a ___-context culture people rely more on nonverbal actions and setting; in a ___-context culture they rely more on explicit verbal communication.', [['high'], ['low']], 'Highlighted in 7.8.1.', f('Judging other groups by the standards of your own group is called ___.', [['ethnocentrism']], 'Ethnocentrism.')),
    f('High-context examples: China, ___ and many Arab nations. Low-context examples: the United States, Germany and ___.', [['japan'], ['switzerland']], 'Highlighted in 7.8.1.', f('Assigning generalized attributes to an individual based on group membership is ___.', [['stereotyping', 'stereotype']], 'Stereotyping.')),
  ],
  gaslighting: [
    f('The term gaslighting comes from Patrick Hamilton\'s ___ play Gas Light.', [['1938']], 'Highlighted in 7.10.', f('Denying your version of reality is the gaslighting tactic called ___.', [['countering']], 'Countering.')),
    f('Brushing off your concerns and feelings is ___; refusing to have a conversation about your concerns is ___.', [['trivialising', 'trivializing'], ['withholding']], 'Highlighted in 7.10: countering, diverting, trivialising, withholding, stereotyping.', f('Changing the subject to avoid responsibility is called ___.', [['diverting']], 'Diverting.')),
  ],
}

export interface MockFill {
  lesson: string
  week7: boolean
  question: Fill
}

const m = (lesson: string, week7: boolean, prompt: string, blanks: string[][], explain: string): MockFill => ({ lesson, week7, question: f(prompt, blanks, explain) })

export const mockFillBank: MockFill[] = [
  m('comm-process', true, 'Information from receivers back to the sender about a message is called ___.', [['feedback']], 'Step 8 of the communication process.'),
  m('comm-process', true, 'When a channel cannot handle all the messages being sent, it is channel ___.', [['overload']], 'Locker: channel overload vs information overload.'),
  m('comm-process', true, 'Static on a phone line and disliking the speaker are both examples of ___.', [['noise']], 'Physical and psychological noise.'),
  m('comm-basics', true, 'For communication to be successful, it must transfer or ___ understanding.', [['negotiate']], 'Transfer or negotiate understanding.'),
  m('professionalism', true, 'The ___ communication network includes all communication outside formal channels, such as the grapevine.', [['informal']], 'Informal network.'),
  m('professionalism', true, 'Evaluating evidence completely and objectively to form logical conclusions is ___ thinking.', [['critical']], 'Critical thinking.'),
  m('ethics', true, 'Openness that gives everyone the information they need to process messages accurately is called ___.', [['transparency']], 'Transparency.'),
  m('ethics', true, 'Promoting products without making clear that marketing is taking place is ___ marketing.', [['stealth']], 'Stealth marketing.'),
  m('ethics', true, 'Apple\'s policy says you cannot offer or receive ___ from any individual, whether a public official or a private party.', [['bribes', 'bribe']], 'Highlighted in 7.2.'),
  m('business-writing', true, 'Locker: one page of business correspondence costs about $___ in employee time.', [['21.15', '21 15']], '54 minutes × $23.50/hour.'),
  m('business-writing', true, 'Internal audiences are superiors, peers and ___.', [['subordinates', 'subordinate']], 'Figure 1.1, Locker.'),
  m('audience', true, 'The audience with political, social or economic power that watches the transaction is the ___ audience.', [['watchdog']], 'Watchdog.'),
  m('audience', true, 'Age, income and education are ___ characteristics.', [['demographic']], 'Demographic = measurable.'),
  m('audience', true, 'An organization\'s values, attitudes and philosophies are its organizational ___.', [['culture']], 'Organizational (corporate) culture.'),
  m('teams', true, 'A team that combines people from multiple departments is a ___ team.', [['cross-functional', 'cross functional']], 'Cross-functional team.'),
  m('teams', true, 'Private, counterproductive motives of a team member are called a hidden ___.', [['agenda']], 'Hidden agenda.'),
  m('meetings', true, 'The first step in preparing for a meeting is to make sure it is truly ___.', [['necessary']], 'Make sure the meeting is necessary.'),
  m('listening', true, 'Consciously turning off filters and biases to truly hear and understand someone is ___ listening.', [['active']], 'Active listening.'),
  m('nonverbal-etiquette', true, 'The five zones of etiquette are the workplace, social settings, online, the ___ and mobile devices.', [['telephone', 'phone']], 'Figure 2.11.'),
  m('intercultural', true, 'Accepting multiple cultures on their own terms is cultural ___.', [['pluralism']], 'Cultural pluralism.'),
  m('intercultural', true, 'Sayings that mean more than the sum of their literal parts, like "hit one out of the park", are ___ phrases.', [['idiomatic', 'idiom', 'idioms']], 'Idiomatic phrases don\'t travel well across languages.'),
  m('gaslighting', true, 'Using stereotypes based on your identity to dismiss your concerns is the gaslighting tactic called ___.', [['stereotyping']], 'Highlighted in 7.10.'),
  m('collab-feedback', true, 'Intranets are open to employees only; ___ also admit selected outside parties by invitation.', [['extranets', 'extranet']], 'Extranets.'),
  m('plagiarism', false, 'Lester advises that only about ___% of a final paper should be directly quoted material.', [['10', 'ten']], 'About 10%.'),
  m('spq-rules', false, 'If a source has no publication date, write ___ in place of the year.', [['n.d.', 'nd', 'n d']], '(n.d.) = no date.'),
  m('libel-defenses', false, 'Actual malice is knowing a statement is false or showing ___ disregard for the truth.', [['reckless']], 'Supreme Court definition.'),
  m('privacy-copyright', false, 'Copyright normally lasts for the life of the author plus ___ years.', [['70', 'seventy']], 'Life + 70.'),
  m('lead-types', false, 'When the "who" is described rather than named in the lead, it is ___ identification.', [['delayed']], 'Delayed identification.'),
]
