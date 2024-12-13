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
    const score = avg_error_score;
    if (score < 5) {
      return "lightblue";
    }
    if (score < 20) {
      return "blue";
    }
    if (score < 70) {
      return "orange";
    }
    if (score < 200) {
      return "red";
    }
    return "black";
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
