"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _Line = _interopRequireDefault(require("../Line"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function InputLine(props) {
  return _react.default.createElement(_Line.default, {
    className: props.className,
    onClick: props.onClick,
    noBorder: props.noBorder
  }, _react.default.createElement("div", {
    className: _styles.default.label
  }, props.label), _react.default.createElement("div", {
    className: _styles.default.inputHolder
  }, props.children));
}

InputLine.propTypes = {
  children: _propTypes.default.node,
  label: _propTypes.default.node,
  input: _propTypes.default.node,
  className: _propTypes.default.string,
  onClick: _propTypes.default.func,
  noBorder: _propTypes.default.bool
};
var _default = InputLine;
exports.default = _default;
//# sourceMappingURL=index.js.map
