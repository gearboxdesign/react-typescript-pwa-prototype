// tslint:disable no-console
import activate from 'events/activate';
import install from 'events/install';
import intercept from 'events/intercept';

const sw = self as ServiceWorkerGlobalScope;

sw.addEventListener('install', install);
sw.addEventListener('activate', activate);
sw.addEventListener('fetch', intercept);
