"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
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
exports.GenericMeetingView = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _nextCore = require("@ringcentral-integration/next-core");
var _GenericMeetingPanel = require("@ringcentral-integration/widgets/components/GenericMeetingPanel");
var _GenericMeetingScheduleButton = require("@ringcentral-integration/widgets/components/GenericMeetingScheduleButton");
var _ramda = require("ramda");
var _react = _interopRequireWildcard(require("react"));
var _services3 = require("../../services");
var _constants = require("../../services/RcVideo/constants");
var _i18n = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var GenericMeetingView = exports.GenericMeetingView = (_dec = (0, _nextCore.injectable)({
  name: 'GenericMeetingView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('GenericMeetingViewOptions')(target, undefined, 7);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _services3.GenericMeeting === "undefined" ? Object : _services3.GenericMeeting, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services2.Brand === "undefined" ? Object : _services2.Brand, typeof _services2.Locale === "undefined" ? Object : _services2.Locale, typeof _views.ModalView === "undefined" ? Object : _views.ModalView, typeof _services.RateLimiter === "undefined" ? Object : _services.RateLimiter, typeof _services.ConnectivityMonitor === "undefined" ? Object : _services.ConnectivityMonitor, typeof GenericMeetingViewOptions === "undefined" ? Object : GenericMeetingViewOptions]), _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [Boolean]), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [typeof ScheduleButtonProps === "undefined" ? Object : ScheduleButtonProps]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function GenericMeetingView(_genericMeeting, _appFeatures, _brand, _locale, _modalView, _rateLimiter, _connectivityMonitor, _genericMeetingViewOptions) {
    var _this;
    _classCallCheck(this, GenericMeetingView);
    _this = _callSuper(this, GenericMeetingView);
    _this._genericMeeting = _genericMeeting;
    _this._appFeatures = _appFeatures;
    _this._brand = _brand;
    _this._locale = _locale;
    _this._modalView = _modalView;
    _this._rateLimiter = _rateLimiter;
    _this._connectivityMonitor = _connectivityMonitor;
    _this._genericMeetingViewOptions = _genericMeetingViewOptions;
    _initializerDefineProperty(_this, "confirmModal", _descriptor, _this);
    _initializerDefineProperty(_this, "isPmiChangeConfirmed", _descriptor2, _this);
    return _this;
  }
  _inherits(GenericMeetingView, _RcViewModule);
  return _createClass(GenericMeetingView, [{
    key: "setIsPmiChangeConfirmed",
    value: function setIsPmiChangeConfirmed(status) {
      this.isPmiChangeConfirmed = status;
    }
  }, {
    key: "getRcvConfig",
    value: function getRcvConfig(_ref) {
      var _meeting$settingLock2, _meeting$settingLock3, _meeting$settingLock4, _meeting$settingLock5, _meeting$settingLock6, _meeting$settingLock7, _meeting$settingLock8;
      var _ref$disabled = _ref.disabled,
        disabled = _ref$disabled === void 0 ? false : _ref$disabled,
        _ref$showRcvAdminLock = _ref.showRcvAdminLock,
        showRcvAdminLock = _ref$showRcvAdminLock === void 0 ? false : _ref$showRcvAdminLock,
        _ref$configDisabled = _ref.configDisabled,
        configDisabled = _ref$configDisabled === void 0 ? false : _ref$configDisabled,
        _ref$showPmiConfirm = _ref.showPmiConfirm,
        showPmiConfirm = _ref$showPmiConfirm === void 0 ? false : _ref$showPmiConfirm;
      var isDelegator = false;
      var meeting = this.meeting;
      var delegators = this.delegators;
      var user = (0, _ramda.find)(function (item) {
        return item.extensionId === meeting.extensionId;
      }, delegators);
      isDelegator = !!(user && !user.isLoginUser);
      var enableWaitingRoom = this._genericMeeting.ready && this._genericMeeting.enableWaitingRoom;
      var showE2EE = this._genericMeeting.ready && this._genericMeeting.enableE2EE;
      var _meeting$settingLock = meeting.settingLock,
        settingLock = _meeting$settingLock === void 0 ? {} : _meeting$settingLock,
        e2ee = meeting.e2ee,
        isOnlyCoworkersJoin = meeting.isOnlyCoworkersJoin;
      var isPmiConfigDisabled = configDisabled || showPmiConfirm && this.meeting.usePersonalMeetingId && !this.isPmiChangeConfirmed;

      // when e2ee is on, waiting room&auth can join&require password&jbh will be disabled and turn on.
      var isE2eeRelatedOptionsDisabled = showE2EE && e2ee;
      var isE2EEDisabled = showE2EE && (this._appFeatures.ready && !this._appFeatures.hasVideoE2EE ||
      // TODO: fix type
      // @ts-ignore
      settingLock.e2ee || (0, _ramda.any)(function (key) {
        return (
          // TODO: fix type
          // @ts-ignore
          settingLock[key] && meeting[key] === _constants.DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH[key]
        );
      })(Object.keys(_constants.DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH)));
      var authUserTypeValue = isOnlyCoworkersJoin ? _constants.AUTH_USER_TYPE.SIGNED_IN_CO_WORKERS : _constants.AUTH_USER_TYPE.SIGNED_IN_USERS;
      return {
        meeting: meeting,
        showE2EE: showE2EE,
        delegators: delegators,
        isE2EEDisabled: isE2EEDisabled,
        authUserTypeValue: authUserTypeValue,
        isE2eeRelatedOptionsDisabled: isE2eeRelatedOptionsDisabled,
        showWaitingRoom: enableWaitingRoom,
        isPersonalMeetingDisabled: showE2EE && meeting.e2ee,
        joinBeforeHostLabel: isDelegator ? _constants.JBH_LABEL.JOIN_AFTER_HOST : _constants.JBH_LABEL.JOIN_AFTER_ME,
        isRequirePasswordDisabled: isE2eeRelatedOptionsDisabled || isPmiConfigDisabled || configDisabled || showRcvAdminLock && ((_meeting$settingLock2 = meeting.settingLock) === null || _meeting$settingLock2 === void 0 ? void 0 : _meeting$settingLock2.isMeetingSecret),
        isJoinBeforeHostDisabled: configDisabled || isPmiConfigDisabled || showRcvAdminLock && ((_meeting$settingLock3 = meeting.settingLock) === null || _meeting$settingLock3 === void 0 ? void 0 : _meeting$settingLock3.allowJoinBeforeHost) || enableWaitingRoom && meeting.waitingRoomMode === _constants.RCV_WAITING_ROOM_MODE.all,
        isMuteAudioDisabled: configDisabled || isPmiConfigDisabled,
        isTurnOffCameraDisabled: configDisabled || isPmiConfigDisabled,
        isAllowScreenSharingDisabled: configDisabled || isPmiConfigDisabled || showRcvAdminLock && ((_meeting$settingLock4 = meeting.settingLock) === null || _meeting$settingLock4 === void 0 ? void 0 : _meeting$settingLock4.allowScreenSharing),
        isWaitingRoomDisabled: isE2eeRelatedOptionsDisabled || isPmiConfigDisabled || configDisabled || showRcvAdminLock && ((_meeting$settingLock5 = meeting.settingLock) === null || _meeting$settingLock5 === void 0 ? void 0 : _meeting$settingLock5.waitingRoomMode),
        isWaitingRoomTypeDisabled: disabled || configDisabled || isPmiConfigDisabled || showRcvAdminLock && ((_meeting$settingLock6 = meeting.settingLock) === null || _meeting$settingLock6 === void 0 ? void 0 : _meeting$settingLock6.waitingRoomMode),
        isWaitingRoomNotCoworkerDisabled: meeting.isOnlyCoworkersJoin,
        isWaitingRoomGuestDisabled: meeting.isOnlyAuthUserJoin || showE2EE && meeting.e2ee,
        isWaitingRoomAllDisabled: false,
        isAuthenticatedCanJoinDisabled: isE2eeRelatedOptionsDisabled || configDisabled || isPmiConfigDisabled || showRcvAdminLock && ((_meeting$settingLock7 = meeting.settingLock) === null || _meeting$settingLock7 === void 0 ? void 0 : _meeting$settingLock7.isOnlyAuthUserJoin),
        isAuthUserTypeDisabled: disabled || configDisabled || isPmiConfigDisabled || showRcvAdminLock && ((_meeting$settingLock8 = meeting.settingLock) === null || _meeting$settingLock8 === void 0 ? void 0 : _meeting$settingLock8.isOnlyCoworkersJoin),
        isSignedInUsersDisabled: false,
        isSignedInCoWorkersDisabled: false
      };
    }
  }, {
    key: "getRcmConfig",
    value: function getRcmConfig(_ref2) {
      var _this$meeting;
      var showRecurringMeeting = _ref2.showRecurringMeeting;
      return {
        delegators: this.delegators,
        showRecurringMeeting: !((_this$meeting = this.meeting) === null || _this$meeting === void 0 ? void 0 : _this$meeting.usePersonalMeetingId) && showRecurringMeeting
      };
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(props) {
      var _this$meeting2, _this$_connectivityMo, _this$_rateLimiter;
      var disabled = props.disabled,
        showTopic = props.showTopic,
        showWhen = props.showWhen,
        showDuration = props.showDuration,
        labelPlacement = props.labelPlacement,
        scheduleButton = props.scheduleButton,
        datePickerSize = props.datePickerSize,
        timePickerSize = props.timePickerSize,
        recurringMeetingPosition = props.recurringMeetingPosition,
        _props$openNewWindow = props.openNewWindow,
        openNewWindow = _props$openNewWindow === void 0 ? false : _props$openNewWindow,
        _props$showRcvAdminLo = props.showRcvAdminLock,
        showRcvAdminLock = _props$showRcvAdminLo === void 0 ? false : _props$showRcvAdminLo,
        _props$showPmiConfirm = props.showPmiConfirm,
        showPmiConfirm = _props$showPmiConfirm === void 0 ? false : _props$showPmiConfirm,
        _props$configDisabled = props.configDisabled,
        configDisabled = _props$configDisabled === void 0 ? false : _props$configDisabled,
        _props$showRemoveMeet = props.showRemoveMeetingWarning,
        showRemoveMeetingWarning = _props$showRemoveMeet === void 0 ? false : _props$showRemoveMeet;
      var isRCM = this._genericMeeting.isRCM;
      var isRCV = this._genericMeeting.isRCV;
      var isAllOptionDisabled = !!(disabled || !((_this$meeting2 = this.meeting) === null || _this$meeting2 === void 0 ? void 0 : _this$meeting2.isMeetingPasswordValid) || this._genericMeeting.ready && this._genericMeeting.isScheduling || !((_this$_connectivityMo = this._connectivityMonitor) === null || _this$_connectivityMo === void 0 ? void 0 : _this$_connectivityMo.connectivity) || ((_this$_rateLimiter = this._rateLimiter) === null || _this$_rateLimiter === void 0 ? void 0 : _this$_rateLimiter.restricted));
      var config = isRCM ? this.getRcmConfig(props) : this.getRcvConfig(props);
      return _objectSpread({
        isRCV: isRCV,
        isRCM: isRCM,
        showWhen: showWhen,
        showTopic: showTopic,
        showDuration: showDuration,
        openNewWindow: openNewWindow,
        scheduleButton: scheduleButton,
        labelPlacement: labelPlacement,
        datePickerSize: datePickerSize,
        timePickerSize: timePickerSize,
        showRcvAdminLock: showRcvAdminLock,
        showPmiConfirm: showPmiConfirm,
        showRemoveMeetingWarning: showRemoveMeetingWarning,
        brandConfig: this._brand.brandConfig,
        recurringMeetingPosition: recurringMeetingPosition,
        meeting: this.meeting,
        currentLocale: this._locale.currentLocale,
        disabled: isAllOptionDisabled,
        configDisabled: configDisabled,
        showScheduleOnBehalf: !!(this.delegators && this.delegators.length > 0),
        showSaveAsDefault: this._genericMeeting.ready && this._genericMeeting.showSaveAsDefault,
        // Need to add this back when we back to this ticket
        // https://jira_domain/browse/RCINT-15031
        // disableSaveAsDefault:
        //   this._genericMeeting.ready &&
        //   !this._genericMeeting.isPreferencesChanged,
        disableSaveAsDefault: false,
        enableServiceWebSettings: this._genericMeeting.ready && this._genericMeeting.enableServiceWebSettings,
        enablePersonalMeeting: this._genericMeeting.ready && this._genericMeeting.enablePersonalMeeting,
        // TODO: fix type
        // @ts-ignore
        personalMeetingId: this._genericMeeting.ready && this._genericMeeting.personalMeetingId,
        showSpinner: !!(!this._locale.ready || !this._genericMeeting.ready || !isRCM && !isRCV || !this._genericMeeting.meeting || this._connectivityMonitor && !this._connectivityMonitor.ready || this._rateLimiter && !this._rateLimiter.ready),
        showSpinnerInConfigPanel: this._genericMeeting.isUpdating,
        hasSettingsChanged: this._genericMeeting.hasSettingsChanged,
        defaultSetting: this._genericMeeting.defaultSetting,
        defaultTopic: this._genericMeeting.ready ? this._genericMeeting.defaultTopic : '',
        isPmiChangeConfirmed: this.isPmiChangeConfirmed
      }, config);
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this2 = this;
      return {
        switchUsePersonalMeetingId: function switchUsePersonalMeetingId(usePersonalMeetingId) {
          _this2._genericMeeting.switchUsePersonalMeetingId(usePersonalMeetingId);
          // reset pmi change confirm popup
          if (usePersonalMeetingId) {
            _this2.setIsPmiChangeConfirmed(false);
          }
          _this2._genericMeeting.updateHasSettingsChanged(true);
        },
        updateScheduleFor: function updateScheduleFor(userExtensionId) {
          return _this2._genericMeeting.updateScheduleFor(userExtensionId);
        },
        // TODO: any is reserved for RcM
        updateMeetingSettings: function updateMeetingSettings(value) {
          _this2._genericMeeting.updateHasSettingsChanged(true);
          _this2._genericMeeting.updateMeetingSettings(value);
        },
        validatePasswordSettings: function validatePasswordSettings(password, isSecret) {
          return _this2._genericMeeting.validatePasswordSettings(password, isSecret);
        },
        schedule: function () {
          var _schedule = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(meetingInfo) {
            var result;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  _context.n = 1;
                  return _this2._genericMeeting.schedule(meetingInfo, {});
                case 1:
                  result = _context.v;
                  return _context.a(2, result);
              }
            }, _callee);
          }));
          function schedule(_x) {
            return _schedule.apply(this, arguments);
          }
          return schedule;
        }(),
        // TODO: refactor this without dependency on RcVideo view
        init: function init() {
          return _this2._genericMeeting.init();
        },
        // TODO: Moving to RcVideo updateMeetingSettings would be better
        e2eeInteractFunc: function e2eeInteractFunc(e2eeValue) {
          var _this2$_genericMeetin;
          if (!e2eeValue) {
            _this2._genericMeeting.updateMeetingSettings({
              e2ee: e2eeValue
            });
            // when user turn on e2ee option in pmi meeting, should switch to non-pmi meeting
          } else if ((_this2$_genericMeetin = _this2._genericMeeting.meeting) === null || _this2$_genericMeetin === void 0 ? void 0 : _this2$_genericMeetin.usePersonalMeetingId) {
            _this2._genericMeeting.switchUsePersonalMeetingId(false);
            _this2._genericMeeting.turnOnE2ee();
          } else {
            _this2._genericMeeting.turnOnE2ee();
          }
          _this2._genericMeeting.updateHasSettingsChanged(true);
        },
        onPmiChangeClick: function onPmiChangeClick() {
          _this2._modalView.open(_this2.confirmModal);
        }
      };
    }
  }, {
    key: "meeting",
    get: function get() {
      return this._genericMeeting.ready && this._genericMeeting.meeting || {};
    }
  }, {
    key: "delegators",
    get: function get() {
      return this._genericMeeting.ready && this._genericMeeting.delegators || [];
    }
  }, {
    key: "isSmallScreen",
    get: function get() {
      return document.body.clientWidth < 290;
    }
  }, {
    key: "DefaultScheduleButton",
    value: function DefaultScheduleButton(props) {
      return /*#__PURE__*/_react["default"].createElement(_GenericMeetingScheduleButton.GenericMeetingScheduleButton, _extends({}, props, {
        isRCV: this._genericMeeting.isRCV,
        isRCM: this._genericMeeting.isRCM
      }));
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this3 = this,
        _this$_genericMeeting;
      var _useRef = (0, _react.useRef)(this.getUIFunctions()),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this3.getUIProps(props);
        return _objectSpread(_objectSpread(_objectSpread({}, props), uiProps), {}, {
          scheduleButton: props.scheduleButton || _this3.DefaultScheduleButton
        });
      });
      var Component = ((_this$_genericMeeting = this._genericMeetingViewOptions) === null || _this$_genericMeeting === void 0 ? void 0 : _this$_genericMeeting.component) || _GenericMeetingPanel.GenericMeetingPanel;
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "confirmModal", [_nextCore.portal], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;
    return this._modalView.create({
      props: function props() {
        return {
          variant: 'confirm',
          maxWidth: 'xs',
          childrenSize: _this4.isSmallScreen ? 'small' : 'medium',
          title: (0, _i18n.t)('pmiChangeConfirmTitle'),
          content: (0, _i18n.t)('pmiChangeConfirmContext'),
          confirmButtonText: (0, _i18n.t)('pmiChangeConfirmed'),
          cancelButtonText: (0, _i18n.t)('pmiChangeCancel'),
          onConfirm: function onConfirm() {
            _this4.setIsPmiChangeConfirmed(true);
          }
        };
      }
    });
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isPmiChangeConfirmed", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setIsPmiChangeConfirmed", [_nextCore.action, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsPmiChangeConfirmed"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "DefaultScheduleButton", [_nextCore.autobind, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "DefaultScheduleButton"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=GenericMeeting.view.js.map
