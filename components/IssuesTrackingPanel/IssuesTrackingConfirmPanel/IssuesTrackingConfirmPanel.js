"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IssuesTrackingCloseConfirmPanel = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireDefault(require("react"));
var _i18n = require("./i18n");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  .", " {\n    margin: ", ";\n    width: 100%;\n\n    header {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      margin: ", ";\n    }\n\n    main {\n      margin: ", ";\n    }\n\n    footer {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      margin: ", ";\n      gap: ", ";\n    }\n  }\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var modalClasses = {
  paper: 'issues-tracking-dialog-paper'
};
var IssuesTrackingGlobalStyle = (0, _juno.createGlobalStyle)(_templateObject(), modalClasses.paper, (0, _juno.spacing)(4), (0, _juno.spacing)(2, 2, 0, 4), (0, _juno.spacing)(2, 4), (0, _juno.spacing)(4), (0, _juno.spacing)(4));
var IssuesTrackingCloseConfirmPanel = function IssuesTrackingCloseConfirmPanel(_ref) {
  var open = _ref.open,
    onClose = _ref.onClose,
    onCancel = _ref.onCancel,
    onConfirm = _ref.onConfirm;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcDialog, {
    open: open,
    classes: modalClasses
  }, /*#__PURE__*/_react["default"].createElement(IssuesTrackingGlobalStyle, null), /*#__PURE__*/_react["default"].createElement("header", null, /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
    variant: "body2",
    color: "action.grayDark",
    component: "h2",
    weight: "bold",
    flexFull: true,
    "data-sign": "DialogTitle"
  }, (0, _i18n.t)('header')), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    "data-sign": "DialogCloseButton",
    symbol: _junoIcon.Close,
    onClick: function onClick() {
      return onClose();
    }
  }))), /*#__PURE__*/_react["default"].createElement("main", null, /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    color: "action.grayDark",
    "data-sign": "DialogContent"
  }, (0, _i18n.t)('content'))), /*#__PURE__*/_react["default"].createElement("footer", null, /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    radius: "round",
    variant: "outlined",
    fullWidth: true,
    onClick: function onClick(e) {
      return onCancel();
    },
    "data-sign": "DialogCancelButton"
  }, (0, _i18n.t)('cancel')), /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    radius: "round",
    onClick: function onClick(e) {
      return onConfirm();
    },
    variant: "contained",
    fullWidth: true,
    "data-sign": "DialogOKButton"
  }, (0, _i18n.t)('confirm'))));
};
exports.IssuesTrackingCloseConfirmPanel = IssuesTrackingCloseConfirmPanel;
//# sourceMappingURL=IssuesTrackingConfirmPanel.js.map
