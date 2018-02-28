import AsyncComponent from 'components/AsyncComponent';
import { IMonitoringProps } from 'components/Monitoring';
import RouteComponent from 'hoc/RouteComponent';
import RouteError from 'hoc/RouteError';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import ErrorRoute from 'routes/Error';

const Monitoring: React.SFC<IMonitoringProps> = (props) => {

	return (
		<AsyncComponent
			// TODO: Consider creating a utility component to avoid this repetition.
			errorComponent={ RouteComponent(RouteError(ErrorRoute, { status: 404 })) }
			// tslint:disable-next-line jsx-no-lambda
			getComponent={ () => import(/* webpackChunkName: "monitoring" */ 'components/Monitoring') }
			{ ...props }
		/>
	);
};

export default Monitoring;
