<script>
  /**
   * @type {{delta: number, avg_delta: number}}
   */
  let { delta, avg_delta } = $props();

  const avg_error_score = $derived.by(() => {
    const difference = Math.abs(avg_delta - delta);
    const ratio = difference / avg_delta;
    return ratio * 100;
  });

  const dot_color = $derived.by(() => {
    /** @type {[string, number][]} */
    const colors = [
      ["lightblue", 5],
      ["blue", 20],
      ["orange", 70],
      ["red", 200],
      ["black", 500],
    ];
    const score = avg_error_score;
    const index = colors.findIndex(([_, threshold]) => threshold >= score);
    if (index === -1) {
      return colors[colors.length - 1][0];
    }
    if (index === 0) {
      return colors[0][0];
    }
    const [lower_color, lower_thresh] = colors[index - 1];
    const [upper_color, upper_thresh] = colors[index];
    const ratio = (score - lower_thresh) / (upper_thresh - lower_thresh);
    return `color-mix(in hsl, ${lower_color}, ${upper_color} ${ratio * 100}%)`;
  });
</script>

<span class="bpm_dot bounce_appear" style={`background-color: ${dot_color}`}
></span>

<style>
  .bpm_dot {
    display: inline-block;
    width: var(--dot-size);
    height: var(--dot-size);
    margin: var(--dot-margin);
    border-radius: 50%;
    transition: background-color 0.2s;
  }

  .bounce_appear {
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
