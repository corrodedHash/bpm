<script>
  import BpmDot from "./BPMDot.svelte";

  /**
   * @type {{clicks: number[], avg_delta: number}}
   */
  let { clicks, avg_delta } = $props();

  const deltas = $derived.by(() => {
    return clicks
      .slice(1)
      .map(
        (/** @type {number} */ v, /** @type {string | number} */ index) =>
          v - clicks[index]
      );
  });

  const animation_point_ratio = () => {
    return ((Date.now() - clicks[clicks.length - 1]) / avg_delta) % 1;
  };
  /** @type {HTMLDivElement} */
  let dotbox;

  let animation_request = undefined;
  const pulse_animation = () => {
    const r = animation_point_ratio();
    dotbox.style.borderColor = `color-mix(in hsl, blue, green ${Math.min(100, 100 * (r * 3))}%)`;
    animation_request = requestAnimationFrame(pulse_animation);
  };
  $effect(() => {
    if (animation_request !== undefined) {
      cancelAnimationFrame(animation_request);
    }
    pulse_animation();
  });
</script>

<div
  class="bpm_dot_box"
  class:bpm_starting={clicks.length > 0}
  bind:this={dotbox}
>
  {#each deltas as delta}
    <BpmDot {delta} {avg_delta} />
  {/each}
</div>

<style>
  .bpm_dot_box {
    --dot-margin: 0.2em;
    --dot-size: 1em;
    --box-padding: 0.3em;
    border-style: solid;
    border-width: 20px;
    border-color: transparent;
    height: calc(3 * (var(--dot-size) + 2 * var(--dot-margin)));
    width: calc(
      (var(--dot-size) + var(--dot-margin) * 2) * 16 + 2 * var(--box-padding)
    );
    flex-wrap: wrap;
    border-radius: 8px;
    padding: var(--box-padding);
    display: flex;
    justify-content: center;
  }

  .bpm_starting {
    background-color: green;
  }
</style>
