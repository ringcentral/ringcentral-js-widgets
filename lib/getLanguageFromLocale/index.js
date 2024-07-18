"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLanguageFromLocale = exports.languageRexExp = void 0;
const constants_1 = require("../../constants");
exports.languageRexExp = /^([a-z]{2})(-.*)?/;
const getLanguageFromLocale = (locale) => {
    var _a, _b;
    return (_b = (_a = locale.match(exports.languageRexExp)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : constants_1.DEFAULT_LOCALE;
};
exports.getLanguageFromLocale = getLanguageFromLocale;
//# sourceMappingURL=index.js.map