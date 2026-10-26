const fmt = x => Number(x).toFixed(4);
export function readParameters() {
  return { model:document.getElementById('model').value,
    p:Number(document.getElementById('probability').value),
    n:Number(document.getElementById('systems').value),
    m:Number(document.getElementById('attackers').value),
    seed:Number(document.getElementById('seed').value),
    epsilon:Number(document.getElementById('epsilon').value) };
}
export function updateModelControls() {
  const bernoulli=document.getElementById('model').value==='bernoulli';
  document.getElementById('probability').disabled=!bernoulli;
  document.getElementById('probability-label').classList.toggle('muted',!bernoulli);
}
export function renderSummary(result, stats, epsilon, errorProbability, diagnostics) {
  const metrics=[
    ['E[Sₙ] empirical / theory',`${fmt(stats.empiricalMeanTotal)} / ${fmt(stats.theoreticalMeanTotal)}`],
    ['Var(Sₙ) empirical / theory',`${fmt(stats.empiricalVarianceTotal)} / ${fmt(stats.theoreticalVarianceTotal)}`],
    ['Var(Sₙ/n) empirical / theory',`${fmt(stats.empiricalVarianceAverage)} / ${fmt(stats.theoreticalVarianceAverage)}`],
    ['Var(Sₙ/√n) empirical / theory',`${fmt(stats.empiricalVarianceNormalized)} / ${fmt(stats.theoreticalVarianceNormalized)}`],
    [`P(|Sₙ/n − μ| > ${epsilon})`,fmt(errorProbability)],
    ['Standardized CLT variance',diagnostics?fmt(diagnostics.variance):'N/A (zero variance)']
  ];
  const target=document.getElementById('metrics');target.replaceChildren();
  for(const [label,value] of metrics){const item=document.createElement('div');item.className='metric';const heading=document.createElement('span');heading.textContent=label;const number=document.createElement('strong');number.textContent=value;item.append(heading,number);target.append(item);}
  const mu=result.model==='rademacher'?0:result.p;
  document.getElementById('interpretation').textContent=`For ${result.model} with n=${result.n} and m=${result.m}, the increment mean μ=${fmt(mu)}. The variance of Sₙ increases linearly in n, the variance of Sₙ/n decreases as 1/n, and the variance of Sₙ/√n stays constant. The LLN predicts convergence in probability of Sₙ/n to μ. ${result.model==='rademacher'?'The CLT predicts that Sₙ/√n approaches N(0,1) in distribution.':result.p>0&&result.p<1?'For Bernoulli, the centered and standardized score approaches N(0,1); the uncentered Sₙ/√n does not.':'At p=0 or p=1, all scores are deterministic and CLT standardization is undefined.'} Increasing m gives more observations for estimating these properties, without changing the distribution of an individual attacker.`;
}
export function renderComparisonTable(rows) {
  const tbody=document.getElementById('comparison-rows');tbody.replaceChildren();
  for(const r of rows){const tr=document.createElement('tr');for(const val of [r.n,fmt(r.empiricalMeanAverage),fmt(r.theoreticalMeanAverage),fmt(r.errorProbability),fmt(r.empiricalVarianceNormalized),fmt(r.theoreticalVarianceNormalized)]){const td=document.createElement('td');td.textContent=String(val);tr.append(td);}tbody.append(tr);}
}
