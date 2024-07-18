"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.map");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransferCallPanel = void 0;
var _CustomArrowButton = require("@ringcentral-integration/widgets/components/Rcui/CustomArrowButton");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireWildcard(require("react"));
var _PickList = require("../PickList");
var _SelectList = require("../SelectList");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
var TransferCallPanel = function TransferCallPanel(_ref) {
  var currentLocale = _ref.currentLocale,
    goBack = _ref.goBack,
    clickCallRecipient = _ref.clickCallRecipient,
    transferring = _ref.transferring,
    clickTransferTypeFiled = _ref.clickTransferTypeFiled,
    setStayOnCall = _ref.setStayOnCall,
    isStayOnCall = _ref.isStayOnCall,
    transferOptions = _ref.transferOptions,
    selectedTransferType = _ref.selectedTransferType,
    textFields = _ref.textFields,
    transferCallDisabled = _ref.transferCallDisabled,
    transferCall = _ref.transferCall,
    setCancelTemplate = _ref.setCancelTemplate,
    cancelTransfer = _ref.cancelTransfer,
    cancelTransferPage = _ref.cancelTransferPage,
    isWide = _ref.isWide;
  (0, _react.useEffect)(function () {
    setCancelTemplate( /*#__PURE__*/_react["default"].createElement(_juno.RcSnackbarAction, {
      onClick: function onClick() {
        return cancelTransfer();
      }
    }, _i18n["default"].getString('cancel', currentLocale)));
  }, []);
  var endAdornment = (0, _react.useCallback)(function (disabled) {
    return selectedTransferType === 'manualEntry' ? /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
      size: "medium",
      color: "interactive.f01",
      variant: "plain",
      symbol: _junoIcon.Dialer
    }) : /*#__PURE__*/_react["default"].createElement(_CustomArrowButton.CustomArrowButton, {
      disabled: disabled
    });
  }, [selectedTransferType]);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_SelectList.BackHeader, {
    currentLocale: currentLocale,
    title: _i18n["default"].getString('transfer', currentLocale),
    onBackClick: goBack
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].wrapper
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].container
  }, /*#__PURE__*/_react["default"].createElement(_PickList.PickList, {
    "data-sign": "transferType",
    options: transferOptions,
    label: _i18n["default"].getString('transferType', currentLocale),
    optionValueKey: "type",
    value: selectedTransferType,
    onChange: function onChange(type) {
      clickTransferTypeFiled(type);
    }
  }), textFields === null || textFields === void 0 ? void 0 : textFields.map(function (_ref2, index) {
    var label = _ref2.label,
      value = _ref2.value,
      placeholder = _ref2.placeholder,
      disabled = _ref2.disabled,
      readonly = _ref2.readonly,
      router = _ref2.router;
    return /*#__PURE__*/_react["default"].createElement(_juno.RcTextField, {
      key: index,
      gutterBottom: true,
      "data-sign": "callRecipient".concat(index),
      disabled: disabled,
      label: label,
      value: value,
      fullWidth: true,
      clearBtn: false,
      placeholder: placeholder,
      classes: {
        root: readonly ? _styles["default"].nonePointerEvent : undefined
      },
      InputProps: !readonly ? {
        readOnly: true,
        endAdornment: endAdornment(disabled)
      } : undefined,
      onClick: function onClick() {
        return clickCallRecipient(router);
      }
    });
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
    "data-sign": "stayOnCall",
    label: _i18n["default"].getString('stayOnCall', currentLocale),
    checked: isStayOnCall,
    onClick: function onClick() {
      return setStayOnCall(isStayOnCall);
    },
    formControlLabelProps: {
      classes: {
        root: _styles["default"].stayOnCall
      }
    }
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].buttons
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    "data-sign": "cancel",
    classes: {
      root: _styles["default"].cancelButton
    },
    fullWidth: !isWide,
    size: "medium",
    onClick: cancelTransferPage,
    variant: "outlined"
  }, _i18n["default"].getString('cancel', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    "data-sign": "transferCall",
    disabled: transferCallDisabled,
    loading: transferring,
    fullWidth: !isWide,
    size: "medium",
    onClick: transferCall
  }, _i18n["default"].getString('Transfer', currentLocale)))));
};
exports.TransferCallPanel = TransferCallPanel;
//# sourceMappingURL=TransferCallPanel.js.map
