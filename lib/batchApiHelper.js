"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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
exports.batchGetApi = batchGetApi;
exports.batchPutApi = batchPutApi;

require("core-js/modules/es6.array.reduce");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var uuid = _interopRequireWildcard(require("uuid"));

var _Client = _interopRequireDefault(require("@ringcentral/sdk/lib/http/Client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function batchPutApi(_x) {
  return _batchPutApi.apply(this, arguments);
}

function _batchPutApi() {
  _batchPutApi = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var platform, url, query, body, boundry, options, _body, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            platform = _ref.platform, url = _ref.url, query = _ref.query, body = _ref.body;
            boundry = "Boundary_".concat(uuid.v4());
            options = {
              headers: {}
            };
            options.headers[_Client["default"]._contentType] = "".concat(_Client["default"]._multipartContentType, "; boundary=").concat(boundry);
            _body = body.reduce(function (data, item) {
              data += "--".concat(boundry, "\r\n");
              data += "".concat(_Client["default"]._contentType, ": ").concat(_Client["default"]._jsonContentType, "\r\n\r\n");
              data += "".concat(JSON.stringify(item.body), "\r\n");
              return data;
            }, '');
            _body += "--".concat(boundry, "--");
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
    var platform, url, query, boundry, options, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            platform = _ref2.platform, url = _ref2.url, query = _ref2.query;
            boundry = "Boundary_".concat(uuid.v4());
            options = {
              headers: {}
            };
            options.headers[_Client["default"]._contentType] = "".concat(_Client["default"]._multipartContentType, "; boundary=").concat(boundry);
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
