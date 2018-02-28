import AsyncComponent from 'components/AsyncComponent';
import { IDashboardProps } from 'components/Dashboard';
import RouteComponent from 'hoc/RouteComponent';
import RouteError from 'hoc/RouteError';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import ErrorRoute from 'routes/Error';

const Dashboard: React.SFC<IDashboardProps> = (props) => {

	return (
		<AsyncComponent
			// TODO: Consider creating a utility component to avoid this repetition.
			errorComponent={ RouteComponent(RouteError(ErrorRoute, { status: 404 })) }
			// tslint:disable-next-line jsx-no-lambda
			getComponent={ () => import(/* webpackChunkName: "dashboard" */ 'components/Dashboard') }
			{ ...props }
		/>
	);
};

export default Dashboard;
