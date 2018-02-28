import { loadApp } from 'actions/actionCreators';
import AppContainer from 'containers/AppContainer';
import { partial } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { IStoreState } from 'store';
import configureStore from 'store/configureStore';

interface IServiceWorkerStateChangeEvent extends Event {
	target: IServiceWorkerStateChangeEventTarget;
}

interface IServiceWorkerStateChangeEventTarget extends EventTarget {
	state: string;
}

const serviceWorkerIsAvailable: boolean = Boolean('serviceWorker' in navigator) &&
	process.env.SERVICE_WORKER_ENABLED === 'true',
	store: Store<IStoreState> = configureStore({
		appIsLoading: serviceWorkerIsAvailable
	}),
	app = (
		<Provider store={ store }>
			<AppContainer />
		</Provider>
	);

// NOTE: Render App
ReactDOM.render(app, document.getElementById('app'));

// TODO: Implement message relay which will trigger 'store.dispatch(loadApp(false)' once fetch intercepts are active.
if (serviceWorkerIsAvailable) {

	navigator.serviceWorker.register('/sw.js')
		.then(awaitServiceWorkerActivation)
		.then(() => store.dispatch(loadApp(false)))
		.catch(function serviceWorkerErrorHandler(error: Error) {
			// TODO: Handle SW error.
		});
}

function awaitServiceWorkerActivation(registration: ServiceWorkerRegistration): Promise<ServiceWorkerRegistration> {

	return new Promise ((resolve, reject) => {

		const pendingServiceWorker: ServiceWorker | null = registration.installing;

		if (pendingServiceWorker) {

			const stateChangeListener: EventListener = (evt: IServiceWorkerStateChangeEvent) => {

				if (evt.target.state === 'activated') {
					pendingServiceWorker.removeEventListener('statechange', stateChangeListener);
					return resolve(registration);
				}
			};

			pendingServiceWorker.addEventListener('statechange', stateChangeListener);
		}
		// NOTE: Otherwise assume registration is active or waiting in which case the application can be ran.
		else {
			return resolve(registration);
		}
	});
}
