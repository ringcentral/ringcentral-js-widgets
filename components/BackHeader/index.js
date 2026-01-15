"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _Header = require("../Header");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var BackHeader = function BackHeader(props) {
  var buttons = props.buttons || [];
  var defaultBackButton = /*#__PURE__*/_react["default"].createElement("i", {
    "data-sign": "backButton",
    className: (0, _clsx["default"])(_DynamicsFont["default"].arrow, _styles["default"].iconRotate)
  });
  buttons.push({
    label: props.backButton || defaultBackButton,
    onClick: props.onBackClick,
    placement: 'left'
  });
  return (
    /*#__PURE__*/
    // @ts-expect-error TS(2322): Type '{ label: ReactNode; onClick?: ((...args: any... Remove this comment to see the full error message
    _react["default"].createElement(_Header.Header, {
      buttons: buttons,
      className: props.className
    }, props.children)
  );
};
BackHeader.defaultProps = {
  className: '',
  // @ts-expect-error TS(2322): Type '{ className: string; children: undefined; bu... Remove this comment to see the full error message
  children: undefined,
  buttons: undefined,
  backButton: undefined,
  onBackClick: undefined
};
var _default = exports["default"] = BackHeader;
//# sourceMappingURL=index.js.map
