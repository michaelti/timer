<script>
	export let text = '0:00';
</script>

<form>
	<input placeholder={text} maxlength="5" aria-label="Type time, then enter" />
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
