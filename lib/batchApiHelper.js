"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.batchPutApi = batchPutApi;
exports.batchGetApi = batchGetApi;

require("core-js/modules/es6.array.reduce");

require("regenerator-runtime/runtime");

var _ApiResponse = _interopRequireDefault(require("ringcentral/src/http/ApiResponse"));

var _uuid = _interopRequireDefault(require("uuid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function batchPutApi(_ref) {
  var platform, url, query, body, boundry, options, result;
  return regeneratorRuntime.async(function batchPutApi$(_context) {
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
          return regeneratorRuntime.awrap(platform.put(url, body, query, options));

        case 8:
          result = _context.sent;
          return _context.abrupt("return", result.multipart());

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
}

function batchGetApi(_ref2) {
  var platform, url, query, boundry, options, result;
  return regeneratorRuntime.async(function batchGetApi$(_context2) {
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
          return regeneratorRuntime.awrap(platform.get(url, query, options));

        case 6:
          result = _context2.sent;
          return _context2.abrupt("return", result.multipart());

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
}
//# sourceMappingURL=batchApiHelper.js.map
