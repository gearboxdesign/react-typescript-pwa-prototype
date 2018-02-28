import { ILoadAction, IsLoadingState } from 'actions';
import { getExample, loadRoute } from 'actions/actionCreators';
import Main, { IMainProps } from 'components/Main';
import History from 'history';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { IAsyncExampleState } from 'reducers/exampleReducer';
import { Dispatch } from 'redux';
import { IStoreState } from 'store';

export type IMainContainerProps = IBaseProps & IMapStateToProps;

interface IBaseProps {}

interface IMapStateToProps {
	example: IAsyncExampleState;
	routeIsLoading: IsLoadingState;
}

interface IMapDispatchToProps {
	getExampleHandler: () => Promise<IAsyncExampleState>;
	loadRouteHandler: (value: IsLoadingState) => ILoadAction;
}

const mapStateToProps = (state: IStoreState): IMapStateToProps => {

	const { example, routeIsLoading } = state;

	return {
		example,
		routeIsLoading
	};
};

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>): IMapDispatchToProps => {

	return {
		getExampleHandler: () => {
			return dispatch(getExample());
		},
		loadRouteHandler: (value) => {
			return dispatch(loadRoute(value));
		}
	};
};

class MainContainer extends React.Component<IMainContainerProps & IMapDispatchToProps & IMainProps> {

	private historyListener: History.UnregisterCallback;

	public componentDidMount() {

		const { history, getExampleHandler } = this.props;

		this.historyListener = history.listen(this.historyChangeHandler.bind(this));

		getExampleHandler();
	}

	public componentWillUnmount() {

		// NOTE: Unsubscribes historyListener.
		this.historyListener();
	}

	private historyChangeHandler(location: History.Location) {

		const { location: currentLocation, loadRouteHandler } = this.props;

		if (location.pathname !== currentLocation.pathname) {
			loadRouteHandler(true);
		}
	}

	public render() {

		const { loadRouteHandler, getExampleHandler, ...restProps } = this.props;

		return <Main { ...restProps } />;
	}
}

// tslint:disable-next-line max-line-length
export default withRouter(connect<IMapStateToProps, IMapDispatchToProps, IBaseProps & IMainProps>(mapStateToProps, mapDispatchToProps)(MainContainer));
