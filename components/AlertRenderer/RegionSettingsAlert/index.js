"use strict";

require("core-js/modules/es.string.link");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RegionSettingsAlert = void 0;
var _react = _interopRequireDefault(require("react"));
var _regionSettingsMessages = require("@ringcentral-integration/commons/modules/RegionSettings/regionSettingsMessages");
var _FormattedMessage = _interopRequireDefault(require("../../FormattedMessage"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var RegionSettingsAlert = function RegionSettingsAlert(_ref) {
  var _ref$message = _ref.message,
    id = _ref$message.id,
    message = _ref$message.message,
    currentLocale = _ref.currentLocale,
    onRegionSettingsLinkClick = _ref.onRegionSettingsLinkClick;
  var msg;
  switch (message) {
    case _regionSettingsMessages.regionSettingsMessages.dialingPlansChanged:
      {
        var regionSettings = _i18n["default"].getString('regionSettings', currentLocale);
        var regionSettingsLink = onRegionSettingsLinkClick ? /*#__PURE__*/_react["default"].createElement("a", {
          className: _styles["default"].link,
          onClick: function onClick(e) {
            e.preventDefault();
            onRegionSettingsLinkClick({
              alertId: id
            });
          }
        }, regionSettings) : regionSettings;
        msg = /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
          message: _i18n["default"].getString(message, currentLocale)
          // @ts-expect-error TS(2322): Type 'string | Element' is not assignable to type ... Remove this comment to see the full error message
          ,
          values: {
            regionSettingsLink: regionSettingsLink
          }
        });
      }
      break;
    default:
      msg = _i18n["default"].getString(message, currentLocale);
      break;
  }
  return /*#__PURE__*/_react["default"].createElement("div", null, msg);
};
exports.RegionSettingsAlert = RegionSettingsAlert;
RegionSettingsAlert.defaultProps = {
  onRegionSettingsLinkClick: undefined
};
// @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
RegionSettingsAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _regionSettingsMessages.regionSettingsMessages.saveSuccess || message === _regionSettingsMessages.regionSettingsMessages.dialingPlansChanged || message === _regionSettingsMessages.regionSettingsMessages.areaCodeInvalid;
};
var _default = RegionSettingsAlert;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
