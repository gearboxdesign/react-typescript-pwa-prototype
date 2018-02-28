import * as express from 'express';
import { createHttpError } from 'lib/errorFactory';

const exampleCtrl: express.Handler = (req, res, next) => {

	return res.status(200).json({ id: 1 });
	// return next(createHttpError('Example error', { status: 500 }));
};

export default exampleCtrl;
