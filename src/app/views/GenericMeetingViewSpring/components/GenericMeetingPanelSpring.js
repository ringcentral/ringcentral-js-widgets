"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericMeetingPanelSpring = void 0;
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.promise.finally.js");
var _components = require("@ringcentral-integration/micro-core/src/app/components");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _reactUse = require("react-use");
var _i18n = _interopRequireDefault(require("../i18n"));
var _GeneralMeetingSettings = require("./GeneralMeetingSettings");
var _MeetingConfigPanel = require("./MeetingConfigPanel");
var _PersonalMeetingSettingsSwitch = require("./PersonalMeetingSettingsSwitch");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// Skeleton components for loading states
var MeetingConfigPanelSkeleton = function MeetingConfigPanelSkeleton() {
  return /*#__PURE__*/_react["default"].createElement(_springUi.Block, {
    bordered: true,
    borderRadius: "small",
    padding: true,
    className: "w-full mx-auto",
    classes: {
      root: 'overflow-visible'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col gap-4 w-full"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col gap-1 w-full"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
    variant: "text",
    className: "w-24 h-4"
  }), /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
    variant: "rectangular",
    className: "w-full h-12"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col gap-1"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
    variant: "text",
    className: "w-16 h-4"
  }), /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
    variant: "rectangular",
    className: "w-full h-12"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex gap-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col gap-1 flex-1"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
    variant: "text",
    className: "w-16 h-4"
  }), /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
    variant: "rectangular",
    className: "w-full h-12"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col gap-1 flex-1"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
    variant: "text",
    className: "w-20 h-4"
  }), /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
    variant: "rectangular",
    className: "w-full h-12"
  }))), /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
    variant: "rectangular",
    className: "w-full h-12"
  })));
};
var GeneralMeetingSettingsSkeleton = function GeneralMeetingSettingsSkeleton() {
  return /*#__PURE__*/_react["default"].createElement(_springUi.Block, {
    bordered: true,
    borderRadius: "small",
    padding: true,
    className: "w-full mx-auto",
    classes: {
      root: 'overflow-visible'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col gap-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col flex-1"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
    variant: "text",
    className: "w-32 h-5"
  }), /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
    variant: "text",
    className: "w-48 h-4 mt-1"
  })), /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
    variant: "rectangular",
    className: "w-12 h-6"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col flex-1"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
    variant: "text",
    className: "w-24 h-5"
  }), /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
    variant: "rectangular",
    className: "w-full h-12 mt-1"
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col flex-1"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
    variant: "text",
    className: "w-28 h-5"
  }), /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
    variant: "text",
    className: "w-40 h-4 mt-1"
  })), /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
    variant: "rectangular",
    className: "w-12 h-6"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col flex-1"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
    variant: "text",
    className: "w-36 h-5"
  }), /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
    variant: "text",
    className: "w-44 h-4 mt-1"
  })), /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
    variant: "rectangular",
    className: "w-12 h-6"
  }))));
};
var PersonalMeetingSettingsSwitchSkeleton = function PersonalMeetingSettingsSwitchSkeleton() {
  return /*#__PURE__*/_react["default"].createElement(_springUi.Block, {
    bordered: true,
    borderRadius: "small",
    padding: true,
    className: "w-full mx-auto",
    classes: {
      root: 'overflow-visible'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col gap-1"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col flex-1 min-w-0"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
    variant: "text",
    className: "w-40 h-5"
  }), /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
    variant: "text",
    className: "w-56 h-4 mt-1"
  })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
    variant: "rectangular",
    className: "w-12 h-6"
  })))));
};
var GenericMeetingPanelSpring = exports.GenericMeetingPanelSpring = function GenericMeetingPanelSpring(props) {
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var isPersonalMeetingEnabled = props.isPersonalMeetingEnabled,
    disabled = props.disabled,
    init = props.init,
    personalMeetingLink = props.personalMeetingLink,
    onPersonalMeetingToggle = props.onPersonalMeetingToggle,
    viewPersonalMeetingSettings = props.viewPersonalMeetingSettings,
    navigationState = props.navigationState;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isLoading = _useState2[0],
    setIsLoading = _useState2[1];
  var mounted = (0, _reactUse.usePromise)();
  (0, _react.useEffect)(function () {
    if (init && navigationState !== '?from=personalMeetingSettings') {
      setIsLoading(true);
      mounted(init())["finally"](function () {
        setIsLoading(false);
      });
    }
  }, [init, mounted]);

  // When personal meeting is enabled, disable the general meeting settings
  var generalSettingsDisabled = disabled || isPersonalMeetingEnabled;

  // Extract props for MeetingConfigPanel
  var meetingConfigPanelProps = {
    meetingTitle: props.meetingTitle,
    meetingDate: props.meetingDate,
    meetingTime: props.meetingTime,
    meetingDuration: props.meetingDuration,
    hourOptions: props.hourOptions,
    minuteOptions: props.minuteOptions,
    disabled: props.disabled
  };
  var meetingConfigPanelFunctions = {
    onMeetingTitleChange: props.onMeetingTitleChange,
    onMeetingDateChange: props.onMeetingDateChange,
    onMeetingTimeChange: props.onMeetingTimeChange,
    onMeetingDurationChange: props.onMeetingDurationChange,
    onScheduleMeeting: props.onScheduleMeeting
  };

  // Extract props for GeneralMeetingSettings
  var generalMeetingSettingsProps = {
    requirePassword: props.requirePassword,
    meetingPassword: props.meetingPassword,
    whoCanJoin: props.whoCanJoin,
    useWaitingRoom: props.useWaitingRoom,
    waitingRoomParticipants: props.waitingRoomParticipants,
    startMeetingAfterJoin: props.startMeetingAfterJoin,
    whoCanJoinOptions: props.whoCanJoinOptions,
    waitingRoomOptions: props.waitingRoomOptions,
    disabled: generalSettingsDisabled,
    isJoinBeforeHostDisabled: props.isJoinBeforeHostDisabled,
    isWaitingRoomDisabled: props.isWaitingRoomDisabled,
    isWaitingRoomTypeDisabled: props.isWaitingRoomTypeDisabled,
    isAuthenticatedCanJoinDisabled: props.isAuthenticatedCanJoinDisabled,
    isAuthUserTypeDisabled: props.isAuthUserTypeDisabled,
    isRequirePasswordDisabled: props.isRequirePasswordDisabled,
    // Locked properties
    isRequirePasswordLocked: props.isRequirePasswordLocked,
    isJoinBeforeHostLocked: props.isJoinBeforeHostLocked,
    isWaitingRoomLocked: props.isWaitingRoomLocked,
    isAuthUserTypeLocked: props.isAuthUserTypeLocked,
    brandConfig: props.brandConfig
  };
  var generalMeetingSettingsFunctions = {
    onRequirePasswordChange: props.onRequirePasswordChange,
    onPasswordChange: props.onPasswordChange,
    onWhoCanJoinChange: props.onWhoCanJoinChange,
    onUseWaitingRoomChange: props.onUseWaitingRoomChange,
    onWaitingRoomParticipantsChange: props.onWaitingRoomParticipantsChange,
    onStartMeetingAfterJoinChange: props.onStartMeetingAfterJoinChange
  };

  // Extract props for PersonalMeetingSettingsSwitch
  var personalMeetingSettingsSwitchProps = {
    isPersonalMeetingEnabled: isPersonalMeetingEnabled,
    personalMeetingLink: personalMeetingLink,
    disabled: disabled
  };
  var personalMeetingSettingsSwitchFunctions = {
    onPersonalMeetingToggle: onPersonalMeetingToggle,
    viewPersonalMeetingSettings: viewPersonalMeetingSettings
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_components.AppHeaderNav, {
    title: t('video')
  }, null), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col flex-auto overflow-y-auto overflow-x-hidden px-3 py-3 gap-3",
    "data-sign": "videoConfigsPanel"
  }, isLoading ? /*#__PURE__*/_react["default"].createElement(_springUi.SkeletonContainer, {
    "data-sign": "videoConfigsPanelSkeleton"
  }, /*#__PURE__*/_react["default"].createElement(MeetingConfigPanelSkeleton, null), /*#__PURE__*/_react["default"].createElement(GeneralMeetingSettingsSkeleton, null), /*#__PURE__*/_react["default"].createElement(PersonalMeetingSettingsSwitchSkeleton, null)) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_MeetingConfigPanel.MeetingConfigPanel, _extends({}, meetingConfigPanelProps, meetingConfigPanelFunctions)), /*#__PURE__*/_react["default"].createElement(_GeneralMeetingSettings.GeneralMeetingSettings, _extends({}, generalMeetingSettingsProps, generalMeetingSettingsFunctions)), /*#__PURE__*/_react["default"].createElement(_PersonalMeetingSettingsSwitch.PersonalMeetingSettingsSwitch, _extends({}, personalMeetingSettingsSwitchProps, personalMeetingSettingsSwitchFunctions)))));
};
//# sourceMappingURL=GenericMeetingPanelSpring.js.map
