"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.formatLocale = void 0;
const tslib_1 = require("tslib");
const formatLocale_1 = tslib_1.__importDefault(require("./lib/formatLocale"));
exports.formatLocale = formatLocale_1.default;
tslib_1.__exportStar(require("./lib/getAcceptLocaleMap"), exports);
tslib_1.__exportStar(require("./i18n"), exports);
tslib_1.__exportStar(require("./constants"), exports);
var i18n_1 = require("./i18n");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return tslib_1.__importDefault(i18n_1).default; } });
//# sourceMappingURL=index.js.map