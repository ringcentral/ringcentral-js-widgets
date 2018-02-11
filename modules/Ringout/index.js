'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class, _desc, _value, _class2;

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getRingoutReducer = require('./getRingoutReducer');

var _getRingoutReducer2 = _interopRequireDefault(_getRingoutReducer);

var _ringoutErrors = require('./ringoutErrors');

var _ringoutErrors2 = _interopRequireDefault(_ringoutErrors);

var _sleep = require('../../lib/sleep');

var _sleep2 = _interopRequireDefault(_sleep);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var DEFAULT_MONITOR_INTERVAL = 2500;
var DEFAULT_TIME_BETWEEN_CALLS = 10000;

/**
 * @class
 * @description Ringout managing module
 */
var Ringout = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Client', { dep: 'RingoutOptions', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(Ringout, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Auth} params.auth - auth module instance
   * @param {Number} params.monitorInterval - monitor interval, default 2500
   * @param {Number} params.timeBetweenCalls - time between calls, default 10000
   */
  function Ringout(_ref) {
    var auth = _ref.auth,
        client = _ref.client,
        _ref$monitorInterval = _ref.monitorInterval,
        monitorInterval = _ref$monitorInterval === undefined ? DEFAULT_MONITOR_INTERVAL : _ref$monitorInterval,
        _ref$timeBetweenCalls = _ref.timeBetweenCalls,
        timeBetweenCalls = _ref$timeBetweenCalls === undefined ? DEFAULT_TIME_BETWEEN_CALLS : _ref$timeBetweenCalls,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'client', 'monitorInterval', 'timeBetweenCalls']);
    (0, _classCallCheck3.default)(this, Ringout);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Ringout.__proto__ || (0, _getPrototypeOf2.default)(Ringout)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._auth = auth;
    _this._client = client;
    _this._reducer = (0, _getRingoutReducer2.default)(_this.actionTypes);
    _this._monitorInterval = monitorInterval;
    _this._timeBetweenCalls = timeBetweenCalls;
    return _this;
  }

  (0, _createClass3.default)(Ringout, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        if (_this2._auth.loggedIn && !_this2.ready) {
          _this2.store.dispatch({
            type: _this2.actionTypes.initSuccess
          });
        } else if (!_this2._auth.loggedIn && _this2.ready) {
          _this2.store.dispatch({
            type: _this2.actionTypes.resetSuccess
          });
        }
      });
    }
  }, {
    key: 'makeCall',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref3) {
        var fromNumber = _ref3.fromNumber,
            toNumber = _ref3.toNumber,
            prompt = _ref3.prompt;
        var resp, startTime;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.status === _moduleStatuses2.default.ready)) {
                  _context.next = 19;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.startToConnect
                });
                _context.prev = 2;
                _context.next = 5;
                return this._client.account().extension().ringOut().post({
                  from: { phoneNumber: fromNumber },
                  to: { phoneNumber: toNumber },
                  playPrompt: prompt
                });

              case 5:
                resp = _context.sent;
                startTime = Date.now();
                _context.next = 9;
                return this._monitorRingout(resp.id, startTime);

              case 9:
                this.store.dispatch({
                  type: this.actionTypes.connectSuccess
                });
                _context.next = 17;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context['catch'](2);

                this.store.dispatch({
                  type: this.actionTypes.connectError
                });

                if (!(_context.t0.message !== _ringoutErrors2.default.pollingCancelled)) {
                  _context.next = 17;
                  break;
                }

                throw _context.t0;

              case 17:
                _context.next = 19;
                break;

              case 19:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 12]]);
      }));

      function makeCall(_x) {
        return _ref2.apply(this, arguments);
      }

      return makeCall;
    }()
  }, {
    key: '_monitorRingout',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ringoutId, startTime) {
        var callerStatus;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._fetchRingoutStatus(ringoutId);

              case 2:
                callerStatus = _context2.sent;

              case 3:
                if (!(callerStatus === 'InProgress')) {
                  _context2.next = 13;
                  break;
                }

                if (!(Date.now() - startTime > this._timeBetweenCalls)) {
                  _context2.next = 6;
                  break;
                }

                throw new Error(_ringoutErrors2.default.pollingCancelled);

              case 6:
                _context2.next = 8;
                return (0, _sleep2.default)(this._monitorInterval);

              case 8:
                _context2.next = 10;
                return this._fetchRingoutStatus(ringoutId);

              case 10:
                callerStatus = _context2.sent;
                _context2.next = 3;
                break;

              case 13:
                if (!(callerStatus !== 'Success' && callerStatus !== 'NoAnswer')) {
                  _context2.next = 15;
                  break;
                }

                throw new Error(_ringoutErrors2.default.firstLegConnectFailed);

              case 15:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _monitorRingout(_x2, _x3) {
        return _ref4.apply(this, arguments);
      }

      return _monitorRingout;
    }()
  }, {
    key: '_fetchRingoutStatus',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ringoutId) {
        var resp, exception;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this._client.account().extension().ringOut(ringoutId).get();

              case 3:
                resp = _context3.sent;
                return _context3.abrupt('return', resp.status.callerStatus);

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3['catch'](0);
                exception = new Error(_ringoutErrors2.default.pollingFailed);

                exception.error = _context3.t0;
                throw exception;

              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      function _fetchRingoutStatus(_x4) {
        return _ref5.apply(this, arguments);
      }

      return _fetchRingoutStatus;
    }()
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'ringoutStatus',
    get: function get() {
      return this.state.ringoutStatus;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.state.status === _moduleStatuses2.default.ready;
    }
  }]);
  return Ringout;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'makeCall', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'makeCall'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_monitorRingout', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_monitorRingout'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_fetchRingoutStatus', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_fetchRingoutStatus'), _class2.prototype)), _class2)) || _class);
exports.default = Ringout;
//# sourceMappingURL=index.js.map
