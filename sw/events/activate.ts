// tslint:disable no-console
const sw = self as ServiceWorkerGlobalScope;

export default function activate(evt: ExtendableEvent) {

	console.info('SW activated');

	evt.waitUntil(clearPreviousCaches()
		.then(() => sw.clients.claim())
	);
}

// TODO: Promise array contents type.
function clearPreviousCaches(): Promise<any[]> {

	const cacheWhitelist: string[] = Object.values(CACHE_NAMES);

	return caches.keys()
		.then((cacheKeys) => {

			return Promise.all(cacheKeys.map((cacheKey) => {

				if (!cacheWhitelist.includes(cacheKey)) {
					return caches.delete(cacheKey);
				}
			}));
		});
}
