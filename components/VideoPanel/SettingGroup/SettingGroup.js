"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingGroup = void 0;

var _react = _interopRequireDefault(require("react"));

var _juno = require("@ringcentral/juno");

var _Accordion = require("@ringcentral/juno/components/Accordion");

var _AccordionDetails = require("@ringcentral/juno/components/Accordion/AccordionDetails");

var _AccordionSummary = require("@ringcentral/juno/components/Accordion/AccordionSummary");

var _ArrowDown = _interopRequireDefault(require("@ringcentral/juno/icon/ArrowDown2"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SettingGroup = function SettingGroup(_ref) {
  var dataSign = _ref.dataSign,
      summary = _ref.summary,
      expandable = _ref.expandable,
      _ref$defaultExpanded = _ref.defaultExpanded,
      defaultExpanded = _ref$defaultExpanded === void 0 ? true : _ref$defaultExpanded,
      children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement(_Accordion.RcAccordion, {
    classes: {
      root: _styles["default"].accordion
    },
    defaultExpanded: defaultExpanded,
    disabled: !expandable
  }, /*#__PURE__*/_react["default"].createElement(_AccordionSummary.RcAccordionSummary, {
    classes: {
      root: _styles["default"].accordionSummary,
      disabled: expandable ? null : _styles["default"].accordionSummaryDisabled
    },
    expandIcon: expandable ? _ArrowDown["default"] : undefined,
    "data-sign": "".concat(dataSign, "Summary")
  }, summary), /*#__PURE__*/_react["default"].createElement(_AccordionDetails.RcAccordionDetails, {
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
