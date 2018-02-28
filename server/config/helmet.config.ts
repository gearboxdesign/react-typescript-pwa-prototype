import * as express from 'express';
import { IHelmetConfiguration } from 'helmet';

const dev: boolean = process.env.NODE_ENV === 'development';

// tslint:disable quotemark
const config: IHelmetConfiguration = Object.freeze({
	contentSecurityPolicy: !dev && {
		browserSniff: false,
		directives: {
			defaultSrc: ["'self'"],
			frameSrc: ["'none'"],
			imgSrc: [
				"'self'",
				'data:'
			],
			scriptSrc: [
				"'self'",
				(req: express.Request, res: express.Response) => {
					return `'nonce-${ res.locals.nonce }'`;
				}
			],
			styleSrc: [
				"'self'",
				"'unsafe-inline'"
			]
		}
	}
});
// tslint:enable quotemark

export default config;
