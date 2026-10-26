import { analyzeAttackerCounts } from './statistics/attackerAnalysis.js';
import { renderAttackerChart } from './charts/attackerChart.js';
import { buildReportCsv } from './utils/csv.js';
import { DEFAULT_CONFIG } from './config.js';
import { runSimulation } from './simulation/simulator.js';
import { summarizeSimulation } from './statistics/descriptive.js';
import { modelMoments } from './statistics/theory.js';
import { llnErrorProbability } from './statistics/lawOfLargeNumbers.js';
import { normalDiagnostics } from './statistics/centralLimitTheorem.js';
import { runComparison } from './statistics/comparison.js';
import { renderTrajectories } from './charts/trajectoriesChart.js';
import { renderHistogram } from './charts/histogramChart.js';
import { renderConvergence, renderErrorProbability } from './charts/convergenceChart.js';
import { renderVarianceComparison } from './charts/varianceChart.js';
import { readParameters, updateModelControls, renderSummary, renderComparisonTable } from './ui.js';
const runButton=document.getElementById('run');
const status=document.getElementById('status');
const exportButton=document.getElementById('export');
let latestCsv=null;
exportButton.addEventListener('click',()=>{if(!latestCsv)return;const blob=new Blob([latestCsv],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='stochastic-penetration-results.csv';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
function run(parameters) {
  runButton.disabled=true;exportButton.disabled=true;latestCsv=null;status.textContent='Computing...';
  // Yield one frame so the status is painted before expensive simulations.
  requestAnimationFrame(()=>setTimeout(()=>{
    try {
      const {epsilon,...options}=parameters;
      if (!(epsilon>0&&epsilon<=1)) throw new RangeError('ε must be in (0,1]');
      const result=runSimulation(options);
      const stats=summarizeSimulation(result);
      const error=llnErrorProbability(result.averages,result.model,result.p,epsilon);
      const diagnostics=normalDiagnostics(result.standardized);
      const comparison=runComparison({...options,epsilon,maxN:Math.max(10,options.n)});
      const {mu}=modelMoments(result.model,result.p);
      renderSummary(result,stats,epsilon,error,diagnostics);
      renderTrajectories(result.paths);
      renderHistogram(result.standardized,result.model==='bernoulli');
      renderConvergence(comparison,mu,epsilon);
      renderErrorProbability(comparison,epsilon);
      renderVarianceComparison(comparison);
      renderComparisonTable(comparison);
      const attackerRows=analyzeAttackerCounts(options);
      renderAttackerChart(attackerRows);
      const tbody=document.getElementById('attacker-rows');tbody.replaceChildren();
      for(const row of attackerRows){const tr=document.createElement('tr');for(const val of [row.m,row.replicates,row.sdAcrossReplicates===null?'N/A':row.sdAcrossReplicates.toFixed(5),row.theoreticalSE.toFixed(5)]){const td=document.createElement('td');td.textContent=String(val);tr.append(td);}tbody.append(tr);}
      latestCsv=buildReportCsv(parameters,stats,comparison,attackerRows);
      exportButton.disabled=false;
      status.textContent=`Completed ${result.m.toLocaleString('en-US')} paths × ${result.n.toLocaleString('en-US')} steps, plus ${comparison.length} comparison sizes (${comparison[0].m.toLocaleString('en-US')} paths each). Seed: ${result.seed}.`;
    } catch(error){status.textContent=`Error: ${error.message}`;}
    finally{runButton.disabled=false;}
  },0));
}
document.getElementById('model').addEventListener('change',updateModelControls);
runButton.addEventListener('click',()=>run(readParameters()));
updateModelControls();run(DEFAULT_CONFIG);
