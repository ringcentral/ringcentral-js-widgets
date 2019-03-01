"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _Search = _interopRequireDefault(require("../../assets/images/Search.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SearchInput(props) {
  return _react.default.createElement("div", {
    className: (0, _classnames.default)(_styles.default.root, props.className)
  }, _react.default.createElement(_Search.default, {
    className: _styles.default.icon
  }), _react.default.createElement("input", {
    name: "search",
    value: props.value,
    onChange: props.onChange,
    onKeyUp: props.onKeyUp,
    className: _styles.default.input,
    maxLength: props.maxLength,
    placeholder: props.placeholder,
    autoComplete: "off",
    disabled: props.disabled,
    "data-sign": props.dataSign
  }));
}

SearchInput.propTypes = {
  className: _propTypes.default.string,
  value: _propTypes.default.string.isRequired,
  onChange: _propTypes.default.func.isRequired,
  onKeyUp: _propTypes.default.func,
  maxLength: _propTypes.default.number,
  placeholder: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  dataSign: _propTypes.default.string
};
SearchInput.defaultProps = {
  className: null,
  disabled: false,
  placeholder: '',
  maxLength: undefined,
  onKeyUp: undefined,
  dataSign: ''
};
var _default = SearchInput;
exports.default = _default;
//# sourceMappingURL=index.js.map
