export function sampleRademacher(rng = Math.random) {
  return rng() < 0.5 ? -1 : 1;
}
export const RADEMACHER_MEAN = 0;
export const RADEMACHER_VARIANCE = 1;
