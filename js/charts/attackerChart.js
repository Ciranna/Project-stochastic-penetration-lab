import Chart from 'chart.js/auto';
let chart;
export function renderAttackerChart(rows){
  if(chart)chart.destroy();
  const comparable=rows.filter(row=>row.sdAcrossReplicates!==null);
  chart=new Chart(document.getElementById('attacker-chart'),{
    type:'line',data:{labels:comparable.map(row=>row.m),datasets:[
      {label:'Empirical SD of estimated mean',data:comparable.map(row=>row.sdAcrossReplicates),borderColor:'#2dd4bf',tension:.2},
      {label:'Theoretical standard error',data:comparable.map(row=>row.theoreticalSE),borderColor:'#fbbf24',borderDash:[6,4],tension:.2}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:'#d9e4f3'}}},scales:{x:{title:{display:true,text:'Number of attackers (m)',color:'#a6b3c7'},ticks:{color:'#a6b3c7'}},y:{beginAtZero:true,title:{display:true,text:'Standard error of estimated mean',color:'#a6b3c7'},ticks:{color:'#a6b3c7'}}}}
  });
}
