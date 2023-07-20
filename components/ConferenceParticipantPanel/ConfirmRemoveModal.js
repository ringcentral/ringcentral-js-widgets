"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _calleeTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/calleeTypes"));
var _Modal = _interopRequireDefault(require("../Modal"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ConfirmRemoveModal = function ConfirmRemoveModal(_ref) {
  var currentLocale = _ref.currentLocale,
    show = _ref.show,
    onRemove = _ref.onRemove,
    onCancel = _ref.onCancel,
    detail = _ref.detail;
  if (!detail) {
    return null;
  }
  var displayText =
  // @ts-expect-error TS(2339): Property 'partyNumber' does not exist on type 'obj... Remove this comment to see the full error message
  detail.partyNumber || _i18n["default"].getString('unknownNumber', currentLocale);
  // @ts-expect-error TS(2339): Property 'partyName' does not exist on type 'objec... Remove this comment to see the full error message
  if (detail.partyName && detail.calleeType === _calleeTypes["default"].contacts) {
    // means that matched a contact
    // @ts-expect-error TS(2339): Property 'partyName' does not exist on type 'objec... Remove this comment to see the full error message
    displayText = detail.partyName;
  }
  return /*#__PURE__*/_react["default"].createElement(_Modal["default"]
  // @ts-expect-error TS(2322): Type '{ children: Element; show: boolean; headerCl... Remove this comment to see the full error message
  , {
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
};
ConfirmRemoveModal.defaultProps = {
  onRemove: function onRemove() {},
  onCancel: function onCancel() {},
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'object | un... Remove this comment to see the full error message
  detail: null
};
var _default = ConfirmRemoveModal;
exports["default"] = _default;
//# sourceMappingURL=ConfirmRemoveModal.js.map
