import * as express from 'express';
import { createHttpError } from 'lib/errorFactory';

const missingCtrl: express.Handler = (req, res, next) => {

	return next(createHttpError('API route missing', { status: 404 }));
};

export default missingCtrl;
