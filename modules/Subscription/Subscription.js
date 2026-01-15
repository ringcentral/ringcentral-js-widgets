"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subscription = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _core = require("@ringcentral-integration/core");
var _subscriptions = _interopRequireDefault(require("@ringcentral/subscriptions"));
var _ramda = require("ramda");
var _debounceThrottle = require("../../lib/debounce-throttle");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _normalizeEventFilter = require("./normalizeEventFilter");
var _subscriptionStatus = require("./subscriptionStatus");
var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DEFAULT_TIME_TO_RETRY = 20 * 1000;
var DEFAULT_REGISTER_DELAY = 2 * 1000;
var SUBSCRIPTION_LOCK_KEY = 'subscription-creating-lock';
var Subscription = exports.Subscription = (_dec = (0, _di.Module)({
  name: 'Subscription',
  deps: ['Auth', 'Client', 'Storage', 'SleepDetector', {
    dep: 'SubscriptionOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function Subscription(deps) {
    var _this;
    _classCallCheck(this, Subscription);
    _this = _callSuper(this, Subscription, [{
      deps: deps,
      storageKey: 'subscription',
      enableCache: true
    }]);
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Subscriptio... Remove this comment to see the full error message
    _this._subscription = null;
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
    _this._retryTimeoutId = null;
    _this._debouncedRegister = void 0;
    _this._retry = void 0;
    _this._subscriberMap = new Map();
    _this.__debugNotification__ = false;
    _initializerDefineProperty(_this, "message", _descriptor, _this);
    _initializerDefineProperty(_this, "filters", _descriptor2, _this);
    _initializerDefineProperty(_this, "cachedSubscription", _descriptor3, _this);
    _initializerDefineProperty(_this, "subscriptionStatus", _descriptor4, _this);
    _this._handleSleep = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var _this$_subscription, renewPromise;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            if (!(_this.ready && _this._subscription)) {
              _context.n = 2;
              break;
            }
            // to wait automatic renew finish
            renewPromise = _this._subscription.automaticRenewing();
            if (!renewPromise) {
              _context.n = 1;
              break;
            }
            _context.n = 1;
            return renewPromise;
          case 1:
            _context.n = 2;
            return (_this$_subscription = _this._subscription) === null || _this$_subscription === void 0 ? void 0 : _this$_subscription.resubscribeAtPubNub();
          case 2:
            return _context.a(2);
        }
      }, _callee);
    }));
    _this._onBeforeLogout = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            if (!_this._subscription) {
              _context2.n = 1;
              break;
            }
            _context2.n = 1;
            return _this._removeSubscription();
          case 1:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    _this._debouncedRegister = (0, _debounceThrottle.promisedDebounce)({
      fn: _this._register,
      threshold: _this._registerDelay
    });
    _this._retry = (0, _debounceThrottle.debounce)({
      fn: _this._createSubscriptionWithLock,
      threshold: _this._timeToRetry,
      maxThreshold: _this._timeToRetry
    });
    return _this;
  }
  _inherits(Subscription, _RcModuleV);
  return _createClass(Subscription, [{
    key: "_addFilters",
    value: function _addFilters(filters) {
      this._setStates({
        filters: (0, _ramda.uniq)((0, _ramda.concat)(filters, this.filters))
      });
    }
  }, {
    key: "_setStates",
    value: function _setStates(_ref3) {
      var _ref3$message = _ref3.message,
        message = _ref3$message === void 0 ? this.message : _ref3$message,
        _ref3$filters = _ref3.filters,
        filters = _ref3$filters === void 0 ? this.filters : _ref3$filters,
        _ref3$status = _ref3.status,
        status = _ref3$status === void 0 ? this.subscriptionStatus : _ref3$status,
        _ref3$cachedSubscript = _ref3.cachedSubscription,
        cachedSubscription = _ref3$cachedSubscript === void 0 ? this.cachedSubscription : _ref3$cachedSubscript;
      this.message = message;
      this.filters = filters;
      this.subscriptionStatus = status;
      this.cachedSubscription = cachedSubscription;
    }
  }, {
    key: "_timeToRetry",
    get: function get() {
      var _this$_deps$subscript, _this$_deps$subscript2;
      return Math.max(0, (_this$_deps$subscript = (_this$_deps$subscript2 = this._deps.subscriptionOptions) === null || _this$_deps$subscript2 === void 0 ? void 0 : _this$_deps$subscript2.timeToRetry) !== null && _this$_deps$subscript !== void 0 ? _this$_deps$subscript : DEFAULT_TIME_TO_RETRY);
    }
  }, {
    key: "_registerDelay",
    get: function get() {
      var _this$_deps$subscript3, _this$_deps$subscript4;
      return Math.max(0, (_this$_deps$subscript3 = (_this$_deps$subscript4 = this._deps.subscriptionOptions) === null || _this$_deps$subscript4 === void 0 ? void 0 : _this$_deps$subscript4.registerDelay) !== null && _this$_deps$subscript3 !== void 0 ? _this$_deps$subscript3 : DEFAULT_REGISTER_DELAY);
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return _superPropGet(Subscription, "_shouldInit", this, 3)([]) && this._deps.auth.loggedIn;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return _superPropGet(Subscription, "_shouldReset", this, 3)([]) || this.ready && !this._deps.auth.loggedIn;
    }
  }, {
    key: "onInit",
    value: function onInit() {
      this._deps.sleepDetector.on(this._deps.sleepDetector.events.detected, this._handleSleep);
      this._deps.auth.addBeforeLogoutHandler(this._onBeforeLogout);
    }
  }, {
    key: "onInitSuccess",
    value: function () {
      var _onInitSuccess = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              if (this._subscriberMap.size > 0) {
                this._createSubscriptionWithLock();
              }
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function onInitSuccess() {
        return _onInitSuccess.apply(this, arguments);
      }
      return onInitSuccess;
    }()
  }, {
    key: "onReset",
    value: function () {
      var _onReset = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              this._setStates({
                filters: [],
                // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'MessageBase... Remove this comment to see the full error message
                message: null,
                status: _subscriptionStatus.subscriptionStatus.notSubscribed
              });
              this._deps.sleepDetector.off(this._deps.sleepDetector.events.detected, this._handleSleep);
              this._retry.cancel();
              this._deps.auth.removeBeforeLogoutHandler(this._onBeforeLogout);
              this._debouncedRegister.cancel();
              if (this._subscription) {
                this._subscription.reset();
                this._subscription.removeAllListeners();
                // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Subscriptio... Remove this comment to see the full error message
                this._subscription = null;
              }
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function onReset() {
        return _onReset.apply(this, arguments);
      }
      return onReset;
    }()
  }, {
    key: "_onRemoveSuccess",
    value: function _onRemoveSuccess() {
      this._setStates({
        status: _subscriptionStatus.subscriptionStatus.notSubscribed,
        // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Subscriptio... Remove this comment to see the full error message
        cachedSubscription: null
      });
    }
  }, {
    key: "_onRemoveError",
    value: function _onRemoveError(error) {
      this._setStates({
        status: _subscriptionStatus.subscriptionStatus.notSubscribed,
        // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Subscriptio... Remove this comment to see the full error message
        cachedSubscription: null
      });
    }
  }, {
    key: "_onRenewSuccess",
    value: function _onRenewSuccess() {
      if (this._subscription) {
        this._setStates({
          status: _subscriptionStatus.subscriptionStatus.subscribed,
          cachedSubscription: this._subscription.subscription()
        });
      }
    }
  }, {
    key: "_onRenewError",
    value: function _onRenewError(error) {
      if (this._subscription) {
        this._subscription.reset();
        this._subscription.removeAllListeners();
        // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Subscriptio... Remove this comment to see the full error message
        this._subscription = null;
      }
      this._setStates({
        status: _subscriptionStatus.subscriptionStatus.notSubscribed,
        // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Subscriptio... Remove this comment to see the full error message
        cachedSubscription: null
      });
      if (this.ready) {
        // immediately start the retry process after the first renewError
        this._retry();
        this._retry.flush();
      }
    }
  }, {
    key: "_onSubscribeSuccess",
    value: function _onSubscribeSuccess() {
      if (this._subscription) {
        this._setStates({
          status: _subscriptionStatus.subscriptionStatus.subscribed,
          cachedSubscription: this._subscription.subscription()
        });
      }
    }
  }, {
    key: "_onSubscribeError",
    value: function _onSubscribeError(error) {
      this._setStates({
        status: _subscriptionStatus.subscriptionStatus.notSubscribed,
        // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Subscriptio... Remove this comment to see the full error message
        cachedSubscription: null
      });
      if (this.ready) {
        this._retry();
      }
    }
  }, {
    key: "_onNotification",
    value: function _onNotification(message) {
      // for our support collect pubnub message;
      if (this.__debugNotification__) {
        console.log('Received Notification:', JSON.stringify(message));
      }
      this._setStates({
        message: message
      });
    }
  }, {
    key: "_createSubscription",
    value: function () {
      var _createSubscription2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var _this2 = this;
        var sdk, _t;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              if (this.ready && !this._subscription) {
                sdk = this._deps.client.service;
                this._subscription = new _subscriptions["default"]({
                  sdk: sdk
                }).createSubscription();
                if (this.cachedSubscription) {
                  try {
                    this._subscription.setSubscription(this.cachedSubscription);
                  } catch (error) {
                    this._subscription = new _subscriptions["default"]({
                      sdk: sdk
                    }).createSubscription();
                  }
                }
                // TODO: fix Subscription limit issue about multiple create Subscription issue when multi-tab login.
                this._subscription.on(this._subscription.events.notification, function (message) {
                  return _this2._onNotification(message);
                });
                this._subscription.on(this._subscription.events.removeSuccess, function () {
                  return _this2._onRemoveSuccess();
                });
                this._subscription.on(this._subscription.events.removeError, function (error) {
                  return _this2._onRemoveError(error);
                });
                this._subscription.on(this._subscription.events.renewSuccess, function () {
                  return _this2._onRenewSuccess();
                });
                this._subscription.on(this._subscription.events.renewError, function (error) {
                  return _this2._onRenewError(error);
                });
                this._subscription.on(this._subscription.events.subscribeSuccess, function () {
                  return _this2._onSubscribeSuccess();
                });
                this._subscription.on(this._subscription.events.subscribeError, function (error) {
                  return _this2._onSubscribeError(error);
                });
              }
              _context5.p = 1;
              _context5.n = 2;
              return this._debouncedRegister();
            case 2:
              _context5.n = 4;
              break;
            case 3:
              _context5.p = 3;
              _t = _context5.v;
              if (!(_t.message !== 'cancelled')) {
                _context5.n = 4;
                break;
              }
              throw _t;
            case 4:
              return _context5.a(2);
          }
        }, _callee5, this, [[1, 3]]);
      }));
      function _createSubscription() {
        return _createSubscription2.apply(this, arguments);
      }
      return _createSubscription;
    }()
  }, {
    key: "_createSubscriptionWithLock",
    value: function () {
      var _createSubscriptionWithLock2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var _navigator,
          _navigator$locks,
          _this3 = this;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              if ((_navigator = navigator) === null || _navigator === void 0 ? void 0 : (_navigator$locks = _navigator.locks) === null || _navigator$locks === void 0 ? void 0 : _navigator$locks.request) {
                _context6.n = 2;
                break;
              }
              _context6.n = 1;
              return this._createSubscription();
            case 1:
              _context6.n = 3;
              break;
            case 2:
              _context6.n = 3;
              return navigator.locks.request(SUBSCRIPTION_LOCK_KEY, function () {
                return _this3._createSubscription();
              });
            case 3:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function _createSubscriptionWithLock() {
        return _createSubscriptionWithLock2.apply(this, arguments);
      }
      return _createSubscriptionWithLock;
    }()
  }, {
    key: "_shouldUpdateSubscription",
    value: function _shouldUpdateSubscription(eventFilters) {
      return !!(this._subscription && !(0, _ramda.equals)((0, _ramda.map)(_normalizeEventFilter.normalizeEventFilter, this._subscription.eventFilters()).sort(), (0, _ramda.map)(_normalizeEventFilter.normalizeEventFilter, eventFilters).sort()));
    }
  }, {
    key: "_register",
    value: function () {
      var _register2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var eventFilters;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              eventFilters = this.getFilters();
              if (!this._shouldUpdateSubscription(eventFilters)) {
                _context7.n = 1;
                break;
              }
              this._setStates({
                status: _subscriptionStatus.subscriptionStatus.subscribing
              });
              this._subscription.setEventFilters(_toConsumableArray(eventFilters));
              _context7.n = 1;
              return this._subscription.register();
            case 1:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function _register() {
        return _register2.apply(this, arguments);
      }
      return _register;
    }()
  }, {
    key: "_removeSubscription",
    value: function () {
      var _removeSubscription2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var _t2;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              if (!this._subscription) {
                _context8.n = 5;
                break;
              }
              this._setStates({
                status: _subscriptionStatus.subscriptionStatus.unsubscribing
              });
              _context8.p = 1;
              _context8.n = 2;
              return this._subscription.remove();
            case 2:
              _context8.n = 4;
              break;
            case 3:
              _context8.p = 3;
              _t2 = _context8.v;
            case 4:
              if (this._subscription) {
                this._subscription.reset();
                this._subscription.removeAllListeners();
                // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Subscriptio... Remove this comment to see the full error message
                this._subscription = null;
              }
              this._setStates({
                status: _subscriptionStatus.subscriptionStatus.notSubscribed
              });
            case 5:
              return _context8.a(2);
          }
        }, _callee8, this, [[1, 3]]);
      }));
      function _removeSubscription() {
        return _removeSubscription2.apply(this, arguments);
      }
      return _removeSubscription;
    }()
  }, {
    key: "subscribe",
    value: function () {
      var _subscribe = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        var events,
          _this$_subscription$e,
          _this$_subscription2,
          oldFiltersCount,
          _args9 = arguments;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              events = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : [];
              if (!this.ready) {
                _context9.n = 1;
                break;
              }
              oldFiltersCount = (_this$_subscription$e = (_this$_subscription2 = this._subscription) === null || _this$_subscription2 === void 0 ? void 0 : _this$_subscription2.eventFilters().length) !== null && _this$_subscription$e !== void 0 ? _this$_subscription$e : 0; // use [].concat for potential compatibility issue
              // @ts-expect-error TS(2769): No overload matches this call.
              this._addFilters([].concat(events));
              if (!(oldFiltersCount !== this.filters.length)) {
                _context9.n = 1;
                break;
              }
              _context9.n = 1;
              return this._createSubscriptionWithLock();
            case 1:
              return _context9.a(2);
          }
        }, _callee9, this);
      }));
      function subscribe() {
        return _subscribe.apply(this, arguments);
      }
      return subscribe;
    }()
  }, {
    key: "register",
    value: function register(module, metadata) {
      this._subscriberMap.set(module, metadata);
    }
  }, {
    key: "getFilters",
    value: function getFilters() {
      // Registered filters
      var filters = Array.from(this._subscriberMap.values()).reduce(function (acc, metadata) {
        return acc.concat(metadata.filters);
      }, []);
      filters = filters.concat(this.filters) // Concat subscribed filters
      .filter(function (x, index, array) {
        return array.indexOf(x) === index;
      }); // remove duplicates

      return filters;
    }
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "message", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "filters", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "cachedSubscription", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "subscriptionStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _subscriptionStatus.subscriptionStatus.notSubscribed;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setStates", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStates"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "subscribe", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "subscribe"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=Subscription.js.map
