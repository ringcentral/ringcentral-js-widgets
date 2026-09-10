"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = asyncReduce;
const tslib_1 = require("tslib");
function asyncReduce(fn, acc, collection) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let result = acc;
        for (const item of collection) {
            result = yield fn(result, item);
        }
        return result;
    });
}
//# sourceMappingURL=index.js.map