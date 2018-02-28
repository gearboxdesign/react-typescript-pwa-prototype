import appIsLoading from 'reducers/appIsLoadingReducer';
import example from 'reducers/exampleReducer';
import routeIsLoading from 'reducers/routeIsLoadingReducer';
import { applyMiddleware, combineReducers, createStore, Middleware, ReducersMapObject, Store } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { IStoreState } from 'store';

const dev: boolean = process.env.NODE_ENV === 'development';

// tslint:disable-next-line max-line-length
const configureStore = (initialState: Partial<IStoreState> = {}, initialReducers: ReducersMapObject = {}): Store<IStoreState> => {

	const reducers: ReducersMapObject = Object.assign({
		appIsLoading,
		example,
		routeIsLoading
	}, initialReducers);

	const middleware: Middleware[] = [thunk];

	if (dev) {
		middleware.push(createLogger());
	}

	return createStore(
		combineReducers<IStoreState>(reducers),
		initialState as IStoreState,
		applyMiddleware(...middleware)
	);
};

export default configureStore;
