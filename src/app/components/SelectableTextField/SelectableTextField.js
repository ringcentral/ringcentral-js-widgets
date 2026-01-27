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
exports.SelectableTextField = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.trim.js");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var motionProps = (0, _springUi.getGrow)({
  direction: 'y',
  transformOrigin: {
    vertical: 'bottom',
    horizontal: 'center'
  }
});

/**
 * A text field with a dropdown menu that allows selecting from a list of options.
 *
 * also support search feature when `searchable` is `true`
 */
var SelectableTextField = exports.SelectableTextField = function SelectableTextField(_ref) {
  var label = _ref.label,
    options = _ref.options,
    value = _ref.value,
    onChange = _ref.onChange,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$searchable = _ref.searchable,
    searchable = _ref$searchable === void 0 ? false : _ref$searchable,
    _ref$freeSoloOptionLa = _ref.freeSoloOptionLabel,
    freeSoloOptionLabel = _ref$freeSoloOptionLa === void 0 ? 'Custom' : _ref$freeSoloOptionLa;
  var inputRef = (0, _react.useRef)(null);
  var ref = (0, _react.useRef)(null);
  var focusedIndexRef = (0, _react.useRef)(-1);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    inputFocus = _useState2[0],
    setInputFocus = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    menuOpened = _useState4[0],
    _setMenuOpened = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    searching = _useState6[0],
    setSearching = _useState6[1];
  var _useRefState = (0, _springUi.useRefState)(value),
    _useRefState2 = _slicedToArray(_useRefState, 2),
    innerValueRef = _useRefState2[0],
    setInnerValue = _useRefState2[1];
  var forceUpdate = (0, _springUi.useForceUpdate)();
  var innerValue = innerValueRef.current;
  var displayOptions = (0, _react.useMemo)(function () {
    if (!searching || !searchable) return options;
    return options.filter(function (_ref2) {
      var value = _ref2.value;
      return value.includes(innerValue);
    });
  }, [options, innerValue, searching, searchable]);
  var selectedLabel = (0, _react.useMemo)(function () {
    if (!value) return '';
    var selected = options.find(function (option) {
      return option.value === value;
    });
    return selected ? selected.label : freeSoloOptionLabel;
  }, [value, options, freeSoloOptionLabel]);
  var hasOptions = options.length > 0;
  var setMenuOpened = function setMenuOpened(val) {
    if (menuOpened && menuOpened !== val) {
      focusedIndexRef.current = -1;
      setSearching(false);
    }
    _setMenuOpened(val);
  };
  var focusInput = function focusInput() {
    var _inputRef$current;
    (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
  };
  var _useEventListener = (0, _springUi.useEventListener)(ref, 'keydown', function () {
      focusInput();
    }, {
      once: true,
      startImmediately: false
    }),
    listenRootKeyDown = _useEventListener.listen,
    stopListenRootKeyDown = _useEventListener.remove;
  var focusRoot = function focusRoot() {
    var rootElm = ref.current;
    if (rootElm) {
      rootElm.tabIndex = 0;
      rootElm.focus();
      listenRootKeyDown();
    }
  };
  var selectItem = function selectItem(value) {
    setMenuOpened(false);
    setInnerValue(value);
    onChange(value);
    setInputFocus(false);
    focusRoot();
  };
  var _useKeyboardMoveFocus = (0, _springUi.useKeyboardMoveFocus)({
      options: displayOptions,
      focusedIndexRef: focusedIndexRef,
      infinite: true,
      columns: 1,
      onFocusedIndexChange: function onFocusedIndexChange(event, toIndex) {
        event.preventDefault();
        focusedIndexRef.current = toIndex;
        forceUpdate();
      }
    }),
    onKeyFocusedIndexHandle = _useKeyboardMoveFocus.onKeyFocusedIndexHandle;
  var hideLabel = inputFocus || !hasOptions;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_springUi.TextField, {
    ref: ref,
    classes: {
      formFieldContent: 'pointer-events-none pr-2'
    },
    RootProps: {
      className: 'outline-none',
      onClick: focusInput,
      onBlur: function onBlur() {
        stopListenRootKeyDown();
        ref.current.tabIndex = -1;
      }
    },
    inputRef: inputRef,
    fullWidth: true,
    label: label,
    className: (0, _clsx["default"])(!inputFocus && hasOptions && '[&_input]:text-right'),
    size: "large",
    clearBtn: false,
    disabled: disabled,
    inputProps: {
      maxLength: 30,
      'data-sign': 'autocompleteInput'
    },
    startAdornment: !!selectedLabel && !hideLabel && /*#__PURE__*/_react["default"].createElement("span", {
      "data-sign": "selectedLabel",
      className: (0, _clsx["default"])('typography-mainText max-w-20 truncate pointer-events-auto'),
      title: selectedLabel
    }, selectedLabel),
    endAdornment: hasOptions ? /*#__PURE__*/_react["default"].createElement(_springUi.Squircle, {
      className: (0, _clsx["default"])('sui-select-chevron', menuOpened ? 'text-primary-f sui-squircle-bg-color-neutral-b4' : ''),
      interactive: false
    }, /*#__PURE__*/_react["default"].createElement(_springUi.ExpandCollapseCaret, {
      tabIndex: -1,
      size: 'small',
      expanded: menuOpened
    })) : undefined,
    value: inputFocus ? innerValueRef.current : value,
    variant: "outlined",
    onChange: function onChange(e) {
      focusedIndexRef.current = -1;
      var currentValue = e.target.value;
      setInnerValue(currentValue);
      if (searchable && menuOpened) {
        setSearching(true);
      }
      setMenuOpened(true);
    },
    onFocus: function onFocus() {
      setMenuOpened(true);
      setInputFocus(true);
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === 'Enter') {
        if (menuOpened && focusedIndexRef.current >= 0) {
          selectItem(displayOptions[focusedIndexRef.current].value);
        } else {
          focusRoot();
        }
        e.preventDefault();
        return;
      }
      if (!menuOpened && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        setMenuOpened(true);
        focusedIndexRef.current = 0;
        e.preventDefault();
        return;
      }
      if (e.key === 'Escape') {
        if (menuOpened) {
          setMenuOpened(false);
        } else {
          setInnerValue(value, false);
          focusRoot();
        }
        e.preventDefault();
        return;
      }
      onKeyFocusedIndexHandle(e);
    },
    onBlur: function onBlur() {
      setMenuOpened(false);
      setInputFocus(false);
      var innerValue = innerValueRef.current;
      if (!innerValue.trim()) {
        setInnerValue(value);
      } else {
        var _options$;
        onChange(innerValue || (options === null || options === void 0 ? void 0 : (_options$ = options[0]) === null || _options$ === void 0 ? void 0 : _options$.value) || '');
      }
    }
  }), !!hasOptions && /*#__PURE__*/_react["default"].createElement(_springUi.Menu, {
    "data-sign": "autocompleteMenu",
    disableAutoFocus: true,
    disableRestoreFocus: true,
    disableBackdropClick: true,
    hideBackdrop: true,
    placement: "bottom",
    PopperProps: {
      offset: 0,
      matchAnchorWidth: true
    },
    motionProps: motionProps,
    open: Boolean(ref.current) && menuOpened,
    anchorEl: ref.current,
    onClose: function onClose() {
      setMenuOpened(false);
    }
  }, displayOptions.map(function (_ref3, i) {
    var label = _ref3.label,
      value = _ref3.value;
    return /*#__PURE__*/_react["default"].createElement(_springUi.ListItem, {
      "data-sign": "selectMenuItem",
      key: value,
      divider: false,
      focused: focusedIndexRef.current === i,
      onClick: function onClick() {
        selectItem(value);
      },
      onMouseDown: function onMouseDown(e) {
        e.preventDefault();
      }
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex justify-between w-full"
    }, /*#__PURE__*/_react["default"].createElement("span", null, label), /*#__PURE__*/_react["default"].createElement("span", null, value)));
  })));
};
//# sourceMappingURL=SelectableTextField.js.map
