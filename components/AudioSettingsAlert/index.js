"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AudioSettingsAlert;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _audioSettingsErrors = _interopRequireDefault(require("ringcentral-integration/modules/AudioSettings/audioSettingsErrors"));

var _FormattedMessage = _interopRequireDefault(require("../FormattedMessage"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AudioSettingsAlert(_ref) {
  var application = _ref.application,
      currentLocale = _ref.currentLocale,
      message = _ref.message;

  var view = _react.default.createElement(_FormattedMessage.default, {
    message: _i18n.default.getString(message.message, currentLocale),
    values: {
      application: application
    }
  });

  return _react.default.createElement("span", null, view);
}

AudioSettingsAlert.propTypes = {
  application: _propTypes.default.string.isRequired,
  currentLocale: _propTypes.default.string.isRequired,
  message: _propTypes.default.shape({
    message: _propTypes.default.string.isRequired
  }).isRequired
};

AudioSettingsAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _audioSettingsErrors.default.userMediaPermission;
};
//# sourceMappingURL=index.js.map
