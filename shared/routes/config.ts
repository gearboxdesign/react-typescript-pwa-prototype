import { RouteProps } from 'react-router';

export type IPartialRouteProps = RouteProps & {
	componentId?: string
};

const ROUTES: IPartialRouteProps[] = [{
	componentId: 'Dashboard',
	exact: true,
	path: '/',
},
{
	componentId: 'Monitoring',
	path: '/monitoring/:id'
},
{
	componentId: 'Admin',
	path: '/admin'
}];

export default ROUTES;
