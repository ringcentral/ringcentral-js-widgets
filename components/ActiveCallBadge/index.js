"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _Badge = _interopRequireDefault(require("../Badge"));

var _Draggable = _interopRequireDefault(require("../Draggable"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ActiveCallBadge = function ActiveCallBadge(props) {
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
};

ActiveCallBadge.defaultProps = {
  title: 'Active Call'
};
var _default = ActiveCallBadge;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
