"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = RegionSettingsAlert;

require("core-js/modules/es6.string.link");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _regionSettingsMessages = _interopRequireDefault(require("ringcentral-integration/modules/RegionSettings/regionSettingsMessages"));

var _FormattedMessage = _interopRequireDefault(require("../../FormattedMessage"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function RegionSettingsAlert(_ref) {
  var _ref$message = _ref.message,
      id = _ref$message.id,
      message = _ref$message.message,
      currentLocale = _ref.currentLocale,
      onRegionSettingsLinkClick = _ref.onRegionSettingsLinkClick;
  var msg;

  switch (message) {
    case _regionSettingsMessages["default"].dialingPlansChanged:
      {
        var regionSettings = _i18n["default"].getString('regionSettings', currentLocale);

        var regionSettingsLink = onRegionSettingsLinkClick ? _react["default"].createElement("a", {
          className: _styles["default"].link,
          onClick: function onClick(e) {
            e.preventDefault();
            onRegionSettingsLinkClick({
              alertId: id
            });
          }
        }, regionSettings) : regionSettings;
        msg = _react["default"].createElement(_FormattedMessage["default"], {
          message: _i18n["default"].getString(message, currentLocale),
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

  return _react["default"].createElement("div", null, msg);
}

RegionSettingsAlert.propTypes = {
  message: _propTypes["default"].shape({
    message: _propTypes["default"].string.isRequired
  }).isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  onRegionSettingsLinkClick: _propTypes["default"].func
};
RegionSettingsAlert.defaultProps = {
  onRegionSettingsLinkClick: undefined
};

RegionSettingsAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _regionSettingsMessages["default"].saveSuccess || message === _regionSettingsMessages["default"].dialingPlansChanged || message === _regionSettingsMessages["default"].areaCodeInvalid;
};
//# sourceMappingURL=index.js.map
