"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.keys");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericMeetingUI = void 0;
require("regenerator-runtime/runtime");
var _di = require("@ringcentral-integration/commons/lib/di");
var _RcVideo = require("@ringcentral-integration/commons/modules/RcVideo");
var _core = require("@ringcentral-integration/core");
var _ramda = require("ramda");
var _i18n = _interopRequireDefault(require("./i18n"));
var _dec, _class, _class2, _descriptor;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var GenericMeetingUI = (_dec = (0, _di.Module)({
  name: 'GenericMeetingUI',
  deps: ['GenericMeeting', 'AppFeatures', 'Brand', 'Locale', 'ModalUI', 'RateLimiter', 'ConnectivityMonitor']
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(GenericMeetingUI, _RcUIModuleV);
  var _super = _createSuper(GenericMeetingUI);
  function GenericMeetingUI(deps) {
    var _this;
    _classCallCheck(this, GenericMeetingUI);
    _this = _super.call(this, {
      deps: deps
    });
    _initializerDefineProperty(_this, "isPmiChangeConfirmed", _descriptor, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(GenericMeetingUI, [{
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
      // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
      isDelegator = user && !user.isLoginUser;
      var enableWaitingRoom = this._deps.genericMeeting.ready && this._deps.genericMeeting.enableWaitingRoom;
      var showE2EE = this._deps.genericMeeting.ready && this._deps.genericMeeting.enableE2EE;
      var _meeting$settingLock = meeting.settingLock,
        settingLock = _meeting$settingLock === void 0 ? {} : _meeting$settingLock,
        e2ee = meeting.e2ee,
        isOnlyCoworkersJoin = meeting.isOnlyCoworkersJoin;
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
      var authUserTypeValue = isOnlyCoworkersJoin ? _RcVideo.AUTH_USER_TYPE.SIGNED_IN_CO_WORKERS : _RcVideo.AUTH_USER_TYPE.SIGNED_IN_USERS;
      return {
        meeting: meeting,
        showE2EE: showE2EE,
        delegators: delegators,
        isE2EEDisabled: isE2EEDisabled,
        authUserTypeValue: authUserTypeValue,
        isE2eeRelatedOptionsDisabled: isE2eeRelatedOptionsDisabled,
        showWaitingRoom: enableWaitingRoom,
        isPersonalMeetingDisabled: showE2EE && meeting.e2ee,
        joinBeforeHostLabel: isDelegator ? _RcVideo.JBH_LABEL.JOIN_AFTER_HOST : _RcVideo.JBH_LABEL.JOIN_AFTER_ME,
        isRequirePasswordDisabled: isE2eeRelatedOptionsDisabled || isPmiConfigDisabled || configDisabled || showRcvAdminLock && ((_meeting$settingLock2 = meeting.settingLock) === null || _meeting$settingLock2 === void 0 ? void 0 : _meeting$settingLock2.isMeetingSecret),
        isJoinBeforeHostDisabled: configDisabled || isPmiConfigDisabled || showRcvAdminLock && ((_meeting$settingLock3 = meeting.settingLock) === null || _meeting$settingLock3 === void 0 ? void 0 : _meeting$settingLock3.allowJoinBeforeHost) || enableWaitingRoom && meeting.waitingRoomMode === _RcVideo.RCV_WAITING_ROOM_MODE.all,
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
      var _this$meeting2;
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
      var isRCM = this._deps.genericMeeting.isRCM;
      var isRCV = this._deps.genericMeeting.isRCV;
      var isAllOptionDisabled = !!(disabled || !((_this$meeting2 = this.meeting) === null || _this$meeting2 === void 0 ? void 0 : _this$meeting2.isMeetingPasswordValid) || this._deps.genericMeeting.ready && this._deps.genericMeeting.isScheduling || this._deps.connectivityMonitor && !this._deps.connectivityMonitor.connectivity || this._deps.rateLimiter && this._deps.rateLimiter.throttling);

      // @ts-expect-error TS(2345): Argument of type 'GenericMeetingContainerProps' is... Remove this comment to see the full error message
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
        // @ts-expect-error TS(2322): Type 'string | false' is not assignable to type 's... Remove this comment to see the full error message
        personalMeetingId: this._deps.genericMeeting.ready && this._deps.genericMeeting.personalMeetingId,
        showSpinner: !!(!this._deps.locale.ready || !this._deps.genericMeeting.ready || !isRCM && !isRCV || !this._deps.genericMeeting.meeting || this._deps.connectivityMonitor && !this._deps.connectivityMonitor.ready || this._deps.rateLimiter && !this._deps.rateLimiter.ready),
        showSpinnerInConfigPanel: this._deps.genericMeeting.isUpdating,
        hasSettingsChanged: this._deps.genericMeeting.hasSettingsChanged,
        defaultSetting: this._deps.genericMeeting.defaultSetting,
        defaultTopic: this._deps.genericMeeting.ready ? this._deps.genericMeeting.defaultTopic : '',
        isPmiChangeConfirmed: this.isPmiChangeConfirmed
      }, config);
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref3) {
      var _this2 = this;
      var _schedule = _ref3.schedule;
      return {
        switchUsePersonalMeetingId: function switchUsePersonalMeetingId(usePersonalMeetingId) {
          _this2._deps.genericMeeting.switchUsePersonalMeetingId(usePersonalMeetingId);
          // reset pmi change confirm popup
          if (usePersonalMeetingId) {
            _this2.setIsPmiChangeConfirmed(false);
          }
          _this2._deps.genericMeeting.updateHasSettingsChanged(true);
        },
        updateScheduleFor: function updateScheduleFor(userExtensionId) {
          return _this2._deps.genericMeeting.updateScheduleFor(userExtensionId);
        },
        // TODO: any is reserved for RcM
        updateMeetingSettings: function updateMeetingSettings(value) {
          _this2._deps.genericMeeting.updateHasSettingsChanged(true);
          _this2._deps.genericMeeting.updateMeetingSettings(value);
        },
        validatePasswordSettings: function validatePasswordSettings(password, isSecret) {
          return _this2._deps.genericMeeting.validatePasswordSettings(password, isSecret);
        },
        schedule: function schedule(meetingInfo, opener) {
          if (_schedule) {
            return _schedule(meetingInfo, opener);
          }
          return _this2._deps.genericMeeting.schedule(meetingInfo, {}, opener);
        },
        init: function init() {
          return _this2._deps.genericMeeting.init();
        },
        // TODO: Moving to RcVideo updateMeetingSettings would be better
        e2eeInteractFunc: function e2eeInteractFunc(e2eeValue) {
          if (!e2eeValue) {
            _this2._deps.genericMeeting.updateMeetingSettings({
              e2ee: e2eeValue
            });
            // when user turn on e2ee option in pmi meeting, should switch to non-pmi meeting
            // @ts-expect-error TS(2531): Object is possibly 'null'.
          } else if (_this2._deps.genericMeeting.meeting.usePersonalMeetingId) {
            _this2._deps.genericMeeting.switchUsePersonalMeetingId(false);
            _this2._deps.genericMeeting.turnOnE2ee();
          } else {
            _this2._deps.genericMeeting.turnOnE2ee();
          }
          _this2._deps.genericMeeting.updateHasSettingsChanged(true);
        },
        onPmiChangeClick: function () {
          var _onPmiChangeClick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var currentLocale;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    currentLocale = _this2._deps.locale.currentLocale;
                    _this2._deps.modalUI.confirm({
                      maxWidth: 'xs',
                      childrenSize: _this2.isSmallScreen ? 'small' : 'medium',
                      title: _i18n["default"].getString('pmiChangeConfirmTitle', currentLocale),
                      content: _i18n["default"].getString('pmiChangeConfirmContext', currentLocale),
                      onConfirm: function onConfirm() {
                        _this2.setIsPmiChangeConfirmed(true);
                      },
                      confirmButtonText: _i18n["default"].getString('pmiChangeConfirmed', currentLocale),
                      cancelButtonText: _i18n["default"].getString('pmiChangeCancel', currentLocale)
                    });
                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));
          function onPmiChangeClick() {
            return _onPmiChangeClick.apply(this, arguments);
          }
          return onPmiChangeClick;
        }()
      };
    }
  }, {
    key: "meeting",
    get: function get() {
      return this._deps.genericMeeting.ready && this._deps.genericMeeting.meeting || {};
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
  }]);
  return GenericMeetingUI;
}(_core.RcUIModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "isPmiChangeConfirmed", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setIsPmiChangeConfirmed", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsPmiChangeConfirmed"), _class2.prototype)), _class2)) || _class);
exports.GenericMeetingUI = GenericMeetingUI;
//# sourceMappingURL=GenericMeetingUI.js.map
