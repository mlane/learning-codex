# Learning Codex

Notes as plain Markdown, displayed as a city that lights up as you learn.

Each subject is a **city**. Each thing to learn is an **entry**, one Markdown card.
A card follows the Conceptual Baseline Architecture loop:

| Section | What you write | Entry becomes |
|---|---|---|
| Baseline | What it is, and what you already know that it resembles | Seen |
| Isolate | When to pick it, and when to pick something else | Scanned |
| Execute | What you built or ran: a command, a snippet, a screenshot | Owned |
| Missed | One line per practice question that beat you | Breached, until resolved |

Status is worked out from what you wrote. There is nothing to tick on a card.

Two companion documents:

- `FIELD-GUIDE.md`: what to capture, when to make a card, what "done" looks like. Reread it when unsure.
- `ASSISTANT.md`: context for an AI chat. `npm run brief:copy` copies it with your
  current progress attached, ready to paste into a new chat.

## Commands

Run these in Terminal from the repo folder. Each one works as an npm script or by
calling the script directly; use whichever you prefer.

| What it does | npm script | Direct |
|---|---|---|
| Read your notes and regenerate `index.html` | `npm run build` | `node codex.mjs build` |
| Print the paste-ready text for a new AI chat | `npm run brief` | `node codex.mjs brief` |
| Same, copied to the clipboard (macOS) | `npm run brief:copy` | `node codex.mjs brief \| pbcopy` |
| Create a blank card | `npm run new -- <city> <id> "Name" <depth>` | `node codex.mjs new <city> <id> "Name" <depth>` |
| Create a city for another subject | `npm run city -- <id> "Title"` | `node codex.mjs city <id> "Title"` |

The `--` after `new` and `city` is how npm passes the rest of the line to the script.

Examples:

```bash
npm run new -- gcp-pca data-alloydb "AlloyDB" 2      # the id prefix is the district
npm run city -- aws-saa "AWS Solutions Architect"
npm run brief -- aws-saa                             # brief for a city other than the first
```

## Daily use

```bash
npm run build
open index.html           # macOS
```

1. While watching a lecture, drop one-line signals into `cities/<city>/inbox.md`.
   Afterwards, open a card in `cities/<city>/cards/` and write a section.
2. Tick quests in `cities/<city>/quests.md` by changing `[ ]` to `[x]`.
3. Log quiz scores in `cities/<city>/quizzes.md`.
4. Run the build and look at the city.

No install step. It needs Node 18 or newer and nothing else.

## Card rules

- One screen per card. If it grows past that, cut it.
- Leave a section blank until something real prompts it.
- `lives_at` in the card header is one of `zonal`, `regional`, `multi-regional`, `global`.
- `threat` is the depth the exam needs, 1 (basics) to 4 (expert). Cards marked
  `threat_source: estimate` are guesses. Overwrite them from the trainer's sheet and
  change the source to `trainer sheet`.
- A missed question is `- [ ] what I got wrong`. When you can explain the right answer,
  change it to `- [x]`. If the codex says Owned and a question still beats you, log it:
  the entry shows as breached until you fix it.
- Screenshots go in `cities/<city>/img/`, named after the card:
  `![](../img/compute-cloud-run-01.png)`.
- Files starting with `_` are ignored by the build. See
  `cities/gcp-pca/cards/_example-core-resource-hierarchy.md` for a filled-in card.

## Bosses

Case studies live in `cities/<city>/bosses/`. Each written section takes health off the
boss. Diagrams go in as Mermaid code blocks, which GitHub renders.

## Settings

Districts, dates and the badge count needed are in `cities/<city>/city.json`.
In `quests.md`, tag a line `{key}` to count it as a badge and `{key!}` for a required one.

## Changing the look

The page is `site/template.html`: one file of HTML, CSS and JavaScript. The build
injects the data and writes `index.html`.

## One rule

A new codex feature gets built after that week's badge is done.
