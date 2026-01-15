"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = consolidateLocale;
const tslib_1 = require("tslib");
const defaultConfig_1 = tslib_1.__importDefault(require("../defaultConfig"));
const importLocale_1 = tslib_1.__importDefault(require("../importLocale"));
function consolidateLocale() {
    return tslib_1.__awaiter(this, arguments, void 0, function* ({ sourceFolder = defaultConfig_1.default.sourceFolder, sourceLocale = defaultConfig_1.default.sourceLocale, supportedLocales, interactive = defaultConfig_1.default.interactive, silent = defaultConfig_1.default.silent, } = {}) {
        return (0, importLocale_1.default)({
            sourceFolder,
            sourceLocale,
            supportedLocales,
            interactive,
            silent,
        });
    });
}
//# sourceMappingURL=index.js.map