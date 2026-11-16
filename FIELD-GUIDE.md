# Field guide

The one page to reread when you're unsure what to write down or why.

## The mental model

The exam asks "which one, and why", inside a business scenario. So the notes are
decisions, not descriptions. For every topic, the loop is the same:

1. **Baseline:** can I say what it is in two sentences, and what it resembles?
2. **Isolate:** when is it the answer, and what is the answer when it isn't?
3. **Execute:** have I touched it?

A card is a place to store those three answers. Nothing else belongs in it.

## What to capture from a lecture

Don't write in cards while watching. Drop one-line signals into `inbox.md`, then spend
ten minutes afterwards moving the ones that still matter into cards, from memory.

Listen for five signals:

| Signal | Sounds like | Goes to |
|---|---|---|
| A new name | A service or concept you can't explain | Baseline, if it passes the new-card test below |
| A choice | "X versus Y", "prefer", "instead of", "unless" | Isolate bullet on both cards |
| An exam tip | The trainer says so | Isolate bullet, marked "tip" |
| A boundary | Zonal, regional or global; a limit; an RTO or RPO | `lives_at`, or an Isolate bullet |
| A surprise | It contradicted what you assumed | Isolate bullet. These are worth the most |

Skip: product history, feature lists, console click paths, pricing detail, and anything
you could already explain to a colleague.

## After a lab

- Execute gets the command or screenshot, plus one line on what it did.
- Look at the options you didn't pick in the console. If one would matter in a
  scenario, that's an Isolate bullet.

## After a quiz

- Every miss becomes a Missed line on the card it belongs to: what you chose, and the
  reasoning that led you there.
- Tick it only when you can explain the right answer without looking.
- Log the score in `quizzes.md`.

## After a case-study session

Write one section of that boss. One, not all five.

## When to make a new card

Make one only when something real triggers it:

- it came up in a lecture or lab
- it's named in a case study
- it's in a question you missed
- it's on the trainer's sheet at medium depth or above

Don't make one when it's a feature of something that already has a card. Cloud Run
jobs is a bullet on the Cloud Run card. Concepts can be cards too (SLOs, disaster
recovery) when questions are asked about them directly.

## Where a card goes

| District | Put it here when it mainly... |
|---|---|
| core | organizes or governs everything else: hierarchy, identity, billing, regions |
| compute | runs your code |
| network | connects things or controls traffic |
| data | stores, moves or analyzes data |
| security | protects data or access, beyond plain IAM |
| ops | tells you what's happening, or keeps things reliable |
| delivery | builds, ships or integrates software |
| migrate | moves existing systems into the cloud |
| ai | is a model or an agent |

If it fits two, choose where you'd look for it first. The district is only for finding
things; renaming the file later is fine.

## What "done" looks like

Depth decides how far to take a card. The city reaching 100% is not the goal.

| Depth needed | Stop when |
|---|---|
| 1, basics | Baseline is written |
| 2, medium | Baseline and Isolate are written |
| 3 or 4 | All three are written and nothing under Missed is open |

## The weekly rhythm

1. Tuesday: live session. Signals go to the inbox.
2. During the week: the course that teaches the badge's topic, then the badge, then the
   rest. If time runs short, the badge is the one thing not to drop.
3. After each sitting: ten minutes, inbox to cards, at most three cards.
4. Once a week: build, look at the city, clear one breach.

## Things that make it worse

- Transcribing a lecture.
- Pasting slide text or AI text as your Baseline. A comparison slide as an image in
  Isolate is fine; your Baseline has to be your words.
- Making cards "just in case".
- Filling a section to light a window.
- Building a codex feature before the week's badge is done.

## Using AI

Fine: asking whether something needs a card and where it goes, having a card you wrote
checked against the docs, getting a missed answer explained, asking what to listen for
this week.

Not fine: AI-written practice questions (the instructor advised against it), and
AI-written card content.

To start a chat with full context: `node codex.mjs brief | pbcopy`, then paste.
