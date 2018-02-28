import Example from 'components/Example';
import RouteComponent, { IRouteComponentProps } from 'hoc/RouteComponent';
import React from 'react';
import { RouteComponentProps } from 'react-router';

// NOTE: RouteComponentProps<(ROUTE_PARAMETERS)>
export interface IMonitoringProps extends RouteComponentProps<{ id: number }> {}

const Monitoring: React.SFC<IMonitoringProps & IRouteComponentProps> = (props) => {

	console.log(props.match.params.id);

	return (
		<div>
			<h1>Monitoring</h1>
			<Example />
		</div>
	);
};

export default RouteComponent<IMonitoringProps>(Monitoring);
