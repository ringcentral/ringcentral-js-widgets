"use strict";

require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.string.includes.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _AudioSettings = require("@ringcentral-integration/commons/modules/AudioSettings");
var _ramda = require("ramda");
var _react = _interopRequireDefault(require("react"));
var _FormattedMessage = _interopRequireDefault(require("../../FormattedMessage"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var AudioSettingsAlert = function AudioSettingsAlert(_ref) {
  var application = _ref.application,
    currentLocale = _ref.currentLocale,
    message = _ref.message;
  if (message.message === _AudioSettings.audioSettingsErrors.checkMediaPermission) {
    return null;
  }
  var view = /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
    message: _i18n["default"].getString(message.message, currentLocale),
    values: {
      application: application
    }
  });
  return /*#__PURE__*/_react["default"].createElement("span", null, view);
};
// @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
AudioSettingsAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return (0, _ramda.includes)(message, [_AudioSettings.audioSettingsErrors.userMediaPermission, _AudioSettings.audioSettingsErrors.ringtoneSizeOverLimit, _AudioSettings.audioSettingsErrors.duplicateRingtone, _AudioSettings.audioSettingsErrors.uploadRingtoneFailed, _AudioSettings.audioSettingsErrors.deleteRingtoneFailed, _AudioSettings.audioSettingsErrors.checkMediaPermission]);
};
var _default = exports["default"] = AudioSettingsAlert;
//# sourceMappingURL=index.js.map
