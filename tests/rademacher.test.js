import test from 'node:test';
import assert from 'node:assert/strict';
import { sampleRademacher } from '../js/models/rademacher.js';
test('Rademacher outcomes and boundaries', () => {
  assert.equal(sampleRademacher(() => 0), -1);
  assert.equal(sampleRademacher(() => .499), -1);
  assert.equal(sampleRademacher(() => .5), 1);
  assert.equal(sampleRademacher(() => .999), 1);
});
