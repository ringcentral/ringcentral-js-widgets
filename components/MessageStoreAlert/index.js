'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MessageStoreAlert;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _messageStoreErrors = require('ringcentral-integration/modules/MessageStore/messageStoreErrors');

var _messageStoreErrors2 = _interopRequireDefault(_messageStoreErrors);

var _FormattedMessage = require('../FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MessageStoreAlert(props) {
  var message = props.message.message;

  var view = _react2.default.createElement(
    'span',
    null,
    _i18n2.default.getString(message, props.currentLocale)
  );
  // Handle call record error
  if (message === _messageStoreErrors2.default.deleteFailed) {
    view = _react2.default.createElement(_FormattedMessage2.default, {
      message: _i18n2.default.getString(message, props.currentLocale)
    });
  }
  return view;
}

MessageStoreAlert.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  message: _propTypes2.default.shape({
    message: _propTypes2.default.string.isRequired
  }).isRequired
};

MessageStoreAlert.handleMessage = function (_ref) {
  var message = _ref.message;
  return message === _messageStoreErrors2.default.deleteFailed;
};
//# sourceMappingURL=index.js.map
