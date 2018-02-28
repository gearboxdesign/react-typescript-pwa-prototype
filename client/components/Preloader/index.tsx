import React from 'react';
import { RouteComponentProps } from 'react-router';

export interface IPreloaderProps {}

const Preloader: React.SFC<IPreloaderProps> = (props) => {

	return (
		<div>
			<h1>Loading</h1>
		</div>
	);
};

export default Preloader;
