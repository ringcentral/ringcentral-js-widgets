"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.assign.js");
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
exports.MultiSelectField = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.trim.js");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireWildcard(require("react"));
var _i18n = require("./i18n");
var _excluded = ["options", "labelClassName", "value", "onChange", "label", "placeholder", "disabled", "onOpen"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
/**
 * TODO:
 * 1. this feature needs to be UX reviewed if prioritized
 */

var MultiSelectField = exports.MultiSelectField = function MultiSelectField(_ref) {
  var _fieldRef$current;
  var options = _ref.options,
    labelClassName = _ref.labelClassName,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? [] : _ref$value,
    onChange = _ref.onChange,
    label = _ref.label,
    placeholder = _ref.placeholder,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    onOpen = _ref.onOpen,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    anchorEl = _useState2[0],
    setAnchorEl = _useState2[1];
  var fieldRef = (0, _react.useRef)(null);
  var _useState3 = (0, _react.useState)(function () {
      return value.filter(function (v) {
        return v.trim() !== '';
      });
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedValues = _useState4[0],
    setSelectedValues = _useState4[1];
  var filteredValues = (0, _react.useMemo)(function () {
    return selectedValues.filter(function (v) {
      return v.trim() !== '';
    });
  }, [selectedValues]);
  var handleFieldClick = (0, _react.useCallback)(function () {
    setAnchorEl(fieldRef.current);
    onOpen === null || onOpen === void 0 ? void 0 : onOpen();
  }, [onOpen]);
  var handleClose = function handleClose() {
    setAnchorEl(null);
  };
  var handleSelect = (0, _react.useCallback)(function (selectedValue) {
    var newValue = selectedValues.includes(selectedValue) ? selectedValues.filter(function (item) {
      return item !== selectedValue;
    }) : [].concat(_toConsumableArray(selectedValues), [selectedValue]);
    setSelectedValues(newValue.filter(function (v) {
      return v.trim() !== '';
    }));
  }, [selectedValues]);
  var handleOkClick = (0, _react.useCallback)(function () {
    onChange === null || onChange === void 0 ? void 0 : onChange(filteredValues);
    handleClose();
  }, [onChange, filteredValues, handleClose]);
  var displayValue = (0, _react.useMemo)(function () {
    return filteredValues.length > 0 ? filteredValues.map(function (value) {
      var option = options.find(function (o) {
        return o.value === value;
      });
      return (option === null || option === void 0 ? void 0 : option.label) || value;
    }).join(', ') : '';
  }, [options, filteredValues]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: fieldRef
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcTextField, _extends({
    clearBtn: false,
    onClick: handleFieldClick,
    value: displayValue,
    placeholder: placeholder,
    label: label,
    disabled: disabled,
    fullWidth: true,
    InputProps: {
      readOnly: true,
      endAdornment: /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
        size: "small",
        symbol: _junoIcon.ArrowDown2
      })
    }
  }, rest)), /*#__PURE__*/_react["default"].createElement(_juno.RcPopover, {
    open: Boolean(anchorEl),
    anchorEl: anchorEl,
    onClose: handleClose,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left'
    },
    PaperProps: {
      style: {
        width: ((_fieldRef$current = fieldRef.current) === null || _fieldRef$current === void 0 ? void 0 : _fieldRef$current.offsetWidth) || '100%'
      }
    }
  }, anchorEl && /*#__PURE__*/_react["default"].createElement("div", null, options.map(function (item, index) {
    return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      key: index,
      onClick: function onClick() {
        return handleSelect(item.value);
      }
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
      checked: selectedValues.includes(item.value),
      onChange: function onChange() {
        return handleSelect(item.value);
      }
    }), item.label);
  }), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    variant: "contained",
    onClick: handleOkClick
  }, (0, _i18n.t)('ok'))))));
};
//# sourceMappingURL=MultiSelectField.js.map
