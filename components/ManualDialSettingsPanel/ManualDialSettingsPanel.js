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
exports.ManualDialSettingsPanel = void 0;

require("core-js/modules/es6.array.map");

var _juno = require("@ringcentral/juno");

var _react = _interopRequireWildcard(require("react"));

var _i18n = _interopRequireDefault(require("../../modules/EvManualDialSettingsUI/i18n"));

var _ListItemWithScrollCheck = require("../ListItemWithScrollCheck");

var _SearchSelectField = require("../SearchSelectField");

var _i18n2 = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _SelectList = require("../SelectList");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ManualDialSettingsPanel = function ManualDialSettingsPanel(_ref) {
  var currentLocale = _ref.currentLocale,
      goBack = _ref.goBack,
      init = _ref.init,
      settingFields = _ref.settingFields,
      save = _ref.save;
  (0, _react.useEffect)(function () {
    init(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_SelectList.BackHeader, {
    currentLocale: currentLocale,
    title: _i18n["default"].getString('manualDialSettings', currentLocale),
    onBackClick: goBack
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].container
  }, settingFields.map(function (_ref2, key) {
    var select = _ref2.select,
        input = _ref2.input,
        dataSign = _ref2.dataSign,
        _onChange = _ref2.onChange,
        _onBlur = _ref2.onBlur,
        value = _ref2.value;

    if (select) {
      return /*#__PURE__*/_react["default"].createElement(_SearchSelectField.SearchSelectField, {
        input: true,
        key: key,
        InputProps: {
          value: select.renderValue,
          required: select.required,
          'data-sign': dataSign
        },
        options: select.options,
        currentLocale: currentLocale,
        searchOption: select.searchOption,
        title: select.label,
        listRenderer: function listRenderer(transferPhoneBook, scrollCheck, toggleOpen) {
          return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, transferPhoneBook.map(function (obj, i) {
            var thisValue = select.getItemValue(obj);
            return /*#__PURE__*/_react["default"].createElement(_ListItemWithScrollCheck.ListItemWithScrollCheck, {
              onClick: function onClick() {
                _onChange(thisValue);

                toggleOpen();
              },
              key: i,
              selected: thisValue === value,
              scrollCheck: scrollCheck,
              className: _styles["default"].listItem,
              "data-sign": "".concat(dataSign, "-").concat(thisValue)
            }, select.itemRenderer(obj));
          }));
        }
      });
    }

    if (input) {
      return /*#__PURE__*/_react["default"].createElement(_juno.RcTextField, {
        key: key,
        label: input.label,
        inputProps: {
          min: input.min,
          max: 120
        },
        clearBtn: false,
        type: input.type,
        required: input.required,
        placeholder: input.placeholder,
        value: value,
        "data-sign": dataSign,
        onBlur: function onBlur() {
          return _onBlur();
        },
        onChange: function onChange(e) {
          return _onChange(e.target.value);
        },
        fullWidth: true,
        InputProps: {
          endAdornment: /*#__PURE__*/_react["default"].createElement("span", null, _i18n2["default"].getString('second', currentLocale))
        }
      });
    }

    return null;
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].footer
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    "data-sign": "saveButton",
    size: "medium",
    fullWidth: true,
    onClick: function onClick() {
      return save();
    }
  }, _i18n2["default"].getString('save', currentLocale))));
};

exports.ManualDialSettingsPanel = ManualDialSettingsPanel;
//# sourceMappingURL=ManualDialSettingsPanel.js.map
