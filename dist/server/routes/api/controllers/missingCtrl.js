"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorFactory_1 = require("lib/errorFactory");
const missingCtrl = (req, res, next) => {
    return next(errorFactory_1.createHttpError('API route missing', { status: 404 }));
};
exports.default = missingCtrl;
//# sourceMappingURL=missingCtrl.js.map