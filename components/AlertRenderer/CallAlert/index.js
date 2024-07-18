"use strict";

require("core-js/modules/es.function.name");
require("core-js/modules/es.string.link");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.CallAlert = void 0;
var _Call = require("@ringcentral-integration/commons/modules/Call");
var _react = _interopRequireDefault(require("react"));
var _FormattedMessage = _interopRequireDefault(require("../../FormattedMessage"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var CallAlert = function CallAlert(_ref) {
  var _ref$message = _ref.message,
    id = _ref$message.id,
    message = _ref$message.message,
    payload = _ref$message.payload,
    brand = _ref.brand,
    onAreaCodeLinkClick = _ref.onAreaCodeLinkClick,
    currentLocale = _ref.currentLocale;
  if (message === _Call.callErrors.noAreaCode) {
    var areaCode = _i18n["default"].getString('areaCode', currentLocale);
    var areaCodeLink = onAreaCodeLinkClick ? /*#__PURE__*/_react["default"].createElement("a", {
      className: _styles["default"].link,
      onClick: function onClick(e) {
        e.preventDefault();
        onAreaCodeLinkClick({
          alertId: id
        });
      },
      "data-sign": "setAreaCode"
    }, areaCode) : areaCode;
    return /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
      message: _i18n["default"].getString(message, currentLocale),
      values: {
        areaCodeLink: areaCodeLink
      }
    });
  }
  if (message === _Call.callErrors.noInternational) {
    return /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
      message: _i18n["default"].getString(message, currentLocale)
      // @ts-expect-error TS(2339): Property 'name' does not exist on type 'object'.
      ,
      values: {
        brand: brand.name
      }
    });
  }
  return /*#__PURE__*/_react["default"].createElement("span", null, _i18n["default"].getString(message, currentLocale));
};
exports.CallAlert = CallAlert;
CallAlert.defaultProps = {
  onAreaCodeLinkClick: undefined
};
// @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
CallAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _Call.callErrors.emergencyNumber || message === _Call.callErrors.noToNumber || message === _Call.callErrors.noAreaCode || message === _Call.callErrors.connectFailed || message === _Call.callErrors.internalError || message === _Call.callErrors.notAnExtension || message === _Call.callErrors.networkError || message === _Call.callErrors.noInternational || message === _Call.callErrors.noRingoutEnable || message === _Call.callErrors.numberParseError || message === _Call.callErrors.fromAndToNumberIsSame;
};
var _default = CallAlert;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
