"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.keys");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeetingSettingsCard = void 0;
var _RcVideo = require("@ringcentral-integration/commons/modules/RcVideo");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _AdaptiveTypography = require("./AdaptiveTypography");
var _i18n = require("./i18n");
var _styled = require("./styled");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MeetingSettingsCard = function MeetingSettingsCard(props) {
  var _meeting$settingLock3, _meeting$settingLock4, _meeting$settingLock5, _meeting$settingLock6, _meeting$settingLock7, _meeting$settingLock8, _meeting$settingLock9, _meeting$settingLock10;
  var meeting = props.meeting,
    brandConfig = props.brandConfig,
    onPasswordChangeClick = props.onPasswordChangeClick,
    updateMeetingSettings = props.updateMeetingSettings,
    trackSettingChanges = props.trackSettingChanges,
    isJoinBeforeHostDisabled = props.isJoinBeforeHostDisabled,
    isWaitingRoomTypeDisabled = props.isWaitingRoomTypeDisabled,
    isWaitingRoomDisabled = props.isWaitingRoomDisabled,
    isRequirePasswordDisabled = props.isRequirePasswordDisabled,
    isEditPasswordDisabled = props.isEditPasswordDisabled,
    isWaitingRoomNotCoworkerDisabled = props.isWaitingRoomNotCoworkerDisabled,
    isWaitingRoomGuestDisabled = props.isWaitingRoomGuestDisabled,
    isAuthenticatedCanJoinDisabled = props.isAuthenticatedCanJoinDisabled,
    _props$useSimpleRcv = props.useSimpleRcv,
    useSimpleRcv = _props$useSimpleRcv === void 0 ? false : _props$useSimpleRcv;
  var update = (0, _react.useCallback)(function (options, itemName) {
    updateMeetingSettings(_objectSpread(_objectSpread({}, meeting), options));
    trackSettingChanges && itemName && trackSettingChanges(itemName);
  }, [meeting, updateMeetingSettings, trackSettingChanges]);
  var allowMeetingAccess = !meeting.isOnlyAuthUserJoin ? _RcVideo.ALLOW_MEETING_ACCESS.ANYONE_WITH_LINK : meeting.isOnlyCoworkersJoin ? _RcVideo.ALLOW_MEETING_ACCESS.SIGNED_IN_CO_WORKERS : _RcVideo.ALLOW_MEETING_ACCESS.SIGNED_IN_USERS;
  var waitingRoomModeValue = meeting.waitingRoomMode;

  // Determine if this is a new meeting vs existing meeting
  var isNewMeeting = !meeting.id;
  (0, _react.useEffect)(function () {
    var _meeting$settingLock, _meeting$settingLock2;
    if (!useSimpleRcv) return;
    var updates = {};

    // Migrate "Only RingCentral accounts" → "Only my coworkers"
    // Only if: has legacy value AND not locked by admin
    if (isNewMeeting && meeting.isOnlyAuthUserJoin && !meeting.isOnlyCoworkersJoin && !((_meeting$settingLock = meeting.settingLock) === null || _meeting$settingLock === void 0 ? void 0 : _meeting$settingLock.isOnlyAuthUserJoin)) {
      updates.isOnlyAuthUserJoin = true;
      updates.isOnlyCoworkersJoin = true;
    }

    // Migrate "For anyone not signed in" → "For anyone outside my company"
    // Only if: NEW meeting AND has legacy value AND not locked by admin
    if (isNewMeeting && meeting.waitingRoomMode === _RcVideo.RCV_WAITING_ROOM_MODE.guests && !((_meeting$settingLock2 = meeting.settingLock) === null || _meeting$settingLock2 === void 0 ? void 0 : _meeting$settingLock2.waitingRoomMode)) {
      updates.waitingRoomMode = _RcVideo.RCV_WAITING_ROOM_MODE.notcoworker;
    }

    // Only update if there are actual migrations needed
    if (Object.keys(updates).length > 0) {
      update(updates);
    }
  }, [useSimpleRcv, isNewMeeting, meeting.isOnlyAuthUserJoin, meeting.isOnlyCoworkersJoin, meeting.waitingRoomMode, (_meeting$settingLock3 = meeting.settingLock) === null || _meeting$settingLock3 === void 0 ? void 0 : _meeting$settingLock3.isOnlyAuthUserJoin, (_meeting$settingLock4 = meeting.settingLock) === null || _meeting$settingLock4 === void 0 ? void 0 : _meeting$settingLock4.waitingRoomMode, update]);
  return /*#__PURE__*/_react["default"].createElement(_styled.StyledRcCard, {
    variant: "outlined"
  }, /*#__PURE__*/_react["default"].createElement(_styled.StyledListItem, {
    canHover: false,
    button: false,
    divider: true,
    "data-sign": "passwordField",
    disabled: isRequirePasswordDisabled
  }, /*#__PURE__*/_react["default"].createElement(_styled.StyledListItemText, {
    primary: /*#__PURE__*/_react["default"].createElement(_AdaptiveTypography.AdaptiveTypography, {
      title: (0, _i18n.t)('requirePassword'),
      isLock: (_meeting$settingLock5 = meeting.settingLock) === null || _meeting$settingLock5 === void 0 ? void 0 : _meeting$settingLock5.isMeetingSecret
    }),
    secondary: /*#__PURE__*/_react["default"].createElement(_styled.StyledPasswordDescription, {
      display: "flex",
      flexDirection: "column",
      maxWidth: "230px"
    }, (0, _i18n.t)('requirePasswordDescription'), meeting.isMeetingSecret && /*#__PURE__*/_react["default"].createElement(_juno.RcBox, {
      display: "flex",
      alignItems: "center",
      "data-sign": "editPasswordField"
    }, (0, _i18n.t)('password'), "\xA0", /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
      variant: "caption1",
      color: "neutral.b04",
      weight: "bold"
    }, meeting.meetingPassword), /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
      variant: "caption1",
      underline: true,
      onClick: onPasswordChangeClick,
      disabled: isEditPasswordDisabled
    }, (0, _i18n.t)('edit'))))
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcSwitch, {
    "data-sign": "requirePassword",
    checked: meeting.isMeetingSecret,
    disabled: isRequirePasswordDisabled,
    onChange: function onChange() {
      var next = !meeting.isMeetingSecret;
      update({
        isMeetingSecret: next
      }, _RcVideo.RCV_ITEM_NAME.isMeetingSecret);
    }
  })), /*#__PURE__*/_react["default"].createElement(_styled.StyledVerticalListItem, {
    canHover: false,
    button: false,
    divider: true,
    "data-sign": "allowMeetingAccessField",
    disabled: isAuthenticatedCanJoinDisabled
  }, /*#__PURE__*/_react["default"].createElement(_styled.StyledListItemText, {
    primary: /*#__PURE__*/_react["default"].createElement(_AdaptiveTypography.AdaptiveTypography, {
      title: (0, _i18n.t)('allowMeetingAccess'),
      isLock: (_meeting$settingLock6 = meeting.settingLock) === null || _meeting$settingLock6 === void 0 ? void 0 : _meeting$settingLock6.isOnlyAuthUserJoin
    })
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, {
    size: "large",
    variant: "box",
    fullWidth: true,
    "data-sign": "allowMeetingAccess",
    value: allowMeetingAccess,
    onOpen: function onOpen() {
      // When user opens dropdown for existing meeting with legacy value,
      // automatically migrate it to the new equivalent
      if (useSimpleRcv && meeting.id && meeting.isOnlyAuthUserJoin && !meeting.isOnlyCoworkersJoin) {
        update({
          isOnlyAuthUserJoin: true,
          isOnlyCoworkersJoin: true // Auto-migrate to "Only my coworkers"
        }, _RcVideo.RCV_ITEM_NAME.isOnlyAuthUserJoin);
      }
    },
    onChange: function onChange(e) {
      var selectedValue = e.target.value;
      switch (selectedValue) {
        case _RcVideo.ALLOW_MEETING_ACCESS.ANYONE_WITH_LINK:
          update({
            isOnlyAuthUserJoin: false,
            isOnlyCoworkersJoin: false
          }, _RcVideo.RCV_ITEM_NAME.isOnlyAuthUserJoin);
          break;
        case _RcVideo.ALLOW_MEETING_ACCESS.SIGNED_IN_CO_WORKERS:
          update({
            isOnlyAuthUserJoin: true,
            isOnlyCoworkersJoin: true
          }, _RcVideo.RCV_ITEM_NAME.isOnlyAuthUserJoin);
          break;
      }
    },
    disabled: isAuthenticatedCanJoinDisabled
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
    value: _RcVideo.ALLOW_MEETING_ACCESS.ANYONE_WITH_LINK,
    title: (0, _i18n.t)('anyoneWithLink')
  }, (0, _i18n.t)('anyoneWithLink')), (!useSimpleRcv || ((_meeting$settingLock7 = meeting.settingLock) === null || _meeting$settingLock7 === void 0 ? void 0 : _meeting$settingLock7.isOnlyAuthUserJoin) || meeting.id && meeting.isOnlyAuthUserJoin && !meeting.isOnlyCoworkersJoin) && /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
    value: _RcVideo.ALLOW_MEETING_ACCESS.SIGNED_IN_USERS
    // @ts-expect-error
    ,
    title: (0, _i18n.t)('signedInUsers', {
      shortName: brandConfig.shortName
    })
  }, (0, _i18n.t)('signedInUsers', {
    shortName: brandConfig.shortName
  })), /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
    value: _RcVideo.ALLOW_MEETING_ACCESS.SIGNED_IN_CO_WORKERS,
    title: (0, _i18n.t)('signedInCoWorkers')
  }, (0, _i18n.t)('signedInCoWorkers')))), /*#__PURE__*/_react["default"].createElement(_styled.StyledListItem, {
    component: "div",
    canHover: false,
    button: false,
    divider: true,
    "data-sign": "waitingRoomField",
    disabled: isWaitingRoomDisabled
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcBox, {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcBox, {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }, /*#__PURE__*/_react["default"].createElement(_styled.StyledListItemText, {
    primary: /*#__PURE__*/_react["default"].createElement(_AdaptiveTypography.AdaptiveTypography, {
      title: (0, _i18n.t)('waitingRoomTitle'),
      isLock: (_meeting$settingLock8 = meeting.settingLock) === null || _meeting$settingLock8 === void 0 ? void 0 : _meeting$settingLock8.waitingRoomMode
    }),
    secondary: (0, _i18n.t)('waitingRoomDescription')
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcSwitch, {
    "data-sign": "enableWaitingRoom",
    checked: !!meeting.waitingRoomMode,
    disabled: isWaitingRoomDisabled,
    onChange: function onChange(ev, checked) {
      update({
        waitingRoomMode: checked ? _RcVideo.RCV_WAITING_ROOM_MODE.notcoworker : _RcVideo.RCV_WAITING_ROOM_MODE.off
      }, _RcVideo.RCV_ITEM_NAME.waitingRoomMode);
    }
  })), !!meeting.waitingRoomMode && /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, {
    size: "large",
    variant: "box",
    "data-sign": "waitingRoom",
    className: _styles["default"].boxSelect,
    fullWidth: true,
    disabled: isWaitingRoomTypeDisabled,
    onOpen: function onOpen() {
      // When user opens dropdown for existing meeting with legacy value,
      // automatically migrate it to the new equivalent
      if (useSimpleRcv && meeting.id && meeting.waitingRoomMode === _RcVideo.RCV_WAITING_ROOM_MODE.guests) {
        update({
          waitingRoomMode: _RcVideo.RCV_WAITING_ROOM_MODE.notcoworker // Auto-migrate to "For anyone outside my company"
        }, _RcVideo.RCV_ITEM_NAME.waitingRoomType);
      }
    },
    onChange: function onChange(e) {
      var waitingRoomValue = e.target.value;
      update({
        waitingRoomMode: waitingRoomValue
      }, _RcVideo.RCV_ITEM_NAME.waitingRoomType);
    },
    value: waitingRoomModeValue
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
    "data-sign": "waitingRoomAll",
    value: _RcVideo.RCV_WAITING_ROOM_MODE.all,
    className: _styles["default"].boxSelectMenuItem,
    title: (0, _i18n.t)('waitingRoomAll')
  }, (0, _i18n.t)('waitingRoomAll')), /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
    "data-sign": "waitingRoomNotCoworker",
    disabled: isWaitingRoomNotCoworkerDisabled,
    value: _RcVideo.RCV_WAITING_ROOM_MODE.notcoworker,
    className: _styles["default"].boxSelectMenuItem,
    title: (0, _i18n.t)('waitingRoomNotCoworker')
  }, (0, _i18n.t)('waitingRoomNotCoworker')), (!useSimpleRcv || ((_meeting$settingLock9 = meeting.settingLock) === null || _meeting$settingLock9 === void 0 ? void 0 : _meeting$settingLock9.waitingRoomMode) || meeting.id && meeting.waitingRoomMode === _RcVideo.RCV_WAITING_ROOM_MODE.guests) && /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
    "data-sign": "waitingRoomGuest",
    disabled: isWaitingRoomGuestDisabled,
    value: _RcVideo.RCV_WAITING_ROOM_MODE.guests,
    className: _styles["default"].boxSelectMenuItem,
    title: (0, _i18n.t)('waitingRoomGuest')
  }, (0, _i18n.t)('waitingRoomGuest'))))), /*#__PURE__*/_react["default"].createElement(_styled.StyledListItem, {
    canHover: false,
    button: false,
    "data-sign": "jbhField",
    disabled: isJoinBeforeHostDisabled
  }, /*#__PURE__*/_react["default"].createElement(_styled.StyledListItemText, {
    primary: /*#__PURE__*/_react["default"].createElement(_AdaptiveTypography.AdaptiveTypography, {
      title: (0, _i18n.t)('onlyJoinAfterMe'),
      isLock: (_meeting$settingLock10 = meeting.settingLock) === null || _meeting$settingLock10 === void 0 ? void 0 : _meeting$settingLock10.allowJoinBeforeHost
    }),
    secondary: (0, _i18n.t)('allowJoinBeforeHostDescription')
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcSwitch, {
    "data-sign": "allowJoinBeforeHost",
    checked: !meeting.allowJoinBeforeHost,
    disabled: isJoinBeforeHostDisabled,
    onChange: function onChange() {
      update({
        allowJoinBeforeHost: !meeting.allowJoinBeforeHost
      }, _RcVideo.RCV_ITEM_NAME.allowJoinBeforeHost);
    }
  })));
};
exports.MeetingSettingsCard = MeetingSettingsCard;
//# sourceMappingURL=MeetingSettingsCard.js.map
