"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallerIdLabel = void 0;

require("core-js/modules/es6.string.sub");

var _react = _interopRequireDefault(require("react"));

var _juno = require("@ringcentral/juno");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CallerIdLabel = function CallerIdLabel(_ref) {
  var description = _ref.description,
      number = _ref.number;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].item
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
    className: _styles["default"].title,
    variant: "inherit",
    component: "p",
    title: description,
    titleWhenOverflow: true
  }, description), number !== '-1' && /*#__PURE__*/_react["default"].createElement("p", {
    className: _styles["default"].sub
  }, number));
};

exports.CallerIdLabel = CallerIdLabel;
//# sourceMappingURL=CallerIdLabel.js.map
