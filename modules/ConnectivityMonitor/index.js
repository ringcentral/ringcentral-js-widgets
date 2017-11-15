'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DEFAULT_HEART_BEAT_INTERVAL = exports.DEFAULT_TIME_TO_RETRY = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

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

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _dec, _class, _desc, _value, _class2;

var defaultCheckConnectionFn = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', fetch('https://pubsub.pubnub.com/time/0'));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function defaultCheckConnectionFn() {
    return _ref.apply(this, arguments);
  };
}();

/**
 * @class
 * @description Connectivity monitor module
 */


require('isomorphic-fetch');

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _getConnectivityMonitorReducer = require('./getConnectivityMonitorReducer');

var _getConnectivityMonitorReducer2 = _interopRequireDefault(_getConnectivityMonitorReducer);

var _connectivityMonitorMessages = require('./connectivityMonitorMessages');

var _connectivityMonitorMessages2 = _interopRequireDefault(_connectivityMonitorMessages);

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

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

var DEFAULT_TIME_TO_RETRY = exports.DEFAULT_TIME_TO_RETRY = 5 * 1000;
var DEFAULT_HEART_BEAT_INTERVAL = exports.DEFAULT_HEART_BEAT_INTERVAL = 60 * 1000;

var ConnectivityMonitor = (_dec = (0, _di.Module)({
  deps: ['Alert', 'Client', { dep: 'Environment', optional: true }, { dep: 'ConnectivityMonitorOptions', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(ConnectivityMonitor, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Alert} params.alert - alert module instance
   * @param {Client} params.client - client module instance
   * @param {Environment} params.environment - environment module instance
   * @param {Number} params.timeToRetry - time to Retry
   * @param {Number} params.heartBeatInterval - heart beat interval
   * @param {Function} params.checkConnectionFunc - function to check network
   */
  function ConnectivityMonitor(_ref2) {
    var _this2 = this;

    var alert = _ref2.alert,
        client = _ref2.client,
        environment = _ref2.environment,
        _ref2$timeToRetry = _ref2.timeToRetry,
        timeToRetry = _ref2$timeToRetry === undefined ? DEFAULT_TIME_TO_RETRY : _ref2$timeToRetry,
        _ref2$heartBeatInterv = _ref2.heartBeatInterval,
        heartBeatInterval = _ref2$heartBeatInterv === undefined ? DEFAULT_HEART_BEAT_INTERVAL : _ref2$heartBeatInterv,
        _ref2$checkConnection = _ref2.checkConnectionFunc,
        checkConnectionFunc = _ref2$checkConnection === undefined ? defaultCheckConnectionFn : _ref2$checkConnection,
        options = (0, _objectWithoutProperties3.default)(_ref2, ['alert', 'client', 'environment', 'timeToRetry', 'heartBeatInterval', 'checkConnectionFunc']);
    (0, _classCallCheck3.default)(this, ConnectivityMonitor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ConnectivityMonitor.__proto__ || (0, _getPrototypeOf2.default)(ConnectivityMonitor)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._alert = alert;
    _this._client = _ensureExist2.default.call(_this, client, 'client');
    _this._environment = environment;
    _this._timeToRetry = timeToRetry;
    _this._heartBeatInterval = heartBeatInterval;
    _this._reducer = (0, _getConnectivityMonitorReducer2.default)(_this.actionTypes);
    _this._retryTimeoutId = null;
    _this._lastEnvironmentCounter = 0;

    // auto bind this
    _this._beforeRequestHandler = _this._beforeRequestHandler.bind(_this);
    _this._requestSuccessHandler = _this._requestSuccessHandler.bind(_this);
    _this._requestErrorHandler = _this._requestErrorHandler.bind(_this);

    _this._checkConnectionFunc = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return checkConnectionFunc();

            case 3:
              _this._requestSuccessHandler();
              _context2.next = 9;
              break;

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2['catch'](0);

              _this._requestErrorHandler(_context2.t0);

            case 9:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[0, 6]]);
    }));
    return _this;
  }

  (0, _createClass3.default)(ConnectivityMonitor, [{
    key: '_shouldInit',
    value: function _shouldInit() {
      return !!(this.pending && (!this._environment || this._environment.ready));
    }
  }, {
    key: '_shouldRebindHandlers',
    value: function _shouldRebindHandlers() {
      return !!(this.ready && this._environment && this._environment.ready && this._environment.changeCounter !== this._lastEnvironmentCounter);
    }
  }, {
    key: '_onStateChange',
    value: function _onStateChange() {
      if (this._shouldInit()) {
        this._bindHandlers();
        this.store.dispatch({
          type: this.actionTypes.initSuccess
        });
        this._retry();
      } else if (this._shouldRebindHandlers()) {
        this._lastEnvironmentCounter = this._environment.changeCounter;
        this._bindHandlers();
      }
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      var _this3 = this;

      this.store.subscribe(function () {
        return _this3._onStateChange();
      });
    }
  }, {
    key: '_beforeRequestHandler',
    value: function _beforeRequestHandler() {
      this._clearTimeout();
    }
  }, {
    key: '_requestSuccessHandler',
    value: function _requestSuccessHandler() {
      if (!this.connectivity) {
        this.store.dispatch({
          type: this.actionTypes.connectSuccess
        });
        if (this._alert) {
          // dismiss disconnected alerts if found
          var alertIds = this._alert.messages.filter(function (m) {
            return m.message === _connectivityMonitorMessages2.default.disconnected;
          }).map(function (m) {
            return m.id;
          });
          if (alertIds.length) {
            this._alert.dismiss(alertIds);
          }
        }
      }
      this._retry();
    }
  }, {
    key: 'showAlert',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.connectivity && this._alert) {
                  this._alert.danger({
                    message: _connectivityMonitorMessages2.default.disconnected,
                    allowDuplicates: false
                  });
                }

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function showAlert() {
        return _ref4.apply(this, arguments);
      }

      return showAlert;
    }()
  }, {
    key: '_requestErrorHandler',
    value: function _requestErrorHandler(error) {
      if (!error.apiResponse || !error.apiResponse._response) {
        if (this.connectivity) {
          this.store.dispatch({
            type: this.actionTypes.connectFail
          });
          this.showAlert();
        }
        this._retry();
      }
    }
  }, {
    key: '_bindHandlers',
    value: function _bindHandlers() {
      var _this4 = this;

      if (this._unbindHandlers) {
        this._unbindHandlers();
      }
      var client = this._client.service.platform().client();
      client.on(client.events.requestSuccess, this._requestSuccessHandler);
      client.on(client.events.requestError, this._requestErrorHandler);
      if (typeof window !== 'undefined') {
        window.addEventListener('offline', this._requestErrorHandler);
      }
      this._unbindHandlers = function () {
        client.removeListener(client.events.requestSuccess, _this4._requestSuccessHandler);
        client.removeListener(client.events.requestError, _this4._requestErrorHandler);
        if (typeof window !== 'undefined') {
          window.removeEventListener('offline', _this4._requestErrorHandler);
        }
        _this4._unbindHandlers = null;
      };
    }
  }, {
    key: '_checkConnection',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this._checkConnectionFunc();

              case 3:
                _context4.next = 7;
                break;

              case 5:
                _context4.prev = 5;
                _context4.t0 = _context4['catch'](0);

              case 7:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 5]]);
      }));

      function _checkConnection() {
        return _ref5.apply(this, arguments);
      }

      return _checkConnection;
    }()
  }, {
    key: '_clearTimeout',
    value: function _clearTimeout() {
      if (this._retryTimeoutId) {
        clearTimeout(this._retryTimeoutId);
        this._retryTimeoutId = null;
      }
    }
  }, {
    key: '_retry',
    value: function _retry() {
      var _this5 = this;

      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.connectivity ? this._heartBeatInterval : this._timeToRetry;

      this._clearTimeout();
      this._retryTimeoutId = setTimeout(function () {
        _this5._retryTimeoutId = null;
        _this5._checkConnection();
      }, t);
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.state.status === _moduleStatuses2.default.ready;
    }
  }, {
    key: 'pending',
    get: function get() {
      return this.state.status === _moduleStatuses2.default.pending;
    }
  }, {
    key: 'connectivity',
    get: function get() {
      return this.state.connectivity;
    }
  }]);
  return ConnectivityMonitor;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'showAlert', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'showAlert'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_checkConnection', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_checkConnection'), _class2.prototype)), _class2)) || _class);
exports.default = ConnectivityMonitor;
//# sourceMappingURL=index.js.map
