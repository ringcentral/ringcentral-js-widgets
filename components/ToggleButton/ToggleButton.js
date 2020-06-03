"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleButton = void 0;

var _rcui = require("@ringcentral-integration/rcui");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _style = _interopRequireDefault(require("./style.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ToggleButton = function ToggleButton(_ref) {
  var label = _ref.label,
      checked = _ref.checked,
      onChange = _ref.onChange,
      _ref$classes = _ref.classes,
      classes = _ref$classes === void 0 ? {} : _ref$classes;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_style["default"].container, classes.root)
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _style["default"].label
  }, label), /*#__PURE__*/_react["default"].createElement(_rcui.RcSwitch, {
    color: "primary",
    checked: checked,
    onChange: onChange
  }));
};

exports.ToggleButton = ToggleButton;
//# sourceMappingURL=ToggleButton.js.map
