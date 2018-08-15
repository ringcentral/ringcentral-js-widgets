'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _importLocale = require('../importLocale');

var _importLocale2 = _interopRequireDefault(_importLocale);

var _defaultConfig = require('../defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var _ref$sourceFolder = _ref.sourceFolder,
        sourceFolder = _ref$sourceFolder === undefined ? _defaultConfig2.default.sourceFolder : _ref$sourceFolder,
        _ref$sourceLocale = _ref.sourceLocale,
        sourceLocale = _ref$sourceLocale === undefined ? _defaultConfig2.default.sourceLocale : _ref$sourceLocale,
        _ref$supportedLocales = _ref.supportedLocales,
        supportedLocales = _ref$supportedLocales === undefined ? _defaultConfig2.default.supportedLocales : _ref$supportedLocales,
        _ref$interactive = _ref.interactive,
        interactive = _ref$interactive === undefined ? _defaultConfig2.default.interactive : _ref$interactive,
        _ref$silent = _ref.silent,
        silent = _ref$silent === undefined ? _defaultConfig2.default.silent : _ref$silent;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', (0, _importLocale2.default)({
              sourceFolder: sourceFolder,
              sourceLocale: sourceLocale,
              supportedLocales: supportedLocales,
              interactive: interactive,
              silent: silent
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function consolidateLocale(_x) {
    return _ref2.apply(this, arguments);
  }

  return consolidateLocale;
}();
//# sourceMappingURL=index.js.map
