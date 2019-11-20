"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = consolidateLocale;

require("regenerator-runtime/runtime");

var _importLocale = _interopRequireDefault(require("../importLocale"));

var _defaultConfig = _interopRequireDefault(require("../defaultConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function consolidateLocale(_ref) {
  var _ref$sourceFolder, sourceFolder, _ref$sourceLocale, sourceLocale, _ref$supportedLocales, supportedLocales, _ref$interactive, interactive, _ref$silent, silent;

  return regeneratorRuntime.async(function consolidateLocale$(_context) {
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
  });
}
//# sourceMappingURL=index.js.map
