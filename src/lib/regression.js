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

export const truncated_weighted_mean = (/** @type {number[]} */ points) => {
  const deltas = dropOutliers(pointDifferences(points), 0.125);
  console.log(deltas)
  const weighted = deltas.map((v, index) => {
    const weight = Math.min(deltas.length - index, index + 1);
    return v * weight;
  }).reduce((a, b) => a + b);
  // The sequence we use for the weight is actually the quarter-squares sequence (1,2,4,6,9,12,16,20,25)
  const counter_weight = Math.floor(Math.pow((deltas.length + 1), 2) / 4)
  return weighted / counter_weight;
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

/**
 * Drop the highest and lowest values from an array of numbers.
 * @param {Array<number>} points - An array of numbers.
 * @param {number} threshold - The fraction of the data to remove.
 * @return {Array<number>} A sorted list of numbers with the highest and lowest values removed.
 */

const dropOutliers = (/** @type {number[]} */ points, /** @type {number} */ threshold) => {
  if (threshold < 0 || threshold > 1) {
    throw new Error('Threshold must be between 0 and 1');
  }

  const sortedPoints = [...points].sort((a, b) => a - b);
  console.log(sortedPoints)
  console.log(points)
  const k = Math.floor(sortedPoints.length * threshold);
  if (k == 0) {
    return sortedPoints
  }


  return sortedPoints.slice(k, - k);
};