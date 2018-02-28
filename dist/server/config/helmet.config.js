"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dev = process.env.NODE_ENV === 'development';
// tslint:disable quotemark
const config = Object.freeze({
    contentSecurityPolicy: !dev && {
        browserSniff: false,
        directives: {
            defaultSrc: ["'self'"],
            frameSrc: ["'none'"],
            imgSrc: [
                "'self'",
                'data:'
            ],
            scriptSrc: [
                "'self'",
                (req, res) => {
                    return `'nonce-${res.locals.nonce}'`;
                }
            ],
            styleSrc: [
                "'self'",
                "'unsafe-inline'"
            ]
        }
    }
});
// tslint:enable quotemark
exports.default = config;
//# sourceMappingURL=helmet.config.js.map