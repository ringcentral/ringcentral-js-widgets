"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveRingtoneDialog = void 0;
require("core-js/modules/es.function.name.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("../i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var RemoveRingtoneDialog = exports.RemoveRingtoneDialog = function RemoveRingtoneDialog(_ref) {
  var name = _ref.name,
    open = _ref.open,
    onConfirm = _ref.onConfirm,
    onCancel = _ref.onCancel;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;

  // TODO: spring-ui Dialog in test show how never close, so we hide that in test
  if (process.env.NODE_ENV === 'test' && !open) {
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement(_springUi.Dialog, {
    open: open
  }, /*#__PURE__*/_react["default"].createElement(_springUi.DialogContent, null, /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
    "data-test-automation-id": "DialogTitle",
    className: "typography-subtitle text-neutral-b0",
    component: "p"
  }, t('confirmToDelete', {
    name: name
  }))), /*#__PURE__*/_react["default"].createElement(_springUi.DialogActions, null, /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
    variant: "text",
    "data-test-automation-id": "DialogCancelButton",
    onClick: onCancel
  }, t('cancel')), /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
    color: "danger",
    variant: "contained",
    "data-test-automation-id": "DialogOKButton",
    onClick: onConfirm
  }, t('delete'))));
};
//# sourceMappingURL=RemoveRingtoneDialog.js.map
