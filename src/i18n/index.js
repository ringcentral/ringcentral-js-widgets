"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = void 0;
const tslib_1 = require("tslib");
const i18n_1 = tslib_1.__importDefault(require("@ringcentral-integration/i18n"));
const utils_1 = require("@ringcentral-integration/utils");
// @ts-expect-error
const loadLocale_1 = tslib_1.__importDefault(require("./loadLocale"));
const i18n = new i18n_1.default(loadLocale_1.default);
exports.t = (0, utils_1.getTranslateFn)(i18n);
exports.default = i18n;
//# sourceMappingURL=index.js.map