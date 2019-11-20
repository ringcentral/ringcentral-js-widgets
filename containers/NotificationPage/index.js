"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.function.bind");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _formatNumber = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

var _withPhone = _interopRequireDefault(require("../../lib/withPhone"));

var _NotificationPanel = _interopRequireDefault(require("../../components/NotificationPanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      callLogSection = _ref$phone.callLogSection,
      locale = _ref$phone.locale,
      activeCallControl = _ref$phone.activeCallControl,
      connectivityMonitor = _ref$phone.connectivityMonitor,
      rateLimiter = _ref$phone.rateLimiter;
  var _callLogSection$showN = callLogSection.showNotification,
      showNotification = _callLogSection$showN === void 0 ? false : _callLogSection$showN,
      _callLogSection$notif = callLogSection.notificationIsExpand,
      notificationIsExpand = _callLogSection$notif === void 0 ? false : _callLogSection$notif,
      currentNotificationIdentify = callLogSection.currentNotificationIdentify,
      currentIdentify = callLogSection.currentIdentify;
  return {
    logNotification: {
      showNotification: showNotification,
      notificationIsExpand: notificationIsExpand,
      call: null,
      logName: null
    },
    currentLocale: locale.currentLocale,
    currentNotificationIdentify: currentNotificationIdentify,
    currentIdentify: currentIdentify,
    currentSession: activeCallControl.getActiveSession(currentNotificationIdentify),
    disableLinks: !connectivityMonitor.connectivity || rateLimiter.throttling
  };
}

function mapToFunctions(_, _ref2) {
  var phone = _ref2.phone;
  var callLogSection = phone.callLogSection,
      regionSettings = phone.regionSettings,
      activeCallControl = phone.activeCallControl;
  return {
    // notification
    formatPhone: function formatPhone(phoneNumber) {
      return (0, _formatNumber["default"])({
        phoneNumber: phoneNumber,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode
      });
    },
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
    onReject: activeCallControl.reject.bind(activeCallControl),
    onHangup: activeCallControl.hangUp.bind(activeCallControl)
  };
}

var NotificationPage = (0, _withPhone["default"])((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_NotificationPanel["default"]));

var WrapperComponent = function WrapperComponent(_ref3) {
  var currentNotificationIdentify = _ref3.currentNotificationIdentify;
  if (!currentNotificationIdentify) return null;
  return _react["default"].createElement(NotificationPage, null);
};

WrapperComponent.propTypes = {
  currentNotificationIdentify: _propTypes["default"].string
};
WrapperComponent.defaultProps = {
  currentNotificationIdentify: ''
};

var _default = (0, _withPhone["default"])((0, _reactRedux.connect)(function (_, _ref4) {
  var callLogSection = _ref4.phone.callLogSection;
  return {
    currentNotificationIdentify: callLogSection.currentNotificationIdentify
  };
})(WrapperComponent));

exports["default"] = _default;
//# sourceMappingURL=index.js.map
