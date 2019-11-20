"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DEFAULT_HEART_BEAT_INTERVAL = exports.DEFAULT_TIME_TO_RETRY = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.function.bind");

require("regenerator-runtime/runtime");

require("isomorphic-fetch");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _getConnectivityMonitorReducer = _interopRequireDefault(require("./getConnectivityMonitorReducer"));

var _errorMessages = _interopRequireDefault(require("../RateLimiter/errorMessages"));

var _errorMessages2 = _interopRequireDefault(require("../AvailabilityMonitor/errorMessages"));

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _dec, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var DEFAULT_TIME_TO_RETRY = 5 * 1000;
exports.DEFAULT_TIME_TO_RETRY = DEFAULT_TIME_TO_RETRY;
var DEFAULT_HEART_BEAT_INTERVAL = 60 * 1000;
exports.DEFAULT_HEART_BEAT_INTERVAL = DEFAULT_HEART_BEAT_INTERVAL;

function defaultCheckConnectionFn() {
  return regeneratorRuntime.async(function defaultCheckConnectionFn$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", fetch('https://pubsub.pubnub.com/time/0'));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}
/**
 * @class
 * @description Connectivity monitor module
 */


var ConnectivityMonitor = (_dec = (0, _di.Module)({
  deps: ['Client', {
    dep: 'Environment',
    optional: true
  }, {
    dep: 'ConnectivityMonitorOptions',
    optional: true
  }]
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_RcModule) {
  _inherits(ConnectivityMonitor, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Environment} params.environment - environment module instance
   * @param {Number} params.timeToRetry - time to Retry
   * @param {Number} params.heartBeatInterval - heart beat interval
   * @param {Function} params.checkConnectionFunc - function to check network
   */
  function ConnectivityMonitor(_ref) {
    var _context2;

    var _this;

    var client = _ref.client,
        environment = _ref.environment,
        _ref$timeToRetry = _ref.timeToRetry,
        timeToRetry = _ref$timeToRetry === void 0 ? DEFAULT_TIME_TO_RETRY : _ref$timeToRetry,
        _ref$heartBeatInterva = _ref.heartBeatInterval,
        heartBeatInterval = _ref$heartBeatInterva === void 0 ? DEFAULT_HEART_BEAT_INTERVAL : _ref$heartBeatInterva,
        _ref$checkConnectionF = _ref.checkConnectionFunc,
        checkConnectionFunc = _ref$checkConnectionF === void 0 ? defaultCheckConnectionFn : _ref$checkConnectionF,
        options = _objectWithoutProperties(_ref, ["client", "environment", "timeToRetry", "heartBeatInterval", "checkConnectionFunc"]);

    _classCallCheck(this, ConnectivityMonitor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConnectivityMonitor).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes["default"]
    })));
    _this._client = (_context2 = _assertThisInitialized(_this), _ensureExist["default"]).call(_context2, client, 'client');
    _this._environment = environment;
    _this._timeToRetry = timeToRetry;
    _this._heartBeatInterval = heartBeatInterval;
    _this._reducer = (0, _getConnectivityMonitorReducer["default"])(_this.actionTypes);
    _this._retryTimeoutId = null;
    _this._lastEnvironmentCounter = 0; // auto bind this

    _this._requestSuccessHandler = (_context2 = _assertThisInitialized(_this), _this._requestSuccessHandler).bind(_context2);
    _this._requestErrorHandler = (_context2 = _assertThisInitialized(_this), _this._requestErrorHandler).bind(_context2);
    _this._networkErrorHandler = (_context2 = _assertThisInitialized(_this), _this._networkErrorHandler).bind(_context2);

    _this._checkConnectionFunc = function _callee() {
      return regeneratorRuntime.async(function _callee$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return regeneratorRuntime.awrap(checkConnectionFunc());

            case 3:
              _this._requestSuccessHandler();

              _context3.next = 9;
              break;

            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3["catch"](0);

              _this._requestErrorHandler(_context3.t0);

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 6]]);
    };

    return _this;
  }

  _createClass(ConnectivityMonitor, [{
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(this.pending && (!this._environment || this._environment.ready));
    }
  }, {
    key: "_shouldRebindHandlers",
    value: function _shouldRebindHandlers() {
      return !!(this.ready && this._environment && this._environment.ready && this._environment.changeCounter !== this._lastEnvironmentCounter);
    }
  }, {
    key: "_onStateChange",
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
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_requestSuccessHandler",
    value: function _requestSuccessHandler(res) {
      if (!this.connectivity) {
        this.store.dispatch({
          type: this.actionTypes.connectSuccess
        });
      }

      this._retry();
    }
  }, {
    key: "_requestErrorHandler",
    value: function _requestErrorHandler(error) {
      if (error.message && (error.message === _errorMessages["default"].rateLimitReached || error.message === _errorMessages2["default"].serviceLimited)) return;

      if (!error.apiResponse || !error.apiResponse._response) {
        if (this.connectivity) {
          this.store.dispatch({
            type: this.actionTypes.connectFail
          });
        }
      }

      this._retry();
    }
  }, {
    key: "_networkErrorHandler",
    value: function _networkErrorHandler() {
      if (!this.networkLoss) {
        this.store.dispatch({
          type: this.actionTypes.networkLoss
        });
      }

      this._retry();
    }
  }, {
    key: "_bindHandlers",
    value: function _bindHandlers() {
      var _this3 = this;

      if (this._unbindHandlers) {
        this._unbindHandlers();
      }

      var client = this._client.service.platform().client();

      client.on(client.events.requestSuccess, this._requestSuccessHandler);
      client.on(client.events.requestError, this._requestErrorHandler);

      if (typeof window !== 'undefined') {
        window.addEventListener('offline', this._networkErrorHandler);
      }

      this._unbindHandlers = function () {
        client.removeListener(client.events.requestSuccess, _this3._requestSuccessHandler);
        client.removeListener(client.events.requestError, _this3._requestErrorHandler);

        if (typeof window !== 'undefined') {
          window.removeEventListener('offline', _this3._networkErrorHandler);
        }

        _this3._unbindHandlers = null;
      };
    }
  }, {
    key: "_checkConnection",
    value: function _checkConnection() {
      return regeneratorRuntime.async(function _checkConnection$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return regeneratorRuntime.awrap(this._checkConnectionFunc());

            case 3:
              _context4.next = 7;
              break;

            case 5:
              _context4.prev = 5;
              _context4.t0 = _context4["catch"](0);

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[0, 5]]);
    }
  }, {
    key: "_clearTimeout",
    value: function _clearTimeout() {
      if (this._retryTimeoutId) {
        clearTimeout(this._retryTimeoutId);
        this._retryTimeoutId = null;
      }
    }
  }, {
    key: "_retry",
    value: function _retry() {
      var _this4 = this;

      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.connectivity ? this._heartBeatInterval : this._timeToRetry;

      this._clearTimeout();

      this._retryTimeoutId = setTimeout(function () {
        _this4._retryTimeoutId = null;

        _this4._checkConnection();
      }, t);
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].ready;
    }
  }, {
    key: "pending",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].pending;
    }
  }, {
    key: "connectivity",
    get: function get() {
      return this.state.connectivity;
    }
  }, {
    key: "networkLoss",
    get: function get() {
      return this.state.networkLoss;
    }
  }]);

  return ConnectivityMonitor;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "_checkConnection", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_checkConnection"), _class2.prototype)), _class2)) || _class);
exports["default"] = ConnectivityMonitor;
//# sourceMappingURL=index.js.map
