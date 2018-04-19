'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AuthAlert;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _authMessages = require('ringcentral-integration/modules/Auth/authMessages');

var _authMessages2 = _interopRequireDefault(_authMessages);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AuthAlert(props) {
  var msg = _i18n2.default.getString(props.message.message, props.currentLocale);
  return _react2.default.createElement(
    'span',
    null,
    msg
  );
}

AuthAlert.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  message: _propTypes2.default.shape({
    message: _propTypes2.default.string.isRequired
  }).isRequired
};

AuthAlert.handleMessage = function (_ref) {
  var message = _ref.message;
  return message === _authMessages2.default.accessDenied || message === _authMessages2.default.internalError || message === _authMessages2.default.sessionExpired;
};
//# sourceMappingURL=index.js.map
