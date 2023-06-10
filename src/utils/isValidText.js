export default function isValidText(text) {
	const regex = /^[0-9:]*$/;
	return regex.test(text);
}
