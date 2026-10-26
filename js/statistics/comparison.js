import { runSimulation } from '../simulation/simulator.js';
import { summarizeSimulation } from './descriptive.js';
import { llnErrorProbability } from './lawOfLargeNumbers.js';
import { normalDiagnostics } from './centralLimitTheorem.js';
import { MAX_STEPS } from '../config.js';
export const N_VALUES = [10, 30, 100, 300, 1000, 3000, 10000];
export function runComparison({model='rademacher',p=0.3,m=1000,seed=2026,epsilon=0.1,maxN=1000}) {
  const ns=N_VALUES.filter(n=>n<=maxN);
  if (!ns.length) throw new RangeError('No comparison sizes available');
  const comparisonM = Math.min(m,Math.floor(MAX_STEPS/ns.reduce((s,n)=>s+n,0)));
  if (comparisonM < 1) throw new RangeError('Comparison exceeds step budget');
  return ns.map((n,i)=>{
    const result=runSimulation({n,m:comparisonM,seed:(seed+i*1009)>>>0,visiblePaths:0,model,p});
    return {n,m:comparisonM,...summarizeSimulation(result),errorProbability:llnErrorProbability(result.averages,model,p,epsilon),diagnostics:normalDiagnostics(result.standardized)};
  });
}
