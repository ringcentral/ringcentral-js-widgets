"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.find-index");
require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleCallControlPanel = void 0;
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _react = _interopRequireWildcard(require("react"));
var _callCtrlLayouts = _interopRequireDefault(require("../../enums/callCtrlLayouts"));
var _ActiveCallPad = require("../ActiveCallPad");
var _CallCtrlPanel = _interopRequireDefault(require("../CallCtrlPanel"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var SimpleCallControlPanel = function SimpleCallControlPanel(_ref) {
  var activeSession = _ref.activeSession,
    areaCode = _ref.areaCode,
    countryCode = _ref.countryCode,
    nameMatches = _ref.nameMatches,
    sessionId = _ref.sessionId,
    currentLocale = _ref.currentLocale,
    fallBackName = _ref.fallBackName,
    phoneNumber = _ref.phoneNumber,
    actions = _ref.actions,
    showContactDisplayPlaceholder = _ref.showContactDisplayPlaceholder,
    controlBusy = _ref.controlBusy,
    brandName = _ref.brandName,
    onBackButtonClick = _ref.onBackButtonClick,
    setActiveSessionId = _ref.setActiveSessionId,
    onMute = _ref.onMute,
    onUnmute = _ref.onUnmute,
    onHold = _ref.onHold,
    onUnhold = _ref.onUnhold,
    onHangup = _ref.onHangup,
    onTransfer = _ref.onTransfer,
    _ref$maxExtensionNumb = _ref.maxExtensionNumberLength,
    maxExtensionNumberLength = _ref$maxExtensionNumb === void 0 ? 6 : _ref$maxExtensionNumb;
  var _useState = (0, _react.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    selectedMatcherIndex = _useState2[0],
    setSelectedMatcherIndex = _useState2[1];
  var formatPhone = (0, _react.useCallback)(function (phoneNumber) {
    return (0, _formatNumber.formatNumber)({
      phoneNumber: phoneNumber,
      areaCode: areaCode,
      countryCode: countryCode,
      maxExtensionLength: maxExtensionNumberLength
    });
  }, [areaCode, countryCode]);
  var onSelectMatcherName = (0, _react.useCallback)(function (option) {
    var selectedMatcherIndex = (nameMatches !== null && nameMatches !== void 0 ? nameMatches : []).findIndex(function (match) {
      return match.id === option.id;
    });
    if (selectedMatcherIndex < 0) {
      selectedMatcherIndex = 0;
    }
    setSelectedMatcherIndex(selectedMatcherIndex);
  }, [nameMatches]);
  var renderTime = (0, _react.useRef)(0);
  (0, _react.useEffect)(function () {
    if (renderTime.current > 0 && !activeSession) {
      onBackButtonClick();
    }
    renderTime.current += 1;
  });
  (0, _react.useEffect)(function () {
    setActiveSessionId === null || setActiveSessionId === void 0 ? void 0 : setActiveSessionId(sessionId);
  }, []);
  if (!activeSession) {
    // or using skeleton screen here
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement(_CallCtrlPanel["default"], {
    sessionId: sessionId,
    currentLocale: currentLocale,
    fallBackName: fallBackName,
    phoneNumber: phoneNumber,
    onMute: onMute,
    onUnmute: onUnmute,
    onHold: onHold,
    onUnhold: onUnhold,
    onHangup: onHangup,
    onTransfer: onTransfer,
    showBackButton: true,
    backButtonLabel: _i18n["default"].getString('allCalls', currentLocale),
    onBackButtonClick: onBackButtonClick,
    formatPhone: formatPhone,
    areaCode: areaCode,
    countryCode: countryCode,
    selectedMatcherIndex: selectedMatcherIndex,
    layout: _callCtrlLayouts["default"].normalCtrl,
    startTime: activeSession.startTime,
    actions: actions,
    isOnMute: activeSession.isOnMute,
    isOnHold: activeSession.isOnHold,
    nameMatches: nameMatches,
    onSelectMatcherName: onSelectMatcherName,
    brand: brandName,
    showContactDisplayPlaceholder: showContactDisplayPlaceholder,
    controlBusy: controlBusy
  });
};
exports.SimpleCallControlPanel = SimpleCallControlPanel;
SimpleCallControlPanel.defaultProps = {
  setActiveSessionId: function setActiveSessionId() {},
  currentLocale: 'en-US',
  activeSession: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  sessionId: null,
  nameMatches: [],
  fallBackName: '',
  phoneNumber: '',
  showContactDisplayPlaceholder: false,
  controlBusy: false,
  actions: [_ActiveCallPad.ACTIONS_CTRL_MAP.muteCtrl, _ActiveCallPad.ACTIONS_CTRL_MAP.transferCtrl, _ActiveCallPad.ACTIONS_CTRL_MAP.holdCtrl]
};
//# sourceMappingURL=SimpleCallControlPanel.js.map
