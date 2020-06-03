"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = NoMessages;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _style = _interopRequireDefault(require("./style.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function NoMessages(_ref) {
  var placeholder = _ref.placeholder;
  return /*#__PURE__*/_react["default"].createElement("p", {
    "data-sign": "noMatch",
    className: _style["default"].noMessages
  }, placeholder);
}

NoMessages.propTypes = {
  placeholder: _propTypes["default"].string.isRequired
};
//# sourceMappingURL=index.js.map
