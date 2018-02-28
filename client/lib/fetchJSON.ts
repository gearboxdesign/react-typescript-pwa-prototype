import { createHttpError } from 'lib/errorFactory';
import { merge } from 'lodash';

const HTTP_VERBS = {
	DELETE: 'delete',
	GET: 'get',
	POST: 'post',
	PUT: 'put'
};

const FETCH_DEFAULTS: Partial<RequestInit> = {
	credentials: 'same-origin',
	mode: 'cors',
	redirect: 'follow'
};

export function getJSON<TAsyncData>(url: string, options: RequestInit): Promise<TAsyncData> {

	return request<TAsyncData>(url, merge({}, FETCH_DEFAULTS, {
		cache: 'default',
		headers: {
			Accept: 'application/json'
		},
		method: HTTP_VERBS.GET
	}, options));
}

export function sendJSON<TAsyncData>(url: string, options: RequestInit): Promise<TAsyncData> {

	return request<TAsyncData>(url, merge({}, FETCH_DEFAULTS, {
		headers: Object.assign({
			Accept: 'application/json'
		}, options.method && [HTTP_VERBS.POST, HTTP_VERBS.PUT].includes(options.method.toLowerCase()) && {
			'Content-Type': 'application/json'
		}),
		method: 'post'
	}, options));
}

function request<TAsyncData>(url: string, options: RequestInit): Promise<TAsyncData> {

	return fetch(url, options).then((response: Response) => {

		return response.json().then((json: any) => {

			return response.ok ? json : Promise.reject(createHttpError(response.statusText, {
				errors: json.errors,
				status: response.status
			}));

		}, (error: Error) => {
			return Promise.reject(createHttpError(`JSON Error: ${ error.message }`));
		});

	}, (error: Error) => {
		return Promise.reject(createHttpError(`Fetch Error: ${ error.message }`));
	});
}
