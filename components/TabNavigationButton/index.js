"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = NavigationButton;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function NavigationButton(_ref) {
  var active = _ref.active,
      activeIcon = _ref.activeIcon,
      icon = _ref.icon,
      label = _ref.label,
      noticeCounts = _ref.noticeCounts,
      onClick = _ref.onClick,
      width = _ref.width,
      height = _ref.height,
      keepStyle = _ref.keepStyle,
      activeClassName = _ref.activeClassName,
      inActiveClassName = _ref.inActiveClassName;
  var notice = null;

  if (noticeCounts && noticeCounts > 0) {
    if (noticeCounts > 99) {
      notice = _react["default"].createElement("div", {
        className: _styles["default"].notices
      }, "99+");
    } else {
      notice = _react["default"].createElement("div", {
        className: _styles["default"].notice
      }, noticeCounts);
    }
  }

  var styleClass = !keepStyle ? _styles["default"].iconStyles : null;
  var activationClassName = active ? activeClassName : inActiveClassName;
  return _react["default"].createElement("div", {
    onClick: onClick,
    className: (0, _classnames["default"])(_styles["default"].navigationButton, active && _styles["default"].active),
    style: {
      width: width,
      height: height
    }
  }, _react["default"].createElement("div", {
    className: _styles["default"].iconHolder,
    title: label,
    "data-sign": label
  }, _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].icon, styleClass, activationClassName)
  }, active ? activeIcon : icon), notice));
}

NavigationButton.propTypes = {
  icon: _propTypes["default"].node.isRequired,
  activeIcon: _propTypes["default"].node.isRequired,
  active: _propTypes["default"].bool,
  label: _propTypes["default"].string,
  noticeCounts: _propTypes["default"].number,
  width: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]).isRequired,
  height: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]).isRequired,
  onClick: _propTypes["default"].func,
  keepStyle: _propTypes["default"].bool,
  activeClassName: _propTypes["default"].string,
  inActiveClassName: _propTypes["default"].string
};
NavigationButton.defaultProps = {
  active: false,
  label: undefined,
  noticeCounts: undefined,
  onClick: undefined,
  keepStyle: false,
  inActiveClassName: undefined,
  activeClassName: undefined
};
//# sourceMappingURL=index.js.map
