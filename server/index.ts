import * as apicache from 'apicache';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import apicacheConfig from 'config/apicache.config';
import helmetConfig from 'config/helmet.config';
import staticConfig from 'config/static.config';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import errorHandler from 'handlers/errorHandler';
import * as helmet from 'helmet';
import nonce from 'middlewares/nonce';
import serveFile from 'middlewares/serveFile';
import * as path from 'path';
import apiRouter from 'routes/api';
import appRouter from 'routes/app';

dotenv.config({ silent: true });

// TODO: Resolve auto-linting issue, (caused by moving the tslint files around!).
const app: express.Application = express(),
	dev: boolean = process.env.NODE_ENV === 'development';

// App Settings
app.set('view engine', 'ejs');
// TODO: Gather from config.
app.set('views', 'server/views');
app.set('port', process.env.PORT);
app.set('apicache', apicache.newInstance(apicacheConfig));

// App Middlewares
app.use(nonce);
app.use(cors());
app.use(compression());
app.use(helmet(helmetConfig));

// TODO: Gather from config.
app.use('/public', express.static(path.join(__dirname, 'public'), staticConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// App Routes
app.use('/api', apiRouter(app));
// TODO: Refactor and gather from config?
app.use('/sw.js', serveFile(path.join(__dirname, 'sw.js')));
app.use(appRouter(app));

// Catch Error Handler
app.use(errorHandler);

// Init
app.listen(app.get('port'));
