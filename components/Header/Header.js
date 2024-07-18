"use strict";

require("core-js/modules/es.array.includes");
require("core-js/modules/es.string.includes");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _ramda = require("ramda");
var _react = _interopRequireDefault(require("react"));
var _Button = require("../Button");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) { o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } } return t; }
var Header = function Header(_ref) {
  var className = _ref.className,
    onClick = _ref.onClick,
    buttons = _ref.buttons,
    children = _ref.children;
  var _addIndex = (0, _ramda.addIndex)(_ramda.reduce)(function (acc, _ref2, idx) {
      var hidden = _ref2.hidden,
        disabled = _ref2.disabled,
        placement = _ref2.placement,
        label = _ref2.label,
        props = _objectWithoutProperties(_ref2, ["hidden", "disabled", "placement", "label"]);
      if (!hidden) {
        var button = /*#__PURE__*/_react["default"].createElement(_Button.Button, _extends({
          key: idx,
          className: (0, _clsx["default"])(_styles["default"].button, disabled && _styles["default"].disabled),
          disabled: disabled
        }, props), label);
        if (placement === 'right') {
          acc.rightButtons.push(button);
        } else {
          acc.leftButtons.push(button);
        }
      }
      return acc;
    }, {
      leftButtons: [],
      rightButtons: []
    }, buttons),
    leftButtons = _addIndex.leftButtons,
    rightButtons = _addIndex.rightButtons;
  return /*#__PURE__*/_react["default"].createElement("header", {
    className: (0, _clsx["default"])(_styles["default"].root, className),
    onClick: onClick,
    "data-sign": "header"
  }, children ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].label,
    "data-sign": "headerTitle"
  }, children) : null, leftButtons.length ? /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].buttonGroup, _styles["default"].leftButtons)
  }, leftButtons) : null, rightButtons.length ? /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].buttonGroup, _styles["default"].rightButtons)
  }, rightButtons) : null);
};
exports.Header = Header;
Header.defaultProps = {
  buttons: []
};
//# sourceMappingURL=Header.js.map
