import Preloader from 'components/Preloader';
import { IAppContainerProps } from 'containers/AppContainer';
import MainContainer from 'containers/MainContainer';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

export interface IAppProps {}

const App: React.SFC<IAppProps & IAppContainerProps> = (props) => {

	const { appIsLoading } = props;

	return appIsLoading ? <Preloader /> : <AppRouter />;
};

const AppRouter: React.SFC = (props) => {

	return (
		<Router>
			<MainContainer />
		</Router>
	);
};

export default App;
