"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManualDialSettingsPanel = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("../../modules/EvManualDialSettingsUI/i18n"));
var _ListItemWithScrollCheck = require("../ListItemWithScrollCheck");
var _SearchSelectField = require("../SearchSelectField");
var _SelectList = require("../SelectList");
var _i18n2 = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var ManualDialSettingsPanel = exports.ManualDialSettingsPanel = function ManualDialSettingsPanel(_ref) {
  var currentLocale = _ref.currentLocale,
    goBack = _ref.goBack,
    init = _ref.init,
    settingFields = _ref.settingFields,
    save = _ref.save;
  (0, _react.useEffect)(function () {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        gutterBottom: true,
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
//# sourceMappingURL=ManualDialSettingsPanel.js.map
