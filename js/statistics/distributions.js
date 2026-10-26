export function standardNormalPdf(x) { return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI); }
export function histogramDensity(values, min = -4, max = 4, binCount = 24) {
  if (!values.length || !(max > min) || !Number.isInteger(binCount) || binCount < 1) throw new RangeError('Invalid histogram arguments');
  const width = (max - min) / binCount;
  const counts = Array(binCount).fill(0);
  for (const value of values) {
    if (value < min || value > max) continue;
    const index = Math.min(binCount - 1, Math.floor((value - min) / width));
    counts[index]++;
  }
  return counts.map((count, i) => ({ x: min + (i + 0.5) * width, y: count / (values.length * width) }));
}
