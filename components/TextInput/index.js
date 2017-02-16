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

    _this.state = {
      value: props.value ? props.value : ''
    };
    return _this;
  }

  (0, _createClass3.default)(TextInput, [{
    key: 'render',
    value: function render() {
      var props = this.props;
      // console.debug('class',props.className);
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(_styles2.default.root, props.className, props.invalid && _styles2.default.invalid) },
        _react2.default.createElement('input', {
          onChange: props.onChange,
          placeholder: props.placeholder,
          disabled: props.disabled,
          readOnly: props.readOnly,
          pattern: props.pattern,
          maxLength: props.maxLength,
          name: props.name,
          value: props.value,
          defaultValue: props.defaultValue,
          className: (0, _classnames2.default)(_styles2.default.input),
          onKeyDown: props.onKeyDown
        })
      );
    }
  }]);
  return TextInput;
}(_react.Component);

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
  className: _styles2.default.input
};

exports.default = TextInput;
//# sourceMappingURL=index.js.map
