"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preventFocusChange = exports.getSimpleTextFieldFocusRingStyles = exports.SimpleTextField = void 0;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.starts-with.js");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _excluded = ["label", "className", "size", "disabled", "startAdornment", "endAdornment", "inputRef", "action", "classes", "RootProps"];
/* eslint-disable jsx-a11y/no-static-element-interactions */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var preventFocusChange = exports.preventFocusChange = function preventFocusChange(e) {
  e.preventDefault();
};
var useFocusTargetProps = function useFocusTargetProps(toFocusTarget) {
  return (0, _react.useMemo)(function () {
    return {
      onClick: function onClick() {
        var _toFocusTarget$curren;
        (_toFocusTarget$curren = toFocusTarget.current) === null || _toFocusTarget$curren === void 0 ? void 0 : _toFocusTarget$curren.focus();
      },
      onMouseDown: preventFocusChange
    };
  }, [toFocusTarget]);
};
var getSimpleTextFieldFocusRingStyles = exports.getSimpleTextFieldFocusRingStyles = function getSimpleTextFieldFocusRingStyles(disabled) {
  return (0, _clsx["default"])('relative overflow-hidden rounded-sui-sm', 'focus-ring-inset flex [--sui-focus-ring-color:--sui-color]  sui-color-neutral-b0/20 [--sui-focus-ring-inset-width:1px]', disabled ? 'bg-neutral-b5' : 'hover:bg-neutral-b5 transition-neutral-01-fast hover:sui-color-neutral-b2 [&:has(.focus-visible)]:sui-color-primary-f [&:has(.focus-visible)]:[--sui-focus-ring-inset-width:2px]');
};
var SimpleTextField = exports.SimpleTextField = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var label = _ref.label,
    className = _ref.className,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'xlarge' : _ref$size,
    disabled = _ref.disabled,
    startAdornment = _ref.startAdornment,
    endAdornment = _ref.endAdornment,
    inputRefProp = _ref.inputRef,
    action = _ref.action,
    classes = _ref.classes,
    RootProps = _ref.RootProps,
    rest = _objectWithoutProperties(_ref, _excluded);
  var id = (0, _springUi.useId)();
  var inputRef = (0, _react.useRef)(null);
  var fakeFocusRef = (0, _react.useRef)(null);
  var forkedInputRef = (0, _springUi.useForkRef)(inputRef, inputRefProp);
  var focusInputProps = useFocusTargetProps(inputRef);
  (0, _springUi.useEventListener)(fakeFocusRef, 'keydown', function (e) {
    if (e.key === 'Escape') {
      var _fakeFocusRef$current;
      (_fakeFocusRef$current = fakeFocusRef.current) === null || _fakeFocusRef$current === void 0 ? void 0 : _fakeFocusRef$current.blur();
      return;
    }
    var isAlphanumericKey = /^[a-zA-Z0-9]$/.test(e.key);
    // Check for arrow keys, alphanumeric keys, and enter, space
    if (e.key.startsWith('Arrow') || e.key === 'Enter' ||
    // when be tab, also focus to input that below with not prevent default to move to next element
    e.key === 'Tab' || e.key === ' ' || isAlphanumericKey) {
      var _inputRef$current;
      (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
    }

    // Prevent the default behavior for all keys except alphanumeric keys
    if (!isAlphanumericKey && e.key !== 'Tab') {
      e.preventDefault();
    }
  });

  // once blur, make that not able to focus manually
  (0, _springUi.useEventListener)(fakeFocusRef, 'blur', function () {
    var elm = fakeFocusRef.current;
    if (elm) {
      elm.tabIndex = -1;
      elm.classList.remove('focus-visible'); // for focus ring
    }
  });
  (0, _react.useImperativeHandle)(action, function () {
    return {
      fakeFocus: function fakeFocus() {
        var elm = fakeFocusRef.current;
        if (elm) {
          elm.tabIndex = 0;
          elm.classList.add('focus-visible'); // for focus ring
          elm.focus();
        }
      }
    };
  }, []);
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    ref: ref,
    className: (0, _clsx["default"])('sui-form-field sui-form-field-root sui-form-field-outlined sui-text-field sui-text-field-root grow sui-text-field-outlined outline-none', disabled && 'sui-disabled pointer-events-none', className),
    "aria-disabled": disabled
  }, RootProps), /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: id,
    className: (0, _clsx["default"])('sui-form-field-label sui-form-field-outlined-label inline-block max-w-fit', classes === null || classes === void 0 ? void 0 : classes.label)
  }, label), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(size === 'large' && 'h-9', size === 'xlarge' && 'h-12', 'flex items-center', getSimpleTextFieldFocusRingStyles(disabled))
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: "sr-only",
    tabIndex: -1,
    ref: fakeFocusRef
  }), startAdornment && /*#__PURE__*/_react["default"].createElement("div", _extends({
    className: "flex items-center pl-3"
  }, focusInputProps), startAdornment), /*#__PURE__*/_react["default"].createElement("input", _extends({
    tabIndex: disabled ? -1 : undefined,
    ref: forkedInputRef,
    disabled: disabled,
    autoComplete: "off",
    id: id,
    className: (0, _clsx["default"])('sui-text-field-input pl-3 h-full w-full pr-3', disabled && 'text-neutral-b3')
  }, rest)), endAdornment && /*#__PURE__*/_react["default"].createElement("div", _extends({
    className: "flex items-center pr-3"
  }, focusInputProps), endAdornment)));
});
SimpleTextField.displayName = 'SimpleTextField';
//# sourceMappingURL=SimpleTextField.js.map
