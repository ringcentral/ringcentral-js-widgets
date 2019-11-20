"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.array.filter");

require("regenerator-runtime/runtime");

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _loaderUtils = _interopRequireDefault(require("loader-utils"));

var _generateLoaderContent = _interopRequireDefault(require("../generateLoaderContent"));

var _isLocaleFile = _interopRequireWildcard(require("../isLocaleFile"));

var _isLoaderFile = _interopRequireWildcard(require("../isLoaderFile"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = function localeLoader(content) {
  var _this = this;

  var callback = this.async();
  var querys = _loaderUtils["default"].getOptions(this) || {};
  var supportedLocales = querys.supportedLocales || [];

  if ((0, _isLoaderFile["default"])(content)) {
    (function _callee() {
      var files;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(_fsExtra["default"].readdir(_this.context));

            case 2:
              _context.t0 = function (f) {
                return (0, _isLocaleFile["default"])(f);
              };

              _context.t1 = (0, _isLocaleFile.localeFilter)(supportedLocales);
              files = _context.sent.filter(_context.t0).filter(_context.t1);
              callback(null, (0, _generateLoaderContent["default"])({
                files: files,
                chunk: !(0, _isLoaderFile.noChunks)(content)
              }));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      });
    })();
  } else {
    callback(null, content);
  }
};
//# sourceMappingURL=index.js.map
