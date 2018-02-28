// tslint:disable no-console
const sw = self as ServiceWorkerGlobalScope;

export default function install(evt: ExtendableEvent) {

	console.info('SW installed');

	evt.waitUntil(
		Promise.all([
			cacheBase(),
			cacheAssets()
		])
		.then(() => sw.skipWaiting())
	);
}

function cacheBase(): Promise<void> {

	return caches.open(CACHE_NAMES.BASE_CACHE)
		.then((cache) => {
			cache.add('/');
		});
}

function cacheAssets(): Promise<void> {

	return Promise.all([
		caches.open(CACHE_NAMES.ASSET_CACHE),
		fetch(`${ PUBLIC_PATH }asset-manifest.json`).then((response) => response.json())
	])
	.then(([cache, manifest]) => {
		cache.addAll(Object.values(manifest));
	});
}
