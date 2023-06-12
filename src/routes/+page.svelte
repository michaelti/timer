<script>
	import Timer from '../components/Timer.svelte';
	export let data;
</script>

<main>
	<Timer duration={data.duration} />
</main>

<style>
	main {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
