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
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericMeetingUI = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.promise.finally.js");
var _di = require("@ringcentral-integration/commons/lib/di");
var _RcVideo = require("@ringcentral-integration/commons/modules/RcVideo");
var _core = require("@ringcentral-integration/core");
var _ramda = require("ramda");
var _react = _interopRequireDefault(require("react"));
var _ChangePasswordPopup = require("../../components/SchedulerMeetingPanel/ChangePasswordPopup");
var _i18n = _interopRequireDefault(require("./i18n"));
var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var PasswordChangeRendererID = 'GenericMeetingUI.PasswordChangeRenderer';
var GenericMeetingUI = exports.GenericMeetingUI = (_dec = (0, _di.Module)({
  name: 'GenericMeetingUI',
  deps: ['GenericMeeting', 'AppFeatures', 'Brand', 'Locale', 'ModalUI', 'RateLimiter', 'ConnectivityMonitor']
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.genericMeeting.isRCM];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that._deps.genericMeeting.isRCV];
}), _dec4 = (0, _core.computed)(function (_ref) {
  var _ref$_deps = _ref._deps,
    genericMeeting = _ref$_deps.genericMeeting,
    rateLimiter = _ref$_deps.rateLimiter,
    connectivityMonitor = _ref$_deps.connectivityMonitor;
  return [genericMeeting.ready, genericMeeting.isScheduling, connectivityMonitor.ready, connectivityMonitor.connectivity, rateLimiter.ready, rateLimiter.throttling];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  function GenericMeetingUI(deps) {
    var _this;
    _classCallCheck(this, GenericMeetingUI);
    _this = _callSuper(this, GenericMeetingUI, [{
      deps: deps
    }]);
    _this._changePasswordPopupId = null;
    _initializerDefineProperty(_this, "isPmiChangeConfirmed", _descriptor, _this);
    _this._deps.modalUI.registerRenderer(PasswordChangeRendererID, function (props) {
      return /*#__PURE__*/_react["default"].createElement(_ChangePasswordPopup.ChangePasswordPopup, props);
    });
    return _this;
  }
  _inherits(GenericMeetingUI, _RcUIModuleV);
  return _createClass(GenericMeetingUI, [{
    key: "setIsPmiChangeConfirmed",
    value: function setIsPmiChangeConfirmed(status) {
      this.isPmiChangeConfirmed = status;
    }
  }, {
    key: "showPasswordChangeModal",
    value: function showPasswordChangeModal() {
      var _this2 = this;
      if (this._changePasswordPopupId) {
        return;
      }
      var currentLocale = this._deps.locale.currentLocale;
      this._changePasswordPopupId = this._deps.modalUI.info({
        fullWidth: true,
        title: _i18n["default"].getString('updatePassword', currentLocale),
        content: PasswordChangeRendererID,
        childrenSize: this.isSmallScreen ? 'small' : 'medium',
        contentProps: {
          currentLocale: currentLocale,
          meetingPassword: this.meeting.usePersonalMeetingId ? this.personalMeetingSettings.meetingPassword : this.meeting.meetingPassword,
          handleCancel: function handleCancel() {
            _this2.closePasswordChangeModal();
          },
          handleUpdate: function handleUpdate(meetingPassword) {
            if (_this2.meeting.usePersonalMeetingId) {
              _this2.updatePersonalMeetingSettings(_objectSpread(_objectSpread({}, _this2.personalMeetingSettings), {}, {
                meetingPassword: meetingPassword
              }));
            } else {
              _this2.updateMeetingSettings(_objectSpread(_objectSpread({}, _this2.meeting), {}, {
                meetingPassword: meetingPassword
              }));
            }
            _this2.actionAfterUpdateMeetingPassword();

            // @ts-expect-error TS(2322): Type '{ id: string; code: string; name: string; sh... Remove this comment to see the full error message
            if (_this2._deps.genericMeeting.trackSettingChanges) {
              // @ts-expect-error
              _this2._deps.genericMeeting.trackSettingChanges(_RcVideo.RCV_ITEM_NAME.meetingPassword);
            }
            _this2.closePasswordChangeModal();
          }
        }
      });
      this._deps.modalUI.getPromise(this._changePasswordPopupId)["finally"](function () {
        _this2._changePasswordPopupId = null;
      });
    }
  }, {
    key: "closePasswordChangeModal",
    value: function closePasswordChangeModal() {
      if (this._changePasswordPopupId) {
        this._deps.modalUI.close(this._changePasswordPopupId);
        this._changePasswordPopupId = null;
      }
    }
  }, {
    key: "updateMeetingSettings",
    value: function updateMeetingSettings(value) {
      this._deps.genericMeeting.updateHasSettingsChanged(true);
      this._deps.genericMeeting.updateMeetingSettings(value);
    }
  }, {
    key: "updatePersonalMeetingSettings",
    value: function updatePersonalMeetingSettings(value) {
      this._deps.genericMeeting.updateHasSettingsChanged(true);
      this._deps.genericMeeting.updatePersonalMeetingSettings(value);
    }
  }, {
    key: "getRcvOptionsDisabledStatus",
    value: function getRcvOptionsDisabledStatus(_ref2) {
      var _meeting$settingLock, _meeting$settingLock2, _meeting$settingLock3, _meeting$settingLock4, _meeting$settingLock5, _meeting$settingLock6, _meeting$settingLock7, _meeting$settingLock8, _meeting$settingLock9;
      var disabled = _ref2.disabled,
        showRcvAdminLock = _ref2.showRcvAdminLock,
        configDisabled = _ref2.configDisabled,
        showPmiConfirm = _ref2.showPmiConfirm;
      var meeting = this.meeting.usePersonalMeetingId ? this.personalMeetingSettings : this.meeting;
      var _ref3 = this.meeting,
        _ref3$settingLock = _ref3.settingLock,
        settingLock = _ref3$settingLock === void 0 ? {} : _ref3$settingLock,
        e2ee = _ref3.e2ee;
      var showE2EE = this._deps.genericMeeting.ready && this._deps.genericMeeting.enableE2EE;
      var enableWaitingRoom = this._deps.genericMeeting.ready && this._deps.genericMeeting.enableWaitingRoom;
      var isPmiConfigDisabled = configDisabled || showPmiConfirm && this.meeting.usePersonalMeetingId && !this.isPmiChangeConfirmed;

      // when e2ee is on, waiting room&auth can join&require password&jbh will be disabled and turn on.
      var isE2eeRelatedOptionsDisabled = showE2EE && e2ee;
      var isE2EEDisabled = showE2EE && (this._deps.appFeatures.ready && !this._deps.appFeatures.hasVideoE2EE ||
      // @ts-expect-error TS(2339): Property 'e2ee' does not exist on type '{}'.
      settingLock.e2ee || (0, _ramda.any)(function (key) {
        return (
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          settingLock[key] && meeting[key] === _RcVideo.DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH[key]
        );
      })(Object.keys(_RcVideo.DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH)));
      return {
        isE2EEDisabled: isE2EEDisabled,
        isE2eeRelatedOptionsDisabled: isE2eeRelatedOptionsDisabled,
        isRequirePasswordDisabled: isE2eeRelatedOptionsDisabled || isPmiConfigDisabled || configDisabled || showRcvAdminLock && ((_meeting$settingLock = meeting.settingLock) === null || _meeting$settingLock === void 0 ? void 0 : _meeting$settingLock.isMeetingSecret),
        isJoinBeforeHostDisabled: configDisabled || isPmiConfigDisabled || showRcvAdminLock && ((_meeting$settingLock2 = meeting.settingLock) === null || _meeting$settingLock2 === void 0 ? void 0 : _meeting$settingLock2.allowJoinBeforeHost) || enableWaitingRoom && meeting.waitingRoomMode === _RcVideo.RCV_WAITING_ROOM_MODE.all,
        isPasswordFieldDisabled: isPmiConfigDisabled,
        isAllowToRecordDisabled: isPmiConfigDisabled || showRcvAdminLock && ((_meeting$settingLock3 = meeting.settingLock) === null || _meeting$settingLock3 === void 0 ? void 0 : _meeting$settingLock3.allowAnyoneRecord),
        isAllowAnyoneTranscribeDisabled: isPmiConfigDisabled || showRcvAdminLock && ((_meeting$settingLock4 = meeting.settingLock) === null || _meeting$settingLock4 === void 0 ? void 0 : _meeting$settingLock4.allowAnyoneTranscribe),
        isMuteAudioDisabled: configDisabled || isPmiConfigDisabled,
        isTurnOffCameraDisabled: configDisabled || isPmiConfigDisabled,
        isAllowScreenSharingDisabled: configDisabled || isPmiConfigDisabled || showRcvAdminLock && ((_meeting$settingLock5 = meeting.settingLock) === null || _meeting$settingLock5 === void 0 ? void 0 : _meeting$settingLock5.allowScreenSharing),
        isWaitingRoomDisabled: isE2eeRelatedOptionsDisabled || isPmiConfigDisabled || configDisabled || showRcvAdminLock && ((_meeting$settingLock6 = meeting.settingLock) === null || _meeting$settingLock6 === void 0 ? void 0 : _meeting$settingLock6.waitingRoomMode),
        isWaitingRoomTypeDisabled: disabled || configDisabled || isPmiConfigDisabled || showRcvAdminLock && ((_meeting$settingLock7 = meeting.settingLock) === null || _meeting$settingLock7 === void 0 ? void 0 : _meeting$settingLock7.waitingRoomMode),
        isWaitingRoomNotCoworkerDisabled: meeting.isOnlyCoworkersJoin,
        isWaitingRoomGuestDisabled: meeting.isOnlyAuthUserJoin || showE2EE && meeting.e2ee,
        isAuthenticatedCanJoinDisabled: isE2eeRelatedOptionsDisabled || configDisabled || isPmiConfigDisabled || showRcvAdminLock && ((_meeting$settingLock8 = meeting.settingLock) === null || _meeting$settingLock8 === void 0 ? void 0 : _meeting$settingLock8.isOnlyAuthUserJoin),
        isAuthUserTypeDisabled: disabled || configDisabled || isPmiConfigDisabled || showRcvAdminLock && ((_meeting$settingLock9 = meeting.settingLock) === null || _meeting$settingLock9 === void 0 ? void 0 : _meeting$settingLock9.isOnlyCoworkersJoin)
      };
    }
  }, {
    key: "getRcvConfig",
    value: function getRcvConfig(_ref4) {
      var _ref4$disabled = _ref4.disabled,
        disabled = _ref4$disabled === void 0 ? false : _ref4$disabled,
        _ref4$showRcvAdminLoc = _ref4.showRcvAdminLock,
        showRcvAdminLock = _ref4$showRcvAdminLoc === void 0 ? false : _ref4$showRcvAdminLoc,
        _ref4$configDisabled = _ref4.configDisabled,
        configDisabled = _ref4$configDisabled === void 0 ? false : _ref4$configDisabled,
        _ref4$showPmiConfirm = _ref4.showPmiConfirm,
        showPmiConfirm = _ref4$showPmiConfirm === void 0 ? false : _ref4$showPmiConfirm;
      var isDelegator = false;
      var meeting = this.meeting;
      var delegators = this.delegators;
      var user = (0, _ramda.find)(function (item) {
        return item.extensionId === meeting.extensionId;
      }, delegators);
      // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
      isDelegator = user && !user.isLoginUser;
      var enableWaitingRoom = this._deps.genericMeeting.ready && this._deps.genericMeeting.enableWaitingRoom;
      var showE2EE = this._deps.genericMeeting.ready && this._deps.genericMeeting.enableE2EE;
      var isOnlyCoworkersJoin = meeting.isOnlyCoworkersJoin;
      var authUserTypeValue = isOnlyCoworkersJoin ? _RcVideo.AUTH_USER_TYPE.SIGNED_IN_CO_WORKERS : _RcVideo.AUTH_USER_TYPE.SIGNED_IN_USERS;
      return _objectSpread({
        meeting: meeting,
        showE2EE: showE2EE,
        delegators: delegators,
        authUserTypeValue: authUserTypeValue,
        showWaitingRoom: enableWaitingRoom,
        isPersonalMeetingDisabled: showE2EE && meeting.e2ee,
        joinBeforeHostLabel: isDelegator ? _RcVideo.JBH_LABEL.JOIN_AFTER_HOST : _RcVideo.JBH_LABEL.JOIN_AFTER_ME
      }, this.getRcvOptionsDisabledStatus({
        disabled: disabled,
        showRcvAdminLock: showRcvAdminLock,
        configDisabled: configDisabled,
        showPmiConfirm: showPmiConfirm
      }));
    }
  }, {
    key: "getRcmConfig",
    value: function getRcmConfig(_ref5) {
      var _this$meeting;
      var showRecurringMeeting = _ref5.showRecurringMeeting;
      return {
        delegators: this.delegators,
        showRecurringMeeting: !((_this$meeting = this.meeting) === null || _this$meeting === void 0 ? void 0 : _this$meeting.usePersonalMeetingId) && showRecurringMeeting
      };
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(props) {
      var _this$meeting2, _this$_deps$genericMe, _this$_deps$genericMe2, _this$_deps$genericMe3, _this$_deps$genericMe4, _this$_deps$genericMe5, _this$_deps$genericMe6;
      var disabled = props.disabled,
        showTopic = props.showTopic,
        showWhen = props.showWhen,
        showDuration = props.showDuration,
        openNewWindow = props.openNewWindow,
        labelPlacement = props.labelPlacement,
        scheduleButton = props.scheduleButton,
        datePickerSize = props.datePickerSize,
        timePickerSize = props.timePickerSize,
        recurringMeetingPosition = props.recurringMeetingPosition,
        _props$showRcvAdminLo = props.showRcvAdminLock,
        showRcvAdminLock = _props$showRcvAdminLo === void 0 ? false : _props$showRcvAdminLo,
        _props$showPmiConfirm = props.showPmiConfirm,
        showPmiConfirm = _props$showPmiConfirm === void 0 ? false : _props$showPmiConfirm,
        _props$configDisabled = props.configDisabled,
        configDisabled = _props$configDisabled === void 0 ? false : _props$configDisabled,
        _props$showRemoveMeet = props.showRemoveMeetingWarning,
        showRemoveMeetingWarning = _props$showRemoveMeet === void 0 ? false : _props$showRemoveMeet;
      var isAllOptionDisabled = !!(disabled || !((_this$meeting2 = this.meeting) === null || _this$meeting2 === void 0 ? void 0 : _this$meeting2.isMeetingPasswordValid) || this.isUnavailable);
      var config = this.isRCM ?
      // @ts-expect-error TS(2345): Argument of type 'GenericMeetingContainerProps' is... Remove this comment to see the full error message
      this.getRcmConfig(props) : this.getRcvConfig(props);
      return _objectSpread({
        isRCV: this.isRCV,
        isRCM: this.isRCM,
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
        // @ts-expect-error TS(2322): Type '{ id: string; code: string; name: string; sh... Remove this comment to see the full error message
        brandConfig: this._deps.brand.brandConfig,
        recurringMeetingPosition: recurringMeetingPosition,
        meeting: this.meeting,
        currentLocale: this._deps.locale.currentLocale,
        disabled: isAllOptionDisabled,
        configDisabled: configDisabled,
        showScheduleOnBehalf: !!(this.delegators && this.delegators.length > 0),
        showSaveAsDefault: this._deps.genericMeeting.ready && this._deps.genericMeeting.showSaveAsDefault,
        // Need to add this back when we back to this ticket
        // https://jira_domain/browse/RCINT-15031
        // disableSaveAsDefault:
        //   this._deps.genericMeeting.ready &&
        //   !this._deps.genericMeeting.isPreferencesChanged,
        disableSaveAsDefault: false,
        enableServiceWebSettings: this._deps.genericMeeting.ready && this._deps.genericMeeting.enableServiceWebSettings,
        enablePersonalMeeting: this._deps.genericMeeting.ready && this._deps.genericMeeting.enablePersonalMeeting,
        personalMeeting: this.personalMeetingSettings,
        personalMeetingId: (_this$_deps$genericMe = (_this$_deps$genericMe2 = this._deps.genericMeeting) === null || _this$_deps$genericMe2 === void 0 ? void 0 : _this$_deps$genericMe2.personalMeetingId) !== null && _this$_deps$genericMe !== void 0 ? _this$_deps$genericMe : '',
        personalMeetingName: (_this$_deps$genericMe3 = (_this$_deps$genericMe4 = this._deps.genericMeeting) === null || _this$_deps$genericMe4 === void 0 ? void 0 : _this$_deps$genericMe4.personalMeetingName) !== null && _this$_deps$genericMe3 !== void 0 ? _this$_deps$genericMe3 : '',
        personalMeetingLink: (_this$_deps$genericMe5 = (_this$_deps$genericMe6 = this._deps.genericMeeting) === null || _this$_deps$genericMe6 === void 0 ? void 0 : _this$_deps$genericMe6.personalMeetingLink) !== null && _this$_deps$genericMe5 !== void 0 ? _this$_deps$genericMe5 : '',
        showSpinner: !!(!this._deps.locale.ready || !this._deps.genericMeeting.ready || !this.isRCM && !this.isRCV || !this._deps.genericMeeting.meeting || this._deps.connectivityMonitor && !this._deps.connectivityMonitor.ready || this._deps.rateLimiter && !this._deps.rateLimiter.ready),
        showSpinnerInConfigPanel: this._deps.genericMeeting.isUpdating,
        hasSettingsChanged: this._deps.genericMeeting.hasSettingsChanged,
        defaultSetting: this._deps.genericMeeting.defaultSetting,
        defaultTopic: this._deps.genericMeeting.ready ? this._deps.genericMeeting.defaultTopic : '',
        isPmiChangeConfirmed: this.isPmiChangeConfirmed
      }, config);
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref6) {
      var _this3 = this;
      var _schedule = _ref6.schedule;
      return {
        switchUsePersonalMeetingId: function switchUsePersonalMeetingId(usePersonalMeetingId) {
          _this3._deps.genericMeeting.switchUsePersonalMeetingId(usePersonalMeetingId);
          // reset pmi change confirm popup
          if (usePersonalMeetingId) {
            _this3.setIsPmiChangeConfirmed(false);
          }
          _this3._deps.genericMeeting.updateHasSettingsChanged(true);
        },
        updateScheduleFor: function updateScheduleFor(userExtensionId) {
          return _this3._deps.genericMeeting.updateScheduleFor(userExtensionId);
        },
        // TODO: any is reserved for RcM
        updateMeetingSettings: function updateMeetingSettings(value) {
          _this3.updateMeetingSettings(value);
        },
        validatePasswordSettings: function validatePasswordSettings(password, isSecret) {
          return _this3._deps.genericMeeting.validatePasswordSettings(password, isSecret);
        },
        schedule: function schedule(meetingInfo, opener) {
          if (_schedule) {
            return _schedule(meetingInfo, opener);
          }
          return _this3._deps.genericMeeting.schedule(meetingInfo, {}, opener);
        },
        init: function init() {
          return _this3._deps.genericMeeting.init();
        },
        // TODO: Moving to RcVideo updateMeetingSettings would be better
        e2eeInteractFunc: function e2eeInteractFunc(e2eeValue) {
          if (!e2eeValue) {
            _this3._deps.genericMeeting.updateMeetingSettings({
              e2ee: e2eeValue
            });
            // when user turn on e2ee option in pmi meeting, should switch to non-pmi meeting
            // @ts-expect-error TS(2531): Object is possibly 'null'.
          } else if (_this3._deps.genericMeeting.meeting.usePersonalMeetingId) {
            _this3._deps.genericMeeting.switchUsePersonalMeetingId(false);
            _this3._deps.genericMeeting.turnOnE2ee();
          } else {
            _this3._deps.genericMeeting.turnOnE2ee();
          }
          _this3._deps.genericMeeting.updateHasSettingsChanged(true);
        },
        onPmiChangeClick: function () {
          var _onPmiChangeClick = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
            var currentLocale;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  currentLocale = _this3._deps.locale.currentLocale;
                  _this3._deps.modalUI.confirm({
                    maxWidth: 'xs',
                    childrenSize: _this3.isSmallScreen ? 'small' : 'medium',
                    title: _i18n["default"].getString('pmiChangeConfirmTitle', currentLocale),
                    content: _i18n["default"].getString('pmiChangeConfirmContext', currentLocale),
                    onConfirm: function onConfirm() {
                      _this3.setIsPmiChangeConfirmed(true);
                    },
                    confirmButtonText: _i18n["default"].getString('pmiChangeConfirmed', currentLocale),
                    cancelButtonText: _i18n["default"].getString('cancel', currentLocale)
                  });
                case 1:
                  return _context.a(2);
              }
            }, _callee);
          }));
          function onPmiChangeClick() {
            return _onPmiChangeClick.apply(this, arguments);
          }
          return onPmiChangeClick;
        }(),
        onPasswordChangeClick: function () {
          var _onPasswordChangeClick = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.n) {
                case 0:
                  _this3.showPasswordChangeModal();
                case 1:
                  return _context2.a(2);
              }
            }, _callee2);
          }));
          function onPasswordChangeClick() {
            return _onPasswordChangeClick.apply(this, arguments);
          }
          return onPasswordChangeClick;
        }()
      };
    }
  }, {
    key: "meeting",
    get: function get() {
      return this._deps.genericMeeting.ready && this._deps.genericMeeting.meeting || {};
    }
  }, {
    key: "personalMeetingSettings",
    get: function get() {
      return this._deps.genericMeeting.ready && this._deps.genericMeeting.personalMeetingSettings || {};
    }
  }, {
    key: "delegators",
    get: function get() {
      return this._deps.genericMeeting.ready && this._deps.genericMeeting.delegators || [];
    }
  }, {
    key: "isSmallScreen",
    get: function get() {
      return document.body.clientWidth < 290;
    }
  }, {
    key: "isRCM",
    get: function get() {
      return this._deps.genericMeeting.isRCM;
    }
  }, {
    key: "isRCV",
    get: function get() {
      return this._deps.genericMeeting.isRCV;
    }
  }, {
    key: "isUnavailable",
    get: function get() {
      return this._deps.genericMeeting.ready && this._deps.genericMeeting.isScheduling || this._deps.connectivityMonitor.ready && !this._deps.connectivityMonitor.connectivity || this._deps.rateLimiter.ready && this._deps.rateLimiter.throttling;
    }
  }, {
    key: "actionAfterUpdateMeetingPassword",
    value: function actionAfterUpdateMeetingPassword() {
      // TODO: add action after update meeting password
    }
  }]);
}(_core.RcUIModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "isPmiChangeConfirmed", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setIsPmiChangeConfirmed", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsPmiChangeConfirmed"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isRCM", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "isRCM"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isRCV", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "isRCV"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isUnavailable", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "isUnavailable"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=GenericMeetingUI.js.map
