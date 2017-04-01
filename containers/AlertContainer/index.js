'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Alert = require('ringcentral-integration/modules/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _Brand = require('ringcentral-integration/modules/Brand');

var _Brand2 = _interopRequireDefault(_Brand);

var _Locale = require('ringcentral-integration/modules/Locale');

var _Locale2 = _interopRequireDefault(_Locale);

var _RateLimiter = require('ringcentral-integration/modules/RateLimiter');

var _RateLimiter2 = _interopRequireDefault(_RateLimiter);

var _AlertDisplay = require('../../components/AlertDisplay');

var _AlertDisplay2 = _interopRequireDefault(_AlertDisplay);

var _AuthAlert = require('../../components/AuthAlert');

var _AuthAlert2 = _interopRequireDefault(_AuthAlert);

var _CallAlert = require('../../components/CallAlert');

var _CallAlert2 = _interopRequireDefault(_CallAlert);

var _CallingSettingsAlert = require('../../components/CallingSettingsAlert');

var _CallingSettingsAlert2 = _interopRequireDefault(_CallingSettingsAlert);

var _RegionSettingsAlert = require('../../components/RegionSettingsAlert');

var _RegionSettingsAlert2 = _interopRequireDefault(_RegionSettingsAlert);

var _MessageSenderAlert = require('../../components/MessageSenderAlert');

var _MessageSenderAlert2 = _interopRequireDefault(_MessageSenderAlert);

var _RateExceededAlert = require('../../components/RateExceededAlert');

var _RateExceededAlert2 = _interopRequireDefault(_RateExceededAlert);

var _ConnectivityAlert = require('../../components/ConnectivityAlert');

var _ConnectivityAlert2 = _interopRequireDefault(_ConnectivityAlert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AlertContainer = (0, _reactRedux.connect)(function (state, _ref) {
  var locale = _ref.locale,
      alert = _ref.alert;
  return {
    currentLocale: locale.currentLocale,
    messages: alert.messages
  };
}, function (dispatch, _ref2) {
  var rateLimiter = _ref2.rateLimiter,
      brand = _ref2.brand,
      alert = _ref2.alert;
  return {
    getRenderer: function getRenderer(message) {
      if (_AuthAlert2.default.handleMessage(message)) {
        return _AuthAlert2.default;
      }
      if (_CallAlert2.default.handleMessage(message)) {
        return function (props) {
          return _react2.default.createElement(_CallAlert2.default, (0, _extends3.default)({}, props, {
            regionSettingsUrl: '/settings/region' }));
        };
      }
      if (_CallingSettingsAlert2.default.handleMessage(message)) {
        return function (props) {
          return _react2.default.createElement(_CallingSettingsAlert2.default, (0, _extends3.default)({}, props, {
            brand: brand.fullName,
            callingSettingsUrl: '/settings/calling' }));
        };
      }

      if (_RegionSettingsAlert2.default.handleMessage(message)) {
        return function (props) {
          return _react2.default.createElement(_RegionSettingsAlert2.default, (0, _extends3.default)({}, props, {
            regionSettingsUrl: '/settings/region' }));
        };
      }

      if (_MessageSenderAlert2.default.handleMessage(message)) {
        return function (props) {
          return _react2.default.createElement(_MessageSenderAlert2.default, (0, _extends3.default)({}, props, {
            regionSettingsUrl: '/settings/region' }));
        };
      }

      if (_RateExceededAlert2.default.handleMessage(message)) {
        return function (props) {
          return _react2.default.createElement(_RateExceededAlert2.default, (0, _extends3.default)({}, props, {
            timestamp: rateLimiter.timestamp,
            duration: rateLimiter._throttleDuration }));
        };
      }

      if (_ConnectivityAlert2.default.handleMessage(message)) {
        return _ConnectivityAlert2.default;
      }

      return undefined;
    },
    dismiss: function dismiss(id) {
      alert.dismiss(id);
    }
  };
})(_AlertDisplay2.default);

AlertContainer.propTypes = {
  alert: _react.PropTypes.instanceOf(_Alert2.default).isRequired,
  brand: _react.PropTypes.instanceOf(_Brand2.default).isRequired,
  locale: _react.PropTypes.instanceOf(_Locale2.default).isRequired,
  rateLimiter: _react.PropTypes.instanceOf(_RateLimiter2.default).isRequired
};

exports.default = AlertContainer;
//# sourceMappingURL=index.js.map
