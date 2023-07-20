"use strict";

require("core-js/modules/es.array.map");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _MergeIntoConferenceIcon = _interopRequireDefault(require("../../assets/images/MergeIntoConferenceIcon.svg"));
var _CallAvatar = _interopRequireDefault(require("../CallAvatar"));
var _CircleButton = _interopRequireDefault(require("../CircleButton"));
var _Modal = _interopRequireDefault(require("../Modal"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ConfirmMergeModal = function ConfirmMergeModal(_ref) {
  var currentLocale = _ref.currentLocale,
    show = _ref.show,
    onMerge = _ref.onMerge,
    onCancel = _ref.onCancel,
    partyProfiles = _ref.partyProfiles;
  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
  var avatarUrls = partyProfiles.map(function (profile) {
    return profile.avatarUrl;
  });
  return /*#__PURE__*/_react["default"].createElement(_Modal["default"]
  // @ts-expect-error TS(2322): Type '{ children: Element[]; show: boolean; header... Remove this comment to see the full error message
  , {
    show: show,
    headerClassName: _styles["default"].header,
    currentLocale: currentLocale,
    className: _styles["default"].confirmMergeModal,
    modalClassName: _styles["default"].confirmMergeModal,
    cancelBtnClassName: _styles["default"].cancelBtn,
    confirmBtnClassName: _styles["default"].confirmBtn,
    title: _i18n["default"].getString('confirmation', currentLocale),
    onCancel: onCancel,
    footerClassName: _styles["default"].footer
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].contentText
  }, _i18n["default"].getString('confirmMergeToConference', currentLocale)), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].content
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].contentText
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].avatar
  }, /*#__PURE__*/_react["default"].createElement(_CallAvatar["default"], {
    avatarUrl: avatarUrls[0],
    isOnConferenceCall: true,
    extraNum: avatarUrls.length - 1
  })), /*#__PURE__*/_react["default"].createElement("span", null, _i18n["default"].getString('conferenceCall', currentLocale))), /*#__PURE__*/_react["default"].createElement("span", {
    title: _i18n["default"].getString('mergeToConference', currentLocale),
    className: _styles["default"].webphoneButton
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    className: _styles["default"].mergeButton,
    onClick: function onClick(e) {
      e.stopPropagation();
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      onMerge();
    },
    iconWidth: 260,
    iconX: 120,
    icon: _MergeIntoConferenceIcon["default"],
    showBorder: false
  }))));
};
ConfirmMergeModal.defaultProps = {
  onMerge: function onMerge() {},
  onCancel: function onCancel() {},
  partyProfiles: []
};
var _default = ConfirmMergeModal;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
