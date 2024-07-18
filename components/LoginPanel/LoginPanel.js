"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginPanel = void 0;
var _juno = require("@ringcentral/juno");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
    className: (0, _clsx["default"])(_styles["default"].root, className)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    variant: "contained",
    "data-sign": "loginButton",
    className: (0, _clsx["default"])(_styles["default"].loginButton, customStyles),
    onClick: onLoginButtonClick,
    disabled: disabled,
    size: size
  }, _i18n["default"].getString('loginButton', currentLocale)), signUpButton, versionDisplay, children);
};
exports.LoginPanel = LoginPanel;
//# sourceMappingURL=LoginPanel.js.map
