import { IMainContainerProps } from 'containers/MainContainer';
import History from 'history';
import RouteError from 'hoc/RouteError';
import React, { ReactElement } from 'react';
import { RouteComponentProps, RouteProps } from 'react-router';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { Action } from 'redux';
import * as routes from 'routes';
import routeConfig, { IPartialRouteProps } from 'routes/config';
import './styles.scss';

export interface IMainProps extends RouteComponentProps<any> {}

const Main: React.SFC<IMainProps & IMainContainerProps> = (props) => {

	return (
		<main className="main">
			{ props.routeIsLoading && <p>Loading</p> }
			<NavLink to="/">Dashboard</NavLink>
			<NavLink to="/monitoring/1">Monitoring</NavLink>
			<NavLink to="/admin">Admin</NavLink>
			<Switch>
				{ routeConfig.map(getRoute) }
				<Route component={ RouteError(routes.Error, { status: 404 }) } />
			</Switch>
		</main>
	);
};

// TODO: Add correct type.
function getRoute(configProps: IPartialRouteProps): ReactElement<RouteProps> {

	const { componentId, ...routeProps } = configProps,
		component = componentId && routes[componentId];

	if (!component) {
		throw new Error('Routes configuration is missing property "componentId"');
	}

	return (
		<Route
			component={ component }
			key={ componentId }
			{ ...routeProps }
		/>
	);
}

export default Main;
