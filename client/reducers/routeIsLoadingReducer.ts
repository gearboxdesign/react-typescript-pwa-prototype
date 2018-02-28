import { ILoadAction, IsLoadingState } from 'actions';
import ActionTypes from 'actions/actionTypes';
import { Reducer } from 'redux';

const INITIAL_STATE: IsLoadingState = false;

// tslint:disable-next-line max-line-length
const routeIsLoadingReducer: Reducer<IsLoadingState> = (state: IsLoadingState = INITIAL_STATE, action: ILoadAction): IsLoadingState => {

	const { type, value } = action;

	switch (type) {

		case ActionTypes.RouteIsLoading: {
			return value;
		}
		default: {
			return state;
		}
	}
};

export default routeIsLoadingReducer;
