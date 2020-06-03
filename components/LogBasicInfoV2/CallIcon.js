"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallIcon = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CallIcon = function CallIcon(_ref) {
  var title = _ref.title,
      iconClassName = _ref.iconClassName;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].callIcon,
    title: title
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: iconClassName
  }));
};

exports.CallIcon = CallIcon;
CallIcon.propTypes = {
  title: _propTypes["default"].string,
  iconClassName: _propTypes["default"].string.isRequired
};
CallIcon.defaultProps = {
  title: ''
};
//# sourceMappingURL=CallIcon.js.map
