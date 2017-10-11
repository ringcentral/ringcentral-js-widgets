'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextInput = function (_Component) {
  (0, _inherits3.default)(TextInput, _Component);

  function TextInput(props) {
    (0, _classCallCheck3.default)(this, TextInput);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TextInput.__proto__ || (0, _getPrototypeOf2.default)(TextInput)).call(this, props));

    _this.onInputChange = function (e) {
      var value = e.currentTarget.value;
      if (typeof _this.props.filter === 'function') {
        value = _this.props.filter(value);
      }
      _this.setState({ value: value });
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

  (0, _createClass3.default)(TextInput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          invalid = _props.invalid,
          placeholder = _props.placeholder,
          disabled = _props.disabled,
          readOnly = _props.readOnly,
          pattern = _props.pattern,
          name = _props.name,
          maxLength = _props.maxLength,
          defaultValue = _props.defaultValue,
          onKeyDown = _props.onKeyDown,
          autoFocus = _props.autoFocus;
      var value = this.state.value;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(_styles2.default.root, className, invalid && _styles2.default.invalid) },
        _react2.default.createElement('input', {
          autoFocus: autoFocus // eslint-disable-line
          , ref: function ref(input) {
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
          className: _styles2.default.input,
          onKeyDown: onKeyDown
        })
      );
    }
  }]);
  return TextInput;
}(_react.Component);

// function TextInput({
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
  className: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  placeholder: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  readOnly: _propTypes2.default.bool,
  pattern: _propTypes2.default.string,
  maxLength: _propTypes2.default.number,
  name: _propTypes2.default.string,
  value: _propTypes2.default.string,
  defaultValue: _propTypes2.default.string,
  invalid: _propTypes2.default.bool,
  onKeyDown: _propTypes2.default.func,
  filter: _propTypes2.default.func,
  autoFocus: _propTypes2.default.bool
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
  autoFocus: false
};

exports.default = TextInput;
//# sourceMappingURL=index.js.map
