
const key = 'places';

export function getPlaces () {
	return JSON.parse(localStorage.getItem(key));
}

export function savePlaces (places) {
	localStorage.setItem(key, JSON.stringify(places));
}