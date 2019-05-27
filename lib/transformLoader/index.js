"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = transformLoader;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

var _through = _interopRequireDefault(require("through2"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _generateLoaderContent = _interopRequireDefault(require("../generateLoaderContent"));

var _isLocaleFile = _interopRequireDefault(require("../isLocaleFile"));

var _isLoaderFile = _interopRequireWildcard(require("../isLoaderFile"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function transformLoader() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$noChunk = _ref.noChunk,
      noChunk = _ref$noChunk === void 0 ? false : _ref$noChunk;

  return _through["default"].obj(
  /*#__PURE__*/
  function () {
    var _transform = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(file, enc, done) {
      var content, folderPath, files, loader;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              content = file.contents.toString(enc);

              if (!(0, _isLoaderFile["default"])(content)) {
                _context.next = 9;
                break;
              }

              folderPath = _path["default"].dirname(file.path);
              _context.next = 5;
              return _fsExtra["default"].readdir(folderPath);

            case 5:
              _context.t0 = _isLocaleFile["default"];
              files = _context.sent.filter(_context.t0);
              loader = (0, _generateLoaderContent["default"])({
                files: files,
                noChunk: noChunk || (0, _isLoaderFile.noChunks)(content)
              });
              file.contents = Buffer.from(loader, 'utf8');

            case 9:
              this.push(file);
              done();

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function transform(_x, _x2, _x3) {
      return _transform.apply(this, arguments);
    }

    return transform;
  }());
}
//# sourceMappingURL=index.js.map
