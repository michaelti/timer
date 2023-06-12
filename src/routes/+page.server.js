export function load({ cookies }) {
	const defaultDuration = 300000; // 5 mins
	const storedStr = cookies.get('custom-duration');
	const storedNum = storedStr && Number(storedStr);
	const duration = storedNum || defaultDuration;

	return { duration };
}
