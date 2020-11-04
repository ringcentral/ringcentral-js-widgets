"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoSettingGroup = void 0;

var _react = _interopRequireDefault(require("react"));

var _juno = require("@ringcentral/juno");

var _iconArrow_down = _interopRequireDefault(require("@ringcentral/juno/icons/icon-arrow_down.svg"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var VideoSettingGroup = function VideoSettingGroup(_ref) {
  var dataSign = _ref.dataSign,
      summary = _ref.summary,
      expandable = _ref.expandable,
      _ref$defaultExpanded = _ref.defaultExpanded,
      defaultExpanded = _ref$defaultExpanded === void 0 ? true : _ref$defaultExpanded,
      children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcExpansionPanel, {
    classes: {
      root: _styles["default"].expansionPanel
    },
    defaultExpanded: defaultExpanded,
    disabled: !expandable
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcExpansionPanelSummary, {
    classes: {
      root: _styles["default"].expansionPanelSummary,
      content: _styles["default"].expansionPanelSummaryContent,
      disabled: expandable ? null : _styles["default"].expansionPanelSummaryDisabled
    },
    expandIcon: expandable ? /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
      variant: "round",
      symbol: _iconArrow_down["default"]
    }) : null,
    "data-sign": "".concat(dataSign, "Summary")
  }, summary), /*#__PURE__*/_react["default"].createElement(_juno.RcExpansionPanelDetails, {
    classes: {
      root: _styles["default"].expansionPanelDetails
    },
    "data-sign": "".concat(dataSign, "Details"),
    className: _styles["default"].expansionPanelDetailsDirection
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcFormGroup, {
    classes: {
      root: _styles["default"].toggleGroup
    }
  }, children)));
};

exports.VideoSettingGroup = VideoSettingGroup;
//# sourceMappingURL=VideoSettingGroup.js.map
