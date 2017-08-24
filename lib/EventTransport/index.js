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

var EventTransport = function (_TransportBase) {
  (0, _inherits3.default)(EventTransport, _TransportBase);

  function EventTransport(options) {
    (0, _classCallCheck3.default)(this, EventTransport);

    var _this = (0, _possibleConstructorReturn3.default)(this, (EventTransport.__proto__ || (0, _getPrototypeOf2.default)(EventTransport)).call(this, (0, _extends3.default)({}, options, {
      name: 'EventTransport'
    })));

    _this._deferred = new _map2.default();
    return _this;
  }

  (0, _createClass3.default)(EventTransport, [{
    key: 'request',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
        var _this2 = this;

        var payload = _ref2.payload;
        var requestId, promise, timeoutId;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                requestId = _uuid2.default.v4();
                promise = new _promise2.default(function (resolve, reject) {
                  _this2._deferred.set(requestId, {
                    resolve: resolve,
                    reject: reject
                  });
                });
                timeoutId = setTimeout(function () {
                  timeoutId = null;
                  _this2._deferred.get(requestId).reject(new Error(_this2._events.timeout));
                }, this._timeout);

                promise.then(function (result) {
                  if (timeoutId) clearTimeout(timeoutId);
                  _this2._deferred.delete(requestId);
                  return _promise2.default.resolve(result);
                }).catch(function (error) {
                  if (timeoutId) clearTimeout(timeoutId);
                  _this2._deferred.delete(requestId);
                  return _promise2.default.reject(error);
                });
                this.emit(this._events.request, {
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
        return _ref.apply(this, arguments);
      }

      return request;
    }()
  }, {
    key: 'response',
    value: function response(_ref3) {
      var requestId = _ref3.requestId,
          result = _ref3.result,
          error = _ref3.error;

      var deferred = this._deferred.get(requestId);
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
    value: function push(_ref4) {
      var payload = _ref4.payload;

      this.emit(this._events.push, payload);
    }
  }]);
  return EventTransport;
}(_TransportBase3.default);

exports.default = EventTransport;
//# sourceMappingURL=index.js.map
