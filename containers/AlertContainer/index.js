"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _AnimationAlert = _interopRequireDefault(require("../../components/AnimationAlert"));

var _AuthAlert = _interopRequireDefault(require("../../components/AuthAlert"));

var _CallAlert = _interopRequireDefault(require("../../components/CallAlert"));

var _CallLogAlert = _interopRequireDefault(require("../../components/CallLogAlert"));

var _CallingSettingsAlert = _interopRequireDefault(require("../../components/CallingSettingsAlert"));

var _RegionSettingsAlert = _interopRequireDefault(require("../../components/RegionSettingsAlert"));

var _MessageSenderAlert = _interopRequireDefault(require("../../components/MessageSenderAlert"));

var _RateExceededAlert = _interopRequireDefault(require("../../components/RateExceededAlert"));

var _ConnectivityAlert = _interopRequireDefault(require("../../components/ConnectivityAlert"));

var _WebphoneAlert = _interopRequireDefault(require("../../components/WebphoneAlert"));

var _MessageStoreAlert = _interopRequireDefault(require("../../components/MessageStoreAlert"));

var _MeetingAlert = _interopRequireDefault(require("../../components/MeetingAlert"));

var _AudioSettingsAlert = _interopRequireDefault(require("../../components/AudioSettingsAlert"));

var _RolesAndPermissionsAlert = _interopRequireDefault(require("../../components/RolesAndPermissionsAlert"));

var _phoneContext = require("../../lib/phoneContext");

var _ConferenceAlert = _interopRequireDefault(require("../../components/ConferenceAlert"));

var _ConferenceCallAlert = _interopRequireDefault(require("../../components/ConferenceCallAlert"));

var _CallControlAlert = _interopRequireDefault(require("../../components/CallControlAlert"));

var _AppInitialAlert = _interopRequireDefault(require("../../components/AppInitialAlert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      locale = _ref$phone.locale,
      alert = _ref$phone.alert,
      brand = _ref$phone.brand;
  return {
    currentLocale: locale.currentLocale,
    messages: alert.messages,
    brand: brand.fullName
  };
}

function getDefaultRenderer(_ref2) {
  var rateLimiter = _ref2.rateLimiter,
      brand = _ref2.brand,
      alert = _ref2.alert,
      routerInteraction = _ref2.routerInteraction,
      regionSettingsUrl = _ref2.regionSettingsUrl,
      callingSettingsUrl = _ref2.callingSettingsUrl;

  var onRegionSettingsLinkClick = function onRegionSettingsLinkClick() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        alertId = _ref3.alertId;

    routerInteraction.push(regionSettingsUrl);

    if (alertId) {
      alert.dismiss(alertId);
    }
  };

  var onCallingSettingsLinkClick = function onCallingSettingsLinkClick() {
    routerInteraction.push(callingSettingsUrl);
  };

  return function (message) {
    if (_AuthAlert.default.handleMessage(message)) {
      return _AuthAlert.default;
    }

    if (_CallAlert.default.handleMessage(message)) {
      return function (props) {
        return _react.default.createElement(_CallAlert.default, _extends({}, props, {
          brand: brand,
          onAreaCodeLinkClick: onRegionSettingsLinkClick
        }));
      };
    }

    if (_CallingSettingsAlert.default.handleMessage(message)) {
      return function (props) {
        return _react.default.createElement(_CallingSettingsAlert.default, _extends({}, props, {
          brand: brand.fullName,
          onCallingSettingsLinkClick: onCallingSettingsLinkClick
        }));
      };
    }

    if (_RegionSettingsAlert.default.handleMessage(message)) {
      return function (props) {
        return _react.default.createElement(_RegionSettingsAlert.default, _extends({}, props, {
          onRegionSettingsLinkClick: onRegionSettingsLinkClick
        }));
      };
    }

    if (_MessageSenderAlert.default.handleMessage(message)) {
      return function (props) {
        return _react.default.createElement(_MessageSenderAlert.default, _extends({}, props, {
          brand: brand.fullName,
          onAreaCodeLink: onRegionSettingsLinkClick
        }));
      };
    }

    if (_MessageStoreAlert.default.handleMessage(message)) {
      return _MessageStoreAlert.default;
    }

    if (_RateExceededAlert.default.handleMessage(message)) {
      return function (props) {
        return _react.default.createElement(_RateExceededAlert.default, _extends({}, props, {
          timestamp: rateLimiter.timestamp,
          duration: rateLimiter._throttleDuration
        }));
      };
    }

    if (_ConnectivityAlert.default.handleMessage(message)) {
      return _ConnectivityAlert.default;
    }

    if (_WebphoneAlert.default.handleMessage(message)) {
      return function (props) {
        return _react.default.createElement(_WebphoneAlert.default, _extends({}, props, {
          brand: brand
        }));
      };
    }

    if (_MeetingAlert.default.handleMessage(message)) {
      return function (props) {
        return _react.default.createElement(_MeetingAlert.default, _extends({}, props, {
          application: brand.appName
        }));
      };
    }

    if (_RolesAndPermissionsAlert.default.handleMessage(message)) {
      return function (props) {
        return _react.default.createElement(_RolesAndPermissionsAlert.default, _extends({}, props, {
          brand: brand.fullName,
          application: brand.appName
        }));
      };
    }

    if (_ConferenceAlert.default.handleMessage(message)) {
      return _ConferenceAlert.default;
    }

    if (_ConferenceCallAlert.default.handleMessage(message)) {
      return _ConferenceCallAlert.default;
    }

    if (_AudioSettingsAlert.default.handleMessage(message)) {
      return function (props) {
        return _react.default.createElement(_AudioSettingsAlert.default, _extends({}, props, {
          application: brand.appName
        }));
      };
    }

    if (_CallLogAlert.default.handleMessage(message)) {
      return function (props) {
        return _react.default.createElement(_CallLogAlert.default, props);
      };
    }

    if (_CallControlAlert.default.handleMessage(message)) {
      return function (props) {
        return _react.default.createElement(_CallControlAlert.default, props);
      };
    }

    if (_AppInitialAlert.default.handleMessage(message)) {
      return function (props) {
        return _react.default.createElement(_AppInitialAlert.default, props);
      };
    }

    return undefined;
  };
}

function mapToFunctions(_, _ref4) {
  var _ref4$phone = _ref4.phone,
      rateLimiter = _ref4$phone.rateLimiter,
      brand = _ref4$phone.brand,
      alert = _ref4$phone.alert,
      routerInteraction = _ref4$phone.routerInteraction,
      regionSettingsUrl = _ref4.regionSettingsUrl,
      callingSettingsUrl = _ref4.callingSettingsUrl,
      _ref4$getRenderer = _ref4.getRenderer,
      _getRenderer = _ref4$getRenderer === void 0 ? getDefaultRenderer({
    rateLimiter: rateLimiter,
    brand: brand,
    alert: alert,
    routerInteraction: routerInteraction,
    regionSettingsUrl: regionSettingsUrl,
    callingSettingsUrl: callingSettingsUrl
  }) : _ref4$getRenderer,
      getAdditionalRenderer = _ref4.getAdditionalRenderer;

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

var AlertContainer = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_AnimationAlert.default));
var _default = AlertContainer;
exports.default = _default;
//# sourceMappingURL=index.js.map
