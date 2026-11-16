#!/usr/bin/env node
// Learning Codex: turns folders of Markdown notes into a one-page codex.
// No dependencies. Usage:
//   node codex.mjs build
//   node codex.mjs new <city> <district>-<slug> "Name" [threat 1-4]
//   node codex.mjs city <id> "Title"
//   node codex.mjs brief [city]     prints a paste-ready brief for a new AI chat

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const CITIES = join(ROOT, 'cities');
const MIN_CHARS = 12; // a section counts as filled once it holds this much of your own text

// ---------- parsing ----------

function parseFile(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const meta = {};
  if (!m) return { meta, body: text };
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: m[2] };
}

// Split a note into its "## Heading" sections, ignoring headings inside code fences.
function splitSections(body) {
  const out = [];
  let cur = null;
  let fenced = false;
  for (const line of body.split(/\r?\n/)) {
    if (line.trim().startsWith('```')) fenced = !fenced;
    const h = !fenced && line.match(/^##\s+(.+?)\s*$/);
    if (h) {
      cur = { title: h[1], key: h[1].toLowerCase(), text: '' };
      out.push(cur);
    } else if (cur) {
      cur.text += line + '\n';
    }
  }
  return out;
}

const PROMPT = /^\s*(What it is|Like what I know|Pick it when|Not it when[^:]*|What I built)\s*:/i;

function isFilled(text) {
  const own = text
    .replace(/<!--[\s\S]*?-->/g, '')
    .split(/\r?\n/)
    .map((l) => l.replace(PROMPT, ''))
    .join('')
    .replace(/\s+/g, '');
  return own.length >= MIN_CHARS;
}

function parseMissed(text) {
  const out = [];
  for (const line of text.replace(/<!--[\s\S]*?-->/g, '').split(/\r?\n/)) {
    const m = line.match(/^\s*[-*]\s+(?:\[( |x|X)\]\s+)?(.+)$/);
    if (m) out.push({ text: m[2].trim(), resolved: m[1] === 'x' || m[1] === 'X' });
  }
  return out;
}

function mdFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .sort();
}

function readCard(cityId, file) {
  const { meta, body } = parseFile(readFileSync(join(CITIES, cityId, 'cards', file), 'utf8'));
  const sec = Object.fromEntries(splitSections(body).map((s) => [s.key, s.text]));
  const b = isFilled(sec['baseline'] || '');
  const i = isFilled(sec['isolate'] || '');
  const e = isFilled(sec['execute'] || '');
  const id = file.replace(/\.md$/, '');
  return {
    id,
    name: meta.name || id,
    district: meta.district || id.split('-')[0],
    threat: Math.max(1, Math.min(4, parseInt(meta.threat, 10) || 1)),
    estimate: !/trainer/i.test(meta.threat_source || ''),
    livesAt: meta.lives_at || '',
    b, i, e,
    level: b && i && e ? 3 : b && i ? 2 : b ? 1 : 0,
    missed: parseMissed(sec['missed'] || ''),
    body,
  };
}

function readBoss(cityId, file) {
  const { meta, body } = parseFile(readFileSync(join(CITIES, cityId, 'bosses', file), 'utf8'));
  const secs = splitSections(body);
  const work = secs.filter((s) => s.key !== 'missed');
  const done = work.filter((s) => isFilled(s.text)).length;
  const missedSec = secs.find((s) => s.key === 'missed');
  const id = file.replace(/\.md$/, '');
  return {
    id,
    name: meta.name || id,
    tagline: meta.tagline || '',
    parts: work.map((s) => ({ title: s.title, done: isFilled(s.text) })),
    hp: work.length ? Math.round(100 * (1 - done / work.length)) : 100,
    missed: parseMissed(missedSec ? missedSec.text : ''),
    body,
  };
}

function readQuests(cityId) {
  const path = join(CITIES, cityId, 'quests.md');
  if (!existsSync(path)) return [];
  const weeks = [];
  let cur = null;
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const h = line.match(/^##\s+(.+)$/);
    if (h) {
      const [title, start, hours] = h[1].split('|').map((s) => s.trim());
      cur = { title, start: /^\d{4}-\d{2}-\d{2}$/.test(start || '') ? start : null, hours: hours || '', items: [] };
      weeks.push(cur);
      continue;
    }
    const m = line.match(/^\s*[-*]\s+\[( |x|X)\]\s+(.+)$/);
    if (m && cur) {
      let text = m[2].trim();
      let key = null;
      const k = text.match(/\{key(!?)\}/);
      if (k) {
        key = k[1] ? 'required' : 'key';
        text = text.replace(/\s*\{key!?\}/, '');
      }
      cur.items.push({ text, done: m[1] !== ' ', key });
    }
  }
  return weeks;
}

function readQuizzes(cityId) {
  const path = join(CITIES, cityId, 'quizzes.md');
  if (!existsSync(path)) return [];
  const out = [];
  for (const line of readFileSync(path, 'utf8').replace(/<!--[\s\S]*?-->/g, '').split(/\r?\n/)) {
    const m = line.match(/^\s*[-*]\s+(\d{4}-\d{2}-\d{2})\s*\|\s*(.+?)\s*\|\s*(\d+)\s*\/\s*(\d+)\s*$/);
    if (m && +m[4] > 0) out.push({ date: m[1], label: m[2], got: +m[3], total: +m[4] });
  }
  return out;
}

function readCity(id) {
  const cfg = JSON.parse(readFileSync(join(CITIES, id, 'city.json'), 'utf8'));
  return {
    id,
    title: cfg.title || id,
    subtitle: cfg.subtitle || '',
    milestones: cfg.milestones || [],
    keysNeeded: cfg.keys_needed || 0,
    targetAccuracy: cfg.target_accuracy || 0,
    districts: cfg.districts || [],
    cards: mdFiles(join(CITIES, id, 'cards')).map((f) => readCard(id, f)),
    bosses: mdFiles(join(CITIES, id, 'bosses')).map((f) => readBoss(id, f)),
    weeks: readQuests(id),
    quizzes: readQuizzes(id),
  };
}

function cityIds() {
  if (!existsSync(CITIES)) return [];
  return readdirSync(CITIES)
    .filter((d) => existsSync(join(CITIES, d, 'city.json')))
    .sort();
}

// ---------- commands ----------

function build() {
  const cities = cityIds().map(readCity);
  const template = readFileSync(join(ROOT, 'site', 'template.html'), 'utf8');
  const json = JSON.stringify({ cities }).replace(/</g, '\\u003c');
  if (!template.includes('"__CODEX_DATA__"')) throw new Error('site/template.html is missing the "__CODEX_DATA__" placeholder');
  writeFileSync(join(ROOT, 'index.html'), template.replace('"__CODEX_DATA__"', () => json));
  for (const c of cities) {
    const n = [0, 1, 2, 3].map((l) => c.cards.filter((x) => x.level === l).length);
    const breached = c.cards.filter((x) => x.missed.some((m) => !m.resolved)).length;
    console.log(`${c.id}: ${c.cards.length} entries | owned ${n[3]} | scanned ${n[2]} | seen ${n[1]} | locked ${n[0]} | breached ${breached}`);
  }
  console.log('Wrote index.html');
}

function cardTemplate({ name, district, threat, trainer }) {
  return `---
name: ${name}
district: ${district}
threat: ${threat}
threat_source: ${trainer ? 'trainer sheet' : 'estimate'}
lives_at:
---

## Baseline
What it is:
Like what I know:

## Isolate
Pick it when:
Not it when (use ___ instead):

## Execute
What I built:

## Missed
`;
}

function newCard(args) {
  const trainer = args.includes('--trainer');
  const [city, id, name, threat] = args.filter((a) => a !== '--trainer');
  if (!city || !id || !name) fail('Usage: node codex.mjs new <city> <district>-<slug> "Name" [threat 1-4] [--trainer]');
  const cityDir = join(CITIES, city);
  if (!existsSync(join(cityDir, 'city.json'))) fail(`No city "${city}". Existing: ${cityIds().join(', ') || 'none'}`);
  const cfg = JSON.parse(readFileSync(join(cityDir, 'city.json'), 'utf8'));
  const district = id.split('-')[0];
  const known = (cfg.districts || []).map((d) => d.id);
  if (!known.includes(district)) fail(`"${id}" must start with a district: ${known.join(', ')}. Add a new district in cities/${city}/city.json first.`);
  const path = join(cityDir, 'cards', `${id}.md`);
  if (existsSync(path)) fail(`${id}.md already exists`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, cardTemplate({ name, district, threat: parseInt(threat, 10) || 1, trainer }));
  console.log(`Created cities/${city}/cards/${id}.md`);
}

function newCity(args) {
  const [id, title] = args;
  if (!id || !title) fail('Usage: node codex.mjs city <id> "Title"');
  const dir = join(CITIES, id);
  if (existsSync(dir)) fail(`cities/${id} already exists`);
  for (const sub of ['cards', 'bosses', 'img']) {
    mkdirSync(join(dir, sub), { recursive: true });
    writeFileSync(join(dir, sub, '.gitkeep'), '');
  }
  writeFileSync(
    join(dir, 'city.json'),
    JSON.stringify(
      {
        title,
        subtitle: '',
        milestones: [],
        keys_needed: 0,
        target_accuracy: 85,
        districts: [{ id: 'core', name: 'Foundation' }],
      },
      null,
      2
    ) + '\n'
  );
  writeFileSync(join(dir, 'quests.md'), '# Quests\n\n## Week 1 | YYYY-MM-DD | ~0h\n- [ ] First thing to do\n');
  writeFileSync(join(dir, 'inbox.md'), '# Inbox\n\nOne line per signal while you watch or listen. Move what matters into cards, delete the rest.\n\n');
  writeFileSync(join(dir, 'quizzes.md'), '# Quiz log\n\n<!-- One line per quiz: - 2026-01-31 | Quiz name | 7/10 -->\n');
  console.log(`Created cities/${id}. Edit city.json, then: node codex.mjs new ${id} core-<slug> "Name"`);
}

// Prints ASSISTANT.md plus the current state of one city, for pasting into a new chat.
function brief(args) {
  const ids = cityIds();
  const id = args[0] || ids[0];
  if (!ids.includes(id)) fail(`No city "${id}". Existing: ${ids.join(', ') || 'none'}`);
  const c = readCity(id);
  const now = new Date();
  const iso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`; // local date
  const days = (d) => Math.ceil((new Date(d + 'T23:59:59') - now) / 864e5);
  const out = [];
  const head = join(ROOT, 'ASSISTANT.md');
  if (existsSync(head)) out.push(readFileSync(head, 'utf8').trim(), '');
  out.push('## Live state', '', `City: ${c.title}${c.subtitle ? ' (' + c.subtitle + ')' : ''}, folder \`${c.id}\`. Today is ${iso}.`);

  for (const m of c.milestones) out.push(`- ${m.label}: ${m.date} (${days(m.date) >= 0 ? days(m.date) + ' days away' : 'passed'})`);

  let cur = null;
  for (const w of c.weeks) if (w.start && w.start <= iso) cur = w;
  const idx = cur ? c.weeks.indexOf(cur) : -1;
  if (cur) {
    out.push('', `Current week: ${cur.title}${cur.hours ? ', ' + cur.hours : ''}.`);
    for (const q of cur.items) out.push(`- [${q.done ? 'x' : ' '}] ${q.text}`);
  }
  const back = c.weeks.filter((w, i) => (idx < 0 ? !w.start : i < idx)).flatMap((w) => w.items.filter((q) => !q.done).map((q) => `- ${w.title}: ${q.text}`));
  if (back.length) out.push('', `Open from earlier weeks (${back.length}):`, ...back);

  const keys = c.weeks.flatMap((w) => w.items.filter((q) => q.key));
  if (keys.length) out.push('', `Badges: ${keys.filter((k) => k.done).length} of ${keys.length} done; ${c.keysNeeded} needed for the voucher.`);
  if (c.quizzes.length) {
    const got = c.quizzes.reduce((s, q) => s + q.got, 0);
    const total = c.quizzes.reduce((s, q) => s + q.total, 0);
    out.push(`Quiz average: ${Math.round((100 * got) / total)}% over ${c.quizzes.length} (target ${c.targetAccuracy}%).`);
  } else out.push('No quizzes logged yet.');

  const n = [0, 1, 2, 3].map((l) => c.cards.filter((x) => x.level === l).length);
  out.push('', `Cards: ${c.cards.length} total. Owned ${n[3]}, scanned ${n[2]}, seen ${n[1]}, locked ${n[0]}.`,
    'Every card, by district. Number after the id is the depth needed; then status (blank means locked).');
  const mark = ['', ' seen', ' scanned', ' owned'];
  for (const d of c.districts) {
    const list = c.cards.filter((x) => x.district === d.id);
    if (list.length) out.push(`- ${d.id}: ${list.map((x) => `${x.id} (${x.threat}${mark[x.level]}${x.missed.some((m) => !m.resolved) ? ', breached' : ''})`).join('; ')}`);
  }
  const open = c.cards.flatMap((x) => x.missed.filter((m) => !m.resolved).map((m) => `- ${x.id}: ${m.text}`));
  if (open.length) out.push('', 'Unresolved missed questions:', ...open);
  if (c.bosses.length) out.push('', 'Case studies: ' + c.bosses.map((b) => `${b.name} (${b.parts.filter((p) => p.done).length}/${b.parts.length} sections written)`).join('; ') + '.');
  out.push('', '## My question', '');
  console.log(out.join('\n'));
}

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

const [cmd, ...rest] = process.argv.slice(2);
if (cmd === 'build' || !cmd) build();
else if (cmd === 'new') newCard(rest);
else if (cmd === 'city') newCity(rest);
else if (cmd === 'brief') brief(rest);
else fail('Commands: build | new <city> <id> "Name" [threat] | city <id> "Title" | brief [city]');
