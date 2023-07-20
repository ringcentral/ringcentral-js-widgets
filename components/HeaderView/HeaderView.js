"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderView = void 0;
var _react = _interopRequireDefault(require("react"));
var _juno = require("@ringcentral/juno");
var _commonStyles = require("../../lib/commonStyles");
var _CallMonitorBar = require("../CallMonitorBar");
var _PresenceDropdown = require("../PresenceDropdown");
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  height: calc(100% - ", "px);\n  z-index: 1;\n"]);
  _templateObject5 = function _templateObject5() {
    return data;
  };
  return data;
}
function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n"]);
  _templateObject4 = function _templateObject4() {
    return data;
  };
  return data;
}
function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n  ", ";\n"]);
  _templateObject3 = function _templateObject3() {
    return data;
  };
  return data;
}
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n  position: relative;\n  height: ", "px;\n  line-height: ", "px;\n  text-align: center;\n  box-sizing: border-box;\n  background-color: ", ";\n  border-bottom: 1px solid ", ";\n  z-index: 2;\n"]);
  _templateObject2 = function _templateObject2() {
    return data;
  };
  return data;
}
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  body {\n    font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 14px;\n    color: #2F2F2F;\n  }\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var ALL_CALL_PATH = '/calls';
var ACTIVE_CALL_PATH = '/calls/active';

// TODO: refactor with Juno
var GlobalStyle = (0, _juno.createGlobalStyle)(_templateObject());
var Header = _juno.styled.header(_templateObject2(), _commonStyles.noSelectStyle, _utils.headerViewHeight, _utils.headerViewHeight, (0, _juno.palette2)('neutral', 'b01'), (0, _juno.palette2)('neutral', 'l02'));
var LogoWrapper = _juno.styled.div(_templateObject3(), _commonStyles.fullSizeStyle, _juno.flexCenterStyle);
var Wrapper = _juno.styled.div(_templateObject4(), _commonStyles.fullSizeStyle);
var Main = _juno.styled.main(_templateObject5(), _utils.headerViewHeight);
var HeaderView = function HeaderView(_ref) {
  var Logo = _ref.logo,
    logoUrl = _ref.logoUrl,
    userStatus = _ref.userStatus,
    dndStatus = _ref.dndStatus,
    currentLocale = _ref.currentLocale,
    setAvailable = _ref.setAvailable,
    setBusy = _ref.setBusy,
    setDoNotDisturb = _ref.setDoNotDisturb,
    setInvisible = _ref.setInvisible,
    standAlone = _ref.standAlone,
    children = _ref.children,
    _ref$ringingCalls = _ref.ringingCalls,
    ringingCalls = _ref$ringingCalls === void 0 ? [] : _ref$ringingCalls,
    _ref$onHoldCalls = _ref.onHoldCalls,
    onHoldCalls = _ref$onHoldCalls === void 0 ? [] : _ref$onHoldCalls,
    _ref$currentCalls = _ref.currentCalls,
    currentCalls = _ref$currentCalls === void 0 ? [] : _ref$currentCalls,
    currentPath = _ref.currentPath,
    activeSessionId = _ref.activeSessionId,
    incomingCallPageMinimized = _ref.incomingCallPageMinimized,
    presenceReady = _ref.presenceReady,
    shouldDisplayCurrentCallBtn = _ref.shouldDisplayCurrentCallBtn,
    shouldDisplayViewCallsBtn = _ref.shouldDisplayViewCallsBtn,
    props = _objectWithoutProperties(_ref, ["logo", "logoUrl", "userStatus", "dndStatus", "currentLocale", "setAvailable", "setBusy", "setDoNotDisturb", "setInvisible", "standAlone", "children", "ringingCalls", "onHoldCalls", "currentCalls", "currentPath", "activeSessionId", "incomingCallPageMinimized", "presenceReady", "shouldDisplayCurrentCallBtn", "shouldDisplayViewCallsBtn"]);
  if (!standAlone) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, children);
  }
  var shouldDisplayCallMonitorBar = currentCalls.length > 0 || ringingCalls.length > 0 || onHoldCalls.length > 0;
  return /*#__PURE__*/_react["default"].createElement(Wrapper, null, /*#__PURE__*/_react["default"].createElement(GlobalStyle, null), /*#__PURE__*/_react["default"].createElement(Header, null, /*#__PURE__*/_react["default"].createElement(_PresenceDropdown.PresenceDropdown, {
    isReady: !!presenceReady,
    currentLocale: currentLocale,
    dndStatus: dndStatus,
    userStatus: userStatus,
    setAvailable: setAvailable,
    setBusy: setBusy,
    setDoNotDisturb: setDoNotDisturb,
    setInvisible: setInvisible
  }), shouldDisplayCallMonitorBar ? /*#__PURE__*/_react["default"].createElement(_CallMonitorBar.CallMonitorBar, _extends({
    ringingCalls: ringingCalls,
    currentLocale: currentLocale,
    onHoldCalls: onHoldCalls,
    currentCalls: currentCalls,
    shouldDisplayCurrentCallBtn: shouldDisplayCurrentCallBtn !== null && shouldDisplayCurrentCallBtn !== void 0 ? shouldDisplayCurrentCallBtn : currentPath !== ACTIVE_CALL_PATH && currentPath !== "".concat(ACTIVE_CALL_PATH, "/").concat(activeSessionId),
    shouldDisplayViewCallsBtn: shouldDisplayViewCallsBtn !== null && shouldDisplayViewCallsBtn !== void 0 ? shouldDisplayViewCallsBtn : !incomingCallPageMinimized || currentPath !== ALL_CALL_PATH
  }, props)) : /*#__PURE__*/_react["default"].createElement(LogoWrapper, null, logoUrl ? /*#__PURE__*/_react["default"].createElement(LogoComp, {
    logoUrl: logoUrl
  }) : Logo && /*#__PURE__*/_react["default"].createElement(Logo, null))), /*#__PURE__*/_react["default"].createElement(Main, null, children));
};
exports.HeaderView = HeaderView;
var LogoComp = /*#__PURE__*/_react["default"].memo(function (_ref2) {
  var logoUrl = _ref2.logoUrl;
  return /*#__PURE__*/_react["default"].createElement("img", {
    src: logoUrl,
    alt: ""
  });
});
//# sourceMappingURL=HeaderView.js.map
