export const linear_least_squares = (/** @type {number[]} */ points) => {
  const adjusted_points = points.map((v) => v - points[0]).slice(1);
  const A_T_b = adjusted_points
    .map((v, index) => v * (index + 1))
    .reduce((a, b) => a + b);
  // Faulhaber's formula
  const A_T_A =
    (Math.pow(adjusted_points.length, 3) +
      (Math.pow(adjusted_points.length, 2) * 3) / 2 +
      adjusted_points.length / 2) /
    3;
  const x = A_T_b / A_T_A;
  return x;
};

export const median = (/** @type {number[]} */ points) => {
  const deltas = pointDifferences(points);
  deltas.sort((a, b) => a - b);
  const mid = Math.floor(deltas.length / 2);
  if (deltas.length % 2 === 0) {
    return (deltas[mid - 1] + deltas[mid]) / 2;
  } else {
    return deltas[mid];
  }
};

/**
 * Calculate the differences between adjacent points.

 * @param {Array<number>} points - An array of 1D points.
 * @return {Array<number>} A list of differences between adjacent points.
 */
const pointDifferences = (points) => {
  const differences = [];
  for (let i = 1; i < points.length; i++) {
    const diff = Math.abs(points[i] - points[i - 1]);
    differences.push(diff);
  }
  return differences;
}