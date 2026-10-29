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
- **Essay prep**: the 7 essay topics built from the passages highlighted in the lecture PDFs, each with a plan, key points and a model essay.
- **Quick revision**: lists to memorize, key differences, searchable definitions, visual cheat sheets, key examples.
- **Mock midterm** in the real format: Part 1 multiple choice, Part 2 fill in the blanks (80% Week 7), Part 3 one essay. Score by part and topic, weak topics, targeted practice.
- Progress is saved in your browser (localStorage). Use "Reset my progress" on the home page to start over.

Lesson content lives in `src/content/`, diagrams in `src/visuals/`.
