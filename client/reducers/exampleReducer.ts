import { IAsyncAction } from 'actions';
import ActionTypes from 'actions/actionTypes';
import { Reducer } from 'redux';
import getAsyncState from 'store/getAsyncState';

export interface IExampleState {
	id: string;
}

export type IAsyncExampleState = IAsyncState<IExampleState> | null;

const INITIAL_STATE: IAsyncExampleState = null;

// tslint:disable-next-line max-line-length
const exampleReducer: Reducer<IAsyncExampleState> = (state: IAsyncExampleState = INITIAL_STATE, action: IAsyncAction<IExampleState>): IAsyncExampleState => {

	const { type } = action;

	switch (type) {

		case ActionTypes.GetExample: {
			return getAsyncState<IExampleState>(action, state);
		}
		default: {
			return state;
		}
	}
};

export default exampleReducer;
