"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var UIHeightOffset = 23; // the extra height of the entire field with paddings and borders

var MessageInput =
/*#__PURE__*/
function (_Component) {
  _inherits(MessageInput, _Component);

  function MessageInput(props, context) {
    var _this;

    _classCallCheck(this, MessageInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MessageInput).call(this, props, context));

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

  _createClass(MessageInput, [{
    key: "componentWillReceiveProps",
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
    key: "componentDidMount",
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
    key: "calculateNewHeight",
    value: function calculateNewHeight() {
      if (!this.props.inputExpandable) {
        return this.props.minHeight;
      } // temperarily set height to 0 to check scrollHeight


      this.textArea.style.height = 0;
      var newHeight = this.textArea.scrollHeight + 10 + UIHeightOffset; // set height back to original to avoid messing with react

      this.textArea.style.height = "".concat(this.state.height - UIHeightOffset, "px");
      var _this$props = this.props,
          minHeight = _this$props.minHeight,
          maxHeight = _this$props.maxHeight;

      if (newHeight < minHeight) {
        return minHeight;
      } else if (newHeight > maxHeight) {
        return maxHeight;
      }

      return newHeight;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          currentLocale = _this$props2.currentLocale,
          disabled = _this$props2.disabled,
          onSend = _this$props2.onSend,
          maxLength = _this$props2.maxLength;
      var _this$state = this.state,
          value = _this$state.value,
          height = _this$state.height;
      var inputHeight = height - UIHeightOffset;
      return _react.default.createElement("div", {
        className: _styles.default.root
      }, _react.default.createElement("div", {
        className: _styles.default.textField
      }, _react.default.createElement("textarea", {
        "data-sign": "messageInput",
        ref: function ref(target) {
          _this3.textArea = target;
        },
        placeholder: _i18n.default.getString('typeMessage', currentLocale),
        value: value,
        maxLength: maxLength,
        onChange: this.onChange,
        onKeyPressCapture: this.onKeyDown,
        style: {
          height: inputHeight
        }
      })), _react.default.createElement("div", {
        className: _styles.default.submitField
      }, _react.default.createElement("input", {
        "data-sign": "messageButton",
        type: "button",
        value: _i18n.default.getString('send', currentLocale),
        onClick: onSend,
        className: _styles.default.sendButton,
        disabled: disabled
      })));
    }
  }]);

  return MessageInput;
}(_react.Component);

exports.default = MessageInput;
MessageInput.propTypes = {
  value: _propTypes.default.string.isRequired,
  currentLocale: _propTypes.default.string.isRequired,
  disabled: _propTypes.default.bool,
  minHeight: _propTypes.default.number,
  maxHeight: _propTypes.default.number,
  maxLength: _propTypes.default.number,
  onSend: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onHeightChange: _propTypes.default.func,
  inputExpandable: _propTypes.default.bool
};
MessageInput.defaultProps = {
  disabled: false,
  onSend: undefined,
  onChange: undefined,
  onHeightChange: undefined,
  minHeight: 63,
  maxHeight: 300,
  maxLength: 5000,
  inputExpandable: true
};
//# sourceMappingURL=index.js.map
