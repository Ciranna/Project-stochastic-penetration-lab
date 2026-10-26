import test from 'node:test';
import assert from 'node:assert/strict';
import { normalDiagnostics } from '../js/statistics/centralLimitTheorem.js';
import { theoreticalMoments } from '../js/statistics/theory.js';
import { runSimulation } from '../js/simulation/simulator.js';
test('theoretical moments',()=>{
  assert.deepEqual(theoreticalMoments(100,'rademacher'),{meanTotal:0,varianceTotal:100,meanAverage:0,varianceAverage:.01,meanNormalized:0,varianceNormalized:1});
  assert.equal(theoreticalMoments(100,'bernoulli',.3).varianceTotal,21);
});
test('Rademacher CLT diagnostics approximately standard normal',()=>{
  const s=runSimulation({n:100,m:4000,seed:77});
  const d=normalDiagnostics(s.standardized);
  assert.ok(Math.abs(d.mean)<.06);
  assert.ok(Math.abs(d.variance-1)<.09);
  assert.ok(Math.abs(d.withinTwo-.9545)<.035);
});
test('Bernoulli standardized scores are well behaved',()=>{
  const s=runSimulation({n:100,m:4000,seed:77,model:'bernoulli',p:.3});
  const d=normalDiagnostics(s.standardized);
  assert.ok(Math.abs(d.mean)<.06);
  assert.ok(Math.abs(d.variance-1)<.09);
});
