"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = void 0;

var _react = _interopRequireDefault(require("react"));

var _Header = _interopRequireDefault(require("../../Header"));

var _i18n = _interopRequireDefault(require("../i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Header = function Header(_ref) {
  var showHeader = _ref.showHeader,
      currentLocale = _ref.currentLocale;

  if (!showHeader) {
    return null;
  }

  return _react["default"].createElement(_Header["default"], null, _i18n["default"].getString('settings', currentLocale));
};

exports.Header = Header;
//# sourceMappingURL=Header.js.map
