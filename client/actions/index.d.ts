import { Action } from 'redux';

export type IAsyncAction<TAsyncData = any> = Action & IAsyncState<TAsyncData>;

export type IsLoadingState = boolean;

export interface ILoadAction extends Action {
	value: IsLoadingState;
}
