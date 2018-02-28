import Example from 'components/Example';
import RouteComponent, { IRouteComponentProps } from 'hoc/RouteComponent';
import React from 'react';
import { RouteComponentProps } from 'react-router';

// NOTE: RouteComponentProps<(ROUTE_PARAMETERS)>
export interface ISub1Props extends RouteComponentProps<{}> {}

const Dashboard: React.SFC<ISub1Props & IRouteComponentProps> = (props) => {

	return (
		<div>
			<h1>Sub 1</h1>
			<Example />
		</div>
	);
};

export default RouteComponent<ISub1Props>(Dashboard);
