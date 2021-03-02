"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getButtonText = getButtonText;

var _juno = require("@ringcentral/juno");

var _Check = _interopRequireDefault(require("@ringcentral/juno/icon/Check"));

var _react = _interopRequireDefault(require("react"));

var _i18n = _interopRequireDefault(require("../i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getButtonText(status, currentLocale) {
  switch (status) {
    case 'saved':
      return /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
        symbol: _Check["default"]
      });

    case 'saving':
      return null;

    case 'create':
      return _i18n["default"].getString('create', currentLocale);

    case 'update':
      return _i18n["default"].getString('update', currentLocale);

    case 'submit':
    default:
      return _i18n["default"].getString('submit', currentLocale);
  }
}
//# sourceMappingURL=getButtonText.js.map
