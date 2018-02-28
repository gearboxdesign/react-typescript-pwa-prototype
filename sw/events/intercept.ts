// tslint:disable no-console
import fromCache from 'strategies/fromCache';
import fromNetwork from 'strategies/fromNetwork';

const sw = self as ServiceWorkerGlobalScope;

const SIDE_EFFECT_VERBS: string[] = ['POST', 'PUT', 'DELETE'];

export default function intercept(evt: FetchEvent) {

	console.info('SW intercept', evt.request.url);

	const { request } = evt;

	// TODO: Review this flow.
	// NOTE: Since SW only has scope on this domain, external requests would be unaffected.
	// NOTE: Order is important here, consider with caution.
	const strategy =
		// NOTE: Case - Request has a side effect, (i.e. POST, PUT or DELETE method).
		hasSideEffect(request) ? fetch(request) :
		// NOTE: Case - Request is directed towards the API.
		isAPIRequest(request) ? caches.open(CACHE_NAMES.API_CACHE)
			.then((cache) => fromNetwork(evt, cache, { setCache: true }))
			// NOTE: Case - Request cannot be satisifed from network or cache.
			.catch(jsonErrorHandler) :
		// NOTE: Case - Request is for a static asset, (i.e. has an extension signifiying it is a file).
		isAsset(request) ? caches.open(CACHE_NAMES.ASSET_CACHE)
			.then((cache) => fromCache(evt, cache)) :
		// NOTE: Case - Request likely a standard route which must return the base route response.
		isRoute(request) ? caches.open(CACHE_NAMES.BASE_CACHE)
			.then((cache) => fromCache(evt, cache, { cacheKey: '/' })) :
		// NOTE: Case - Default pass through of network request.
		fetch(request);

	evt.respondWith(strategy);
}

function isRoute(req: Request): boolean {
	return !isAsset(req);
}

function isAsset(req: Request): boolean {
	// TODO: Test this RegEx for edge cases.
	return /(\.\w+)$/.test(req.url);
}

function isAPIRequest(req: Request): boolean {
	return /\/api\//.test(req.url);
}

function hasSideEffect(req: Request): boolean {
	return SIDE_EFFECT_VERBS.includes(req.method);
}

function jsonErrorHandler(error) {

	return new Response(JSON.stringify({
		errors: [navigator.onLine ? 'Not Found' : 'This resource is unavailable offline, please try again later.']
	}), {
		headers: { 'Content-Type': 'application/json' },
		status: 404,
		statusText: 'Not Found'
	});
}
