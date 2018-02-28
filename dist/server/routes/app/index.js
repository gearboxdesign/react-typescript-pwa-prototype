"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorFactory_1 = require("lib/errorFactory");
const fp_1 = require("lodash/fp");
const react_router_dom_1 = require("react-router-dom");
const config_1 = require("routes/config");
const manifest = require("../../public/asset-manifest.json");
const SCRIPT_KEYS = [
    'main.js',
    'main.css',
    'shared.css',
    'shared.js',
    'vendor.js',
    'manifest.json'
];
function appRouter(app) {
    return (req, res, next) => {
        const matchedRoute = config_1.default
            .reduce((currentMatch, route) => {
            return currentMatch || react_router_dom_1.matchPath(req.url, route);
        }, null);
        if (!matchedRoute) {
            return next(errorFactory_1.createHttpError('App route missing', { status: 404 }));
        }
        return res.render('templates/index', {
            // TODO: Gather from config.
            imagePath: '/public/images',
            meta: null,
            nonce: res.locals.nonce,
            og: null,
            // TODO: Replace with SW caching.
            resources: fp_1.pick(SCRIPT_KEYS)(manifest),
            title: 'Prototype PWA'
        });
    };
}
exports.default = appRouter;
//# sourceMappingURL=index.js.map