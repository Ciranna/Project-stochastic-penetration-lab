import test from 'node:test';
import assert from 'node:assert/strict';
import { llnErrorProbability } from '../js/statistics/lawOfLargeNumbers.js';
import { runComparison } from '../js/statistics/comparison.js';
test('LLN exact deviation counting',()=>{
  assert.equal(llnErrorProbability([0,.1,-.2,.3],'rademacher',.3,.15),.5);
  assert.equal(llnErrorProbability([.3,.31,.29],'bernoulli',.3,.05),0);
});
test('comparison produces increasing n with theoretical values',()=>{
  const rows=runComparison({m:100,seed:42,maxN:100,epsilon:.1});
  assert.deepEqual(rows.map(r=>r.n),[10,30,100]);
  assert.deepEqual(rows.map(r=>r.theoreticalVarianceNormalized),[1,1,1]);
});
