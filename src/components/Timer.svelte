<script>
	import TimerEdit from './TimerEdit.svelte';
	import TimerText from './TimerText.svelte';
	import TimerRing from './TimerRing.svelte';
	import timeToText from '../utils/timeToText';
	import { onMount } from 'svelte';

	export let duration;
	let startTime = Date.now();
	let endTime = startTime + duration;

	let timeRemaining = duration;
	let timePausedAt = 0;

	$: text = timeToText(timeRemaining);
	$: timeElapsed = duration - timeRemaining;
	$: progress = timeElapsed / duration;

	function clock() {
		if (timePausedAt) return;

		timeRemaining = endTime - Date.now();
		if (timeRemaining <= 0) timeRemaining = 0;
	}

	function animate() {
		clock();
		requestAnimationFrame(animate);
	}

	function setDuration(newDuration) {
		document.cookie = `custom-duration=${newDuration};max-age=31536000`;
		duration = Math.min(newDuration, 5999000); // max 99m59s
		startTime = Date.now();
		endTime = startTime + duration;
		timeRemaining = endTime - Date.now();
		timePausedAt = 0;
	}

	function pause() {
		timePausedAt = Date.now();
	}

	function unpause({ detail: newDuration }) {
		endTime += Date.now() - timePausedAt;
		timePausedAt = 0;

		if (newDuration) {
			setDuration(newDuration);
		}
	}

	onMount(() => {
		animate();
		setInterval(clock, 1000); // Force even when tab is inactive
	});
</script>

<svelte:head>
	<title>{text}</title>
</svelte:head>

<TimerText {text} />
<TimerEdit {text} on:edit={pause} on:save={unpause} />
<TimerRing {progress} {timeElapsed} introDuration={1000} />
