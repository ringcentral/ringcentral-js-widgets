"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.index-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallHistoryCallLogPanel = void 0;
var _BasicCallInfo = require("@ringcentral-integration/widgets/components/BasicCallInfo");
var _CallLogPanel = _interopRequireDefault(require("@ringcentral-integration/widgets/components/CallLogPanel"));
var _juno = require("@ringcentral/juno");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _EvActivityCallUI = require("../../interfaces/EvActivityCallUI.interface");
var _ActivityCallLogWrapper = require("../ActivityCallLogPanel/ActivityCallLogWrapper");
var _IvrInfo = require("../ActivityCallLogPanel/IvrInfo");
var _styles = _interopRequireDefault(require("../ActivityCallLogPanel/styles.scss"));
var _utils = require("../ActivityCallLogPanel/utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
var CallHistoryCallLogPanel = function CallHistoryCallLogPanel(_ref) {
  var currentLocale = _ref.currentLocale,
    currentLog = _ref.currentLog,
    basicInfo = _ref.basicInfo,
    isInbound = _ref.isInbound,
    disposeCall = _ref.disposeCall,
    status = _ref.status,
    saveStatus = _ref.saveStatus,
    disableDispose = _ref.disableDispose,
    isWide = _ref.isWide,
    ivrAlertData = _ref.ivrAlertData,
    onCopySuccess = _ref.onCopySuccess,
    scrollTo = _ref.scrollTo,
    referenceFieldOptions = _ref.referenceFieldOptions,
    method = _ref.method,
    rest = _objectWithoutProperties(_ref, ["currentLocale", "currentLog", "basicInfo", "isInbound", "disposeCall", "status", "saveStatus", "disableDispose", "isWide", "ivrAlertData", "onCopySuccess", "scrollTo", "referenceFieldOptions", "method"]);
  var rootRef = (0, _react.useRef)(null);
  var isLoading = saveStatus === _EvActivityCallUI.saveStatus.saving;
  var headerTitle = "".concat(method, "CallLog");
  var editLogSection = (0, _react.useCallback)(function (props) {
    var _rootRef$current;
    return /*#__PURE__*/_react["default"].createElement(_utils.EditLogSection, _extends({
      isWide: isWide
    }, props, {
      scrollTo: scrollTo,
      rootRef: (_rootRef$current = rootRef.current) === null || _rootRef$current === void 0 ? void 0 : _rootRef$current.editSectionRef,
      referenceFieldOptions: referenceFieldOptions
    }));
  }, [isWide, scrollTo, referenceFieldOptions]);
  var buttonText;
  if (saveStatus === _EvActivityCallUI.callLogMethods.create || saveStatus === _EvActivityCallUI.saveStatus.submit) {
    buttonText = _EvActivityCallUI.callLogMethods.create;
  } else {
    buttonText = saveStatus;
  }
  return /*#__PURE__*/_react["default"].createElement(_CallLogPanel["default"], _extends({
    ref: rootRef
  }, rest, {
    currentLog: currentLog,
    currentLocale: currentLocale,
    classes: {
      root: _styles["default"].root,
      callLogCallControl: (0, _clsx["default"])(_styles["default"].callLogCallControl, _styles["default"].noneShadow)
    },
    refs: {
      root: rootRef
    },
    isWide: isWide,
    header: true,
    headerTitle: headerTitle,
    renderSaveLogButton: function renderSaveLogButton() {
      return null;
    },
    showSpinner: false,
    isInTransferPage: false
    // TODO: that need refactor CallLogPanel and then can remove that
    ,
    currentIdentify: "123",
    renderEditLogSection: editLogSection,
    renderBasicInfo: function renderBasicInfo() {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_BasicCallInfo.BasicCallInfo, {
        status: status,
        currentLocale: currentLocale,
        isInbound: isInbound,
        isRinging: false,
        subject: basicInfo.subject,
        followInfos: basicInfo.followInfos,
        callInfos: basicInfo.callInfos,
        onCopySuccess: onCopySuccess,
        classes: {
          panel: _styles["default"].noneShadow
        }
      }), (ivrAlertData === null || ivrAlertData === void 0 ? void 0 : ivrAlertData.length) > 0 && /*#__PURE__*/_react["default"].createElement(_IvrInfo.IvrInfo, {
        isCallEnd: true,
        ivrAlertData: ivrAlertData
      }));
    }
  }), /*#__PURE__*/_react["default"].createElement(_ActivityCallLogWrapper.SubmitButtonWrapper, null, /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    "data-sign": method,
    size: "large",
    fullWidth: true,
    disabled: disableDispose,
    loading: isLoading,
    onClick: disposeCall
  }, (0, _utils.getButtonText)(buttonText, currentLocale))));
};
exports.CallHistoryCallLogPanel = CallHistoryCallLogPanel;
//# sourceMappingURL=CallHistoryCallLogPanel.js.map
