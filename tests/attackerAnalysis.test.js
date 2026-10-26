import test from 'node:test';
import assert from 'node:assert/strict';
import {analyzeAttackerCounts} from '../js/statistics/attackerAnalysis.js';
import {buildReportCsv,toCsv} from '../js/utils/csv.js';
test('attacker sensitivity is ordered and theoretical SE decreases',()=>{
 const rows=analyzeAttackerCounts({n:100,m:300,seed:2026});
 assert.deepEqual(rows.map(r=>r.m),[10,30,100,300]);
 assert.ok(rows.every(r=>r.replicates>=2));
 assert.ok(rows.every((r,i)=>i===0||r.theoreticalSE<rows[i-1].theoreticalSE));
});
test('attacker sensitivity is deterministic with same seed',()=>{
 const args={n:20,m:30,seed:123};assert.deepEqual(analyzeAttackerCounts(args),analyzeAttackerCounts(args));
});
test('CSV quotes commas, quotes and includes sections',()=>{
 assert.equal(toCsv(['a,b'],[['x"y']]),'"a,b"\r\n"x""y"\r\n');
 const csv=buildReportCsv({n:10,m:20,model:'rademacher',p:.3,seed:1},
 {empiricalMeanTotal:0,theoreticalMeanTotal:0,empiricalVarianceTotal:10,theoreticalVarianceTotal:10,empiricalMeanAverage:0,theoreticalMeanAverage:0,empiricalVarianceAverage:.1,theoreticalVarianceAverage:.1,empiricalVarianceNormalized:1,theoreticalVarianceNormalized:1},[],[]);
 assert.match(csv,/"summary","variance total"/);
});
