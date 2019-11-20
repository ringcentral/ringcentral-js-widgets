"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallInfo = void 0;

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CallInfo = function CallInfo(_ref) {
  var name = _ref.name,
      content = _ref.content;
  return _react["default"].createElement("div", {
    "data-sign": content,
    className: _styles["default"].container
  }, _react["default"].createElement("div", {
    className: _styles["default"].name,
    title: name
  }, name), _react["default"].createElement("i", {
    className: _styles["default"].flexFill
  }), _react["default"].createElement("div", {
    className: _styles["default"].content,
    title: content
  }, content));
};

exports.CallInfo = CallInfo;
//# sourceMappingURL=CallInfo.js.map
