<script>
	import { afterUpdate } from 'svelte';
	import easeCubic from '../utils/easeCubic';

	export let progress;
	export let timeElapsed;
	export let introDuration;

	let prevProgress;
	let startFromProgress = 1;
	$: displayProgress = progress;

	$: {
		if (progress < prevProgress) startFromProgress = prevProgress;
		prevProgress = progress;
	}

	$: if (timeElapsed < introDuration) {
		const start = startFromProgress;
		const end = 2 + progress - startFromProgress;

		displayProgress = easeCubic(timeElapsed, start, end, introDuration);
	}

	$: elapsedOffset = Math.PI - displayProgress * Math.PI;
	$: remainingOffset = elapsedOffset + Math.PI;

	let svgEl;
	let uri =
		'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3Ryb2tlLXdpZHRoPSIxMCIgY2xhc3M9InMtMk9manZHOEJzcE5TIiBzdHlsZT0ic3Ryb2tlLXdpZHRoOiAzM3B4OyI+PGNsaXBQYXRoIGlkPSJjbGlwLWNpcmNsZSIgY2xhc3M9InMtMk9manZHOEJzcE5TIj48Y2lyY2xlIHI9IjUwIiBjeD0iNTAiIGN5PSI1MCIgY2xhc3M9InMtMk9manZHOEJzcE5TIi8+PC9jbGlwUGF0aD48Y2lyY2xlIHN0cm9rZT0iIzAwM2ZjMiIgcj0iNTAiIGN4PSI1MCIgY3k9IjUwIiBmaWxsPSJ0cmFuc3BhcmVudCIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwKSIgdHJhbnNmb3JtLW9yaWdpbj0iNTAgNTAiIGNsaXAtcGF0aD0idXJsKCNjbGlwLWNpcmNsZSkiIHN0cm9rZS1kYXNoYXJyYXk9IjMxNC4xNTkyNjUzNTg5NzkzIiBzdHJva2UtZGFzaG9mZnNldD0iNjI4LjMxODUzMDcxNzk1ODciIGNsYXNzPSJzLTJPZmp2RzhCc3BOUyIvPjxjaXJjbGUgc3Ryb2tlPSIjZmZjZjAwIiByPSI1MCIgY3g9IjUwIiBjeT0iNTAiIGZpbGw9InRyYW5zcGFyZW50IiB0cmFuc2Zvcm09InJvdGF0ZSgtOTApIiB0cmFuc2Zvcm0tb3JpZ2luPSI1MCA1MCIgY2xpcC1wYXRoPSJ1cmwoI2NsaXAtY2lyY2xlKSIgc3Ryb2tlLWRhc2hhcnJheT0iMzE0LjE1OTI2NTM1ODk3OTMiIHN0cm9rZS1kYXNob2Zmc2V0PSIzMTQuMTU5MjY1MzU4OTc5MyIgY2xhc3M9InMtMk9manZHOEJzcE5TIi8+PC9zdmc+';

	function setIcon() {
		if (!svgEl) return;

		const clonedSvgEl = svgEl.cloneNode(true);

		clonedSvgEl.style.strokeWidth = '33';

		const serialized = new XMLSerializer().serializeToString(clonedSvgEl);
		uri = 'data:image/svg+xml;base64,' + btoa(serialized);
	}

	afterUpdate(() => setIcon());
</script>

<svelte:head>
	<link rel="icon" href={uri} />
</svelte:head>

<svg bind:this={svgEl} viewBox="0 0 100 100" stroke-width="10">
	<clipPath id="clip-circle">
		<circle r="50" cx="50" cy="50" />
	</clipPath>
	<circle
		stroke="#003fc2"
		r="50"
		cx="50"
		cy="50"
		fill="transparent"
		transform="rotate(-90)"
		transform-origin="50 50"
		clip-path="url(#clip-circle)"
		stroke-dasharray="{Math.PI * 100} {Math.PI * 100}"
		stroke-dashoffset={remainingOffset * 100}
	/>
	<circle
		stroke="#ffcf00"
		r="50"
		cx="50"
		cy="50"
		fill="transparent"
		transform="rotate(-90)"
		transform-origin="50 50"
		clip-path="url(#clip-circle)"
		stroke-dasharray="{Math.PI * 100} {Math.PI * 100}"
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
