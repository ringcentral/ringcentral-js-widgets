"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.every");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.from");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.reduce");
require("core-js/modules/es.function.name");
require("core-js/modules/es.map");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.set");
require("core-js/modules/es.string.includes");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.for-each");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebSocketSubscription = exports.SyncMessageTabEventName = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _background = _interopRequireDefault(require("../../lib/background"));
var _debounceThrottle = require("../../lib/debounce-throttle");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _webSocketReadyStates = require("../RingCentralExtensions/webSocketReadyStates");
var _normalizeEventFilter = require("./normalizeEventFilter");
var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
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
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var DEFAULT_REFRESH_DELAY = process.env.NODE_ENV === 'test' ? 0 : 1000;
var SyncMessageTabEventName = 'WebSocketSubscription-syncMessage';
exports.SyncMessageTabEventName = SyncMessageTabEventName;
var DEFAULT_RECOVERY_BUFFER_SIZE = 100;
var WebSocketSubscription = (_dec = (0, _di.Module)({
  name: 'WebSocketSubscription',
  deps: ['Client', 'Storage', 'RingCentralExtensions', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'WebSocketSubscriptionOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(WebSocketSubscription, _RcModuleV);
  var _super = _createSuper(WebSocketSubscription);
  function WebSocketSubscription(deps) {
    var _this;
    _classCallCheck(this, WebSocketSubscription);
    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'WebSocketSubscription'
    });
    _this._wsSubscription = void 0;
    _this._subscriberMap = new Map();
    _this._subscribersAreReady = false;
    _initializerDefineProperty(_this, "subscriptionInfo", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "subscriptionChannel", _descriptor2, _assertThisInitialized(_this));
    _this._debouncedUpdateSubscription = (0, _debounceThrottle.promisedDebounce)({
      fn: _this._updateSubscription,
      threshold: DEFAULT_REFRESH_DELAY
    });
    _initializerDefineProperty(_this, "messageBuffer", _descriptor3, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "filters", _descriptor4, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "message", _descriptor5, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(WebSocketSubscription, [{
    key: "onInitOnce",
    value: function () {
      var _onInitOnce = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._bindEvents();
              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function onInitOnce() {
        return _onInitOnce.apply(this, arguments);
      }
      return onInitOnce;
    }()
  }, {
    key: "onInitSuccess",
    value: function () {
      var _onInitSuccess = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._debouncedUpdateSubscriptionCatchCancel();
              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function onInitSuccess() {
        return _onInitSuccess.apply(this, arguments);
      }
      return onInitSuccess;
    }()
  }, {
    key: "onReset",
    value: function () {
      var _onReset = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this._debouncedUpdateSubscription.cancel();
                _context3.next = 3;
                return this._removeSubscription();
              case 3:
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
    key: "_bindEvents",
    value: function () {
      var _bindEvents2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _this2 = this;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                (0, _core.watch)(this, function () {
                  return _this2._deps.ringCentralExtensions.webSocketReadyState;
                }, /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(wsState) {
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            if (!(!_this2.ready || !wsState)) {
                              _context4.next = 2;
                              break;
                            }
                            return _context4.abrupt("return");
                          case 2:
                            _this2._debouncedUpdateSubscription.cancel();
                            if (!(wsState === _webSocketReadyStates.webSocketReadyStates.ready)) {
                              _context4.next = 8;
                              break;
                            }
                            _context4.next = 6;
                            return _this2._updateSubscription();
                          case 6:
                            _context4.next = 15;
                            break;
                          case 8:
                            if (!(wsState === _webSocketReadyStates.webSocketReadyStates.closing)) {
                              _context4.next = 13;
                              break;
                            }
                            _context4.next = 11;
                            return _this2._revokeSubscription();
                          case 11:
                            _context4.next = 15;
                            break;
                          case 13:
                            _context4.next = 15;
                            return _this2._removeSubscription();
                          case 15:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));
                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }());
                if (this.onlyOneTabConnected) {
                  (0, _core.watch)(this, function () {
                    return _this2._deps.tabManager.event;
                  }, function (event) {
                    _this2._tabEventHandler(event);
                  });
                }
              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function _bindEvents() {
        return _bindEvents2.apply(this, arguments);
      }
      return _bindEvents;
    }()
  }, {
    key: "_tabEventHandler",
    value: function _tabEventHandler(event) {
      if (!this.ready || !event) {
        return;
      }
      if (event.name === SyncMessageTabEventName) {
        this._notifyMessage(event.args[0], false);
      }
    }
  }, {
    key: "_syncMessageToOtherTabs",
    value: function () {
      var _syncMessageToOtherTabs2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(message) {
        var _this$_deps$tabManage;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return (_this$_deps$tabManage = this._deps.tabManager) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage.send(SyncMessageTabEventName, message);
              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function _syncMessageToOtherTabs(_x2) {
        return _syncMessageToOtherTabs2.apply(this, arguments);
      }
      return _syncMessageToOtherTabs;
    }()
  }, {
    key: "_setTokens",
    value: function _setTokens(subscriptionInfo, subscriptionChannel) {
      this.subscriptionInfo = subscriptionInfo !== null && subscriptionInfo !== void 0 ? subscriptionInfo : null;
      this.subscriptionChannel = subscriptionChannel !== null && subscriptionChannel !== void 0 ? subscriptionChannel : null;
    }
  }, {
    key: "_saveTokens",
    value: function _saveTokens() {
      var _this$_wsSubscription;
      this._setTokens((_this$_wsSubscription = this._wsSubscription) === null || _this$_wsSubscription === void 0 ? void 0 : _this$_wsSubscription.subscriptionInfo, this._deps.ringCentralExtensions.webSocketExtension.ws.url);
    }
  }, {
    key: "_clearTokens",
    value: function _clearTokens() {
      this._setTokens(null, null);
    }
  }, {
    key: "_obtainSubscription",
    value: function () {
      var _obtainSubscription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(eventFilters) {
        var _this3 = this,
          _subscription$subscri;
        var isNewChannel, subscription, isNewSubscription;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                isNewChannel = !this.subscriptionChannel || !(0, _normalizeEventFilter.isTheSameWebSocket)(this.subscriptionChannel, this._deps.ringCentralExtensions.webSocketExtension.ws.url);
                if (process.env.NODE_ENV !== 'test') {
                  console.log("[WebSocketSubscription] > _obtainSubscription > isNewChannel: ".concat(isNewChannel));
                }

                // For reduce the total number of subscriptions (ttl 24 hours, limited number 20),
                // Revoke existing subscription before creating new.
                if (!isNewChannel) {
                  _context7.next = 6;
                  break;
                }
                _context7.next = 5;
                return this._revokeSubscription();
              case 5:
                if (process.env.NODE_ENV !== 'test') {
                  console.log('[WebSocketSubscription] > _obtainSubscription > existing subscription revoked');
                }
              case 6:
                _context7.next = 8;
                return this._deps.ringCentralExtensions.webSocketExtension.subscribe(eventFilters, function (message) {
                  _this3._notifyMessage(message);
                  _this3._dispatchMessage(message);
                }, isNewChannel ? null : this.subscriptionInfo);
              case 8:
                subscription = _context7.sent;
                isNewSubscription = !this.subscriptionInfo || this.subscriptionInfo.id !== ((_subscription$subscri = subscription.subscriptionInfo) === null || _subscription$subscri === void 0 ? void 0 : _subscription$subscri.id);
                if (isNewSubscription) {
                  if (process.env.NODE_ENV !== 'test') {
                    console.log('[WebSocketSubscription] > _obtainSubscription > subscription created');
                  }
                } else {
                  if (process.env.NODE_ENV !== 'test') {
                    console.log('[WebSocketSubscription] > _obtainSubscription > subscription recovered');
                  }
                }
                this._wsSubscription = subscription;
                this._saveTokens();
              case 13:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function _obtainSubscription(_x3) {
        return _obtainSubscription2.apply(this, arguments);
      }
      return _obtainSubscription;
    }()
  }, {
    key: "_refreshSubscription",
    value: function () {
      var _refreshSubscription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(eventFilters) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!this._wsSubscription) {
                  _context8.next = 5;
                  break;
                }
                this._wsSubscription.eventFilters = eventFilters;
                _context8.next = 4;
                return this._wsSubscription.refresh();
              case 4:
                this._saveTokens();
              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function _refreshSubscription(_x4) {
        return _refreshSubscription2.apply(this, arguments);
      }
      return _refreshSubscription;
    }()
  }, {
    key: "_revokeSubscription",
    value: function () {
      var _revokeSubscription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                if (!this._wsSubscription) {
                  _context9.next = 6;
                  break;
                }
                _context9.next = 4;
                return this._wsSubscription.revoke();
              case 4:
                _context9.next = 9;
                break;
              case 6:
                if (!this.subscriptionInfo) {
                  _context9.next = 9;
                  break;
                }
                _context9.next = 9;
                return this._deps.client.service.platform()["delete"](this.subscriptionInfo.uri);
              case 9:
                _context9.next = 14;
                break;
              case 11:
                _context9.prev = 11;
                _context9.t0 = _context9["catch"](0);
                // ignore error of revoke request
                if (process.env.NODE_ENV !== 'test') {
                  console.warn("[WebSocketSubscription] > _revokeSubscription > ".concat(_context9.t0));
                }
              case 14:
                this._wsSubscription = undefined;
                this._clearTokens(); // once subscription is revoked, all tokens are expired
              case 16:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 11]]);
      }));
      function _revokeSubscription() {
        return _revokeSubscription2.apply(this, arguments);
      }
      return _revokeSubscription;
    }() // Remove client side subscription object only
  }, {
    key: "_removeSubscription",
    value: function () {
      var _removeSubscription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (this._wsSubscription) {
                  try {
                    this._wsSubscription.remove();
                  } catch (ex) {
                    // ignore error of remove request
                    if (process.env.NODE_ENV !== 'test') {
                      console.warn("[WebSocketSubscription] > _removeSubscription > ".concat(ex));
                    }
                  }
                  this._wsSubscription = undefined;
                }
              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));
      function _removeSubscription() {
        return _removeSubscription2.apply(this, arguments);
      }
      return _removeSubscription;
    }()
  }, {
    key: "_updateSubscription",
    value: function () {
      var _updateSubscription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var _this$_wsSubscription2, _this$_wsSubscription3;
        var eventFilters;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (this._deps.ringCentralExtensions.isWebSocketReady) {
                  _context11.next = 2;
                  break;
                }
                return _context11.abrupt("return");
              case 2:
                eventFilters = this.getFilters();
                if (eventFilters.length) {
                  _context11.next = 7;
                  break;
                }
                _context11.next = 6;
                return this._revokeSubscription();
              case 6:
                return _context11.abrupt("return");
              case 7:
                if (this._wsSubscription) {
                  _context11.next = 11;
                  break;
                }
                _context11.next = 10;
                return this._obtainSubscription(eventFilters);
              case 10:
                return _context11.abrupt("return");
              case 11:
                if ((0, _normalizeEventFilter.isTheSameEventFilters)(eventFilters, (_this$_wsSubscription2 = (_this$_wsSubscription3 = this._wsSubscription.subscriptionInfo) === null || _this$_wsSubscription3 === void 0 ? void 0 : _this$_wsSubscription3.eventFilters) !== null && _this$_wsSubscription2 !== void 0 ? _this$_wsSubscription2 : [])) {
                  _context11.next = 15;
                  break;
                }
                _context11.next = 14;
                return this._refreshSubscription(eventFilters);
              case 14:
                return _context11.abrupt("return");
              case 15:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));
      function _updateSubscription() {
        return _updateSubscription2.apply(this, arguments);
      }
      return _updateSubscription;
    }()
  }, {
    key: "_debouncedUpdateSubscriptionCatchCancel",
    value: function () {
      var _debouncedUpdateSubscriptionCatchCancel2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.prev = 0;
                _context12.next = 3;
                return this._debouncedUpdateSubscription();
              case 3:
                _context12.next = 9;
                break;
              case 5:
                _context12.prev = 5;
                _context12.t0 = _context12["catch"](0);
                if (!(_context12.t0.message !== 'cancelled')) {
                  _context12.next = 9;
                  break;
                }
                throw _context12.t0;
              case 9:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[0, 5]]);
      }));
      function _debouncedUpdateSubscriptionCatchCancel() {
        return _debouncedUpdateSubscriptionCatchCancel2.apply(this, arguments);
      }
      return _debouncedUpdateSubscriptionCatchCancel;
    }()
  }, {
    key: "register",
    value: function register(module, metadata) {
      var _this4 = this;
      // Register subscriber
      var subscriber = {
        metadata: metadata
      };
      this._subscriberMap.set(module, subscriber);
      // Monitor subscriber ready state
      this._updateSubscriberReady(module);
      subscriber.unwatch = (0, _core.watch)(module, function () {
        return module.ready;
      }, function () {
        _this4._updateSubscriberReady(module);
      });
    }
  }, {
    key: "unregister",
    value: function unregister(module) {
      var subscriber = this._subscriberMap.get(module);
      if (subscriber === null || subscriber === void 0 ? void 0 : subscriber.unwatch) {
        subscriber.unwatch();
        subscriber.unwatch = undefined;
        this._subscriberMap["delete"](module);
      }
    }
  }, {
    key: "getFilters",
    value: function getFilters() {
      // Registered filters
      var filters = Array.from(this._subscriberMap.values()).reduce(function (acc, _ref2) {
        var metadata = _ref2.metadata;
        return acc.concat(metadata.filters);
      }, []);

      // Merge with subscribed filters
      var filterSet = new Set([].concat(_toConsumableArray(filters), _toConsumableArray(this.filters)));
      return _toConsumableArray(filterSet);
    }
  }, {
    key: "_updateSubscriberReady",
    value: function _updateSubscriberReady(module) {
      var _this5 = this;
      // Send buffered messages to the current ready subscriber
      if (module.ready) {
        this.messageBuffer.forEach(function (message) {
          _this5._dispatchModuleMessage(module, message);
        });
        if (process.env.NODE_ENV !== 'test') {
          console.log("[WebSocketSubscription] > ".concat(module.constructor.name, " ready with ").concat(this.messageBuffer.length, " buffered messages"));
        }
      }

      // Check if all subscribers are ready
      this._subscribersAreReady = Array.from(this._subscriberMap.keys()).every(function (x) {
        return x.ready;
      });

      // Clear message buffer when all subscribers are ready
      if (this._subscribersAreReady) {
        this._clearMessageBuffer();
      }
    }
  }, {
    key: "_dispatchMessage",
    value: function _dispatchMessage(message) {
      var _this6 = this;
      if (!this._subscribersAreReady) {
        this._pushMessageBuffer(message);
      }
      this._subscriberMap.forEach(function (_, module) {
        if (!module.ready) return;
        _this6._dispatchModuleMessage(module, message);
      });
    }
  }, {
    key: "_dispatchModuleMessage",
    value: function _dispatchModuleMessage(module, message) {
      var subscriber = this._subscriberMap.get(module);
      if (!(subscriber === null || subscriber === void 0 ? void 0 : subscriber.metadata.handler)) return;
      try {
        subscriber.metadata.handler.apply(module, [message]);
      } catch (ex) {
        console.error('[WebSocketSubscription] > _dispatchMessage error', ex);
      }
    }
  }, {
    key: "_pushMessageBuffer",
    value: function _pushMessageBuffer(message) {
      var _this$_deps$ringCentr, _this$_deps$ringCentr2, _this$_deps$ringCentr3;
      var bufferSize = (_this$_deps$ringCentr = (_this$_deps$ringCentr2 = this._deps.ringCentralExtensions.webSocketExtension) === null || _this$_deps$ringCentr2 === void 0 ? void 0 : (_this$_deps$ringCentr3 = _this$_deps$ringCentr2.connectionDetails) === null || _this$_deps$ringCentr3 === void 0 ? void 0 : _this$_deps$ringCentr3.recoveryBufferSize) !== null && _this$_deps$ringCentr !== void 0 ? _this$_deps$ringCentr : DEFAULT_RECOVERY_BUFFER_SIZE;
      if (this.messageBuffer.length > bufferSize) {
        this.messageBuffer.shift();
      }
      this.messageBuffer.push(message);
    }
  }, {
    key: "_clearMessageBuffer",
    value: function _clearMessageBuffer() {
      this.messageBuffer = [];
    }
  }, {
    key: "subscribe",
    /**
     * @deprecated
     * Use "register" instead
     */
    value: function () {
      var _subscribe = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        var eventFilters,
          oldLength,
          _args13 = arguments;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                eventFilters = _args13.length > 0 && _args13[0] !== undefined ? _args13[0] : [];
                if (this.ready) {
                  _context13.next = 3;
                  break;
                }
                return _context13.abrupt("return");
              case 3:
                oldLength = this.filters.length;
                this._addFilters(eventFilters);
                if (!(oldLength !== this.filters.length)) {
                  _context13.next = 8;
                  break;
                }
                _context13.next = 8;
                return this._debouncedUpdateSubscriptionCatchCancel();
              case 8:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));
      function subscribe() {
        return _subscribe.apply(this, arguments);
      }
      return subscribe;
    }()
  }, {
    key: "unsubscribe",
    value: function () {
      var _unsubscribe = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        var eventFilters,
          oldLength,
          _args14 = arguments;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                eventFilters = _args14.length > 0 && _args14[0] !== undefined ? _args14[0] : [];
                if (this.ready) {
                  _context14.next = 3;
                  break;
                }
                return _context14.abrupt("return");
              case 3:
                oldLength = this.filters.length;
                this._removeFilters(eventFilters);
                if (!(oldLength !== this.filters.length)) {
                  _context14.next = 8;
                  break;
                }
                _context14.next = 8;
                return this._debouncedUpdateSubscriptionCatchCancel();
              case 8:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));
      function unsubscribe() {
        return _unsubscribe.apply(this, arguments);
      }
      return unsubscribe;
    }()
  }, {
    key: "_addFilters",
    value: function _addFilters(eventFilters) {
      this.filters = this.filters.concat(eventFilters).filter(function (x, index, array) {
        return array.indexOf(x) === index;
      }); // remove duplicates
    }
  }, {
    key: "_removeFilters",
    value: function _removeFilters(eventFilters) {
      this.filters = this.filters.filter(function (x) {
        return !eventFilters.includes(x);
      });
    }
  }, {
    key: "_notifyMessage",
    value: function _notifyMessage(message) {
      var allowSync = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.message = message !== null && message !== void 0 ? message : null;
      if (allowSync && this.onlyOneTabConnected) {
        this._syncMessageToOtherTabs(message);
      }
    }
  }, {
    key: "onlyOneTabConnected",
    get: function get() {
      return this._deps.ringCentralExtensions.disconnectOnInactive;
    }
  }]);
  return WebSocketSubscription;
}(_core.RcModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "_bindEvents", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_bindEvents"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "subscriptionInfo", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "subscriptionChannel", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setTokens", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setTokens"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateSubscription", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateSubscription"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_pushMessageBuffer", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_pushMessageBuffer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_clearMessageBuffer", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_clearMessageBuffer"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "messageBuffer", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "subscribe", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "subscribe"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unsubscribe", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "unsubscribe"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addFilters", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_addFilters"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeFilters", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeFilters"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_notifyMessage", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_notifyMessage"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "filters", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "message", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2)) || _class);
exports.WebSocketSubscription = WebSocketSubscription;
//# sourceMappingURL=WebSocketSubscription.js.map
