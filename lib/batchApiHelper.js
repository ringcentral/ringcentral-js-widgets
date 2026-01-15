"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.reduce");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.batchGetApi = batchGetApi;
exports.batchPutApi = batchPutApi;
require("regenerator-runtime/runtime");
var _Client = _interopRequireDefault(require("@ringcentral/sdk/lib/http/Client"));
var _uuid = require("uuid");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function batchPutApi(_x) {
  return _batchPutApi.apply(this, arguments);
}
function _batchPutApi() {
  _batchPutApi = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var platform, url, query, body, boundary, options, _body, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            platform = _ref.platform, url = _ref.url, query = _ref.query, body = _ref.body;
            boundary = "Boundary_".concat((0, _uuid.v4)());
            options = {
              headers: {}
            };
            options.headers[_Client["default"]._contentType] = "".concat(_Client["default"]._multipartContentType, "; boundary=").concat(boundary);
            _body = body.reduce(function (data, item) {
              data += "--".concat(boundary, "\r\n");
              data += "".concat(_Client["default"]._contentType, ": ").concat(_Client["default"]._jsonContentType, "\r\n\r\n");
              data += "".concat(JSON.stringify(item.body), "\r\n");
              return data;
            }, '');
            _body += "--".concat(boundary, "--");
            _context.next = 8;
            return platform.put(url, _body, query, options);
          case 8:
            result = _context.sent;
            return _context.abrupt("return", platform._client.toMultipart(result));
          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _batchPutApi.apply(this, arguments);
}
function batchGetApi(_x2) {
  return _batchGetApi.apply(this, arguments);
}
function _batchGetApi() {
  _batchGetApi = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
    var platform, url, query, boundary, options, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            platform = _ref2.platform, url = _ref2.url, query = _ref2.query;
            boundary = "Boundary_".concat((0, _uuid.v4)());
            options = {
              headers: {}
            };
            options.headers[_Client["default"]._contentType] = "".concat(_Client["default"]._multipartContentType, "; boundary=").concat(boundary);
            _context2.next = 6;
            return platform.get(url, query, options);
          case 6:
            result = _context2.sent;
            return _context2.abrupt("return", platform._client.toMultipart(result));
          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _batchGetApi.apply(this, arguments);
}
//# sourceMappingURL=batchApiHelper.js.map
