"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
require("core-js/modules/es.string.trim");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecipientsInputV2 = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("../RecipientsInput/i18n"));
var _DropdownList = require("./DropdownList");
var _PhoneNumberInput = require("./PhoneNumberInput");
var _SelectedRecipients = require("./SelectedRecipients");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } /* eslint-disable react/no-multi-comp */
/**
 * Specs:
 * 1. When dialer buttons are pressed, the cursor should be moved to the end of the string,
 *    and the focus set to the input field. RCINT-7706
 * 2. Simplify recipient/recipients property
 */

function isSplitterKey(e) {
  if (e.key === ',' || e.key === ';' || e.key === 'Enter' || e.key === 'Unidentified' && (
  // for Safari (FF cannot rely on keyCode...)
  e.keyCode === 186 ||
  // semicolon
  e.keyCode === 188 ||
  // comma
  e.keyCode === 13) // enter
  ) {
    return true;
  }
  return false;
}
var RecipientsInputV2 = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var className = _ref.className,
    enableTitle = _ref.enableTitle,
    recipients = _ref.recipients,
    multiple = _ref.multiple,
    useRCUI = _ref.useRCUI,
    value = _ref.value,
    removeFromRecipients = _ref.removeFromRecipients,
    recipientsClassName = _ref.recipientsClassName,
    placeholder = _ref.placeholder,
    currentLocale = _ref.currentLocale,
    onInputChange = _ref.onInputChange,
    onInputClear = _ref.onInputClear,
    _ref$label = _ref.label,
    label = _ref$label === void 0 ? "".concat(_i18n["default"].getString('to', currentLocale), ":") : _ref$label,
    searchContactList = _ref.searchContactList,
    formatContactPhone = _ref.formatContactPhone,
    phoneTypeRenderer = _ref.phoneTypeRenderer,
    phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
    contactInfoRenderer = _ref.contactInfoRenderer,
    contactPhoneRenderer = _ref.contactPhoneRenderer,
    _addToRecipients = _ref.addToRecipients,
    isLastInputFromDialpad = _ref.isLastInputFromDialpad;
  var thisEl = (0, _react.useRef)(null);
  var listEl = (0, _react.useRef)(null);
  var inputEl = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(value),
    _useState2 = _slicedToArray(_useState, 2),
    stateValue = _useState2[0],
    setStateValue = _useState2[1];
  var _useState3 = (0, _react.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedIndex = _useState4[0],
    setSelectedIndex = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isInputFocused = _useState6[0],
    setIsInputFocused = _useState6[1];
  var lastInputTimestamp = (0, _react.useRef)(0);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      focus: function focus() {
        setIsInputFocused(true);
        if (inputEl.current) {
          // @ts-expect-error TS(2339): Property 'focus' does not exist on type 'never'.
          inputEl.current.focus();
        }
      },
      blur: function blur() {
        setIsInputFocused(false);
        if (inputEl.current) {
          // @ts-expect-error TS(2339): Property 'blur' does not exist on type 'never'.
          inputEl.current.blur();
        }
      }
    };
  });
  (0, _react.useEffect)(function () {
    var handler = function handler(_ref2) {
      var target = _ref2.target;
      // @ts-expect-error TS(2339): Property 'contains' does not exist on type 'never'... Remove this comment to see the full error message
      if (thisEl.current && !thisEl.current.contains(target)) {
        if (inputEl.current) {
          // @ts-expect-error TS(2339): Property 'blur' does not exist on type 'never'.
          inputEl.current.blur();
        }
        setIsInputFocused(false);
      }
    };
    window.addEventListener('click', handler);
    return function () {
      window.removeEventListener('click', handler);
    };
  }, []); // pass [] so this only runs on mount and unmount

  (0, _react.useEffect)(function () {
    if (value !== stateValue && Date.now() - lastInputTimestamp.current > 300) {
      setStateValue(value);
    }
  }, [value, stateValue]);
  var toNumberInput = !multiple && recipients.length ? null : /*#__PURE__*/_react["default"].createElement(_PhoneNumberInput.PhoneNumberInput, {
    ref: inputEl,
    placeholder: placeholder,
    value: stateValue,
    currentLocale: currentLocale,
    onChange: function onChange(newValue) {
      lastInputTimestamp.current = Date.now();
      setStateValue(newValue);
      setSelectedIndex(0);
      onInputChange(newValue);
      if (listEl.current) {
        // @ts-expect-error TS(2339): Property 'setScrollPosition' does not exist on typ... Remove this comment to see the full error message
        listEl.current.setScrollPosition(0);
      }
    },
    onClear: function onClear() {
      setStateValue('');
      onInputClear();
    },
    onFocus: function onFocus() {
      setIsInputFocused(true);
    }
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].container, useRCUI ? _styles["default"].rcuiStyle : null, className),
    ref: thisEl,
    onKeyDown: function onKeyDown(e) {
      if (isInputFocused && stateValue.length >= 3) {
        if (e.key === 'ArrowUp') {
          if (selectedIndex > 0) {
            setSelectedIndex(function (prevIndex) {
              return prevIndex - 1;
            });
            if (selectedIndex - 1 < searchContactList.length - 4) {
              // @ts-expect-error TS(2531): Object is possibly 'null'.
              listEl.current.scrollUp();
            }
          }
        } else if (e.key === 'ArrowDown') {
          if (selectedIndex < searchContactList.length - 1) {
            setSelectedIndex(function (prevIndex) {
              return prevIndex + 1;
            });
            if (selectedIndex + 1 > 4) {
              // @ts-expect-error TS(2531): Object is possibly 'null'.
              listEl.current.scrollDown();
            }
          }
        }
      }
      if (isSplitterKey(e)) {
        e.preventDefault();
        var trimmedValue = stateValue.trim();
        var selectedContact = searchContactList[selectedIndex];
        if (trimmedValue.length === 0 && !selectedContact) {
          return;
        }
        if (selectedContact && e.key === 'Enter') {
          _addToRecipients(_objectSpread({}, selectedContact));
        } else {
          _addToRecipients({
            name: trimmedValue.replace(',', ''),
            phoneNumber: trimmedValue.replace(',', '')
          });
        }
      }
    }
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].label
  }, label), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(useRCUI && _styles["default"].rcuiStyle, _styles["default"].rightPanel)
  }, /*#__PURE__*/_react["default"].createElement(_SelectedRecipients.SelectedRecipients, {
    recipients: recipients,
    onRemove: removeFromRecipients,
    className: recipientsClassName
  }), toNumberInput), /*#__PURE__*/_react["default"].createElement(_DropdownList.DropdownList, {
    currentLocale: currentLocale,
    ref: listEl,
    selectedIndex: selectedIndex,
    setSelectedIndex: setSelectedIndex,
    addToRecipients: function addToRecipients(contact) {
      setStateValue('');
      onInputChange('');
      _addToRecipients(contact);
    },
    recipientOptions: searchContactList,
    formatContactPhone: formatContactPhone,
    visibility: isInputFocused && !isLastInputFromDialpad,
    enableTitle: enableTitle,
    phoneTypeRenderer: phoneTypeRenderer,
    phoneSourceNameRenderer: phoneSourceNameRenderer,
    recipientInfoRenderer: contactInfoRenderer,
    recipientPhoneRenderer: contactPhoneRenderer
  }));
});
exports.RecipientsInputV2 = RecipientsInputV2;
RecipientsInputV2.defaultProps = {
  enableTitle: false,
  multiple: false,
  useRCUI: false,
  isLastInputFromDialpad: false
};
//# sourceMappingURL=RecipientsInputV2.js.map
