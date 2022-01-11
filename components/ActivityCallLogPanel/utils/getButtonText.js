"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getButtonText = getButtonText;

var _react = _interopRequireDefault(require("react"));

var _Icon = require("@ringcentral/juno/es6/components/Icon/Icon.js");

var _Check = _interopRequireDefault(require("@ringcentral/juno/es6/icon/Check.js"));

var _i18n = _interopRequireDefault(require("../i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getButtonText(status, currentLocale) {
  switch (status) {
    case 'saved':
      return /*#__PURE__*/_react["default"].createElement(_Icon.RcIcon, {
        symbol: _Check["default"]
      });

    case 'saving':
      return null;

    case 'create':
      return _i18n["default"].getString('create', currentLocale);
    // TODO: should check type

    case 'update':
      return _i18n["default"].getString('update', currentLocale);

    case 'submit':
    default:
      return _i18n["default"].getString('submit', currentLocale);
  }
}
//# sourceMappingURL=getButtonText.js.map
