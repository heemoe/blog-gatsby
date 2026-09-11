import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const source = readFileSync(new URL('../src/scripts/theme.js', import.meta.url), 'utf8');

function start({ saved = null, dark = false, blocked = false, loaded = false } = {}) {
  const events = {};
  const documentEvents = {};
  const systemEvents = {};
  const root = { dataset: {} };
  const attributes = new Map([['hidden', '']]);
  let stored = saved;
  let mounted = loaded;
  let click;
  let metaColor;
  const system = {
    matches: dark,
    addEventListener: (name, callback) => { systemEvents[name] = callback; },
  };
  const button = {
    setAttribute: (name, value) => attributes.set(name, value),
    removeAttribute: (name) => attributes.delete(name),
    addEventListener: (name, callback) => { if (name === 'click') click = callback; },
  };
  const document = {
    documentElement: root,
    readyState: loaded ? 'complete' : 'loading',
    querySelector: (selector) => selector.startsWith('meta')
      ? { setAttribute: (_, value) => { metaColor = value; } }
      : mounted ? button : null,
    addEventListener: (name, callback) => { documentEvents[name] = callback; },
  };
  vm.runInNewContext(source, {
    document,
    window: {
      matchMedia: () => system,
      addEventListener: (name, callback) => { events[name] = callback; },
    },
    localStorage: {
      getItem: () => { if (blocked) throw new Error('Storage blocked'); return stored; },
      setItem: (_, value) => { if (blocked) throw new Error('Storage blocked'); stored = value; },
    },
  });
  return {
    root, attributes,
    saved: () => stored,
    meta: () => metaColor,
    ready: () => { mounted = true; documentEvents.DOMContentLoaded?.(); },
    click: () => click(),
    system: (value) => { system.matches = value; systemEvents.change(); },
    storage: (value, key = 'zhong-theme') => { stored = value; events.storage({ key }); },
  };
}

test('applies system light/dark before the header is parsed', () => {
  for (const dark of [false, true]) {
    const app = start({ dark });
    assert.equal(app.root.dataset.theme, dark ? 'dark' : 'light');
    assert.equal(app.meta(), dark ? '#141414' : '#f7f5f0');
    assert.equal(app.attributes.has('hidden'), true);
    app.ready();
    assert.equal(app.attributes.has('hidden'), false);
    assert.equal(app.attributes.get('aria-pressed'), String(dark));
  }
});

test('saved choice overrides the system before paint and on another page', () => {
  const app = start({ saved: 'light', dark: true });
  assert.equal(app.root.dataset.theme, 'light');
  app.ready();
  app.click();
  assert.equal(app.saved(), 'dark');
  assert.equal(app.root.dataset.theme, 'dark');
  assert.equal(app.attributes.get('aria-pressed'), 'true');
  assert.equal(app.attributes.get('title'), 'Switch to light mode');
  const next = start({ saved: app.saved() });
  assert.equal(next.root.dataset.theme, 'dark');
  app.click();
  assert.equal(app.saved(), 'light');
  assert.equal(app.meta(), '#f7f5f0');
});

test('follows system changes only until the user makes an explicit choice', () => {
  const app = start();
  app.ready();
  app.system(true);
  assert.equal(app.root.dataset.theme, 'dark');
  app.click();
  app.system(false);
  app.system(true);
  assert.equal(app.root.dataset.theme, 'light');
});

test('invalid stored values fall back to the system', () => {
  for (const saved of ['', 'auto', 'undefined', 'unexpected']) {
    const app = start({ saved, dark: true });
    assert.equal(app.root.dataset.theme, 'dark');
    app.system(false);
    assert.equal(app.root.dataset.theme, 'light');
  }
});

test('blocked storage does not break initialization or manual switching', () => {
  const app = start({ blocked: true, dark: true });
  app.ready();
  app.click();
  assert.equal(app.root.dataset.theme, 'light');
  app.system(true);
  assert.equal(app.root.dataset.theme, 'light');
  app.click();
  assert.equal(app.root.dataset.theme, 'dark');
});

test('synchronizes another tab and returns to system when storage is cleared', () => {
  const app = start({ saved: 'dark' });
  app.ready();
  app.storage('light');
  assert.equal(app.root.dataset.theme, 'light');
  app.storage('dark', 'unrelated-key');
  assert.equal(app.root.dataset.theme, 'light');
  app.storage(null, null);
  app.system(true);
  assert.equal(app.root.dataset.theme, 'dark');
  assert.equal(app.attributes.get('aria-pressed'), 'true');
});

test('initializes the button if the document has already loaded', () => {
  const app = start({ loaded: true });
  assert.equal(app.attributes.has('hidden'), false);
  app.click();
  assert.equal(app.root.dataset.theme, 'dark');
});
