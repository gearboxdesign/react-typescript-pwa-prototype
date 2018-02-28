import { ILoadAction, IsLoadingState } from 'actions';
import ActionTypes from 'actions/actionTypes';
import { Reducer } from 'redux';

const INITIAL_STATE: IsLoadingState = false;

// tslint:disable-next-line max-line-length
const appIsLoadingReducer: Reducer<IsLoadingState> = (state: IsLoadingState = INITIAL_STATE, action: ILoadAction): IsLoadingState => {

	const { type, value } = action;

	switch (type) {

		case ActionTypes.AppIsLoading: {
			return value;
		}
		default: {
			return state;
		}
	}
};

export default appIsLoadingReducer;
