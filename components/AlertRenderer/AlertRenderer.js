"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertRenderer = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _AudioSettingsAlert = _interopRequireDefault(require("./AudioSettingsAlert"));

var _AuthAlert = _interopRequireDefault(require("./AuthAlert"));

var _CallAlert = require("./CallAlert");

var _CallControlAlert = _interopRequireDefault(require("./CallControlAlert"));

var _CallingSettingsAlert = require("./CallingSettingsAlert");

var _CallLogAlert = _interopRequireDefault(require("./CallLogAlert"));

var _ConferenceCallAlert = _interopRequireDefault(require("./ConferenceCallAlert"));

var _ConnectivityAlert = _interopRequireDefault(require("./ConnectivityAlert"));

var _MeetingAlert = _interopRequireDefault(require("./MeetingAlert"));

var _MessageSenderAlert = _interopRequireDefault(require("./MessageSenderAlert"));

var _MessageStoreAlert = _interopRequireDefault(require("./MessageStoreAlert"));

var _PermissionsAlert = require("./PermissionsAlert");

var _RateExceededAlert = _interopRequireDefault(require("./RateExceededAlert"));

var _RegionSettingsAlert = require("./RegionSettingsAlert");

var _WebphoneAlert = _interopRequireDefault(require("./WebphoneAlert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var AlertRenderer = function AlertRenderer(_ref) {
  var alert = _ref.alert,
      brand = _ref.brand,
      rateLimiter = _ref.rateLimiter,
      softphone = _ref.softphone,
      routerInteraction = _ref.routerInteraction,
      callLogSection = _ref.callLogSection,
      _ref$regionSettingsUr = _ref.regionSettingsUrl,
      regionSettingsUrl = _ref$regionSettingsUr === void 0 ? '/settings/region' : _ref$regionSettingsUr,
      _ref$callingSettingsU = _ref.callingSettingsUrl,
      callingSettingsUrl = _ref$callingSettingsU === void 0 ? '/settings/calling' : _ref$callingSettingsU;

  // TODO: refactor this like modalUI.registerRenderer.
  var onRegionSettingsLinkClick = function onRegionSettingsLinkClick() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$alertId = _ref2.alertId,
        alertId = _ref2$alertId === void 0 ? 'default' : _ref2$alertId;

    routerInteraction.push(regionSettingsUrl);

    if (alertId) {
      alert.dismiss(alertId);
    }

    if (callLogSection) {
      callLogSection.closeLogSection();
    }
  };

  var onCallingSettingsLinkClick = function onCallingSettingsLinkClick() {
    routerInteraction.push(callingSettingsUrl);
  };

  return function (message) {
    if (_AuthAlert["default"].handleMessage(message)) {
      return _AuthAlert["default"];
    }

    if (_CallAlert.CallAlert.handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_CallAlert.CallAlert, _extends({}, props, {
          brand: brand,
          onAreaCodeLinkClick: onRegionSettingsLinkClick
        }));
      };
    }

    if (_CallingSettingsAlert.CallingSettingsAlert.handleMessage(message)) {
      return function (props) {
        var _brand$brandConfig$ca;

        return /*#__PURE__*/_react["default"].createElement(_CallingSettingsAlert.CallingSettingsAlert, _extends({}, props, {
          brandName: brand.name,
          softphoneAppName: (_brand$brandConfig$ca = brand.brandConfig.callWithSoftphone) === null || _brand$brandConfig$ca === void 0 ? void 0 : _brand$brandConfig$ca.name,
          jupiterAppName: softphone === null || softphone === void 0 ? void 0 : softphone.jupiterAppName,
          onCallingSettingsLinkClick: onCallingSettingsLinkClick
        }));
      };
    }

    if (_RegionSettingsAlert.RegionSettingsAlert.handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_RegionSettingsAlert.RegionSettingsAlert, _extends({}, props, {
          onRegionSettingsLinkClick: onRegionSettingsLinkClick
        }));
      };
    }

    if (_MessageSenderAlert["default"].handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_MessageSenderAlert["default"], _extends({}, props, {
          brand: brand.name,
          onAreaCodeLink: onRegionSettingsLinkClick
        }));
      };
    }

    if (_MessageStoreAlert["default"].handleMessage(message)) {
      return _MessageStoreAlert["default"];
    }

    if (_RateExceededAlert["default"].handleMessage(message) && (rateLimiter === null || rateLimiter === void 0 ? void 0 : rateLimiter.timestamp)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_RateExceededAlert["default"], _extends({}, props, {
          timestamp: rateLimiter.timestamp,
          duration: rateLimiter.throttleDuration
        }));
      };
    }

    if (_ConnectivityAlert["default"].handleMessage(message)) {
      return _ConnectivityAlert["default"];
    }

    if (_WebphoneAlert["default"].handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_WebphoneAlert["default"], _extends({}, props, {
          brand: brand
        }));
      };
    }

    if (_MeetingAlert["default"].handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_MeetingAlert["default"], _extends({}, props, {
          application: brand.appName
        }));
      };
    }

    if (_PermissionsAlert.PermissionsAlert.handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_PermissionsAlert.PermissionsAlert, _extends({}, props, {
          brand: brand.name,
          application: brand.appName
        }));
      };
    }

    if (_ConferenceCallAlert["default"].handleMessage(message)) {
      return _ConferenceCallAlert["default"];
    }

    if (_AudioSettingsAlert["default"].handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_AudioSettingsAlert["default"], _extends({}, props, {
          application: brand.appName
        }));
      };
    }

    if (_CallLogAlert["default"].handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_CallLogAlert["default"], props);
      };
    }

    if (_CallControlAlert["default"].handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_CallControlAlert["default"], props);
      };
    }

    return undefined;
  };
};

exports.AlertRenderer = AlertRenderer;
//# sourceMappingURL=AlertRenderer.js.map
