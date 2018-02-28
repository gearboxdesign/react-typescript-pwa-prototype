import { IAsyncAction } from 'actions';
import { getJSON, sendJSON } from 'lib/fetchJSON';
import { get } from 'lodash';
import { Action, Dispatch } from 'redux';
import { IStoreState } from 'store';
import getAsyncState from 'store/getAsyncState';

export default function fetchAction<TAsyncData>(dispatch: Dispatch<IStoreState>, action: Action) {

	return (url: string, options: RequestInit = {}): Promise<IAsyncAction<TAsyncData>> => {

		dispatchLoadingAction(dispatch, action);

		const promise = options.method === 'get' ?
			getJSON<TAsyncData>(url, options) :
			sendJSON<TAsyncData>(url, options);

		return promise
			.then(dispatchSuccessAction<TAsyncData>(dispatch, action))
			.catch(dispatchFailedAction(dispatch, action));
	};
}

function dispatchLoadingAction(dispatch: Dispatch<IStoreState>, action: Action): IAsyncAction {

	return dispatch(Object.assign({}, action, getAsyncState()));
}

function dispatchSuccessAction<TAsyncData>(dispatch: Dispatch<IStoreState>, action: Action) {

	return (data: TAsyncData): IAsyncAction<TAsyncData> => {
		return dispatch(Object.assign({}, action, getAsyncState<TAsyncData>({ data })));
	};
}

function dispatchFailedAction(dispatch: Dispatch<IStoreState>, action: Action) {

	return (error: IHTTPError): IAsyncAction => {
		return dispatch(Object.assign({}, action, getAsyncState({ error })));
	};
}
