'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _Alert = require('ringcentral-integration/modules/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _Locale = require('ringcentral-integration/modules/Locale');

var _Locale2 = _interopRequireDefault(_Locale);

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

var _WebphoneAlert = require('../../components/WebphoneAlert');

var _WebphoneAlert2 = _interopRequireDefault(_WebphoneAlert);

var _RolesAndPermissionsAlert = require('../../components/RolesAndPermissionsAlert');

var _RolesAndPermissionsAlert2 = _interopRequireDefault(_RolesAndPermissionsAlert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var locale = _ref.locale,
      alert = _ref.alert;

  return {
    currentLocale: locale.currentLocale,
    messages: alert.messages
  };
}

function getDefaultRenderer(_ref2) {
  var rateLimiter = _ref2.rateLimiter,
      brand = _ref2.brand,
      router = _ref2.router,
      regionSettingsUrl = _ref2.regionSettingsUrl,
      callingSettingsUrl = _ref2.callingSettingsUrl;

  var onRegionSettingsLinkClick = function onRegionSettingsLinkClick() {
    router.push(regionSettingsUrl);
  };
  var onCallingSettingsLinkClick = function onCallingSettingsLinkClick() {
    router.push(callingSettingsUrl);
  };
  return function (message) {
    if (_AuthAlert2.default.handleMessage(message)) {
      return _AuthAlert2.default;
    }
    if (_CallAlert2.default.handleMessage(message)) {
      return function (props) {
        return _react2.default.createElement(_CallAlert2.default, (0, _extends3.default)({}, props, {
          brand: brand,
          onAreaCodeLinkClick: onRegionSettingsLinkClick
        }));
      };
    }
    if (_CallingSettingsAlert2.default.handleMessage(message)) {
      return function (props) {
        return _react2.default.createElement(_CallingSettingsAlert2.default, (0, _extends3.default)({}, props, {
          brand: brand.fullName,
          onCallingSettingsLinkClick: onCallingSettingsLinkClick
        }));
      };
    }

    if (_RegionSettingsAlert2.default.handleMessage(message)) {
      return function (props) {
        return _react2.default.createElement(_RegionSettingsAlert2.default, (0, _extends3.default)({}, props, {
          onRegionSettingsLinkClick: onRegionSettingsLinkClick
        }));
      };
    }

    if (_MessageSenderAlert2.default.handleMessage(message)) {
      return function (props) {
        return _react2.default.createElement(_MessageSenderAlert2.default, (0, _extends3.default)({}, props, {
          onAreaCodeLink: onRegionSettingsLinkClick
        }));
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

    if (_WebphoneAlert2.default.handleMessage(message)) {
      return _WebphoneAlert2.default;
    }
    if (_RolesAndPermissionsAlert2.default.handleMessage(message)) {
      return function (props) {
        return _react2.default.createElement(_RolesAndPermissionsAlert2.default, (0, _extends3.default)({}, props, {
          brand: brand.fullName,
          application: brand.application }));
      };
    }

    return undefined;
  };
}

function mapToFunctions(_, _ref3) {
  var rateLimiter = _ref3.rateLimiter,
      brand = _ref3.brand,
      alert = _ref3.alert,
      router = _ref3.router,
      regionSettingsUrl = _ref3.regionSettingsUrl,
      callingSettingsUrl = _ref3.callingSettingsUrl,
      _ref3$getRenderer = _ref3.getRenderer,
      getRenderer = _ref3$getRenderer === undefined ? getDefaultRenderer({
    rateLimiter: rateLimiter,
    brand: brand,
    router: router,
    regionSettingsUrl: regionSettingsUrl,
    callingSettingsUrl: callingSettingsUrl
  }) : _ref3$getRenderer;

  return {
    getRenderer: getRenderer,
    dismiss: function dismiss(id) {
      alert.dismiss(id);
    }
  };
}

var AlertContainer = (0, _reactRedux.connect)(mapToProps, mapToFunctions)(_AlertDisplay2.default);

AlertContainer.propTypes = {
  alert: _propTypes2.default.instanceOf(_Alert2.default).isRequired,
  getRenderer: _propTypes2.default.func,
  locale: _propTypes2.default.instanceOf(_Locale2.default).isRequired
};
AlertContainer.defaultProps = {
  getRenderer: undefined
};

exports.default = AlertContainer;
//# sourceMappingURL=index.js.map
