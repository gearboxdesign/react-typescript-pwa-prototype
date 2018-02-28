declare var process: {
	env: {
		NODE_ENV: string,
		SERVICE_WORKER_ENABLED: string
	}
};

declare module '*!json' {
	var value: any;
	export default value;
}

declare var PUBLIC_PATH: string;

declare interface IHTTPError extends Error {
	errors?: string[];
	status?: number;
}

declare interface IAsyncState<TAsyncData = any> {
	readonly data?: TAsyncData | null;
	readonly error?: IHTTPError | null;
	readonly loading: boolean;
}
