'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CallItem = require('../CallItem');

var _CallItem2 = _interopRequireDefault(_CallItem);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NoCalls(_ref) {
  var currentLocale = _ref.currentLocale;

  return _react2.default.createElement(
    'p',
    { className: _styles2.default.noCalls },
    _i18n2.default.getString('noActiveCalls', currentLocale)
  );
}
NoCalls.propTypes = {
  currentLocale: _react.PropTypes.string.isRequired
};

function CallList(_ref2) {
  var className = _ref2.className,
      currentLocale = _ref2.currentLocale,
      calls = _ref2.calls,
      areaCode = _ref2.areaCode,
      countryCode = _ref2.countryCode,
      onViewContact = _ref2.onViewContact,
      onLogCall = _ref2.onLogCall,
      onClickToDial = _ref2.onClickToDial,
      onClickToSms = _ref2.onClickToSms,
      isLoggedContact = _ref2.isLoggedContact,
      disableLinks = _ref2.disableLinks,
      disableClickToDial = _ref2.disableClickToDial,
      outboundSmsPermission = _ref2.outboundSmsPermission,
      internalSmsPermission = _ref2.internalSmsPermission,
      active = _ref2.active,
      dateTimeFormatter = _ref2.dateTimeFormatter,
      loggingMap = _ref2.loggingMap;

  if (calls && calls.length) {
    return _react2.default.createElement(
      'div',
      { className: className },
      calls.map(function (call) {
        return _react2.default.createElement(_CallItem2.default, {
          key: call.id,
          call: call,
          currentLocale: currentLocale,
          areaCode: areaCode,
          countryCode: countryCode,
          onViewContact: onViewContact,
          onLogCall: onLogCall,
          onClickToDial: onClickToDial,
          onClickToSms: onClickToSms,
          isLoggedContact: isLoggedContact,
          disableLinks: disableLinks,
          disableClickToDial: disableClickToDial,
          outboundSmsPermission: outboundSmsPermission,
          internalSmsPermission: internalSmsPermission,
          active: active,
          dateTimeFormatter: dateTimeFormatter,
          isLogging: !!loggingMap[call.sessionId]
        });
      })
    );
  }
  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement(NoCalls, { currentLocale: currentLocale })
  );
}

CallList.propTypes = {
  className: _react.PropTypes.string,
  currentLocale: _react.PropTypes.string.isRequired,
  calls: _react.PropTypes.arrayOf(_CallItem2.default.propTypes.call).isRequired,
  active: _react.PropTypes.bool,
  areaCode: _react.PropTypes.string.isRequired,
  countryCode: _react.PropTypes.string.isRequired,
  onViewContact: _react.PropTypes.func,
  onLogCall: _react.PropTypes.func,
  onClickToDial: _react.PropTypes.func,
  onClickToSms: _react.PropTypes.func,
  isLoggedContact: _react.PropTypes.func,
  loggingMap: _react.PropTypes.object,
  disableLinks: _react.PropTypes.bool,
  disableClickToDial: _react.PropTypes.bool,
  outboundSmsPermission: _react.PropTypes.bool,
  internalSmsPermission: _react.PropTypes.bool,
  dateTimeFormatter: _react.PropTypes.func.isRequired
};
CallList.defaultProps = {
  className: null,
  active: false,
  disableLinks: false,
  disableClickToDial: false,
  outboundSmsPermission: false,
  internalSmsPermission: false,
  onViewContact: undefined,
  onLogCall: undefined,
  isLoggedContact: undefined,
  onClickToDial: undefined,
  onClickToSms: undefined,
  loggingMap: {}
};

exports.default = CallList;
//# sourceMappingURL=index.js.map
