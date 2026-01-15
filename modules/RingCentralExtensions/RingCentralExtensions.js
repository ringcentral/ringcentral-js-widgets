"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SyncTokensTabEventName = exports.RingCentralExtensions = exports.InactiveTabEventName = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _core = _interopRequireDefault(require("@rc-ex/core"));
var _debug = _interopRequireDefault(require("@rc-ex/debug"));
var _rcsdk = _interopRequireDefault(require("@rc-ex/rcsdk"));
var _ws = _interopRequireWildcard(require("@rc-ex/ws"));
var _core2 = require("@ringcentral-integration/core");
var _isomorphicWs = _interopRequireDefault(require("isomorphic-ws"));
var _background = _interopRequireDefault(require("../../lib/background"));
var _debounceThrottle = require("../../lib/debounce-throttle");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _webSocketReadyStates = require("./webSocketReadyStates");
var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t3 in e) "default" !== _t3 && {}.hasOwnProperty.call(e, _t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t3)) && (i.get || i.set) ? o(f, _t3, i) : f[_t3] = e[_t3]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var RECOVER_DEBOUNCE_THRESHOLD = process.env.NODE_ENV === 'test' ? 0 : 1000;
var InactiveTabEventName = exports.InactiveTabEventName = 'RingCentralExtensions-inactive';
var SyncTokensTabEventName = exports.SyncTokensTabEventName = 'RingCentralExtensions-syncTokens';
var RingCentralExtensions = exports.RingCentralExtensions = (_dec = (0, _di.Module)({
  name: 'RingCentralExtensions',
  deps: ['Auth', 'Client', 'Storage', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'SleepDetector',
    optional: true
  }, {
    dep: 'AvailabilityMonitor',
    optional: true
  }, {
    dep: 'RingCentralExtensionsOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function RingCentralExtensions(deps) {
    var _this;
    _classCallCheck(this, RingCentralExtensions);
    _this = _callSuper(this, RingCentralExtensions, [{
      deps: deps,
      enableCache: true,
      storageKey: 'RingCentralExtensions'
    }]);
    // infra
    _this._core = void 0;
    _this._webSocketExtension = void 0;
    // refs
    _this._removeWsListener = void 0;
    _this._wsConnectionReady = void 0;
    _this._debouncedOnTabActive = (0, _debounceThrottle.debounce)({
      threshold: RECOVER_DEBOUNCE_THRESHOLD,
      fn: _this._onTabActive
    });
    _initializerDefineProperty(_this, "wsToken", _descriptor, _this);
    _initializerDefineProperty(_this, "wsTokenExpiresAt", _descriptor2, _this);
    _initializerDefineProperty(_this, "wscToken", _descriptor3, _this);
    _this._syncWsReadyState = function () {
      var _this$_webSocketExten;
      var readyState = (_this$_webSocketExten = _this._webSocketExtension.ws) === null || _this$_webSocketExten === void 0 ? void 0 : _this$_webSocketExten.readyState;
      _this._setWebSocketReadyState(readyState);
    };
    _initializerDefineProperty(_this, "webSocketReadyState", _descriptor4, _this);
    return _this;
  }
  _inherits(RingCentralExtensions, _RcModuleV);
  return _createClass(RingCentralExtensions, [{
    key: "onInitOnce",
    value: function () {
      var _onInitOnce = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return this._setupInfra();
            case 1:
              _context.n = 2;
              return this._bindEvents();
            case 2:
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
        var _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              _context2.n = 1;
              return this.recoverWebSocketConnection();
            case 1:
              _context2.n = 3;
              break;
            case 2:
              _context2.p = 2;
              _t = _context2.v;
              if (process.env.NODE_ENV !== 'test') {
                console.log("onInitSuccess error: ".concat(_t));
              }
            case 3:
              return _context2.a(2);
          }
        }, _callee2, this, [[0, 2]]);
      }));
      function onInitSuccess() {
        return _onInitSuccess.apply(this, arguments);
      }
      return onInitSuccess;
    }()
  }, {
    key: "_setupInfra",
    value: function () {
      var _setupInfra2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var _this$_deps$ringCentr2,
          _wsOptions$wscToken,
          _this$wscToken,
          _this2 = this;
        var _this$_deps$ringCentr, debugExtension, rcSdkExtension, wsOptions;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              this._core = new _core["default"]();

              // install DebugExtension
              if (!(process.env.NODE_ENV !== 'production' && this.debugMode)) {
                _context4.n = 1;
                break;
              }
              debugExtension = new _debug["default"]((_this$_deps$ringCentr = this._deps.ringCentralExtensionsOptions) === null || _this$_deps$ringCentr === void 0 ? void 0 : _this$_deps$ringCentr.debugOptions);
              _context4.n = 1;
              return this._core.installExtension(debugExtension);
            case 1:
              // install RcSdkExtension
              rcSdkExtension = new _rcsdk["default"]({
                rcSdk: this.sdk
              });
              _context4.n = 2;
              return this._core.installExtension(rcSdkExtension);
            case 2:
              // install WebSocketExtension
              wsOptions = (_this$_deps$ringCentr2 = this._deps.ringCentralExtensionsOptions) === null || _this$_deps$ringCentr2 === void 0 ? void 0 : _this$_deps$ringCentr2.webSocketOptions;
              this._webSocketExtension = new _ws["default"](_objectSpread(_objectSpread({}, wsOptions), {}, {
                wscToken: (_wsOptions$wscToken = wsOptions === null || wsOptions === void 0 ? void 0 : wsOptions.wscToken) !== null && _wsOptions$wscToken !== void 0 ? _wsOptions$wscToken : (_this$wscToken = this.wscToken) === null || _this$wscToken === void 0 ? void 0 : _this$wscToken.token
              }));
              this._useTokens();
              this._webSocketExtension.eventEmitter.addListener(_ws.Events.newWsc, function () {
                _this2._saveTokens();
              });
              // expose WebSocket events
              this._webSocketExtension.eventEmitter.addListener(_ws.Events.newWebSocketObject, /*#__PURE__*/function () {
                var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(ws) {
                  var _ws$_onCreated;
                  return _regenerator().w(function (_context3) {
                    while (1) switch (_context3.n) {
                      case 0:
                        _context3.n = 1;
                        return (_ws$_onCreated = ws._onCreated) === null || _ws$_onCreated === void 0 ? void 0 : _ws$_onCreated.call(ws);
                      case 1:
                        // expose events
                        _this2._exposeConnectionEvents();
                      case 2:
                        return _context3.a(2);
                    }
                  }, _callee3);
                }));
                return function (_x) {
                  return _ref.apply(this, arguments);
                };
              }());
              this._webSocketExtension.eventEmitter.addListener(_ws.Events.connectionReady, function () {
                _this2._wsConnectionReady = true;
                _this2._syncWsReadyState();
              });
              if (!(this._deps.auth.loggedIn && (!this.disconnectOnInactive || this.isTabActive))) {
                _context4.n = 3;
                break;
              }
              _context4.n = 3;
              return this._installWebSocketExtension();
            case 3:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function _setupInfra() {
        return _setupInfra2.apply(this, arguments);
      }
      return _setupInfra;
    }()
  }, {
    key: "_installWebSocketExtension",
    value: function () {
      var _installWebSocketExtension2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var _t2;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              if (this.allowSwitchConnection) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2);
            case 1:
              _context5.p = 1;
              if (process.env.NODE_ENV !== 'test') {
                console.log('[RingCentralExtensions] > WebSocketExtension > install');
              }
              _context5.n = 2;
              return this._core.installExtension(this._webSocketExtension);
            case 2:
              _context5.n = 4;
              break;
            case 3:
              _context5.p = 3;
              _t2 = _context5.v;
              // It tries to establish connection on install.
              // Catch the connection issue and ignore.
              if (process.env.NODE_ENV !== 'test') {
                console.error('[RingCentralExtensions] > WebSocketExtension > install failed', _t2);
              }
            case 4:
              return _context5.a(2);
          }
        }, _callee5, this, [[1, 3]]);
      }));
      function _installWebSocketExtension() {
        return _installWebSocketExtension2.apply(this, arguments);
      }
      return _installWebSocketExtension;
    }()
  }, {
    key: "_bindEvents",
    value: function () {
      var _bindEvents2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        var _this$_webSocketExten2,
          _this3 = this,
          _this$_deps$sleepDete;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              if ((_this$_webSocketExten2 = this._webSocketExtension.options.autoRecover) === null || _this$_webSocketExten2 === void 0 ? void 0 : _this$_webSocketExten2.enabled) {
                this._webSocketExtension.eventEmitter.addListener(_ws.Events.autoRecoverSuccess, function () {
                  _this3._exposeConnectionEvents();
                });
                this._webSocketExtension.eventEmitter.addListener(_ws.Events.autoRecoverFailed, function () {
                  _this3._exposeConnectionEvents();
                });
              }

              // register SleepDetector
              (_this$_deps$sleepDete = this._deps.sleepDetector) === null || _this$_deps$sleepDete === void 0 ? void 0 : _this$_deps$sleepDete.on('detected', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
                return _regenerator().w(function (_context6) {
                  while (1) switch (_context6.n) {
                    case 0:
                      _context6.n = 1;
                      return _this3.recoverWebSocketConnection();
                    case 1:
                      return _context6.a(2);
                  }
                }, _callee6);
              })));

              // hook auth events
              this._deps.auth.addAfterLoggedInHandler(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
                return _regenerator().w(function (_context7) {
                  while (1) switch (_context7.n) {
                    case 0:
                      _context7.n = 1;
                      return _this3.recoverWebSocketConnection();
                    case 1:
                      return _context7.a(2);
                  }
                }, _callee7);
              })));
              this._deps.auth.addBeforeLogoutHandler(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
                return _regenerator().w(function (_context8) {
                  while (1) switch (_context8.n) {
                    case 0:
                      _context8.n = 1;
                      return _this3.revokeWebSocketConnection();
                    case 1:
                      return _context8.a(2);
                  }
                }, _callee8);
              })));
              this._deps.auth.addRefreshErrorHandler(/*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(refreshTokenValid) {
                  return _regenerator().w(function (_context9) {
                    while (1) switch (_context9.n) {
                      case 0:
                        if (refreshTokenValid) {
                          _context9.n = 1;
                          break;
                        }
                        _context9.n = 1;
                        return _this3.revokeWebSocketConnection();
                      case 1:
                        return _context9.a(2);
                    }
                  }, _callee9);
                }));
                return function (_x2) {
                  return _ref5.apply(this, arguments);
                };
              }());

              // multiple tabs support
              if (!this.disconnectOnInactive) {
                _context1.n = 1;
                break;
              }
              this._setSharedState();
              (0, _core2.watch)(this, function () {
                return _this3.isWebSocketReady;
              }, function () {
                _this3._setSharedState();
              });
              (0, _core2.watch)(this, function () {
                return _this3.isTabActive;
              }, /*#__PURE__*/function () {
                var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(tabActive) {
                  return _regenerator().w(function (_context0) {
                    while (1) switch (_context0.n) {
                      case 0:
                        if (!tabActive) {
                          _context0.n = 2;
                          break;
                        }
                        if (process.env.NODE_ENV !== 'test') {
                          console.log('[RingCentralExtensions] > tab > active');
                        }
                        _context0.n = 1;
                        return _this3._debouncedOnTabActive();
                      case 1:
                        _context0.n = 3;
                        break;
                      case 2:
                        if (process.env.NODE_ENV !== 'test') {
                          console.log('[RingCentralExtensions] > tab > inactive');
                        }
                        _this3._debouncedOnTabActive.cancel();
                      case 3:
                        return _context0.a(2);
                    }
                  }, _callee0);
                }));
                return function (_x3) {
                  return _ref6.apply(this, arguments);
                };
              }());
              (0, _core2.watch)(this, function () {
                return _this3.allowSwitchConnection;
              }, function (allow) {
                if (allow && _this3.isTabActive) {
                  _this3._onTabActive();
                }
              });
              (0, _core2.watch)(this, function () {
                return _this3._deps.tabManager.event;
              }, function (event) {
                _this3._tabMessageHandler(event);
              });
              if (!this.isTabActive) {
                _context1.n = 1;
                break;
              }
              _context1.n = 1;
              return this._inactiveOtherTabs();
            case 1:
              return _context1.a(2);
          }
        }, _callee1, this);
      }));
      function _bindEvents() {
        return _bindEvents2.apply(this, arguments);
      }
      return _bindEvents;
    }()
  }, {
    key: "_setSharedState",
    value: function _setSharedState() {
      if (this._deps.availabilityMonitor && this._deps.tabManager) {
        var key = "ws-".concat(this._deps.tabManager.id);
        this._deps.availabilityMonitor.setSharedState(key, {
          webSocketReady: this.isWebSocketReady
        });
      }
    }
  }, {
    key: "_setWsAutoRecover",
    value: function _setWsAutoRecover(enabled) {
      var _this$_deps$ringCentr3, _this$_deps$ringCentr4, _this$_deps$ringCentr5;
      // when auto recover is NOT configured as disabled (it is enabled by default)
      if (this._webSocketExtension && ((_this$_deps$ringCentr3 = this._deps.ringCentralExtensionsOptions) === null || _this$_deps$ringCentr3 === void 0 ? void 0 : (_this$_deps$ringCentr4 = _this$_deps$ringCentr3.webSocketOptions) === null || _this$_deps$ringCentr4 === void 0 ? void 0 : (_this$_deps$ringCentr5 = _this$_deps$ringCentr4.autoRecover) === null || _this$_deps$ringCentr5 === void 0 ? void 0 : _this$_deps$ringCentr5.enabled) !== false) {
        // enable/disable ws auto recover
        this._webSocketExtension.options.autoRecover.enabled = enabled;
      }
    }
  }, {
    key: "_onTabActive",
    value: function () {
      var _onTabActive2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              if (!(!this.ready || !this.isTabActive)) {
                _context10.n = 1;
                break;
              }
              return _context10.a(2);
            case 1:
              _context10.n = 2;
              return this._inactiveOtherTabs();
            case 2:
              _context10.n = 3;
              return this.recoverWebSocketConnection();
            case 3:
              return _context10.a(2);
          }
        }, _callee10, this);
      }));
      function _onTabActive() {
        return _onTabActive2.apply(this, arguments);
      }
      return _onTabActive;
    }()
  }, {
    key: "_tabMessageHandler",
    value: function _tabMessageHandler(event) {
      if (!this.ready || !event) {
        return;
      }
      if (event.name === InactiveTabEventName) {
        // as an inactive tab, disable auto recover
        this._setWsAutoRecover(false);
      } else if (event.name === SyncTokensTabEventName) {
        // as an inactive tab, sync and use with tokens that are received from active tab
        this._setTokens(event.args[0], event.args[1], event.args[2]);
        this._useTokens();
      }
    }
  }, {
    key: "_inactiveOtherTabs",
    value: function () {
      var _inactiveOtherTabs2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
        var _this$_deps$tabManage;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              if (this.allowSwitchConnection) {
                _context11.n = 1;
                break;
              }
              return _context11.a(2);
            case 1:
              _context11.n = 2;
              return (_this$_deps$tabManage = this._deps.tabManager) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage.send(InactiveTabEventName);
            case 2:
              // when auto recover of active tab is NOT configured as disabled
              this._setWsAutoRecover(true);
            case 3:
              return _context11.a(2);
          }
        }, _callee11, this);
      }));
      function _inactiveOtherTabs() {
        return _inactiveOtherTabs2.apply(this, arguments);
      }
      return _inactiveOtherTabs;
    }()
  }, {
    key: "_syncTokensToOtherTabs",
    value: function () {
      var _syncTokensToOtherTabs2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
        var _this$_deps$tabManage2;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              _context12.n = 1;
              return (_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.send(SyncTokensTabEventName, this.wsToken, this.wsTokenExpiresAt, this.wscToken);
            case 1:
              return _context12.a(2);
          }
        }, _callee12, this);
      }));
      function _syncTokensToOtherTabs() {
        return _syncTokensToOtherTabs2.apply(this, arguments);
      }
      return _syncTokensToOtherTabs;
    }()
  }, {
    key: "_useTokens",
    value: function _useTokens() {
      this._webSocketExtension.wsToken = this.wsToken;
      this._webSocketExtension.wsTokenExpiresAt = this.wsTokenExpiresAt;
      this._webSocketExtension.wsc = this.wscToken;
    }
  }, {
    key: "_saveTokens",
    value: function _saveTokens() {
      this._setTokens(this._webSocketExtension.wsToken, this._webSocketExtension.wsTokenExpiresAt, this._webSocketExtension.wsc);
      if (this.disconnectOnInactive) {
        this._syncTokensToOtherTabs();
      }
    }
  }, {
    key: "_clearTokens",
    value: function _clearTokens() {
      this._setTokens(null, 0, null);
      if (this.disconnectOnInactive) {
        this._syncTokensToOtherTabs();
      }
    }
  }, {
    key: "_setTokens",
    value: function _setTokens(wsToken, wsTokenExpiresAt, wscToken) {
      this.wsToken = wsToken !== null && wsToken !== void 0 ? wsToken : null;
      this.wsTokenExpiresAt = wsTokenExpiresAt !== null && wsTokenExpiresAt !== void 0 ? wsTokenExpiresAt : 0;
      this.wscToken = wscToken !== null && wscToken !== void 0 ? wscToken : null;
    }
  }, {
    key: "recoverWebSocketConnection",
    value: function () {
      var _recoverWebSocketConnection = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              if (this.ready) {
                _context13.n = 1;
                break;
              }
              return _context13.a(2);
            case 1:
              if (this._deps.auth.loggedIn) {
                _context13.n = 2;
                break;
              }
              return _context13.a(2);
            case 2:
              if (!(this.disconnectOnInactive && !this.isTabActive)) {
                _context13.n = 3;
                break;
              }
              return _context13.a(2);
            case 3:
              if (this.allowSwitchConnection) {
                _context13.n = 4;
                break;
              }
              return _context13.a(2);
            case 4:
              if (this._webSocketExtension.rc) {
                _context13.n = 6;
                break;
              }
              _context13.n = 5;
              return this._installWebSocketExtension();
            case 5:
              _context13.n = 8;
              break;
            case 6:
              _context13.n = 7;
              return this._webSocketExtension.recover();
            case 7:
              this._webSocketExtension.enable();
            case 8:
              this._exposeConnectionEvents();
            case 9:
              return _context13.a(2);
          }
        }, _callee13, this);
      }));
      function recoverWebSocketConnection() {
        return _recoverWebSocketConnection.apply(this, arguments);
      }
      return recoverWebSocketConnection;
    }()
  }, {
    key: "revokeWebSocketConnection",
    value: function () {
      var _revokeWebSocketConnection = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              if (this.ready) {
                _context14.n = 1;
                break;
              }
              return _context14.a(2);
            case 1:
              if (!(this.disconnectOnInactive && !this.isTabActive)) {
                _context14.n = 2;
                break;
              }
              return _context14.a(2);
            case 2:
              _context14.n = 3;
              return this._webSocketExtension.revoke(true);
            case 3:
              this._exposeConnectionEvents();
              this._clearTokens();
            case 4:
              return _context14.a(2);
          }
        }, _callee14, this);
      }));
      function revokeWebSocketConnection() {
        return _revokeWebSocketConnection.apply(this, arguments);
      }
      return revokeWebSocketConnection;
    }()
  }, {
    key: "_exposeConnectionEvents",
    value: function _exposeConnectionEvents() {
      var _this$_removeWsListen,
        _this4 = this;
      (_this$_removeWsListen = this._removeWsListener) === null || _this$_removeWsListen === void 0 ? void 0 : _this$_removeWsListen.call(this);
      var ws = this._webSocketExtension.ws;
      if (ws) {
        ws.addEventListener('close', this._syncWsReadyState);
        ws.addEventListener('open', this._syncWsReadyState);
        ws.addEventListener('error', this._syncWsReadyState);
        this._removeWsListener = function () {
          ws.removeEventListener('close', _this4._syncWsReadyState);
          ws.removeEventListener('open', _this4._syncWsReadyState);
          ws.removeEventListener('error', _this4._syncWsReadyState);
        };
      }
      this._syncWsReadyState();
    }
  }, {
    key: "_setWebSocketReadyState",
    value: function _setWebSocketReadyState(readyState) {
      var state;
      switch (readyState) {
        case _isomorphicWs["default"].CONNECTING:
          {
            state = _webSocketReadyStates.webSocketReadyStates.connecting;
            break;
          }
        case _isomorphicWs["default"].OPEN:
          {
            if (this._wsConnectionReady) {
              state = _webSocketReadyStates.webSocketReadyStates.ready;
            } else {
              state = _webSocketReadyStates.webSocketReadyStates.open;
            }
            break;
          }
        case _isomorphicWs["default"].CLOSING:
          {
            state = _webSocketReadyStates.webSocketReadyStates.closing;
            break;
          }
        case _isomorphicWs["default"].CLOSED:
          {
            state = _webSocketReadyStates.webSocketReadyStates.closed;
            this._wsConnectionReady = false;
            break;
          }
        default:
          {
            state = null;
            this._wsConnectionReady = undefined;
            break;
          }
      }
      if (process.env.NODE_ENV !== 'test' && this.webSocketReadyState !== state) {
        console.log("[RingCentralExtensions] > webSocketReadyState > ".concat(this.webSocketReadyState, " -> ").concat(state));
      }
      this.webSocketReadyState = state;
    }
  }, {
    key: "isWebSocketReady",
    get: function get() {
      return this.webSocketReadyState === _webSocketReadyStates.webSocketReadyStates.ready;
    }
  }, {
    key: "debugMode",
    get: function get() {
      var _this$_deps$ringCentr6, _this$_deps$ringCentr7;
      return (_this$_deps$ringCentr6 = (_this$_deps$ringCentr7 = this._deps.ringCentralExtensionsOptions) === null || _this$_deps$ringCentr7 === void 0 ? void 0 : _this$_deps$ringCentr7.debugMode) !== null && _this$_deps$ringCentr6 !== void 0 ? _this$_deps$ringCentr6 : false;
    }
  }, {
    key: "isTabActive",
    get: function get() {
      return !!(this._deps.tabManager && this._deps.tabManager.ready && this._deps.tabManager.active);
    }
  }, {
    key: "disconnectOnInactive",
    get: function get() {
      var _this$_deps$ringCentr8, _this$_deps$ringCentr9;
      return (_this$_deps$ringCentr8 = (_this$_deps$ringCentr9 = this._deps.ringCentralExtensionsOptions) === null || _this$_deps$ringCentr9 === void 0 ? void 0 : _this$_deps$ringCentr9.disconnectOnInactive) !== null && _this$_deps$ringCentr8 !== void 0 ? _this$_deps$ringCentr8 : false;
    }
  }, {
    key: "sdk",
    get: function get() {
      return this._deps.client.service;
    }
  }, {
    key: "core",
    get: function get() {
      return this._core;
    }
  }, {
    key: "webSocketExtension",
    get: function get() {
      return this._webSocketExtension;
    }
  }, {
    key: "allowSwitchConnection",
    get: function get() {
      var _this$_deps$availabil, _this$_deps$availabil2;
      if (((_this$_deps$availabil = this._deps.availabilityMonitor) === null || _this$_deps$availabil === void 0 ? void 0 : _this$_deps$availabil.hasCallSession) && ((_this$_deps$availabil2 = this._deps.availabilityMonitor) === null || _this$_deps$availabil2 === void 0 ? void 0 : _this$_deps$availabil2.hasWebSocketReady)) {
        return false;
      }
      return true;
    }
  }]);
}(_core2.RcModuleV2), _applyDecoratedDescriptor(_class2.prototype, "_setupInfra", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_setupInfra"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_bindEvents", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_bindEvents"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setTokens", [_core2.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setTokens"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "wsToken", [_core2.storage, _core2.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "wsTokenExpiresAt", [_core2.storage, _core2.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "wscToken", [_core2.storage, _core2.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "recoverWebSocketConnection", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "recoverWebSocketConnection"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "revokeWebSocketConnection", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "revokeWebSocketConnection"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setWebSocketReadyState", [_core2.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setWebSocketReadyState"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "webSocketReadyState", [_core2.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _class2)) || _class);
//# sourceMappingURL=RingCentralExtensions.js.map
