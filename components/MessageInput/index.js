'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UIHeightOffset = 23;
// the extra height of the entire field with paddings and borders

var MessageInput = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(MessageInput, _Component);

  function MessageInput(props, context) {
    (0, _classCallCheck3.default)(this, MessageInput);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MessageInput.__proto__ || (0, _getPrototypeOf2.default)(MessageInput)).call(this, props, context));

    _this.onChange = function (e) {
      var value = e.currentTarget.value;

      var newHeight = _this.calculateNewHeight();
      if (newHeight !== _this.state.height && typeof _this.props.onHeightChange === 'function') {
        _this.props.onHeightChange(newHeight);
      }
      _this.setState({
        value: value,
        height: newHeight
      });
      if (typeof _this.props.onChange === 'function') {
        _this.props.onChange(value);
      }
    };

    _this.onKeyDown = function (e) {
      if (e.key === 'Enter') {
        if (!e.shiftKey) {
          e.preventDefault();
          if (typeof _this.props.onSend === 'function') {
            _this.props.onSend();
          }
        }
      }
    };

    _this.state = {
      value: props.value,
      height: props.minHeight
    };
    return _this;
  }

  (0, _createClass3.default)(MessageInput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (nextProps.value !== this.state.value) {
        // use setState(updater, callback) to recaculate height after value has been update to DOM
        this.setState(function () {
          return {
            value: nextProps.value
          };
        }, function () {
          var newHeight = _this2.calculateNewHeight();
          if (newHeight !== _this2.state.height) {
            if (typeof _this2.props.onHeightChange === 'function') {
              _this2.props.onHeightChange(newHeight);
            }
            _this2.setState({
              height: newHeight
            });
          }
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // do a initial size check in case the component is mounted with multi line value
      var newHeight = this.calculateNewHeight();
      if (newHeight !== this.state.height) {
        if (typeof this.props.onHeightChange === 'function') {
          this.props.onHeightChange(newHeight);
        }
        this.setState({
          height: newHeight
        });
      }
    }
  }, {
    key: 'calculateNewHeight',
    value: function calculateNewHeight() {
      // temperarily set height to 0 to check scrollHeight
      this.textArea.style.height = 0;
      var newHeight = this.textArea.scrollHeight + 10 + UIHeightOffset;
      // set height back to original to avoid messing with react
      this.textArea.style.height = this.state.height - UIHeightOffset + 'px';
      var _props = this.props,
          minHeight = _props.minHeight,
          maxHeight = _props.maxHeight;

      if (newHeight < minHeight) {
        return minHeight;
      } else if (newHeight > maxHeight) {
        return maxHeight;
      }
      return newHeight;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          currentLocale = _props2.currentLocale,
          disabled = _props2.disabled,
          onSend = _props2.onSend,
          maxLength = _props2.maxLength;
      var _state = this.state,
          value = _state.value,
          height = _state.height;

      var inputHeight = height - UIHeightOffset;
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.root },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.textField },
          _react2.default.createElement('textarea', {
            ref: function ref(target) {
              _this3.textArea = target;
            },
            placeholder: _i18n2.default.getString('typeMessage', currentLocale),
            value: value,
            maxLength: maxLength,
            onChange: this.onChange,
            onKeyPressCapture: this.onKeyDown,
            style: {
              height: inputHeight
            }
          })
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.submitField },
          _react2.default.createElement('input', {
            type: 'button',
            value: _i18n2.default.getString('send', currentLocale),
            onClick: onSend,
            className: _styles2.default.sendButton,
            disabled: disabled
          })
        )
      );
    }
  }]);
  return MessageInput;
}(_react.Component), _class.propTypes = {
  value: _propTypes2.default.string.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  disabled: _propTypes2.default.bool,
  minHeight: _propTypes2.default.number,
  maxHeight: _propTypes2.default.number,
  maxLength: _propTypes2.default.number,
  onSend: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onHeightChange: _propTypes2.default.func
}, _class.defaultProps = {
  disabled: false,
  onSend: undefined,
  onChange: undefined,
  onHeightChange: undefined,
  minHeight: 63,
  maxHeight: 300,
  maxLength: 5000
}, _temp);
exports.default = MessageInput;
//# sourceMappingURL=index.js.map
