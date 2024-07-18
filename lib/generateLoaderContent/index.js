"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.join");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.array.sort");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
require("core-js/modules/es.string.split");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateLoaderContent;
var _formatLocale = _interopRequireDefault(require("@ringcentral-integration/i18n/lib/formatLocale"));
var _dedent = _interopRequireDefault(require("dedent"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _templateObject() {
  var data = _taggedTemplateLiteral(["export default function loadLocale(locale) {\n          return ", "null;\n    }\n"], ["export default function loadLocale(locale) {\n          return ", "null;\n    }\\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function getBaseName(f) {
  return f.replace(/\.(js|json|ts)$/i, '');
}
function returnLoadLocaleCode(chunk, locale, basename) {
  var code = "require('./".concat(basename, "')");
  if (chunk) {
    return "import(/* webpackChunkName: \"".concat(locale, "\" */'./").concat(basename, "')");
  }
  return code;
}

/**
 * @typedef GLCOptions
 * @property {String[]} files
 * @property {Boolean} [chunk]
 *
 */
/**
 * @function
 * @description Generate js code for localeLoader according the files listed.
 * @param {GLCOptions} options
 */
function generateLoaderContent( /** @type {GLCOptions} */_ref) {
  var files = _ref.files,
    _ref$chunk = _ref.chunk,
    chunk = _ref$chunk === void 0 ? true : _ref$chunk,
    _ref$supportedLocales = _ref.supportedLocales,
    supportedLocales = _ref$supportedLocales === void 0 ? [] : _ref$supportedLocales;
  // create sort function
  var sortIdx = {};
  supportedLocales.forEach(function (locale, idx) {
    sortIdx[(0, _formatLocale["default"])(locale)] = idx;
  });
  var byLocale = function byLocale(a, b) {
    var _sortIdx$ta, _sortIdx$tb;
    var ta = (0, _formatLocale["default"])(getBaseName(a));
    var tb = (0, _formatLocale["default"])(getBaseName(b));
    var aIdx = (_sortIdx$ta = sortIdx[ta]) !== null && _sortIdx$ta !== void 0 ? _sortIdx$ta : -1;
    var bIdx = (_sortIdx$tb = sortIdx[tb]) !== null && _sortIdx$tb !== void 0 ? _sortIdx$tb : -1;
    if (aIdx === bIdx) {
      // -1 or ta === tb
      if (ta === tb) {
        return 0;
      }
      return ta > tb ? 1 : -1;
    }
    // smaller index has priority
    return aIdx > bIdx ? 1 : -1;
  };
  var usedLang = {};
  var cases = files.sort(byLocale).map(function (f) {
    var basename = getBaseName(f);
    var locale = (0, _formatLocale["default"])(basename);
    var lang = locale.split('-')[0];
    var isChunk = typeof chunk === 'function' ? chunk(locale) : chunk;
    var returnCode = returnLoadLocaleCode(isChunk, locale, basename);
    var langDefaultCase = '';
    if (!usedLang[lang]) {
      usedLang[lang] = true;
      langDefaultCase = "locale==='".concat(lang, "'||");
    }
    return "".concat(langDefaultCase, "\n    locale==='").concat(locale, "'? ").concat(returnCode, ":");
  });
  var value = (0, _dedent["default"])(_templateObject(), cases.join(''));
  return value;
}
//# sourceMappingURL=index.js.map
