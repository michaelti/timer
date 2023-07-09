export function load({ cookies, url }) {
	const defaultDuration = 300000; // 5mins
	const maxDuration = 5999000; // 99m59s
	const minDuration = 0;

	const fromURL = Number(url.searchParams.get('t')) * 60000;
	const fromStored = Number(cookies.get('custom-duration'));

	let duration = fromURL || fromStored || defaultDuration;
	duration = Math.min(duration, maxDuration);
	duration = Math.max(duration, minDuration);

	return { duration };
}
