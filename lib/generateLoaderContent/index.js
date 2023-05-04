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

var _dedent = _interopRequireDefault(require("dedent"));

var _formatLocale = _interopRequireDefault(require("@ringcentral-integration/i18n/lib/formatLocale"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["export default function loadLocale(locale) {\n      return new Promise((resolve) => {\n        switch (locale) {", "\n          default:\n            return resolve(null);\n        }\n      });\n    }\n"], ["export default function loadLocale(locale) {\n      return new Promise((resolve) => {\n        switch (locale) {", "\n          default:\n            return resolve(null);\n        }\n      });\n    }\\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function getBaseName(f) {
  return f.replace(/\.(js|json|ts)$/i, '');
}

function returnLoadLocaleCode(chunk, locale, basename) {
  var padding = chunk ? '    ' : '  ';
  var code = "\n          ".concat(padding, "const data = require('./").concat(basename, "');\n          ").concat(padding, "return resolve(data.__esModule === true ? data.default : data);");

  if (chunk) {
    code = "\n          if (typeof require.ensure === 'function') {\n            return require.ensure(['./".concat(basename, "'], (require) => {").concat(code, "\n            }, '").concat(locale, "');\n          } else {").concat(code, "\n          }");
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


function generateLoaderContent(
/** @type {GLCOptions} */
_ref) {
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
    } // smaller index has priority


    return aIdx > bIdx ? 1 : -1;
  };

  var usedLang = {};
  var cases = files.sort(byLocale).map(function (f) {
    var basename = getBaseName(f);
    var locale = (0, _formatLocale["default"])(basename);
    var lang = locale.split('-')[0];
    var returnCode = returnLoadLocaleCode(chunk, locale, basename);
    var langDefaultCase = '';

    if (!usedLang[lang]) {
      usedLang[lang] = true;
      langDefaultCase = "\n        case '".concat(lang, "':\n      ");
    }

    return "".concat(langDefaultCase, "\n          case '").concat(locale, "': {").concat(returnCode, "\n          }");
  });
  return (0, _dedent["default"])(_templateObject(), cases.join(''));
}
//# sourceMappingURL=index.js.map
