'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CallAlert;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _callErrors = require('ringcentral-integration/modules/Call/callErrors');

var _callErrors2 = _interopRequireDefault(_callErrors);

var _FormattedMessage = require('../FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TELUS_ID = '7310';
function CallAlert(_ref) {
  var _ref$message = _ref.message,
      message = _ref$message.message,
      payload = _ref$message.payload,
      brand = _ref.brand,
      onAreaCodeLinkClick = _ref.onAreaCodeLinkClick,
      currentLocale = _ref.currentLocale;

  // If brand is Telus and special number is 911,
  // show messages of its own version.
  if (brand && brand.id === TELUS_ID && message === _callErrors2.default.specialNumber && payload && payload.phoneNumber === '911') {
    return _react2.default.createElement(
      'span',
      null,
      _i18n2.default.getString('telus911', currentLocale)
    );
  }
  if (message === _callErrors2.default.noAreaCode) {
    var areaCode = _i18n2.default.getString('areaCode', currentLocale);
    var areaCodeLink = onAreaCodeLinkClick ? _react2.default.createElement(
      'a',
      {
        onClick: function onClick(e) {
          e.preventDefault();
          onAreaCodeLinkClick();
        } },
      areaCode
    ) : areaCode;
    return _react2.default.createElement(_FormattedMessage2.default, {
      message: _i18n2.default.getString(message, currentLocale),
      values: { areaCodeLink: areaCodeLink } });
  }
  return _react2.default.createElement(
    'span',
    null,
    _i18n2.default.getString(message, currentLocale)
  );
}

CallAlert.propTypes = {
  onAreaCodeLinkClick: _propTypes2.default.func,
  message: _propTypes2.default.shape({
    message: _propTypes2.default.string.isRequired
  }).isRequired,
  brand: _propTypes2.default.object.isRequired,
  currentLocale: _propTypes2.default.string.isRequired
};
CallAlert.defaultProps = {
  onAreaCodeLinkClick: undefined
};

CallAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _callErrors2.default.noToNumber || message === _callErrors2.default.noAreaCode || message === _callErrors2.default.specialNumber || message === _callErrors2.default.connectFailed || message === _callErrors2.default.internalError || message === _callErrors2.default.notAnExtension || message === _callErrors2.default.networkError || message === _callErrors2.default.noRingoutEnable;
};
//# sourceMappingURL=index.js.map
