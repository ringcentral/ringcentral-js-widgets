'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

var _getRateLimiterReducer = require('./getRateLimiterReducer');

var _getRateLimiterReducer2 = _interopRequireDefault(_getRateLimiterReducer);

var _errorMessages = require('./errorMessages');

var _errorMessages2 = _interopRequireDefault(_errorMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_THROTTLE_DURATION = 61 * 1000;
var DEFAULT_ALERT_TTL = 5 * 1000;

var RateLimiter = function (_RcModule) {
  (0, _inherits3.default)(RateLimiter, _RcModule);

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
                } else if (_this2.ready && _this2._environment && _this2._environment.changed) {
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
    value: function showAlert() {
      if (this.throttling && this._alert) {
        this._alert.danger({
          message: _errorMessages2.default.rateLimitReached,
          ttl: DEFAULT_ALERT_TTL,
          allowDuplicates: false
        });
      }
    }
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
      return this.state.status === _moduleStatus2.default.ready;
    }
  }]);
  return RateLimiter;
}(_RcModule3.default);

exports.default = RateLimiter;
//# sourceMappingURL=index.js.map
