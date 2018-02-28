"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonErrorHandler = (error, req, res, next) => {
    return res.status(error.status || 500).json({ errors: error.errors || [error.message] });
};
exports.default = jsonErrorHandler;
//# sourceMappingURL=jsonErrorHandler.js.map