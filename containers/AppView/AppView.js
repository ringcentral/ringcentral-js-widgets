"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppView = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _Environment = _interopRequireDefault(require("ringcentral-widgets/components/Environment"));

var _withPhone = _interopRequireDefault(require("ringcentral-widgets/lib/withPhone"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AppViewPanel = function AppViewPanel(props) {
  var children = props.children,
      server = props.server,
      enabled = props.enabled,
      onSetData = props.onSetData,
      redirectUri = props.redirectUri;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root
  }, children, /*#__PURE__*/_react["default"].createElement(_Environment["default"], {
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

function mapToFunctions(_, _ref) {
  var _ref$phone = _ref.phone,
      oAuth = _ref$phone.oAuth,
      environment = _ref$phone.environment;
  return {
    server: environment.server,
    enabled: environment.enabled,
    redirectUri: oAuth.redirectUri
  };
}

function mapToProps(_, _ref2) {
  var environment = _ref2.phone.environment;
  return {
    onSetData: function onSetData(options) {
      environment.setData(options);
    }
  };
}

var AppView = (0, _withPhone["default"])((0, _reactRedux.connect)(mapToFunctions, mapToProps)(AppViewPanel));
exports.AppView = AppView;
//# sourceMappingURL=AppView.js.map
