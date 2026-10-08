const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function item(alt) {
  const classes = new Set();
  return {
    classes,
    style: { setProperty() {} },
    classList: { add: name => classes.add(name), remove: name => classes.delete(name) },
    querySelector: selector => selector === 'img' ? { alt } : null,
  };
}

const cards = ['Ana Vitória', 'PedruBarber', 'LuCasa', 'Yas Cardoso', 'GM Store', 'PMMG', 'Ana Carolina'].map(item);
const texts = cards.map(() => item());
const section = {};
let onIntersect;
let disconnectCount = 0;
let timerCount = 0;
const document = {
  addEventListener: (_, handler) => { document.ready = handler; },
  querySelectorAll: selector => selector === '.testimonial-image-card' ? cards : texts,
  getElementById: id => id === 'depoimentos' ? section : null,
};
class IntersectionObserver {
  constructor(handler) { onIntersect = handler; }
  observe(target) { assert.equal(target, section); }
  disconnect() { disconnectCount++; }
}

vm.runInNewContext(fs.readFileSync('js/depoimentos.js', 'utf8'), {
  document, IntersectionObserver, setInterval: () => ++timerCount, clearInterval() {},
});
document.ready();
assert.equal(cards[5].classes.has('active'), true);
assert.equal(texts[5].classes.has('active'), true);
assert.equal(timerCount, 0);
onIntersect([{ isIntersecting: false }]);
assert.equal(timerCount, 0);
onIntersect([{ isIntersecting: true }]);
assert.equal(timerCount, 1);
assert.equal(disconnectCount, 1);
