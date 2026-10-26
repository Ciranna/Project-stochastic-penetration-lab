import Chart from 'chart.js/auto';
import { histogramDensity, standardNormalPdf } from '../statistics/distributions.js';
let instance;
export function renderHistogram(values, standardized = false) {
  instance?.destroy();
  if (!values.length) { document.getElementById('histogram-note').textContent='No standardized distribution: Bernoulli p=0 or p=1 has zero variance.'; return; }
  document.getElementById('histogram-note').textContent = standardized ? 'Centered and standardized Bernoulli score (extra CLT analysis).' : 'Rademacher score Sₙ/√n.';
  const bins=histogramDensity(values,-4,4,32);
  instance=new Chart(document.getElementById('histogram'),{
    data:{datasets:[
      {type:'bar',label:'Simulated density',data:bins,parsing:false,backgroundColor:'rgba(45,212,191,.55)',borderWidth:0,barPercentage:1,categoryPercentage:1},
      {type:'line',label:'Standard normal',data:Array.from({length:161},(_,i)=>{const x=-4+i*.05;return {x,y:standardNormalPdf(x)};}),parsing:false,borderColor:'#fbbf24',borderWidth:2.5,pointRadius:0,tension:.25}
    ]},options:{responsive:true,maintainAspectRatio:false,animation:false,
      scales:{x:{type:'linear',min:-4,max:4,title:{display:true,text:standardized?'(Sₙ−np)/√(np(1−p))':'Sₙ / √n'}},y:{beginAtZero:true,title:{display:true,text:'Probability density'}}}}});
}
