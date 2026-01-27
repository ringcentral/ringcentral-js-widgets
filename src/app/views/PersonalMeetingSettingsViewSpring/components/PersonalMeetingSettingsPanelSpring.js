"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalMeetingSettingsPanelSpring = void 0;
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
var _components = require("@ringcentral-integration/micro-core/src/app/components");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _components2 = require("@ringcentral-integration/next-widgets/components");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _GeneralMeetingSettings = require("../../GenericMeetingViewSpring/components/GeneralMeetingSettings");
var _i18n = _interopRequireDefault(require("../../GenericMeetingViewSpring/i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Skeleton components for loading states
var PersonalMeetingSettingsSkeleton = function PersonalMeetingSettingsSkeleton() {
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
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
    variant: "text",
    className: "w-full h-4"
  }), /*#__PURE__*/_react["default"].createElement("div", {
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
var PersonalMeetingSettingsPanelSpring = exports.PersonalMeetingSettingsPanelSpring = function PersonalMeetingSettingsPanelSpring(props) {
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var disabled = props.disabled,
    personalMeetingLink = props.personalMeetingLink,
    onBackClick = props.onBackClick,
    isLoading = props.isLoading,
    requirePassword = props.requirePassword,
    meetingPassword = props.meetingPassword,
    whoCanJoin = props.whoCanJoin,
    brandConfig = props.brandConfig,
    useWaitingRoom = props.useWaitingRoom,
    waitingRoomParticipants = props.waitingRoomParticipants,
    startMeetingAfterJoin = props.startMeetingAfterJoin,
    whoCanJoinOptions = props.whoCanJoinOptions,
    waitingRoomOptions = props.waitingRoomOptions,
    isJoinBeforeHostDisabled = props.isJoinBeforeHostDisabled,
    isWaitingRoomDisabled = props.isWaitingRoomDisabled,
    isWaitingRoomTypeDisabled = props.isWaitingRoomTypeDisabled,
    isAuthenticatedCanJoinDisabled = props.isAuthenticatedCanJoinDisabled,
    isAuthUserTypeDisabled = props.isAuthUserTypeDisabled,
    isRequirePasswordDisabled = props.isRequirePasswordDisabled,
    isRequirePasswordLocked = props.isRequirePasswordLocked,
    isJoinBeforeHostLocked = props.isJoinBeforeHostLocked,
    isWaitingRoomLocked = props.isWaitingRoomLocked,
    isAuthUserTypeLocked = props.isAuthUserTypeLocked,
    onRequirePasswordChange = props.onRequirePasswordChange,
    onPasswordChange = props.onPasswordChange,
    onWhoCanJoinChange = props.onWhoCanJoinChange,
    onUseWaitingRoomChange = props.onUseWaitingRoomChange,
    onWaitingRoomParticipantsChange = props.onWaitingRoomParticipantsChange,
    onStartMeetingAfterJoinChange = props.onStartMeetingAfterJoinChange;

  // Create props for GeneralMeetingSettings
  var generalMeetingSettingsProps = {
    requirePassword: requirePassword,
    meetingPassword: meetingPassword,
    whoCanJoin: whoCanJoin,
    useWaitingRoom: useWaitingRoom,
    waitingRoomParticipants: waitingRoomParticipants,
    startMeetingAfterJoin: startMeetingAfterJoin,
    whoCanJoinOptions: whoCanJoinOptions,
    waitingRoomOptions: waitingRoomOptions,
    disabled: disabled,
    isJoinBeforeHostDisabled: isJoinBeforeHostDisabled,
    isWaitingRoomDisabled: isWaitingRoomDisabled,
    isWaitingRoomTypeDisabled: isWaitingRoomTypeDisabled,
    isAuthenticatedCanJoinDisabled: isAuthenticatedCanJoinDisabled,
    isAuthUserTypeDisabled: isAuthUserTypeDisabled,
    isRequirePasswordDisabled: isRequirePasswordDisabled,
    // Add lock properties
    isRequirePasswordLocked: props.isRequirePasswordLocked,
    isJoinBeforeHostLocked: props.isJoinBeforeHostLocked,
    isWaitingRoomLocked: props.isWaitingRoomLocked,
    isAuthUserTypeLocked: props.isAuthUserTypeLocked,
    brandConfig: brandConfig
  };
  var generalMeetingSettingsFunctions = {
    onRequirePasswordChange: onRequirePasswordChange,
    onPasswordChange: onPasswordChange,
    onWhoCanJoinChange: onWhoCanJoinChange,
    onUseWaitingRoomChange: onUseWaitingRoomChange,
    onWaitingRoomParticipantsChange: onWaitingRoomParticipantsChange,
    onStartMeetingAfterJoinChange: onStartMeetingAfterJoinChange
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col h-full"
  }, /*#__PURE__*/_react["default"].createElement(_components.AppHeaderNav, {
    override: true
  }, /*#__PURE__*/_react["default"].createElement(_components2.PageHeader, {
    onBackClick: onBackClick
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "sui-text sui-text-root truncate",
    title: t('personalMeetingSettings')
  }, t('personalMeetingSettings')))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col flex-auto overflow-y-auto overflow-x-hidden px-3 py-3 gap-2"
  }, isLoading ? /*#__PURE__*/_react["default"].createElement(_springUi.SkeletonContainer, null, /*#__PURE__*/_react["default"].createElement(PersonalMeetingSettingsSkeleton, null)) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "typography-descriptor text-neutral-b2"
  }, t('personalMeetingSettingsDescription')), /*#__PURE__*/_react["default"].createElement(_GeneralMeetingSettings.GeneralMeetingSettings, _extends({}, generalMeetingSettingsProps, generalMeetingSettingsFunctions)))));
};
//# sourceMappingURL=PersonalMeetingSettingsPanelSpring.js.map
