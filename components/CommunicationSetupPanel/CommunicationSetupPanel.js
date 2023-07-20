"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.name");
require("core-js/modules/es.string.trim");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommunicationSetupPanel = void 0;
require("regenerator-runtime/runtime");
var _react = _interopRequireWildcard(require("react"));
var _CallingSettings = require("@ringcentral-integration/commons/modules/CallingSettings");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _contexts = require("../../contexts");
var _ContactSearchPanelEnum = require("../ContactSearchPanel/ContactSearchPanelEnum");
var _i18n = _interopRequireDefault(require("../FromField/i18n"));
var _i18n2 = _interopRequireDefault(require("../RecipientsInput/i18n"));
var _CommunicationSetupProvider = require("./CommunicationSetupProvider");
var _ContactSearchContainer = _interopRequireDefault(require("./ContactSearchContainer"));
var _helper = require("./helper");
var _i18n3 = _interopRequireDefault(require("./i18n"));
var _styles = require("./styles");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var maxLength = 30;
var FromField = function FromField(_ref) {
  var currentLocale = _ref.currentLocale,
    disableFromField = _ref.disableFromField,
    fromNumber = _ref.fromNumber,
    formatPhone = _ref.formatPhone,
    changeFromNumber = _ref.changeFromNumber,
    options = _ref.options,
    blockedLabel = _ref.blockedLabel,
    inputRef = _ref.inputRef;
  return /*#__PURE__*/_react["default"].createElement(_styles.FieldLine, null, /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
    variant: "caption1",
    color: "neutral.b04"
  }, "".concat(_i18n["default"].getString('from', currentLocale), ":")), /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, {
    fullWidth: true,
    textVariant: "caption1",
    "data-sign": "phoneNumber",
    renderValue: function renderValue(val) {
      return val === _CallingSettings.BLOCKED_ID_VALUE ? blockedLabel : formatPhone(val);
    },
    disabled: disableFromField,
    value: fromNumber,
    InputProps: {
      // classes: customSelectInputClasses,
      disableUnderline: true
    },
    MenuProps: {
      TransitionProps: {
        onExited: function onExited() {
          var _inputRef$current;
          (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
        }
      }
    }
  }, options.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      onClick: function onClick() {
        return changeFromNumber(item);
      },
      value: item.phoneNumber,
      key: item.phoneNumber,
      "data-sign": "selectMenuItem"
    }, item.phoneNumber === _CallingSettings.BLOCKED_ID_VALUE ? /*#__PURE__*/_react["default"].createElement(_juno.RcListItemText, {
      primary: blockedLabel
    }) : /*#__PURE__*/_react["default"].createElement(_juno.RcListItemText, {
      primary: formatPhone(item.phoneNumber)
      // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      ,
      secondary: _i18n["default"].getString(item.usageType, currentLocale)
    }));
  })));
};

// TODO: keep original style, wait check with designer
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
    _props$directlyProcee = props.directlyProceedType,
    directlyProceedType = _props$directlyProcee === void 0 ? 'dial' : _props$directlyProcee,
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
    detectPhoneNumbers = props.detectPhoneNumbers,
    _props$defaultTab = props.defaultTab,
    defaultTab = _props$defaultTab === void 0 ? _ContactSearchPanelEnum.TabsEnum.thirdParty : _props$defaultTab,
    inputFullWidth = props.inputFullWidth;
  var inputRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    openSearchPage = _useState2[0],
    setOpenSearchPage = _useState2[1];
  var showSearchPage = openSearchPage && !!toNumber.trim();
  var setRecipientByChars = function setRecipientByChars(Chars) {
    var _inputRef$current2;
    setOpenSearchPage(false);
    setRecipient({
      name: Chars,
      phoneNumber: Chars
    });
    (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 ? void 0 : _inputRef$current2.blur();
  };
  var setRecipientHandler = function setRecipientHandler(optionItem) {
    setOpenSearchPage(false);
    setRecipient(optionItem);
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
  var hasTags = recipients.length > 0;
  var hiddenInput = !multiple && hasTags;
  var options = (0, _react.useMemo)(function () {
    if (showAnonymous) {
      return [].concat(_toConsumableArray(fromNumbers), [{
        phoneNumber: _CallingSettings.BLOCKED_ID_VALUE
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
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      inputPropsRef === null || inputPropsRef === void 0 ? void 0 : (_inputPropsRef$curren = inputPropsRef.current) === null || _inputPropsRef$curren === void 0 ? void 0 : _inputPropsRef$curren.onChange.apply(null, args);
    },
    onKeyDown: function onKeyDown() {
      var _inputPropsRef$curren2;
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      inputPropsRef === null || inputPropsRef === void 0 ? void 0 : (_inputPropsRef$curren2 = inputPropsRef.current) === null || _inputPropsRef$curren2 === void 0 ? void 0 : _inputPropsRef$curren2.onKeyDown.apply(null, args);
    }
  };
  var RecipientComponent = (0, _react.useMemo)(function () {
    return !!recipients.length && /*#__PURE__*/_react["default"].createElement(_styles.StyledRecipientsWrapper, null, recipients.map(function (item, index) {
      return /*#__PURE__*/_react["default"].createElement(_styles.StyledRcChip, {
        "data-sign": "recipientsChip",
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
  var inputChangeHandler = function inputChangeHandler(value) {
    if (value.trim()) {
      setOpenSearchPage(true);
    } else {
      setOpenSearchPage(false);
    }
    onToNumberChange(value);
  };
  return /*#__PURE__*/_react["default"].createElement(_styles.RootWrapper, null, /*#__PURE__*/_react["default"].createElement(_styles.CallFields, null, /*#__PURE__*/_react["default"].createElement(_styles.FieldLine, null, /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
    color: "neutral.b05"
  }, label), /*#__PURE__*/_react["default"].createElement(_styles.StyledToInputWrapper, {
    inputFullWidth: inputFullWidth
  }, RecipientComponent, !hiddenInput && /*#__PURE__*/_react["default"].createElement(_styles.StyledRcDialTextField, {
    inputRef: inputRef,
    autoFocus: autoFocus,
    fullWidth: true,
    size: "small",
    variant: "borderLess",
    textVariant: "body1",
    onKeyDown: keyDownHandler,
    value: toNumber,
    onChange: inputChangeHandler
    // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
    ,
    placeholder: inputFullWidth && !!recipients.length ? null : placeholder,
    onPaste: /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ev) {
        var pastedText, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(detectPhoneNumbers && ev.clipboardData && ev.clipboardData.getData)) {
                  _context.next = 7;
                  break;
                }
                pastedText = ev.clipboardData.getData('text/plain');
                ev.preventDefault();
                _context.next = 5;
                return detectPhoneNumbers(pastedText);
              case 5:
                result = _context.sent;
                !result && inputChangeHandler(pastedText);
              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }(),
    InputProps: _objectSpread(_objectSpread({}, InputProps), {}, {
      endAdornment: !!toNumber.length && /*#__PURE__*/_react["default"].createElement(_juno.RcDialDelete, {
        onDelete: function onDelete(e) {
          e.preventDefault();
          closeSearchPage();
        }
      }, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
        symbol: _junoIcon.DeleteCircle,
        "data-sign": "deleteButton",
        title: "Delete",
        variant: "plain",
        size: "medium"
      })),
      onFocus: function onFocus() {
        if (toNumber.trim()) {
          setOpenSearchPage(true);
        }
      }
    }),
    inputProps: {
      'data-sign': 'recipientsInput',
      maxLength: maxLength
    }
  }))), showFromField && /*#__PURE__*/_react["default"].createElement(FromField, {
    inputRef: inputRef,
    currentLocale: currentLocale,
    disableFromField: disableFromField
    // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
    ,
    fromNumber: fromNumber
    // @ts-expect-error TS(2322): Type '((...args: any[]) => string) | undefined' is... Remove this comment to see the full error message
    ,
    formatPhone: formatPhone
    // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
    ,
    changeFromNumber: changeFromNumber
    // @ts-expect-error TS(2322): Type 'any[] | undefined' is not assignable to type... Remove this comment to see the full error message
    ,
    options: options,
    blockedLabel: blockedLabel
  })), /*#__PURE__*/_react["default"].createElement(_styles.FullSizeWrapper, null, showSearchPage && /*#__PURE__*/_react["default"].createElement(_styles.ResultContainer, null, /*#__PURE__*/_react["default"].createElement(_ContactSearchContainer["default"], {
    optionClickHandler: setRecipientHandler,
    inputRef: inputRef,
    userInput: toNumber,
    defaultTab: defaultTab,
    directlyProceedText: _i18n3["default"].getString(directlyProceedType, currentLocale)
  })), children));
};
var CommunicationSetupPanel = function CommunicationSetupPanel(props) {
  return /*#__PURE__*/_react["default"].createElement(_CommunicationSetupProvider.CommunicationSetupProvider, null, /*#__PURE__*/_react["default"].createElement(CommunicationSetupWrapper, props));
};
exports.CommunicationSetupPanel = CommunicationSetupPanel;
//# sourceMappingURL=CommunicationSetupPanel.js.map
