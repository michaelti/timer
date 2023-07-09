<script>
	import { page } from '$app/stores';
</script>

<main>
	<h1>
		{$page.error.message}
		({$page.status})
	</h1>
	<a href="/">Back to Timer</a>
</main>

<style>
	main {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	a {
		color: #fff;
	}
</style>
