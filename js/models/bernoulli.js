export function sampleBernoulli(rng = Math.random, p = 0.3) {
  if (!Number.isFinite(p) || p < 0 || p > 1) throw new RangeError('p must be in [0,1]');
  return rng() < p ? 1 : 0;
}
