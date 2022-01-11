"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MoreActionItem = function MoreActionItem(_ref) {
  var title = _ref.title,
      Icon = _ref.icon,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      dataSign = _ref.dataSign;
  var iconClassName = (0, _classnames["default"])(_styles["default"].buttonIcon, disabled ? _styles["default"].buttonDisabled : _styles["default"].buttonActive);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].buttonItem,
    onClick: disabled ? null : onClick
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: iconClassName,
    "data-sign": dataSign
  }, /*#__PURE__*/_react["default"].createElement(Icon, null)), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].buttonName
  }, title));
};

MoreActionItem.defaultProps = {
  dataSign: ''
};
var _default = MoreActionItem;
exports["default"] = _default;
//# sourceMappingURL=MoreActionItem.js.map
