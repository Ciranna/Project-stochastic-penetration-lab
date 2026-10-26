const escapeCsv=value=>`"${String(value ?? '').replaceAll('"','""')}"`;
export function toCsv(headers, rows){
  return [headers,...rows].map(row=>row.map(escapeCsv).join(',')).join('\r\n')+'\r\n';
}
export function buildReportCsv(parameters, stats, comparison, attackerRows){
  const lines=[['Section','Metric','n','m','Empirical','Theoretical'],
    ['settings','model',parameters.n,parameters.m,parameters.model,''],
    ['settings','p',parameters.n,parameters.m,parameters.p,''],
    ['settings','seed',parameters.n,parameters.m,parameters.seed,''],
    ['summary','mean total',parameters.n,parameters.m,stats.empiricalMeanTotal,stats.theoreticalMeanTotal],
    ['summary','variance total',parameters.n,parameters.m,stats.empiricalVarianceTotal,stats.theoreticalVarianceTotal],
    ['summary','mean average',parameters.n,parameters.m,stats.empiricalMeanAverage,stats.theoreticalMeanAverage],
    ['summary','variance average',parameters.n,parameters.m,stats.empiricalVarianceAverage,stats.theoreticalVarianceAverage],
    ['summary','variance normalized',parameters.n,parameters.m,stats.empiricalVarianceNormalized,stats.theoreticalVarianceNormalized],
    ...comparison.flatMap(row=>[
      ['comparison','mean average',row.n,row.m,row.empiricalMeanAverage,row.theoreticalMeanAverage],
      ['comparison','variance normalized',row.n,row.m,row.empiricalVarianceNormalized,row.theoreticalVarianceNormalized],
      ['comparison','deviation probability',row.n,row.m,row.errorProbability,'']]),
    ...attackerRows.map(row=>['attacker sensitivity','standard error',parameters.n,row.m,row.sdAcrossReplicates,row.theoreticalSE])];
  return toCsv(lines[0],lines.slice(1));
}
