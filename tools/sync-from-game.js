#!/usr/bin/env node
// Copies the game files the sketchpad needs into game/ (a snapshot of the game as it is now).
// Usage:  node tools/sync-from-game.js [folder-of-pet-shopper | web address]
// With nothing given it downloads from the game's site. Run it whenever the game gets new hats, skins,
// backgrounds, furniture or pet changes you want to draw over, then commit the changes in game/.
'use strict';
const fs = require('fs');
const path = require('path');

const FILES = ['logic.js', 'wardrobe.js', 'skins.js', 'decor.js', 'backdrops.js', 'app-select.js', 'styles.css'];
const SOURCE_IDS = ['pet', 'toy'];   // the pet and toy drawings, taken out of the game's index.html
const from = process.argv[2] || 'https://laurmoe7.github.io/pet-shopper/';
const out = path.join(__dirname, '..', 'game');

async function read(name) {
  if (/^https?:/.test(from)) {
    const r = await fetch(from.replace(/\/?$/, '/') + name);
    if (!r.ok) throw new Error(name + ': ' + r.status);
    return r.text();
  }
  return fs.readFileSync(path.join(from, name), 'utf8');
}

/** @returns {string} The whole element with this id (its tag, everything inside it and its end tag). */
function element(html, id) {
  const at = html.indexOf('id="' + id + '"');
  if (at < 0) throw new Error('no element with id ' + id);
  const start = html.lastIndexOf('<', at);
  const name = /^<([a-zA-Z0-9]+)/.exec(html.slice(start))[1];
  const re = new RegExp('<(/?)' + name + '(?=[\\s>/])[^>]*?(/?)>', 'g');
  re.lastIndex = start;
  let depth = 0, m;
  while ((m = re.exec(html))) {
    if (m[2] === '/') continue;                  // <x ... /> closes itself
    depth += m[1] ? -1 : 1;
    if (depth === 0) return html.slice(start, re.lastIndex);
  }
  throw new Error('no end tag for ' + id);
}

(async () => {
  fs.mkdirSync(out, { recursive: true });
  for (const f of FILES) { fs.writeFileSync(path.join(out, f), await read(f)); console.log('copied', f); }
  const index = await read('index.html');
  const parts = SOURCE_IDS.map(id => element(index, id));
  fs.writeFileSync(path.join(out, 'source.html'), '<!doctype html>\n<!-- made by tools/sync-from-game.js from the game\'s index.html: only the pet and the toy -->\n<html><body>\n' + parts.join('\n') + '\n</body></html>\n');
  console.log('wrote source.html (' + SOURCE_IDS.join(', ') + ')');
})().catch(e => { console.error('Could not copy:', e.message); process.exit(1); });
