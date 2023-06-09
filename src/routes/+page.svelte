<script>
	import Timer from '../components/Timer.svelte';
</script>

<main>
	<Timer />
</main>

<style>
	:global(*, *::before, *::after) {
		box-sizing: inherit;
	}

	:global(html) {
		box-sizing: border-box;
		--timer-size: min(75vmin, 25rem);
	}

	:global(body) {
		margin: 0;
		background-color: #1358db;
		color: #fff;
		font-family: 'Avenir Next', -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui,
			helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif;
		overflow: hidden;
	}

	:global(body::backdrop) {
		background-color: #1358db;
	}

	main {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
