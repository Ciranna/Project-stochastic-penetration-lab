import { theoreticalMoments } from './theory.js';
import { variance } from './descriptive.js';
export function compareVariances(result) {
  const t=theoreticalMoments(result.n,result.model,result.p);
  return [
    {quantity:'Total Sₙ',empirical:variance(result.totals),theoretical:t.varianceTotal},
    {quantity:'Average Sₙ/n',empirical:variance(result.averages),theoretical:t.varianceAverage},
    {quantity:'Normalized Sₙ/√n',empirical:variance(result.normalized),theoretical:t.varianceNormalized}
  ];
}
