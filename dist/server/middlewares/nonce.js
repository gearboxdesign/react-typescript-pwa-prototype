"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
const nonce = (req, res, next) => {
    res.locals.nonce = uuid.v4();
    return next();
};
exports.default = nonce;
//# sourceMappingURL=nonce.js.map