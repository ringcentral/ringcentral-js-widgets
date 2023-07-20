"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.sort");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subscription = void 0;
require("regenerator-runtime/runtime");
var _ramda = require("ramda");
var _core = require("@ringcentral-integration/core");
var _subscriptions = _interopRequireDefault(require("@ringcentral/subscriptions"));
var _debounceThrottle = require("../../lib/debounce-throttle");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _normalizeEventFilter = require("./normalizeEventFilter");
var _subscriptionStatus = require("./subscriptionStatus");
var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
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
    // @ts-expect-error
    _this._subscription = null;
    // @ts-expect-error
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
                  // @ts-expect-error
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
                  // @ts-expect-error
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
        // @ts-expect-error
        cachedSubscription: null
      });
    }
  }, {
    key: "_onRemoveError",
    value: function _onRemoveError(error) {
      this._setStates({
        status: _subscriptionStatus.subscriptionStatus.notSubscribed,
        // @ts-expect-error
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
        // @ts-expect-error
        this._subscription = null;
      }
      this._setStates({
        status: _subscriptionStatus.subscriptionStatus.notSubscribed,
        // @ts-expect-error
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
        // @ts-expect-error
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
                  // @ts-expect-error
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
                // @ts-expect-error
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
