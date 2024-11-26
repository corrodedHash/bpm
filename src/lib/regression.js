
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
