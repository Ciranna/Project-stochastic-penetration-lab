import { mean, variance } from './descriptive.js';
export function normalDiagnostics(standardized) {
  if (!standardized.length) return null;
  return { mean: mean(standardized), variance: variance(standardized),
    withinOne: standardized.filter(x=>Math.abs(x)<=1).length/standardized.length,
    withinTwo: standardized.filter(x=>Math.abs(x)<=2).length/standardized.length };
}
