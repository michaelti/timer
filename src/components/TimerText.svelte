<script>
	export let text = '0:00';
</script>

<div>{text}</div>

<style>
	div {
		font-size: calc(var(--timer-size) / 4);
		font-weight: 600;
		font-feature-settings: 'tnum';
		font-variant-numeric: tabular-nums;
		pointer-events: none;
		text-align: center;
		z-index: 1;
	}
</style>
