"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallAction = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.constructor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _rxjs = require("rxjs");
var _services3 = require("../../views/CallView/services");
var _ActiveCallControl = require("../ActiveCallControl");
var _CallMonitor = require("../CallMonitor");
var _PreinsertCall = require("../PreinsertCall");
var _Webphone = require("../Webphone");
var _ConferenceCallAction = require("./ConferenceCallAction");
var _SwitchCallConfirm = require("./SwitchCallConfirm");
var _i18n = require("./i18n");
var _utils = require("./utils");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _dec66, _dec67, _dec68, _dec69, _dec70, _dec71, _dec72, _dec73, _dec74, _dec75, _dec76, _dec77, _dec78, _dec79, _dec80, _dec81, _dec82, _dec83, _dec84, _dec85, _dec86, _dec87, _dec88, _dec89, _dec90, _dec91, _dec92, _dec93, _dec94, _dec95, _dec96, _dec97, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
var CALLING_ROUTE_PATH = '/calling';

/**
 * group all call actions in this service, which use in latest version of spring-ui
 */
var CallAction = exports.CallAction = (_dec = (0, _nextCore.injectable)({
  name: 'CallAction'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 11);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('CallActionOptions')(target, undefined, 12);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _nextCore.Root === "undefined" ? Object : _nextCore.Root, typeof _services3.CallViewState === "undefined" ? Object : _services3.CallViewState, typeof _ConferenceCallAction.ConferenceCallAction === "undefined" ? Object : _ConferenceCallAction.ConferenceCallAction, typeof _SwitchCallConfirm.SwitchCallConfirm === "undefined" ? Object : _SwitchCallConfirm.SwitchCallConfirm, typeof _CallMonitor.CallMonitor === "undefined" ? Object : _CallMonitor.CallMonitor, typeof _PreinsertCall.PreinsertCall === "undefined" ? Object : _PreinsertCall.PreinsertCall, typeof _services.ConnectivityMonitor === "undefined" ? Object : _services.ConnectivityMonitor, typeof _ActiveCallControl.ActiveCallControl === "undefined" ? Object : _ActiveCallControl.ActiveCallControl, typeof _services2.Toast === "undefined" ? Object : _services2.Toast, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof _Webphone.Webphone === "undefined" ? Object : _Webphone.Webphone, typeof CallActionOptions === "undefined" ? Object : CallActionOptions]), _dec6 = Reflect.metadata("design:type", String), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [String]), _dec9 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", []), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", [String, typeof Partial === "undefined" ? Object : Partial]), _dec12 = (0, _nextCore.delegate)('server'), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [String, typeof Partial === "undefined" ? Object : Partial]), _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", [typeof Partial === "undefined" ? Object : Partial]), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", []), _dec19 = (0, _nextCore.delegate)('server'), _dec20 = Reflect.metadata("design:type", Function), _dec21 = Reflect.metadata("design:paramtypes", []), _dec22 = (0, _nextCore.delegate)('server'), _dec23 = Reflect.metadata("design:type", Function), _dec24 = Reflect.metadata("design:paramtypes", [String]), _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", [String]), _dec27 = (0, _nextCore.delegate)('server'), _dec28 = Reflect.metadata("design:type", Function), _dec29 = Reflect.metadata("design:paramtypes", [String]), _dec30 = (0, _nextCore.delegate)('server'), _dec31 = Reflect.metadata("design:type", Function), _dec32 = Reflect.metadata("design:paramtypes", [String]), _dec33 = Reflect.metadata("design:type", Function), _dec34 = Reflect.metadata("design:paramtypes", [String, typeof Partial === "undefined" ? Object : Partial, typeof OpenAndNavigateOptions === "undefined" ? Object : OpenAndNavigateOptions]), _dec35 = (0, _nextCore.delegate)('server'), _dec36 = Reflect.metadata("design:type", Function), _dec37 = Reflect.metadata("design:paramtypes", [String, typeof Partial === "undefined" ? Object : Partial, typeof OpenAndNavigateOptions === "undefined" ? Object : OpenAndNavigateOptions]), _dec38 = Reflect.metadata("design:type", Function), _dec39 = Reflect.metadata("design:paramtypes", []), _dec40 = Reflect.metadata("design:type", Function), _dec41 = Reflect.metadata("design:paramtypes", []), _dec42 = Reflect.metadata("design:type", Function), _dec43 = Reflect.metadata("design:paramtypes", []), _dec44 = Reflect.metadata("design:type", Function), _dec45 = Reflect.metadata("design:paramtypes", []), _dec46 = Reflect.metadata("design:type", Function), _dec47 = Reflect.metadata("design:paramtypes", []), _dec48 = Reflect.metadata("design:type", Function), _dec49 = Reflect.metadata("design:paramtypes", []), _dec50 = Reflect.metadata("design:type", Function), _dec51 = Reflect.metadata("design:paramtypes", []), _dec52 = Reflect.metadata("design:type", Function), _dec53 = Reflect.metadata("design:paramtypes", []), _dec54 = Reflect.metadata("design:type", Function), _dec55 = Reflect.metadata("design:paramtypes", []), _dec56 = Reflect.metadata("design:type", Function), _dec57 = Reflect.metadata("design:paramtypes", []), _dec58 = Reflect.metadata("design:type", Function), _dec59 = Reflect.metadata("design:paramtypes", []), _dec60 = Reflect.metadata("design:type", Function), _dec61 = Reflect.metadata("design:paramtypes", []), _dec62 = Reflect.metadata("design:type", Function), _dec63 = Reflect.metadata("design:paramtypes", []), _dec64 = Reflect.metadata("design:type", Function), _dec65 = Reflect.metadata("design:paramtypes", []), _dec66 = (0, _nextCore.dynamic)('SmartNotes'), _dec67 = Reflect.metadata("design:type", typeof SmartNotes === "undefined" ? Object : SmartNotes), _dec68 = (0, _nextCore.dynamic)('SmartNoteClient'), _dec69 = Reflect.metadata("design:type", typeof SmartNoteClient === "undefined" ? Object : SmartNoteClient), _dec70 = Reflect.metadata("design:type", Function), _dec71 = Reflect.metadata("design:paramtypes", [String]), _dec72 = (0, _nextCore.delegate)('server'), _dec73 = Reflect.metadata("design:type", Function), _dec74 = Reflect.metadata("design:paramtypes", [String]), _dec75 = (0, _nextCore.delegate)('server'), _dec76 = Reflect.metadata("design:type", Function), _dec77 = Reflect.metadata("design:paramtypes", [String]), _dec78 = (0, _nextCore.delegate)('server'), _dec79 = Reflect.metadata("design:type", Function), _dec80 = Reflect.metadata("design:paramtypes", [String, String]), _dec81 = (0, _nextCore.delegate)('server'), _dec82 = Reflect.metadata("design:type", Function), _dec83 = Reflect.metadata("design:paramtypes", [String]), _dec84 = (0, _nextCore.delegate)('server'), _dec85 = Reflect.metadata("design:type", Function), _dec86 = Reflect.metadata("design:paramtypes", [String]), _dec87 = (0, _nextCore.delegate)('server'), _dec88 = Reflect.metadata("design:type", Function), _dec89 = Reflect.metadata("design:paramtypes", []), _dec90 = (0, _nextCore.delegate)('server'), _dec91 = Reflect.metadata("design:type", Function), _dec92 = Reflect.metadata("design:paramtypes", []), _dec93 = (0, _nextCore.delegate)('server'), _dec94 = Reflect.metadata("design:type", Function), _dec95 = Reflect.metadata("design:paramtypes", [String, typeof CallActionType === "undefined" ? Object : CallActionType]), _dec96 = Reflect.metadata("design:type", Function), _dec97 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function CallAction(_root, _callViewState, _conferenceCallAction, _switchCallConfirm, _callMonitor, _preinsertCall, _connectivityMonitor, _activeCallControl, _toast, _router, _portManager, _webphone, _callActionOptions) {
    var _this;
    _classCallCheck(this, CallAction);
    _this = _callSuper(this, CallAction);
    _this._root = _root;
    _this._callViewState = _callViewState;
    _this._conferenceCallAction = _conferenceCallAction;
    _this._switchCallConfirm = _switchCallConfirm;
    _this._callMonitor = _callMonitor;
    _this._preinsertCall = _preinsertCall;
    _this._connectivityMonitor = _connectivityMonitor;
    _this._activeCallControl = _activeCallControl;
    _this._toast = _toast;
    _this._router = _router;
    _this._portManager = _portManager;
    _this._webphone = _webphone;
    _this._callActionOptions = _callActionOptions;
    _this.mergeMenuOpened$ = new _rxjs.BehaviorSubject(false);
    _this.displayCallTelephonyIdChange$ = (0, _nextCore.fromWatch)(_this, function () {
      var _this$displayCallAllI, _this$displayCallAllI2;
      return (_this$displayCallAllI = _this.displayCallAllInfo) === null || _this$displayCallAllI === void 0 ? void 0 : (_this$displayCallAllI2 = _this$displayCallAllI.call) === null || _this$displayCallAllI2 === void 0 ? void 0 : _this$displayCallAllI2.telephonySessionId;
    });
    _this.callActionEventsHistoryMap = new Map();
    _initializerDefineProperty(_this, "latestOpenCallTelephonySessionId", _descriptor, _this);
    _initializerDefineProperty(_this, "_callMetaInfoMap", _descriptor2, _this);
    _this.isCallMergeable = _this._activeCallControl.skipConferenceCall ? function () {
      return false;
    } : _this._conferenceCallAction.isCallMergeable;
    /**
     *  when ringing call => active call, there will have a little time gap, info be undefined which will cause the expanded layout jump a little, so keep use the lasted ringing id for the display call info
     */
    _this.getLastedRingingTelephonySessionId = (0, _utils.lastAvailableValue)(function () {
      var ringingCall = _this.displayCallsMap.ringing[0];
      return ringingCall === null || ringingCall === void 0 ? void 0 : ringingCall.telephonySessionId;
    });
    _initializerDefineProperty(_this, "_smartNotes", _descriptor3, _this);
    _initializerDefineProperty(_this, "_smartNoteClient", _descriptor4, _this);
    /**
     * all possible actions that use for user interaction
     */
    _this.actions = function () {
      var control = _this._activeCallControl;
      return {
        ignore: _this.processing(control.ignore.bind(control), 'ignore'),
        ignoreQueue: _this.processing(control.ignore.bind(control), 'end'),
        reject: _this.processing(control.reject.bind(control), 'end'),
        endAndAnswer: _this.processing(control.answerAndEnd.bind(control)),
        holdAndAnswer: _this.processing(control.answerAndHold.bind(control)),
        answer: _this.processing(control.answer.bind(control)),
        hold: _this.processing(control.hold.bind(control)),
        unhold: _this.processing(control.unhold.bind(control)),
        mute: _this.processing(control.mute.bind(control)),
        unmute: _this.processing(control.unmute.bind(control)),
        hangUp: _this.hangUpProcess.bind(_this),
        startRecord: _this.processing(control.startRecord.bind(control)),
        stopRecord: _this.processing(control.stopRecord.bind(control)),
        "switch": _this.switchProcess.bind(_this),
        transfer: _this.processing(function (telephonySessionId, transferNumber) {
          return control.transfer(transferNumber, telephonySessionId);
        }),
        transferToVoicemail: _this.processing(function (telephonySessionId, voicemailId) {
          return control.toVoicemail(voicemailId, telephonySessionId);
        }),
        flip: _this.processing(function (telephonySessionId, flipValue) {
          return control.flip(flipValue, telephonySessionId);
        }),
        startWarmTransfer: _this.processing(function (telephonySessionId, transferNumber) {
          return control.startWarmTransfer(transferNumber, telephonySessionId);
        }),
        replyWithMessage: _this.processing(function (telephonySessionId, params) {
          return control.replyWithMessage(params, telephonySessionId);
        }),
        forward: _this.processing(function (telephonySessionId, forwardNumber) {
          return control.forward(forwardNumber, telephonySessionId);
        }),
        sendDTMF: control.sendDTMF.bind(control),
        completeWarmTransfer: _this.processing(control.completeWarmTransfer.bind(control)),
        removeConferenceParticipant: _this.processing(control.removeConferenceParticipant.bind(control)),
        mergeCalls: _this.mergeCallsProcess.bind(_this),
        navigateToReply: function navigateToReply(telephonySessionId) {
          return _this.openAndNavigate(telephonySessionId, {
            currentPath: 'reply',
            minimized: false
          }, {
            view: 'activeCall'
          });
        },
        navigateToForward: function navigateToForward(telephonySessionId) {
          return _this.openAndNavigate(telephonySessionId, {
            currentPath: 'forward',
            minimized: false
          }, {
            view: 'activeCall'
          });
        },
        navigateToTransfer: function navigateToTransfer(telephonySessionId) {
          return _this.openAndNavigate(telephonySessionId, {
            currentPath: 'transfer'
          }, {
            view: 'activeCall'
          });
        },
        navigateToKeypad: function navigateToKeypad(telephonySessionId) {
          return _this.openAndNavigate(telephonySessionId, {
            currentPath: 'keypad'
          }, {
            view: 'activeCall'
          });
        },
        navigateToActive: _this.navigateToActive.bind(_this),
        swap: _this.swap.bind(_this),
        navigateToAddCall: function navigateToAddCall() {
          return _this._callViewState.setView('addCall');
        },
        navigateToCallList: function navigateToCallList() {
          return _this._callViewState.setView('callList');
        },
        close: _this.close.bind(_this)
      };
    }();
    _this.toggleExpanded = _this.expandedAbility ? function (telephonySessionId) {
      _this.updateCallMetaInfo(telephonySessionId, {
        expanded: !_this._root.expanded
      });
    } : undefined;
    /**
     * create all actions handler during the call by `telephonySessionId`
     *
     * @param telephonySessionId
     */
    _this.createActionsHandler = function (telephonySessionId) {
      var actions = _this.actions;
      return /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(actionType, value) {
          var _this$_smartNotes, _this$_smartNoteClien, _this$_smartNoteClien2;
          var hasReachedMaxCalls, toMergeWithTelephonySessionId, _t, _t2;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _this.logger.log("call action", {
                  telephonySessionId: telephonySessionId,
                  actionType: actionType,
                  value: value
                });
                if (!telephonySessionId) {
                  _context.n = 86;
                  break;
                }
                _this.pushCallActionHistory(telephonySessionId, actionType);
                _t = actionType;
                _context.n = _t === 'mute' ? 1 : _t === 'unmute' ? 3 : _t === 'answer' ? 5 : _t === 'voicemail' ? 7 : _t === 'hangUp' ? 9 : _t === 'hangUpWarmTransfer' ? 9 : _t === 'ignore' ? 11 : _t === 'ignoreQueue' ? 13 : _t === 'hold' ? 15 : _t === 'unHold' ? 17 : _t === 'endAndAnswer' ? 19 : _t === 'holdAndAnswer' ? 21 : _t === 'forward' ? 23 : _t === 'reply' ? 25 : _t === 'keypad' ? 27 : _t === 'transfer' ? 29 : _t === 'add' ? 31 : _t === 'record' ? 34 : _t === 'stopRecord' ? 36 : _t === 'flip' ? 38 : _t === 'sendDTMF' ? 41 : _t === 'startSwap' ? 44 : _t === 'activeCall' ? 46 : _t === 'callList' ? 48 : _t === 'back' ? 50 : _t === 'startTransfer' ? 52 : _t === 'startWarmTransfer' ? 56 : _t === 'startTransferToVoicemail' ? 60 : _t === 'completeWarmTransfer' ? 63 : _t === 'startReply' ? 65 : _t === 'startForward' ? 67 : _t === 'merge' ? 69 : _t === 'startMerge' ? 72 : _t === 'viewConferenceList' ? 74 : _t === 'removeParticipant' ? 75 : _t === 'switch' ? 77 : _t === 'aiNotes' ? 79 : _t === 'stopNotes' ? 82 : 84;
                break;
              case 1:
                _context.n = 2;
                return actions.mute(telephonySessionId);
              case 2:
                return _context.a(3, 85);
              case 3:
                _context.n = 4;
                return actions.unmute(telephonySessionId);
              case 4:
                return _context.a(3, 85);
              case 5:
                _context.n = 6;
                return actions.answer(telephonySessionId);
              case 6:
                return _context.a(3, 85);
              case 7:
                _context.n = 8;
                return actions.reject(value || telephonySessionId);
              case 8:
                return _context.a(3, 85);
              case 9:
                _context.n = 10;
                return actions.hangUp(value || telephonySessionId);
              case 10:
                return _context.a(3, 85);
              case 11:
                _context.n = 12;
                return actions.ignore(telephonySessionId);
              case 12:
                return _context.a(3, 85);
              case 13:
                _context.n = 14;
                return actions.ignoreQueue(telephonySessionId);
              case 14:
                return _context.a(3, 85);
              case 15:
                _context.n = 16;
                return actions.hold(telephonySessionId);
              case 16:
                return _context.a(3, 85);
              case 17:
                _context.n = 18;
                return actions.unhold(value || telephonySessionId);
              case 18:
                return _context.a(3, 85);
              case 19:
                _context.n = 20;
                return actions.endAndAnswer(telephonySessionId);
              case 20:
                return _context.a(3, 85);
              case 21:
                _context.n = 22;
                return actions.holdAndAnswer(telephonySessionId);
              case 22:
                return _context.a(3, 85);
              case 23:
                _context.n = 24;
                return actions.navigateToForward(telephonySessionId);
              case 24:
                return _context.a(3, 85);
              case 25:
                _context.n = 26;
                return actions.navigateToReply(telephonySessionId);
              case 26:
                return _context.a(3, 85);
              case 27:
                _context.n = 28;
                return actions.navigateToKeypad(telephonySessionId);
              case 28:
                return _context.a(3, 85);
              case 29:
                _context.n = 30;
                return actions.navigateToTransfer(telephonySessionId);
              case 30:
                return _context.a(3, 85);
              case 31:
                _context.n = 32;
                return _this.checkReachToMaxExistCalls();
              case 32:
                hasReachedMaxCalls = _context.v;
                if (hasReachedMaxCalls) {
                  _context.n = 33;
                  break;
                }
                _context.n = 33;
                return actions.navigateToAddCall();
              case 33:
                return _context.a(3, 85);
              case 34:
                _context.n = 35;
                return actions.startRecord(telephonySessionId);
              case 35:
                return _context.a(3, 85);
              case 36:
                _context.n = 37;
                return actions.stopRecord(telephonySessionId);
              case 37:
                return _context.a(3, 85);
              case 38:
                if (value) {
                  _context.n = 39;
                  break;
                }
                _this.logger.warn('[flip] must have value is empty');
                return _context.a(2);
              case 39:
                _context.n = 40;
                return actions.flip(telephonySessionId, value);
              case 40:
                return _context.a(3, 85);
              case 41:
                if (value) {
                  _context.n = 42;
                  break;
                }
                _this.logger.warn('[sendDTMF] must have value is empty');
                return _context.a(2);
              case 42:
                _context.n = 43;
                return actions.sendDTMF(value, telephonySessionId);
              case 43:
                return _context.a(3, 85);
              case 44:
                _context.n = 45;
                return actions.swap(value || telephonySessionId);
              case 45:
                return _context.a(3, 85);
              case 46:
                _context.n = 47;
                return actions.navigateToActive(value || telephonySessionId);
              case 47:
                return _context.a(3, 85);
              case 48:
                _context.n = 49;
                return actions.navigateToCallList();
              case 49:
                return _context.a(3, 85);
              case 50:
                _context.n = 51;
                return actions.close(telephonySessionId);
              case 51:
                return _context.a(3, 85);
              case 52:
                if (value) {
                  _context.n = 53;
                  break;
                }
                _this.logger.warn('[startTransfer] must have value, but got empty');
                return _context.a(2);
              case 53:
                _context.n = 54;
                return actions.transfer(telephonySessionId, value);
              case 54:
                _context.n = 55;
                return _this.updateCallMetaInfo(telephonySessionId, {
                  currentPath: 'controls'
                });
              case 55:
                return _context.a(3, 85);
              case 56:
                if (value) {
                  _context.n = 57;
                  break;
                }
                _this.logger.warn('[startWarmTransfer] must have value, but got empty');
                return _context.a(2);
              case 57:
                _context.n = 58;
                return actions.startWarmTransfer(telephonySessionId, value);
              case 58:
                _context.n = 59;
                return _this.updateCallMetaInfo(telephonySessionId, {
                  currentPath: 'controls'
                });
              case 59:
                return _context.a(3, 85);
              case 60:
                if (value) {
                  _context.n = 61;
                  break;
                }
                _this.logger.warn('[startTransferToVoicemail] must have value, but got empty');
                return _context.a(2);
              case 61:
                _context.n = 62;
                return actions.transferToVoicemail(telephonySessionId, value);
              case 62:
                return _context.a(3, 85);
              case 63:
                _context.n = 64;
                return actions.completeWarmTransfer(telephonySessionId);
              case 64:
                return _context.a(3, 85);
              case 65:
                _context.n = 66;
                return actions.replyWithMessage(telephonySessionId, value);
              case 66:
                return _context.a(3, 85);
              case 67:
                _context.n = 68;
                return actions.forward(telephonySessionId, value);
              case 68:
                return _context.a(3, 85);
              case 69:
                if (!(_this.mergeCalls.length > 1)) {
                  _context.n = 70;
                  break;
                }
                _this.mergeMenuOpened$.next(true);
                return _context.a(2);
              case 70:
                if (!(_this.mergeCalls.length === 1)) {
                  _context.n = 71;
                  break;
                }
                _context.n = 71;
                return actions.mergeCalls(telephonySessionId, _this.mergeCalls[0].telephonySessionId);
              case 71:
                return _context.a(3, 85);
              case 72:
                toMergeWithTelephonySessionId = value;
                _context.n = 73;
                return actions.mergeCalls(telephonySessionId, toMergeWithTelephonySessionId);
              case 73:
                return _context.a(3, 85);
              case 74:
                _this._conferenceCallAction.openParticipantsList(telephonySessionId);
                return _context.a(3, 85);
              case 75:
                _context.n = 76;
                return _this.actions.removeConferenceParticipant(telephonySessionId, value);
              case 76:
                return _context.a(3, 85);
              case 77:
                _context.n = 78;
                return _this.actions["switch"](telephonySessionId);
              case 78:
                return _context.a(3, 85);
              case 79:
                _context.n = 80;
                return (_this$_smartNotes = _this._smartNotes) === null || _this$_smartNotes === void 0 ? void 0 : _this$_smartNotes.verifySessionFromId(telephonySessionId);
              case 80:
                _context.n = 81;
                return (_this$_smartNoteClien = _this._smartNoteClient) === null || _this$_smartNoteClien === void 0 ? void 0 : _this$_smartNoteClien.startOrResume();
              case 81:
                return _context.a(2, _context.v);
              case 82:
                _context.n = 83;
                return (_this$_smartNoteClien2 = _this._smartNoteClient) === null || _this$_smartNoteClien2 === void 0 ? void 0 : _this$_smartNoteClien2.stopNotes();
              case 83:
                return _context.a(2, _context.v);
              case 84:
                _this.logger.warn("un handle \"".concat(actionType, "\" action"), {
                  value: value,
                  telephonySessionId: telephonySessionId
                });
                return _context.a(3, 85);
              case 85:
                _context.n = 92;
                break;
              case 86:
                _t2 = actionType;
                _context.n = _t2 === 'callList' ? 87 : _t2 === 'activeCall' ? 89 : 91;
                break;
              case 87:
                _context.n = 88;
                return actions.navigateToCallList();
              case 88:
                return _context.a(3, 92);
              case 89:
                _context.n = 90;
                return actions.navigateToActive(value);
              case 90:
                return _context.a(3, 92);
              case 91:
                _this.logger.warn("no telephonySessionId, can't handle \"".concat(actionType, "\" action"), {
                  value: value
                });
                return _context.a(3, 92);
              case 92:
                return _context.a(2);
            }
          }, _callee);
        }));
        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }();
    };
    /**
     * from post call page, let us know the event is from post call page
     */
    _this.fromPostCall = false;
    /**
     * when call action full screen opened
     */
    _this.fullScreenCallActionOpened$ = (0, _rxjs.merge)(
    // when router path is not /calling, close the display call
    (0, _nextCore.fromWatchValue)(_this, function () {
      return _this._router.currentPath;
    }).pipe((0, _rxjs.switchMap)(/*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(path) {
        var _this$displayCallAllI3, _this$displayCallAllI4, _this$displayCallAllI5, _telephonySessionId;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (!(_this.displayCallAllInfo && path !== CALLING_ROUTE_PATH)) {
                _context2.n = 1;
                break;
              }
              _telephonySessionId = (_this$displayCallAllI3 = _this.displayCallAllInfo.call) === null || _this$displayCallAllI3 === void 0 ? void 0 : _this$displayCallAllI3.telephonySessionId;
              if (!(_telephonySessionId && (// when that is minimized, don't close the call, that mean the call on the top of screen
              (_this$displayCallAllI4 = _this.displayCallAllInfo.meta) === null || _this$displayCallAllI4 === void 0 ? void 0 : _this$displayCallAllI4.open) && !((_this$displayCallAllI5 = _this.displayCallAllInfo.meta) === null || _this$displayCallAllI5 === void 0 ? void 0 : _this$displayCallAllI5.minimized))) {
                _context2.n = 1;
                break;
              }
              _context2.n = 1;
              return _this.close(_telephonySessionId);
            case 1:
              return _context2.a(2);
          }
        }, _callee2);
      }));
      return function (_x3) {
        return _ref2.apply(this, arguments);
      };
    }()), (0, _rxjs.switchMap)(function () {
      return _rxjs.NEVER;
    })), (0, _rxjs.combineLatest)([
    // also listen the telephony id change event, if id change should also check does that still inside the calling page
    // TODO: we may add the telephonySessionId into the calling path
    _this.displayCallTelephonyIdChange$, (0, _nextCore.fromWatchValue)(_this, function () {
      return _this.fullScreenCallActionOpened;
    })]).pipe((0, _rxjs.concatMap)(/*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(_ref3) {
        var _ref5, _, opened;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _ref5 = _slicedToArray(_ref3, 2), _ = _ref5[0], opened = _ref5[1];
              if (!opened) {
                _context3.n = 2;
                break;
              }
              if (!(_this._router.currentPath !== CALLING_ROUTE_PATH)) {
                _context3.n = 1;
                break;
              }
              _this.logger.log('push to calling page');
              _context3.n = 1;
              return _this._router.push(CALLING_ROUTE_PATH);
            case 1:
              _context3.n = 3;
              break;
            case 2:
              if (!(
              // when that is calling route
              _this._router.currentPath === CALLING_ROUTE_PATH)) {
                _context3.n = 3;
                break;
              }
              _this.logger.log('go back from calling page', {
                fromPostCall: _this.fromPostCall
              });
              _context3.n = 3;
              return _this.leaveCallingRoute();
            case 3:
              return _context3.a(2);
          }
        }, _callee3);
      }));
      return function (_x4) {
        return _ref4.apply(this, arguments);
      };
    }()))).pipe((0, _rxjs.share)());
    if (process.env.THEME_SYSTEM !== 'spring-ui') {
      throw new Error('This module is only for spring-ui');
    }
    return _this;
  }
  _inherits(CallAction, _RcModule);
  return _createClass(CallAction, [{
    key: "_setLatestOpenCallTelephonySessionId",
    value: function _setLatestOpenCallTelephonySessionId(val) {
      this.latestOpenCallTelephonySessionId = val;
    }
  }, {
    key: "mergeCalls",
    get: function get() {
      return this._activeCallControl.skipConferenceCall ? [] : this._conferenceCallAction.mergeCalls;
    }
  }, {
    key: "callMetaInfoMap",
    get: function get() {
      var _this2 = this;
      return Object.keys(this._callMetaInfoMap).reduce(function (acc, key) {
        var metaInfo = _this2._callMetaInfoMap[key];
        acc[key] = metaInfo ? _objectSpread(_objectSpread({}, metaInfo), {}, {
          actionsDisabled: (metaInfo === null || metaInfo === void 0 ? void 0 : metaInfo.actionsDisabled) || _this2.callActionsDisabled
        }) : undefined;
        return acc;
      }, {});
    }
  }, {
    key: "getCallMetaInfo",
    value: function getCallMetaInfo(telephonySessionId) {
      var metaInfo = this.callMetaInfoMap[telephonySessionId];
      return metaInfo;
    }

    /**
     * get the call all info by telephonySessionId
     *
     * when the telephonySessionId is from source call data, call always have value, so the return type is `CallAllInfo<true>`, otherwise, the return type is `CallAllInfo<false>`
     *
     * @param telephonySessionId - the telephonySessionId of the call
     * @returns the call all info
     */
  }, {
    key: "getAllInfoByTelephonySessionId",
    value: function getAllInfoByTelephonySessionId(telephonySessionId) {
      var session = this._activeCallControl.getActiveSession(telephonySessionId);
      if (!session) return undefined;
      var sessionId = session.sessionId;
      var meta = this.getCallMetaInfo(telephonySessionId);
      var call = this._callViewState.getCallWithExtraLog(sessionId);
      return {
        call: call,
        meta: meta,
        session: session
      };
    }
  }, {
    key: "_updateCallMetaInfo",
    value: function _updateCallMetaInfo(telephonySessionId, metaInfo) {
      var _this$_callMetaInfoMa, _this$_callMetaInfoMa2, _this$_callMetaInfoMa3;
      (_this$_callMetaInfoMa2 = (_this$_callMetaInfoMa = this._callMetaInfoMap)[telephonySessionId]) !== null && _this$_callMetaInfoMa2 !== void 0 ? _this$_callMetaInfoMa2 : _this$_callMetaInfoMa[telephonySessionId] = {
        open: false,
        currentPath: null,
        minimized: false,
        actionsDisabled: false,
        expanded: null
      };

      // when from open become close, set that as latest open call
      if (((_this$_callMetaInfoMa3 = this._callMetaInfoMap[telephonySessionId]) === null || _this$_callMetaInfoMa3 === void 0 ? void 0 : _this$_callMetaInfoMa3.open) && (metaInfo === null || metaInfo === void 0 ? void 0 : metaInfo.open) === false) {
        this._setLatestOpenCallTelephonySessionId(telephonySessionId);
      }
      Object.assign(this._callMetaInfoMap[telephonySessionId], metaInfo);
      var updatedMetaInfo = this._callMetaInfoMap[telephonySessionId];
      if (updatedMetaInfo &&
      // when open and not minimized, means that become active call
      updatedMetaInfo.open && !updatedMetaInfo.minimized) {
        this._activeCallControl.setActiveSessionId(telephonySessionId);
      }
      var expanded = metaInfo === null || metaInfo === void 0 ? void 0 : metaInfo.expanded;
      if (typeof expanded === 'boolean' && expanded !== this._root.expanded) {
        this._root['_setExpanded'](expanded);
      }
    }
  }, {
    key: "updateCallMetaInfo",
    value: function () {
      var _updateCallMetaInfo2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(telephonySessionId, val) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              this._updateCallMetaInfo(telephonySessionId, val);
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function updateCallMetaInfo(_x5, _x6) {
        return _updateCallMetaInfo2.apply(this, arguments);
      }
      return updateCallMetaInfo;
    }()
  }, {
    key: "_setAllIncomingCallsMeta",
    value: function _setAllIncomingCallsMeta(metaInfo) {
      var _this3 = this;
      this.allCallInfoList.forEach(function (_ref6) {
        var meta = _ref6.meta,
          call = _ref6.call;
        if ((meta === null || meta === void 0 ? void 0 : meta.currentPath) === 'incoming') {
          _this3._updateCallMetaInfo(call === null || call === void 0 ? void 0 : call.telephonySessionId, metaInfo);
        }
      });
    }
  }, {
    key: "_closeAllIncomingCalls",
    value: function _closeAllIncomingCalls() {
      this._setAllIncomingCallsMeta({
        open: false
      });
    }
  }, {
    key: "closeAllIncomingCalls",
    value: function () {
      var _closeAllIncomingCalls2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              this._closeAllIncomingCalls();
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function closeAllIncomingCalls() {
        return _closeAllIncomingCalls2.apply(this, arguments);
      }
      return closeAllIncomingCalls;
    }()
    /**
     * disable actions when processing
     *
     * ### the first argument must be `telephonySessionId`
     *
     * @param cb any callback method that need to disable actions when processing
     * @returns the callback method with actions disabled
     */
  }, {
    key: "processing",
    value: function processing(cb, preinsertClientStatus) {
      var _this4 = this;
      return /*#__PURE__*/function () {
        var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(telephonySessionId) {
          var info,
            _len,
            args,
            _key,
            _info,
            _args6 = arguments;
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.p = _context6.n) {
              case 0:
                info = _this4.getCallMetaInfo(telephonySessionId); // ensure that still be there and not disabled already
                if (info && !info.actionsDisabled) {
                  _this4.updateCallMetaInfo(telephonySessionId, {
                    actionsDisabled: true
                  });
                }

                // in need preinsert client status
                if (preinsertClientStatus) {
                  _this4._preinsertCall.setPreinsert(telephonySessionId, preinsertClientStatus);
                }
                _context6.p = 1;
                for (_len = _args6.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = _args6[_key];
                }
                _context6.n = 2;
                return cb.apply(void 0, [telephonySessionId].concat(args));
              case 2:
                return _context6.a(2, _context6.v);
              case 3:
                _context6.p = 3;
                _info = _this4.getCallMetaInfo(telephonySessionId); // ensure that still be disabled
                if (_info && _info.actionsDisabled) {
                  _this4.updateCallMetaInfo(telephonySessionId, {
                    actionsDisabled: false
                  });
                }
                return _context6.f(3);
              case 4:
                return _context6.a(2);
            }
          }, _callee6, null, [[1,, 3, 4]]);
        }));
        return function (_x7) {
          return _ref7.apply(this, arguments);
        };
      }();
    }
  }, {
    key: "close",
    value: function () {
      var _close = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(telephonySessionId) {
        var _this$_callActionOpti;
        var session, sessionId;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              if (!((_this$_callActionOpti = this._callActionOptions) === null || _this$_callActionOpti === void 0 ? void 0 : _this$_callActionOpti.onBeforeClose)) {
                _context7.n = 1;
                break;
              }
              // Get the session to extract the sessionId (not telephonySessionId)
              session = this._activeCallControl.getActiveSession(telephonySessionId);
              sessionId = session === null || session === void 0 ? void 0 : session.sessionId;
              if (!sessionId) {
                _context7.n = 1;
                break;
              }
              _context7.n = 1;
              return this._callActionOptions.onBeforeClose(sessionId);
            case 1:
              this._updateCallMetaInfo(telephonySessionId, {
                open: false
              });
              this._callViewState._setView('hidden');
            case 2:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function close(_x8) {
        return _close.apply(this, arguments);
      }
      return close;
    }()
  }, {
    key: "_remove",
    value: function _remove(telephonySessionId) {
      delete this._callMetaInfoMap[telephonySessionId];
      if (this.latestOpenCallTelephonySessionId === telephonySessionId) {
        this._setLatestOpenCallTelephonySessionId(null);
      }
      var activeSessionId = this._activeCallControl.activeSessionId;
      var allCalls = this._callMonitor.allCalls;
      if (activeSessionId === telephonySessionId) {
        this._activeCallControl.removeActiveSession();

        // when still have exist call, make the latest one as active, because that is the latest(time) call
        if (allCalls.length > 0) {
          this._activeCallControl.setActiveSessionId(allCalls[allCalls.length - 1].telephonySessionId);
          if (this._callViewState.view === 'hidden') {
            this._callViewState._setView('activeCall');
          }
        }
      }
    }
  }, {
    key: "remove",
    value: function () {
      var _remove2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(telephonySessionId) {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              this._remove(telephonySessionId);
            case 1:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function remove(_x9) {
        return _remove2.apply(this, arguments);
      }
      return remove;
    }()
  }, {
    key: "toggle",
    value: function () {
      var _toggle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(telephonySessionId) {
        var _this$getCallMetaInfo;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              this._updateCallMetaInfo(telephonySessionId, {
                open: ((_this$getCallMetaInfo = this.getCallMetaInfo(telephonySessionId)) === null || _this$getCallMetaInfo === void 0 ? void 0 : _this$getCallMetaInfo.open) ? false : true
              });
            case 1:
              return _context9.a(2);
          }
        }, _callee9, this);
      }));
      function toggle(_x0) {
        return _toggle.apply(this, arguments);
      }
      return toggle;
    }()
  }, {
    key: "_openAndNavigate",
    value: function _openAndNavigate(telephonySessionId, metaInfo) {
      var _this5 = this;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var _options$closeOtherAc = options.closeOtherActives,
        closeOtherActives = _options$closeOtherAc === void 0 ? true : _options$closeOtherAc,
        view = options.view;
      this.logger.log('openAndNavigate', {
        telephonySessionId: telephonySessionId,
        metaInfo: metaInfo,
        options: options
      });
      var currentMetaInfo = this.getAllInfoByTelephonySessionId(telephonySessionId);
      var ringing = (0, _ActiveCallControl.isRingingCall)(currentMetaInfo === null || currentMetaInfo === void 0 ? void 0 : currentMetaInfo.call);

      // when ringing always close other ringing calls, we currently only support one ringing call show
      if (ringing) this._closeAllIncomingCalls();
      if (closeOtherActives) {
        // when open a call, close all exist opened not ringing calls
        this.allCallInfoList.forEach(function (_ref8) {
          var call = _ref8.call,
            meta = _ref8.meta;
          var ringing = call && (0, _ActiveCallControl.isRingingCall)(call);
          // when ringing and be minimized, should not close
          if (ringing && (meta === null || meta === void 0 ? void 0 : meta.minimized)) return;
          var id = call === null || call === void 0 ? void 0 : call.telephonySessionId;
          if (meta && meta.open) {
            _this5._updateCallMetaInfo(id, {
              open: false
            });
          }
        });
      }
      if (view) {
        this._callViewState._setView(view);
      }
      this._updateCallMetaInfo(telephonySessionId, _objectSpread({
        open: true
      }, metaInfo));
    }
  }, {
    key: "openAndNavigate",
    value: function () {
      var _openAndNavigate2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(telephonySessionId, metaInfo, options) {
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              this._openAndNavigate(telephonySessionId, metaInfo, options);
            case 1:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function openAndNavigate(_x1, _x10, _x11) {
        return _openAndNavigate2.apply(this, arguments);
      }
      return openAndNavigate;
    }()
  }, {
    key: "isAnyCallOpened",
    get: function get() {
      return this.allCallInfoList.some(function (_ref9) {
        var meta = _ref9.meta;
        return meta === null || meta === void 0 ? void 0 : meta.open;
      });
    }
  }, {
    key: "displayCallsMap",
    get: function get() {
      return this._callMonitor.getDeviceCallsMaps('allDevices');
    }
  }, {
    key: "displayCallList",
    get: function get() {
      return [].concat(_toConsumableArray(this.displayCallsMap.ringing), _toConsumableArray(this.displayCallsMap.holding), _toConsumableArray(this.displayCallsMap.active));
    }

    /**
     * all info multiple calls
     */
  }, {
    key: "allCallInfoList",
    get: function get() {
      var _this6 = this;
      return this._callMonitor.allCalls.map(function (call) {
        return _this6.getAllInfoByTelephonySessionId(call.telephonySessionId);
      });
    }
  }, {
    key: "preInsertCallInfoList",
    get: function get() {
      var _this7 = this;
      return this._preinsertCall.preinsertCalls.map(function (call) {
        var _this7$existRingingOp, _this7$existRingingOp2, _this7$existRingingOp3;
        var isInbound = call.direction === 'Inbound';
        var meta = _this7.getCallMetaInfo(call.telephonySessionId) || {
          open: true,
          currentPath: isInbound ? 'incoming' : 'controls',
          minimized: isInbound ? (_this7$existRingingOp = (_this7$existRingingOp2 = _this7.existRingingOpenCallMetaInfo) === null || _this7$existRingingOp2 === void 0 ? void 0 : (_this7$existRingingOp3 = _this7$existRingingOp2.meta) === null || _this7$existRingingOp3 === void 0 ? void 0 : _this7$existRingingOp3.minimized) !== null && _this7$existRingingOp !== void 0 ? _this7$existRingingOp : true : false,
          actionsDisabled: true,
          expanded: null
        };
        return {
          call: call,
          meta: meta
        };
      });
    }
  }, {
    key: "ringingCallInfoList",
    get: function get() {
      var _this8 = this;
      return this.displayCallsMap.ringing.map(function (call) {
        return _this8.getAllInfoByTelephonySessionId(call.telephonySessionId);
      }).filter(function (x) {
        return x.meta;
      });
    }
  }, {
    key: "activeCallInfo",
    get: function get() {
      return this._activeCallControl.activeSessionId ? this.getAllInfoByTelephonySessionId(this._activeCallControl.activeSessionId) : undefined;
    }
  }, {
    key: "\u0275_displayTelephonySessionId",
    get:
    /**
     * be private, only use in `displayCallAllInfo` to got the telephonySessionId, because the display call info will need also base on the minimized state, should only use inside this module
     *
     * use ɵ prefix to make that hard to use outside
     *
     * # always use `displayCallAllInfo` to get the correct display call info
     */
    function get() {
      var _this$allCallInfoList;
      var displayId = this._activeCallControl.activeSessionId || this.getLastedRingingTelephonySessionId();
      if (displayId) return displayId;

      // when no active call, no ringing call, use the first call in the list to avoid exist call be hidden
      if (this.allCallInfoList.length > 0) return (_this$allCallInfoList = this.allCallInfoList[0].call) === null || _this$allCallInfoList === void 0 ? void 0 : _this$allCallInfoList.telephonySessionId;
      return undefined;
    }

    /**
     * the current display call info, which will be used in the display call layout, and top indicator layout
     *
     * use during the call connect process
     */
  }, {
    key: "displayCallAllInfo",
    get: function get() {
      var currTelephonySessionId = this.ɵ_displayTelephonySessionId;
      if (!currTelephonySessionId) return null;
      var info = this.getAllInfoByTelephonySessionId(currTelephonySessionId);
      if (!info || !info.meta) return null;
      return info;
    }

    /**
     * the call data during the call connect and after the call disconnect
     *
     * always use in call log form view
     */
  }, {
    key: "displayFormCall",
    get: function get() {
      var _displayCallAllInfo$m;
      if (this._callViewState.callDetailCallLog) {
        return this._callViewState.callDetailCallLog;
      }
      if (this._callViewState.view === 'postCall') {
        return this._callViewState.postCallCallLog;
      }
      var displayCallAllInfo = this.displayCallAllInfo;
      if (displayCallAllInfo === null || displayCallAllInfo === void 0 ? void 0 : (_displayCallAllInfo$m = displayCallAllInfo.meta) === null || _displayCallAllInfo$m === void 0 ? void 0 : _displayCallAllInfo$m.open) {
        return displayCallAllInfo.call;
      }
    }
  }, {
    key: "isFullSizeDisplayCall",
    value: function isFullSizeDisplayCall(telephonySessionId) {
      var callMetaInfo = this.getCallMetaInfo(telephonySessionId);
      return callMetaInfo && !callMetaInfo.minimized && callMetaInfo.open;
    }
  }, {
    key: "latestOpenedCallInfo",
    get: function get() {
      return this.latestOpenCallTelephonySessionId ? this.getAllInfoByTelephonySessionId(this.latestOpenCallTelephonySessionId) : undefined;
    }
  }, {
    key: "callActionsDisabled",
    get: function get() {
      var _this$_activeCallCont;
      return !this._connectivityMonitor.connectivity || ((_this$_activeCallCont = this._activeCallControl._rateLimiter) === null || _this$_activeCallCont === void 0 ? void 0 : _this$_activeCallCont.restricted) || false;
    }
  }, {
    key: "existRingingOpenCallMetaInfo",
    get: function get() {
      return this.ringingCallInfoList.find(function (callInfo) {
        var _callInfo$meta;
        return (_callInfo$meta = callInfo.meta) === null || _callInfo$meta === void 0 ? void 0 : _callInfo$meta.open;
      });
    }
  }, {
    key: "connectingCalls",
    get: function get() {
      return this.allCallInfoList.filter(function (x) {
        return x.call;
      });
    }
  }, {
    key: "announcementInfo",
    get: function get() {
      var displayCallAllInfo = this.displayCallAllInfo;
      var firstInfo = this.connectingCalls[0];
      return (displayCallAllInfo === null || displayCallAllInfo === void 0 ? void 0 : displayCallAllInfo.call) ? displayCallAllInfo : firstInfo;
    }
  }, {
    key: "hasHiddenCalls",
    get: function get() {
      var _this$existRingingOpe, _this$existRingingOpe2, _this$announcementInf, _this$announcementInf2;
      var displayCount = this.allCallInfoList.length - (((_this$existRingingOpe = this.existRingingOpenCallMetaInfo) === null || _this$existRingingOpe === void 0 ? void 0 : (_this$existRingingOpe2 = _this$existRingingOpe.meta) === null || _this$existRingingOpe2 === void 0 ? void 0 : _this$existRingingOpe2.minimized) ? 1 : 0) - (((_this$announcementInf = this.announcementInfo) === null || _this$announcementInf === void 0 ? void 0 : (_this$announcementInf2 = _this$announcementInf.meta) === null || _this$announcementInf2 === void 0 ? void 0 : _this$announcementInf2.open) ? 1 : 0);
      return displayCount >= 1;
    }

    /**
     * active call actions
     */
  }, {
    key: "onActiveActions",
    get: function get() {
      return this.createActionsHandler(this._activeCallControl.activeSessionId);
    }
  }, {
    key: "enableSmartNotes",
    get: function get() {
      var _this$_callActionOpti2, _this$_callActionOpti3;
      return (
        // if project not provide the brandAllowsSmartNotes, default to true
        ((_this$_callActionOpti2 = (_this$_callActionOpti3 = this._callActionOptions) === null || _this$_callActionOpti3 === void 0 ? void 0 : _this$_callActionOpti3.brandAllowsSmartNotes) !== null && _this$_callActionOpti2 !== void 0 ? _this$_callActionOpti2 : true) && !!this._smartNotes && this._smartNotes.hasPermission
      );
    }
  }, {
    key: "isCurrentAiNotesLoading",
    get: function get() {
      return !!this._smartNoteClient && this._smartNoteClient.isAiNotesLoading;
    }
  }, {
    key: "isCurrentAiNotesPauseable",
    get: function get() {
      return !!this._smartNoteClient && this._smartNoteClient.isAiNotesPauseable;
    }
  }, {
    key: "expandedAbility",
    get: function get() {
      var _this$_callActionOpti4, _this$_callActionOpti5;
      return (_this$_callActionOpti4 = (_this$_callActionOpti5 = this._callActionOptions) === null || _this$_callActionOpti5 === void 0 ? void 0 : _this$_callActionOpti5.expandedAbility) !== null && _this$_callActionOpti4 !== void 0 ? _this$_callActionOpti4 : true;
    }
  }, {
    key: "_navigateToActive",
    value: function _navigateToActive(telephonySessionId) {
      var allInfo = this.getAllInfoByTelephonySessionId(telephonySessionId);
      if (allInfo) {
        var call = allInfo.call;
        this._callViewState._setView('activeCall');
        var ringing = (0, _ActiveCallControl.isRingingCall)(call);
        this._activeCallControl.setActiveSessionId(telephonySessionId);
        this._openAndNavigate(telephonySessionId, {
          currentPath: ringing ? 'incoming' : 'controls',
          // always not minimized when navigate to active call
          minimized: false
        });
        return;
      }
      this.logger.info(" No active session found.");
    }
  }, {
    key: "navigateToActive",
    value: function () {
      var _navigateToActive2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(telephonySessionId) {
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              this._navigateToActive(telephonySessionId);
            case 1:
              return _context1.a(2);
          }
        }, _callee1, this);
      }));
      function navigateToActive(_x12) {
        return _navigateToActive2.apply(this, arguments);
      }
      return navigateToActive;
    }()
    /**
     * swap call
     *
     * 1. unhold the target call if the call is holing
     * 2. switch the view to the target call
     */
  }, {
    key: "swap",
    value: (function () {
      var _swap = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(telephonySessionId) {
        var allInfo;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              allInfo = this.getAllInfoByTelephonySessionId(telephonySessionId);
              if ((allInfo === null || allInfo === void 0 ? void 0 : allInfo.call) && (0, _ActiveCallControl.isHoldingCall)(allInfo === null || allInfo === void 0 ? void 0 : allInfo.call)) {
                this.actions.unhold(telephonySessionId);
              }
              this._navigateToActive(telephonySessionId);
            case 1:
              return _context10.a(2);
          }
        }, _callee10, this);
      }));
      function swap(_x13) {
        return _swap.apply(this, arguments);
      }
      return swap;
    }())
  }, {
    key: "_mergeCallsProcess",
    value: function () {
      var _mergeCallsProcess2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(telephonySessionId, toMergeWithTelephonySessionId) {
        var control, mergeCalls, mergeId;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              control = this._activeCallControl;
              mergeCalls = this.processing(control.mergeCalls.bind(control));
              _context11.n = 1;
              return this._conferenceCallAction.mergeConfirmProcess(toMergeWithTelephonySessionId);
            case 1:
              mergeId = _context11.v;
              this.logger.log("mergeCallsProcess", {
                telephonySessionId: telephonySessionId,
                toMergeWithTelephonySessionId: toMergeWithTelephonySessionId,
                mergeId: mergeId
              });
              if (!(!mergeId || !telephonySessionId)) {
                _context11.n = 2;
                break;
              }
              return _context11.a(2);
            case 2:
              return _context11.a(2, mergeCalls(telephonySessionId, mergeId));
          }
        }, _callee11, this);
      }));
      function _mergeCallsProcess(_x14, _x15) {
        return _mergeCallsProcess2.apply(this, arguments);
      }
      return _mergeCallsProcess;
    }()
  }, {
    key: "mergeCallsProcess",
    value: function () {
      var _mergeCallsProcess3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(telephonySessionId, toMergeWithTelephonySessionId) {
        var conferenceTelephonySessionId, info;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              _context12.n = 1;
              return this._mergeCallsProcess(telephonySessionId, toMergeWithTelephonySessionId);
            case 1:
              conferenceTelephonySessionId = _context12.v;
              if (conferenceTelephonySessionId) {
                _context12.n = 2;
                break;
              }
              return _context12.a(2);
            case 2:
              this.logger.log("mergeCallsProcess success, navigate", conferenceTelephonySessionId);
              info = this.getCallMetaInfo(conferenceTelephonySessionId);
              if (info) {
                this._navigateToActive(conferenceTelephonySessionId);
              }
            case 3:
              return _context12.a(2);
          }
        }, _callee12, this);
      }));
      function mergeCallsProcess(_x16, _x17) {
        return _mergeCallsProcess3.apply(this, arguments);
      }
      return mergeCallsProcess;
    }()
  }, {
    key: "hangUpProcess",
    value: function () {
      var _hangUpProcess = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(telephonySessionId) {
        var control, hangUp, isConferenceCall, hangupOnlyHost;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              control = this._activeCallControl;
              hangUp = this.processing(control.hangUp.bind(control), 'end');
              _context13.n = 1;
              return control.checkIfConferenceCall(telephonySessionId);
            case 1:
              isConferenceCall = _context13.v;
              if (!(isConferenceCall && control.enableLeaveConferenceAsHost)) {
                _context13.n = 3;
                break;
              }
              _context13.n = 2;
              return this._conferenceCallAction.leaveConfirmProcess();
            case 2:
              hangupOnlyHost = _context13.v;
              if (typeof hangupOnlyHost === 'boolean') {
                hangUp(telephonySessionId, hangupOnlyHost);
              }
              return _context13.a(2);
            case 3:
              _context13.n = 4;
              return hangUp(telephonySessionId);
            case 4:
              return _context13.a(2);
          }
        }, _callee13, this);
      }));
      function hangUpProcess(_x18) {
        return _hangUpProcess.apply(this, arguments);
      }
      return hangUpProcess;
    }()
  }, {
    key: "switchProcess",
    value: function () {
      var _switchProcess = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(telephonySessionId) {
        var control, switchFn, result, success;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              control = this._activeCallControl;
              switchFn = this.processing(control["switch"].bind(control));
              _context14.n = 1;
              return this._switchCallConfirm.confirmProcess(telephonySessionId);
            case 1:
              result = _context14.v;
              if (result) {
                _context14.n = 2;
                break;
              }
              return _context14.a(2);
            case 2:
              _context14.n = 3;
              return switchFn(telephonySessionId);
            case 3:
              success = _context14.v;
              if (!success) {
                _context14.n = 4;
                break;
              }
              _context14.n = 4;
              return this.openAndNavigate(telephonySessionId, {
                currentPath: 'controls',
                minimized: false
              }, {
                view: 'activeCall'
              });
            case 4:
              return _context14.a(2);
          }
        }, _callee14, this);
      }));
      function switchProcess(_x19) {
        return _switchProcess.apply(this, arguments);
      }
      return switchProcess;
    }()
  }, {
    key: "checkReachToMaxExistCalls",
    value: function () {
      var _checkReachToMaxExistCalls = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              if (!(this._callMonitor.allCalls.length >= _CallMonitor.MAX_EXIST_CALLS_COUNT)) {
                _context15.n = 1;
                break;
              }
              this._toast.danger({
                message: (0, _i18n.t)('maxExistCallsError', {
                  count: _CallMonitor.MAX_EXIST_CALLS_COUNT - 1
                }),
                allowDuplicates: false
              });
              return _context15.a(2, true);
            case 1:
              return _context15.a(2, false);
          }
        }, _callee15, this);
      }));
      function checkReachToMaxExistCalls() {
        return _checkReachToMaxExistCalls.apply(this, arguments);
      }
      return checkReachToMaxExistCalls;
    }()
  }, {
    key: "fromCallAllInfo",
    value: function fromCallAllInfo(telephonySessionId) {
      var _this9 = this;
      return (0, _nextCore.fromWatchValue)(this, function () {
        return _this9.getAllInfoByTelephonySessionId(telephonySessionId);
      });
    }
  }, {
    key: "leaveCallingRoute",
    value: (
    /**
     * when inside history page, leave history page to avoid user see two post call page(one is from history page, one is from post call page)
     */
    function () {
      var _leaveCallingRoute = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
        var result, previousPath, previousPathIndex, callLogDetailReg, insideHistory, _result$, _result$$slice, cachedHistory, validatePathIndex;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              _context16.n = 1;
              return this.getPreviousPathAndIndex();
            case 1:
              result = _context16.v;
              if (!(this._router.currentPath !== CALLING_ROUTE_PATH)) {
                _context16.n = 2;
                break;
              }
              this.logger.log('already leave calling page, do nothing');
              return _context16.a(2);
            case 2:
              previousPath = result[0];
              previousPathIndex = result[1];
              if (this.fromPostCall) {
                this.fromPostCall = false;

                // only keep one call log detail page in route history
                callLogDetailReg = new RegExp('^/history/.*');
                insideHistory = callLogDetailReg.test(previousPath);
                if (insideHistory) {
                  // when in history page, to avoid user see two post call page, go to previous page
                  this.logger.log('inside history, leave call history page');
                  previousPathIndex++;
                  cachedHistory = ((_result$ = result[2]
                  // clone the array to avoid modify the original array
                  ) === null || _result$ === void 0 ? void 0 : (_result$$slice = _result$.slice()) === null || _result$$slice === void 0 ? void 0 : _result$$slice.splice(previousPathIndex)) || [];
                  validatePathIndex = cachedHistory === null || cachedHistory === void 0 ? void 0 : cachedHistory.findIndex(function (x) {
                    var _x$location;
                    var pathname = x['pathname'] || ((_x$location = x['location']) === null || _x$location === void 0 ? void 0 : _x$location.pathname);
                    return (
                      // find the pathname that is not history page and not calling page
                      !callLogDetailReg.test(pathname) && pathname !== CALLING_ROUTE_PATH
                    );
                  });
                  previousPathIndex += validatePathIndex;
                  // when in history page, to avoid user see two post call page, go to previous page
                  this.logger.log('find the pathname that is not history page and not calling page', {
                    previousPathIndex: previousPathIndex,
                    validatePathIndex: validatePathIndex,
                    pathname: cachedHistory[validatePathIndex]
                  });
                } else {
                  // when in history page, to avoid user see two post call page, go to previous page
                  this.logger.log('not inside history, go to previous page', {
                    previousPathIndex: previousPathIndex
                  });
                }
              }
              _context16.n = 3;
              return this._router.go(-previousPathIndex);
            case 3:
              return _context16.a(2);
          }
        }, _callee16, this);
      }));
      function leaveCallingRoute() {
        return _leaveCallingRoute.apply(this, arguments);
      }
      return leaveCallingRoute;
    }())
  }, {
    key: "getPreviousPathAndIndex",
    value: function () {
      var _getPreviousPathAndIndex = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17() {
        var cachedHistory, nonCallingHistoryIndex, historyEntries, historyList, previousPathIndex, _t3;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              _context17.p = 0;
              if (!this._portManager.shared) {
                _context17.n = 2;
                break;
              }
              cachedHistory = this._router['cachedHistory'];
              nonCallingHistoryIndex = cachedHistory.findIndex(function (x) {
                return x.location.pathname !== CALLING_ROUTE_PATH;
              });
              if (!(nonCallingHistoryIndex !== -1)) {
                _context17.n = 1;
                break;
              }
              return _context17.a(2, [cachedHistory[nonCallingHistoryIndex].location.pathname, nonCallingHistoryIndex, cachedHistory]);
            case 1:
              _context17.n = 3;
              break;
            case 2:
              // in normal mode, get the path from history directly
              historyEntries = this._router['history']['entries']; // the historyEntries is in reverse order, so we need to reverse it
              historyList = _toConsumableArray(historyEntries).reverse();
              previousPathIndex = historyList.findIndex(function (x) {
                return x.pathname !== CALLING_ROUTE_PATH;
              });
              if (!(previousPathIndex !== -1)) {
                _context17.n = 3;
                break;
              }
              return _context17.a(2, [historyList[previousPathIndex].pathname, previousPathIndex, historyList]);
            case 3:
              _context17.n = 5;
              break;
            case 4:
              _context17.p = 4;
              _t3 = _context17.v;
              this.logger.warn('getPreviousPath failed', _t3);
            case 5:
              return _context17.a(2, ['', 0]);
          }
        }, _callee17, this, [[0, 4]]);
      }));
      function getPreviousPathAndIndex() {
        return _getPreviousPathAndIndex.apply(this, arguments);
      }
      return getPreviousPathAndIndex;
    }() // remember the history in server port
  }, {
    key: "pushCallActionHistory",
    value: function () {
      var _pushCallActionHistory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(telephonySessionId, actionType) {
        var info, action, call, events;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.n) {
            case 0:
              info = this.getAllInfoByTelephonySessionId(telephonySessionId);
              action = (0, _utils.mapActionTypeToCallActions)(actionType);
              call = info === null || info === void 0 ? void 0 : info.call;
              if ((call === null || call === void 0 ? void 0 : call.telephonySessionId) && action) {
                events = this.callActionEventsHistoryMap.get(call.telephonySessionId) || [];
                events.push(action);
                this.callActionEventsHistoryMap.set(call.telephonySessionId, events);
              }
            case 1:
              return _context18.a(2);
          }
        }, _callee18, this);
      }));
      function pushCallActionHistory(_x20, _x21) {
        return _pushCallActionHistory.apply(this, arguments);
      }
      return pushCallActionHistory;
    }()
  }, {
    key: "trackCallEventResult",
    value: function trackCallEventResult(call) {
      if (process.env.NODE_ENV !== 'production') {
        if (this._portManager.shared && !this._portManager.isServer) {
          console.warn('trackCallEventResult should not be called in client port');
        }
      }
      try {
        if (call && call.telephonySessionId) {
          var _call$callSelectionIn;
          var isInbound = (0, _callLogHelpers.isInbound)(call);
          var callFrom = call.from || {};
          var callTo = call.to || {};
          var extensionNumber = isInbound ? callFrom.extensionNumber : callTo.extensionNumber;
          var phoneNumber = isInbound ? callFrom.phoneNumber : callTo.phoneNumber;
          var matches = isInbound ? call.fromMatches : call.toMatches;
          var thirdPartyMatches = (_call$callSelectionIn = call.callSelectionInfo) === null || _call$callSelectionIn === void 0 ? void 0 : _call$callSelectionIn.selections;
          var callContactMatch = [];
          if (thirdPartyMatches && thirdPartyMatches.length > 0) {
            callContactMatch.push('3rd party contact matched');
          }
          if (matches && matches.length > 0) {
            callContactMatch.push('RC contact matched');
          }
          var callActions = this.callActionEventsHistoryMap.get(call.telephonySessionId) || [];
          // after track, clear the history
          this.callActionEventsHistoryMap["delete"](call.telephonySessionId);
          (0, _services.trackEvent)('Int_Phone_callEventResult', {
            callDirection: isInbound ? 'Inbound' : 'Outbound',
            callNumberType: !extensionNumber && !phoneNumber ? 'Anonymous' : extensionNumber ? 'Extension' : 'PSTN',
            callContactMatch: callContactMatch,
            callActions: callActions,
            callQueueCall: (0, _ActiveCallControl.isQueueCall)(call),
            // when call end the duration still not ready from server, so use the start time to calculate the duration
            callDuration: call.startTime ? Math.floor((Date.now() - call.startTime) / 1000) : -1
          });
        }
      } catch (error) {
        // track only add try catch to avoid the error throw effect the app process
      }
    }
  }, {
    key: "fullScreenCallActionOpened",
    get: function get() {
      var _this$displayCallAllI6;
      var displayMeta = (_this$displayCallAllI6 = this.displayCallAllInfo) === null || _this$displayCallAllI6 === void 0 ? void 0 : _this$displayCallAllI6.meta;
      var view = this._callViewState.view;
      var fullScreenOpened = view !== 'hidden' && (displayMeta && displayMeta.open && !displayMeta.minimized || view === 'callList' || view === 'addCall' || view === 'postCall');
      return fullScreenOpened;
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "latestOpenCallTelephonySessionId", [_nextCore.state, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setLatestOpenCallTelephonySessionId", [_nextCore.action, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "_setLatestOpenCallTelephonySessionId"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_callMetaInfoMap", [_nextCore.state, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "callMetaInfoMap", [_nextCore.computed, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "callMetaInfoMap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateCallMetaInfo", [_nextCore.action, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateCallMetaInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateCallMetaInfo", [_dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "updateCallMetaInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setAllIncomingCallsMeta", [_nextCore.action, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "_setAllIncomingCallsMeta"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_closeAllIncomingCalls", [_nextCore.action, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "_closeAllIncomingCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "closeAllIncomingCalls", [_dec19, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "closeAllIncomingCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "close", [_dec22, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "close"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_remove", [_nextCore.action, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "_remove"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "remove", [_dec27, _dec28, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "remove"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toggle", [_dec30, _dec31, _dec32], Object.getOwnPropertyDescriptor(_class2.prototype, "toggle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_openAndNavigate", [_nextCore.action, _dec33, _dec34], Object.getOwnPropertyDescriptor(_class2.prototype, "_openAndNavigate"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "openAndNavigate", [_dec35, _dec36, _dec37], Object.getOwnPropertyDescriptor(_class2.prototype, "openAndNavigate"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isAnyCallOpened", [_nextCore.computed, _dec38, _dec39], Object.getOwnPropertyDescriptor(_class2.prototype, "isAnyCallOpened"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "displayCallList", [_nextCore.computed, _dec40, _dec41], Object.getOwnPropertyDescriptor(_class2.prototype, "displayCallList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allCallInfoList", [_nextCore.computed, _dec42, _dec43], Object.getOwnPropertyDescriptor(_class2.prototype, "allCallInfoList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "preInsertCallInfoList", [_nextCore.computed, _dec44, _dec45], Object.getOwnPropertyDescriptor(_class2.prototype, "preInsertCallInfoList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ringingCallInfoList", [_nextCore.computed, _dec46, _dec47], Object.getOwnPropertyDescriptor(_class2.prototype, "ringingCallInfoList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "activeCallInfo", [_nextCore.computed, _dec48, _dec49], Object.getOwnPropertyDescriptor(_class2.prototype, "activeCallInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "\u0275_displayTelephonySessionId", [_nextCore.computed, _dec50, _dec51], Object.getOwnPropertyDescriptor(_class2.prototype, "\u0275_displayTelephonySessionId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "displayCallAllInfo", [_nextCore.computed, _dec52, _dec53], Object.getOwnPropertyDescriptor(_class2.prototype, "displayCallAllInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "displayFormCall", [_nextCore.computed, _dec54, _dec55], Object.getOwnPropertyDescriptor(_class2.prototype, "displayFormCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "latestOpenedCallInfo", [_nextCore.computed, _dec56, _dec57], Object.getOwnPropertyDescriptor(_class2.prototype, "latestOpenedCallInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "existRingingOpenCallMetaInfo", [_nextCore.computed, _dec58, _dec59], Object.getOwnPropertyDescriptor(_class2.prototype, "existRingingOpenCallMetaInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connectingCalls", [_nextCore.computed, _dec60, _dec61], Object.getOwnPropertyDescriptor(_class2.prototype, "connectingCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "announcementInfo", [_nextCore.computed, _dec62, _dec63], Object.getOwnPropertyDescriptor(_class2.prototype, "announcementInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onActiveActions", [_nextCore.computed, _dec64, _dec65], Object.getOwnPropertyDescriptor(_class2.prototype, "onActiveActions"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_smartNotes", [_dec66, _dec67], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_smartNoteClient", [_dec68, _dec69], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "_navigateToActive", [_nextCore.action, _dec70, _dec71], Object.getOwnPropertyDescriptor(_class2.prototype, "_navigateToActive"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "navigateToActive", [_dec72, _dec73, _dec74], Object.getOwnPropertyDescriptor(_class2.prototype, "navigateToActive"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "swap", [_dec75, _dec76, _dec77], Object.getOwnPropertyDescriptor(_class2.prototype, "swap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mergeCallsProcess", [_dec78, _dec79, _dec80], Object.getOwnPropertyDescriptor(_class2.prototype, "mergeCallsProcess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hangUpProcess", [_dec81, _dec82, _dec83], Object.getOwnPropertyDescriptor(_class2.prototype, "hangUpProcess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "switchProcess", [_dec84, _dec85, _dec86], Object.getOwnPropertyDescriptor(_class2.prototype, "switchProcess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkReachToMaxExistCalls", [_dec87, _dec88, _dec89], Object.getOwnPropertyDescriptor(_class2.prototype, "checkReachToMaxExistCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPreviousPathAndIndex", [_dec90, _dec91, _dec92], Object.getOwnPropertyDescriptor(_class2.prototype, "getPreviousPathAndIndex"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pushCallActionHistory", [_dec93, _dec94, _dec95], Object.getOwnPropertyDescriptor(_class2.prototype, "pushCallActionHistory"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fullScreenCallActionOpened", [_nextCore.computed, _dec96, _dec97], Object.getOwnPropertyDescriptor(_class2.prototype, "fullScreenCallActionOpened"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=CallAction.js.map
