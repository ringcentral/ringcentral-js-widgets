"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateLoaderContent;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.map");

var _dedent = _interopRequireDefault(require("dedent"));

var _formatLocale = _interopRequireDefault(require("@ringcentral-integration/i18n/lib/formatLocale"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["export default function loadLocale(locale) {\n      return new Promise((resolve) => {\n        switch (locale) {", "\n          default:\n            resolve({});\n            break;\n        }\n      });\n    }\n"], ["export default function loadLocale(locale) {\n      return new Promise((resolve) => {\n        switch (locale) {", "\n          default:\n            resolve({});\n            break;\n        }\n      });\n    }\\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function byLocale(a, b) {
  var ta = (0, _formatLocale["default"])(a);
  var tb = (0, _formatLocale["default"])(b);
  if (ta === tb) return 0;
  return ta > tb ? 1 : -1;
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
      chunk = _ref$chunk === void 0 ? true : _ref$chunk;
  var usedLang = {};
  var cases = files.sort(byLocale).map(function (f) {
    var basename = f.replace(/\.(js|json|ts)$/i, '');
    var locale = (0, _formatLocale["default"])(basename);
    var lang = locale.split('-')[0];
    var padding = chunk ? '  ' : '';
    var code = "\n            ".concat(padding, "const data = require('./").concat(basename, "');\n            ").concat(padding, "resolve(data.__esModule === true ? data.default : data);");

    if (chunk) {
      code = "\n            if (typeof require.ensure === 'function') {\n              require.ensure(['./".concat(basename, "'], (require) => {").concat(code, "\n              }, '").concat(locale, "');\n            } else {").concat(code, "\n            }");
    }

    var langDefaultCase = '';

    if (!usedLang[lang]) {
      usedLang[lang] = true;
      langDefaultCase = "\n        case '".concat(lang, "':\n      ");
    }

    return "".concat(langDefaultCase, "\n          case '").concat(locale, "': {").concat(code, "\n            break;\n          }");
  });
  return (0, _dedent["default"])(_templateObject(), cases.join(''));
}
//# sourceMappingURL=index.js.map
