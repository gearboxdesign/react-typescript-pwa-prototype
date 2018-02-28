"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exampleCtrl = (req, res, next) => {
    return res.status(200).json({ id: 1 });
    // return next(createHttpError('Example error', { status: 500 }));
};
exports.default = exampleCtrl;
//# sourceMappingURL=exampleCtrl.js.map