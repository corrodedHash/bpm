<script>
    import { scale } from "svelte/transition";
    /**
     * @type {Object}
     * @property {number[]} clicks
     * @property {number} avg_delta
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
    const deltas = $derived.by(() => {
        return clicks
            .slice(1)
            .map(
                (
                    /** @type {number} */ v,
                    /** @type {string | number} */ index,
                ) => v - clicks[index],
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
    {#each deltas as d}
        <span
            class="bpm_dot bounce_appear"
            style={`background-color: ${dot_color(d)}`}
        ></span>
        <!-- in:scale={{ duration: 700, start: 0.1 }} -->
    {/each}
</div>

<style>
    .bpm_dot_box {
        border-style: solid;
        border-width: 20px;
        border-color: transparent;
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
