"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputSelectWidget = void 0;
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var InputSelectWidget = exports.InputSelectWidget = function InputSelectWidget(filedProps) {
  var props = filedProps.uiSchema['ui:options'],
    formData = filedProps.formData,
    title = filedProps.schema.title,
    onChange = filedProps.onChange;
  var _ref = props,
    options = _ref.options,
    maxLength = _ref.maxLength;
  var _useState = (0, _react.useState)(formData !== null && formData !== void 0 ? formData : ''),
    _useState2 = _slicedToArray(_useState, 2),
    inputValue = _useState2[0],
    setInputValue = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isOpen = _useState4[0],
    setIsOpen = _useState4[1];
  var isFromDropdownRef = (0, _react.useRef)(false);
  var autoOptions = options.map(function (opt) {
    return {
      id: opt,
      label: opt
    };
  });
  (0, _react.useEffect)(function () {
    setInputValue(formData !== null && formData !== void 0 ? formData : '');
  }, [formData]);
  var handleInputChange = (0, _react.useCallback)(function (rawInputValue) {
    var newInputValue = trimStrToLen(rawInputValue, maxLength);
    if (!isFromDropdownRef.current) {
      setInputValue(newInputValue);
      onChange(newInputValue);
    }
    isFromDropdownRef.current = false;
  }, [onChange, maxLength]);
  var handleChange = (0, _react.useCallback)(function (selectedItems) {
    var _selectedItems$;
    var selectedValue = ((_selectedItems$ = selectedItems[0]) === null || _selectedItems$ === void 0 ? void 0 : _selectedItems$.label) || '';
    isFromDropdownRef.current = true;
    if (selectedValue) {
      setInputValue(selectedValue);
      onChange(selectedValue);
    }
    setIsOpen(false);
  }, [onChange]);
  var handleToggleClick = (0, _react.useCallback)(function () {
    setIsOpen(!isOpen);
  }, [isOpen]);
  var handleClose = (0, _react.useCallback)(function () {
    setIsOpen(false);
  }, []);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col gap-1"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Autocomplete, {
    RootProps: {
      'data-sign': 'subject'
    },
    freeSolo: true,
    toggleButton: true,
    label: title,
    value: [] // Keep value as empty array since we're using inputValue for the actual value
    ,
    inputValue: inputValue,
    onInputChange: handleInputChange,
    onChange: handleChange,
    onClose: handleClose,
    options: autoOptions,
    ToggleButtonProps: {
      disabled: false,
      onClick: handleToggleClick
    },
    inputVariant: "outlined",
    openOnFocus: false,
    toggleWithInput: false,
    open: isOpen,
    inputProps: {
      maxLength: maxLength
    },
    size: "medium"
  }));
};
function trimStrToLen(str, length) {
  if (!str) return '';
  return str.substring(0, length);
}
//# sourceMappingURL=InputSelectWidget.js.map
