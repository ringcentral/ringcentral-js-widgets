"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PhoneProvider = exports.PhoneContext = void 0;
exports.withPhone = withPhone;
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var PhoneContext = exports.PhoneContext = /*#__PURE__*/_react["default"].createContext(null);
var _default = exports["default"] = PhoneContext;
/**
 * Init `UI module system provider` and `Juno theme provider`
 * make sure you only have one `PhoneProvider` in your app
 */
var PhoneProvider = exports.PhoneProvider = function PhoneProvider(_ref) {
  var phone = _ref.phone,
    theme = _ref.theme,
    children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement(PhoneContext.Provider, {
    value: phone
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, {
    theme: theme
  }, children));
};

/**
 * @deprecated please use UI module System
 * bind phone provider
 * @param Comp target component that you want to bind phone state
 */
function withPhone(Comp) {
  // eslint-disable-next-line func-names
  return function (props) {
    return /*#__PURE__*/_react["default"].createElement(PhoneContext.Consumer, null, function (phone) {
      return /*#__PURE__*/_react["default"].createElement(Comp, _extends({
        phone: phone
      }, props));
    });
  };
}
//# sourceMappingURL=phoneContext.js.map
