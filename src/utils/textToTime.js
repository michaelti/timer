export default function textToTime(text) {
	// If there's no input, exit
	if (!text) {
		return;
	}

	// If the input contains anything but numbers and colons, exit
	if (/^[0-9:]*$/.test(text)) {
		return;
	}

	// If the input is a simple number, just convert it to minutes
	if (!isNaN(text)) {
		const timeInMs = text * 60000;
		return timeInMs;
	}

	// Parse the string to digits
	const digits = text.split(':');

	// If there aren't at least two digits, exit
	if (digits.length < 2) {
		return;
	}

	const minutesInMs = digits[0] * 60000;
	const secondsInMs = digits[1] * 1000;
	const timeInMs = minutesInMs + secondsInMs;

	return timeInMs;
}
