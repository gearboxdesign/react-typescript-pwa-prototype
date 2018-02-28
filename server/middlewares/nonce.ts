import * as express from 'express';
import * as uuid from 'uuid';

const nonce: express.Handler = (req, res, next) => {

	res.locals.nonce = uuid.v4();

	return next();
};

export default nonce;
