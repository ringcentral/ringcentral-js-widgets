"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _rxjs = require("rxjs");
var _LogBasicInfo = _interopRequireDefault(require("../LogBasicInfo"));
var _SpinnerOverlay = require("../SpinnerOverlay");
var _SaveButton = require("./SaveButton");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var LogSection = function LogSection(_ref) {
  var isInnerMask = _ref.isInnerMask,
    _ref$currentLog = _ref.currentLog,
    currentLog = _ref$currentLog === void 0 ? {} : _ref$currentLog,
    _ref$onLogBasicInfoCl = _ref.onLogBasicInfoClick,
    onLogBasicInfoClick = _ref$onLogBasicInfoCl === void 0 ? _rxjs.noop : _ref$onLogBasicInfoCl,
    _ref$renderSmallCallC = _ref.renderSmallCallContrl,
    renderSmallCallContrl = _ref$renderSmallCallC === void 0 ? _rxjs.noop : _ref$renderSmallCallC,
    _ref$showSaveLogBtn = _ref.showSaveLogBtn,
    showSaveLogBtn = _ref$showSaveLogBtn === void 0 ? true : _ref$showSaveLogBtn,
    renderSaveLogButton = _ref.renderSaveLogButton,
    currentLocale = _ref.currentLocale,
    formatPhone = _ref.formatPhone,
    onSaveCallLog = _ref.onSaveCallLog,
    _ref$showSmallCallCon = _ref.showSmallCallControl,
    showSmallCallControl = _ref$showSmallCallCon === void 0 ? true : _ref$showSmallCallCon,
    renderEditLogSection = _ref.renderEditLogSection,
    onUpdateCallLog = _ref.onUpdateCallLog,
    additionalInfo = _ref.additionalInfo,
    onCallLogSaved = _ref.onCallLogSaved;
  var scrollRef = (0, _react.useRef)(null);
  var showSpinner = currentLog.showSpinner;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    mainCtrlOverlapped = _useState2[0],
    setMainCtrlOverlapped = _useState2[1];
  var checkOverlap = function checkOverlap(e) {
    var _ref2 = e.target,
      scrollHeight = _ref2.scrollHeight,
      clientHeight = _ref2.clientHeight,
      scrollTop = _ref2.scrollTop;
    var overlappedHeight = scrollHeight - clientHeight - scrollTop;
    var beOverlapped = overlappedHeight > 1;
    if (beOverlapped !== mainCtrlOverlapped) {
      setMainCtrlOverlapped(beOverlapped);
    }
  };
  (0, _juno.useEventListener)(window, 'resize', checkOverlap);
  (0, _juno.useEventListener)(scrollRef, 'scroll', checkOverlap);
  var getEditLogSection = function getEditLogSection() {
    return renderEditLogSection === null || renderEditLogSection === void 0 ? void 0 : renderEditLogSection({
      currentLocale: currentLocale,
      onSaveCallLog: onSaveCallLog,
      onUpdateCallLog: onUpdateCallLog,
      currentLog: currentLog,
      additionalInfo: additionalInfo,
      onCallLogSaved: onCallLogSaved
    });
  };
  var genSaveLogButton = function genSaveLogButton() {
    var call = currentLog.call,
      currentLogCall = currentLog.currentLogCall;
    if (!showSaveLogBtn) {
      return null;
    }
    if (renderSaveLogButton) {
      return renderSaveLogButton({
        currentLocale: currentLocale,
        onSaveCallLog: onSaveCallLog,
        currentLog: currentLog,
        overlapped: mainCtrlOverlapped
      });
    }
    return /*#__PURE__*/_react["default"].createElement(_SaveButton.SaveButton, {
      isSaving: currentLogCall.isSaving,
      onClick: function onClick() {
        return onSaveCallLog === null || onSaveCallLog === void 0 ? void 0 : onSaveCallLog(call);
      },
      overlapped: mainCtrlOverlapped
    }, _i18n["default"].getString('saveLog', currentLocale));
  };
  var renderLogBasicInfo = function renderLogBasicInfo() {
    var currentSessionId = currentLog.currentSessionId,
      call = currentLog.call;
    var telephonyStatus = call.telephonyStatus,
      result = call.result;
    var status = telephonyStatus || result;
    var isActive = !result;
    var clickable = isActive && !(0, _callLogHelpers.isRingingInboundCall)(call);
    var extraButton;
    if (showSmallCallControl && isActive) {
      extraButton = renderSmallCallContrl(status, currentSessionId);
    }
    return /*#__PURE__*/_react["default"].createElement(_LogBasicInfo["default"], {
      dataSign: "leftSectionInfo",
      currentLog: currentLog,
      currentLocale: currentLocale,
      formatPhone: formatPhone,
      extraButton: extraButton,
      clickable: clickable,
      onClick: clickable ? onLogBasicInfoClick : function () {
        //
      }
    });
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root
  }, showSpinner ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, {
    className: _styles["default"].spinner
  }) : null, renderLogBasicInfo(), /*#__PURE__*/_react["default"].createElement("div", {
    ref: scrollRef,
    className: _styles["default"].editSection
  }, getEditLogSection()), genSaveLogButton(), isInnerMask ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].innerMask
  }) : null);
};
var _default = LogSection;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
