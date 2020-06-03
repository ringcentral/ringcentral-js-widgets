"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Select;

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

require("../../assets/DynamicsFont/DynamicsFont.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import font face
function Select(_ref) {
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
      // eslint-disable-next-line react/no-array-index-key
      _react["default"].createElement("option", {
        key: idx,
        value: valueFunction(option, idx)
      }, renderFunction(option, idx))
    );
  })));
}

Select.propTypes = {
  className: _propTypes["default"].string,
  value: _propTypes["default"].string,
  onChange: _propTypes["default"].func,
  disabled: _propTypes["default"].bool,
  options: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
  paddingLeft: _propTypes["default"].number,
  valueFunction: _propTypes["default"].func,
  renderFunction: _propTypes["default"].func
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
//# sourceMappingURL=index.js.map
