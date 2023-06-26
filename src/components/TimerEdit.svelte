<script>
	import textToTime from '../utils/textToTime';
	import { createEventDispatcher } from 'svelte';

	export let text;

	const dispatch = createEventDispatcher();

	let typedText = '';
	let prevTypedText = '';

	function handleFocus() {
		dispatch('edit');
	}

	function handleBlur() {
		const newTime = textToTime(typedText);
		dispatch('save', newTime);
		typedText = '';
		prevTypedText = '';
	}

	function handleInput(event) {
		// If inserting text, add helpers
		if (typedText.length > prevTypedText.length) {
			// Helper: If colon entered first, add a 0 before it
			if (typedText[0] === ':') {
				typedText = '0' + typedText;
			}

			// Helper: If first digit is a zero, add a colon
			if (typedText[0] === '0' && typedText.length === 1) {
				typedText = typedText + ':';
			}

			// Helper: If first two digits entered, add a colon
			if (typedText.length >= 2 && !typedText.includes(':')) {
				let modifiedString = typedText.split('');
				modifiedString.splice(2, 0, ':');
				modifiedString = modifiedString.join('');
				typedText = modifiedString;
			}
		}

		// Limit to digits and colons
		typedText = typedText.replace(/[^0-9:]/g, '');

		// Limit to one colon
		typedText = typedText.replace(/:(?=.*:)/g, '');

		// Limit to two digits on each side of colon
		if (typedText.includes(':')) {
			const split = typedText.split(':');
			let beforeColon = split[0] || '';
			let afterColon = split[1] || '';
			beforeColon = beforeColon.substring(0, 2);
			afterColon = afterColon.substring(0, 2);
			typedText = beforeColon + ':' + afterColon;
		}

		prevTypedText = typedText;
	}
</script>

<form>
	<input
		on:focus={handleFocus}
		on:blur={handleBlur}
		placeholder={text}
		maxlength="5"
		aria-label="Type the desired time, then press enter"
		bind:value={typedText}
		on:input={handleInput}
	/>
</form>

<style>
	form {
		position: absolute;
	}

	form:focus-within {
		z-index: 2;
	}

	input {
		font: inherit;
		color: inherit;
		width: calc(var(--timer-size) * 0.8);
		height: calc(var(--timer-size) * 0.8);
		font-size: calc(var(--timer-size) / 4);
		border: none;
		padding: 0;
		border-radius: 50%;
		background-color: #003fc2;
		font-weight: 600;
		font-feature-settings: 'tnum';
		font-variant-numeric: tabular-nums;
		text-align: center;
		opacity: 0;
		transition: opacity 0.1s;
	}

	input::placeholder {
		color: rgba(0, 0, 0, 0.2);
		opacity: 1;
	}

	input:hover {
		opacity: 1;
	}

	input:focus {
		opacity: 1;
		outline: none;
	}
</style>
