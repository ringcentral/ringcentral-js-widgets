"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectivityMonitor = exports.DEFAULT_HEART_BEAT_INTERVAL = exports.DEFAULT_TIME_TO_RETRY = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("regenerator-runtime/runtime");

require("isomorphic-fetch");

var _core = require("@ringcentral-integration/core");

var _di = require("../../lib/di");

var _RateLimiterV = require("../RateLimiterV2");

var _errorMessages = _interopRequireDefault(require("../AvailabilityMonitor/errorMessages"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var DEFAULT_TIME_TO_RETRY = 5 * 1000;
exports.DEFAULT_TIME_TO_RETRY = DEFAULT_TIME_TO_RETRY;
var DEFAULT_HEART_BEAT_INTERVAL = 60 * 1000;
exports.DEFAULT_HEART_BEAT_INTERVAL = DEFAULT_HEART_BEAT_INTERVAL;
var errorMessageTypes = [_RateLimiterV.errorMessages.rateLimitReached, _errorMessages["default"].serviceLimited];

function defaultCheckConnectionFn() {
  return _defaultCheckConnectionFn.apply(this, arguments);
}

function _defaultCheckConnectionFn() {
  _defaultCheckConnectionFn = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", fetch('https://pubsub.pubnub.com/time/0'));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _defaultCheckConnectionFn.apply(this, arguments);
}

var ConnectivityMonitor = (_dec = (0, _di.Module)({
  name: 'ConnectivityMonitor',
  deps: ['Client', {
    dep: 'Environment',
    optional: true
  }, {
    dep: 'ConnectivityMonitorOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(ConnectivityMonitor, _RcModuleV);

  var _super = _createSuper(ConnectivityMonitor);

  function ConnectivityMonitor(deps) {
    var _this$_deps$connectiv, _this$_deps$connectiv2, _this$_deps$connectiv3, _this$_deps$connectiv4;

    var _this;

    _classCallCheck(this, ConnectivityMonitor);

    _this = _super.call(this, {
      deps: deps
    });
    _this._timeToRetry = (_this$_deps$connectiv = (_this$_deps$connectiv2 = _this._deps.connectivityMonitorOptions) === null || _this$_deps$connectiv2 === void 0 ? void 0 : _this$_deps$connectiv2.timeToRetry) !== null && _this$_deps$connectiv !== void 0 ? _this$_deps$connectiv : DEFAULT_TIME_TO_RETRY;
    _this._heartBeatInterval = (_this$_deps$connectiv3 = (_this$_deps$connectiv4 = _this._deps.connectivityMonitorOptions) === null || _this$_deps$connectiv4 === void 0 ? void 0 : _this$_deps$connectiv4.heartBeatInterval) !== null && _this$_deps$connectiv3 !== void 0 ? _this$_deps$connectiv3 : DEFAULT_HEART_BEAT_INTERVAL;
    _this._checkConnectionFunc = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _this$_deps$connectiv5, _this$_deps$connectiv6, checkConnectionFunc;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              checkConnectionFunc = (_this$_deps$connectiv5 = (_this$_deps$connectiv6 = _this._deps.connectivityMonitorOptions) === null || _this$_deps$connectiv6 === void 0 ? void 0 : _this$_deps$connectiv6.checkConnectionFunc) !== null && _this$_deps$connectiv5 !== void 0 ? _this$_deps$connectiv5 : defaultCheckConnectionFn;
              _context.next = 4;
              return checkConnectionFunc();

            case 4:
              _this._requestSuccessHandler();

              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);

              _this._requestErrorHandler(_context.t0);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));
    _this._retryTimeoutId = null;
    _this._lastEnvironmentCounter = 0;
    _this._unbindHandlers = null;

    _this._requestSuccessHandler = function () {
      if (!_this.connectivity) {
        _this.setConnectSuccess();
      }

      _this._retry();
    };

    _this._requestErrorHandler = function (error) {
      if (error.message && errorMessageTypes.includes(error.message)) return;

      if (!error.response) {
        if (_this.connectivity) {
          _this.setConnectFail();
        }
      }

      _this._retry();
    };

    _this._networkErrorHandler = function () {
      if (!_this.networkLoss) {
        _this.setNetworkLoss();
      }

      _this._retry();
    };

    _initializerDefineProperty(_this, "connectivity", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "networkLoss", _descriptor2, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(ConnectivityMonitor, [{
    key: "setNetworkLoss",
    value: function setNetworkLoss() {
      this.connectivity = false;
      this.networkLoss = true;
    }
  }, {
    key: "setConnectSuccess",
    value: function setConnectSuccess() {
      this.connectivity = true;
      this.networkLoss = false;
    }
  }, {
    key: "setConnectFail",
    value: function setConnectFail() {
      this.connectivity = false;
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(this.pending && (!this._deps.environment || this._deps.environment.ready));
    }
  }, {
    key: "_shouldRebindHandlers",
    value: function _shouldRebindHandlers() {
      var _this$_deps$environme;

      return !!(this.ready && ((_this$_deps$environme = this._deps.environment) === null || _this$_deps$environme === void 0 ? void 0 : _this$_deps$environme.ready) && this._deps.environment.changeCounter !== this._lastEnvironmentCounter);
    }
  }, {
    key: "onInit",
    value: function onInit() {
      this._bindHandlers();
    }
  }, {
    key: "onInitSuccess",
    value: function onInitSuccess() {
      this._retry();
    }
  }, {
    key: "onStateChange",
    value: function onStateChange() {
      if (!this._shouldInit() && this._shouldRebindHandlers()) {
        this._lastEnvironmentCounter = this._deps.environment.changeCounter;

        this._bindHandlers();
      }
    }
  }, {
    key: "_bindHandlers",
    value: function _bindHandlers() {
      var _this$_unbindHandlers,
          _window,
          _this2 = this;

      (_this$_unbindHandlers = this._unbindHandlers) === null || _this$_unbindHandlers === void 0 ? void 0 : _this$_unbindHandlers.call(this);

      var client = this._deps.client.service.client();

      client.on(client.events.requestSuccess, this._requestSuccessHandler);
      client.on(client.events.requestError, this._requestErrorHandler);
      (_window = window) === null || _window === void 0 ? void 0 : _window.addEventListener('offline', this._networkErrorHandler);

      this._unbindHandlers = function () {
        var _window2;

        client.removeListener(client.events.requestSuccess, _this2._requestSuccessHandler);
        client.removeListener(client.events.requestError, _this2._requestErrorHandler);
        (_window2 = window) === null || _window2 === void 0 ? void 0 : _window2.removeEventListener('offline', _this2._networkErrorHandler);
        _this2._unbindHandlers = null;
      };
    }
  }, {
    key: "_checkConnection",
    value: function () {
      var _checkConnection2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this._checkConnectionFunc();

              case 3:
                _context2.next = 7;
                break;

              case 5:
                _context2.prev = 5;
                _context2.t0 = _context2["catch"](0);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 5]]);
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
      var _this3 = this;

      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.connectivity ? this._heartBeatInterval : this._timeToRetry;

      this._clearTimeout();

      this._retryTimeoutId = setTimeout(function () {
        _this3._retryTimeoutId = null;

        _this3._checkConnection();
      }, t);
    }
  }]);

  return ConnectivityMonitor;
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "connectivity", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "networkLoss", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setNetworkLoss", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setNetworkLoss"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setConnectSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setConnectSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setConnectFail", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setConnectFail"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_checkConnection", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_checkConnection"), _class2.prototype)), _class2)) || _class);
exports.ConnectivityMonitor = ConnectivityMonitor;
//# sourceMappingURL=ConnectivityMonitor.js.map
