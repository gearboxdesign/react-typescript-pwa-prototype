import AsyncComponent from 'components/AsyncComponent';
import { IRouteErrorProps } from 'hoc/RouteError';
import React from 'react';
import { RouteComponentProps } from 'react-router';

// NOTE: RouteComponentProps<(ROUTE_PARAMETERS)>
export interface IErrorProps extends RouteComponentProps<{}> {}

const Error: React.SFC<IErrorProps & IRouteErrorProps> = (props) => {

	console.log(navigator.onLine);

	return (
		<div className="error">
			<h1>Error { props.status }</h1>
		</div>
	);
};

export default Error;
