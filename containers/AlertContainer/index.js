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

var _AnimationAlert = require('../../components/AnimationAlert');

var _AnimationAlert2 = _interopRequireDefault(_AnimationAlert);

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

var _MessageStoreAlert = require('../../components/MessageStoreAlert');

var _MessageStoreAlert2 = _interopRequireDefault(_MessageStoreAlert);

var _MeetingAlert = require('../../components/MeetingAlert');

var _MeetingAlert2 = _interopRequireDefault(_MeetingAlert);

var _RolesAndPermissionsAlert = require('../../components/RolesAndPermissionsAlert');

var _RolesAndPermissionsAlert2 = _interopRequireDefault(_RolesAndPermissionsAlert);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _index = require('../../components/ConferenceAlert/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      locale = _ref$phone.locale,
      alert = _ref$phone.alert;

  return {
    currentLocale: locale.currentLocale,
    messages: alert.messages
  };
}

function getDefaultRenderer(_ref2) {
  var rateLimiter = _ref2.rateLimiter,
      brand = _ref2.brand,
      routerInteraction = _ref2.routerInteraction,
      regionSettingsUrl = _ref2.regionSettingsUrl,
      callingSettingsUrl = _ref2.callingSettingsUrl;

  var onRegionSettingsLinkClick = function onRegionSettingsLinkClick() {
    routerInteraction.push(regionSettingsUrl);
  };
  var onCallingSettingsLinkClick = function onCallingSettingsLinkClick() {
    routerInteraction.push(callingSettingsUrl);
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

    if (_MessageStoreAlert2.default.handleMessage(message)) {
      return _MessageStoreAlert2.default;
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
    if (_MeetingAlert2.default.handleMessage(message)) {
      return _MeetingAlert2.default;
    }
    if (_RolesAndPermissionsAlert2.default.handleMessage(message)) {
      return function (props) {
        return _react2.default.createElement(_RolesAndPermissionsAlert2.default, (0, _extends3.default)({}, props, {
          brand: brand.fullName,
          application: brand.application }));
      };
    }

    if (_index2.default.handleMessage(message)) {
      return _index2.default;
    }

    return undefined;
  };
}

function mapToFunctions(_, _ref3) {
  var _ref3$phone = _ref3.phone,
      rateLimiter = _ref3$phone.rateLimiter,
      brand = _ref3$phone.brand,
      alert = _ref3$phone.alert,
      routerInteraction = _ref3$phone.routerInteraction,
      regionSettingsUrl = _ref3.regionSettingsUrl,
      callingSettingsUrl = _ref3.callingSettingsUrl,
      _ref3$getRenderer = _ref3.getRenderer,
      _getRenderer = _ref3$getRenderer === undefined ? getDefaultRenderer({
    rateLimiter: rateLimiter,
    brand: brand,
    routerInteraction: routerInteraction,
    regionSettingsUrl: regionSettingsUrl,
    callingSettingsUrl: callingSettingsUrl
  }) : _ref3$getRenderer,
      getAdditionalRenderer = _ref3.getAdditionalRenderer;

  var additionalRenderer = getAdditionalRenderer && getAdditionalRenderer();
  return {
    getRenderer: function getRenderer(message) {
      if (additionalRenderer) {
        var renderer = additionalRenderer(message);
        if (renderer) return renderer;
      }
      return _getRenderer(message);
    },
    dismiss: function dismiss(id) {
      alert.dismiss(id);
    }
  };
}

var AlertContainer = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_AnimationAlert2.default));

exports.default = AlertContainer;
//# sourceMappingURL=index.js.map
