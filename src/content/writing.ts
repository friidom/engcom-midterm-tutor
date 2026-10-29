import type { LessonIn } from './author'
import { ParagraphPatterns, SentencePatterns } from '../visuals/writing'

export const writingLessons: LessonIn[] = [
  {
    id: 'sentence-patterns',
    unit: 'writing',
    title: 'Sentence patterns: the building blocks',
    priority: 'high',
    minutes: 12,
    sources: ['2.1 Sentence Patterns (slides, Purdue OWL)', '5.2 Inverted Pyramid Checklist (comma splices)', '7.3 Locker "Polishing Your Prose: Sentence Fragments"'],
    what:
      'Every sentence is built from **clauses**. An **independent clause** has a subject and a verb and can stand alone ("Snow fell"). A **dependent clause** starts with a **dependent marker** (when, because, although…) and **cannot** stand alone. Your slides show how these blocks combine into **simple, compound, complex** and **compound-complex** sentences.',
    why: [
      'Your slides call them the "building blocks of your story". Varied, correct sentences make reports and news stories readable.',
      'The two most common grammar errors, **comma splices** and **sentence fragments**, are just broken patterns. The inverted pyramid checklist and Locker both warn about them.',
      'Business readers judge writers by correctness (Locker: people who make errors can be seen as "unprofessional").',
    ],
    how: [
      '**Find the clauses:** look for subject + verb pairs. Ask: can this part stand alone? Yes → independent. Starts with when/because/although/if…? → dependent.',
      '**Join two independent clauses** in one of three ways: a **comma + coordinating conjunction** (and, but, for, or, nor, so, yet), a **semicolon**, or a **semicolon + independent marker + comma** (; therefore,).',
      '**Put a dependent clause first?** Use a comma after it: "When snow fell, it felt cold."',
      '**Never** join two independent clauses with only a comma. That is a **comma splice**: "He picked up the ball, he ran down the field."',
      '**Never** let a dependent clause stand alone. That is a **fragment**: "Although I read my e-mail." Join it to a main clause.',
    ],
    example: {
      title: 'Fixing a status update from a site engineer',
      text:
        'Draft: "The concrete was poured, it needs seven days to cure. Because the weather is cold."\n\n- Sentence 1 is a **comma splice** (two independent clauses + only a comma).\n- Sentence 2 is a **fragment** (a dependent clause alone).\n\nFixed options:\n- Pattern 2: "The concrete was poured, **but** it needs seven days to cure."\n- Pattern 4: "The concrete was poured; **however,** it needs seven days to cure."\n- Pattern 5: "**Because** the weather is cold, the concrete needs seven days to cure."',
    },
    visuals: [
      {
        title: 'The sentence patterns as formulas',
        Diagram: SentencePatterns,
        parts: [
          { label: 'Pattern 1: Simple', meaning: 'One independent clause. "Snow fell."' },
          { label: 'Patterns 2–4: Compound', meaning: 'Two independent clauses joined by ", cc", ";" or "; independent marker,".' },
          { label: 'Pattern 5: Complex', meaning: 'Dependent marker + dependent clause, then a comma, then the independent clause.' },
          { label: 'Pattern 6: Compound-complex', meaning: 'Two independent clauses + one dependent clause.' },
          { label: 'Word boxes', meaning: 'The three marker families decide the punctuation: cc → comma; independent marker → semicolon before; dependent marker → creates a dependent clause.' },
        ],
        connections: 'Compound = independent + independent (equal partners). Complex = dependent + independent (one leans on the other). Compound-complex combines both ideas. The **joining word** you choose decides the punctuation.',
        example: '"Snow fell; therefore, it felt cold." "Therefore" is an independent marker, so a semicolon comes before it and a comma after it.',
        examAngle: 'Typical tasks: name the pattern of a given sentence, choose the right punctuation for "however/therefore", fix a comma splice, or identify a fragment.',
      },
    ],
    examTips: [
      'Coordinating conjunctions = **FANBOYS**: for, and, nor, but, or, yet, so → comma before.',
      'Independent markers (therefore, moreover, thus, consequently, however, also) → **semicolon before, comma after**.',
      'Dependent markers (because, before, since, while, although, if, until, when, after, as, as if) → dependent clause; if it comes first, add a comma.',
      'Compound-complex = **two independent + at least one dependent** clause.',
    ],
    confusions: [
      '"However" is **not** a coordinating conjunction. "Snow fell, however it felt warm" is a comma splice. Use "; however,".',
      '**Compound** has two independent clauses; **complex** has a dependent one. Don\'t mix them up.',
    ],
    questions: [
      {
        kind: 'mcq',
        prompt: '"When the server crashed, the team restored the backup." Which pattern is this?',
        options: ['Simple', 'Compound (cc)', 'Complex', 'Compound-complex'],
        answer: 2,
        explain: '"When the server crashed" is a **dependent clause** (starts with the dependent marker "when"), followed by a comma and one independent clause → **complex** (Pattern 5).',
        similar: {
          kind: 'mcq',
          prompt: '"The test failed, but the code compiled." Which pattern is this?',
          options: ['Simple', 'Compound with a coordinating conjunction', 'Complex', 'Compound-complex'],
          answer: 1,
          explain: 'Two independent clauses joined by ", but" → Pattern 2 (compound with cc).',
        },
      },
      {
        kind: 'mcq',
        prompt: 'Which sentence is punctuated correctly?',
        options: [
          'The deadline moved, therefore, we need more testers.',
          'The deadline moved; therefore, we need more testers.',
          'The deadline moved therefore we need more testers.',
          'The deadline moved, therefore we need more testers.',
        ],
        answer: 1,
        explain: '"Therefore" is an **independent marker**: semicolon before it, comma after it (Pattern 4). The comma versions are comma splices.',
        similar: {
          kind: 'mcq',
          prompt: 'Choose the correct sentence.',
          options: ['Snow fell; it felt warm, though.', 'Snow fell, it felt warm.', 'Snow fell it felt warm.', 'Snow fell, and, it felt warm.'],
          answer: 0,
          explain: 'Two independent clauses can be joined by a **semicolon** (Pattern 3). Option B is a comma splice; C is a run-on.',
        },
      },
      {
        kind: 'tf',
        prompt: '"He picked up the ball, he ran down the field." is grammatically correct because both parts have a subject and verb.',
        answer: false,
        explain: 'It is a **comma splice**: two independent clauses joined only by a comma. The inverted pyramid checklist marks it incorrect. Fix: add "and", use a semicolon, or make two sentences.',
        similar: {
          kind: 'tf',
          prompt: '"Sally does not know where he is he is not here." is a run-on sentence that needs fixing.',
          answer: true,
          explain: 'Two independent clauses are jammed together with no punctuation. The checklist lists it as incorrect.',
        },
      },
      {
        kind: 'mcq',
        prompt: 'Which one is a sentence **fragment**?',
        options: ['Because she had saved her work.', 'She had saved her work.', 'Because she had saved her work, Paula restored it after the crash.', 'Paula saved her work, so she restored it.'],
        answer: 0,
        explain: '"Because" makes the clause **dependent**, so it cannot stand alone. Locker: join it to a main clause.',
        similar: {
          kind: 'mcq',
          prompt: 'How do you fix the fragment "If he upgrades his computer."?',
          options: [
            'Add an exclamation mark',
            'Join it to an independent clause: "If he upgrades his computer, he will be able to use the new software."',
            'Remove "his"',
            'Capitalize "Computer"',
          ],
          answer: 1,
          explain: 'A dependent clause must be attached to a main (independent) clause.',
        },
      },
      {
        kind: 'mcq',
        prompt: 'Which sentence is **compound-complex**?',
        options: [
          'Snow fell.',
          'Snow fell; therefore, it felt cold.',
          'When snow fell, it felt cold, but I liked it anyway.',
          'When snow fell, it felt cold.',
        ],
        answer: 2,
        explain: 'It has a dependent clause ("When snow fell") plus **two** independent clauses joined by ", but" → compound-complex (Pattern 6).',
        similar: {
          kind: 'tf',
          prompt: 'A compound-complex sentence contains two independent clauses and at least one dependent clause.',
          answer: true,
          explain: 'That is the definition on your slide.',
        },
      },
      {
        kind: 'short',
        ownWords: true,
        prompt: 'Explain the difference between a compound and a complex sentence, with one example of each about your studies.',
        keyPoints: [
          { text: 'Compound = **two independent clauses**', hints: ['two independent', 'independent clauses', 'both can stand'] },
          { text: 'Joined by **cc / semicolon / independent marker**', hints: ['and', 'but', 'so', ';', 'semicolon', 'therefore', 'however', 'conjunction'] },
          { text: 'Complex = **dependent + independent** clause', hints: ['dependent', 'cannot stand', 'subordinate'] },
          { text: 'Dependent clause starts with a **dependent marker** (because, when, although…)', hints: ['because', 'when', 'although', 'since', 'if', 'marker'] },
        ],
        model:
          'A compound sentence joins two independent clauses, each of which could stand alone, using a comma + coordinating conjunction, a semicolon, or a semicolon + independent marker: "I studied all night, but I still felt nervous." A complex sentence has one dependent clause, which starts with a dependent marker and can\'t stand alone, plus one independent clause: "Because I studied all night, I felt ready."',
        similar: {
          kind: 'mcq',
          prompt: 'Which word is a **dependent marker**?',
          options: ['moreover', 'although', 'yet', 'thus'],
          answer: 1,
          explain: '"Although" creates a dependent clause. "Moreover" and "thus" are independent markers; "yet" is a coordinating conjunction.',
        },
      },
    ],
  },
  {
    id: 'paragraph-patterns',
    unit: 'writing',
    title: 'Paragraph patterns (9 types)',
    priority: 'high',
    minutes: 10,
    sources: ['2.2 Paragraph Development (slides; Langan & Albright, Exploring Writing)'],
    what:
      'A **paragraph pattern** is the way a paragraph develops its main idea. Your slides list **nine**: exemplification, narration, description, process analysis, cause and effect, comparison and contrast, definition, classification, and argument/persuasion.',
    why: [
      'Choosing the right pattern makes your purpose obvious to the reader: explaining steps, showing causes, comparing options.',
      'Engineering and business writing use these constantly: process (procedures), cause & effect (failure analysis), comparison (choosing a supplier), classification (data security levels), argument (proposals).',
      'Exams often show a paragraph and ask you to name its pattern.',
    ],
    how: [
      'Ask: **what is this paragraph trying to do?**',
      'Gives examples of a statement? → **Exemplification**.',
      'Tells events in time order? → **Narration**. Paints a sensory picture? → **Description**.',
      'Gives steps to do or make something? → **Process analysis**.',
      'Explains why something happened or what it led to? → **Cause and effect** ("detective work").',
      'Shows similarities and differences? → **Comparison and contrast**. Explains what a term means? → **Definition**.',
      'Sorts things into groups? → **Classification**. Makes a claim and supports it with evidence? → **Argument**.',
    ],
    example: {
      title: 'Same topic, different patterns: a failed bridge bearing',
      text:
        '- **Process:** "To inspect a bearing, first clean the surface, then measure the gap with a feeler gauge, and finally record the reading."\n- **Cause & effect:** "Water leaked through the expansion joint, which rusted the bearing and finally froze it in place."\n- **Classification:** "Bridge bearings fall into three groups: fixed, sliding and elastomeric."\n- **Argument:** "The city should replace all elastomeric bearings by 2027, because inspection data show they fail twice as often."',
    },
    visuals: [
      {
        title: 'The nine paragraph patterns with your slide examples',
        Diagram: ParagraphPatterns,
        parts: [
          { label: 'Exemplification', meaning: 'Statement + specific examples (the shirt that faded, cracked a button, shrank).' },
          { label: 'Narration / Description', meaning: 'Narration = story in chronological order (the puddle jump). Description = vivid sensory detail (the shag rug).' },
          { label: 'Process / Cause & effect', meaning: 'Process = steps (cooking steak). Cause & effect = why it happened / what it caused (the cliff selfie).' },
          { label: 'Comparison & contrast / Definition', meaning: 'Similarities and differences (energy drinks vs reckless driving) / what a term means (Aristotle on death).' },
          { label: 'Classification / Argument', meaning: 'Categories (data: Top Secret, Secret, Confidential, Sensitive, Unclassified) / a claim (thesis) backed by evidence.' },
        ],
        connections: 'The patterns are tools for different **purposes**: explaining (exemplification, definition, classification), telling (narration, description), instructing (process), analyzing (cause & effect, comparison), and persuading (argument).',
        example: 'A troubleshooting guide is process analysis; an incident report that explains why a system failed is cause and effect.',
        examAngle: 'Expect "Which pattern is this paragraph?" questions with short samples, or "Name the pattern that sorts items into categories" (classification).',
      },
    ],
    examTips: [
      'Know all **nine** names and one keyword each: examples / story / senses / steps / why / similar-different / meaning / categories / claim + evidence.',
      'In academic writing, an **argument** is a main idea ("claim" or "thesis statement") backed by evidence (UNC Writing Center, on your slide).',
      'Description appeals to **sight, hearing, taste, smell, touch**.',
    ],
    confusions: [
      '**Narration vs process:** both go in order, but narration tells what **happened**; process tells how to **do** something.',
      '**Classification vs definition:** classification sorts **many things into groups**; definition explains what **one term** means.',
    ],
    questions: [
      {
        kind: 'mcq',
        prompt: '"Data classification in government commonly includes five levels: Top Secret, Secret, Confidential, Sensitive, and Unclassified." Which pattern?',
        options: ['Definition', 'Classification', 'Process', 'Exemplification'],
        answer: 1,
        explain: 'It separates many things into **categories** so they can be managed: classification.',
        similar: {
          kind: 'mcq',
          prompt: '"To begin, pat the steak dry. Season it on both sides. Then heat the pan…" Which pattern?',
          options: ['Process analysis', 'Narration', 'Description', 'Cause and effect'],
          answer: 0,
          explain: 'It explains how to **do** something in a sequence of steps.',
        },
      },
      {
        kind: 'mcq',
        prompt: '"The new shirt is poorly made: the colors faded, one button cracked, a seam opened, and the sleeves shrank two inches." Which pattern?',
        options: ['Description', 'Exemplification', 'Argument', 'Comparison and contrast'],
        answer: 1,
        explain: 'A statement ("poorly made") is explained with specific **examples**: exemplification.',
        similar: {
          kind: 'mcq',
          prompt: '"A thick, reddish-brown shag rug… the long, curled fibers seem to whisper as you walk…" Which pattern?',
          options: ['Description', 'Exemplification', 'Classification', 'Definition'],
          answer: 0,
          explain: 'Vivid words that appeal to the **senses** (sight, hearing, touch): description.',
        },
      },
      {
        kind: 'tf',
        prompt: 'A cause-and-effect paragraph is like detective work: it examines why something happened or what it led to.',
        answer: true,
        explain: 'Your slide: the writer does "detective work" by examining the causes or effects of something.',
        similar: {
          kind: 'mcq',
          prompt: 'An incident report explaining why a database outage happened and what it caused uses which pattern?',
          options: ['Classification', 'Cause and effect', 'Description', 'Definition'],
          answer: 1,
          explain: 'Explaining causes and effects is cause and effect.',
        },
      },
      {
        kind: 'mcq',
        prompt: 'Which paragraph pattern makes a challenging point and defends it with solid evidence?',
        options: ['Narration', 'Argument / persuasion', 'Definition', 'Description'],
        answer: 1,
        explain: 'Argument = a **claim / thesis** backed up with evidence.',
        similar: {
          kind: 'tf',
          prompt: 'Narration tells a story in chronological order with some details.',
          answer: true,
          explain: 'That is the slide definition of narration.',
        },
      },
      {
        kind: 'short',
        prompt: 'You must recommend one of two laptops for your engineering team. Which paragraph pattern(s) would you use, and why?',
        keyPoints: [
          { text: '**Comparison and contrast** to show similarities/differences', hints: ['compar', 'contrast', 'similar', 'differen'] },
          { text: '**Argument** to recommend one with evidence', hints: ['argument', 'persua', 'claim', 'recommend', 'evidence'] },
          { text: 'Reason linked to the **purpose** (deciding between options)', hints: ['decide', 'choose', 'purpose', 'because'] },
        ],
        model:
          'I would use comparison and contrast to show how the two laptops are similar and different (price, battery, processor), and then argument/persuasion to make a clear recommendation backed by evidence, because my purpose is to help the team decide.',
        similar: {
          kind: 'mcq',
          prompt: '"According to Aristotle, the dead are more blessed and happier than the living." This slide example illustrates which pattern?',
          options: ['Definition', 'Narration', 'Process', 'Classification'],
          answer: 0,
          explain: 'It offers an informal **definition** of what death means.',
        },
      },
    ],
  },
]
