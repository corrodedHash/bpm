import { expect, test } from "vitest";
import { linear_least_squares } from "./regression.js";

test("basic linear regression", () => {
  expect(linear_least_squares([0, 1, 2, 3])).toBeCloseTo(1);
});
