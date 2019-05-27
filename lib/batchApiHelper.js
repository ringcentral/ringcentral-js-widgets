"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.batchPutApi = batchPutApi;
exports.batchGetApi = batchGetApi;

require("core-js/modules/es6.array.reduce");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var _ApiResponse = _interopRequireDefault(require("ringcentral/src/http/ApiResponse"));

var _uuid = _interopRequireDefault(require("uuid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function batchPutApi(_x) {
  return _batchPutApi.apply(this, arguments);
}

function _batchPutApi() {
  _batchPutApi = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var platform, url, query, body, boundry, options, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            platform = _ref.platform, url = _ref.url, query = _ref.query, body = _ref.body;
            boundry = "Boundary_".concat(_uuid["default"].v4());
            options = {
              headers: {}
            };
            options.headers[_ApiResponse["default"]._contentType] = "".concat(_ApiResponse["default"]._multipartContentType, "; boundary=").concat(boundry);
            body = body.reduce(function (data, item) {
              data += "--".concat(boundry, "\r\n");
              data += "".concat(_ApiResponse["default"]._contentType, ": ").concat(_ApiResponse["default"]._jsonContentType, "\r\n\r\n");
              data += "".concat(JSON.stringify(item.body), "\r\n");
              return data;
            }, '');
            body += "--".concat(boundry, "--");
            _context.next = 8;
            return platform.put(url, body, query, options);

          case 8:
            result = _context.sent;
            return _context.abrupt("return", result.multipart());

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
  _batchGetApi = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref2) {
    var platform, url, query, boundry, options, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            platform = _ref2.platform, url = _ref2.url, query = _ref2.query;
            boundry = "Boundary_".concat(_uuid["default"].v4());
            options = {
              headers: {}
            };
            options.headers[_ApiResponse["default"]._contentType] = "".concat(_ApiResponse["default"]._multipartContentType, "; boundary=").concat(boundry);
            _context2.next = 6;
            return platform.get(url, query, options);

          case 6:
            result = _context2.sent;
            return _context2.abrupt("return", result.multipart());

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
