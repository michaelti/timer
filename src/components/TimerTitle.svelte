<script>
	export let text;
	export let progress;

	function setFavicon(progress) {
		const miniRingEl = ringEl.cloneNode(true);
		const miniRingCircleEl = miniRingEl.querySelector('.timer-ring__circle');
		const miniRingBackgroundEl = miniRingEl.querySelector('.timer-ring__background');

		// Modify the cloned ring to look better at small size
		miniRingCircleEl.style.strokeWidth = '33%';
		miniRingBackgroundEl.style.strokeWidth = '33%';

		const circumference = miniRingEl.getAttribute('width') * Math.PI;

		miniRingCircleEl.style.strokeDasharray = `${circumference} ${circumference}`;
		miniRingCircleEl.style.strokeDashoffset = circumference - progress * circumference;

		miniRingBackgroundEl.style.strokeDasharray = `${circumference} ${circumference}`;
		miniRingBackgroundEl.style.strokeDashoffset = circumference * 2 - progress * circumference;

		const SVG = new XMLSerializer().serializeToString(miniRingEl);
		const dataURL = 'data:image/svg+xml;base64,' + btoa(SVG);
		const favicon = document.querySelector('link[rel=icon]');
		favicon.setAttribute('href', dataURL);
	}
</script>

<svelte:head>
	<title>{text} {progress}</title>
</svelte:head>
