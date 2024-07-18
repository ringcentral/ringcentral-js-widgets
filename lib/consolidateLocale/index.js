"use strict";

require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = consolidateLocale;
require("regenerator-runtime/runtime");
var _defaultConfig = _interopRequireDefault(require("../defaultConfig"));
var _importLocale = _interopRequireDefault(require("../importLocale"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
