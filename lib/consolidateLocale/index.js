"use strict";

require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = consolidateLocale;
require("regenerator-runtime/runtime");
var _importLocale = _interopRequireDefault(require("../importLocale"));
var _defaultConfig = _interopRequireDefault(require("../defaultConfig"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function consolidateLocale(_x) {
  return _consolidateLocale.apply(this, arguments);
}
function _consolidateLocale() {
  _consolidateLocale = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var _ref$sourceFolder, sourceFolder, _ref$sourceLocale, sourceLocale, _ref$supportedLocales, supportedLocales, _ref$interactive, interactive, _ref$silent, silent;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref$sourceFolder = _ref.sourceFolder, sourceFolder = _ref$sourceFolder === void 0 ? _defaultConfig["default"].sourceFolder : _ref$sourceFolder, _ref$sourceLocale = _ref.sourceLocale, sourceLocale = _ref$sourceLocale === void 0 ? _defaultConfig["default"].sourceLocale : _ref$sourceLocale, _ref$supportedLocales = _ref.supportedLocales, supportedLocales = _ref$supportedLocales === void 0 ? _defaultConfig["default"].supportedLocales : _ref$supportedLocales, _ref$interactive = _ref.interactive, interactive = _ref$interactive === void 0 ? _defaultConfig["default"].interactive : _ref$interactive, _ref$silent = _ref.silent, silent = _ref$silent === void 0 ? _defaultConfig["default"].silent : _ref$silent;
            return _context.abrupt("return", (0, _importLocale["default"])({
              sourceFolder: sourceFolder,
              sourceLocale: sourceLocale,
              supportedLocales: supportedLocales,
              interactive: interactive,
              silent: silent
            }));
          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _consolidateLocale.apply(this, arguments);
}
//# sourceMappingURL=index.js.map
