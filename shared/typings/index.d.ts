declare interface IHTTPError extends Error {
	errors?: string[];
	status?: number;
}