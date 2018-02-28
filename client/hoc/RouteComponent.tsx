import { ILoadAction, IsLoadingState } from 'actions';
import { loadRoute } from 'actions/actionCreators';
import History from 'history';
import { HOCComponentType } from 'hoc';
import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { IStoreState } from 'store';

export type IRouteComponentProps = IBaseProps & IMapDispatchToProps;

interface IBaseProps {}

interface IMapDispatchToProps {
	loadRouteHandler: (value: IsLoadingState) => ILoadAction;
}

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>): IMapDispatchToProps => {

	return {
		loadRouteHandler: (value) => {
			return dispatch(loadRoute(value));
		}
	};
};

// tslint:disable-next-line max-line-length
export default function RouteComponentHOC<TComponentProps>(Component: HOCComponentType<TComponentProps & IRouteComponentProps>) {

	class RouteComponent extends React.Component<TComponentProps & IRouteComponentProps> {

		public componentDidMount() {

			const { loadRouteHandler } = this.props;

			loadRouteHandler(false);
		}

		public render() {

			const { loadRouteHandler, ...restProps } = this.props as any;

			return <Component { ...restProps } />;
		}
	}

	const componentName = Component.displayName || Component.name || 'Component';

	Component.displayName = `routeComponent(${ componentName })`;
	Component.wrappedComponent = Component;

	return connect<null, IMapDispatchToProps, IBaseProps & TComponentProps>(null, mapDispatchToProps)(RouteComponent);
}
