"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginPanel = void 0;
var _juno = require("@ringcentral/juno");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var LoginPanel = exports.LoginPanel = function LoginPanel(_ref) {
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
//# sourceMappingURL=LoginPanel.js.map
