import Sub1 from 'components/Admin/Sub1';
import Sub2 from 'components/Admin/Sub2';
import Example from 'components/Example';
import RouteComponent, { IRouteComponentProps } from 'hoc/RouteComponent';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';

// NOTE: RouteComponentProps<(ROUTE_PARAMETERS)>
export interface IAdminProps extends RouteComponentProps<{}> {}

const Admin: React.SFC<IAdminProps & IRouteComponentProps> = (props) => {

	const { match: { path, url } } = props;

	return (
		<div>
			<h1>Admin</h1>
			<Example />
			<NavLink to={ `${ url }/sub1` }>Sub 1</NavLink>
			<NavLink to={ `${ url }/sub2` }>Sub 2</NavLink>
			<Switch>
				<Route
					component={ Sub1 }
					path={ `${ path }/sub1` }
				/>
				<Route
					component={ Sub2 }
					path={ `${ path }/sub2` }
				/>
				<Redirect to={ path } />
			</Switch>
		</div>
	);
};

export default RouteComponent<IAdminProps>(Admin);
