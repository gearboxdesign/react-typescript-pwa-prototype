interface IHTTPErrorOptions {
	errors?: string[];
	status?: number;
}

export function createHttpError(message: string, options: IHTTPErrorOptions = {}): IHTTPError {

	const { status, errors } = options,
		error: IHTTPError = new Error(message);

	if (status) {
		error.status = status;
	}

	if (errors) {
		error.errors = errors;
	}

	return error;
}
