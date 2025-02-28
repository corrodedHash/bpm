<script>
  import DotBox from "./DotBox.svelte";
  import { truncated_weighted_mean } from "./regression";

  let clicks = $state([]);
  let delta_ms = $derived(
    clicks.length < 2 ? undefined : truncated_weighted_mean(clicks),
  );
  let bpm = $derived(
    clicks.length < 2 ? undefined : Math.round(60 / (delta_ms / 1000)),
  );

  const increment = () => {
    const now = Date.now();
    if (clicks.length > 0) {
      if (now - clicks[clicks.length - 1] > 2000) {
        clicks = [];
      }
    }
    clicks.push(Date.now());
  };
</script>

<div class="counter_box">
  <div>
    {bpm} BPM
  </div>
  <DotBox {clicks} avg_delta={delta_ms} />

  <button class="bpm_button" onclick={increment}>
    BPM is {bpm}
  </button>
</div>

<style>
  .counter_box {
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-items: center;
  }

  .bpm_button {
    width: 100%;
    min-height: 4em;
    border-style: solid;
    border-width: 6px;
    border-image-source: linear-gradient(to bottom, violet, blue);
    border-image-slice: 1 100%;
  }
</style>
