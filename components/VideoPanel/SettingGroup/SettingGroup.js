"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingGroup = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var SettingGroup = exports.SettingGroup = function SettingGroup(_ref) {
  var dataSign = _ref.dataSign,
    summary = _ref.summary,
    _ref$defaultExpanded = _ref.defaultExpanded,
    defaultExpanded = _ref$defaultExpanded === void 0 ? true : _ref$defaultExpanded,
    children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcAccordion, {
    classes: {
      root: _styles["default"].accordion
    },
    defaultExpanded: defaultExpanded,
    disabled: true
  }, summary ? /*#__PURE__*/_react["default"].createElement(_juno.RcAccordionSummary, {
    classes: {
      root: _styles["default"].accordionSummary,
      disabled: _styles["default"].accordionSummaryDisabled
    },
    "data-sign": "".concat(dataSign, "Summary")
  }, summary) : null, /*#__PURE__*/_react["default"].createElement(_juno.RcAccordionDetails, {
    classes: {
      root: _styles["default"].accordionDetails
    },
    "data-sign": "".concat(dataSign, "Details")
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcFormGroup, {
    classes: {
      root: _styles["default"].toggleGroup
    }
  }, children)));
};
//# sourceMappingURL=SettingGroup.js.map
