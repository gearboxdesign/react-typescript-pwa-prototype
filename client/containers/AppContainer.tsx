import { IsLoadingState } from 'actions';
import App, { IAppProps } from 'components/App';
import React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from 'store';

export type IAppContainerProps = IBaseProps & IMapStateToProps;

interface IBaseProps {}

interface IMapStateToProps {
	appIsLoading: IsLoadingState;
}

const mapStateToProps = (state: IStoreState): IMapStateToProps => {

	const { appIsLoading } = state;

	return {
		appIsLoading
	};
};

// tslint:disable-next-line max-line-length
export default connect<IMapStateToProps, null, IBaseProps & IAppProps>(mapStateToProps)(App);
