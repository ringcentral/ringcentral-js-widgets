"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CallSubject = function CallSubject(_ref) {
  var subject = _ref.subject;
  if (!subject) return null;
  return _react["default"].createElement("div", {
    className: _styles["default"].subject
  }, _react["default"].createElement("div", {
    className: _styles["default"].matchName,
    title: subject
  }, subject));
};

var _default = CallSubject;
exports["default"] = _default;
//# sourceMappingURL=CallSubject.js.map
