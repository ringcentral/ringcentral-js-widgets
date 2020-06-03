"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getButtonText = getButtonText;

var _rcui = require("@ringcentral-integration/rcui");

var _iconCheck = _interopRequireDefault(require("@ringcentral-integration/rcui/icons/icon-check.svg"));

var _react = _interopRequireDefault(require("react"));

var _i18n = _interopRequireDefault(require("../i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getButtonText(status, currentLocale) {
  switch (status) {
    case 'saved':
      return /*#__PURE__*/_react["default"].createElement(_rcui.RcIcon, {
        symbol: _iconCheck["default"]
      });

    case 'saving':
      return null;

    case 'submit':
    default:
      return _i18n["default"].getString('submit', currentLocale);
  }
}
//# sourceMappingURL=getButtonText.js.map
