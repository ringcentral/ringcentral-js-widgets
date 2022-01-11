"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PhoneProvider = exports.PhoneContext = void 0;
exports.withPhone = withPhone;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _ThemeProvider = require("@ringcentral/juno/es6/foundation/theme/ThemeProvider.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var PhoneContext = /*#__PURE__*/_react["default"].createContext(null);

exports.PhoneContext = PhoneContext;
var _default = PhoneContext;
/**
 * Init `UI module system provider` and `Juno theme provider`
 * make sure you only have one `PhoneProvider` in your app
 */

exports["default"] = _default;

var PhoneProvider = function PhoneProvider(_ref) {
  var phone = _ref.phone,
      theme = _ref.theme,
      children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement(PhoneContext.Provider, {
    value: phone
  }, /*#__PURE__*/_react["default"].createElement(_ThemeProvider.RcThemeProvider, {
    theme: theme
  }, children));
};
/**
 * @deprecated please use UI module System
 * bind phone provider
 * @param Comp target component that you want to bind phone state
 */


exports.PhoneProvider = PhoneProvider;

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
