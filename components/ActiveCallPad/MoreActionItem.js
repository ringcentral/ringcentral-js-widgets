"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MoreActionItem;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function MoreActionItem(_ref) {
  var title = _ref.title,
      Icon = _ref.icon,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      dataSign = _ref.dataSign;
  var iconClassName = (0, _classnames["default"])(_styles["default"].buttonIcon, disabled ? _styles["default"].buttonDisabled : _styles["default"].buttonActive);
  return _react["default"].createElement("div", {
    className: _styles["default"].buttonItem,
    onClick: disabled ? null : onClick
  }, _react["default"].createElement("div", {
    className: iconClassName,
    "data-sign": dataSign
  }, _react["default"].createElement(Icon, null)), _react["default"].createElement("div", {
    className: _styles["default"].buttonName
  }, title));
}

MoreActionItem.propTypes = {
  title: _propTypes["default"].string.isRequired,
  icon: _propTypes["default"].func.isRequired,
  disabled: _propTypes["default"].bool.isRequired,
  onClick: _propTypes["default"].func.isRequired,
  dataSign: _propTypes["default"].string
};
MoreActionItem.defaultProps = {
  dataSign: ''
};
//# sourceMappingURL=MoreActionItem.js.map
