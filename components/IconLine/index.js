"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
var _IconField = _interopRequireDefault(require("../IconField"));
var _Line = _interopRequireDefault(require("../Line"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var IconLine = function IconLine(props) {
  return /*#__PURE__*/_react["default"].createElement(_Line["default"], {
    className: props.className,
    onClick: props.onClick,
    dataSign: props.dataSign,
    noBorder: props.noBorder
  }, /*#__PURE__*/_react["default"].createElement(_IconField["default"], {
    className: props.className,
    icon: props.icon,
    title: props.title
  }, props.children), props.hintText && /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
    "data-sign": "hintText",
    color: "neutral.f04",
    variant: "caption1",
    component: "div",
    noWrap: false,
    style: {
      marginTop: '15px'
    }
  }, props.hintText));
};
IconLine.defaultProps = {
  dataSign: undefined,
  title: undefined
};
var _default = IconLine;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
