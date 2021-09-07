"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.slice");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleSpecialLocale = handleSpecialLocale;
exports["default"] = generateLoaderContent;

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.find");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

require("core-js/modules/es6.regexp.replace");

var _dedent = _interopRequireDefault(require("dedent"));

var _formatLocale = _interopRequireDefault(require("@ringcentral-integration/i18n/lib/formatLocale"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["export default function loadLocale(locale) {\n      return new Promise((resolve) => {\n        ", "\n        switch (locale) {", "\n          default:\n            return resolve({});\n        }\n      });\n    }\n"], ["export default function loadLocale(locale) {\n      return new Promise((resolve) => {\n        ", "\n        switch (locale) {", "\n          default:\n            return resolve({});\n        }\n      });\n    }\\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

function handleSpecialLocale(chunk, files) {
  var codeMaps = new Map([[files.find(function (file) {
    return /^es-419/.test(file);
  }), {
    condition: "locale.indexOf('es') === 0 && locale !== 'es-ES'",
    loadFileBasename: 'es-419'
  }]]);
  var code = '';

  var _iterator = _createForOfIteratorHelper(codeMaps.entries()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          needHandleLocale = _step$value[0],
          _step$value$ = _step$value[1],
          condition = _step$value$.condition,
          basename = _step$value$.loadFileBasename;

      var locale = basename;

      if (needHandleLocale) {
        code += "\n       if (".concat(condition, ") {\n         ").concat(returnLoadLocaleCode(chunk, locale, basename), "\n       }\n      ");
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
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
  return (0, _dedent["default"])(_templateObject(), handleSpecialLocale(chunk, files), cases.join(''));
}
//# sourceMappingURL=index.js.map
