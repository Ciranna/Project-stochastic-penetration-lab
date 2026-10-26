import { sampleRademacher } from '../models/rademacher.js';
import { sampleBernoulli } from '../models/bernoulli.js';
import { modelMoments } from '../statistics/theory.js';
export function simulateRandomWalk(n, rng = Math.random, keepPath = true, model = 'rademacher', p = 0.3) {
  if (!Number.isSafeInteger(n) || n < 1) throw new RangeError('n must be a positive integer');
  const {mu, sigma2} = modelMoments(model,p);
  const path = keepPath ? [0] : null;
  let total = 0;
  for (let i = 0; i < n; i++) {
    total += model === 'rademacher' ? sampleRademacher(rng) : sampleBernoulli(rng,p);
    if (keepPath) path.push(total);
  }
  return { total, average: total/n, normalized: total/Math.sqrt(n),
    standardized: sigma2 > 0 ? (total-n*mu)/Math.sqrt(n*sigma2) : null, path };
}
