import { browser } from '$app/environment';

export function load() {
	if (!browser) {
		return { duration: 0 };
	}

	const fromURL = new URLSearchParams(window.location.search).get('t') * 60000;
	const fromStorage = Number(localStorage.getItem('custom-duration'));

	return { duration: fromURL || fromStorage || 300000 };
}
