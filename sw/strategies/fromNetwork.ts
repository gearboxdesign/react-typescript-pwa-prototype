// tslint:disable no-console
import * as logger from 'lib/logger';
import passThrough from 'lib/passThrough';
import validateResponse from 'strategies/lib/validateResponse';

interface IRequestFromNetworkOptions {
	setCache: boolean;
}

export default function fromNetwork(evt: FetchEvent, cache: Cache, options: IRequestFromNetworkOptions = {
	setCache: false
}): Promise<Response> {

	const { request } = evt;

	return fetch(request)
		.then((response: Response) => {

			try {
				validateResponse(response);

				if (options.setCache) {

					cache.put(request, response.clone());
					logger.info('SW network response')(response);
				}

				return response;
			}
			catch (error) {

				return cache.match(request)
					.then(validateResponse)
					.then(logger.info('SW cached response'))
					.catch(() => {

						/**
						 * TODO: Consider whether or not this should ultimately reject with the response,
						 * 	This would mean the error handler would need to sniff the type, either a Response or Error
						 * 	and react accordingly, perhaps this would not best practice?
						 */
						// return Promise.reject(response);
						return response;
					});
			}
		});
}
