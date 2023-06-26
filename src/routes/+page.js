import { browser } from '$app/environment';

export function load() {
	if (!browser) {
		return { duration: 0 };
	}

	let fromURL = new URLSearchParams(window.location.search).get('t') * 60000;
	fromURL = Math.min(fromURL, 5999000); // max 99m59s

	let fromStorage = Number(localStorage.getItem('custom-duration'));
	fromURL = Math.min(fromStorage, 5999000); // max 99m59s

	return { duration: fromURL || fromStorage || 300000 };
}
