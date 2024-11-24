<script>
  let deltas = $state([]);
  let last_click = $state(0);
  let bpm = $state(0);

  const calc_bpm = () => {
    if (deltas.length === 0) {
      return "??";
    } else {
      const RECENT_ENTRY_COUNT = 5;
      const recent_delta_weighted_average =
        deltas
          .slice(-RECENT_ENTRY_COUNT)
          .reverse()
          .reduce((p, c) => p * 2 + c) /
        (Math.pow(2, Math.min(deltas.length, RECENT_ENTRY_COUNT)) - 1);
      return Math.round(60 / (recent_delta_weighted_average / 1000));
    }
  };

  const as_bpm_color = () => {
    return "lightblue";
  };

  const increment = () => {
    const n = Date.now();
    if (last_click !== 0) {
      const delta = n - last_click;
      last_click = n;
      deltas.push(delta);
    } else {
      last_click = n;
    }
  };
</script>

<div class="counter_box">
  <div>
    {calc_bpm()}
  </div>
  <div class="bpm_dot_box" class:bpm_starting={last_click !== 0}>
    {#each deltas as d}
      <span class="bpm_dot" style={`background-color: ${as_bpm_color()}`}
      ></span>
    {/each}
  </div>

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
  .bpm_dot_box {
    min-height: calc(1em + 2 * 0.2em);
    width: calc((1em + 0.2em) * 16 + 0.6em);
    flex-wrap: wrap;
    border-radius: 8px;
    padding: 0.3em;
    display: flex;
    justify-content: center;
  }
  .bpm_starting {
    background-color: green;
  }

  .bpm_dot {
    display: inline-block;
    width: 1em;
    height: 1em;
    margin: 0.2em;
    border-radius: 50%;
    animation-name: bpm_dot_appear;
    animation-duration: 0.7s;
  }
  @keyframes bpm_dot_appear {
    0% {
      transform: scale(0.6);
      opacity: 0;
    }
    10% {
      transform: scale(0.1);
      opacity: 1;
    }
    80% {
      transform: scale(1.4);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
