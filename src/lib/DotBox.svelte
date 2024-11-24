<script>
    /**
     * @prop {number[]} clicks
     * @prop {number} avg_delta
     */
    let { clicks, avg_delta } = $props();
    const avg_error_score = (/** @type {number} */ delta) => {
        return Math.abs(Math.round((delta / avg_delta - 1) * 100));
    };
    const dot_color = (/** @type {number} */ delta) => {
        const score = avg_error_score(delta);
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
    };
    const deltas = () => {
        return clicks.slice(1).map((v, index) => v - clicks[index]);
    };
</script>

<div class="bpm_dot_box" class:bpm_starting={clicks.length > 0}>
    {#each deltas() as d}
        <span class="bpm_dot" style={`background-color: ${dot_color(d)}`}
        ></span>
    {/each}
</div>

<style>
    .bpm_dot_box {
        height: calc(3 * (1em + 2 * 0.2em));
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
        transition: background-color 0.2s;
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
