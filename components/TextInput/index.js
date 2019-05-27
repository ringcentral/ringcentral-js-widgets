"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.filter");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TextInput =
/*#__PURE__*/
function (_Component) {
  _inherits(TextInput, _Component);

  function TextInput(props) {
    var _this;

    _classCallCheck(this, TextInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TextInput).call(this, props));

    _this.onInputChange = function (e) {
      var value = e.currentTarget.value;

      if (typeof _this.props.filter === 'function') {
        value = _this.props.filter(value);
      }

      _this.setState({
        value: value
      });

      if (typeof _this.props.onChange === 'function') {
        _this.props.onChange(e);
      }
    };

    _this.state = {
      value: props.value
    };
    _this.input = null;
    return _this;
  }

  _createClass(TextInput, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          invalid = _this$props.invalid,
          placeholder = _this$props.placeholder,
          disabled = _this$props.disabled,
          readOnly = _this$props.readOnly,
          pattern = _this$props.pattern,
          name = _this$props.name,
          maxLength = _this$props.maxLength,
          defaultValue = _this$props.defaultValue,
          onKeyDown = _this$props.onKeyDown,
          autoFocus = _this$props.autoFocus;
      var value = this.state.value;
      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, className, invalid && _styles["default"].invalid)
      }, _react["default"].createElement("input", {
        "data-sign": this.props.dataSign,
        autoFocus: autoFocus // eslint-disable-line
        ,
        ref: function ref(input) {
          _this2.input = input;
        },
        onChange: this.onInputChange,
        placeholder: placeholder,
        disabled: disabled,
        readOnly: readOnly,
        pattern: pattern,
        maxLength: maxLength,
        name: name,
        value: value || '',
        defaultValue: defaultValue,
        className: (0, _classnames["default"])(_styles["default"].input, this.props.inputClassName),
        onKeyDown: onKeyDown
      }));
    }
  }]);

  return TextInput;
}(_react.Component); // function TextInput({
//   className,
//   invalid,
//   onChange,
//   placeholder,
//   disabled,
//   readOnly,
//   pattern,
//   name,
//   maxLength,
//   value,
//   defaultValue,
//   onKeyDown,
// }) {
//   return (
//     <div
//       className={classnames(
//         styles.root,
//         className,
//         invalid && styles.invalid,
//       )}>
//       <input
//         onChange={onChange}
//         placeholder={placeholder}
//         disabled={disabled}
//         readOnly={readOnly}
//         pattern={pattern}
//         maxLength={maxLength}
//         name={name}
//         value={value || ''}
//         defaultValue={defaultValue}
//         className={styles.input}
//         onKeyDown={onKeyDown}
//       />
//     </div>
//   );
// }


TextInput.propTypes = {
  className: _propTypes["default"].string,
  onChange: _propTypes["default"].func,
  placeholder: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  readOnly: _propTypes["default"].bool,
  pattern: _propTypes["default"].string,
  maxLength: _propTypes["default"].number,
  name: _propTypes["default"].string,
  value: _propTypes["default"].string,
  defaultValue: _propTypes["default"].string,
  invalid: _propTypes["default"].bool,
  onKeyDown: _propTypes["default"].func,
  filter: _propTypes["default"].func,
  autoFocus: _propTypes["default"].bool,
  inputClassName: _propTypes["default"].string,
  dataSign: _propTypes["default"].string
};
TextInput.defaultProps = {
  className: undefined,
  onChange: undefined,
  placeholder: undefined,
  disabled: false,
  readOnly: false,
  pattern: undefined,
  maxLength: undefined,
  name: undefined,
  value: undefined,
  defaultValue: undefined,
  invalid: false,
  onKeyDown: undefined,
  filter: undefined,
  autoFocus: false,
  inputClassName: undefined,
  dataSign: undefined
};
var _default = TextInput;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
