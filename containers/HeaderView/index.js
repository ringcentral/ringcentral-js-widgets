"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.symbol");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.HeaderView = void 0;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireDefault(require("react"));

var _PresenceDropdown = _interopRequireDefault(require("../../components/PresenceDropdown"));

var _CallMonitorBar = _interopRequireDefault(require("../../components/CallMonitorBar"));

var _phoneContext = require("../../lib/phoneContext");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ALL_CALL_PATH = '/calls';
var ACTIVE_CALL_PATH = '/calls/active';

var HeaderView = function HeaderView(_ref) {
  var logo = _ref.logo,
      userStatus = _ref.userStatus,
      dndStatus = _ref.dndStatus,
      currentLocale = _ref.currentLocale,
      setAvailable = _ref.setAvailable,
      setBusy = _ref.setBusy,
      setDoNotDisturb = _ref.setDoNotDisturb,
      setInvisible = _ref.setInvisible,
      standAlone = _ref.standAlone,
      children = _ref.children,
      ringingCalls = _ref.ringingCalls,
      onHoldCalls = _ref.onHoldCalls,
      currentCalls = _ref.currentCalls,
      currentPath = _ref.currentPath,
      activeSessionId = _ref.activeSessionId,
      incomingCallPageMinimized = _ref.incomingCallPageMinimized,
      presenceReady = _ref.presenceReady,
      props = _objectWithoutProperties(_ref, ["logo", "userStatus", "dndStatus", "currentLocale", "setAvailable", "setBusy", "setDoNotDisturb", "setInvisible", "standAlone", "children", "ringingCalls", "onHoldCalls", "currentCalls", "currentPath", "activeSessionId", "incomingCallPageMinimized", "presenceReady"]);

  if (!standAlone) {
    return children;
  }

  var shouldDisplayCallMonitorBar = false;

  if (currentCalls.length > 0 || ringingCalls.length > 0 || onHoldCalls.length > 0) {
    shouldDisplayCallMonitorBar = true;
  }

  var Logo = logo;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root
  }, /*#__PURE__*/_react["default"].createElement("header", {
    className: _styles["default"].header
  }, /*#__PURE__*/_react["default"].createElement(_PresenceDropdown["default"], {
    isReady: presenceReady,
    currentLocale: currentLocale,
    dndStatus: dndStatus,
    userStatus: userStatus,
    setAvailable: setAvailable,
    setBusy: setBusy,
    setDoNotDisturb: setDoNotDisturb,
    setInvisible: setInvisible
  }), shouldDisplayCallMonitorBar ? /*#__PURE__*/_react["default"].createElement(_CallMonitorBar["default"], _extends({
    ringingCalls: ringingCalls,
    currentLocale: currentLocale,
    onHoldCalls: onHoldCalls,
    currentCalls: currentCalls,
    shouldDisplayCurrentCallBtn: currentPath !== ACTIVE_CALL_PATH && currentPath !== "".concat(ACTIVE_CALL_PATH, "/").concat(activeSessionId),
    shouldDisplayViewCallsBtn: !incomingCallPageMinimized || currentPath !== ALL_CALL_PATH
  }, props)) : /*#__PURE__*/_react["default"].createElement(Logo, {
    className: _styles["default"].logo
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].container
  }, children));
};

exports.HeaderView = HeaderView;

var _default = (0, _phoneContext.connectModule)(function (_ref2) {
  var headerViewUI = _ref2.headerViewUI;
  return headerViewUI;
})(HeaderView);

exports["default"] = _default;
//# sourceMappingURL=index.js.map
