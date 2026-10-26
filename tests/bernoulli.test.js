import test from 'node:test';
import assert from 'node:assert/strict';
import { sampleBernoulli } from '../js/models/bernoulli.js';
import { runSimulation } from '../js/simulation/simulator.js';
test('Bernoulli boundary probabilities',()=>{
  assert.equal(sampleBernoulli(()=>0.5,0),0);
  assert.equal(sampleBernoulli(()=>0.5,1),1);
  assert.equal(sampleBernoulli(()=>0.2,0.3),1);
  assert.equal(sampleBernoulli(()=>0.8,0.3),0);
  assert.throws(()=>sampleBernoulli(()=>0.5,-0.1),RangeError);
});
test('Bernoulli degenerate simulations',()=>{
  assert.deepEqual(runSimulation({n:10,m:5,model:'bernoulli',p:0}).totals,[0,0,0,0,0]);
  assert.deepEqual(runSimulation({n:10,m:5,model:'bernoulli',p:1}).totals,[10,10,10,10,10]);
});
