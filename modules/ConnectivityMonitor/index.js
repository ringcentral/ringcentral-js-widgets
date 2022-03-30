"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DEFAULT_TIME_TO_RETRY = exports.DEFAULT_HEART_BEAT_INTERVAL = void 0;

require("core-js/modules/es6.function.bind");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("isomorphic-fetch");

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _di = require("../../lib/di");

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _errorMessages = _interopRequireDefault(require("../AvailabilityMonitor/errorMessages"));

var _errorMessages2 = _interopRequireDefault(require("../RateLimiter/errorMessages"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getConnectivityMonitorReducer = _interopRequireDefault(require("./getConnectivityMonitorReducer"));

var _dec, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var DEFAULT_TIME_TO_RETRY = 5 * 1000;
exports.DEFAULT_TIME_TO_RETRY = DEFAULT_TIME_TO_RETRY;
var DEFAULT_HEART_BEAT_INTERVAL = 60 * 1000;
exports.DEFAULT_HEART_BEAT_INTERVAL = DEFAULT_HEART_BEAT_INTERVAL;

function defaultCheckConnectionFn() {
  return _defaultCheckConnectionFn.apply(this, arguments);
}
/**
 * @class
 * @description Connectivity monitor module
 */


function _defaultCheckConnectionFn() {
  _defaultCheckConnectionFn = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", fetch('https://pubsub.pubnub.com/time/0'));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _defaultCheckConnectionFn.apply(this, arguments);
}

var ConnectivityMonitor = (_dec = (0, _di.Module)({
  deps: ['Client', {
    dep: 'Environment',
    optional: true
  }, {
    dep: 'ConnectivityMonitorOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  _inherits(ConnectivityMonitor, _RcModule);

  var _super = _createSuper(ConnectivityMonitor);

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

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: _actionTypes["default"]
    }));
    _this._client = _ensureExist["default"].call(_assertThisInitialized(_this), client, 'client');
    _this._environment = environment;
    _this._timeToRetry = timeToRetry;
    _this._heartBeatInterval = heartBeatInterval;
    _this._reducer = (0, _getConnectivityMonitorReducer["default"])(_this.actionTypes);
    _this._retryTimeoutId = null;
    _this._lastEnvironmentCounter = 0; // auto bind this

    _this._requestSuccessHandler = _this._requestSuccessHandler.bind(_assertThisInitialized(_this));
    _this._requestErrorHandler = _this._requestErrorHandler.bind(_assertThisInitialized(_this));
    _this._networkErrorHandler = _this._networkErrorHandler.bind(_assertThisInitialized(_this));
    _this._checkConnectionFunc = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
              _context2.t0 = _context2["catch"](0);

              _this._requestErrorHandler(_context2.t0);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 6]]);
    }));
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
      if (error.message && (error.message === _errorMessages2["default"].rateLimitReached || error.message === _errorMessages["default"].serviceLimited)) return;

      if (!error.response) {
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

      var client = this._client.service.client();

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
    value: function () {
      var _checkConnection2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this._checkConnectionFunc();

              case 3:
                _context3.next = 7;
                break;

              case 5:
                _context3.prev = 5;
                _context3.t0 = _context3["catch"](0);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 5]]);
      }));

      function _checkConnection() {
        return _checkConnection2.apply(this, arguments);
      }

      return _checkConnection;
    }()
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
