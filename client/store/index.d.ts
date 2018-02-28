import { IsLoadingState } from 'actions';
import { IAsyncExampleState } from 'reducers/exampleReducer';

export interface IStoreState {
	readonly appIsLoading: IsLoadingState;
	readonly example: IAsyncExampleState;
	readonly routeIsLoading: IsLoadingState;
}
