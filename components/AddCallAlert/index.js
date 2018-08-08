'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AddCallAlert;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recordStatus = require('ringcentral-integration/modules/Webphone/recordStatus');

var _recordStatus2 = _interopRequireDefault(_recordStatus);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AddCallAlert(_ref) {
  var currentLocale = _ref.currentLocale,
      message = _ref.message.message;

  return _react2.default.createElement(
    'span',
    null,
    _i18n2.default.getString(message, currentLocale)
  );
}
AddCallAlert.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  message: _propTypes2.default.shape({
    message: _propTypes2.default.string.isRequired
  }).isRequired
};
AddCallAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _recordStatus2.default.pending || message === _recordStatus2.default.recording;
};
//# sourceMappingURL=index.js.map
