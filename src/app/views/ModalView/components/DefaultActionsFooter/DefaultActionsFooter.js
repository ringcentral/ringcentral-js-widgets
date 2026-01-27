"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultActionsFooter = void 0;
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
var _Button = require("@ringcentral/juno/es6/components/Buttons/Button/Button.js");
var _DialogActions = require("@ringcentral/juno/es6/components/Dialog/DialogActions/DialogActions.js");
var _react = _interopRequireDefault(require("react"));
var _contexts = require("../../ModalItemView/contexts");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var DefaultActionsFooter = exports.DefaultActionsFooter = function DefaultActionsFooter() {
  var _useModalItemView = (0, _contexts.useModalItemView)(),
    _useModalItemView$pro = _useModalItemView.props,
    ActionsProps = _useModalItemView$pro.ActionsProps,
    cancelButtonText = _useModalItemView$pro.cancelButtonText,
    onConfirm = _useModalItemView$pro.onConfirm,
    onCancel = _useModalItemView$pro.onCancel,
    childrenSize = _useModalItemView$pro.childrenSize,
    loading = _useModalItemView$pro.loading,
    cancelButtonProps = _useModalItemView$pro.cancelButtonProps,
    confirmButtonText = _useModalItemView$pro.confirmButtonText,
    confirmButtonProps = _useModalItemView$pro.confirmButtonProps;
  var isXsmall = childrenSize === 'small';
  return /*#__PURE__*/_react["default"].createElement(_DialogActions.RcDialogActions, ActionsProps, cancelButtonText && /*#__PURE__*/_react["default"].createElement(_Button.RcButton, _extends({
    "data-sign": "DialogCancelButton",
    fullWidth: isXsmall,
    variant: "text",
    onClick: function onClick(e) {
      return onCancel === null || onCancel === void 0 ? void 0 : onCancel(e, 'cancelClick');
    },
    disabled: loading
  }, cancelButtonProps), cancelButtonText), confirmButtonText && /*#__PURE__*/_react["default"].createElement(_Button.RcButton, _extends({
    "data-sign": "DialogConfirmButton",
    fullWidth: isXsmall,
    onClick: onConfirm,
    variant: "contained",
    disabled: loading,
    loading: loading
  }, confirmButtonProps), confirmButtonText));
};
//# sourceMappingURL=DefaultActionsFooter.js.map
