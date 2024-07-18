"use strict";

require("core-js/modules/es.function.bind");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.assign");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertRenderer = void 0;
var _react = _interopRequireDefault(require("react"));
var _AudioSettingsAlert = _interopRequireDefault(require("./AudioSettingsAlert"));
var _AuthAlert = _interopRequireDefault(require("./AuthAlert"));
var _CallAlert = require("./CallAlert");
var _CallControlAlert = _interopRequireDefault(require("./CallControlAlert"));
var _CallLogAlert = _interopRequireDefault(require("./CallLogAlert"));
var _CallingSettingsAlert = require("./CallingSettingsAlert");
var _ConferenceCallAlert = _interopRequireDefault(require("./ConferenceCallAlert"));
var _ConnectivityAlert = _interopRequireDefault(require("./ConnectivityAlert"));
var _IssueTrackingAlert = _interopRequireDefault(require("./IssueTrackingAlert"));
var _MeetingAlert = _interopRequireDefault(require("./MeetingAlert"));
var _MessageSenderAlert = _interopRequireDefault(require("./MessageSenderAlert"));
var _MessageStoreAlert = _interopRequireDefault(require("./MessageStoreAlert"));
var _PermissionsAlert = require("./PermissionsAlert");
var _RateExceededAlert = _interopRequireDefault(require("./RateExceededAlert"));
var _RegionSettingsAlert = require("./RegionSettingsAlert");
var _WebphoneAlert = _interopRequireDefault(require("./WebphoneAlert"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
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
    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
    if (_AuthAlert["default"].handleMessage(message)) {
      return _AuthAlert["default"];
    }
    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
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

    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
    if (_RegionSettingsAlert.RegionSettingsAlert.handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_RegionSettingsAlert.RegionSettingsAlert, _extends({}, props, {
          onRegionSettingsLinkClick: onRegionSettingsLinkClick
        }));
      };
    }
    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'F... Remove this comment to see the full error message
    if (_IssueTrackingAlert["default"].handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_IssueTrackingAlert["default"], _extends({}, props, {
          brand: brand.name
        }));
      };
    }

    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'F... Remove this comment to see the full error message
    if (_MessageSenderAlert["default"].handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_MessageSenderAlert["default"], _extends({}, props, {
          brand: brand.name,
          onAreaCodeLink: onRegionSettingsLinkClick
        }));
      };
    }

    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
    if (_MessageStoreAlert["default"].handleMessage(message)) {
      return _MessageStoreAlert["default"];
    }

    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 't... Remove this comment to see the full error message
    if (_RateExceededAlert["default"].handleMessage(message) && (rateLimiter === null || rateLimiter === void 0 ? void 0 : rateLimiter.timestamp)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_RateExceededAlert["default"], _extends({}, props, {
          timestamp: rateLimiter.timestamp,
          duration: rateLimiter.throttleDuration
        }));
      };
    }

    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
    if (_ConnectivityAlert["default"].handleMessage(message)) {
      return _ConnectivityAlert["default"];
    }

    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
    if (_WebphoneAlert["default"].handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_WebphoneAlert["default"], _extends({}, props, {
          brand: brand
        }));
      };
    }
    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
    if (_MeetingAlert["default"].handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_MeetingAlert["default"], _extends({}, props, {
          application: brand.appName
        }));
      };
    }
    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
    if (_PermissionsAlert.PermissionsAlert.handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_PermissionsAlert.PermissionsAlert, _extends({}, props, {
          brand: brand.name,
          application: brand.appName
        }));
      };
    }

    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
    if (_ConferenceCallAlert["default"].handleMessage(message)) {
      return _ConferenceCallAlert["default"];
    }

    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
    if (_AudioSettingsAlert["default"].handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_AudioSettingsAlert["default"], _extends({}, props, {
          application: brand.appName
        }));
      };
    }
    if (_CallLogAlert["default"].handleMessage(message)) {
      // @ts-expect-error TS(2786): 'CallLogAlert' cannot be used as a JSX component.
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_CallLogAlert["default"], props);
      };
    }
    if (_CallControlAlert["default"].handleMessage(message)) {
      // @ts-expect-error TS(2786): 'CallControlAlert' cannot be used as a JSX compone... Remove this comment to see the full error message
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_CallControlAlert["default"], props);
      };
    }
    return function () {
      return null;
    };
  };
};
exports.AlertRenderer = AlertRenderer;
//# sourceMappingURL=AlertRenderer.js.map
