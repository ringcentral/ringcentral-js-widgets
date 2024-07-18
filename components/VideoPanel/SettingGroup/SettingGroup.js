"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingGroup = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var SettingGroup = function SettingGroup(_ref) {
  var dataSign = _ref.dataSign,
    summary = _ref.summary,
    expandable = _ref.expandable,
    _ref$defaultExpanded = _ref.defaultExpanded,
    defaultExpanded = _ref$defaultExpanded === void 0 ? true : _ref$defaultExpanded,
    children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcAccordion, {
    classes: {
      root: _styles["default"].accordion
    },
    defaultExpanded: defaultExpanded,
    disabled: !expandable
  }, summary ? /*#__PURE__*/_react["default"].createElement(_juno.RcAccordionSummary, {
    classes: {
      root: _styles["default"].accordionSummary,
      // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
      disabled: expandable ? null : _styles["default"].accordionSummaryDisabled
    },
    expandIcon: expandable ? _junoIcon.ArrowDown2 : undefined,
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
exports.SettingGroup = SettingGroup;
//# sourceMappingURL=SettingGroup.js.map
