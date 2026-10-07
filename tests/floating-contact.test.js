const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function element() {
  const listeners = {};
  const classes = new Set();
  return {
    listeners,
    classes,
    attributes: {},
    classList: {
      contains: (name) => classes.has(name),
      toggle: (name, enabled) => enabled ? classes.add(name) : classes.delete(name),
    },
    addEventListener: (name, handler) => { listeners[name] = handler; },
    setAttribute(name, value) { this.attributes[name] = value; },
    contains(target) { return target === this || target === toggle || target === options; },
    focus() {},
  };
}

const fab = element();
const toggle = element();
const backdrop = element();
const options = element();
const document = {
  activeElement: null,
  listeners: {},
  getElementById(id) { return ({ 'contact-fab': fab, 'contact-toggle': toggle, 'contact-backdrop': backdrop })[id]; },
  addEventListener(name, handler) { this.listeners[name] = handler; },
};
const media = { matches: false };
const window = { matchMedia: () => media };

vm.runInNewContext(fs.readFileSync('js/floating-contact.js', 'utf8'), { document, window });
toggle.listeners.click();
assert.equal(toggle.attributes['aria-expanded'], 'true');
assert.equal(backdrop.classes.has('is-open'), true);
document.listeners.pointerdown({ target: backdrop });
assert.equal(toggle.attributes['aria-expanded'], 'false');
assert.equal(backdrop.classes.has('is-open'), false);
toggle.listeners.click();
toggle.listeners.click();
assert.equal(fab.classes.has('is-open'), false);
media.matches = true;
fab.listeners.pointerenter();
assert.equal(fab.classes.has('is-open'), true);
fab.listeners.pointerleave();
assert.equal(fab.classes.has('is-open'), false);
toggle.listeners.click();
document.listeners.keydown({ key: 'Escape' });
assert.equal(fab.classes.has('is-open'), false);
