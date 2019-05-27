"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Message(props) {
  return _react["default"].createElement("div", {
    className: _styles["default"].alertHolder
  }, _react["default"].createElement("div", {
    "data-sign": "alert",
    className: (0, _classnames["default"])(_styles["default"][props.level])
  }, props.message, _react["default"].createElement("div", {
    className: _styles["default"].dismiss,
    onClick: props.onDismiss
  }, _react["default"].createElement("i", {
    className: _DynamicsFont["default"].close
  }))));
}

Message.propTypes = {
  level: _propTypes["default"].string.isRequired,
  message: _propTypes["default"].node.isRequired,
  onDismiss: _propTypes["default"].func.isRequired
};
var _default = Message;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
