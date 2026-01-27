"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallsListViewSpring = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
var _callDirections = require("@ringcentral-integration/commons/enums/callDirections");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _services3 = require("@ringcentral-integration/micro-message/src/app/services");
var _services4 = require("@ringcentral-integration/micro-setting/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _react = _interopRequireWildcard(require("react"));
var _hooks2 = require("../../hooks");
var _services5 = require("../../services");
var _CallViewState = require("../CallView/services/CallViewState");
var _DialerView = require("../DialerView");
var _CallsListPage = require("./CallsListPage");
var _i18n = _interopRequireWildcard(require("./i18n"));
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
var CallsListViewSpring = exports.CallsListViewSpring = (_dec = (0, _nextCore.injectable)({
  name: 'CallsListViewSpring'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 10);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 11);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 12);
}, _dec5 = function _dec5(target, key) {
  return (0, _nextCore.optional)('CallsListViewOptions')(target, undefined, 13);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _CallViewState.CallViewState === "undefined" ? Object : _CallViewState.CallViewState, typeof _services.ConnectivityManager === "undefined" ? Object : _services.ConnectivityManager, typeof _services5.CallHistory === "undefined" ? Object : _services5.CallHistory, typeof _services.RateLimiter === "undefined" ? Object : _services.RateLimiter, typeof _services5.Call === "undefined" ? Object : _services5.Call, typeof _services3.MessageStore === "undefined" ? Object : _services3.MessageStore, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services2.Toast === "undefined" ? Object : _services2.Toast, typeof _services4.IntegrationConfig === "undefined" ? Object : _services4.IntegrationConfig, typeof _DialerView.DialerView === "undefined" ? Object : _DialerView.DialerView, typeof _services3.ComposeText === "undefined" ? Object : _services3.ComposeText, typeof _services5.CallLogTasks === "undefined" ? Object : _services5.CallLogTasks, typeof CallsListViewSpringOptions === "undefined" ? Object : CallsListViewSpringOptions]), _dec8 = (0, _nextCore.dynamic)('SmartNotes'), _dec9 = Reflect.metadata("design:type", typeof SmartNotes === "undefined" ? Object : SmartNotes), _dec0 = (0, _nextCore.dynamic)('CallsListItemViewableManager'), _dec1 = Reflect.metadata("design:type", typeof CallsListItemViewableManager === "undefined" ? Object : CallsListItemViewableManager), _dec10 = (0, _nextCore.dynamic)('Theme'), _dec11 = Reflect.metadata("design:type", typeof Theme === "undefined" ? Object : Theme), _dec12 = Reflect.metadata("design:type", typeof ViewCallsFilterType === "undefined" ? Object : ViewCallsFilterType), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [typeof ViewCallsFilterType === "undefined" ? Object : ViewCallsFilterType]), _dec15 = (0, _nextCore.delegate)('server'), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", [typeof ViewCallsFilterType === "undefined" ? Object : ViewCallsFilterType]), _dec18 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", [typeof ViewCallsFilterType === "undefined" ? Object : ViewCallsFilterType, typeof StateSnapshot === "undefined" ? Object : StateSnapshot]), _dec21 = (0, _nextCore.delegate)('server'), _dec22 = Reflect.metadata("design:type", Function), _dec23 = Reflect.metadata("design:paramtypes", [typeof ViewCallsFilterType === "undefined" ? Object : ViewCallsFilterType, typeof StateSnapshot === "undefined" ? Object : StateSnapshot]), _dec24 = Reflect.metadata("design:type", Function), _dec25 = Reflect.metadata("design:paramtypes", []), _dec26 = Reflect.metadata("design:type", Function), _dec27 = Reflect.metadata("design:paramtypes", []), _dec28 = Reflect.metadata("design:type", Function), _dec29 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function CallsListViewSpring(_callViewState, _connectivityManager, _callHistory, _rateLimiter, _call, _messageStore, _router, _appFeatures, _toast, _integrationConfig, _dialerView, _composeText, _callLogTasks, _callsListViewOptions) {
    var _this;
    _classCallCheck(this, CallsListViewSpring);
    _this = _callSuper(this, CallsListViewSpring);
    _this._callViewState = _callViewState;
    _this._connectivityManager = _connectivityManager;
    _this._callHistory = _callHistory;
    _this._rateLimiter = _rateLimiter;
    _this._call = _call;
    _this._messageStore = _messageStore;
    _this._router = _router;
    _this._appFeatures = _appFeatures;
    _this._toast = _toast;
    _this._integrationConfig = _integrationConfig;
    _this._dialerView = _dialerView;
    _this._composeText = _composeText;
    _this._callLogTasks = _callLogTasks;
    _this._callsListViewOptions = _callsListViewOptions;
    _initializerDefineProperty(_this, "_smartNotes", _descriptor, _this);
    _initializerDefineProperty(_this, "_callsListItemViewableManager", _descriptor2, _this);
    _initializerDefineProperty(_this, "_theme", _descriptor3, _this);
    _this.useCallHistoryItemInfo = function (call, _ref) {
      var selectIndex = _ref.selectIndex,
        _ref$variant = _ref.variant,
        variant = _ref$variant === void 0 ? 'list' : _ref$variant,
        delaySavingState = _ref.delaySavingState,
        DelayComponent = _ref.DelayComponent;
      var inCallListView = variant === 'list';
      var info = (0, _hooks2.useContactRenderInfoFromCallHistory)(call, {
        phoneNumberDisplayMode: inCallListView ? 'phoneNumber' :
        // in call detail view, the phoneNumber already display in other place
        'unknown',
        startTimeMode: inCallListView ? 'withoutTime' : 'withTime',
        hideBlockedFromInfo: true,
        showLogInfo: _this.displayCRMLog,
        delaySavingState: delaySavingState,
        DelayComponent: DelayComponent
      });
      var _useConnector = (0, _nextCore.useConnector)(function () {
          return {
            disableLinks: _this.disableLinks,
            isOfflineMode: _this._connectivityManager.isOfflineMode,
            isWebphoneUnavailableMode: _this._connectivityManager.isWebphoneUnavailableMode,
            isWebphoneInitializing: _this._connectivityManager.isWebphoneInitializing,
            restricted: _this._rateLimiter.restricted,
            isIdle: Boolean(_this._call && _this._call.isIdle),
            hasInternalSMSPermission: _this._appFeatures.hasInternalSMSPermission,
            hasOutboundSMSPermission: _this._appFeatures.hasOutboundSMSPermission
            // isCDCEnabled: this._appFeatures.isCDCEnabled,
          };
        }),
        isOfflineMode = _useConnector.isOfflineMode,
        isWebphoneUnavailableMode = _useConnector.isWebphoneUnavailableMode,
        isWebphoneInitializing = _useConnector.isWebphoneInitializing,
        restricted = _useConnector.restricted,
        isIdle = _useConnector.isIdle,
        disableLinks = _useConnector.disableLinks,
        hasInternalSMSPermission = _useConnector.hasInternalSMSPermission,
        hasOutboundSMSPermission = _useConnector.hasOutboundSMSPermission;
      var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
        t = _useLocale.t;
      var renderInfo = info.renderInfo,
        formattedPhoneNumber = info.formattedPhoneNumber,
        showViewLogIcon = info.showViewLogIcon,
        isConferenceCall = info.isConferenceCall;
      var dialToPhoneNumber = renderInfo.dialToPhoneNumber,
        matchedContact = renderInfo.matchedContact,
        type = renderInfo.type;
      var actions = (0, _react.useMemo)(function () {
        var actions = [];
        if (showViewLogIcon) {
          var thirdPartyName = _this._integrationConfig.name;
          if (process.env.NODE_ENV !== 'production' && !thirdPartyName) {
            // eslint-disable-next-line no-console
            console.error('[CallsListView] showViewLogIcon be true, but thirdPartyLogAppName not be set, must set that');
          }
          actions.push({
            type: 'viewLog',
            label: t('viewInCrm', {
              thirdPartyLogAppName: thirdPartyName
            })
          });
        }

        // when that be conference call, not have any other actions
        if (isConferenceCall) return actions;
        if (dialToPhoneNumber) {
          actions.push({
            type: 'call',
            disabled: isOfflineMode || isWebphoneUnavailableMode || isWebphoneInitializing || restricted || !isIdle || disableLinks
          });
          if (_this._appFeatures.hasComposeTextPermission) {
            actions.push({
              type: 'text',
              disabled: disableLinks || (type === 'extensionNumber' ? !hasInternalSMSPermission : !hasOutboundSMSPermission)
            });
          }
        }
        actions.push.apply(actions, _toConsumableArray(_this._integrationConfig.getActionButtons({
          dialToPhoneNumber: dialToPhoneNumber,
          matchedContact: matchedContact,
          disabled: disableLinks
        })));

        // if (markAble) {
        //   actions.push({
        //     type: unreadCounts === 0 ? 'mark' : 'unmark',
        //     disabled: disableLinks,
        //   });
        // }

        if (variant === 'list' && formattedPhoneNumber) {
          actions.push({
            type: 'copyNumber'
          });
        }

        // TODO: our old version still not support delete call history
        // actions.push({
        //   type: 'delete',
        //   disabled: disableLinks,
        // });

        return actions;
      }, [dialToPhoneNumber, disableLinks, formattedPhoneNumber, hasInternalSMSPermission, hasOutboundSMSPermission, isConferenceCall, isIdle, isOfflineMode, isWebphoneInitializing, isWebphoneUnavailableMode, matchedContact, restricted, showViewLogIcon, t, type, variant]);
      return {
        info: info,
        actions: actions
      };
    };
    _this.useActionsHandler = function (call, info, location) {
      // TODO: select contact auto log when autoLog be enable

      var telephonySessionId = call.telephonySessionId;
      return /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(actionType) {
          var _this$_integrationCon, _this$_integrationCon2, _this$_integrationCon3, _this$_integrationCon4;
          var renderInfo, signalSourceInfo, matchedContact, callLogInfo, _this$_theme, actionInfo, _actionInfo, _this$_composeText, result, _this$_callLogTasks, _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _this.logger.log('exec actionType', actionType, {
                  telephonySessionId: telephonySessionId
                });
                renderInfo = info.renderInfo, signalSourceInfo = info.signalSourceInfo;
                matchedContact = renderInfo.matchedContact;
                _t = actionType;
                _context.n = _t === 'viewDetail' ? 1 : _t === 'addEntity' ? 4 : _t === 'viewEntity' ? 5 : _t === 'call' ? 6 : _t === 'text' ? 7 : _t === 'copyNumber' ? 8 : _t === 'viewLog' ? 9 : 10;
                break;
              case 1:
                callLogInfo = _this._callHistory.getHistoryByTelephonySessionId(telephonySessionId);
                if (!callLogInfo) {
                  _context.n = 3;
                  break;
                }
                _context.n = 2;
                return (0, _views.slideInViewTransition)(function () {
                  return _this._router.push("/history/".concat(telephonySessionId));
                }, (_this$_theme = _this._theme) === null || _this$_theme === void 0 ? void 0 : _this$_theme.reducedMotion);
              case 2:
                return _context.a(3, 11);
              case 3:
                _this.logger.log("disableLinks: ".concat(_this.disableLinks, ", ").concat(telephonySessionId, " not found"));
                return _context.a(3, 11);
              case 4:
                (_this$_integrationCon = (_this$_integrationCon2 = _this._integrationConfig).onCreateEntity) === null || _this$_integrationCon === void 0 ? void 0 : _this$_integrationCon.call(_this$_integrationCon2, signalSourceInfo);
                return _context.a(3, 11);
              case 5:
                (_this$_integrationCon3 = (_this$_integrationCon4 = _this._integrationConfig).onViewEntity) === null || _this$_integrationCon3 === void 0 ? void 0 : _this$_integrationCon3.call(_this$_integrationCon4, matchedContact, {
                  isMaybeMatch: !!renderInfo.metadata.showMaybe,
                  call: call
                });
                return _context.a(3, 11);
              case 6:
                actionInfo = info.getActionInfo();
                if (actionInfo && _this._dialerView) {
                  _this._dialerView.trackCallingEvent(location);
                  _this._dialerView.call({
                    recipient: actionInfo
                  });
                  _this._messageStore.onClickToCall({
                    // for track conversation.type
                    fromType: 'CallHistory'
                  });
                  _this._router.push('/dialer', _defineProperty({}, _views.SyncTabId.DIALPAD, 'keypad'));
                } else if (process.env.NODE_ENV !== 'production') {
                  // eslint-disable-next-line no-console
                  console.error('[CallsListView], can\'t handle "call" action', {
                    renderInfo: renderInfo,
                    matchedContact: matchedContact,
                    conversation: call
                  });
                }
                return _context.a(3, 11);
              case 7:
                _actionInfo = info.getActionInfo();
                if (_actionInfo) {
                  (_this$_composeText = _this._composeText) === null || _this$_composeText === void 0 ? void 0 : _this$_composeText.addToNumber(_actionInfo);
                  _this._router.push('/composeText');
                  // for track
                  _this._messageStore.onClickToSMS();
                } else if (process.env.NODE_ENV !== 'production') {
                  // eslint-disable-next-line no-console
                  console.error('[CallsListView], can\'t handle "call" action', {
                    renderInfo: renderInfo,
                    matchedContact: matchedContact,
                    conversation: call
                  });
                }
                return _context.a(3, 11);
              case 8:
                result = info.copyNumber();
                if (result) {
                  _this._toast.success({
                    message: result,
                    allowDuplicates: false
                  });
                }
                return _context.a(3, 11);
              case 9:
                (_this$_callLogTasks = _this._callLogTasks) === null || _this$_callLogTasks === void 0 ? void 0 : _this$_callLogTasks.openTask(call);
                return _context.a(3, 11);
              case 10:
                _this.logger.warn("CallsListView, can't handle \"".concat(actionType, "\" action"));
              case 11:
                return _context.a(2);
            }
          }, _callee);
        }));
        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }();
    };
    _initializerDefineProperty(_this, "viewCallsFilter", _descriptor4, _this);
    _initializerDefineProperty(_this, "lastPositions", _descriptor5, _this);
    return _this;
  }
  _inherits(CallsListViewSpring, _RcViewModule);
  return _createClass(CallsListViewSpring, [{
    key: "disableLinks",
    get:
    // @portal
    // private confirmDeleteModal = this._modalView.create<{
    //   call: HistoryCall;
    // }>({
    //   props: ({ call }) => {
    //     return {
    //       variant: 'confirm',
    //       loadingMode: 'button',
    //       header: t('deleteCallHistory'),
    //       content: t('sureToDeleteCallHistory'),
    //       confirmButtonText: t('delete'),
    //       // avoid the action menu be focus back, because that already be hidden
    //       disableBackdropClick: false,
    //       confirmButtonProps: dangerButtonProps,
    //       onConfirm: () => {
    //         const callId = call.id;
    //         if (!callId) return;
    //         // this._callLogger;
    //         // TODO: delete call log
    //       },
    //       ['data-sign']: 'deleteModal',
    //     };
    //   },
    // });

    function get() {
      return this._connectivityManager.isOfflineMode || this._connectivityManager.isVoipOnlyMode || this._rateLimiter.restricted;
    }
  }, {
    key: "_setViewCallsFilter",
    value: function _setViewCallsFilter(val) {
      this.viewCallsFilter = val;
    }
  }, {
    key: "setViewCallsFilter",
    value: function () {
      var _setViewCallsFilter2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(val) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this._setViewCallsFilter(val);
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function setViewCallsFilter(_x2) {
        return _setViewCallsFilter2.apply(this, arguments);
      }
      return setViewCallsFilter;
    }()
  }, {
    key: "_setLastPosition",
    value: function _setLastPosition(type, val) {
      var index = type || 'undefined';
      this.lastPositions[index] = val;
    }
  }, {
    key: "setLastPosition",
    value: function () {
      var _setLastPosition2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(type, val) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              this._setLastPosition(type, val);
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function setLastPosition(_x3, _x4) {
        return _setLastPosition2.apply(this, arguments);
      }
      return setLastPosition;
    }()
  }, {
    key: "viewCalls",
    get: function get() {
      switch (this.viewCallsFilter) {
        case 'missed':
          {
            return this.latestCalls.filter(function (call) {
              return call.result === 'Missed' || call.result === 'Answered Elsewhere';
            });
          }
        case 'outgoing':
          {
            return this.latestCalls.filter(function (call) {
              return call.direction === _callDirections.callDirection.outbound;
            });
          }
        case 'incoming':
          {
            return this.latestCalls.filter(function (call) {
              return call.direction === _callDirections.callDirection.inbound;
            });
          }
        case 'logged':
          {
            return this.latestCalls.filter(function (call) {
              return call.isLogged;
            });
          }
        case 'unlogged':
          {
            return this.latestCalls.filter(function (call) {
              return !call.isLogged;
            });
          }
        case 'all':
        default:
          return this.latestCalls;
      }
    }
  }, {
    key: "latestCalls",
    get: function get() {
      var _this2 = this;
      if (!this._callLogTasks && !this._smartNotes) return this._callHistory.latestCalls;
      return this._callHistory.latestCalls.map(function (call) {
        return _objectSpread(_objectSpread({}, call), _this2._callViewState.getExtraLogData(call.sessionId, call.telephonySessionId));
      });
    }
  }, {
    key: "displayCRMLog",
    get: function get() {
      var _this$_callsListViewO, _this$_callsListViewO2;
      return (_this$_callsListViewO = (_this$_callsListViewO2 = this._callsListViewOptions) === null || _this$_callsListViewO2 === void 0 ? void 0 : _this$_callsListViewO2.displayCRMLog) !== null && _this$_callsListViewO !== void 0 ? _this$_callsListViewO : false;
    }
  }, {
    key: "viewCallsFilterSelections",
    get: function get() {
      var crmAdditionalFilters = this.displayCRMLog ? [{
        label: (0, _i18n.t)('callsFilterLogged'),
        value: 'logged'
      }, {
        label: (0, _i18n.t)('callsFilterUnLogged'),
        value: 'unlogged'
      }] : [];
      return [{
        label: (0, _i18n.t)('callsFilterAll'),
        value: 'all'
      }, {
        label: (0, _i18n.t)('callsFilterMissed'),
        value: 'missed'
      }, {
        label: (0, _i18n.t)('callsFilterOutgoing'),
        value: 'outgoing'
      }, {
        label: (0, _i18n.t)('callsFilterIncoming'),
        value: 'incoming'
      }].concat(crmAdditionalFilters);
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_) {
      var index = this.viewCallsFilter || 'undefined';
      return {
        calls: this.viewCalls,
        lastPosition: this.lastPositions[index],
        searchInput: this._callHistory.searchInput,
        viewCallsFilter: this.viewCallsFilter,
        viewCallsFilterSelections: this.viewCallsFilterSelections
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_) {
      var _this3 = this,
        _this$_callsListItemV;
      return {
        setLastPosition: function setLastPosition(type, position) {
          _this3.setLastPosition(type, position);
        },
        onSearchInputChange: function onSearchInputChange(value) {
          _this3._callHistory.updateSearchInput(value);
          _this3._callHistory.debouncedSearch();
        },
        setViewCallsFilter: function setViewCallsFilter(value) {
          return _this3.setViewCallsFilter(value);
        },
        useCallHistoryItemInfo: this.useCallHistoryItemInfo,
        useActionsHandler: this.useActionsHandler,
        onFocus: function onFocus() {
          _this3._callHistory.updateLastCheckTimeStamp();
        },
        useItemRender: (_this$_callsListItemV = this._callsListItemViewableManager) === null || _this$_callsListItemV === void 0 ? void 0 : _this$_callsListItemV.useItemRender
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this4 = this,
        _this$_callsListViewO3;
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this4.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      var Component = ((_this$_callsListViewO3 = this._callsListViewOptions) === null || _this$_callsListViewO3 === void 0 ? void 0 : _this$_callsListViewO3.component) || _CallsListPage.CallsListPage;
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_smartNotes", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_callsListItemViewableManager", [_dec0, _dec1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_theme", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "viewCallsFilter", [_nextCore.state, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'all';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setViewCallsFilter", [_nextCore.action, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "_setViewCallsFilter"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setViewCallsFilter", [_dec15, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "setViewCallsFilter"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "lastPositions", [_nextCore.state, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setLastPosition", [_nextCore.action, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "_setLastPosition"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLastPosition", [_dec21, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "setLastPosition"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "viewCalls", [_nextCore.computed, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "viewCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "latestCalls", [_nextCore.computed, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "latestCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "viewCallsFilterSelections", [_nextCore.computed, _dec28, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "viewCallsFilterSelections"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class) || _class); // export type OnCallsListActionsType = ReturnType<UseCallsListActions>;
//# sourceMappingURL=CallsList.view.js.map
