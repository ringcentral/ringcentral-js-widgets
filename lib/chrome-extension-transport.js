'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChromeExtensionClientTransport = exports.ChromeExtensionServerTransport = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

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

var _Emitter3 = require('./Emitter');

var _Emitter4 = _interopRequireDefault(_Emitter3);

var _symbolMap = require('data-types/symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

var _ActionMap = require('./ActionMap');

var _ActionMap2 = _interopRequireDefault(_ActionMap);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global chrome */

var TIMEOUT = 90 * 1000;

var events = new _ActionMap2.default(['push', 'reponse', 'request']);

var symbols = new _symbolMap2.default(['ports', 'port', 'deferred']);

var ChromeExtensionServerTransport = exports.ChromeExtensionServerTransport = function (_Emitter) {
  (0, _inherits3.default)(ChromeExtensionServerTransport, _Emitter);

  function ChromeExtensionServerTransport() {
    (0, _classCallCheck3.default)(this, ChromeExtensionServerTransport);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ChromeExtensionServerTransport.__proto__ || (0, _getPrototypeOf2.default)(ChromeExtensionServerTransport)).call(this));

    _this[symbols.ports] = new _set2.default();
    _this[symbols.deferred] = new _map2.default();
    chrome.runtime.onConnect.addListener(function (port) {
      if (port.name === 'transport') {
        _this[symbols.ports].add(port);
        port.onMessage.addListener(function (_ref) {
          var type = _ref.type;
          var requestId = _ref.requestId;
          var payload = _ref.payload;

          if (type === events.request && requestId && payload) {
            _this[symbols.deferred].set(requestId, port);
            _this.emit(events.request, {
              requestId: requestId,
              payload: payload
            });
          }
        });

        port.onDisconnect.addListener(function () {
          _this[symbols.ports].delete(port);
        });
      }
    });
    return _this;
  }

  (0, _createClass3.default)(ChromeExtensionServerTransport, [{
    key: 'response',
    value: function response(_ref2) {
      var requestId = _ref2.requestId;
      var result = _ref2.result;
      var error = _ref2.error;

      if (this[symbols.deferred].has(requestId)) {
        var port = this[symbols.deferred].get(requestId);
        this[symbols.deferred].delete(requestId);
        port.postMessage({
          type: events.response,
          requestId: requestId,
          result: result,
          error: error
        });
      }
    }
  }, {
    key: 'push',
    value: function push(_ref3) {
      var payload = _ref3.payload;

      this[symbols.ports].forEach(function (port) {
        port.postMessage({
          type: events.push,
          payload: payload
        });
      });
    }
  }, {
    key: 'events',
    get: function get() {
      return events;
    }
  }]);
  return ChromeExtensionServerTransport;
}(_Emitter4.default);

var ChromeExtensionClientTransport = exports.ChromeExtensionClientTransport = function (_Emitter2) {
  (0, _inherits3.default)(ChromeExtensionClientTransport, _Emitter2);

  function ChromeExtensionClientTransport() {
    (0, _classCallCheck3.default)(this, ChromeExtensionClientTransport);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (ChromeExtensionClientTransport.__proto__ || (0, _getPrototypeOf2.default)(ChromeExtensionClientTransport)).call(this));

    _this2[symbols.deferred] = new _map2.default();
    _this2[symbols.port] = chrome.runtime.connect({ name: 'transport' });
    _this2[symbols.port].onMessage.addListener(function (msg) {
      var type = msg.type;
      var payload = msg.payload;
      var requestId = msg.requestId;
      var result = msg.result;
      var error = msg.error;

      switch (type) {
        case events.push:
          if (payload) {
            _this2.emit(events.push, payload);
          }
          break;
        case events.response:
          if (requestId && _this2[symbols.deferred].has(requestId)) {
            if (error) {
              _this2[symbols.deferred].get(requestId).reject(error);
            } else {
              _this2[symbols.deferred].get(requestId).resolve(result);
            }
          }
          break;
        default:
          break;
      }
    });
    return _this2;
  }

  (0, _createClass3.default)(ChromeExtensionClientTransport, [{
    key: 'request',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref5) {
        var _this3 = this;

        var payload = _ref5.payload;
        var requestId, promise, timeout;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                requestId = _uuid2.default.v4();
                promise = new _promise2.default(function (resolve, reject) {
                  _this3[symbols.port].postMessage({
                    type: events.request,
                    requestId: requestId,
                    payload: payload
                  });
                  _this3[symbols.deferred].set(requestId, {
                    resolve: resolve,
                    reject: reject
                  });
                });
                timeout = setTimeout(function () {
                  timeout = null;
                  _this3[symbols.deferred].get(requestId).reject(new Error('Response Timeout'));
                }, TIMEOUT);

                promise.then(function (result) {
                  if (timeout) clearTimeout(timeout);
                  _this3[symbols.deferred].delete(requestId);
                  return _promise2.default.resolve(result);
                }).catch(function (error) {
                  if (timeout) clearTimeout(timeout);
                  _this3[symbols.deferred].delete(requestId);
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
        return _ref4.apply(this, arguments);
      }

      return request;
    }()
  }, {
    key: 'events',
    get: function get() {
      return events;
    }
  }]);
  return ChromeExtensionClientTransport;
}(_Emitter4.default);
//# sourceMappingURL=chrome-extension-transport.js.map
