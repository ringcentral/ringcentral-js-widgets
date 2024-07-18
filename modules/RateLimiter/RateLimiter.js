"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.number.parse-int");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RateLimiter = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _errorMessages = require("./errorMessages");
var _dec, _class, _class2, _descriptor, _descriptor2;
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DEFAULT_THROTTLE_DURATION = 61 * 1000;
var RateLimiter = (_dec = (0, _di.Module)({
  name: 'RateLimiter',
  deps: ['Alert', 'Client', 'GlobalStorage', {
    dep: 'Environment',
    optional: true
  }, {
    dep: 'RateLimiterOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(RateLimiter, _RcModuleV);
  var _super = _createSuper(RateLimiter);
  function RateLimiter(deps) {
    var _this$_deps$rateLimit, _this$_deps$rateLimit2;
    var _this;
    _classCallCheck(this, RateLimiter);
    _this = _super.call(this, {
      deps: deps,
      enableGlobalCache: true,
      storageKey: 'RateLimiter'
    });
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
    _this._timeoutId = null;
    _this._unbindHandlers = void 0;
    _this._throttleDuration = DEFAULT_THROTTLE_DURATION;
    _initializerDefineProperty(_this, "timestamp", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "rateLimitAlertId", _descriptor2, _assertThisInitialized(_this));
    /**
     * If the app is throttling, an incoming request will lead to an exception
     */
    _this._beforeRequestHandler = function () {
      if (_this.throttling) {
        throw new Error(_errorMessages.errorMessages.rateLimitReached);
      }
    };
    _this._checkTimestamp = function () {
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
      _this._timeoutId = null;
      if (!_this.throttling) {
        _this.stopThrottle();
      }
    };
    _this._requestErrorHandler = function (error) {
      if (!(error instanceof Error) || error.message !== 'Request rate exceeded') {
        return;
      }

      // Get `retry-after` from response headers first
      _this._throttleDuration = DEFAULT_THROTTLE_DURATION;
      if (error.response) {
        var retryAfter = error.response.headers.get('retry-after');
        if (retryAfter) {
          _this._throttleDuration = 1000 * Number.parseInt(retryAfter, 10);
        }
      }
      var wasThrottling = _this.throttling;
      _this.startThrottle(Date.now());
      if (!wasThrottling) {
        _this.showAlert();
      }
      clearTimeout(_this._timeoutId);
      _this._timeoutId = setTimeout(_this._checkTimestamp, _this._throttleDuration);
    };
    _this._throttleDuration = (_this$_deps$rateLimit = (_this$_deps$rateLimit2 = _this._deps.rateLimiterOptions) === null || _this$_deps$rateLimit2 === void 0 ? void 0 : _this$_deps$rateLimit2.throttleDuration) !== null && _this$_deps$rateLimit !== void 0 ? _this$_deps$rateLimit : DEFAULT_THROTTLE_DURATION;
    return _this;
  }
  _createClass(RateLimiter, [{
    key: "startThrottle",
    value: function startThrottle(timestamp) {
      this.timestamp = timestamp;
    }
  }, {
    key: "stopThrottle",
    value: function stopThrottle() {
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'number'.
      this.timestamp = null;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      if (this._deps.environment) {
        (0, _core.watch)(this,
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        function () {
          return _this2._deps.environment.changeCounter;
        }, function () {
          if (_this2.ready) {
            _this2._bindHandlers();
          }
        });
      }
    }
  }, {
    key: "onInit",
    value: function onInit() {
      this._bindHandlers();
    }
  }, {
    key: "showAlert",
    value: function () {
      var _showAlert = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!this.throttling || !this._deps.alert || this._suppressAlerts)) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt("return");
              case 2:
                _context.next = 4;
                return this._deps.alert.warning({
                  message: _errorMessages.errorMessages.rateLimitReached,
                  ttl: this.ttl,
                  allowDuplicates: false
                });
              case 4:
                this.rateLimitAlertId = _context.sent;
              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function showAlert() {
        return _showAlert.apply(this, arguments);
      }
      return showAlert;
    }()
  }, {
    key: "_bindHandlers",
    value: function _bindHandlers() {
      var _this3 = this;
      if (this._unbindHandlers) {
        this._unbindHandlers();
      }
      var client = this._deps.client.service.client();
      // TODO: Bind the `rateLimitError` event instead
      client.on(client.events.requestError, this._requestErrorHandler);
      client.on(client.events.beforeRequest, this._beforeRequestHandler);
      this._unbindHandlers = function () {
        client.removeListener(client.events.requestError, _this3._requestErrorHandler);
        client.removeListener(client.events.beforeRequest, _this3._beforeRequestHandler);
        // @ts-expect-error TS(2322): Type 'null' is not assignable to type '(() => void... Remove this comment to see the full error message
        _this3._unbindHandlers = null;
      };
    }
  }, {
    key: "_suppressAlerts",
    get: function get() {
      var _this$_deps$rateLimit3, _this$_deps$rateLimit4;
      return (_this$_deps$rateLimit3 = (_this$_deps$rateLimit4 = this._deps.rateLimiterOptions) === null || _this$_deps$rateLimit4 === void 0 ? void 0 : _this$_deps$rateLimit4.suppressAlerts) !== null && _this$_deps$rateLimit3 !== void 0 ? _this$_deps$rateLimit3 : false;
    }
  }, {
    key: "ttl",
    get: function get() {
      return this.throttling ? this._throttleDuration - (Date.now() - this.timestamp) : 0;
    }
  }, {
    key: "throttleDuration",
    get: function get() {
      return this._throttleDuration;
    }
    /**
     * Is in throttling status
     */
  }, {
    key: "throttling",
    get: function get() {
      return Date.now() - this.timestamp <= this._throttleDuration;
    }
  }]);
  return RateLimiter;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "timestamp", [_core.globalStorage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rateLimitAlertId", [_core.globalStorage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "startThrottle", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "startThrottle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stopThrottle", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "stopThrottle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showAlert", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "showAlert"), _class2.prototype)), _class2)) || _class);
exports.RateLimiter = RateLimiter;
//# sourceMappingURL=RateLimiter.js.map
