import * as express from 'express';

const errorHandler: express.ErrorRequestHandler = (error: IHTTPError, req, res, next) => {

	// TODO: Implement a statically rendered version of the route error.
	return res.status(error.status || 500).send(error.errors || [error.message]);
};

export default errorHandler;
