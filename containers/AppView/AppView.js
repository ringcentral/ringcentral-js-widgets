"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppView = void 0;
var _EnvironmentPanel = require("@ringcentral-integration/widgets/components/EnvironmentPanel");
var _withPhone = _interopRequireDefault(require("@ringcentral-integration/widgets/lib/withPhone"));
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var AppViewPanel = function AppViewPanel(_ref) {
  var _phone$evAuth, _phone$evAuth$agent, _phone$evAuth$agent$a;
  var children = _ref.children,
    server = _ref.server,
    enabled = _ref.enabled,
    onSetData = _ref.onSetData,
    redirectUri = _ref.redirectUri,
    phone = _ref.phone;
  var couldNotAccess;
  if (phone.auth.loggedIn && ((_phone$evAuth = phone.evAuth) === null || _phone$evAuth === void 0 ? void 0 : (_phone$evAuth$agent = _phone$evAuth.agent) === null || _phone$evAuth$agent === void 0 ? void 0 : (_phone$evAuth$agent$a = _phone$evAuth$agent.agentConfig) === null || _phone$evAuth$agent$a === void 0 ? void 0 : _phone$evAuth$agent$a.agentPermissions)) {
    var currentPath = phone.routerInteraction.currentPath;
    switch (currentPath) {
      case '/sessionUpdate':
        couldNotAccess = !phone.evAuth.agent.agentConfig.agentPermissions.allowLoginUpdates;
        break;
      default:
        break;
    }
  }
  if (couldNotAccess) {
    phone.routerInteraction.goBack();
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root
  }, children, /*#__PURE__*/_react["default"].createElement(_EnvironmentPanel.EnvironmentPanel, {
    server: server,
    enabled: enabled,
    onSetData: onSetData,
    redirectUri: redirectUri,
    recordingHost: ""
  }));
};
AppViewPanel.defaultProps = {
  enabled: false
};
function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
    oAuth = _ref2$phone.oAuth,
    environment = _ref2$phone.environment;
  return {
    server: environment.server,
    enabled: environment.enabled,
    redirectUri: oAuth.redirectUri
  };
}
function mapToProps(_, _ref3) {
  var environment = _ref3.phone.environment;
  return {
    onSetData: function onSetData(options) {
      environment.setData(options);
    }
  };
}
var AppView = (0, _withPhone["default"])((0, _reactRedux.connect)(mapToFunctions, mapToProps)(AppViewPanel));
exports.AppView = AppView;
//# sourceMappingURL=AppView.js.map
