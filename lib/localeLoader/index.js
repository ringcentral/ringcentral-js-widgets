"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.filter");

require("regenerator-runtime/runtime");

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _loaderUtils = _interopRequireDefault(require("loader-utils"));

var _generateLoaderContent = _interopRequireDefault(require("../generateLoaderContent"));

var _isLocaleFile = _interopRequireWildcard(require("../isLocaleFile"));

var _isLoaderFile = _interopRequireWildcard(require("../isLoaderFile"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = function localeLoader(content) {
  var _this = this;

  var callback = this.async();
  var querys = _loaderUtils.default.getOptions(this) || {};
  var supportedLocales = querys.supportedLocales || [];

  if ((0, _isLoaderFile.default)(content)) {
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var files;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _fsExtra.default.readdir(_this.context);

            case 2:
              _context.t0 = function (f) {
                return (0, _isLocaleFile.default)(f);
              };

              _context.t1 = (0, _isLocaleFile.localeFilter)(supportedLocales);
              files = _context.sent.filter(_context.t0).filter(_context.t1);
              callback(null, (0, _generateLoaderContent.default)({
                files: files,
                chunk: !(0, _isLoaderFile.noChunks)(content)
              }));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  } else {
    callback(null, content);
  }
};
//# sourceMappingURL=index.js.map
