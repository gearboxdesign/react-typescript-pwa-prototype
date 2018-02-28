import { HOCComponentType } from 'hoc';
import React from 'react';

export interface IRouteErrorProps {
	errors?: string[];
	status: number;
}

// tslint:disable-next-line max-line-length
// NOTE: 'options' parameter is used to pass on override properties which should match the IRouteErrorProps interface.
export default function RouteErrorHOC<TComponentProps>(Component: HOCComponentType<TComponentProps & IRouteErrorProps>, options: IRouteErrorProps) {

	const RouteError: React.SFC<TComponentProps & IRouteErrorProps> = (props) => {

		return <Component { ...Object.assign({}, props, options) } />;
	};

	const componentName = Component.displayName || Component.name || 'Component';

	Component.displayName = `routeError(${ componentName })`;
	Component.wrappedComponent = Component;

	return RouteError;
}
