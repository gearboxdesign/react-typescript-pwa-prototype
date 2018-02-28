import { noop } from 'lodash/fp';
import React from 'react';

interface IModule {
	default: any;
}

interface IAsyncComponentProps {
	getComponent: () => Promise<IModule>;
	errorComponent: React.ComponentType<{ errors?: string[] }>;
	successHandler?: () => void;
	errorHandler?: (error: string) => void;
}

interface IAsyncComponentState {
	Component: React.ComponentType | null;
	errors?: string[];
}

export default class AsyncComponent extends React.PureComponent<IAsyncComponentProps, IAsyncComponentState>  {

	public state: IAsyncComponentState = {
		Component: null
	};

	public componentWillMount() {

		this.loadComponent();
	}

	private async loadComponent() {

		const { getComponent, successHandler = noop, errorHandler = noop } = this.props;

		try {
			const module = await getComponent();

			this.setState({ Component: module.default }, successHandler);
		}
		catch (error) {

			const errStr = error.toString();

			this.setState({ errors: [errStr] }, errorHandler.bind(null, errStr));
		}
	}

	public render() {

		const { Component, errors } = this.state,
			{ errorComponent: ErrorComponent, getComponent, successHandler, errorHandler, ...restProps } = this.props;

		// TODO: Replace with external components.
		return Component ?
			<Component { ...restProps } /> : errors ?
			<ErrorComponent errors={ errors } /> :
			<div>Loading</div>;
	}
}
