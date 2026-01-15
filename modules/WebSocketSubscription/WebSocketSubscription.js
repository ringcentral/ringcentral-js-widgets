"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebSocketSubscription = exports.SyncMessageTabEventName = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.every.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
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
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var DEFAULT_REFRESH_DELAY = process.env.NODE_ENV === 'test' ? 0 : 1000;
var SyncMessageTabEventName = exports.SyncMessageTabEventName = 'WebSocketSubscription-syncMessage';
var DEFAULT_RECOVERY_BUFFER_SIZE = 100;
var WebSocketSubscription = exports.WebSocketSubscription = (_dec = (0, _di.Module)({
  name: 'WebSocketSubscription',
  deps: ['Client', 'Storage', 'RingCentralExtensions', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'WebSocketSubscriptionOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function WebSocketSubscription(deps) {
    var _this;
    _classCallCheck(this, WebSocketSubscription);
    _this = _callSuper(this, WebSocketSubscription, [{
      deps: deps,
      enableCache: true,
      storageKey: 'WebSocketSubscription'
    }]);
    _this._wsSubscription = void 0;
    _this._subscriberMap = new Map();
    _this._subscribersAreReady = false;
    _initializerDefineProperty(_this, "subscriptionInfo", _descriptor, _this);
    _initializerDefineProperty(_this, "subscriptionChannel", _descriptor2, _this);
    _this._debouncedUpdateSubscription = (0, _debounceThrottle.promisedDebounce)({
      fn: _this._updateSubscription,
      threshold: DEFAULT_REFRESH_DELAY
    });
    _initializerDefineProperty(_this, "messageBuffer", _descriptor3, _this);
    _initializerDefineProperty(_this, "filters", _descriptor4, _this);
    _initializerDefineProperty(_this, "message", _descriptor5, _this);
    return _this;
  }
  _inherits(WebSocketSubscription, _RcModuleV);
  return _createClass(WebSocketSubscription, [{
    key: "onInitOnce",
    value: function () {
      var _onInitOnce = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return this._bindEvents();
            case 1:
              return _context.a(2);
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
      var _onInitSuccess = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return this._debouncedUpdateSubscriptionCatchCancel();
            case 1:
              return _context2.a(2);
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
      var _onReset = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              this._debouncedUpdateSubscription.cancel();
              _context3.n = 1;
              return this._removeSubscription();
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function onReset() {
        return _onReset.apply(this, arguments);
      }
      return onReset;
    }()
  }, {
    key: "onlyOneTabConnected",
    get: function get() {
      return this._deps.ringCentralExtensions.disconnectOnInactive;
    }
  }, {
    key: "_bindEvents",
    value: function () {
      var _bindEvents2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var _this2 = this;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              (0, _core.watch)(this, function () {
                return _this2._deps.ringCentralExtensions.webSocketReadyState;
              }, /*#__PURE__*/function () {
                var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(wsState) {
                  return _regenerator().w(function (_context4) {
                    while (1) switch (_context4.n) {
                      case 0:
                        if (!(!_this2.ready || !wsState)) {
                          _context4.n = 1;
                          break;
                        }
                        return _context4.a(2);
                      case 1:
                        _this2._debouncedUpdateSubscription.cancel();
                        if (!(wsState === _webSocketReadyStates.webSocketReadyStates.ready)) {
                          _context4.n = 3;
                          break;
                        }
                        _context4.n = 2;
                        return _this2._updateSubscription();
                      case 2:
                        _context4.n = 6;
                        break;
                      case 3:
                        if (!(wsState === _webSocketReadyStates.webSocketReadyStates.closing)) {
                          _context4.n = 5;
                          break;
                        }
                        _context4.n = 4;
                        return _this2._revokeSubscription();
                      case 4:
                        _context4.n = 6;
                        break;
                      case 5:
                        _context4.n = 6;
                        return _this2._removeSubscription();
                      case 6:
                        return _context4.a(2);
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
            case 1:
              return _context5.a(2);
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
      var _syncMessageToOtherTabs2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(message) {
        var _this$_deps$tabManage;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              _context6.n = 1;
              return (_this$_deps$tabManage = this._deps.tabManager) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage.send(SyncMessageTabEventName, message);
            case 1:
              return _context6.a(2);
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
      var _obtainSubscription2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(eventFilters) {
        var _this3 = this,
          _subscription$subscri;
        var isNewChannel, subscription, isNewSubscription;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              isNewChannel = !this.subscriptionChannel || !(0, _normalizeEventFilter.isTheSameWebSocket)(this.subscriptionChannel, this._deps.ringCentralExtensions.webSocketExtension.ws.url);
              if (process.env.NODE_ENV !== 'test') {
                console.log("[WebSocketSubscription] > _obtainSubscription > isNewChannel: ".concat(isNewChannel));
              }

              // For reduce the total number of subscriptions (ttl 24 hours, limited number 20),
              // Revoke existing subscription before creating new.
              if (!isNewChannel) {
                _context7.n = 2;
                break;
              }
              _context7.n = 1;
              return this._revokeSubscription();
            case 1:
              if (process.env.NODE_ENV !== 'test') {
                console.log('[WebSocketSubscription] > _obtainSubscription > existing subscription revoked');
              }
            case 2:
              _context7.n = 3;
              return this._deps.ringCentralExtensions.webSocketExtension.subscribe(eventFilters, function (message) {
                _this3._notifyMessage(message);
                _this3._dispatchMessage(message);
              }, isNewChannel ? null : this.subscriptionInfo);
            case 3:
              subscription = _context7.v;
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
            case 4:
              return _context7.a(2);
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
      var _refreshSubscription2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(eventFilters) {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              if (!this._wsSubscription) {
                _context8.n = 2;
                break;
              }
              this._wsSubscription.eventFilters = eventFilters;
              _context8.n = 1;
              return this._wsSubscription.refresh();
            case 1:
              this._saveTokens();
            case 2:
              return _context8.a(2);
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
      var _revokeSubscription2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        var _t;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              _context9.p = 0;
              if (!this._wsSubscription) {
                _context9.n = 2;
                break;
              }
              _context9.n = 1;
              return this._wsSubscription.revoke();
            case 1:
              _context9.n = 3;
              break;
            case 2:
              if (!this.subscriptionInfo) {
                _context9.n = 3;
                break;
              }
              _context9.n = 3;
              return this._deps.client.service.platform()["delete"](this.subscriptionInfo.uri);
            case 3:
              _context9.n = 5;
              break;
            case 4:
              _context9.p = 4;
              _t = _context9.v;
              // ignore error of revoke request
              if (process.env.NODE_ENV !== 'test') {
                console.warn("[WebSocketSubscription] > _revokeSubscription > ".concat(_t));
              }
            case 5:
              this._wsSubscription = undefined;
              this._clearTokens(); // once subscription is revoked, all tokens are expired
            case 6:
              return _context9.a(2);
          }
        }, _callee9, this, [[0, 4]]);
      }));
      function _revokeSubscription() {
        return _revokeSubscription2.apply(this, arguments);
      }
      return _revokeSubscription;
    }() // Remove client side subscription object only
  }, {
    key: "_removeSubscription",
    value: function () {
      var _removeSubscription2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
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
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function _removeSubscription() {
        return _removeSubscription2.apply(this, arguments);
      }
      return _removeSubscription;
    }()
  }, {
    key: "_updateSubscription",
    value: function () {
      var _updateSubscription2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        var _this$_wsSubscription2, _this$_wsSubscription3;
        var eventFilters;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              if (this._deps.ringCentralExtensions.isWebSocketReady) {
                _context1.n = 1;
                break;
              }
              return _context1.a(2);
            case 1:
              eventFilters = this.getFilters();
              if (eventFilters.length) {
                _context1.n = 3;
                break;
              }
              _context1.n = 2;
              return this._revokeSubscription();
            case 2:
              return _context1.a(2);
            case 3:
              if (this._wsSubscription) {
                _context1.n = 5;
                break;
              }
              _context1.n = 4;
              return this._obtainSubscription(eventFilters);
            case 4:
              return _context1.a(2);
            case 5:
              if ((0, _normalizeEventFilter.isTheSameEventFilters)(eventFilters, (_this$_wsSubscription2 = (_this$_wsSubscription3 = this._wsSubscription.subscriptionInfo) === null || _this$_wsSubscription3 === void 0 ? void 0 : _this$_wsSubscription3.eventFilters) !== null && _this$_wsSubscription2 !== void 0 ? _this$_wsSubscription2 : [])) {
                _context1.n = 7;
                break;
              }
              _context1.n = 6;
              return this._refreshSubscription(eventFilters);
            case 6:
              return _context1.a(2);
            case 7:
              return _context1.a(2);
          }
        }, _callee1, this);
      }));
      function _updateSubscription() {
        return _updateSubscription2.apply(this, arguments);
      }
      return _updateSubscription;
    }()
  }, {
    key: "_debouncedUpdateSubscriptionCatchCancel",
    value: function () {
      var _debouncedUpdateSubscriptionCatchCancel2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        var _t2;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              _context10.p = 0;
              _context10.n = 1;
              return this._debouncedUpdateSubscription();
            case 1:
              _context10.n = 3;
              break;
            case 2:
              _context10.p = 2;
              _t2 = _context10.v;
              if (!(_t2.message !== 'cancelled')) {
                _context10.n = 3;
                break;
              }
              throw _t2;
            case 3:
              return _context10.a(2);
          }
        }, _callee10, this, [[0, 2]]);
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
    value: (
    /**
     * @deprecated
     * Use "register" instead
     */
    function () {
      var _subscribe = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
        var eventFilters,
          oldLength,
          _args11 = arguments;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              eventFilters = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : [];
              if (this.ready) {
                _context11.n = 1;
                break;
              }
              return _context11.a(2);
            case 1:
              oldLength = this.filters.length;
              this._addFilters(eventFilters);
              if (!(oldLength !== this.filters.length)) {
                _context11.n = 2;
                break;
              }
              _context11.n = 2;
              return this._debouncedUpdateSubscriptionCatchCancel();
            case 2:
              return _context11.a(2);
          }
        }, _callee11, this);
      }));
      function subscribe() {
        return _subscribe.apply(this, arguments);
      }
      return subscribe;
    }())
  }, {
    key: "unsubscribe",
    value: function () {
      var _unsubscribe = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
        var eventFilters,
          oldLength,
          _args12 = arguments;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              eventFilters = _args12.length > 0 && _args12[0] !== undefined ? _args12[0] : [];
              if (this.ready) {
                _context12.n = 1;
                break;
              }
              return _context12.a(2);
            case 1:
              oldLength = this.filters.length;
              this._removeFilters(eventFilters);
              if (!(oldLength !== this.filters.length)) {
                _context12.n = 2;
                break;
              }
              _context12.n = 2;
              return this._debouncedUpdateSubscriptionCatchCancel();
            case 2:
              return _context12.a(2);
          }
        }, _callee12, this);
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
  }]);
}(_core.RcModuleV2), _applyDecoratedDescriptor(_class2.prototype, "_bindEvents", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_bindEvents"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "subscriptionInfo", [_core.storage, _core.state], {
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
}), _class2)) || _class);
//# sourceMappingURL=WebSocketSubscription.js.map
