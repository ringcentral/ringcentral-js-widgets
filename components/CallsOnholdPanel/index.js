"use strict";

require("core-js/modules/es.array.map");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _Combine = _interopRequireDefault(require("../../assets/images/Combine.svg"));
var _ActiveCallItemV = require("../ActiveCallItemV2");
var _BackButton = _interopRequireDefault(require("../BackButton"));
var _BackHeader = _interopRequireDefault(require("../BackHeader"));
var _CircleButton = _interopRequireDefault(require("../CircleButton"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var CallsOnholdContainer = function CallsOnholdContainer(_ref) {
  var calls = _ref.calls,
    currentLocale = _ref.currentLocale,
    areaCode = _ref.areaCode,
    countryCode = _ref.countryCode,
    brand = _ref.brand,
    showContactDisplayPlaceholder = _ref.showContactDisplayPlaceholder,
    autoLog = _ref.autoLog,
    showCallerIdName = _ref.showCallerIdName,
    webphoneAnswer = _ref.webphoneAnswer,
    webphoneReject = _ref.webphoneReject,
    webphoneHangup = _ref.webphoneHangup,
    webphoneResume = _ref.webphoneResume,
    webphoneToVoicemail = _ref.webphoneToVoicemail,
    enableContactFallback = _ref.enableContactFallback,
    sourceIcons = _ref.sourceIcons,
    phoneTypeRenderer = _ref.phoneTypeRenderer,
    phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
    disableMerge = _ref.disableMerge,
    onBackButtonClick = _ref.onBackButtonClick,
    onMerge = _ref.onMerge,
    onAdd = _ref.onAdd,
    getAvatarUrl = _ref.getAvatarUrl;
  var backHeader = /*#__PURE__*/_react["default"].createElement(_BackHeader["default"], {
    className: _styles["default"].header,
    onBackClick: onBackButtonClick,
    backButton: /*#__PURE__*/_react["default"].createElement(_BackButton["default"], {
      label: _i18n["default"].getString('activeCall', currentLocale)
    })
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root
  }, backHeader, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].callList
  }, calls.length ? calls.map(function (call) {
    return /*#__PURE__*/_react["default"].createElement(_ActiveCallItemV.ActiveCallItem, {
      call: call,
      key: call.id,
      showMergeCall: true,
      currentLocale: currentLocale,
      areaCode: areaCode,
      countryCode: countryCode,
      brand: brand,
      showCallerIdName: showCallerIdName,
      showContactDisplayPlaceholder: showContactDisplayPlaceholder,
      onMergeCall: onMerge
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      ,
      webphoneAnswer: webphoneAnswer
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      ,
      webphoneReject: webphoneReject
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      ,
      webphoneHangup: webphoneHangup
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      ,
      webphoneResume: webphoneResume
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      ,
      webphoneToVoicemail: webphoneToVoicemail,
      enableContactFallback: enableContactFallback,
      autoLog: autoLog,
      sourceIcons: sourceIcons,
      phoneTypeRenderer: phoneTypeRenderer,
      phoneSourceNameRenderer: phoneSourceNameRenderer,
      disableMerge: disableMerge,
      hasActionMenu: false,
      showAnswer: false,
      getAvatarUrl: getAvatarUrl,
      showHold: false
    });
  }) : /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].noCalls
  }, _i18n["default"].getString('noCalls', currentLocale))), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].addBtnContainer
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].addBtn
  }, /*#__PURE__*/_react["default"].createElement("span", {
    title: _i18n["default"].getString('add', currentLocale),
    className: _styles["default"].webphoneButton
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    className: _styles["default"].addBtnIcon,
    icon: _Combine["default"],
    showBorder: false,
    onClick: onAdd
  })))));
};
CallsOnholdContainer.defaultProps = {
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  enableContactFallback: undefined,
  autoLog: false,
  webphoneToVoicemail: undefined,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  onBackButtonClick: undefined,
  onAdd: undefined,
  onMerge: undefined,
  disableMerge: false,
  getAvatarUrl: function getAvatarUrl(i) {
    return i;
  }
};
var _default = CallsOnholdContainer;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
