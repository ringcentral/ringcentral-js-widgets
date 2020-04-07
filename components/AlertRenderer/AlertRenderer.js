"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertRenderer = AlertRenderer;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _AudioSettingsAlert = _interopRequireDefault(require("./AudioSettingsAlert"));

var _AuthAlert = _interopRequireDefault(require("./AuthAlert"));

var _CallAlert = _interopRequireDefault(require("./CallAlert"));

var _CallControlAlert = _interopRequireDefault(require("./CallControlAlert"));

var _CallingSettingsAlert = _interopRequireDefault(require("./CallingSettingsAlert"));

var _CallLogAlert = _interopRequireDefault(require("./CallLogAlert"));

var _ConferenceAlert = _interopRequireDefault(require("./ConferenceAlert"));

var _ConferenceCallAlert = _interopRequireDefault(require("./ConferenceCallAlert"));

var _ConnectivityAlert = _interopRequireDefault(require("./ConnectivityAlert"));

var _MeetingAlert = _interopRequireDefault(require("./MeetingAlert"));

var _MessageSenderAlert = _interopRequireDefault(require("./MessageSenderAlert"));

var _MessageStoreAlert = _interopRequireDefault(require("./MessageStoreAlert"));

var _RateExceededAlert = _interopRequireDefault(require("./RateExceededAlert"));

var _RegionSettingsAlert = _interopRequireDefault(require("./RegionSettingsAlert"));

var _RolesAndPermissionsAlert = _interopRequireDefault(require("./RolesAndPermissionsAlert"));

var _WebphoneAlert = _interopRequireDefault(require("./WebphoneAlert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function AlertRenderer(alert, brand, rateLimiter, routerInteraction, regionSettingsUrl, callingSettingsUrl) {
  var onRegionSettingsLinkClick = function onRegionSettingsLinkClick() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$alertId = _ref.alertId,
        alertId = _ref$alertId === void 0 ? 'default' : _ref$alertId;

    routerInteraction.push(regionSettingsUrl);

    if (alertId) {
      alert.dismiss(alertId);
    }
  };

  var onCallingSettingsLinkClick = function onCallingSettingsLinkClick() {
    routerInteraction.push(callingSettingsUrl);
  };

  return function (message) {
    if (_AuthAlert["default"].handleMessage(message)) {
      return _AuthAlert["default"];
    }

    if (_CallAlert["default"].handleMessage(message)) {
      return function (props) {
        return _react["default"].createElement(_CallAlert["default"], _extends({}, props, {
          brand: brand,
          onAreaCodeLinkClick: onRegionSettingsLinkClick
        }));
      };
    }

    if (_CallingSettingsAlert["default"].handleMessage(message)) {
      return function (props) {
        return _react["default"].createElement(_CallingSettingsAlert["default"], _extends({}, props, {
          brand: brand.fullName,
          onCallingSettingsLinkClick: onCallingSettingsLinkClick
        }));
      };
    }

    if (_RegionSettingsAlert["default"].handleMessage(message)) {
      return function (props) {
        return _react["default"].createElement(_RegionSettingsAlert["default"], _extends({}, props, {
          onRegionSettingsLinkClick: onRegionSettingsLinkClick
        }));
      };
    }

    if (_MessageSenderAlert["default"].handleMessage(message)) {
      return function (props) {
        return _react["default"].createElement(_MessageSenderAlert["default"], _extends({}, props, {
          brand: brand.fullName,
          onAreaCodeLink: onRegionSettingsLinkClick
        }));
      };
    }

    if (_MessageStoreAlert["default"].handleMessage(message)) {
      return _MessageStoreAlert["default"];
    }

    if (_RateExceededAlert["default"].handleMessage(message)) {
      return function (props) {
        return _react["default"].createElement(_RateExceededAlert["default"], _extends({}, props, {
          timestamp: rateLimiter.timestamp,
          duration: rateLimiter._throttleDuration
        }));
      };
    }

    if (_ConnectivityAlert["default"].handleMessage(message)) {
      return _ConnectivityAlert["default"];
    }

    if (_WebphoneAlert["default"].handleMessage(message)) {
      return function (props) {
        return _react["default"].createElement(_WebphoneAlert["default"], _extends({}, props, {
          brand: brand
        }));
      };
    }

    if (_MeetingAlert["default"].handleMessage(message)) {
      return function (props) {
        return _react["default"].createElement(_MeetingAlert["default"], _extends({}, props, {
          application: brand.appName
        }));
      };
    }

    if (_RolesAndPermissionsAlert["default"].handleMessage(message)) {
      return function (props) {
        return _react["default"].createElement(_RolesAndPermissionsAlert["default"], _extends({}, props, {
          brand: brand.fullName,
          application: brand.appName
        }));
      };
    }

    if (_ConferenceAlert["default"].handleMessage(message)) {
      return _ConferenceAlert["default"];
    }

    if (_ConferenceCallAlert["default"].handleMessage(message)) {
      return _ConferenceCallAlert["default"];
    }

    if (_AudioSettingsAlert["default"].handleMessage(message)) {
      return function (props) {
        return _react["default"].createElement(_AudioSettingsAlert["default"], _extends({}, props, {
          application: brand.appName
        }));
      };
    }

    if (_CallLogAlert["default"].handleMessage(message)) {
      return function (props) {
        return _react["default"].createElement(_CallLogAlert["default"], props);
      };
    }

    if (_CallControlAlert["default"].handleMessage(message)) {
      return function (props) {
        return _react["default"].createElement(_CallControlAlert["default"], props);
      };
    }

    return undefined;
  };
}
//# sourceMappingURL=AlertRenderer.js.map
