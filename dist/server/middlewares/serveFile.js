"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendFile(filePath) {
    return (req, res) => {
        return res.status(200).sendFile(filePath);
    };
}
exports.default = sendFile;
//# sourceMappingURL=serveFile.js.map