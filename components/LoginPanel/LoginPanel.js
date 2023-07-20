"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginPanel = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _juno = require("@ringcentral/juno");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var LoginPanel = function LoginPanel(_ref) {
  var className = _ref.className,
    onLoginButtonClick = _ref.onLoginButtonClick,
    currentLocale = _ref.currentLocale,
    disabled = _ref.disabled,
    version = _ref.version,
    showSpinner = _ref.showSpinner,
    children = _ref.children,
    showSignUp = _ref.showSignUp,
    onSignUpButtonClick = _ref.onSignUpButtonClick,
    customStyles = _ref.customStyles,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    onLoading = _ref.onLoading,
    onLoadingComplete = _ref.onLoadingComplete;
  (0, _react.useEffect)(function () {
    if (showSpinner) {
      onLoading();
    } else {
      onLoadingComplete();
    }
    return function () {
      onLoadingComplete();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSpinner]);
  var versionDisplay = version ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].versionContainer
  }, _i18n["default"].getString('version', currentLocale), " ", version) : null;
  var signUpButton = showSignUp ? /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    variant: "contained",
    className: _styles["default"].signUpButton,
    onClick: onSignUpButtonClick,
    size: size
  }, _i18n["default"].getString('signupButton', currentLocale)) : null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, className)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    variant: "contained",
    "data-sign": "loginButton",
    className: (0, _classnames["default"])(_styles["default"].loginButton, customStyles),
    onClick: onLoginButtonClick,
    disabled: disabled,
    size: size
  }, _i18n["default"].getString('loginButton', currentLocale)), signUpButton, versionDisplay, children);
};
exports.LoginPanel = LoginPanel;
//# sourceMappingURL=LoginPanel.js.map
