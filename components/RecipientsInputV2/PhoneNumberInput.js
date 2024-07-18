"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneNumberInput = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("../RecipientsInput/i18n"));
var _RemoveButton = require("../RemoveButton");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PhoneNumberInput = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var currentLocale = _ref.currentLocale,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? _i18n["default"].getString('enterNameOrNumber', currentLocale) : _ref$placeholder,
    value = _ref.value,
    _onChange = _ref.onChange,
    onClear = _ref.onClear,
    onFocus = _ref.onFocus,
    isFocused = _ref.isFocused;
  var inputEl = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      focus: function focus() {
        // Ensure focus is called in the next event cycle
        // This avoids any event handler in the same cycle messing up the focus
        setTimeout(function () {
          if (inputEl.current) {
            // @ts-expect-error TS(2339): Property 'focus' does not exist on type 'never'.
            inputEl.current.focus();
          }
        }, 0);
      },
      blur: function blur() {
        if (inputEl.current) {
          // @ts-expect-error TS(2339): Property 'blur' does not exist on type 'never'.
          inputEl.current.blur();
        }
      }
    };
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].inputWrapper
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].inputField, isFocused && 'Mui-focused', 'MuiInput-underline')
  }, /*#__PURE__*/_react["default"].createElement("input", {
    "data-sign": "recipientsInput",
    ref: inputEl,
    name: "receiver",
    value: value
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    ,
    onChange: function onChange(_ref2) {
      var value = _ref2.currentTarget.value;
      return _onChange(value);
    },
    onPaste: function onPaste(ev) {
      console.log(ev);
    },
    className: _styles["default"].numberInput,
    maxLength: 30,
    onFocus: onFocus
    // @ts-expect-error TS(2322): Type '{} | null' is not assignable to type 'string... Remove this comment to see the full error message
    ,
    placeholder: placeholder,
    autoComplete: "off"
  })), /*#__PURE__*/_react["default"].createElement(_RemoveButton.RemoveButton, {
    className: _styles["default"].removeButton
    // @ts-expect-error TS(2322): Type '(() => void) | undefined' is not assignable ... Remove this comment to see the full error message
    ,
    onClick: onClear,
    visibility: value.length > 0
  }));
});
exports.PhoneNumberInput = PhoneNumberInput;
PhoneNumberInput.defaultProps = {
  isFocused: false
};
//# sourceMappingURL=PhoneNumberInput.js.map
