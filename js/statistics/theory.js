export function modelMoments(model, p = 0.3) {
  if (model === 'rademacher') return { mu: 0, sigma2: 1 };
  if (model === 'bernoulli' && Number.isFinite(p) && p >= 0 && p <= 1)
    return { mu: p, sigma2: p * (1 - p) };
  throw new RangeError('Invalid probability model or p');
}
export function theoreticalMoments(n, model, p = 0.3) {
  if (!Number.isSafeInteger(n) || n < 1) throw new RangeError('Invalid n');
  const {mu, sigma2} = modelMoments(model,p);
  return { meanTotal: n*mu, varianceTotal: n*sigma2,
    meanAverage: mu, varianceAverage: sigma2/n,
    meanNormalized: Math.sqrt(n)*mu, varianceNormalized: sigma2 };
}
