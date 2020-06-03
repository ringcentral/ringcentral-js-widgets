"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ActiveCallBadge;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Badge = _interopRequireDefault(require("../Badge"));

var _Draggable = _interopRequireDefault(require("../Draggable"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ActiveCallBadge(props) {
  return /*#__PURE__*/_react["default"].createElement(_Draggable["default"], {
    className: _styles["default"].root,
    onClick: props.onClick,
    positionOffsetX: props.offsetX,
    positionOffsetY: props.offsetY,
    updatePositionOffset: props.updatePositionOffset
  }, /*#__PURE__*/_react["default"].createElement(_Badge["default"], {
    className: _styles["default"].badge,
    name: props.title
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].activeIcon
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: _DynamicsFont["default"].callHover
  })), props.title));
}

ActiveCallBadge.propTypes = {
  onClick: _propTypes["default"].func.isRequired,
  offsetX: _propTypes["default"].number.isRequired,
  offsetY: _propTypes["default"].number.isRequired,
  updatePositionOffset: _propTypes["default"].func.isRequired,
  title: _propTypes["default"].string
};
ActiveCallBadge.defaultProps = {
  title: 'Active Call'
};
//# sourceMappingURL=index.js.map
