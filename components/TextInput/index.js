'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TextInput(_ref) {
  var className = _ref.className,
      invalid = _ref.invalid,
      onChange = _ref.onChange,
      placeholder = _ref.placeholder,
      disabled = _ref.disabled,
      readOnly = _ref.readOnly,
      pattern = _ref.pattern,
      name = _ref.name,
      maxLength = _ref.maxLength,
      value = _ref.value,
      defaultValue = _ref.defaultValue,
      onKeyDown = _ref.onKeyDown;

  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(_styles2.default.root, className, invalid && _styles2.default.invalid) },
    _react2.default.createElement('input', {
      onChange: onChange,
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
TextInput.propTypes = {
  className: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  placeholder: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  readOnly: _react.PropTypes.bool,
  pattern: _react.PropTypes.string,
  maxLength: _react.PropTypes.number,
  name: _react.PropTypes.string,
  value: _react.PropTypes.string,
  defaultValue: _react.PropTypes.string,
  invalid: _react.PropTypes.bool,
  onKeyDown: _react.PropTypes.func
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
  onKeyDown: undefined
};

exports.default = TextInput;
//# sourceMappingURL=index.js.map
