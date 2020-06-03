"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = IconLine;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Line = _interopRequireDefault(require("../Line"));

var _IconField = _interopRequireDefault(require("../IconField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function IconLine(props) {
  return /*#__PURE__*/_react["default"].createElement(_Line["default"], {
    className: props.className,
    onClick: props.onClick,
    dataSign: props.dataSign,
    noBorder: props.noBorder
  }, /*#__PURE__*/_react["default"].createElement(_IconField["default"], {
    className: props.className,
    icon: props.icon,
    title: props.title
  }, props.children));
}

IconLine.propTypes = {
  dataSign: _propTypes["default"].string,
  children: _propTypes["default"].node,
  icon: _propTypes["default"].node,
  className: _propTypes["default"].string,
  onClick: _propTypes["default"].func,
  noBorder: _propTypes["default"].bool,
  title: _propTypes["default"].string
};
IconLine.defaultProps = {
  dataSign: null,
  title: null
};
//# sourceMappingURL=index.js.map
