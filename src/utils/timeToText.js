export default function timeToText(time) {
	const seconds = Math.ceil(time / 1000);

	const clockMinutes = Math.floor(seconds / 60);
	const clockSeconds = seconds % 60;

	const strMinutes = String(clockMinutes).padStart(1, '0');
	const strSeconds = String(clockSeconds).padStart(2, '0');

	const text = strMinutes + ':' + strSeconds;

	return text;
}
