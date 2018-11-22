'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _generateLoaderContent = require('../generateLoaderContent');

var _generateLoaderContent2 = _interopRequireDefault(_generateLoaderContent);

var _isLocaleFile = require('../isLocaleFile');

var _isLoaderFile = require('../isLoaderFile');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function localeLoader(content) {
  var _this = this;

  var callback = this.async();
  var querys = _loaderUtils2.default.getOptions(this) || {};
  var supportedLocales = querys.supportedLocales || [];
  if ((0, _isLoaderFile.isLoaderFile)(content)) {
    (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var files;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _fsExtra2.default.readdir(_this.context);

            case 2:
              _context.t0 = function (f) {
                return (0, _isLocaleFile.isLocaleFile)(f);
              };

              _context.t1 = (0, _isLocaleFile.localeFilter)(supportedLocales);
              files = _context.sent.filter(_context.t0).filter(_context.t1);

              callback(null, (0, _generateLoaderContent2.default)({
                files: files,
                chunk: !(0, _isLoaderFile.noChunks)(content)
              }));

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  } else {
    callback(null, content);
  }
};
//# sourceMappingURL=index.js.map
