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

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _SpinnerOverlay = _interopRequireDefault(require("../SpinnerOverlay"));

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

var LoginPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(LoginPanel, _Component);

  function LoginPanel() {
    _classCallCheck(this, LoginPanel);

    return _possibleConstructorReturn(this, _getPrototypeOf(LoginPanel).apply(this, arguments));
  }

  _createClass(LoginPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.setupOAuth();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.destroyOAuth();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          onLoginButtonClick = _this$props.onLoginButtonClick,
          currentLocale = _this$props.currentLocale,
          disabled = _this$props.disabled,
          version = _this$props.version,
          showSpinner = _this$props.showSpinner,
          children = _this$props.children,
          showSignUp = _this$props.showSignUp,
          onSignUpButtonClick = _this$props.onSignUpButtonClick,
          customStyles = _this$props.customStyles;
      var spinner = showSpinner ? _react["default"].createElement(_SpinnerOverlay["default"], null) : null;
      var versionDisplay = version ? _react["default"].createElement("div", {
        className: _styles["default"].versionContainer
      }, _i18n["default"].getString('version', currentLocale), " ", version) : null;
      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, className)
      }, _react["default"].createElement("button", {
        "data-sign": "loginButton",
        className: (0, _classnames["default"])(_styles["default"].loginButton, customStyles),
        onClick: onLoginButtonClick,
        disabled: disabled
      }, _i18n["default"].getString('loginButton', currentLocale)), showSignUp && _react["default"].createElement("button", {
        className: _styles["default"].signUpButton,
        onClick: onSignUpButtonClick
      }, _i18n["default"].getString('signupButton', currentLocale)), versionDisplay, spinner, children);
    }
  }]);

  return LoginPanel;
}(_react.Component);

exports["default"] = LoginPanel;
LoginPanel.propTypes = {
  className: _propTypes["default"].string,
  setupOAuth: _propTypes["default"].func.isRequired,
  destroyOAuth: _propTypes["default"].func.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  onLoginButtonClick: _propTypes["default"].func.isRequired,
  disabled: _propTypes["default"].bool,
  version: _propTypes["default"].string,
  showSpinner: _propTypes["default"].bool,
  children: _propTypes["default"].node,
  showSignUp: _propTypes["default"].bool,
  onSignUpButtonClick: _propTypes["default"].func,
  customStyles: _propTypes["default"].string
};
LoginPanel.defaultProps = {
  className: null,
  disabled: false,
  version: undefined,
  showSpinner: false,
  children: undefined,
  showSignUp: false,
  onSignUpButtonClick: function onSignUpButtonClick() {},
  customStyles: undefined
};
//# sourceMappingURL=index.js.map
