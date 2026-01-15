"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderView = void 0;
require("core-js/modules/es.array.concat.js");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
var _commonStyles = require("../../lib/commonStyles");
var _CallMonitorBar = require("../CallMonitorBar");
var _PresenceDropdown = require("../PresenceDropdown");
var _styles = _interopRequireDefault(require("./styles.scss"));
var _utils = require("./utils");
var _excluded = ["logoUrl", "userStatus", "dndStatus", "currentLocale", "setAvailable", "setBusy", "setDoNotDisturb", "setInvisible", "standAlone", "children", "ringingCalls", "onHoldCalls", "currentCalls", "currentPath", "activeSessionId", "incomingCallPageMinimized", "presenceReady", "shouldDisplayCurrentCallBtn", "shouldDisplayViewCallsBtn"];
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var ALL_CALL_PATH = '/calls';
var ACTIVE_CALL_PATH = '/calls/active';

// TODO: refactor with Juno
var GlobalStyle = (0, _juno.createGlobalStyle)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  body {\n    font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 14px;\n    color: #2F2F2F;\n  }\n"])));
var Header = _juno.styled.header(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  ", ";\n  position: relative;\n  height: ", "px;\n  line-height: ", "px;\n  text-align: center;\n  box-sizing: border-box;\n  background-color: ", ";\n  border-bottom: 1px solid ", ";\n  z-index: 2;\n"])), _commonStyles.noSelectStyle, _utils.headerViewHeight, _utils.headerViewHeight, (0, _juno.palette2)('neutral', 'b01'), (0, _juno.palette2)('neutral', 'l02'));
var LogoWrapper = _juno.styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  ", ";\n  ", ";\n"])), _commonStyles.fullSizeStyle, _juno.flexCenterStyle);
var Wrapper = _juno.styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  ", ";\n"])), _commonStyles.fullSizeStyle);
var Main = _juno.styled.main(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  height: calc(100% - ", "px);\n  z-index: 1;\n"])), _utils.headerViewHeight);
var HeaderView = exports.HeaderView = function HeaderView(_ref) {
  var logoUrl = _ref.logoUrl,
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
    props = _objectWithoutProperties(_ref, _excluded);
  if (!standAlone) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(GlobalStyle, null), children);
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
  }, props)) : /*#__PURE__*/_react["default"].createElement(LogoWrapper, null, logoUrl ? /*#__PURE__*/_react["default"].createElement("img", {
    src: logoUrl,
    alt: "",
    className: _styles["default"].logo
  }) : null)), /*#__PURE__*/_react["default"].createElement(Main, null, children));
};
//# sourceMappingURL=HeaderView.js.map
