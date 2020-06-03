"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ConfirmMergeModal;

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _Modal = _interopRequireDefault(require("../Modal"));

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

var _CallAvatar = _interopRequireDefault(require("../CallAvatar"));

var _MergeIntoConferenceIcon = _interopRequireDefault(require("../../assets/images/MergeIntoConferenceIcon.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ConfirmMergeModal(_ref) {
  var currentLocale = _ref.currentLocale,
      show = _ref.show,
      onMerge = _ref.onMerge,
      onCancel = _ref.onCancel,
      partyProfiles = _ref.partyProfiles;
  var avatarUrls = partyProfiles.map(function (profile) {
    return profile.avatarUrl;
  });
  return /*#__PURE__*/_react["default"].createElement(_Modal["default"], {
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
      onMerge();
    },
    iconWidth: 260,
    iconX: 120,
    icon: _MergeIntoConferenceIcon["default"],
    showBorder: false
  }))));
}

ConfirmMergeModal.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  show: _propTypes["default"].bool.isRequired,
  onMerge: _propTypes["default"].func,
  onCancel: _propTypes["default"].func,
  partyProfiles: _propTypes["default"].arrayOf(_propTypes["default"].object)
};
ConfirmMergeModal.defaultProps = {
  onMerge: function onMerge() {},
  onCancel: function onCancel() {},
  partyProfiles: []
};
//# sourceMappingURL=index.js.map
