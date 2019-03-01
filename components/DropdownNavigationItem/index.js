"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DropdownNavigationItem;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DropdownNavigationItem(_ref) {
  var icon = _ref.icon,
      activeIcon = _ref.activeIcon,
      active = _ref.active,
      isReverseFillIcon = _ref.isReverseFillIcon,
      label = _ref.label,
      title = _ref.title,
      noticeCounts = _ref.noticeCounts,
      onClick = _ref.onClick,
      keepStyle = _ref.keepStyle;
  var notice = null;

  if (noticeCounts && noticeCounts > 0) {
    if (noticeCounts > 99) {
      notice = _react.default.createElement("div", {
        className: _styles.default.notice
      }, "99+");
    } else {
      notice = _react.default.createElement("div", {
        className: _styles.default.notice
      }, noticeCounts);
    }
  }

  var styleClass = !keepStyle ? _styles.default.iconStyles : null;
  return _react.default.createElement("div", {
    title: title || label,
    onClick: onClick,
    className: (0, _classnames.default)(_styles.default.root, active && _styles.default.active, isReverseFillIcon && _styles.default.reverseFillIcon)
  }, _react.default.createElement("div", {
    className: (0, _classnames.default)(_styles.default.iconHolder, styleClass)
  }, active ? activeIcon : icon), _react.default.createElement("div", {
    className: _styles.default.labelHolder
  }, label), notice);
}

DropdownNavigationItem.propTypes = {
  icon: _propTypes.default.node.isRequired,
  activeIcon: _propTypes.default.node.isRequired,
  active: _propTypes.default.bool,
  isReverseFillIcon: _propTypes.default.bool,
  label: _propTypes.default.string,
  title: _propTypes.default.string,
  noticeCounts: _propTypes.default.number,
  onClick: _propTypes.default.func,
  keepStyle: _propTypes.default.bool
};
DropdownNavigationItem.defaultProps = {
  active: false,
  isReverseFillIcon: false,
  label: undefined,
  title: undefined,
  noticeCounts: undefined,
  onClick: undefined,
  keepStyle: false
};
//# sourceMappingURL=index.js.map
