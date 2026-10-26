import Chart from 'chart.js/auto';
let chart;
export function renderConvergence(rows,mu,epsilon) {
  chart?.destroy();
  chart=new Chart(document.getElementById('convergence'),{
    type:'line',data:{datasets:[
      {label:'Empirical mean Sₙ/n',data:rows.map(r=>({x:r.n,y:r.empiricalMeanAverage})),borderColor:'#2dd4bf',pointRadius:4},
      {label:'Theoretical mean μ',data:rows.map(r=>({x:r.n,y:mu})),borderColor:'#fbbf24',borderDash:[7,5],pointRadius:0}
    ]},options:{responsive:true,maintainAspectRatio:false,animation:false,
      plugins:{title:{display:true,text:'Law of Large Numbers — empirical mean'}},
      scales:{x:{type:'logarithmic',title:{display:true,text:'Systems n (log scale)'}},y:{title:{display:true,text:'Mean score'}}}}});
}
let errorChart;
export function renderErrorProbability(rows,epsilon) {
  errorChart?.destroy();
  errorChart=new Chart(document.getElementById('lln-error'),{
    type:'line',data:{datasets:[{label:`P(|Sₙ/n − μ| > ${epsilon})`,data:rows.map(r=>({x:r.n,y:r.errorProbability})),borderColor:'#60a5fa',pointRadius:4}]},
    options:{responsive:true,maintainAspectRatio:false,animation:false,
      scales:{x:{type:'logarithmic',title:{display:true,text:'Systems n (log scale)'}},y:{min:0,max:1,title:{display:true,text:'Estimated probability'}}}}});
}
