'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ConferenceAlert;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _messages = require('ringcentral-integration/modules/Conference/messages');

var _messages2 = _interopRequireDefault(_messages);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ConferenceAlert(props) {
  var msg = _i18n2.default.getString(props.message.message, props.currentLocale);
  return _react2.default.createElement(
    'span',
    null,
    msg
  );
}

ConferenceAlert.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  message: _propTypes2.default.shape({
    message: _propTypes2.default.string.isRequired
  }).isRequired
};

ConferenceAlert.handleMessage = function (_ref) {
  var message = _ref.message;
  return message === _messages2.default.requireAditionalNumbers;
};
//# sourceMappingURL=index.js.map
