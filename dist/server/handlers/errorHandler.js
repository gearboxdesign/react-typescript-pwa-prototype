"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res, next) => {
    // TODO: Implement a statically rendered version of the route error.
    return res.status(error.status || 500).send(error.errors || [error.message]);
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map