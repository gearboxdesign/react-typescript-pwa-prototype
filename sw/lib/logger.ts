// tslint:disable no-console
export function log(...content: any[]) {

	return <TData> (data: TData): TData => {

		console.log(...content, data);

		return data;
	};
}

export function info(...content: any[]) {

	return <TData> (data: TData): TData => {

		console.info(...content, data);

		return data;
	};
}

export function error(...content: any[]) {

	return <TData> (data: TData): TData => {

		console.error(...content, data);

		return data;
	};
}
