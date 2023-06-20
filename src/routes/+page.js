import { browser } from '$app/environment';

export function load() {
	let num;

	if (browser) {
		num = Number(localStorage.getItem('custom-duration'));
	}

	return { duration: num || 300000 };
}
