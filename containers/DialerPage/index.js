'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _react = require('react');

var _Locale = require('ringcentral-integration/modules/Locale');

var _Locale2 = _interopRequireDefault(_Locale);

var _CallingSettings = require('ringcentral-integration/modules/CallingSettings');

var _CallingSettings2 = _interopRequireDefault(_CallingSettings);

var _Call = require('ringcentral-integration/modules/Call');

var _Call2 = _interopRequireDefault(_Call);

var _ConnectivityMonitor = require('ringcentral-integration/modules/ConnectivityMonitor');

var _ConnectivityMonitor2 = _interopRequireDefault(_ConnectivityMonitor);

var _RateLimiter = require('ringcentral-integration/modules/RateLimiter');

var _RateLimiter2 = _interopRequireDefault(_RateLimiter);

var _DialerPanel = require('../../components/DialerPanel');

var _DialerPanel2 = _interopRequireDefault(_DialerPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DialerPage = (0, _reactRedux.connect)(function (state, props) {
  return {
    currentLocale: props.locale.currentLocale,
    callingMode: props.callingSettings.callingMode,
    callButtonDisabled: !props.call.isIdle || !props.connectivityMonitor.connectivity || props.rateLimiter.throttling,
    toNumber: props.call.toNumber
  };
}, function (dispatch, props) {
  return {
    keepToNumber: function keepToNumber(value) {
      props.call.onToNumberChange(value);
    },
    onCall: function onCall() {
      return props.call.onCall();
    }
  };
})(_DialerPanel2.default);

DialerPage.propTypes = {
  call: _react.PropTypes.instanceOf(_Call2.default).isRequired,
  callingSettings: _react.PropTypes.instanceOf(_CallingSettings2.default).isRequired,
  connectivityMonitor: _react.PropTypes.instanceOf(_ConnectivityMonitor2.default).isRequired,
  locale: _react.PropTypes.instanceOf(_Locale2.default).isRequired,
  rateLimiter: _react.PropTypes.instanceOf(_RateLimiter2.default).isRequired
};

exports.default = DialerPage;
//# sourceMappingURL=index.js.map
