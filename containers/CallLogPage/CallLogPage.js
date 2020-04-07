"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapToProps = mapToProps;
exports.mapToFunctions = mapToFunctions;
Object.defineProperty(exports, "CallLogPanel", {
  enumerable: true,
  get: function get() {
    return _CallLogPanel["default"];
  }
});
exports["default"] = void 0;

require("core-js/modules/es6.regexp.match");

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _formatNumber = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

var _CallLogPanel = _interopRequireDefault(require("../../components/CallLogPanel"));

var _withPhone = _interopRequireDefault(require("../../lib/withPhone"));

var _CallLogCallCtrlContainer = _interopRequireDefault(require("../CallLogCallCtrlContainer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Call log enhancement
 */
function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      callLogger = _ref$phone.callLogger,
      locale = _ref$phone.locale,
      regionSettings = _ref$phone.regionSettings,
      rolesAndPermissions = _ref$phone.rolesAndPermissions,
      dateTimeFormat = _ref$phone.dateTimeFormat,
      callLogSection = _ref$phone.callLogSection,
      routerInteraction = _ref$phone.routerInteraction,
      activeCallControl = _ref$phone.activeCallControl,
      connectivityMonitor = _ref$phone.connectivityMonitor,
      rateLimiter = _ref$phone.rateLimiter,
      environmentOptions = _ref$phone.environmentOptions;
  var currentNotificationIdentify = callLogSection.currentNotificationIdentify,
      currentIdentify = callLogSection.currentIdentify;
  var isInTransferPage = routerInteraction.currentPath.match('^/transfer/') !== null;
  return {
    currentLocale: locale.currentLocale,
    header: true,
    showSpinner: !(locale.ready && regionSettings.ready && dateTimeFormat.ready && (!rolesAndPermissions || rolesAndPermissions.ready) && (!callLogger || callLogger.ready)),
    isInTransferPage: isInTransferPage,
    disableLinks: !connectivityMonitor.connectivity || rateLimiter.throttling,
    isWide: environmentOptions && environmentOptions.app && environmentOptions.app.isLightning,
    currentIdentify: currentIdentify,
    // notification props
    currentNotificationIdentify: currentNotificationIdentify,
    currentSession: activeCallControl.getActiveSession(activeCallControl.sessionIdToTelephonySessionIdMapping[currentNotificationIdentify])
  };
}

function mapToFunctions(_, _ref2) {
  var phone = _ref2.phone;
  var regionSettings = phone.regionSettings,
      callLogSection = phone.callLogSection,
      locale = phone.locale,
      activeCallControl = phone.activeCallControl;
  return {
    formatPhone: function formatPhone(phoneNumber) {
      return (0, _formatNumber["default"])({
        phoneNumber: phoneNumber,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode
      }) || 'Unknown';
    },
    goBack: function goBack() {
      return callLogSection.closeLogSection();
    },
    renderCallLogCallControl: function renderCallLogCallControl(status, currentTelephonySessionId, isWide) {
      return _react["default"].createElement(_CallLogCallCtrlContainer["default"], {
        currentLocale: locale.currentLocale,
        telephonySessionId: currentTelephonySessionId,
        isWide: isWide
      });
    },
    // notification props
    onSaveNotification: function onSaveNotification() {
      return callLogSection.saveAndHandleNotification();
    },
    onDiscardNotification: function onDiscardNotification() {
      return callLogSection.discardAndHandleNotification();
    },
    onCloseNotification: function onCloseNotification() {
      return callLogSection.closeLogNotification();
    },
    onExpandNotification: function onExpandNotification() {
      return callLogSection.expandLogNotification();
    },
    onReject: function onReject(sessionId) {
      var telephonySessionId = activeCallControl.sessionIdToTelephonySessionIdMapping[sessionId];
      return activeCallControl.reject(telephonySessionId);
    },
    onHangup: function onHangup(sessionId) {
      var telephonySessionId = activeCallControl.sessionIdToTelephonySessionIdMapping[sessionId];
      return activeCallControl.hangUp(telephonySessionId);
    }
  };
}

var CallLogPage = (0, _withPhone["default"])((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_CallLogPanel["default"]));
exports["default"] = CallLogPage;
//# sourceMappingURL=CallLogPage.js.map
