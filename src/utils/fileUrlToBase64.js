"use strict";

require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileUrlToBase64 = void 0;
require("regenerator-runtime/runtime");
var _rxjs = require("rxjs");
var _base64Handler = require("./base64Handler");
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _currC2dLogo = {};
function _fileUrlToBase64(_x) {
  return _fileUrlToBase.apply(this, arguments);
}
/**
 * Converts a file URL to a base64 string.
 *
 * by default this method will auto cache the base64 string,
 * @param c2dLogo - The file URL to convert.
 * @param force - (Optional) If set to true, forces fetching the image again instead of using the cached base64 string.
 * @returns A Promise that resolves to the base64 string representation of the file.
 */
function _fileUrlToBase() {
  _fileUrlToBase = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(c2dLogo) {
    var image, imageBlog, base64URL;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetch(c2dLogo);
          case 2:
            image = _context2.sent;
            _context2.next = 5;
            return image.blob();
          case 5:
            imageBlog = _context2.sent;
            _context2.next = 8;
            return (0, _base64Handler.fileToBase64)(imageBlog);
          case 8:
            base64URL = _context2.sent;
            return _context2.abrupt("return", base64URL);
          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _fileUrlToBase.apply(this, arguments);
}
var fileUrlToBase64 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(c2dLogo) {
    var force,
      cache,
      url$,
      _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            force = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
            cache = _currC2dLogo[c2dLogo];
            if (!(!force && cache)) {
              _context.next = 4;
              break;
            }
            return _context.abrupt("return", (0, _rxjs.firstValueFrom)(cache));
          case 4:
            url$ = (0, _rxjs.from)(_fileUrlToBase64(c2dLogo)).pipe(
            // save the base64 string to cache for share all same url request
            (0, _rxjs.shareReplay)(1), (0, _rxjs.catchError)(function (error) {
              // when fetch failed, remove the cache, let outside to handle the error and can refetch again
              delete _currC2dLogo[c2dLogo];
              throw error;
            }));
            _currC2dLogo[c2dLogo] = url$;
            return _context.abrupt("return", (0, _rxjs.firstValueFrom)(url$));
          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function fileUrlToBase64(_x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.fileUrlToBase64 = fileUrlToBase64;
//# sourceMappingURL=fileUrlToBase64.js.map
