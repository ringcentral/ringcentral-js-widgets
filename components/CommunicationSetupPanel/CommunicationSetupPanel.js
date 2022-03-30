"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommunicationSetupPanel = void 0;

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.string.trim");

require("core-js/modules/es6.array.map");

var _react = _interopRequireWildcard(require("react"));

var _CallingSettingsV = require("@ringcentral-integration/commons/modules/CallingSettingsV2");

var _DialDelete = require("@ringcentral/juno/es6/components/Dialer/DialDelete/DialDelete.js");

var _IconButton = require("@ringcentral/juno/es6/components/Buttons/IconButton/IconButton.js");

var _ListItemText = require("@ringcentral/juno/es6/components/List/ListItemText/ListItemText.js");

var _MenuItem = require("@ringcentral/juno/es6/components/Menu/MenuItem/MenuItem.js");

var _Select = require("@ringcentral/juno/es6/components/Forms/Select/Select.js");

var _Text = require("@ringcentral/juno/es6/components/Text/Text.js");

var _DeleteCircle = _interopRequireDefault(require("@ringcentral/juno/es6/icon/DeleteCircle.js"));

var _CommunicationSetupProvider = require("./CommunicationSetupProvider");

var _contexts = require("../../contexts");

var _i18n = _interopRequireDefault(require("../FromField/i18n"));

var _i18n2 = _interopRequireDefault(require("../RecipientsInput/i18n"));

var _DirectlyProceedLine = require("./DirectlyProceedLine");

var _ContactSearchContainer = _interopRequireDefault(require("./ContactSearchContainer"));

var _helper = require("./helper");

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var maxLength = 30;

var FromField = function FromField(_ref) {
  var currentLocale = _ref.currentLocale,
      disableFromField = _ref.disableFromField,
      fromNumber = _ref.fromNumber,
      formatPhone = _ref.formatPhone,
      changeFromNumber = _ref.changeFromNumber,
      options = _ref.options,
      blockedLabel = _ref.blockedLabel;
  return /*#__PURE__*/_react["default"].createElement(_styles.FieldLine, null, /*#__PURE__*/_react["default"].createElement(_Text.RcText, {
    variant: "caption1",
    color: "neutral.b04"
  }, "".concat(_i18n["default"].getString('from', currentLocale), ":")), /*#__PURE__*/_react["default"].createElement(_Select.RcSelect, {
    fullWidth: true,
    textVariant: "caption1",
    "data-sign": "phoneNumber",
    renderValue: function renderValue(val) {
      return val === _CallingSettingsV.BLOCKED_ID_VALUE ? blockedLabel : formatPhone(val);
    },
    disabled: disableFromField,
    value: fromNumber,
    InputProps: {
      // classes: customSelectInputClasses,
      disableUnderline: true
    }
  }, options.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_MenuItem.RcMenuItem, {
      onClick: function onClick() {
        return changeFromNumber(item);
      },
      value: item.phoneNumber,
      key: item.phoneNumber
    }, item.phoneNumber === _CallingSettingsV.BLOCKED_ID_VALUE ? /*#__PURE__*/_react["default"].createElement(_ListItemText.RcListItemText, {
      primary: blockedLabel
    }) : /*#__PURE__*/_react["default"].createElement(_ListItemText.RcListItemText, {
      primary: formatPhone(item.phoneNumber),
      secondary: _i18n["default"].getString(item.usageType, currentLocale)
    }));
  })));
}; // TODO: keep original style, wait check with designer
// const CustomSelect = styled(RcSelect)``;
// const customSelectInputClasses = RcClasses<RcSelectProps['InputProps']>(
//   ['input'],
//   'custom-select-input',
// );
// const CustomSelect = styled(RcSelect)`
//   && {
//     .${customSelectInputClasses.input} {
//       background-color: transparent;
//     }
//   }
// `;


var CommunicationSetupWrapper = function CommunicationSetupWrapper(props) {
  var currentLocale = props.currentLocale,
      onToNumberChange = props.onToNumberChange,
      toNumber = props.toNumber,
      fromNumber = props.fromNumber,
      fromNumbers = props.fromNumbers,
      changeFromNumber = props.changeFromNumber,
      formatPhone = props.formatPhone,
      recipients = props.recipients,
      _props$multiple = props.multiple,
      multiple = _props$multiple === void 0 ? false : _props$multiple,
      setRecipient = props.setRecipient,
      clearRecipient = props.clearRecipient,
      autoFocus = props.autoFocus,
      _props$showFromField = props.showFromField,
      showFromField = _props$showFromField === void 0 ? true : _props$showFromField,
      _props$disableFromFie = props.disableFromField,
      disableFromField = _props$disableFromFie === void 0 ? false : _props$disableFromFie,
      children = props.children,
      showAnonymous = props.showAnonymous,
      _props$label = props.label,
      label = _props$label === void 0 ? "".concat(_i18n2["default"].getString('to', currentLocale), ":") : _props$label,
      _props$placeholder = props.placeholder,
      placeholder = _props$placeholder === void 0 ? "".concat(_i18n2["default"].getString('enterNameOrNumber', currentLocale)) : _props$placeholder,
      detectPhoneNumbers = props.detectPhoneNumbers;
  var inputRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      openSearchPage = _useState2[0],
      setOpenSearchPage = _useState2[1];

  var setRecipientByChars = function setRecipientByChars(Chars) {
    var _inputRef$current;

    setOpenSearchPage(false);
    setRecipient({
      name: Chars,
      phoneNumber: Chars
    });
    (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.blur();
  };

  var setRecipientHandler = function setRecipientHandler(optionItem) {
    var _inputRef$current2;

    setOpenSearchPage(false);
    setRecipient(optionItem);
    (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 ? void 0 : _inputRef$current2.blur();
  };

  var keyDownHandler = function keyDownHandler(e) {
    if ((0, _helper.isSplitterKey)(e) && !!toNumber.trim()) {
      e.preventDefault();
      setRecipientByChars(toNumber);
    }
  };

  var closeSearchPage = function closeSearchPage() {
    var _inputRef$current3;

    setOpenSearchPage(false);
    onToNumberChange('');
    (_inputRef$current3 = inputRef.current) === null || _inputRef$current3 === void 0 ? void 0 : _inputRef$current3.blur();
  };

  var showDirectlyLine = (0, _helper.validateValidChars)(toNumber);
  var hasTags = recipients.length > 0;
  var hiddenInput = !multiple && hasTags;
  var options = (0, _react.useMemo)(function () {
    if (showAnonymous) {
      return [].concat(_toConsumableArray(fromNumbers), [{
        phoneNumber: _CallingSettingsV.BLOCKED_ID_VALUE
      }]);
    }

    return fromNumbers;
  }, [fromNumbers, showAnonymous]);

  var blockedLabel = _i18n["default"].getString('Blocked', currentLocale);

  var _useCommunicationSetu = (0, _contexts.useCommunicationSetupContext)(),
      inputPropsRef = _useCommunicationSetu.inputPropsRef;

  var InputProps = {
    onChange: function onChange() {
      var _inputPropsRef$curren;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      inputPropsRef === null || inputPropsRef === void 0 ? void 0 : (_inputPropsRef$curren = inputPropsRef.current) === null || _inputPropsRef$curren === void 0 ? void 0 : _inputPropsRef$curren.onChange.apply(null, args);
    },
    onKeyDown: function onKeyDown() {
      var _inputPropsRef$curren2;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      inputPropsRef === null || inputPropsRef === void 0 ? void 0 : (_inputPropsRef$curren2 = inputPropsRef.current) === null || _inputPropsRef$curren2 === void 0 ? void 0 : _inputPropsRef$curren2.onKeyDown.apply(null, args);
    }
  };
  var RecipientComponent = (0, _react.useMemo)(function () {
    return !!recipients.length && /*#__PURE__*/_react["default"].createElement(_styles.StyledRecipientsWrapper, null, recipients.map(function (item, index) {
      return /*#__PURE__*/_react["default"].createElement(_styles.StyledRcChip, {
        deleteIconProps: {
          size: 'small'
        },
        style: {
          fontSize: '14px'
        },
        onDelete: function onDelete() {
          return clearRecipient(item);
        },
        label: item.name || item.phoneNumber,
        key: "".concat(item.phoneNumber, " - ").concat(index),
        error: item.isWarning
      });
    }));
  }, [recipients, clearRecipient]);
  return /*#__PURE__*/_react["default"].createElement(_styles.RootWrapper, null, /*#__PURE__*/_react["default"].createElement(_styles.CallFields, null, /*#__PURE__*/_react["default"].createElement(_styles.FieldLine, null, /*#__PURE__*/_react["default"].createElement(_Text.RcText, {
    color: "neutral.b05"
  }, label), /*#__PURE__*/_react["default"].createElement(_styles.StyledToInputWrapper, null, RecipientComponent, !hiddenInput && /*#__PURE__*/_react["default"].createElement(_styles.StyledRcDialTextField, {
    inputRef: inputRef,
    autoFocus: autoFocus,
    fullWidth: true,
    size: "small",
    variant: "borderLess",
    textVariant: "body1",
    onKeyDown: keyDownHandler,
    value: toNumber,
    onChange: onToNumberChange,
    placeholder: placeholder,
    onPaste: /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ev) {
        var pastedText, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(detectPhoneNumbers && ev.clipboardData && ev.clipboardData.getData)) {
                  _context.next = 6;
                  break;
                }

                pastedText = ev.clipboardData.getData('text/plain');
                _context.next = 4;
                return detectPhoneNumbers(pastedText);

              case 4:
                result = _context.sent;
                result && ev.preventDefault();

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(),
    InputProps: _objectSpread(_objectSpread({}, InputProps), {}, {
      endAdornment: openSearchPage && /*#__PURE__*/_react["default"].createElement(_DialDelete.RcDialDelete, {
        onDelete: function onDelete(e) {
          e.preventDefault();
          closeSearchPage();
        }
      }, /*#__PURE__*/_react["default"].createElement(_IconButton.RcIconButton, {
        symbol: _DeleteCircle["default"],
        "data-sign": "deleteButton",
        title: "Delete",
        variant: "plain",
        size: "medium"
      })),
      onFocus: function onFocus() {
        setOpenSearchPage(true);
      }
    }),
    inputProps: {
      'data-sign': 'recipientsInput',
      maxLength: maxLength
    }
  }))), showFromField && /*#__PURE__*/_react["default"].createElement(FromField, {
    currentLocale: currentLocale,
    disableFromField: disableFromField,
    fromNumber: fromNumber,
    formatPhone: formatPhone,
    changeFromNumber: changeFromNumber,
    options: options,
    blockedLabel: blockedLabel
  })), /*#__PURE__*/_react["default"].createElement(_styles.FullSizeWrapper, null, openSearchPage && /*#__PURE__*/_react["default"].createElement(_styles.ResultContainer, null, /*#__PURE__*/_react["default"].createElement(_styles.FullSizeWrapper, null, /*#__PURE__*/_react["default"].createElement(_ContactSearchContainer["default"], {
    optionClickHandler: setRecipientHandler,
    inputRef: inputRef,
    userInput: toNumber
  })), showDirectlyLine && /*#__PURE__*/_react["default"].createElement(_DirectlyProceedLine.DirectlyProceedLine, {
    inMessagePage: multiple,
    currentLocale: currentLocale,
    number: toNumber,
    onClick: function onClick() {
      return setRecipientByChars(toNumber);
    }
  })), children));
};

var CommunicationSetupPanel = function CommunicationSetupPanel(props) {
  return /*#__PURE__*/_react["default"].createElement(_CommunicationSetupProvider.CommunicationSetupProvider, null, /*#__PURE__*/_react["default"].createElement(CommunicationSetupWrapper, props));
};

exports.CommunicationSetupPanel = CommunicationSetupPanel;
//# sourceMappingURL=CommunicationSetupPanel.js.map
