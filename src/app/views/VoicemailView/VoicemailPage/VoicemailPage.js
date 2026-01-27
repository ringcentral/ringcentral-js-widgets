"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VoicemailPage = void 0;
var _components = require("@ringcentral-integration/micro-core/src/app/components");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _components2 = require("@ringcentral-integration/next-widgets/components");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _components3 = require("../../../components");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var VoicemailPage = exports.VoicemailPage = function VoicemailPage(_ref) {
  var _currentVoicemail$voi;
  var currentVoicemail = _ref.currentVoicemail,
    className = _ref.className,
    goBack = _ref.goBack,
    onDownload = _ref.onDownload,
    onStartLoad = _ref.onStartLoad,
    useConversationItemInfo = _ref.useConversationItemInfo,
    useActionsHandler = _ref.useActionsHandler,
    audioStatus = _ref.audioStatus,
    updateAudioStatus = _ref.updateAudioStatus,
    children = _ref.children;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var _useConversationItemI = useConversationItemInfo(currentVoicemail),
    info = _useConversationItemI.info,
    actions = _useConversationItemI.actions;
  var onAction = useActionsHandler(currentVoicemail, info, 'Voicemail detail page');
  var DisplayName = info.DisplayName,
    formattedPhoneNumber = info.formattedPhoneNumber,
    Avatar = info.Avatar,
    creationTime = info.creationTime,
    myCallerIdTitle = info.myCallerIdTitle,
    myCallerId = info.myCallerId;
  var buttons = (0, _components2.useHistoryActionButtons)(actions, onAction);
  var voicemailAttachmentUri = (_currentVoicemail$voi = currentVoicemail.voicemailAttachment) === null || _currentVoicemail$voi === void 0 ? void 0 : _currentVoicemail$voi.uri;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_components.AppHeaderNav, {
    override: true
  }, /*#__PURE__*/_react["default"].createElement(_components2.PageHeader, {
    onBackClick: goBack
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('mt-3 mb-4 flex flex-col gap-4 justify-center items-center', className),
    "data-sign": "contactDetail"
  }, /*#__PURE__*/_react["default"].createElement(Avatar, {
    size: "xxlarge"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col gap-2 items-center"
  }, /*#__PURE__*/_react["default"].createElement("h2", {
    className: "typography-title truncate w-full px-4 text-center text-neutral-b0 flex flex-col items-center gap-1"
  }, /*#__PURE__*/_react["default"].createElement(DisplayName, {
    displayControl: {
      maybe: true,
      matchCounts: true,
      align: 'center'
    }
  })), formattedPhoneNumber && /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex gap-1 items-center"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "typography-subtitle text-neutral-b2",
    title: formattedPhoneNumber
  }, formattedPhoneNumber), /*#__PURE__*/_react["default"].createElement(_components.CopyIconButtonSpring, {
    getText: function getText() {
      return formattedPhoneNumber;
    }
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex gap-6"
  }, /*#__PURE__*/_react["default"].createElement(_components2.ActionMenuList, {
    buttons: buttons,
    variant: "plain"
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "px-3 py-2",
    "data-sign": "toNumber"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Block, {
    className: "mb-2"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.BlockHeader, null, /*#__PURE__*/_react["default"].createElement("span", {
    className: "typography-descriptorMini"
  }, myCallerIdTitle), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-neutral-b2 typography-mainText"
  }, myCallerId, " (", t('me'), ")")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "px-3 py-2"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Block, {
    className: "mb-2"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.BlockHeader, null, /*#__PURE__*/_react["default"].createElement("span", {
    className: "typography-descriptorMini",
    "data-sign": "voicemailCreationTime"
  }, creationTime), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-neutral-b2"
  }, currentVoicemail.voicemailAttachment && voicemailAttachmentUri ? /*#__PURE__*/_react["default"].createElement(_components3.VoicemailPlayer, {
    "data-sign": "voicemailPlayer",
    uri: voicemailAttachmentUri,
    duration: currentVoicemail.voicemailAttachment.duration,
    onStartLoad: onStartLoad,
    onDownload: onDownload,
    audioStatus: audioStatus,
    updateAudioStatus: updateAudioStatus,
    loadSourceExternally: true
  }) : t('notAvailable'))))), /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "log-notes-transcript-section"
  }, children), /*#__PURE__*/_react["default"].createElement(_components.AppFooterNav, null));
};
VoicemailPage.displayName = 'VoicemailPage';
//# sourceMappingURL=VoicemailPage.js.map
