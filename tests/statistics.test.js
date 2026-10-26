import test from 'node:test';
import assert from 'node:assert/strict';
import { mean,variance,summarizeSimulation } from '../js/statistics/descriptive.js';
import { histogramDensity,standardNormalPdf } from '../js/statistics/distributions.js';
import { runSimulation } from '../js/simulation/simulator.js';
test('population mean and variance',()=>{assert.equal(mean([1,2,3]),2);assert.equal(variance([1,2,3]),2/3);});
test('normal pdf at zero',()=>assert.ok(Math.abs(standardNormalPdf(0)-0.3989422804)<1e-9));
test('histogram integrates to one for values inside bounds',()=>{
  const bins=histogramDensity([-1,0,1],-2,2,4);
  assert.ok(Math.abs(bins.reduce((s,b)=>s+b.y,0)-1)<1e-12);
});
test('empirical Rademacher moments approximately match theory',()=>{
  const s=summarizeSimulation(runSimulation({n:100,m:1000,seed:2026}));
  assert.ok(Math.abs(s.empiricalMeanAverage)<0.04);
  assert.ok(Math.abs(s.empiricalVarianceNormalized-1)<0.15);
});
