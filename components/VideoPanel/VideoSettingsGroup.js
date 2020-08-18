"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoSettingsGroup = void 0;

var _react = _interopRequireDefault(require("react"));

var _rcui = require("@ringcentral-integration/rcui");

var _iconArrow_down = _interopRequireDefault(require("@ringcentral-integration/rcui/icons/icon-arrow_down.svg"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var VideoSettingsGroup = function VideoSettingsGroup(_ref) {
  var dateSign = _ref.dateSign,
      summary = _ref.summary,
      expandable = _ref.expandable,
      _ref$defaultExpanded = _ref.defaultExpanded,
      defaultExpanded = _ref$defaultExpanded === void 0 ? true : _ref$defaultExpanded,
      children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement(_rcui.RcExpansionPanel, {
    classes: {
      root: _styles["default"].expansionPanel
    },
    defaultExpanded: defaultExpanded,
    disabled: !expandable
  }, /*#__PURE__*/_react["default"].createElement(_rcui.RcExpansionPanelSummary, {
    classes: {
      root: _styles["default"].expansionPanelSummary,
      content: _styles["default"].expansionPanelSummaryContent,
      disabled: expandable ? null : _styles["default"].expansionPanelSummaryDisabled
    },
    expandIcon: expandable ? /*#__PURE__*/_react["default"].createElement(_rcui.RcIconButton, {
      variant: "round",
      symbol: _iconArrow_down["default"]
    }) : null,
    "data-sign": "".concat(dateSign, "Summary")
  }, summary), /*#__PURE__*/_react["default"].createElement(_rcui.RcExpansionPanelDetails, {
    classes: {
      root: _styles["default"].expansionPanelDetails
    },
    "data-sign": "".concat(dateSign, "Details"),
    className: _styles["default"].expansionPanelDetailsDirection
  }, children));
};

exports.VideoSettingsGroup = VideoSettingsGroup;
//# sourceMappingURL=VideoSettingsGroup.js.map
