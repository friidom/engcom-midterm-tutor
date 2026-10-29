# EngCom Midterm Tutor

An interactive one-night study course for the Engineering Communication midterm (Inha University in Tashkent), built from the Week 1–7 course materials.

**Live site:** https://friidom.github.io/engcom-midterm-tutor/

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:5173 and click **Start lesson 1**.

## How it is organized

- **28 lessons** in 6 units (Sources → Sentences & paragraphs → Media law → News writing → Business communication → Working with people).
- Every lesson: Learn → Example → Visual (recreated diagrams from the slides/textbooks) → Exam tip → Practice.
- A wrong answer shows an explanation and one similar question before you can move on.
- **One-Night order** (sidebar) sorts lessons High → Medium → Low priority; **By week** follows the course order.
- **Quick revision**: lists to memorize, key differences, searchable definitions, visual cheat sheets, key examples.
- **Mock midterm**: quick (25) or full (52) questions, score by topic, weak topics, targeted practice.
- Progress is saved in your browser (localStorage). Use "Reset my progress" on the home page to start over.

Lesson content lives in `src/content/`, diagrams in `src/visuals/`.
