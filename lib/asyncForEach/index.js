"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = asyncForEach;
const tslib_1 = require("tslib");
function asyncForEach(fn, collection) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        for (const item of collection) {
            yield fn(item);
        }
    });
}
//# sourceMappingURL=index.js.map