"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.transformLoader = exports.consolidateLocale = exports.importLocale = exports.exportLocale = void 0;
const tslib_1 = require("tslib");
const consolidateLocale_1 = tslib_1.__importDefault(require("./lib/consolidateLocale"));
exports.consolidateLocale = consolidateLocale_1.default;
const exportLocale_1 = tslib_1.__importDefault(require("./lib/exportLocale"));
exports.exportLocale = exportLocale_1.default;
const importLocale_1 = tslib_1.__importDefault(require("./lib/importLocale"));
exports.importLocale = importLocale_1.default;
const localeLoader_1 = tslib_1.__importDefault(require("./lib/localeLoader"));
exports.default = localeLoader_1.default;
const transformLoader_1 = tslib_1.__importDefault(require("./lib/transformLoader"));
exports.transformLoader = transformLoader_1.default;
//# sourceMappingURL=index.js.map