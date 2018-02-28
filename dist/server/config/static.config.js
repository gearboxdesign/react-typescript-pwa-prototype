"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dev = process.env.NODE_ENV === 'development';
const config = Object.freeze({
    etag: false,
    fallthrough: false,
    lastModified: false,
    maxAge: dev ? 0 : process.env.CACHE_DURATION_STATIC
});
exports.default = config;
//# sourceMappingURL=static.config.js.map