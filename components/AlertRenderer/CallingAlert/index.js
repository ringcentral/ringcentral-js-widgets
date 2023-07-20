"use strict";

require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _permissionsMessages = require("@ringcentral-integration/commons/enums/permissionsMessages");
var _FormattedMessage = _interopRequireDefault(require("../../FormattedMessage"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var CallInfo = function CallInfo(_ref) {
  var message = _ref.message.message,
    currentLocale = _ref.currentLocale,
    brand = _ref.brand;
  return /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
    message: _i18n["default"].getString(message, currentLocale)
    // @ts-expect-error TS(2339): Property 'name' does not exist on type 'object'.
    ,
    values: {
      brand: brand.name
    }
  });
};
// @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
CallInfo.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _permissionsMessages.permissionsMessages.callingDisable;
};
var _default = CallInfo;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
