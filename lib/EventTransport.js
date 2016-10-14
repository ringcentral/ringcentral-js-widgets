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

var _symbolMap = require('data-types/symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _Emitter2 = require('./Emitter');

var _Emitter3 = _interopRequireDefault(_Emitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbols = new _symbolMap2.default(['handler', 'id', 'events', 'deferred', 'timeout']);

var EventTransport = function (_Emitter) {
  (0, _inherits3.default)(EventTransport, _Emitter);

  function EventTransport(_ref) {
    var prefix = _ref.prefix;
    var _ref$timeout = _ref.timeout;
    var timeout = _ref$timeout === undefined ? 30 : _ref$timeout;
    (0, _classCallCheck3.default)(this, EventTransport);

    var _this = (0, _possibleConstructorReturn3.default)(this, (EventTransport.__proto__ || (0, _getPrototypeOf2.default)(EventTransport)).call(this));

    _this[symbols.handlers] = new _set2.default();
    _this[symbols.id] = _uuid2.default.v4();
    var prefixString = prefix ? prefix + '-' : '';
    _this[symbols.events] = {
      request: prefixString + '-event-transport-request',
      response: prefixString + '-event-transport-response',
      push: prefixString + '-event-tranport-push'
    };
    _this[symbols.deferred] = new _map2.default();
    _this[symbols.timeout] = Math.max(timeout * 1000, 5000);
    return _this;
  }

  (0, _createClass3.default)(EventTransport, [{
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
                  _this2[symbols.deferred].set(requestId, {
                    resolve: resolve,
                    reject: reject
                  });
                });
                timeout = setTimeout(function () {
                  timeout = null;
                  _this2[symbols.deferred].get(requestId).reject(new Error('Response timeout'));
                }, this[symbols.timeout]);

                promise.then(function (result) {
                  if (timeout) clearTimeout(timeout);
                  _this2[symbols.deferred].delete(requestId);
                  return _promise2.default.resolve(result);
                }).catch(function (error) {
                  if (timeout) clearTimeout(timeout);
                  _this2[symbols.deferred].delete(requestId);
                  return _promise2.default.reject(error);
                });

                this.emit(this[symbols.events].request, {
                  requestId: requestId,
                  payload: payload
                });
                return _context.abrupt('return', promise);

              case 6:
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
  }, {
    key: 'response',
    value: function response(_ref4) {
      var requestId = _ref4.requestId;
      var result = _ref4.result;
      var error = _ref4.error;

      var deferred = this[symbols.deferred].get(requestId);
      if (deferred) {
        if (error) {
          deferred.reject(error);
        } else {
          deferred.resolve(result);
        }
      }
    }
  }, {
    key: 'push',
    value: function push(_ref5) {
      var payload = _ref5.payload;

      this.emit(this[symbols.events].push, payload);
    }
  }, {
    key: 'events',
    get: function get() {
      return this[symbols.events];
    }
  }]);
  return EventTransport;
}(_Emitter3.default);

exports.default = EventTransport;
//# sourceMappingURL=EventTransport.js.map
