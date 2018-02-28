// tslint:disable no-console
import * as logger from 'lib/logger';
import passThrough from 'lib/passThrough';
import validateResponse from 'strategies/lib/validateResponse';

interface IRequestFromCacheOptions {
	updateCache?: boolean;
	cacheKey?: boolean | string;
}

export default function fromCache(evt: FetchEvent, cache: Cache, options: IRequestFromCacheOptions = {
	cacheKey: false,
	updateCache: true
}): Promise<Response> {

	const { request } = evt,
		cacheKey: string | Request = options.cacheKey as string || request;

	return cache.match(cacheKey)
		.then(validateResponse)
		.then(logger.info('SW cached response'))
		.catch((error) => {

			return fetch(request)
				.then(validateResponse)
				.then(options.updateCache ? (response: Response) => {

					cache.put(cacheKey, response.clone());
					logger.info('SW network response')(response);

					return response;
				} : passThrough);
		});
}
