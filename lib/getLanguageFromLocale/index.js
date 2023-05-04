"use strict";

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.match");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.languageRexExp = exports.getLanguageFromLocale = void 0;
var languageRexExp = /^([a-z]{2})(-.*)?/;
exports.languageRexExp = languageRexExp;

var getLanguageFromLocale = function getLanguageFromLocale(locale) {
  var _locale$match$, _locale$match;

  return (_locale$match$ = (_locale$match = locale.match(languageRexExp)) === null || _locale$match === void 0 ? void 0 : _locale$match[1]) !== null && _locale$match$ !== void 0 ? _locale$match$ : null;
};

exports.getLanguageFromLocale = getLanguageFromLocale;
//# sourceMappingURL=index.js.map
