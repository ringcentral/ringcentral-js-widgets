"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _style = _interopRequireDefault(require("./style.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NoMessages = function NoMessages(_ref) {
  var placeholder = _ref.placeholder;
  return /*#__PURE__*/_react["default"].createElement("p", {
    "data-sign": "noMatch",
    className: _style["default"].noMessages
  }, placeholder);
};

var _default = NoMessages;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
