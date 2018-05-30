'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _generateLoaderContent = require('../generateLoaderContent');

var _generateLoaderContent2 = _interopRequireDefault(_generateLoaderContent);

var _isLocaleFile = require('../isLocaleFile');

var _isLocaleFile2 = _interopRequireDefault(_isLocaleFile);

var _isLoaderFile = require('../isLoaderFile');

var _isLoaderFile2 = _interopRequireDefault(_isLoaderFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function localeLoader(content) {
  var _this = this;

  var callback = this.async();
  if ((0, _isLoaderFile2.default)(content)) {
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
                return (0, _isLocaleFile2.default)(f);
              };

              files = _context.sent.filter(_context.t0);

              callback(null, (0, _generateLoaderContent2.default)({
                files: files,
                chunk: !_isLoaderFile2.default.noChunk(content)
              }));

            case 5:
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
