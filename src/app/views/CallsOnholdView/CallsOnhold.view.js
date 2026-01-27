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
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallsOnholdView = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _views = require("@ringcentral-integration/micro-contacts/src/app/views");
var _services3 = require("@ringcentral-integration/micro-core/src/app/services");
var _views2 = require("@ringcentral-integration/micro-core/src/app/views");
var _services4 = require("@ringcentral-integration/micro-message/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _ramda = require("ramda");
var _services5 = require("../../services");
var _ActiveCallsView2 = require("../ActiveCallsView");
var _MergeCallConfirmView = require("../MergeCallConfirmView");
var _SwitchCallConfirmView = require("../SwitchCallConfirmView");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _class, _class2;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var CallsOnholdView = exports.CallsOnholdView = (_dec = (0, _nextCore.injectable)({
  name: 'CallsOnholdView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 16);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 17);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 18);
}, _dec5 = function _dec5(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 19);
}, _dec6 = function _dec6(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 20);
}, _dec7 = function _dec7(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 21);
}, _dec8 = function _dec8(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 22);
}, _dec9 = function _dec9(target, key) {
  return (0, _nextCore.optional)('ActiveCallsViewOptions')(target, undefined, 23);
}, _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", [typeof _services3.Brand === "undefined" ? Object : _services3.Brand, typeof _services3.Locale === "undefined" ? Object : _services3.Locale, typeof _services5.CallMonitor === "undefined" ? Object : _services5.CallMonitor, typeof _services.RateLimiter === "undefined" ? Object : _services.RateLimiter, typeof _services2.ContactSearch === "undefined" ? Object : _services2.ContactSearch, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _services2.ContactMatcher === "undefined" ? Object : _services2.ContactMatcher, typeof _services5.CallingSettings === "undefined" ? Object : _services5.CallingSettings, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services.ConnectivityMonitor === "undefined" ? Object : _services.ConnectivityMonitor, typeof _services.ConnectivityManager === "undefined" ? Object : _services.ConnectivityManager, typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof _services.ExtensionInfo === "undefined" ? Object : _services.ExtensionInfo, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof _views2.ModalView === "undefined" ? Object : _views2.ModalView, typeof _services5.Webphone === "undefined" ? Object : _services5.Webphone, typeof _services5.CallLogger === "undefined" ? Object : _services5.CallLogger, typeof _services4.ComposeText === "undefined" ? Object : _services4.ComposeText, typeof _MergeCallConfirmView.MergeCallConfirmView === "undefined" ? Object : _MergeCallConfirmView.MergeCallConfirmView, typeof _SwitchCallConfirmView.SwitchCallConfirmView === "undefined" ? Object : _SwitchCallConfirmView.SwitchCallConfirmView, typeof _views.ContactDetailsView === "undefined" ? Object : _views.ContactDetailsView, typeof _services5.ActiveCallControl === "undefined" ? Object : _services5.ActiveCallControl, typeof ActiveCallsViewOptions === "undefined" ? Object : ActiveCallsViewOptions]), _dec10 = (0, _nextCore.computed)(function (that) {
  return [that._callMonitor.allCalls, that.params.fromSessionId];
}), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = _dec9(_class = _dec0(_class = _dec1(_class = (_class2 = /*#__PURE__*/function (_ActiveCallsView) {
  function CallsOnholdView(_brand, _locale, _callMonitor, _rateLimiter, _contactSearch, _regionSettings, _contactMatcher, _callingSettings, _router, _appFeatures, _connectivityMonitor, _connectivityManager, _accountInfo, _extensionInfo, _portManager, _modalView, _webphone, _callLogger, _composeText, _mergeCallConfirmView, _switchCallConfirmView, _contactDetailsView, _activeCallControl, _activeCallsViewOptions) {
    var _this;
    _classCallCheck(this, CallsOnholdView);
    _this = _callSuper(this, CallsOnholdView, [_brand, _locale, _callMonitor, _rateLimiter, _contactSearch, _regionSettings, _contactMatcher, _callingSettings, _router, _appFeatures, _connectivityMonitor, _connectivityManager, _accountInfo, _extensionInfo, _portManager, _modalView, _webphone, _callLogger, _composeText, _mergeCallConfirmView, _switchCallConfirmView, _contactDetailsView, _activeCallControl, _activeCallsViewOptions]);
    _this._brand = _brand;
    _this._locale = _locale;
    _this._callMonitor = _callMonitor;
    _this._rateLimiter = _rateLimiter;
    _this._contactSearch = _contactSearch;
    _this._regionSettings = _regionSettings;
    _this._contactMatcher = _contactMatcher;
    _this._callingSettings = _callingSettings;
    _this._router = _router;
    _this._appFeatures = _appFeatures;
    _this._connectivityMonitor = _connectivityMonitor;
    _this._connectivityManager = _connectivityManager;
    _this._accountInfo = _accountInfo;
    _this._extensionInfo = _extensionInfo;
    _this._portManager = _portManager;
    _this._modalView = _modalView;
    _this._webphone = _webphone;
    _this._callLogger = _callLogger;
    _this._composeText = _composeText;
    _this._mergeCallConfirmView = _mergeCallConfirmView;
    _this._switchCallConfirmView = _switchCallConfirmView;
    _this._contactDetailsView = _contactDetailsView;
    _this._activeCallControl = _activeCallControl;
    _this._activeCallsViewOptions = _activeCallsViewOptions;
    _this.params = {};
    return _this;
  }
  _inherits(CallsOnholdView, _ActiveCallsView);
  return _createClass(CallsOnholdView, [{
    key: "calls",
    get: function get() {
      var _this2 = this;
      return (0, _ramda.filter)(function (call) {
        return !!(call.webphoneSession && call.webphoneSession.id !== _this2.params.fromSessionId);
      }, this._callMonitor.allCalls);
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(options) {
      return _objectSpread(_objectSpread({}, _superPropGet(CallsOnholdView, "getUIProps", this, 3)([options])), {}, {
        calls: this.calls
      });
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(options) {
      var _this3 = this;
      return _objectSpread(_objectSpread({}, _superPropGet(CallsOnholdView, "getUIFunctions", this, 3)([options])), {}, {
        onMerge: function () {
          var _onMerge = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(sessionId) {
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  // to track user click merge
                  _this3._callMonitor.callsOnHoldClickMergeTrack();
                case 1:
                  return _context.a(2);
              }
            }, _callee);
          }));
          function onMerge(_x) {
            return _onMerge.apply(this, arguments);
          }
          return onMerge;
        }(),
        onBackButtonClick: function onBackButtonClick() {
          var _this3$_webphone;
          if ((_this3$_webphone = _this3._webphone) === null || _this3$_webphone === void 0 ? void 0 : _this3$_webphone.sessions.length) {
            _this3._router.goBack();
            return;
          }
          _this3._router.go(-2);
        },
        onAdd: function onAdd() {
          // to track use click add button
          _this3._callMonitor.callsOnHoldClickAddTrack();
          _this3._router.push("/conferenceCall/dialer/".concat(_this3.params.fromNumber, "/").concat(_this3.params.fromSessionId));
        },
        getAvatarUrl: options.getAvatarUrl,
        webphoneHangup: function () {
          var _webphoneHangup = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(sessionId) {
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.n) {
                case 0:
                  // track user click hangup on calls onhold page
                  _this3._callMonitor.callsOnHoldClickHangupTrack();
                  return _context2.a(2, _this3._webphone && _this3._webphone.hangup(sessionId));
              }
            }, _callee2);
          }));
          function webphoneHangup(_x2) {
            return _webphoneHangup.apply(this, arguments);
          }
          return webphoneHangup;
        }()
      });
    }
  }, {
    key: "component",
    value: function component(props) {
      this.params = (0, _nextCore.useParams)();
      return _superPropGet(CallsOnholdView, "component", this, 3)([props]);
    }
  }]);
}(_ActiveCallsView2.ActiveCallsView), _applyDecoratedDescriptor(_class2.prototype, "calls", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "calls"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=CallsOnhold.view.js.map
