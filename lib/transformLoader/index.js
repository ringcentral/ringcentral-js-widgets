'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = transformLoader;

var _through = require('through2');

var _through2 = _interopRequireDefault(_through);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _isLocaleFile = require('../isLocaleFile');

var _isLocaleFile2 = _interopRequireDefault(_isLocaleFile);

var _generateLoaderContent = require('../generateLoaderContent');

var _generateLoaderContent2 = _interopRequireDefault(_generateLoaderContent);

var _isLoaderFile = require('../isLoaderFile');

var _isLoaderFile2 = _interopRequireDefault(_isLoaderFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transformLoader() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$noChunk = _ref.noChunk,
      noChunk = _ref$noChunk === undefined ? false : _ref$noChunk;

  return _through2.default.obj(function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(file, enc, done) {
      var content, folderPath, files, loader;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              content = file.contents.toString(enc);

              if (!(0, _isLoaderFile2.default)(content)) {
                _context.next = 9;
                break;
              }

              folderPath = _path2.default.dirname(file.path);
              _context.next = 5;
              return _fsExtra2.default.readdir(folderPath);

            case 5:
              _context.t0 = _isLocaleFile2.default;
              files = _context.sent.filter(_context.t0);
              loader = (0, _generateLoaderContent2.default)({
                files: files,
                noChunk: noChunk || _isLoaderFile2.default.noChunk(content)
              });

              file.contents = Buffer.from(loader, 'utf8');

            case 9:
              this.push(file);
              done();

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function transform(_x2, _x3, _x4) {
      return _ref2.apply(this, arguments);
    }

    return transform;
  }());
}
//# sourceMappingURL=index.js.map
