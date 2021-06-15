"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.symbol");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallHistoryCallLogPanel = void 0;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _juno = require("@ringcentral/juno");

var _BasicCallInfo = require("ringcentral-widgets/components/BasicCallInfo");

var _CallLogPanel = _interopRequireDefault(require("ringcentral-widgets/components/CallLogPanel"));

var _EvActivityCallUI = require("../../interfaces/EvActivityCallUI.interface");

var _IvrInfo = require("../ActivityCallLogPanel/IvrInfo");

var _utils = require("../ActivityCallLogPanel/utils");

var _styles = _interopRequireDefault(require("../ActivityCallLogPanel/styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
      callLogCallControl: (0, _classnames["default"])(_styles["default"].callLogCallControl, _styles["default"].noneShadow)
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
    isInTransferPage: false // TODO: that need refactor CallLogPanel and then can remove that
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
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].submitButton)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
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
