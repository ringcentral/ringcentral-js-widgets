"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CircleIconButton = void 0;

require("core-js/modules/es6.object.define-property");

var _juno = require("@ringcentral/juno");

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _Tooltip = require("ringcentral-widgets/components/Rcui/Tooltip");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CircleIconButton = function CircleIconButton(_ref) {
  var _classNames;

  var symbol = _ref.symbol,
      color = _ref.color,
      title = _ref.title,
      size = _ref.size,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      innerRef = _ref.innerRef,
      active = _ref.active,
      normal = _ref.normal,
      className = _ref.className,
      placement = _ref.placement,
      dataSign = _ref.dataSign;
  // this div provides ref for RcTooltip because RcFabIconButton can't
  return /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, {
    title: title,
    placement: placement
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_juno.RcFabIconButton, {
    "data-sign": dataSign,
    color: color,
    symbol: symbol,
    size: size,
    classes: {
      root: (0, _classnames["default"])((_classNames = {}, _defineProperty(_classNames, _styles["default"].buttonNormal, normal), _defineProperty(_classNames, _styles["default"].buttonActive, active), _defineProperty(_classNames, _styles["default"].buttonDisable, disabled), _defineProperty(_classNames, className, !!className), _classNames))
    },
    disabled: disabled,
    onClick: onClick,
    innerRef: innerRef
  })));
};

exports.CircleIconButton = CircleIconButton;
CircleIconButton.defaultProps = {
  active: false,
  normal: false,
  className: undefined,
  placement: 'bottom',
  dataSign: undefined
};
//# sourceMappingURL=CircleIconButton.js.map
