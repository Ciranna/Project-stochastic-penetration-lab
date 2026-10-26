import test from 'node:test';
import assert from 'node:assert/strict';
import { simulateRandomWalk } from '../js/simulation/randomWalk.js';
import { runSimulation } from '../js/simulation/simulator.js';
test('known path, total and normalizations', () => {
  const values = [0.1,0.8,0.8,0.1]; let i=0;
  const r=simulateRandomWalk(4,()=>values[i++]);
  assert.deepEqual(r.path,[0,-1,0,1,0]);
  assert.equal(r.total,0); assert.equal(r.average,0); assert.equal(r.normalized,0);
});
test('simulation shape and seeded reproducibility', () => {
  const a=runSimulation({n:100,m:1000,seed:2026});
  const b=runSimulation({n:100,m:1000,seed:2026});
  assert.deepEqual(a.totals,b.totals);
  assert.equal(a.totals.length,1000);
  assert.equal(a.paths.length,20);
  assert.equal(a.paths[0].length,101);
  assert.ok(a.totals.every(x=>x%2===0 && x>=-100 && x<=100));
});
test('invalid sizes rejected',()=>{
  assert.throws(()=>runSimulation({n:0,m:10}),RangeError);
  assert.throws(()=>runSimulation({n:10000,m:10000}),RangeError);
});
