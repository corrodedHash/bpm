<script>
  import DotBox from "./DotBox.svelte";

  let clicks = $state([]);

  const linear_least_squares = () => {
    const points = clicks.slice(-5);
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
  const calc_bpm = () => {
    if (clicks.length < 2) {
      return "??";
    } else {
      const average_delta = linear_least_squares();
      return Math.round(60 / (average_delta / 1000));
    }
  };

  const as_bpm_color = () => {
    return "lightblue";
  };

  const increment = () => {
    clicks.push(Date.now());
  };
</script>

<div class="counter_box">
  <div>
    {calc_bpm()}
  </div>
  <DotBox {clicks} avg_delta={linear_least_squares()} />

  <button onclick={increment}>
    BPM is {calc_bpm()}
  </button>
</div>

<style>
  .counter_box {
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-items: center;
  }
</style>
