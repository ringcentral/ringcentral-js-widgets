'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.batchGetApi = exports.batchPutApi = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var batchPutApi = exports.batchPutApi = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
    var platform = _ref2.platform,
        url = _ref2.url,
        query = _ref2.query,
        body = _ref2.body;
    var boundry, options, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            boundry = 'Boundary_' + _uuid2.default.v4();
            options = { headers: {} };

            options.headers[_ApiResponse2.default._contentType] = _ApiResponse2.default._multipartContentType + '; boundary=' + boundry;
            body = body.reduce(function (data, item) {
              data += '--' + boundry + '\r\n';
              data += _ApiResponse2.default._contentType + ': ' + _ApiResponse2.default._jsonContentType + '\r\n\r\n';
              data += (0, _stringify2.default)(item.body) + '\r\n';
              return data;
            }, '');
            body += '--' + boundry + '--';
            _context.next = 7;
            return platform.put(url, body, query, options);

          case 7:
            result = _context.sent;
            return _context.abrupt('return', result.multipart());

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function batchPutApi(_x) {
    return _ref.apply(this, arguments);
  };
}();

var batchGetApi = exports.batchGetApi = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref4) {
    var platform = _ref4.platform,
        url = _ref4.url,
        query = _ref4.query;
    var boundry, options, result;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            boundry = 'Boundary_' + _uuid2.default.v4();
            options = { headers: {} };

            options.headers[_ApiResponse2.default._contentType] = _ApiResponse2.default._multipartContentType + '; boundary=' + boundry;
            _context2.next = 5;
            return platform.get(url, query, options);

          case 5:
            result = _context2.sent;
            return _context2.abrupt('return', result.multipart());

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function batchGetApi(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var _ApiResponse = require('ringcentral/src/http/ApiResponse');

var _ApiResponse2 = _interopRequireDefault(_ApiResponse);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=batchApiHelper.js.map
