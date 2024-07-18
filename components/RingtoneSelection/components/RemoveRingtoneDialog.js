"use strict";

require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveRingtoneDialog = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
var _i18n = require("../i18n");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var RemoveRingtoneDialog = function RemoveRingtoneDialog(_ref) {
  var name = _ref.name,
    open = _ref.open,
    onConfirm = _ref.onConfirm,
    onCancel = _ref.onCancel;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcDialog, {
    open: open
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcDialogContent, null, /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    "data-test-automation-id": "DialogTitle",
    variant: "body2",
    color: "neutral.f06"
  }, (0, _i18n.t)('confirmToDelete', {
    name: name
  }))), /*#__PURE__*/_react["default"].createElement(_juno.RcDialogActions, null, /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    variant: "text",
    "data-test-automation-id": "DialogCancelButton",
    onClick: onCancel
  }, (0, _i18n.t)('cancel')), /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    color: "danger.b03",
    "data-test-automation-id": "DialogOKButton",
    onClick: onConfirm
  }, (0, _i18n.t)('delete'))));
};
exports.RemoveRingtoneDialog = RemoveRingtoneDialog;
//# sourceMappingURL=RemoveRingtoneDialog.js.map
