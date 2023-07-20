"use strict";

require("core-js/modules/es.array.map");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("../../assets/DynamicsFont/DynamicsFont.scss");
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import font face

var Select = function Select(_ref) {
  var className = _ref.className,
    value = _ref.value,
    onChange = _ref.onChange,
    disabled = _ref.disabled,
    options = _ref.options,
    valueFunction = _ref.valueFunction,
    renderFunction = _ref.renderFunction,
    paddingLeft = _ref.paddingLeft;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, className)
  }, /*#__PURE__*/_react["default"].createElement("select", {
    className: _styles["default"].select,
    disabled: disabled,
    value: value,
    style: {
      paddingLeft: paddingLeft
    },
    onChange: onChange
  }, options.map(function (option, idx) {
    return (
      /*#__PURE__*/
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      // eslint-disable-next-line react/no-array-index-key
      _react["default"].createElement("option", {
        key: idx,
        value: valueFunction(option, idx)
      }, renderFunction(option, idx))
    );
  })));
};
Select.defaultProps = {
  className: undefined,
  value: undefined,
  onChange: undefined,
  disabled: false,
  paddingLeft: 10,
  valueFunction: function valueFunction(option) {
    return option;
  },
  renderFunction: function renderFunction(option) {
    return option;
  }
};
var _default = Select;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
