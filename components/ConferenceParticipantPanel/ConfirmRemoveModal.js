"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ConfirmRemoveModal;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _calleeTypes = _interopRequireDefault(require("ringcentral-integration/enums/calleeTypes"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _Modal = _interopRequireDefault(require("../Modal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ConfirmRemoveModal(_ref) {
  var currentLocale = _ref.currentLocale,
      show = _ref.show,
      onRemove = _ref.onRemove,
      onCancel = _ref.onCancel,
      detail = _ref.detail;

  if (!detail) {
    return null;
  }

  var displayText = detail.partyNumber || _i18n["default"].getString('unknownNumber', currentLocale);

  if (detail.partyName && detail.calleeType === _calleeTypes["default"].contacts) {
    // means that matched a contact
    displayText = detail.partyName;
  }

  return /*#__PURE__*/_react["default"].createElement(_Modal["default"], {
    show: show,
    headerClassName: _styles["default"].header,
    currentLocale: currentLocale,
    className: _styles["default"].ConfirmRemoveModal,
    modalClassName: _styles["default"].ConfirmRemoveModal,
    maskClassName: _styles["default"].confirmRemoveModalMask,
    title: _i18n["default"].getString('removeParticipant', currentLocale),
    onConfirm: onRemove,
    onCancel: onCancel,
    clickOutToClose: true,
    contentClassName: _styles["default"].contentText,
    textConfirm: _i18n["default"].getString('remove', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement("p", null, _i18n["default"].getString('confirmStr1', currentLocale), /*#__PURE__*/_react["default"].createElement("span", null, " ".concat(displayText, " ")), _i18n["default"].getString('confirmStr2', currentLocale)));
}

ConfirmRemoveModal.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  show: _propTypes["default"].bool.isRequired,
  onCancel: _propTypes["default"].func,
  onRemove: _propTypes["default"].func,
  detail: _propTypes["default"].object
};
ConfirmRemoveModal.defaultProps = {
  onRemove: function onRemove() {},
  onCancel: function onCancel() {},
  detail: null
};
//# sourceMappingURL=ConfirmRemoveModal.js.map
