import Chart from 'chart.js/auto';
let chart;
export function renderVarianceComparison(rows) {
  chart?.destroy();
  const series=[
    ['Var(Sₙ)','empiricalVarianceTotal','theoreticalVarianceTotal','#2dd4bf'],
    ['Var(Sₙ/n)','empiricalVarianceAverage','theoreticalVarianceAverage','#60a5fa'],
    ['Var(Sₙ/√n)','empiricalVarianceNormalized','theoreticalVarianceNormalized','#fbbf24']
  ];
  chart=new Chart(document.getElementById('variance'),{
    type:'line',data:{datasets:series.flatMap(([label,emp,theory,color])=>[
      {label:`${label} empirical`,data:rows.map(r=>({x:r.n,y:r[emp]})),borderColor:color,pointRadius:3},
      {label:`${label} theory`,data:rows.map(r=>({x:r.n,y:r[theory]})),borderColor:color,borderDash:[5,5],pointRadius:0}
    ])},options:{responsive:true,maintainAspectRatio:false,animation:false,
      scales:{x:{type:'logarithmic',title:{display:true,text:'Systems n (log scale)'}},
        y:{type:'logarithmic',title:{display:true,text:'Variance (log scale)'}}}}});
}
