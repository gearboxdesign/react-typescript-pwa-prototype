"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apicache = require("apicache");
const bodyParser = require("body-parser");
const compression = require("compression");
const apicache_config_1 = require("config/apicache.config");
const helmet_config_1 = require("config/helmet.config");
const static_config_1 = require("config/static.config");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const errorHandler_1 = require("handlers/errorHandler");
const helmet = require("helmet");
const nonce_1 = require("middlewares/nonce");
const serveFile_1 = require("middlewares/serveFile");
const path = require("path");
const api_1 = require("routes/api");
const app_1 = require("routes/app");
dotenv.config({ silent: true });
// TODO: Resolve auto-linting issue, (caused by moving the tslint files around!).
const app = express(), dev = process.env.NODE_ENV === 'development';
// App Settings
app.set('view engine', 'ejs');
// TODO: Gather from config.
app.set('views', 'server/views');
app.set('port', process.env.PORT);
app.set('apicache', apicache.newInstance(apicache_config_1.default));
// App Middlewares
app.use(nonce_1.default);
app.use(cors());
app.use(compression());
app.use(helmet(helmet_config_1.default));
// TODO: Gather from config.
app.use('/public', express.static(path.join(__dirname, 'public'), static_config_1.default));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// App Routes
app.use('/api', api_1.default(app));
// TODO: Refactor and gather from config?
app.use('/sw.js', serveFile_1.default(path.join(__dirname, 'sw.js')));
app.use(app_1.default(app));
// Catch Error Handler
app.use(errorHandler_1.default);
// Init
app.listen(app.get('port'));
//# sourceMappingURL=index.js.map