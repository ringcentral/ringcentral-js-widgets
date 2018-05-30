'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = consolidateLocale;

var _importLocale = require('../importLocale');

var _importLocale2 = _interopRequireDefault(_importLocale);

var _defaultConfig = require('../defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function consolidateLocale(_ref) {
  var _ref$sourceFolder = _ref.sourceFolder,
      sourceFolder = _ref$sourceFolder === undefined ? _defaultConfig2.default.sourceFolder : _ref$sourceFolder,
      _ref$sourceLocale = _ref.sourceLocale,
      sourceLocale = _ref$sourceLocale === undefined ? _defaultConfig2.default.sourceLocale : _ref$sourceLocale,
      _ref$supportedLocales = _ref.supportedLocales,
      supportedLocales = _ref$supportedLocales === undefined ? _defaultConfig2.default.supportedLocales : _ref$supportedLocales;

  return (0, _importLocale2.default)({
    sourceFolder: sourceFolder,
    sourceLocale: sourceLocale,
    supportedLocales: supportedLocales
  });
}
//# sourceMappingURL=index.js.map
