'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CallAlert;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _callErrors = require('ringcentral-integration/modules/Call/callErrors');

var _callErrors2 = _interopRequireDefault(_callErrors);

var _FormattedMessage = require('../FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CallAlert(_ref) {
  var message = _ref.message.message,
      regionSettingsUrl = _ref.regionSettingsUrl,
      currentLocale = _ref.currentLocale;

  if (message === _callErrors2.default.noAreaCode) {
    var areaCode = _i18n2.default.getString('areaCode', currentLocale);
    return _react2.default.createElement(_FormattedMessage2.default, {
      message: _i18n2.default.getString(message, currentLocale),
      values: { areaCodeLink: _react2.default.createElement(
          _reactRouter.Link,
          { to: regionSettingsUrl },
          areaCode
        ) } });
  }
  return _react2.default.createElement(
    'span',
    null,
    _i18n2.default.getString(message, currentLocale)
  );
}

CallAlert.propTypes = {
  regionSettingsUrl: _react.PropTypes.string.isRequired,
  message: _react.PropTypes.shape({
    message: _react.PropTypes.string.isRequired
  }).isRequired,
  currentLocale: _react.PropTypes.string.isRequired
};

CallAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _callErrors2.default.noToNumber || message === _callErrors2.default.noAreaCode || message === _callErrors2.default.specialNumber || message === _callErrors2.default.connectFailed || message === _callErrors2.default.internalError || message === _callErrors2.default.notAnExtension || message === _callErrors2.default.networkError || message === _callErrors2.default.noRingoutEnable;
};
//# sourceMappingURL=index.js.map
