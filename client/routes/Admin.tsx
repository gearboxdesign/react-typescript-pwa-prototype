import { IAdminProps } from 'components/Admin';
import AsyncComponent from 'components/AsyncComponent';
import RouteComponent from 'hoc/RouteComponent';
import RouteError from 'hoc/RouteError';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import ErrorRoute from 'routes/Error';

const Admin: React.SFC<IAdminProps> = (props) => {

	return (
		<AsyncComponent
			// TODO: Consider creating a utility component to avoid this repetition.
			errorComponent={ RouteComponent(RouteError(ErrorRoute, { status: 404 })) }
			// tslint:disable-next-line jsx-no-lambda
			getComponent={ () => import(/* webpackChunkName: "admin" */ 'components/Admin') }
			{ ...props }
		/>
	);
};

export default Admin;
