import { runSimulation } from '../simulation/simulator.js';
import { mean, variance } from './descriptive.js';
import { modelMoments } from './theory.js';
import { MAX_STEPS } from '../config.js';

// The underlying score distribution stays fixed; only Monte Carlo estimation precision changes.
export function analyzeAttackerCounts({n, m, model='rademacher', p=0.3, seed=2026}) {
  const {mu}=modelMoments(model,p);
  const sizes=[10,30,100,300,1000,3000,10000].filter(size=>size<=m);
  if (!sizes.includes(m)) sizes.push(m);
  return sizes.sort((a,b)=>a-b).map((size,i)=>{
    const replicates=Math.min(20,Math.max(1,Math.floor(MAX_STEPS/(n*size))));
    const estimates=[];
    for(let r=0;r<replicates;r++){
      const result=runSimulation({n,m:size,model,p,seed:(seed+7919*i+104729*r)>>>0,visiblePaths:0});
      estimates.push(mean(result.averages));
    }
    return {m:size,replicates,meanEstimate:mean(estimates),absoluteError:Math.abs(mean(estimates)-mu),
      sdAcrossReplicates:replicates>1?Math.sqrt(variance(estimates)):null,
      theoreticalSE:Math.sqrt(modelMoments(model,p).sigma2/(n*size))};
  });
}
