import React from 'react';
import { RouteComponentProps } from 'react-router';
import RouteComponent, { IRouteComponentProps } from 'hoc/RouteComponent';
import Example from 'components/Example';

// NOTE: RouteComponentProps<(ROUTE_PARAMETERS)>
export interface ISub2Props extends RouteComponentProps<{}> {}

const Dashboard:React.SFC<ISub2Props & IRouteComponentProps> = (props) => {

	return (
		<div>
			<h1>Sub 2</h1>
			<Example />
		</div>
	);
}

export default RouteComponent<ISub2Props>(Dashboard);