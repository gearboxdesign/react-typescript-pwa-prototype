import Example from 'components/Example';
import RouteComponent, { IRouteComponentProps } from 'hoc/RouteComponent';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import './styles.scss';

// NOTE: RouteComponentProps<(ROUTE_PARAMETERS)>
export interface IDashboardProps extends RouteComponentProps<{}> {}

const Dashboard: React.SFC<IDashboardProps & IRouteComponentProps> = (props) => {

	return (
		<div className="dashboard">
			<h1>Dashboard</h1>
			<Example />
		</div>
	);
};

export default RouteComponent<IDashboardProps>(Dashboard);
