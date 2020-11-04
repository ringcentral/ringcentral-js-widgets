"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = IconField;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function IconField(props) {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].wrapper, props.className)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].content,
    title: props.title,
    "data-sign": "iconField"
  }, props.children), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].iconHolder
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].icon
  }, props.icon)));
}

IconField.propTypes = {
  children: _propTypes["default"].node,
  icon: _propTypes["default"].node,
  className: _propTypes["default"].string,
  title: _propTypes["default"].string
};
IconField.defaultProps = {
  title: null
};
//# sourceMappingURL=index.js.map
