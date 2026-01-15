"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.StyledTab = void 0;
var _juno = require("@ringcentral/juno");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
var _templateObject, _templateObject2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var tabColor = (0, _juno.palette2)('tab', 'selected');
var StyledTab = exports.StyledTab = _juno.styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  ", ";\n"])), function (_ref) {
  var $active = _ref.$active;
  return $active && (0, _juno.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n      color: ", ";\n      border-bottom: 1px solid ", ";\n    "])), tabColor, tabColor);
});
var NavigationButton = function NavigationButton(_ref2) {
  var active = _ref2.active,
    icon = _ref2.icon,
    label = _ref2.label,
    noticeCounts = _ref2.noticeCounts,
    onClick = _ref2.onClick,
    width = _ref2.width,
    fullSizeInk = _ref2.fullSizeInk;
  var notice = null;
  if (noticeCounts && noticeCounts > 0) {
    if (noticeCounts > 99) {
      notice = /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "noticeCounts",
        className: _styles["default"].notices
      }, "99+");
    } else {
      notice = /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "noticeCounts",
        className: _styles["default"].notice
      }, noticeCounts);
    }
  }
  return /*#__PURE__*/_react["default"].createElement(StyledTab, {
    onClick: onClick,
    className: (0, _clsx["default"])(_styles["default"].navigationButton, active && _styles["default"].active, fullSizeInk ? null : _styles["default"].linearBorder),
    $active: !!active,
    style: {
      width: width
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].iconHolder,
    title: label,
    "data-sign": label
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].icon
  }, icon, " ", notice)));
};
NavigationButton.defaultProps = {
  active: false,
  label: undefined,
  noticeCounts: undefined,
  onClick: undefined,
  fullSizeInk: true
};
var _default = exports["default"] = NavigationButton;
//# sourceMappingURL=MessageTabButton.js.map
