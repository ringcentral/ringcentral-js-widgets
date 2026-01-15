"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.name");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SchedulerMeetingPanel = void 0;
var _RcVideo = require("@ringcentral-integration/commons/modules/RcVideo");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireWildcard(require("react"));
var _FormattedMessage = _interopRequireDefault(require("../FormattedMessage"));
var _MeetingAlert = require("../MeetingAlert");
var _ExtendedTooltip = require("../MeetingConfigsV2/ExtendedTooltip");
var _SpinnerOverlay = require("../SpinnerOverlay");
var _MeetingSettingsCard = require("./MeetingSettingsCard");
var _constants = require("./constants");
var _i18n = require("./i18n");
var _styled = require("./styled");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var SchedulerMeetingPanel = function SchedulerMeetingPanel(props) {
  var disabled = props.disabled,
    currentLocale = props.currentLocale,
    meeting = props.meeting,
    init = props.init,
    enablePersonalMeeting = props.enablePersonalMeeting,
    isPersonalMeetingDisabled = props.isPersonalMeetingDisabled,
    personalMeetingId = props.personalMeetingId,
    personalMeetingName = props.personalMeetingName,
    personalMeetingLink = props.personalMeetingLink,
    switchUsePersonalMeetingId = props.switchUsePersonalMeetingId,
    onCloseMigrationAlert = props.onCloseMigrationAlert,
    delegators = props.delegators,
    showScheduleOnBehalf = props.showScheduleOnBehalf,
    updateScheduleFor = props.updateScheduleFor,
    showSpinnerInConfigPanel = props.showSpinnerInConfigPanel,
    brandConfig = props.brandConfig,
    showMigrationAlert = props.showMigrationAlert,
    onPasswordChangeClick = props.onPasswordChangeClick,
    updateMeetingSettings = props.updateMeetingSettings,
    updatePersonalMeetingSettings = props.updatePersonalMeetingSettings,
    trackSettingChanges = props.trackSettingChanges,
    isJoinBeforeHostDisabled = props.isJoinBeforeHostDisabled,
    isWaitingRoomTypeDisabled = props.isWaitingRoomTypeDisabled,
    isWaitingRoomDisabled = props.isWaitingRoomDisabled,
    isRequirePasswordDisabled = props.isRequirePasswordDisabled,
    isWaitingRoomNotCoworkerDisabled = props.isWaitingRoomNotCoworkerDisabled,
    isWaitingRoomGuestDisabled = props.isWaitingRoomGuestDisabled,
    isAuthenticatedCanJoinDisabled = props.isAuthenticatedCanJoinDisabled,
    personalMeeting = props.personalMeeting,
    _props$useSimpleRcv = props.useSimpleRcv,
    useSimpleRcv = _props$useSimpleRcv === void 0 ? false : _props$useSimpleRcv;
  (0, _react.useEffect)(function () {
    if (init) {
      init();
    }
  }, []);

  /* Scrollbar */
  var configRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    hasScrollBar = _useState2[0],
    setHasScrollBar = _useState2[1];
  (0, _react.useEffect)(function () {
    setHasScrollBar(
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    configRef.current.scrollHeight > configRef.current.clientHeight);
  }, []);
  var showPersonalMeeting = (0, _react.useMemo)(function () {
    return enablePersonalMeeting && (personalMeetingId || personalMeetingName);
  }, [enablePersonalMeeting, personalMeetingId, personalMeetingName]);
  var _useState3 = (0, _react.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    showAssistedUserAlert = _useState4[0],
    setShowAssistedUserAlert = _useState4[1];
  var assistedUser = (0, _react.useMemo)(function () {
    return (delegators === null || delegators === void 0 ? void 0 : delegators.find(function (item) {
      return item.extensionId === meeting.extensionId;
    })) || (delegators === null || delegators === void 0 ? void 0 : delegators[0]);
  }, [delegators, meeting.extensionId]);
  (0, _react.useEffect)(function () {
    if (!showScheduleOnBehalf) {
      return;
    }
    setShowAssistedUserAlert(assistedUser.name !== _RcVideo.ASSISTED_USERS_MYSELF);
  }, [assistedUser, showScheduleOnBehalf]);
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    showEditPMI = _useState6[0],
    setShowEditPMI = _useState6[1]; // don't show password in the link
  var linkWithoutPassword = personalMeetingLink === null || personalMeetingLink === void 0 ? void 0 : personalMeetingLink.replace(/\?pw=[^&]+/, '');
  if (showEditPMI) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      ref: configRef,
      className: _styles["default"].videoConfig,
      "data-sign": "videoConfigsPanel"
    }, /*#__PURE__*/_react["default"].createElement(_styled.TitleWrapper, {
      "data-sign": "header"
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcBox, {
      display: "flex",
      alignItems: "center",
      alignContent: "center"
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
      "data-sign": "backButton",
      size: "medium",
      symbol: _junoIcon.ChevronLeft,
      variant: "plain",
      onClick: function onClick() {
        return setShowEditPMI(false);
      },
      className: _styles["default"].backButton
    }), /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
      variant: "title2"
    }, (0, _i18n.t)('pmiSettingsTitle'))), /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
      variant: "caption1",
      color: "neutral.b04"
    }, (0, _i18n.t)('pmiSettingsDescription'))), /*#__PURE__*/_react["default"].createElement(_MeetingSettingsCard.MeetingSettingsCard, {
      meeting: personalMeeting,
      brandConfig: brandConfig,
      onPasswordChangeClick: onPasswordChangeClick,
      updateMeetingSettings: updatePersonalMeetingSettings,
      trackSettingChanges: trackSettingChanges,
      isJoinBeforeHostDisabled: isJoinBeforeHostDisabled,
      isWaitingRoomTypeDisabled: isWaitingRoomTypeDisabled,
      isWaitingRoomDisabled: isWaitingRoomDisabled,
      isRequirePasswordDisabled: isRequirePasswordDisabled,
      isWaitingRoomNotCoworkerDisabled: isWaitingRoomNotCoworkerDisabled,
      isWaitingRoomGuestDisabled: isWaitingRoomGuestDisabled,
      isAuthenticatedCanJoinDisabled: isAuthenticatedCanJoinDisabled,
      useSimpleRcv: useSimpleRcv
    }));
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: configRef,
    className: _styles["default"].videoConfig,
    "data-sign": "videoConfigsPanel"
  }, showSpinnerInConfigPanel ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null) : null, showMigrationAlert && brandConfig.substituteName && /*#__PURE__*/_react["default"].createElement(_MeetingAlert.MigrateToPluginAlert, {
    currentLocale: currentLocale,
    substituteName: brandConfig.substituteName,
    onCloseAlert: onCloseMigrationAlert
  }), showScheduleOnBehalf ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].scheduleOnBehalf
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    variant: "body1",
    weight: "bold",
    className: _styles["default"].flexVertical
  }, (0, _i18n.t)('scheduleFor'), /*#__PURE__*/_react["default"].createElement(_ExtendedTooltip.ExtendedTooltip, {
    interactive: true,
    placement: "bottom",
    hasScrollBar: hasScrollBar,
    "data-sign": "scheduleForTooltip",
    title: /*#__PURE__*/_react["default"].createElement("div", {
      role: "button",
      tabIndex: 0,
      onClick: function onClick(e) {
        e.stopPropagation();
      },
      onKeyDown: function onKeyDown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.stopPropagation();
        }
      }
    }, /*#__PURE__*/_react["default"].createElement("div", {
      "data-sign": "scheduleForGuidance",
      className: _styles["default"].preLine
    }, (0, _i18n.t)('scheduleForGuidance')), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
      variant: "inherit",
      "data-sign": "scheduleForGuidanceLink",
      underline: true,
      target: "_blank",
      color: "neutral.b01",
      href: _constants.RCV_SCHEDULE_ON_BEHALF_GUIDANCE_LINK
    }, (0, _i18n.t)('scheduleForGuidanceMore'))))
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    size: "small",
    color: "neutral.f04",
    symbol: _junoIcon.InfoBorder,
    "data-sign": "scheduleForGuidanceIcon",
    className: _styles["default"].allowCursor,
    onClick: function onClick(e) {
      e.stopPropagation();
    }
  }))), /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, {
    size: "large",
    variant: "box",
    fullWidth: true,
    className: _styles["default"].boxSelect,
    "data-sign": "scheduleFor",
    disabled: meeting.usePersonalMeetingId || disabled,
    onChange: function onChange(e) {
      updateScheduleFor(e.target.value);
      trackSettingChanges === null || trackSettingChanges === void 0 ? void 0 : trackSettingChanges(_RcVideo.RCV_ITEM_NAME.scheduleFor);
    },
    value: meeting.extensionId
  }, delegators === null || delegators === void 0 ? void 0 : delegators.map(function (item, index) {
    var userName = item.name === _RcVideo.ASSISTED_USERS_MYSELF ? (0, _i18n.t)(item.name) : item.name;
    return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      value: item.extensionId,
      key: item.extensionId,
      title: userName,
      className: _styles["default"].boxSelectMenuItem,
      "data-sign": "scheduleForMenuItem".concat(index)
    }, userName);
  }))), showAssistedUserAlert && /*#__PURE__*/_react["default"].createElement(_juno.RcAlert, {
    severity: "info",
    icon: true,
    className: _styles["default"].scheduleForAlert
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcBox, {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  }, /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
    message: (0, _i18n.t)('scheduleForAssistedUser'),
    values: {
      userName: assistedUser.name
    }
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    size: "large",
    symbol: _junoIcon.Close,
    variant: "plain",
    onClick: function onClick() {
      return setShowAssistedUserAlert(false);
    }
  })))) : null, /*#__PURE__*/_react["default"].createElement(_styled.TitleWrapper, {
    "data-sign": "header"
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    variant: "title2"
  }, (0, _i18n.t)('meetingSettings')), /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    variant: "caption1",
    color: "neutral.b04"
  }, (0, _i18n.t)('meetingSettingsDescription'))), /*#__PURE__*/_react["default"].createElement(_MeetingSettingsCard.MeetingSettingsCard, {
    meeting: meeting,
    brandConfig: brandConfig,
    onPasswordChangeClick: onPasswordChangeClick,
    updateMeetingSettings: updateMeetingSettings,
    trackSettingChanges: trackSettingChanges,
    isRequirePasswordDisabled: meeting.usePersonalMeetingId || isRequirePasswordDisabled,
    isEditPasswordDisabled: meeting.usePersonalMeetingId,
    isAuthenticatedCanJoinDisabled: meeting.usePersonalMeetingId || isAuthenticatedCanJoinDisabled,
    isWaitingRoomDisabled: meeting.usePersonalMeetingId || isWaitingRoomDisabled,
    isWaitingRoomTypeDisabled: meeting.usePersonalMeetingId || isWaitingRoomTypeDisabled,
    isJoinBeforeHostDisabled: meeting.usePersonalMeetingId || isJoinBeforeHostDisabled,
    isWaitingRoomNotCoworkerDisabled: isWaitingRoomNotCoworkerDisabled,
    isWaitingRoomGuestDisabled: isWaitingRoomGuestDisabled,
    useSimpleRcv: useSimpleRcv
  }), showPersonalMeeting && /*#__PURE__*/_react["default"].createElement(_styled.StyledRcCard, {
    variant: "outlined"
  }, /*#__PURE__*/_react["default"].createElement(_styled.StyledListItem, {
    "data-sign": "personalMeetingField",
    canHover: false,
    button: false
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcListItemText, {
    primary: /*#__PURE__*/_react["default"].createElement("span", {
      title: (0, _i18n.t)('usePersonalMeetingIdInstead')
    }, (0, _i18n.t)('usePersonalMeetingIdInstead')),
    secondary: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
      component: "span",
      display: "block",
      variant: "caption1",
      className: _styles["default"].pmiLink,
      title: linkWithoutPassword
    }, linkWithoutPassword), meeting.usePersonalMeetingId && /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
      style: {
        marginTop: '4px'
      },
      variant: "caption1",
      underline: true,
      onClick: function onClick() {
        return setShowEditPMI(true);
      }
    }, (0, _i18n.t)('editSettings')))
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcSwitch, {
    "data-sign": "usePersonalMeetingId",
    disabled: isPersonalMeetingDisabled || disabled,
    checked: meeting.usePersonalMeetingId,
    onChange: function onChange(ev, checked) {
      switchUsePersonalMeetingId(checked);
    }
  }))));
};
exports.SchedulerMeetingPanel = SchedulerMeetingPanel;
//# sourceMappingURL=SchedulerMeetingPanel.js.map
