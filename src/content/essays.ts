import type { ShortAnswer } from '../types'
import { finalizeQuestion, type QIn } from './author'

export interface EssayTopic {
  id: string
  lesson: string
  title: string
  highlightedIn: string
  covers: string[]
  question: ShortAnswer
}

type EssayIn = Omit<EssayTopic, 'question'> & { question: Omit<Extract<QIn, { kind: 'short' }>, 'kind' | 'essay'> }

const topics: EssayIn[] = [
  {
    id: 'feature-leads',
    lesson: 'feature-leads',
    title: 'Feature leads: the first 100 words',
    highlightedIn: '6.2 "Where to Begin" (Sumner & Miller), pages 1–9',
    covers: [
      'Why openings matter: if the first paragraphs don\'t hook readers, even important content goes unread',
      'The four jobs of an introduction: attract attention, introduce the topic, set the tone, establish point of view',
      'The two sample leads (seminary for prisoners; TSA agent joke): both use humor on heavy topics, third vs first person',
      'Organizing a feature is like a jigsaw puzzle; leads and endings are the hardest part',
      'Airplane comparison: articles crash at takeoff (lead) and landing (ending); know your ending before you start',
      'Feature writers, unlike breaking-news reporters, can take time to craft engaging openings',
      'McKinney\'s four ways to begin a story',
      'Six leads with their examples: anecdote (Simon Wang; locker room), scenario (Meryl Streep at 4:20), shock (Dean Ripa\'s snake bite), blind (Duff McKagan), direct/indirect quote (Janette Oke), direct address ("you")',
    ],
    question: {
      prompt:
        'Explain why the lead of a feature article is so important. Describe the four jobs of an introduction, use the airplane comparison, and compare at least three types of feature leads, giving an example of each.',
      plan: [
        '**Introduction:** a lead "hooks" readers; without it, even important content stays unread.',
        '**Body 1:** the four jobs (attention, topic, tone, point of view); mention how the two sample leads used humor and first vs third person.',
        '**Body 2:** the airplane comparison: takeoff = lead, landing = ending; identify the ending before writing ("bookends").',
        '**Body 3:** compare 3+ leads (e.g., anecdote, scenario, blind or shock), each with its definition, an example, and when it works.',
        '**Conclusion:** choose the lead by publication, topic and audience; McKinney\'s four ways to begin.',
      ],
      keyPoints: [
        { text: 'Lead must **grab and hold** interest or the article goes unread', hints: ['grab', 'hook', 'unread', 'interest', 'attention'] },
        { text: 'The **four jobs**: attract attention, introduce topic, set tone, establish point of view', hints: ['four jobs', 'tone', 'point of view', 'introduce the topic'] },
        { text: '**Airplane** comparison: crash at takeoff and landing; know the ending first', hints: ['airplane', 'takeoff', 'landing', 'crash'] },
        { text: 'At least **three lead types** defined (anecdote, scenario, shock, blind, quote, direct address)', hints: ['anecdote', 'scenario', 'shock', 'blind', 'quote', 'direct address', 'direct-address'] },
        { text: 'An **example** for each type (e.g., Simon Wang, Meryl Streep, Dean Ripa, Duff McKagan)', hints: ['simon', 'streep', 'ripa', 'mckagan', 'oke', 'locker'] },
      ],
      model:
        'The lead is the most important part of a feature article because, if the opening paragraphs do not grab readers, the content may never be read, however important it is. An effective introduction has four jobs: it attracts attention, introduces the topic, sets the tone and establishes the point of view. For example, the seminary and TSA-agent leads both used humor to lighten serious topics, one in the third person and one in the first.\n\nWriters compare features to airplanes: they are most likely to crash at takeoff and landing. The lead must hook the reader, and the ending should land smoothly, so writers should know their ending before they begin. Lead and ending act as bookends.\n\nSeveral leads work well. An anecdote lead tells a small story about real people at a specific time and place, like Simon Wang, who joined Weight Watchers in Shanghai. Anecdotes are the "chocolate chips" of feature writing. A scenario lead recreates a place with a few precise details, such as Meryl Streep ordering oysters at 4:20 at Union Station, while avoiding too much description. A blind lead withholds the subject\'s identity to build curiosity, as with Duff McKagan, who is named only in the third sentence. A shock lead uses a surprising fact, like the boy bitten while "operating" on a snake.\n\nThe best lead depends on the publication, topic and audience. McKinney sums up the options: tell a story, let someone talk, thrust readers into the action, or tell them what you will tell them.',
    },
  },
  {
    id: 'ideas-angles',
    lesson: 'ideas-angles',
    title: 'Original ideas and a tight angle',
    highlightedIn: '6.3 "How to Find an Original Idea" (Sidebar 2.2) and 6.4 "How to Give a Tighter Angle to a Broad Topic" (Sidebar 3.1)',
    covers: [
      'Questions for an original idea: no books on it yet; fundamental life issues; a strong unifying theme stated in one sentence with an action verb; intelligent insight; drama or conflict; colorful anecdotes; questioning conventional wisdom',
      'Too broad vs tighter angle: Losing Weight → a teacher who lost 100 pounds; Quitting Smoking → hypnotism; Home Security → an ex-burglar\'s advice',
      'A limited tale told clearly beats a sweeping story without depth; the more a topic is covered, the sharper the angle must be',
      'The angle tree: broad topic in a center circle + four angles',
      'Covering all angles = no depth; choose one main angle and one sidebar',
      'A focused angle has unity, action and concreteness; unity = everything hangs together around a central idea',
    ],
    question: {
      prompt:
        'How can a writer turn a broad topic into a focused, original article? Discuss the angle tree, the characteristics of a focused angle, and the questions that show an idea is original. Use one broad topic of your own as an example.',
      plan: [
        '**Introduction:** a limited tale told clearly has more impact than a sweeping story; common topics need sharper angles.',
        '**Body 1:** the angle tree: center circle + four angles; pick one main angle + one sidebar (all angles = no depth).',
        '**Body 2:** focused angle = unity, action, concreteness (define unity). Give a too-broad vs tighter example from Sidebar 3.1.',
        '**Body 3:** 3–4 originality questions (life issues, one-sentence theme with an action verb, insight, conflict, anecdotes, questioning conventional wisdom).',
        '**Conclusion:** apply it all to your own example topic.',
      ],
      keyPoints: [
        { text: 'A **limited tale told clearly** beats a sweeping story; frequent topics need sharper angles', hints: ['limited', 'sweeping', 'sharper', 'depth'] },
        { text: '**Angle tree**: broad topic in the center + four angles; choose one (+ a sidebar)', hints: ['angle tree', 'center', 'four', 'sidebar'] },
        { text: 'Focused angle = **unity, action, concreteness**', hints: ['unity', 'action', 'concrete'] },
        { text: 'Several **originality questions** (theme in one sentence, insight, conflict, anecdotes, conventional wisdom…)', hints: ['one sentence', 'action verb', 'insight', 'conflict', 'anecdote', 'conventional', 'life issues'] },
        { text: 'A worked **example** (broad → tight)', hints: ['example', 'for example', '→', 'instead'] },
      ],
      model:
        'A broad topic must be narrowed because, as the textbook says, a limited tale told clearly has more impact than a sweeping story that lacks depth, and the more a topic is covered, the sharper the angle must be.\n\nThe angle tree is a useful tool. The writer puts the broad topic in a center circle and brainstorms four possible angles around it, then chooses one as the main focus and perhaps a second as a sidebar. Trying to cover every angle leaves the article without depth. For example, "Losing Weight" becomes "Teacher Tells How She Lost 100 Pounds."\n\nA focused angle has unity, action and concreteness. Unity means everything hangs together around one central idea.\n\nTo test originality, the writer can ask whether the topic deals with fundamental life issues such as health, money or careers, whether the theme can be stated in one sentence with an action verb, whether the angle offers intelligent insight rather than the obvious, whether there is drama or conflict, whether sources can supply colorful anecdotes, and whether the theme questions conventional wisdom.\n\nFor my own example, "student stress" is too broad. A tighter angle would be "How one Inha engineering student cut her study hours in half and raised her grades," which is concrete, has action and a human story, and challenges the belief that more hours always mean better results.',
    },
  },
  {
    id: 'gaslighting',
    lesson: 'gaslighting',
    title: 'Gaslighting',
    highlightedIn: '7.10 "What Is Gaslighting? Meaning and Examples", pages 1–2',
    covers: [
      'Definition: emotional and psychological abuse; deliberately confusing or manipulating you, making you doubt yourself',
      'Effects: doubting your reality and memories; denial, twisted facts, being told you overreact; feeling confused, isolated, powerless',
      'Origin: Patrick Hamilton\'s 1938 play Gas Light (the husband dims the lights, then denies it)',
      'Five tactics: countering, diverting, trivialising, withholding, stereotyping',
      'What it sounds like: "You\'re so sensitive", "You\'re overreacting", "You can\'t trust your memory"…',
      'Signs: second-guessing yourself, dependency on the abuser, apologising a lot',
    ],
    question: {
      prompt:
        'What is gaslighting? Explain where the term comes from, describe its common tactics with examples of what gaslighting sounds like, and discuss the signs that someone is being gaslighted. How can it appear in the workplace?',
      plan: [
        '**Introduction:** define gaslighting (emotional/psychological abuse; deliberately making someone doubt their reality).',
        '**Body 1:** origin: the 1938 play Gas Light.',
        '**Body 2:** the five tactics, each with a typical phrase.',
        '**Body 3:** signs and effects: second-guessing, apologising a lot, dependency, confusion, isolation, powerlessness.',
        '**Conclusion:** a workplace example and a healthy response (trust instincts, keep records, talk to someone trusted).',
      ],
      keyPoints: [
        { text: 'Definition: **emotional/psychological abuse**, deliberately making you **doubt yourself**', hints: ['abuse', 'doubt', 'manipulat', 'confus'] },
        { text: 'Origin: **1938 play Gas Light** (dimming lights, then denying it)', hints: ['1938', 'gas light', 'play', 'hamilton'] },
        { text: 'Tactics: **countering, diverting, trivialising, withholding, stereotyping**', hints: ['counter', 'divert', 'trivial', 'withhold', 'stereotyp'] },
        { text: '**Example phrases** ("You\'re overreacting", "You can\'t trust your memory")', hints: ['overreact', 'sensitive', 'memory', 'crazy', 'exaggerat'] },
        { text: '**Signs**: second-guessing, apologising, dependency; it can happen **at work**', hints: ['second', 'apolog', 'depend', 'work', 'colleague'] },
      ],
      model:
        'Gaslighting is a form of emotional and psychological abuse in which someone deliberately tries to confuse or manipulate another person and make them doubt their own memories, feelings and sense of reality. It often involves denial, twisting facts and telling the victim they are overreacting, which leaves them confused, isolated and powerless.\n\nThe term comes from Patrick Hamilton\'s 1938 play Gas Light, in which a husband slowly dims the gas lights in the house and then denies the change, so his wife stops trusting her own perception.\n\nGaslighters use five common tactics. Countering denies the victim\'s version of events ("That never happened"). Diverting changes the subject to avoid responsibility. Trivialising brushes off concerns ("You\'re so sensitive"). Withholding refuses to discuss the problem. Stereotyping uses the person\'s identity to dismiss them. Typical phrases include "You\'re overreacting" and "You can\'t trust your memory."\n\nThe signs include constantly second-guessing your thoughts and emotions, feeling you must apologise a lot, and becoming dependent on the abuser as the "source of truth."\n\nAt work, a manager might take credit for an employee\'s report and then insist, "You\'re imagining it." A healthy response is to trust your instincts, keep written records and talk to a trusted person or support service.',
    },
  },
  {
    id: 'bribery',
    lesson: 'ethics',
    title: 'Bribes, kickbacks, facilitating payments & money laundering',
    highlightedIn: '7.2 Sample: Apple Business Conduct Policy, pages 17–18 ("Bribery and Corruption", "Money Laundering")',
    covers: [
      'Kickbacks: a type of bribery; money or something of value offered in exchange for giving information, a discount or a favor to a third party; strictly prohibited',
      'Bribe: offering or giving anything of value (cash, gift cards, gifts, meals, travel, entertainment) to obtain or retain business or secure an improper advantage; prohibited with public officials AND private parties',
      'Facilitating payments: a type of bribe used to speed up routine, non-discretionary government action',
      'Money laundering: trying to conceal illicit funds or make them look legitimate',
    ],
    question: {
      prompt:
        'Using Apple\'s Business Conduct Policy, define a bribe, a kickback, a facilitating payment and money laundering. Explain why companies prohibit them and how they connect to ethical communication and a company code of ethics.',
      plan: [
        '**Introduction:** a code of ethics (like Apple\'s Business Conduct Policy) sets clear expectations; honesty, respect, confidentiality, compliance.',
        '**Body 1:** define a bribe (anything of value, cash to meals and travel, to obtain/retain business or an improper advantage; public or private).',
        '**Body 2:** kickbacks and facilitating payments as types of bribery, with an example of each.',
        '**Body 3:** money laundering (hiding illicit funds or making them look legitimate).',
        '**Conclusion:** why they\'re banned (ethics lapse, legal risk, trust); link to ethical communication (transparency, not withholding or distorting).',
      ],
      keyPoints: [
        { text: '**Bribe** = anything of value (cash, gifts, meals, travel) to obtain/retain business or an improper advantage', hints: ['bribe', 'anything of value', 'improper advantage', 'retain business'] },
        { text: '**Kickback** = a bribe in exchange for information, a discount or a favor to a third party', hints: ['kickback', 'third party', 'discount', 'favor'] },
        { text: '**Facilitating payment** = a bribe to speed up routine government action', hints: ['facilitat', 'routine', 'government', 'expedite', 'speed'] },
        { text: '**Money laundering** = concealing illicit funds or making them look legitimate', hints: ['launder', 'illicit', 'legitimate', 'conceal'] },
        { text: 'Why banned: **ethics, law, trust**; part of a **code of ethics**', hints: ['ethic', 'code', 'law', 'illegal', 'trust', 'compliance', 'honest'] },
      ],
      model:
        'A company code of ethics, such as Apple\'s Business Conduct Policy, tells employees what is acceptable. It is built on honesty, respect, confidentiality and compliance with the law.\n\nThe policy defines a bribe as offering or giving anything of value, including cash, gift cards, gifts, meals, travel or entertainment, to any person to obtain or keep business or to gain an improper advantage. Bribes are forbidden whether the other person is a public official or a private party.\n\nTwo special forms of bribery are also banned. A kickback happens when someone is offered money or something valuable in exchange for giving information, a discount or a favor to a third party. For example, a purchasing manager might accept cash to choose a certain supplier. A facilitating payment is a bribe used to speed up routine, non-discretionary government action, like paying an official to process a permit faster.\n\nMoney laundering is a different crime: individuals or organizations try to hide illegal money or make it look legitimate.\n\nCompanies prohibit these practices because they are clear ethical lapses, not dilemmas, and they are often illegal. They also destroy trust with customers, regulators and the public. They connect to ethical communication, which must be honest and transparent, giving people complete information instead of hiding or distorting the truth.',
    },
  },
  {
    id: 'conflict',
    lesson: 'teams',
    title: 'Resolving team conflict',
    highlightedIn: '7.5 Bovée & Thill Ch. 2, page 6 ("Steps to Resolve Team Conflict")',
    covers: [
      'The four strategies: avoid, accommodate, compromise, collaborate',
      'Whichever approach you take: practice and encourage respectful, calm communication; choose words and nonverbal gestures carefully, keep focus on the problem, avoid inflaming the situation',
    ],
    question: {
      prompt:
        'Describe the four strategies for resolving conflict in a team and explain when each might be appropriate. Why does your textbook stress respectful, calm communication whichever strategy you choose? Use a workplace example.',
      plan: [
        '**Introduction:** conflict is normal in teams and can be constructive or destructive; the five steps lead to choosing a strategy.',
        '**Body 1:** avoidance and accommodation: what they are and when they fit.',
        '**Body 2:** compromise and collaboration (win-win): what they are and when they fit.',
        '**Body 3:** respectful, calm communication: careful words and nonverbal gestures, focus on the problem, don\'t inflame; active listening.',
        '**Conclusion:** a workplace example that uses one strategy well.',
      ],
      keyPoints: [
        { text: '**Avoidance**: avoid the circumstances; efficient but doesn\'t fix the cause', hints: ['avoid'] },
        { text: '**Accommodation**: one side gives way for the organization/harmony', hints: ['accommodat'] },
        { text: '**Compromise**: both give up something', hints: ['compromis'] },
        { text: '**Collaboration**: a new win-win solution', hints: ['collaborat', 'win-win', 'win win'] },
        { text: '**Respectful, calm communication**: words + nonverbal gestures chosen carefully, focus on the problem', hints: ['respect', 'calm', 'nonverbal', 'gesture', 'inflam', 'focus on the problem'] },
      ],
      model:
        'Conflict is normal in teams. It can be constructive when it brings issues into the open, or destructive when it damages morale. After deciding the conflict is worth addressing, examining their own behavior, finding its real origin and establishing common ground, team members choose one of four strategies.\n\nAvoidance means avoiding the circumstances that create the conflict, for example not assigning two people who clash to the same task. It is efficient but doesn\'t fix the cause. Accommodation means one side gives way for the good of the organization or to keep harmony, which is useful when the issue matters more to the other person.\n\nCompromise means both sides give up something, a balanced approach common in successful teams. Collaboration means both sides work together on a new solution that satisfies everyone, a win-win. It takes the most effort but gives the best result.\n\nWhichever strategy is chosen, the textbook stresses respectful, calm communication. People should choose their words and nonverbal gestures carefully, keep the focus on the problem rather than on personalities, and avoid inflaming an already uncomfortable situation. Active listening helps each side understand the other.\n\nFor example, if a developer and a tester disagree about a release date, they might collaborate by agreeing to release the core features on time and the remaining features a week later, discussing it calmly in a short meeting rather than in angry emails.',
    },
  },
  {
    id: 'nonverbal',
    lesson: 'nonverbal-etiquette',
    title: 'Nonverbal communication and professional appearance',
    highlightedIn: '7.5 Bovée & Thill Ch. 2, pages 24 and 28 (nonverbal signals; business formal and business professional)',
    covers: [
      'Nonverbal signals are not limited to facial expressions, gestures and other personal behaviors',
      'The claim that words carry only 7% of meaning and nonverbal 93% (tone 38%, body language 55%), which the textbook says to ignore',
      'Business formal: tailored suits in conservative colors; business professional: still suits or coordinated jackets with skirts/trousers, slightly freer',
    ],
    question: {
      prompt:
        'Explain the importance of nonverbal communication in business. Discuss the "7% words, 93% nonverbal" claim and why your textbook rejects it, and explain how personal appearance (for example business formal vs business professional dress) sends nonverbal messages.',
      plan: [
        '**Introduction:** define nonverbal communication; it can strengthen, weaken or replace words.',
        '**Body 1:** the six categories: face, voice, gesture/posture, appearance, touch, time & space; signals go beyond personal behavior.',
        '**Body 2:** the 7% / 38% / 55% claim: what it says, why it is unconfirmed, and why the textbook says to ignore it.',
        '**Body 3:** appearance: the four dress levels, focusing on business formal vs business professional; dressing as a sign of respect for the culture.',
        '**Conclusion:** advice: match signals to your words, don\'t "read people like a book".',
      ],
      keyPoints: [
        { text: 'Definition + roles: **strengthen, weaken, replace** words', hints: ['strengthen', 'weaken', 'replace', 'without language', 'without words'] },
        { text: 'Signals go beyond the face/gestures (voice, appearance, touch, **time and space**)', hints: ['voice', 'appearance', 'touch', 'time', 'space', 'posture'] },
        { text: 'The **7% / 38% / 55%** claim and why it is **unconfirmed / ignored**', hints: ['7', '93', '38', '55', 'ignore', 'not confirmed', 'myth'] },
        { text: '**Business formal** (tailored conservative suits) vs **business professional** (suits/coordinated jackets, freer)', hints: ['business formal', 'business professional', 'tailored', 'conservative'] },
        { text: 'Appearance shows **respect for organizational culture**', hints: ['respect', 'culture', 'impression', 'judged'] },
      ],
      model:
        'Nonverbal communication is sending and receiving information, intentionally or not, without using language. It matters in business because nonverbal signals can strengthen a verbal message, weaken or contradict it, or replace words entirely. These signals are not limited to facial expressions and gestures. They also include vocal characteristics, posture, personal appearance, touch, and the use of time and space.\n\nA popular claim says words carry only 7 percent of meaning, with tone of voice carrying 38 percent and body language 55 percent. The textbook rejects this. The experiments behind the numbers were done more than 50 years ago, only measured feelings, and have never been confirmed, so the percentages are not a rule for communication.\n\nPersonal appearance is a strong nonverbal message. Business formal means tailored suits in conservative colors, used for the most formal occasions and top executives. Business professional is still based on suits or coordinated jackets with skirts or trousers, but it is slightly freer. Business casual and casual are more relaxed. Choosing the right level shows respect for an organizational culture that is bigger than you.\n\nProfessionals should make sure their nonverbal signals match their words, for example an open posture when asking for cooperation. They should also avoid assuming they can "read someone like a book."',
    },
  },
  {
    id: 'context-cultures',
    lesson: 'intercultural',
    title: 'High-context vs low-context cultures',
    highlightedIn: '7.8.1 Bovée & Thill Ch. 3, page 5 ("Contextual Differences")',
    covers: [
      'High-context: rely less on verbal communication and more on nonverbal actions and the setting; communication builds relationships as much as it exchanges information; e.g., China, Japan, many Arab nations',
      'Low-context: rely more on verbal communication, less on circumstances and cues; rules and expectations spelled out explicitly; emphasizes exchanging information over relationships; e.g., US, Germany, Switzerland',
    ],
    question: {
      prompt:
        'Compare high-context and low-context cultures. Explain how each conveys meaning, give country examples, and describe how a business communicator should adapt when working with each.',
      plan: [
        '**Introduction:** cultural context = physical cues, environment and implicit understanding that carry meaning.',
        '**Body 1:** high-context: nonverbal actions and setting; relationships; examples China, Japan, many Arab nations.',
        '**Body 2:** low-context: explicit words, rules spelled out; information exchange; examples US, Germany, Switzerland.',
        '**Body 3:** effects on business: decisions (results vs method), time, contracts, negotiation.',
        '**Conclusion:** how to adapt to each, and a reminder that these are generalizations.',
      ],
      keyPoints: [
        { text: '**High-context**: meaning from nonverbal actions and setting; relationships', hints: ['nonverbal', 'setting', 'relationship', 'implicit'] },
        { text: 'High-context **examples**: China, Japan, many Arab nations', hints: ['china', 'japan', 'arab'] },
        { text: '**Low-context**: explicit verbal communication; rules spelled out; information exchange', hints: ['explicit', 'verbal', 'spelled out', 'information'] },
        { text: 'Low-context **examples**: US, Germany, Switzerland', hints: ['united states', 'us', 'germany', 'switzerland'] },
        { text: 'How to **adapt** (relationship-building vs direct, written detail) + they are **generalizations**', hints: ['adapt', 'relationship', 'direct', 'generaliz', 'patient'] },
      ],
      model:
        'Every message is sent within a cultural context: the pattern of physical cues, environmental stimuli and implicit understanding that carries meaning between people of the same culture. Cultures differ in how much they rely on that context.\n\nIn a high-context culture, people rely less on words and more on nonverbal actions and the setting to convey meaning. Communication is as much about building relationships as exchanging information. China, Japan and many Arab nations are often described as high-context.\n\nIn a low-context culture, such as the United States, Germany or Switzerland, people rely more on explicit verbal communication. Rules and expectations are spelled out clearly, and communication focuses on exchanging information more than on relationships.\n\nThese differences affect business. Low-context businesspeople tend to focus on the results of a decision and see a signed contract as the end of negotiation. High-context businesspeople may care more about how the decision is made and may spend much of a negotiation building trust.\n\nTo adapt, a communicator working with a high-context partner should invest time in the relationship, pay attention to nonverbal cues and avoid being too blunt. With a low-context partner, they should be direct, explicit and well organized, and put key details in writing. These are generalizations, so each person should still be treated as an individual.',
    },
  },
]

export const essayTopics: EssayTopic[] = topics.map((t) => ({
  ...t,
  question: finalizeQuestion({ kind: 'short', essay: true, ...t.question } as QIn, `essay-${t.id}`) as ShortAnswer,
}))

export const essayLessons = new Set(essayTopics.map((t) => t.lesson))
