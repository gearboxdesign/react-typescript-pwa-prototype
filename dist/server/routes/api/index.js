"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const jsonErrorHandler_1 = require("handlers/jsonErrorHandler");
const exampleCtrl_1 = require("./controllers/exampleCtrl");
const missingCtrl_1 = require("./controllers/missingCtrl");
const dev = process.env.NODE_ENV === 'development';
function apiRouter(app) {
    const router = express.Router();
    router.use(app.get('apicache').middleware(dev ? 0 : process.env.CACHE_DURATION_API));
    router.get('/example', exampleCtrl_1.default);
    router.use(missingCtrl_1.default);
    router.use(jsonErrorHandler_1.default);
    return router;
}
exports.default = apiRouter;
//# sourceMappingURL=index.js.map