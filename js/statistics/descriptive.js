import { theoreticalMoments } from './theory.js';
export function mean(values) {
  if (!values.length) throw new RangeError('Values cannot be empty');
  return values.reduce((sum, x) => sum + x, 0) / values.length;
}
export function variance(values) {
  const mu = mean(values);
  return values.reduce((sum, x) => sum + (x - mu) ** 2, 0) / values.length;
}
export function summarizeSimulation(result) {
  const theory = theoreticalMoments(result.n,result.model ?? 'rademacher',result.p ?? 0.3);
  return {
    empiricalMeanTotal: mean(result.totals), empiricalVarianceTotal: variance(result.totals),
    empiricalMeanAverage: mean(result.averages), empiricalVarianceAverage: variance(result.averages),
    empiricalMeanNormalized: mean(result.normalized), empiricalVarianceNormalized: variance(result.normalized),
    theoreticalMeanTotal: theory.meanTotal, theoreticalVarianceTotal: theory.varianceTotal,
    theoreticalMeanAverage: theory.meanAverage, theoreticalVarianceAverage: theory.varianceAverage,
    theoreticalMeanNormalized: theory.meanNormalized, theoreticalVarianceNormalized: theory.varianceNormalized
  };
}
