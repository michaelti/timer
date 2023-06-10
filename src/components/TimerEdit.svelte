<script>
	import textToTime from '../utils/textToTime';
	import isValidText from '../utils/isValidText';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let text;
	let newText = '';
	let prevNewText = '';
	$: newTime = textToTime(newText);

	function handleFocus() {
		dispatch('edit');
	}

	function handleBlur() {
		dispatch('save', newTime);
		newText = '';
	}

	function handleInput(event) {
		// TODO:
		// - Make the mask better
		// - Move the mask to a util

		// If inserting text, add helpers
		if (newText.length > prevNewText.length) {
			// Helper: If colon entered first, add a 0 before it
			if (newText[0] === ':') {
				newText = '0' + newText;
			}

			// Helper: If first two digits entered, add a colon
			if (newText.length >= 2 && !newText.includes(':')) {
				let modifiedString = newText.split('');
				modifiedString.splice(2, 0, ':');
				modifiedString = modifiedString.join('');
				newText = modifiedString;
			}
		}

		// Limit to digits and colons
		newText = newText.replace(/[^0-9:]/g, '');

		// Limit to one colon
		newText = newText.replace(/:(?=.*:)/g, '');

		// Limit to two digits on each side of colon
		if (newText.includes(':')) {
			const split = newText.split(':');
			let beforeColon = split[0] || '';
			let afterColon = split[1] || '';
			beforeColon = beforeColon.substring(0, 2);
			afterColon = afterColon.substring(0, 2);
			newText = beforeColon + ':' + afterColon;
		}

		prevNewText = newText;
	}
</script>

<form>
	<input
		on:focus={handleFocus}
		on:blur={handleBlur}
		placeholder={text}
		maxlength="5"
		aria-label="Type the desired time, then press enter"
		bind:value={newText}
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
