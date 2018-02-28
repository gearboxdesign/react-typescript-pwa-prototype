import * as express from 'express';
import { createHttpError } from 'lib/errorFactory';
import { get, omit, pick } from 'lodash/fp';
import { match } from 'react-router';
import { matchPath } from 'react-router-dom';
import routeConfig from 'routes/config';
import * as manifest from '../../public/asset-manifest.json';

const SCRIPT_KEYS = [
	'main.js',
	'main.css',
	'shared.css',
	'shared.js',
	'vendor.js',
	'manifest.json'
];

export default function appRouter(app: express.Application): express.Handler {

	return (req, res, next) => {

		const matchedRoute: match<any> | null = routeConfig
			.reduce((currentMatch, route) => {
				return currentMatch || matchPath(req.url, route);
			}, null);

		if (!matchedRoute) {
			return next(createHttpError('App route missing', { status: 404 }));
		}

		return res.render('templates/index', {
			// TODO: Gather from config.
			imagePath: '/public/images',
			meta: null,
			nonce: res.locals.nonce,
			og: null,
			// TODO: Replace with SW caching.
			resources: pick(SCRIPT_KEYS)(manifest),
			title: 'Prototype PWA'
		});
	};
}
