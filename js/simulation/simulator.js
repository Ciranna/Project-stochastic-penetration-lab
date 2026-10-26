import { createSeededRandom } from '../utils/random.js';
import { simulateRandomWalk } from './randomWalk.js';
import { MAX_STEPS } from '../config.js';
import { modelMoments } from '../statistics/theory.js';
export function runSimulation({ n, m, seed = 2026, visiblePaths = 20, model = 'rademacher', p = 0.3 }) {
  if (!Number.isSafeInteger(n) || n < 1 || !Number.isSafeInteger(m) || m < 1 || n*m > MAX_STEPS)
    throw new RangeError(`n and m must be positive integers and n × m ≤ ${MAX_STEPS.toLocaleString('en-US')}`);
  if (!Number.isSafeInteger(visiblePaths) || visiblePaths < 0) throw new RangeError('Invalid visiblePaths');
  modelMoments(model,p);
  const rng = createSeededRandom(seed);
  const totals = [], averages = [], normalized = [], standardized = [], paths = [];
  for (let a = 0; a < m; a++) {
    const result = simulateRandomWalk(n, rng, a < visiblePaths, model, p);
    totals.push(result.total); averages.push(result.average);
    normalized.push(result.normalized);
    if (result.standardized !== null) standardized.push(result.standardized);
    if (result.path) paths.push(result.path);
  }
  return { n,m,seed,model,p,totals,averages,normalized,standardized,paths };
}
