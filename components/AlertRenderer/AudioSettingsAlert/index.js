"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _audioSettingsErrors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/AudioSettings/audioSettingsErrors"));

var _FormattedMessage = _interopRequireDefault(require("../../FormattedMessage"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AudioSettingsAlert = function AudioSettingsAlert(_ref) {
  var application = _ref.application,
      currentLocale = _ref.currentLocale,
      message = _ref.message;

  var view = /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
    message: _i18n["default"].getString(message.message, currentLocale),
    values: {
      application: application
    }
  });

  return /*#__PURE__*/_react["default"].createElement("span", null, view);
};

AudioSettingsAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _audioSettingsErrors["default"].userMediaPermission;
};

var _default = AudioSettingsAlert;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
