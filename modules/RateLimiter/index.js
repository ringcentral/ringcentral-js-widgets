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

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _getRateLimiterReducer = require('./getRateLimiterReducer');

var _getRateLimiterReducer2 = _interopRequireDefault(_getRateLimiterReducer);

var _errorMessages = require('./errorMessages');

var _errorMessages2 = _interopRequireDefault(_errorMessages);

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

var DEFAULT_THROTTLE_DURATION = 61 * 1000;
var DEFAULT_ALERT_TTL = 5 * 1000;

/**
 * @class
 * @description Rate limiter managing module
 */
var RateLimiter = (_dec = (0, _di.Module)({
  deps: ['Alert', 'Client', { dep: 'Environment', optional: true }, 'GlobalStorage', { dep: 'RateLimiterOptions', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(RateLimiter, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Alert} params.alert - alert module instance
   * @param {Client} params.client - client module instance
   * @param {Environment} params.environment - environment module instance
   * @param {GlobalStorage} params.globalStorage - globalStorage module instance
   * @param {Number} params.throttleDuration - throttle duration, default 61 seconds
   */
  function RateLimiter(_ref) {
    var alert = _ref.alert,
        client = _ref.client,
        environment = _ref.environment,
        globalStorage = _ref.globalStorage,
        _ref$throttleDuration = _ref.throttleDuration,
        throttleDuration = _ref$throttleDuration === undefined ? DEFAULT_THROTTLE_DURATION : _ref$throttleDuration,
        options = (0, _objectWithoutProperties3.default)(_ref, ['alert', 'client', 'environment', 'globalStorage', 'throttleDuration']);
    (0, _classCallCheck3.default)(this, RateLimiter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RateLimiter.__proto__ || (0, _getPrototypeOf2.default)(RateLimiter)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._beforeRequestHandler = function () {
      if (_this.throttling) {
        throw new Error(_errorMessages2.default.rateLimitReached);
      }
    };

    _this._checkTimestamp = function () {
      if (!_this.throttling) {
        _this.store.dispatch({
          type: _this.actionTypes.stopThrottle
        });
      }
    };

    _this._requestErrorHandler = function (apiResponse) {
      if (apiResponse instanceof Error && apiResponse.message === 'Request rate exceeded') {
        var wasThrottling = _this.throttling;
        _this.store.dispatch({
          type: _this.actionTypes.startThrottle,
          timestamp: Date.now()
        });
        if (!wasThrottling) {
          _this.showAlert();
        }
        setTimeout(_this._checkTimestamp, _this._throttleDuration);
      }
    };

    _this._alert = alert;
    _this._client = client;
    _this._environment = environment;
    _this._storage = globalStorage;
    _this._throttleDuration = throttleDuration;
    _this._storageKey = 'rateLimiterTimestamp';
    _this._reducer = (0, _getRateLimiterReducer2.default)(_this.actionTypes);
    _this._storage.registerReducer({
      key: _this._storageKey,
      reducer: (0, _getRateLimiterReducer.getTimestampReducer)(_this.actionTypes)
    });
    _this._timeoutId = null;
    _this._lastEnvironmentCounter = 0;
    return _this;
  }

  (0, _createClass3.default)(RateLimiter, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!_this2.ready && _this2._storage.ready && (!_this2._environment || _this2._environment.ready)) {
                  _this2._bindHandlers();
                  _this2.store.dispatch({
                    type: _this2.actionTypes.initSuccess
                  });
                } else if (_this2.ready && _this2._environment && _this2._environment.changeCounter !== _this2._lastEnvironmentCounter) {
                  _this2._lastEnvironmentCounter = _this2._environment.changeCounter;
                  _this2._bindHandlers();
                }

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      })));
    }
  }, {
    key: 'showAlert',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.throttling && this._alert) {
                  this._alert.danger({
                    message: _errorMessages2.default.rateLimitReached,
                    ttl: DEFAULT_ALERT_TTL,
                    allowDuplicates: false
                  });
                }

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function showAlert() {
        return _ref3.apply(this, arguments);
      }

      return showAlert;
    }()
  }, {
    key: '_bindHandlers',
    value: function _bindHandlers() {
      var _this3 = this;

      if (this._unbindHandlers) {
        this._unbindHandlers();
      }
      var client = this._client.service.platform().client();
      client.on(client.events.requestError, this._requestErrorHandler);
      client.on(client.events.beforeRequest, this._beforeRequestHandler);
      this._unbindHandlers = function () {
        client.removeListener(client.events.requestError, _this3._requestErrorHandler);
        client.removeListener(client.events.beforeRequest, _this3._beforeRequestHandler);
        _this3._unbindHandlers = null;
      };
    }
  }, {
    key: 'ttl',
    get: function get() {
      return this.throttling ? this._throttleDuration - (Date.now() - this.timestamp) : 0;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'timestamp',
    get: function get() {
      return this._storage.getItem(this._storageKey);
    }
  }, {
    key: 'throttleDuration',
    get: function get() {
      return this._throttleDuration;
    }
  }, {
    key: 'throttling',
    get: function get() {
      return Date.now() - this._storage.getItem(this._storageKey) <= this._throttleDuration;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.state.status === _moduleStatuses2.default.ready;
    }
  }]);
  return RateLimiter;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'showAlert', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'showAlert'), _class2.prototype)), _class2)) || _class);
exports.default = RateLimiter;
//# sourceMappingURL=index.js.map
