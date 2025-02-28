import { expect, test } from "vitest";
import { linear_least_squares, truncated_weighted_mean } from "./regression.js";

test("basic linear regression", () => {
  expect(linear_least_squares([0, 1, 2, 3])).toBeCloseTo(1);
});

test("truncated weighted mean", () => {
  expect(truncated_weighted_mean([0, 0, 1, 3, 6])).toBeCloseTo(1.5);
});
