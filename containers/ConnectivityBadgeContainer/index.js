"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactRedux = require("react-redux");

var _phoneContext = require("../../lib/phoneContext");

var _ConnectivityBadge = _interopRequireDefault(require("../../components/ConnectivityBadge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      locale = _ref$phone.locale,
      connectivityManager = _ref$phone.connectivityManager;
  return {
    currentLocale: locale.currentLocale,
    mode: connectivityManager.ready && connectivityManager.mode || null,
    webphoneConnecting: connectivityManager.ready && connectivityManager.webphoneConnecting,
    hasLimitedStatusError: connectivityManager.ready && connectivityManager.hasLimitedStatusError
  };
}

function mapToFunctions(_, _ref2) {
  var connectivityManager = _ref2.phone.connectivityManager;
  return {
    onClick: function onClick() {
      if (connectivityManager.isWebphoneUnavailableMode) {
        connectivityManager.checkWebphoneAndConnect();
      } else if (connectivityManager.hasLimitedStatusError) {
        connectivityManager.checkStatus();
      } else {
        connectivityManager.showConnectivityAlert();
      }
    },
    showBadgeAlert: connectivityManager.showConnectivityAlert
  };
}

var ConnectivityBadgeContainer = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_ConnectivityBadge["default"]));
var _default = ConnectivityBadgeContainer;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
