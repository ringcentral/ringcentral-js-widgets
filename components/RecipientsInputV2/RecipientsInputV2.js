"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecipientsInputV2 = void 0;

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.date.now");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _DropdownList = require("./DropdownList");

var _SelectedRecipients = require("./SelectedRecipients");

var _PhoneNumberInput = require("./PhoneNumberInput");

var _i18n = _interopRequireDefault(require("../RecipientsInput/i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Specs:
 * 1. When dialer buttons are pressed, the cursor should be moved to the end of the string,
 *    and the focus set to the input field. RCINT-7706
 * 2. Simplify recipient/recipients property
 */
function isSplitterKey(e) {
  if (e.key === ',' || e.key === ';' || e.key === 'Enter' || e.key === 'Unidentified' && ( // for Safari (FF cannot rely on keyCode...)
  e.keyCode === 186 || // semicolon
  e.keyCode === 188 || // comma
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
          inputEl.current.focus();
        }
      },
      blur: function blur() {
        setIsInputFocused(false);

        if (inputEl.current) {
          inputEl.current.blur();
        }
      }
    };
  });
  (0, _react.useEffect)(function () {
    var handler = function handler(_ref2) {
      var target = _ref2.target;

      if (thisEl.current && !thisEl.current.contains(target)) {
        if (inputEl.current) {
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
    className: (0, _classnames["default"])(_styles["default"].container, useRCUI ? _styles["default"].rcuiStyle : null, className),
    ref: thisEl,
    onKeyDown: function onKeyDown(e) {
      if (isInputFocused && stateValue.length >= 3) {
        if (e.key === 'ArrowUp') {
          if (selectedIndex > 0) {
            setSelectedIndex(function (prevIndex) {
              return prevIndex - 1;
            });

            if (selectedIndex - 1 < searchContactList.length - 4) {
              listEl.current.scrollUp();
            }
          }
        } else if (e.key === 'ArrowDown') {
          if (selectedIndex < searchContactList.length - 1) {
            setSelectedIndex(function (prevIndex) {
              return prevIndex + 1;
            });

            if (selectedIndex + 1 > 4) {
              listEl.current.scrollDown();
            }
          }
        }
      }

      if (isSplitterKey(e)) {
        e.preventDefault();

        if (stateValue.length === 0) {
          return;
        }

        var selectedContact = searchContactList[selectedIndex];

        if (selectedContact && e.key === 'Enter') {
          _addToRecipients(_objectSpread({}, selectedContact));
        } else {
          _addToRecipients({
            name: stateValue.replace(',', ''),
            phoneNumber: stateValue.replace(',', '')
          });
        }
      }
    }
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].label
  }, label), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(useRCUI && _styles["default"].rcuiStyle, _styles["default"].rightPanel)
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
