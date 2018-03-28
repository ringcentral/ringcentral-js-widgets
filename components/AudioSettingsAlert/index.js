'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AudioSettingsAlert;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _audioSettingsErrors = require('ringcentral-integration/modules/AudioSettings/audioSettingsErrors');

var _audioSettingsErrors2 = _interopRequireDefault(_audioSettingsErrors);

var _FormattedMessage = require('../FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AudioSettingsAlert(_ref) {
  var brand = _ref.brand,
      currentLocale = _ref.currentLocale,
      message = _ref.message;

  var view = _react2.default.createElement(_FormattedMessage2.default, {
    message: _i18n2.default.getString(message.message, currentLocale),
    values: { brandName: brand.name }
  });
  return _react2.default.createElement(
    'span',
    null,
    view
  );
}

AudioSettingsAlert.propTypes = {
  brand: _propTypes2.default.object.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  message: _propTypes2.default.shape({
    message: _propTypes2.default.string.isRequired
  }).isRequired
};

AudioSettingsAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _audioSettingsErrors2.default.userMediaPermission;
};
//# sourceMappingURL=index.js.map
