"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransferCallPanel = void 0;

require("core-js/modules/es6.array.map");

var _juno = require("@ringcentral/juno");

var _iconDialer = _interopRequireDefault(require("@ringcentral/juno/icons/icon-dialer.svg"));

var _react = _interopRequireWildcard(require("react"));

var _CustomArrowButton = require("ringcentral-widgets/components/Rcui/CustomArrowButton");

var _PickList = require("../PickList");

var _SelectList = require("../SelectList");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
      color: ['primary', 'main'],
      variant: "plain",
      symbol: _iconDialer["default"]
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
