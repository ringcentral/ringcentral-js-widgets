'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _TransportBase2 = require('../TransportBase');

var _TransportBase3 = _interopRequireDefault(_TransportBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global chrome */

var ClientTransport = function (_TransportBase) {
  (0, _inherits3.default)(ClientTransport, _TransportBase);

  function ClientTransport(options) {
    (0, _classCallCheck3.default)(this, ClientTransport);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ClientTransport.__proto__ || (0, _getPrototypeOf2.default)(ClientTransport)).call(this, (0, _extends3.default)({}, options, {
      name: 'ChromeTransport'
    })));

    _this._requests = new _map2.default();
    _this._port = chrome.runtime.connect({ name: 'transport' });
    _this._port.onMessage.addListener(function (_ref) {
      var type = _ref.type,
          payload = _ref.payload,
          requestId = _ref.requestId,
          result = _ref.result,
          error = _ref.error;

      switch (type) {
        case _this._events.push:
          if (payload) {
            _this.emit(_this._events.push, payload);
          }
          break;
        case _this._events.response:
          if (requestId && _this._requests.has(requestId)) {
            if (error) {
              _this._requests.get(requestId).reject(new Error(error));
            } else {
              _this._requests.get(requestId).resolve(result);
            }
          }
          break;
        default:
          break;
      }
    });
    return _this;
  }

  (0, _createClass3.default)(ClientTransport, [{
    key: 'request',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref3) {
        var _this2 = this;

        var payload = _ref3.payload;
        var requestId, promise, timeout;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                requestId = _uuid2.default.v4();
                promise = new _promise2.default(function (resolve, reject) {
                  _this2._requests.set(requestId, {
                    resolve: resolve,
                    reject: reject
                  });
                  _this2._port.postMessage({
                    type: _this2._events.request,
                    requestId: requestId,
                    payload: payload
                  });
                });
                timeout = setTimeout(function () {
                  timeout = null;
                  _this2._requests.get(requestId).reject(new Error(_this2._events.timeout));
                }, this._timeout);

                promise = promise.then(function (result) {
                  if (timeout) clearTimeout(timeout);
                  _this2._requests.delete(requestId);
                  return _promise2.default.resolve(result);
                }).catch(function (error) {
                  if (timeout) clearTimeout(timeout);
                  _this2._requests.delete(requestId);
                  return _promise2.default.reject(error);
                });
                return _context.abrupt('return', promise);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function request(_x) {
        return _ref2.apply(this, arguments);
      }

      return request;
    }()
  }]);
  return ClientTransport;
}(_TransportBase3.default);

exports.default = ClientTransport;
//# sourceMappingURL=ClientTransport.js.map
