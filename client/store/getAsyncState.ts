// TODO: Consider changing to lodash/fp varient.
import { IAsyncAction } from 'actions';
import { get, merge } from 'lodash';

// tslint:disable-next-line max-line-length
export default function getAsyncState<TAsyncData>(action?: Partial<IAsyncAction<TAsyncData>>, state?: IAsyncState<TAsyncData> | null, mergeState: boolean = false): IAsyncState<TAsyncData> {

	const actionData = get(action, 'data', null),
		actionError = get(action, 'error', null),
		stateData = get(state, 'data', null),
		stateError = get(state, 'error', null);

	return {
		data: (actionData && (mergeState ? merge({}, stateData, actionData) : actionData)) || stateData,
		error: actionError || (actionData ? null : stateError),
		loading: !(actionData || actionError)
	};
}
