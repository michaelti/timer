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
		stroke="#003fc2"
		r="50"
		cx="50"
		cy="50"
		stroke-width="10"
		fill="transparent"
		transform="rotate(-90)"
		transform-origin="50 50"
		clip-path="url(#clip-circle)"
		stroke-dasharray={Math.PI * 100}
		stroke-dashoffset={remainingOffset * 100}
	/>
	<circle
		stroke="#ffcf00"
		r="50"
		cx="50"
		cy="50"
		stroke-width="10"
		fill="transparent"
		transform="rotate(-90)"
		transform-origin="50 50"
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
</style>
