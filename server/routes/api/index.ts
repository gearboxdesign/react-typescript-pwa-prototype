import * as express from 'express';
import jsonErrorHandler from 'handlers/jsonErrorHandler';
import exampleCtrl from './controllers/exampleCtrl';
import missingCtrl from './controllers/missingCtrl';

const dev: boolean = process.env.NODE_ENV === 'development';

export default function apiRouter(app: express.Application): express.Router {

	const router: express.Router = express.Router();

	router.use(app.get('apicache').middleware(dev ? 0 : process.env.CACHE_DURATION_API));

	router.get('/example', exampleCtrl);

	router.use(missingCtrl);
	router.use(jsonErrorHandler);

	return router;
}
