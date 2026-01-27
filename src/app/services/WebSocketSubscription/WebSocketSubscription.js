"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
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
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebSocketSubscription = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.every.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.constructor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _debounceThrottle = require("@ringcentral-integration/commons/lib/debounce-throttle");
var _nextCore = require("@ringcentral-integration/next-core");
var _rxjs = require("rxjs");
var _Client = require("../Client");
var _RingCentralExtensions = require("../RingCentralExtensions");
var _webSocketReadyStates = require("../RingCentralExtensions/webSocketReadyStates");
var _normalizeEventFilter = require("./normalizeEventFilter");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
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
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DEFAULT_REFRESH_DELAY = process.env.NODE_ENV === 'test' ? 0 : 1000;
var DEFAULT_RECOVERY_BUFFER_SIZE = 100;

/**
 * Service for managing WebSocket subscriptions
 * Handles subscription registration, messaging and cleanup
 *
 * @class
 */
var WebSocketSubscription = exports.WebSocketSubscription = (_dec = (0, _nextCore.injectable)({
  name: 'WebSocketSubscription'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('WebSocketSubscriptionOptions')(target, undefined, 3);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _Client.Client === "undefined" ? Object : _Client.Client, typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof _RingCentralExtensions.RingCentralExtensions === "undefined" ? Object : _RingCentralExtensions.RingCentralExtensions, typeof WebSocketSubscriptionOptions === "undefined" ? Object : WebSocketSubscriptionOptions]), _dec5 = (0, _nextCore.dynamic)('BrowserLogger'), _dec6 = Reflect.metadata("design:type", typeof BrowserLogger === "undefined" ? Object : BrowserLogger), _dec7 = Reflect.metadata("design:type", typeof SubscriptionInfo === "undefined" ? Object : SubscriptionInfo), _dec8 = Reflect.metadata("design:type", String), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", [Boolean]), _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", [typeof SubscriptionInfo === "undefined" ? Object : SubscriptionInfo, String]), _dec11 = (0, _nextCore.delegate)('server'), _dec12 = Reflect.metadata("design:type", Function), _dec13 = Reflect.metadata("design:paramtypes", []), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", [Object]), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", []), _dec18 = Reflect.metadata("design:type", Array), _dec19 = (0, _nextCore.delegate)('server'), _dec20 = Reflect.metadata("design:type", Function), _dec21 = Reflect.metadata("design:paramtypes", [Array]), _dec22 = (0, _nextCore.delegate)('server'), _dec23 = Reflect.metadata("design:type", Function), _dec24 = Reflect.metadata("design:paramtypes", [Array]), _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", [Array]), _dec27 = Reflect.metadata("design:type", Function), _dec28 = Reflect.metadata("design:paramtypes", [Array]), _dec29 = Reflect.metadata("design:type", Function), _dec30 = Reflect.metadata("design:paramtypes", [Object]), _dec31 = Reflect.metadata("design:type", Array), _dec32 = Reflect.metadata("design:type", Object), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function WebSocketSubscription(_client, _storage, _ringCentralExtensions, _webSocketSubscriptionOptions) {
    var _this;
    _classCallCheck(this, WebSocketSubscription);
    _this = _callSuper(this, WebSocketSubscription);
    _this._client = _client;
    _this._storage = _storage;
    _this._ringCentralExtensions = _ringCentralExtensions;
    _this._webSocketSubscriptionOptions = _webSocketSubscriptionOptions;
    _this._wsSubscription = void 0;
    _this._subscriberMap = new Map();
    _this._subscribersAreReady = false;
    _initializerDefineProperty(_this, "_browserLogger", _descriptor, _this);
    _initializerDefineProperty(_this, "subscriptionInfo", _descriptor2, _this);
    _initializerDefineProperty(_this, "subscriptionChannel", _descriptor3, _this);
    _initializerDefineProperty(_this, "subscriptionReady", _descriptor4, _this);
    _this._debouncedUpdateSubscription = (0, _debounceThrottle.promisedDebounce)({
      fn: _this._updateSubscription,
      threshold: DEFAULT_REFRESH_DELAY
    });
    _initializerDefineProperty(_this, "messageBuffer", _descriptor5, _this);
    _initializerDefineProperty(_this, "filters", _descriptor6, _this);
    _initializerDefineProperty(_this, "message", _descriptor7, _this);
    _this.message$ = (0, _nextCore.fromWatch)(_this, function () {
      return _this.message;
    }).pipe((0, _rxjs.share)());
    _this._storage.enable(_this);
    return _this;
  }
  _inherits(WebSocketSubscription, _RcModule);
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
    key: "_bindEvents",
    value: function () {
      var _bindEvents2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var _this2 = this;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              (0, _nextCore.watch)(this, function () {
                return _this2._ringCentralExtensions.webSocketReadyState;
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
    key: "_setSubscriptionReady",
    value: function _setSubscriptionReady(ready) {
      this.subscriptionReady = ready;
    }
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
      this._setTokens((_this$_wsSubscription = this._wsSubscription) === null || _this$_wsSubscription === void 0 ? void 0 : _this$_wsSubscription.subscriptionInfo, this._ringCentralExtensions.webSocketExtension.ws.url);
    }
  }, {
    key: "_clearTokens",
    value: function _clearTokens() {
      this._setTokens(null, null);
    }
  }, {
    key: "_obtainSubscription",
    value: function () {
      var _obtainSubscription2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(eventFilters) {
        var _this3 = this,
          _subscription$subscri;
        var isNewChannel, subscription, isNewSubscription;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              isNewChannel = !this.subscriptionChannel || !(0, _normalizeEventFilter.isTheSameWebSocket)(this.subscriptionChannel, this._ringCentralExtensions.webSocketExtension.ws.url);
              if (process.env.NODE_ENV !== 'test') {
                _nextCore.logger.log("[".concat(this.identifier, "] > _obtainSubscription > isNewChannel: ").concat(isNewChannel));
              }

              // For reduce the total number of subscriptions (ttl 24 hours, limited number 20),
              // Revoke existing subscription before creating new.
              if (!isNewChannel) {
                _context6.n = 2;
                break;
              }
              _context6.n = 1;
              return this._revokeSubscription();
            case 1:
              if (process.env.NODE_ENV !== 'test') {
                _nextCore.logger.log("[".concat(this.identifier, "] > _obtainSubscription > existing subscription revoked"));
              }
            case 2:
              _context6.n = 3;
              return this._ringCentralExtensions.webSocketExtension.subscribe(eventFilters, function (message) {
                // only log message in production to avoid log flooding
                if (process.env.NODE_ENV === 'production') {
                  var _this3$_browserLogger;
                  (_this3$_browserLogger = _this3._browserLogger) === null || _this3$_browserLogger === void 0 ? void 0 : _this3$_browserLogger.log('WebSocketSubscription', message);
                }
                _this3._notifyMessage(message);
                _this3._dispatchMessage(message);
              }, isNewChannel ? null : this.subscriptionInfo);
            case 3:
              subscription = _context6.v;
              isNewSubscription = !this.subscriptionInfo || this.subscriptionInfo.id !== ((_subscription$subscri = subscription.subscriptionInfo) === null || _subscription$subscri === void 0 ? void 0 : _subscription$subscri.id);
              if (isNewSubscription) {
                if (process.env.NODE_ENV !== 'test') {
                  _nextCore.logger.log("[".concat(this.identifier, "] > _obtainSubscription > subscription created"));
                }
              } else {
                if (process.env.NODE_ENV !== 'test') {
                  _nextCore.logger.log("[".concat(this.identifier, "] > _obtainSubscription > subscription recovered"));
                }
              }
              this._wsSubscription = subscription;
              this._saveTokens();
              this._setSubscriptionReady(true);
            case 4:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function _obtainSubscription(_x2) {
        return _obtainSubscription2.apply(this, arguments);
      }
      return _obtainSubscription;
    }()
  }, {
    key: "_refreshSubscription",
    value: function () {
      var _refreshSubscription2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(eventFilters) {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              if (!this._wsSubscription) {
                _context7.n = 2;
                break;
              }
              this._wsSubscription.eventFilters = eventFilters;
              _context7.n = 1;
              return this._wsSubscription.refresh();
            case 1:
              this._saveTokens();
            case 2:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function _refreshSubscription(_x3) {
        return _refreshSubscription2.apply(this, arguments);
      }
      return _refreshSubscription;
    }()
  }, {
    key: "_revokeSubscription",
    value: function () {
      var _revokeSubscription2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var _t;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              _context8.p = 0;
              if (!this._wsSubscription) {
                _context8.n = 2;
                break;
              }
              _context8.n = 1;
              return this._wsSubscription.revoke();
            case 1:
              _context8.n = 3;
              break;
            case 2:
              if (!this.subscriptionInfo) {
                _context8.n = 3;
                break;
              }
              _context8.n = 3;
              return this._client.service.platform()["delete"](this.subscriptionInfo.uri);
            case 3:
              _context8.n = 5;
              break;
            case 4:
              _context8.p = 4;
              _t = _context8.v;
              // ignore error of revoke request
              if (process.env.NODE_ENV !== 'test') {
                _nextCore.logger.warn("[".concat(this.identifier, "] > _revokeSubscription > ").concat(_t));
              }
            case 5:
              this._wsSubscription = undefined;
              this._clearTokens(); // once subscription is revoked, all tokens are expired
              this._setSubscriptionReady(false);
            case 6:
              return _context8.a(2);
          }
        }, _callee8, this, [[0, 4]]);
      }));
      function _revokeSubscription() {
        return _revokeSubscription2.apply(this, arguments);
      }
      return _revokeSubscription;
    }() // Remove client side subscription object only
  }, {
    key: "_removeSubscription",
    value: function () {
      var _removeSubscription2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              if (this._wsSubscription) {
                try {
                  this._wsSubscription.remove();
                } catch (ex) {
                  // ignore error of remove request
                  if (process.env.NODE_ENV !== 'test') {
                    _nextCore.logger.warn("[".concat(this.identifier, "] > _removeSubscription > ").concat(ex));
                  }
                }
                this._wsSubscription = undefined;
              }
              this._setSubscriptionReady(false);
            case 1:
              return _context9.a(2);
          }
        }, _callee9, this);
      }));
      function _removeSubscription() {
        return _removeSubscription2.apply(this, arguments);
      }
      return _removeSubscription;
    }()
  }, {
    key: "_updateSubscription",
    value: function () {
      var _updateSubscription2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        var _this$_wsSubscription2, _this$_wsSubscription3;
        var eventFilters;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              if (this._ringCentralExtensions.isWebSocketReady) {
                _context0.n = 1;
                break;
              }
              return _context0.a(2);
            case 1:
              eventFilters = this.getFilters();
              if (eventFilters.length) {
                _context0.n = 3;
                break;
              }
              _context0.n = 2;
              return this._revokeSubscription();
            case 2:
              return _context0.a(2);
            case 3:
              if (this._wsSubscription) {
                _context0.n = 5;
                break;
              }
              _context0.n = 4;
              return this._obtainSubscription(eventFilters);
            case 4:
              return _context0.a(2);
            case 5:
              if ((0, _normalizeEventFilter.isTheSameEventFilters)(eventFilters, (_this$_wsSubscription2 = (_this$_wsSubscription3 = this._wsSubscription.subscriptionInfo) === null || _this$_wsSubscription3 === void 0 ? void 0 : _this$_wsSubscription3.eventFilters) !== null && _this$_wsSubscription2 !== void 0 ? _this$_wsSubscription2 : [])) {
                _context0.n = 7;
                break;
              }
              _context0.n = 6;
              return this._refreshSubscription(eventFilters);
            case 6:
              return _context0.a(2);
            case 7:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function _updateSubscription() {
        return _updateSubscription2.apply(this, arguments);
      }
      return _updateSubscription;
    }()
  }, {
    key: "_debouncedUpdateSubscriptionCatchCancel",
    value: function () {
      var _debouncedUpdateSubscriptionCatchCancel2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        var _t2;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              _context1.p = 0;
              _context1.n = 1;
              return this._debouncedUpdateSubscription();
            case 1:
              _context1.n = 3;
              break;
            case 2:
              _context1.p = 2;
              _t2 = _context1.v;
              if (!(_t2.message !== 'cancelled')) {
                _context1.n = 3;
                break;
              }
              throw _t2;
            case 3:
              return _context1.a(2);
          }
        }, _callee1, this, [[0, 2]]);
      }));
      function _debouncedUpdateSubscriptionCatchCancel() {
        return _debouncedUpdateSubscriptionCatchCancel2.apply(this, arguments);
      }
      return _debouncedUpdateSubscriptionCatchCancel;
    }()
    /**
     * Registers a module to receive WebSocket subscription events
     * @param {RcModule} module - The module to register
     * @param {SubscriptionMetadata} metadata - Metadata containing filters and handlers
     */
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
      subscriber.unwatch = (0, _nextCore.watch)(module, function () {
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
          _nextCore.logger.log("[".concat(this.identifier, "] > ").concat((0, _nextCore.getRef)(module).identifier, " ready with ").concat(this.messageBuffer.length, " buffered messages"));
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
        _nextCore.logger.error("[".concat(this.identifier, "] > _dispatchMessage error"), ex);
      }
    }
  }, {
    key: "_pushMessageBuffer",
    value: function _pushMessageBuffer(message) {
      var _this$_ringCentralExt, _this$_ringCentralExt2, _this$_ringCentralExt3;
      var bufferSize = (_this$_ringCentralExt = (_this$_ringCentralExt2 = this._ringCentralExtensions.webSocketExtension) === null || _this$_ringCentralExt2 === void 0 ? void 0 : (_this$_ringCentralExt3 = _this$_ringCentralExt2.connectionDetails) === null || _this$_ringCentralExt3 === void 0 ? void 0 : _this$_ringCentralExt3.recoveryBufferSize) !== null && _this$_ringCentralExt !== void 0 ? _this$_ringCentralExt : DEFAULT_RECOVERY_BUFFER_SIZE;
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
      var _subscribe = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        var eventFilters,
          oldLength,
          _args10 = arguments;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              eventFilters = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : [];
              if (this.ready) {
                _context10.n = 1;
                break;
              }
              return _context10.a(2);
            case 1:
              oldLength = this.filters.length;
              this._addFilters(eventFilters);
              if (!(oldLength !== this.filters.length)) {
                _context10.n = 2;
                break;
              }
              _context10.n = 2;
              return this._debouncedUpdateSubscriptionCatchCancel();
            case 2:
              return _context10.a(2);
          }
        }, _callee10, this);
      }));
      function subscribe() {
        return _subscribe.apply(this, arguments);
      }
      return subscribe;
    }())
  }, {
    key: "unsubscribe",
    value: function () {
      var _unsubscribe = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
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
              this._removeFilters(eventFilters);
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

    /**
     * Notifies subscribers about a received message
     * @param {any} message - The message received from WebSocket
     * @returns {void}
     */
  }, {
    key: "_notifyMessage",
    value: function _notifyMessage(message) {
      this.message = message !== null && message !== void 0 ? message : null;
    }
  }, {
    key: "fromMessage$",
    value:
    /**
     * filter message by event type
     *
     * @param eventType event type end of the event name, or a regex to match the event name
     */
    function fromMessage$(eventType) {
      var matchRegex = eventType instanceof RegExp ? eventType : new RegExp("".concat(eventType, "$"));
      return this.message$.pipe((0, _rxjs.filter)(function (message) {
        return matchRegex.test(message['event']);
      }), (0, _rxjs.map)(function (message) {
        return message['body'];
      }), (0, _rxjs.filter)(Boolean), (0, _rxjs.share)());
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_browserLogger", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "subscriptionInfo", [_nextCore.storage, _nextCore.state, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "subscriptionChannel", [_nextCore.storage, _nextCore.state, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "subscriptionReady", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setSubscriptionReady", [_nextCore.action, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "_setSubscriptionReady"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setTokens", [_nextCore.action, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "_setTokens"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateSubscription", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateSubscription"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_pushMessageBuffer", [_nextCore.action, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "_pushMessageBuffer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_clearMessageBuffer", [_nextCore.action, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "_clearMessageBuffer"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "messageBuffer", [_nextCore.state, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "subscribe", [_dec19, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "subscribe"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unsubscribe", [_dec22, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "unsubscribe"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addFilters", [_nextCore.action, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "_addFilters"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeFilters", [_nextCore.action, _dec27, _dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeFilters"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_notifyMessage", [_nextCore.action, _dec29, _dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "_notifyMessage"), _class2.prototype), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "filters", [_nextCore.state, _dec31], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "message", [_nextCore.state, _dec32], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=WebSocketSubscription.js.map
