"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createHttpError(message, options = {}) {
    const { status, errors } = options, error = new Error(message);
    if (status) {
        error.status = status;
    }
    if (errors) {
        error.errors = errors;
    }
    return error;
}
exports.createHttpError = createHttpError;
//# sourceMappingURL=errorFactory.js.map