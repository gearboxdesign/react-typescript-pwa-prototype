import * as express from 'express';

const jsonErrorHandler: express.ErrorRequestHandler = (error: IHTTPError, req, res, next) => {

	return res.status(error.status || 500).json({ errors: error.errors || [error.message] });
};

export default jsonErrorHandler;
