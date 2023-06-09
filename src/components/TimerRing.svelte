<script>
	export let progress;

	$: remainingOffset = Math.PI * 2 - progress * Math.PI;
	$: elapsedOffset = Math.PI - progress * Math.PI;
</script>

<svg width="100" height="100" viewBox="0 0 100 100">
	<clipPath id="clip-circle">
		<circle r="50" cx="50" cy="50" />
	</clipPath>
	<circle
		class="remaining"
		r="50"
		cx="50"
		cy="50"
		clip-path="url(#clip-circle)"
		stroke-dasharray={Math.PI * 100}
		stroke-dashoffset={remainingOffset * 100}
	/>
	<circle
		class="elapsed"
		r="50"
		cx="50"
		cy="50"
		clip-path="url(#clip-circle)"
		stroke-dasharray={Math.PI * 100}
		stroke-dashoffset={elapsedOffset * 100}
	/>
</svg>

<style>
	svg {
		position: absolute;
		z-index: -1;
		width: var(--timer-size);
		height: var(--timer-size);
	}

	.remaining,
	.elapsed {
		stroke-width: 10%;
		fill: transparent;
		/* axis compensation */
		transform: rotate(-90deg);
		transform-origin: 50% 50%;
	}

	.remaining {
		stroke: #003fc2;
	}

	.elapsed {
		stroke: #ffcf00;
	}
</style>
