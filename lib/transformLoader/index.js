"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = transformLoader;

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

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function transformLoader() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$noChunk = _ref.noChunk,
      noChunk = _ref$noChunk === void 0 ? false : _ref$noChunk;

  return _through["default"].obj(function transform(file, enc, done) {
    var content, folderPath, files, loader;
    return regeneratorRuntime.async(function transform$(_context) {
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
            return regeneratorRuntime.awrap(_fsExtra["default"].readdir(folderPath));

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
    }, null, this);
  });
}
//# sourceMappingURL=index.js.map
