"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _IconField = _interopRequireDefault(require("../IconField"));
var _Line = _interopRequireDefault(require("../Line"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
  }, props.children));
};
IconLine.defaultProps = {
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  dataSign: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  title: null
};
var _default = IconLine;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
