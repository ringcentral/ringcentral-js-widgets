"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoPanel = void 0;
require("regenerator-runtime/runtime");
var _utils = require("@ringcentral-integration/commons/utils");
var _utils2 = require("@ringcentral-integration/utils");
var _react = _interopRequireWildcard(require("react"));
var _InnerTopic = require("../InnerTopic");
var _VideoConfig = require("./VideoConfig");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/** @deprecated */
var VideoPanel = function VideoPanel(_ref) {
  var ScheduleButton = _ref.scheduleButton,
    datePickerSize = _ref.datePickerSize,
    timePickerSize = _ref.timePickerSize,
    checkboxSize = _ref.checkboxSize,
    meeting = _ref.meeting,
    hidden = _ref.hidden,
    currentLocale = _ref.currentLocale,
    onOK = _ref.onOK,
    showSaveAsDefault = _ref.showSaveAsDefault,
    disableSaveAsDefault = _ref.disableSaveAsDefault,
    disabled = _ref.disabled,
    openNewWindow = _ref.openNewWindow,
    schedule = _ref.schedule,
    updateMeetingSettings = _ref.updateMeetingSettings,
    init = _ref.init,
    recipientsSection = _ref.recipientsSection,
    showWhen = _ref.showWhen,
    showDuration = _ref.showDuration,
    brandName = _ref.brandName,
    showRcvAdminLock = _ref.showRcvAdminLock,
    showPmiConfirm = _ref.showPmiConfirm,
    isPmiChangeConfirmed = _ref.isPmiChangeConfirmed,
    onPmiChangeClick = _ref.onPmiChangeClick,
    showWaitingRoom = _ref.showWaitingRoom,
    showE2EE = _ref.showE2EE,
    isE2EEDisabled = _ref.isE2EEDisabled,
    enablePersonalMeeting = _ref.enablePersonalMeeting,
    enableJoinAfterMeCopy = _ref.enableJoinAfterMeCopy,
    personalMeetingId = _ref.personalMeetingId,
    isPersonalMeetingDisabled = _ref.isPersonalMeetingDisabled,
    configDisabled = _ref.configDisabled,
    labelPlacement = _ref.labelPlacement,
    switchUsePersonalMeetingId = _ref.switchUsePersonalMeetingId,
    trackSettingChanges = _ref.trackSettingChanges,
    e2eeInteractFunc = _ref.e2eeInteractFunc,
    updateScheduleFor = _ref.updateScheduleFor,
    delegators = _ref.delegators,
    joinBeforeHostLabel = _ref.joinBeforeHostLabel,
    authUserTypeValue = _ref.authUserTypeValue,
    isJoinBeforeHostDisabled = _ref.isJoinBeforeHostDisabled,
    isMuteAudioDisabled = _ref.isMuteAudioDisabled,
    isTurnOffCameraDisabled = _ref.isTurnOffCameraDisabled,
    isAllowScreenSharingDisabled = _ref.isAllowScreenSharingDisabled,
    isAuthenticatedCanJoinDisabled = _ref.isAuthenticatedCanJoinDisabled,
    isAuthUserTypeDisabled = _ref.isAuthUserTypeDisabled,
    isWaitingRoomTypeDisabled = _ref.isWaitingRoomTypeDisabled,
    isSignedInUsersDisabled = _ref.isSignedInUsersDisabled,
    isSignedInCoWorkersDisabled = _ref.isSignedInCoWorkersDisabled,
    isWaitingRoomNotCoworkerDisabled = _ref.isWaitingRoomNotCoworkerDisabled,
    isWaitingRoomGuestDisabled = _ref.isWaitingRoomGuestDisabled,
    isWaitingRoomAllDisabled = _ref.isWaitingRoomAllDisabled,
    isWaitingRoomDisabled = _ref.isWaitingRoomDisabled,
    isRequirePasswordDisabled = _ref.isRequirePasswordDisabled,
    showScheduleOnBehalf = _ref.showScheduleOnBehalf,
    showSpinnerInConfigPanel = _ref.showSpinnerInConfigPanel;
  var topicRef = (0, _react.useRef)(null);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].videoPanel
  }, /*#__PURE__*/_react["default"].createElement(_VideoConfig.VideoConfig, {
    currentLocale: currentLocale,
    meeting: meeting,
    updateMeetingSettings: updateMeetingSettings,
    recipientsSection: recipientsSection,
    init: init,
    showWhen: showWhen,
    showDuration: showDuration,
    brandName: brandName,
    showRcvAdminLock: showRcvAdminLock,
    showPmiConfirm: showPmiConfirm,
    showWaitingRoom: showWaitingRoom,
    showE2EE: showE2EE,
    isE2EEDisabled: isE2EEDisabled,
    enablePersonalMeeting: enablePersonalMeeting,
    enableJoinAfterMeCopy: enableJoinAfterMeCopy,
    personalMeetingId: personalMeetingId,
    switchUsePersonalMeetingId: switchUsePersonalMeetingId,
    trackSettingChanges: trackSettingChanges,
    disabled: configDisabled
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    ,
    isPersonalMeetingDisabled: isPersonalMeetingDisabled,
    isPmiChangeConfirmed: isPmiChangeConfirmed,
    labelPlacement: labelPlacement,
    e2eeInteractFunc: e2eeInteractFunc,
    updateScheduleFor: updateScheduleFor,
    onPmiChangeClick: onPmiChangeClick,
    datePickerSize: datePickerSize,
    timePickerSize: timePickerSize,
    checkboxSize: checkboxSize,
    isWaitingRoomNotCoworkerDisabled: isWaitingRoomNotCoworkerDisabled,
    isWaitingRoomGuestDisabled: isWaitingRoomGuestDisabled,
    isWaitingRoomAllDisabled: isWaitingRoomAllDisabled,
    isAuthUserTypeDisabled: isAuthUserTypeDisabled,
    isWaitingRoomTypeDisabled: isWaitingRoomTypeDisabled,
    isSignedInUsersDisabled: isSignedInUsersDisabled,
    isSignedInCoWorkersDisabled: isSignedInCoWorkersDisabled,
    showScheduleOnBehalf: showScheduleOnBehalf,
    showSpinnerInConfigPanel: showSpinnerInConfigPanel,
    delegators: delegators,
    joinBeforeHostLabel: joinBeforeHostLabel,
    authUserTypeValue: authUserTypeValue,
    isJoinBeforeHostDisabled: isJoinBeforeHostDisabled,
    isMuteAudioDisabled: isMuteAudioDisabled,
    isTurnOffCameraDisabled: isTurnOffCameraDisabled,
    isAllowScreenSharingDisabled: isAllowScreenSharingDisabled,
    isAuthenticatedCanJoinDisabled: isAuthenticatedCanJoinDisabled,
    isWaitingRoomDisabled: isWaitingRoomDisabled,
    isRequirePasswordDisabled: isRequirePasswordDisabled
  }, /*#__PURE__*/_react["default"].createElement(_InnerTopic.Topic, {
    name: meeting.name,
    updateMeetingTopic: function updateMeetingTopic(name) {
      updateMeetingSettings({
        name: name
      });
    },
    currentLocale: currentLocale,
    ref: topicRef
  })), ScheduleButton ? /*#__PURE__*/_react["default"].createElement(ScheduleButton, {
    currentLocale: currentLocale,
    hidden: hidden,
    disabled: disabled,
    meeting: meeting,
    onOK: onOK,
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var opener;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (disabled) {
                _context.next = 6;
                break;
              }
              _context.next = 3;
              return (0, _utils.sleep)(100);
            case 3:
              opener = openNewWindow && (0, _utils2.isSafari)() ? window.open() : null;
              _context.next = 6;
              return schedule(_objectSpread(_objectSpread({}, meeting), {}, {
                // @ts-expect-error TS(2531): Object is possibly 'null'.
                name: topicRef.current.value
              }),
              // @ts-expect-error TS(2345): Argument of type 'Window | null' is not assignable... Remove this comment to see the full error message
              opener);
            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })),
    update: updateMeetingSettings,
    showSaveAsDefault: showSaveAsDefault,
    disableSaveAsDefault: disableSaveAsDefault
  }) : null);
};
exports.VideoPanel = VideoPanel;
//# sourceMappingURL=VideoPanel.js.map
