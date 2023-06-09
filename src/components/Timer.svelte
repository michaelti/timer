<script>
	import TimerEdit from './TimerEdit.svelte';
	import TimerText from './TimerText.svelte';
	import TimerRing from './TimerRing.svelte';

	let text = '0:00';
	let progress = 0.5;
</script>

<svelte:head>
	<title>{text}</title>
</svelte:head>

<TimerText {text} />
<TimerEdit {text} />
<TimerRing {progress} />
