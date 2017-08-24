'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ConnectivityAlert;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _connectivityMonitorMessages = require('ringcentral-integration/modules/ConnectivityMonitor/connectivityMonitorMessages');

var _connectivityMonitorMessages2 = _interopRequireDefault(_connectivityMonitorMessages);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ConnectivityAlert(_ref) {
  var message = _ref.message.message,
      currentLocale = _ref.currentLocale;

  return _react2.default.createElement(
    'div',
    null,
    _i18n2.default.getString(message, currentLocale)
  );
}

ConnectivityAlert.propTypes = {
  message: _propTypes2.default.shape({
    message: _propTypes2.default.string.isRequired
  }).isRequired,
  currentLocale: _propTypes2.default.string.isRequired
};

ConnectivityAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _connectivityMonitorMessages2.default.disconnected;
};
//# sourceMappingURL=index.js.map
