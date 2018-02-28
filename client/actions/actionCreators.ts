import { ILoadAction, IsLoadingState } from 'actions';
import ActionTypes from 'actions/actionTypes';
import fetchAction from 'actions/fetchAction';
import { IExampleState } from 'reducers/exampleReducer';
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IStoreState } from 'store';

export function loadApp(value: IsLoadingState): ILoadAction {

	return {
		type: ActionTypes.AppIsLoading,
		value
	};
}

export function loadRoute(value: IsLoadingState): ILoadAction {

	return {
		type: ActionTypes.RouteIsLoading,
		value
	};
}

export function getExample(): ThunkAction<Promise<IAsyncState<IExampleState>>, IStoreState, void> {

	return (dispatch: Dispatch<IStoreState>) => {

		const action: Action = {
			type: ActionTypes.GetExample
		};

		return fetchAction<IExampleState>(dispatch, action)(`/api/example`, {
			method: 'get'
		});
	};
}
