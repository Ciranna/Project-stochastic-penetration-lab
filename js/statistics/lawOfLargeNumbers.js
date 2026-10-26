import { modelMoments } from './theory.js';
export function llnErrorProbability(averages, model, p = 0.3, epsilon = 0.1) {
  if (!averages.length || !(epsilon > 0)) throw new RangeError('Invalid LLN arguments');
  const {mu} = modelMoments(model,p);
  return averages.filter(x => Math.abs(x-mu) > epsilon).length / averages.length;
}
