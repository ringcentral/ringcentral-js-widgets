"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.sort");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subscription = void 0;
require("regenerator-runtime/runtime");
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
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));) { ; } return t; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DEFAULT_TIME_TO_RETRY = 20 * 1000;
var DEFAULT_REGISTER_DELAY = 2 * 1000;
var SUBSCRIPTION_LOCK_KEY = 'subscription-creating-lock';
var Subscription = (_dec = (0, _di.Module)({
  name: 'Subscription',
  deps: ['Auth', 'Client', 'Storage', 'SleepDetector', {
    dep: 'SubscriptionOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Subscription, _RcModuleV);
  var _super = _createSuper(Subscription);
  function Subscription(deps) {
    var _this;
    _classCallCheck(this, Subscription);
    _this = _super.call(this, {
      deps: deps,
      storageKey: 'subscription',
      enableCache: true
    });
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Subscriptio... Remove this comment to see the full error message
    _this._subscription = null;
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
    _this._retryTimeoutId = null;
    _this._debouncedRegister = void 0;
    _this._retry = void 0;
    _this.__debugNotification__ = false;
    _initializerDefineProperty(_this, "message", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "filters", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "cachedSubscription", _descriptor3, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "subscriptionStatus", _descriptor4, _assertThisInitialized(_this));
    _this._handleSleep = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _this$_subscription, renewPromise;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(_this.ready && _this._subscription)) {
                _context.next = 7;
                break;
              }
              // to wait automatic renew finish
              renewPromise = _this._subscription.automaticRenewing();
              if (!renewPromise) {
                _context.next = 5;
                break;
              }
              _context.next = 5;
              return renewPromise;
            case 5:
              _context.next = 7;
              return (_this$_subscription = _this._subscription) === null || _this$_subscription === void 0 ? void 0 : _this$_subscription.resubscribeAtPubNub();
            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    _this._onBeforeLogout = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!_this._subscription) {
                _context2.next = 3;
                break;
              }
              _context2.next = 3;
              return _this._removeSubscription();
            case 3:
            case "end":
              return _context2.stop();
          }
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
  _createClass(Subscription, [{
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
    key: "_shouldInit",
    value: function _shouldInit() {
      return _get(_getPrototypeOf(Subscription.prototype), "_shouldInit", this).call(this) && this._deps.auth.loggedIn;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return _get(_getPrototypeOf(Subscription.prototype), "_shouldReset", this).call(this) || this.ready && !this._deps.auth.loggedIn;
    }
  }, {
    key: "onInit",
    value: function onInit() {
      this._deps.sleepDetector.on(this._deps.sleepDetector.events.detected, this._handleSleep);
      this._deps.auth.addBeforeLogoutHandler(this._onBeforeLogout);
    }
  }, {
    key: "onReset",
    value: function () {
      var _onReset = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
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
              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
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
      var _createSubscription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _this2 = this;
        var sdk;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
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
                _context4.prev = 1;
                _context4.next = 4;
                return this._debouncedRegister();
              case 4:
                _context4.next = 10;
                break;
              case 6:
                _context4.prev = 6;
                _context4.t0 = _context4["catch"](1);
                if (!(_context4.t0.message !== 'cancelled')) {
                  _context4.next = 10;
                  break;
                }
                throw _context4.t0;
              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 6]]);
      }));
      function _createSubscription() {
        return _createSubscription2.apply(this, arguments);
      }
      return _createSubscription;
    }()
  }, {
    key: "_createSubscriptionWithLock",
    value: function () {
      var _createSubscriptionWithLock2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _navigator,
          _navigator$locks,
          _this3 = this;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if ((_navigator = navigator) === null || _navigator === void 0 ? void 0 : (_navigator$locks = _navigator.locks) === null || _navigator$locks === void 0 ? void 0 : _navigator$locks.request) {
                  _context5.next = 5;
                  break;
                }
                _context5.next = 3;
                return this._createSubscription();
              case 3:
                _context5.next = 7;
                break;
              case 5:
                _context5.next = 7;
                return navigator.locks.request(SUBSCRIPTION_LOCK_KEY, function () {
                  return _this3._createSubscription();
                });
              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function _createSubscriptionWithLock() {
        return _createSubscriptionWithLock2.apply(this, arguments);
      }
      return _createSubscriptionWithLock;
    }()
  }, {
    key: "_shouldUpdateSubscription",
    value: function _shouldUpdateSubscription() {
      return !!(this._subscription && !(0, _ramda.equals)((0, _ramda.map)(_normalizeEventFilter.normalizeEventFilter, this._subscription.eventFilters()).sort(), (0, _ramda.map)(_normalizeEventFilter.normalizeEventFilter, this.filters).sort()));
    }
  }, {
    key: "_register",
    value: function () {
      var _register2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this._shouldUpdateSubscription()) {
                  _context6.next = 5;
                  break;
                }
                this._setStates({
                  status: _subscriptionStatus.subscriptionStatus.subscribing
                });
                this._subscription.setEventFilters(_toConsumableArray(this.filters));
                _context6.next = 5;
                return this._subscription.register();
              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function _register() {
        return _register2.apply(this, arguments);
      }
      return _register;
    }()
  }, {
    key: "_removeSubscription",
    value: function () {
      var _removeSubscription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!this._subscription) {
                  _context7.next = 11;
                  break;
                }
                this._setStates({
                  status: _subscriptionStatus.subscriptionStatus.unsubscribing
                });
                _context7.prev = 2;
                _context7.next = 5;
                return this._subscription.remove();
              case 5:
                _context7.next = 9;
                break;
              case 7:
                _context7.prev = 7;
                _context7.t0 = _context7["catch"](2);
              case 9:
                if (this._subscription) {
                  this._subscription.reset();
                  this._subscription.removeAllListeners();
                  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Subscriptio... Remove this comment to see the full error message
                  this._subscription = null;
                }
                this._setStates({
                  status: _subscriptionStatus.subscriptionStatus.notSubscribed
                });
              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[2, 7]]);
      }));
      function _removeSubscription() {
        return _removeSubscription2.apply(this, arguments);
      }
      return _removeSubscription;
    }()
  }, {
    key: "subscribe",
    value: function () {
      var _subscribe = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var events,
          _this$_subscription$e,
          _this$_subscription2,
          oldFiltersCount,
          _args8 = arguments;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                events = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : [];
                if (!this.ready) {
                  _context8.next = 7;
                  break;
                }
                oldFiltersCount = (_this$_subscription$e = (_this$_subscription2 = this._subscription) === null || _this$_subscription2 === void 0 ? void 0 : _this$_subscription2.eventFilters().length) !== null && _this$_subscription$e !== void 0 ? _this$_subscription$e : 0; // use [].concat for potential compatibility issue
                // @ts-expect-error TS(2769): No overload matches this call.
                this._addFilters([].concat(events));
                if (!(oldFiltersCount !== this.filters.length)) {
                  _context8.next = 7;
                  break;
                }
                _context8.next = 7;
                return this._createSubscriptionWithLock();
              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function subscribe() {
        return _subscribe.apply(this, arguments);
      }
      return subscribe;
    }()
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
  }]);
  return Subscription;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "message", [_core.state], {
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
}), _applyDecoratedDescriptor(_class2.prototype, "_setStates", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStates"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "subscribe", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "subscribe"), _class2.prototype)), _class2)) || _class);
exports.Subscription = Subscription;
//# sourceMappingURL=Subscription.js.map
