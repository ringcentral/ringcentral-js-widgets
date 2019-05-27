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

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Button = _interopRequireDefault(require("../Button"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

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

var CopyToClipboard =
/*#__PURE__*/
function (_Component) {
  _inherits(CopyToClipboard, _Component);

  function CopyToClipboard() {
    _classCallCheck(this, CopyToClipboard);

    return _possibleConstructorReturn(this, _getPrototypeOf(CopyToClipboard).apply(this, arguments));
  }

  _createClass(CopyToClipboard, [{
    key: "executeCopy",
    value: function executeCopy() {
      this.copyTextArea.focus();
      this.copyTextArea.select();

      try {
        var result = document.execCommand('copy');

        if (result) {
          this.copyTextArea.blur();
          if (typeof this.props.handleSuccess === 'function') this.props.handleSuccess();
        } else if (typeof this.props.handleFailure === 'function') {
          this.props.handleFailure();
        }
      } catch (e) {
        console.error(e);

        if (typeof this.props.handleFailure === 'function') {
          this.props.handleFailure();
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          currentLocale = _this$props.currentLocale,
          buttonClassName = _this$props.buttonClassName,
          disabled = _this$props.disabled,
          copiedText = _this$props.copiedText,
          buttonText = _this$props.buttonText,
          CustomButton = _this$props.button;
      return _react["default"].createElement("div", {
        className: _styles["default"].container
      }, _react["default"].createElement("textarea", {
        className: _styles["default"].copyTextArea,
        ref: function ref(_ref) {
          _this.copyTextArea = _ref;
        },
        defaultValue: copiedText
      }), CustomButton ? _react["default"].createElement(CustomButton, this.props) : _react["default"].createElement(_Button["default"], {
        disabled: disabled,
        dataSign: "copyToClipboard",
        className: (0, _classnames["default"])(_styles["default"].primaryButton, buttonClassName),
        onClick: function onClick() {
          return _this.executeCopy();
        }
      }, buttonText || _i18n["default"].getString('copyToClipboard', currentLocale)));
    }
  }]);

  return CopyToClipboard;
}(_react.Component);

CopyToClipboard.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  handleSuccess: _propTypes["default"].func,
  handleFailure: _propTypes["default"].func,
  buttonClassName: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  copiedText: _propTypes["default"].string,
  buttonText: _propTypes["default"].string,
  button: _propTypes["default"].node
};
CopyToClipboard.defaultProps = {
  handleSuccess: undefined,
  handleFailure: undefined,
  buttonClassName: undefined,
  disabled: undefined,
  copiedText: undefined,
  buttonText: undefined,
  button: undefined
};
var _default = CopyToClipboard;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
