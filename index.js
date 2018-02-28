'use strict';

require('app-module-path').addPath('./dist/server');
require('app-module-path').addPath('./dist/shared');

// Init Server
require('./dist/server');