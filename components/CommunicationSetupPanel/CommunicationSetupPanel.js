"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommunicationSetupPanel = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.trim.js");
var _CallingSettings = require("@ringcentral-integration/commons/modules/CallingSettings");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireWildcard(require("react"));
var _contexts = require("../../contexts");
var _ContactSearchPanelEnum = require("../ContactSearchPanel/ContactSearchPanelEnum");
var _i18n = _interopRequireDefault(require("../FromField/i18n"));
var _i18n2 = _interopRequireDefault(require("../RecipientsInput/i18n"));
var _CommunicationSetupProvider = require("./CommunicationSetupProvider");
var _ContactSearchContainer = _interopRequireDefault(require("./ContactSearchContainer"));
var _helper = require("./helper");
var _i18n3 = _interopRequireDefault(require("./i18n"));
var _styles = require("./styles");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
      var text = val === _CallingSettings.BLOCKED_ID_VALUE ? blockedLabel : formatPhone(val);
      return /*#__PURE__*/_react["default"].createElement("span", {
        "data-sign": "fromLabel"
      }, text);
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
  }, options.map(function (item, index) {
    return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      onClick: function onClick() {
        return changeFromNumber(item);
      },
      value: item.phoneNumber,
      key: item.phoneNumber,
      "data-sign": "selectMenuItem".concat(index)
    }, item.phoneNumber === _CallingSettings.BLOCKED_ID_VALUE ? /*#__PURE__*/_react["default"].createElement(_juno.RcListItemText, {
      primary: blockedLabel
    }) : /*#__PURE__*/_react["default"].createElement(_juno.RcListItemText, {
      primary: formatPhone(item.phoneNumber),
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
  var _props$ContactSearch;
  var currentLocale = props.currentLocale,
    onToNumberChange = props.onToNumberChange,
    triggerEventTracking = props.triggerEventTracking,
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
    inputFullWidth = props.inputFullWidth,
    filterCallQueueExtension = props.filterCallQueueExtension;
  var inputRef = (0, _react.useRef)(null);
  var _useAsyncTextFieldSta = useAsyncTextFieldState(toNumber),
    _useAsyncTextFieldSta2 = _slicedToArray(_useAsyncTextFieldSta, 3),
    innerToNumber = _useAsyncTextFieldSta2[0],
    setInnerToNumber = _useAsyncTextFieldSta2[1],
    startTyping = _useAsyncTextFieldSta2[2].updating;
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
    setInnerToNumber('');
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
    startTyping(value);
    if (value.trim()) {
      setOpenSearchPage(true);
    } else {
      setOpenSearchPage(false);
    }
    onToNumberChange(value);
  };
  var ContactSearch = (_props$ContactSearch = props.ContactSearch) !== null && _props$ContactSearch !== void 0 ? _props$ContactSearch : _ContactSearchContainer["default"];
  return /*#__PURE__*/_react["default"].createElement(_styles.RootWrapper, null, /*#__PURE__*/_react["default"].createElement(_styles.CallFields, null, /*#__PURE__*/_react["default"].createElement(_styles.FieldLine, null, /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
    color: "neutral.b05"
  }, label), /*#__PURE__*/_react["default"].createElement(_styles.StyledToInputWrapper, {
    inputFullWidth: inputFullWidth
  }, RecipientComponent, !hiddenInput && /*#__PURE__*/_react["default"].createElement(_styles.StyledRcDialTextField, {
    inputRef: inputRef
    // eslint-disable-next-line jsx-a11y/no-autofocus
    ,
    autoFocus: autoFocus,
    fullWidth: true,
    size: "small",
    variant: "borderLess",
    textVariant: "body1",
    onKeyDown: keyDownHandler,
    value: innerToNumber,
    onChange: inputChangeHandler,
    placeholder: inputFullWidth && !!recipients.length ? undefined : placeholder !== null && placeholder !== void 0 ? placeholder : undefined,
    title: placeholder !== null && placeholder !== void 0 ? placeholder : undefined,
    onPaste: (/*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(ev) {
        var pastedText, result;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!(detectPhoneNumbers && ev.clipboardData && ev.clipboardData.getData)) {
                _context.n = 2;
                break;
              }
              pastedText = ev.clipboardData.getData('text/plain');
              ev.preventDefault();
              _context.n = 1;
              return detectPhoneNumbers(pastedText);
            case 1:
              result = _context.v;
              !result && inputChangeHandler(pastedText);
            case 2:
              return _context.a(2);
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }()),
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
  })), /*#__PURE__*/_react["default"].createElement(_styles.FullSizeWrapper, null, showSearchPage && /*#__PURE__*/_react["default"].createElement(_styles.ResultContainer, null, /*#__PURE__*/_react["default"].createElement(ContactSearch, {
    triggerEventTracking: triggerEventTracking,
    filterCallQueueExtension: filterCallQueueExtension,
    optionClickHandler: setRecipientHandler,
    inputRef: inputRef,
    userInput: toNumber,
    defaultTab: defaultTab,
    directlyProceedText: _i18n3["default"].getString(directlyProceedType, currentLocale)
  })), children));
};
var CommunicationSetupPanel = exports.CommunicationSetupPanel = function CommunicationSetupPanel(props) {
  return /*#__PURE__*/_react["default"].createElement(_CommunicationSetupProvider.CommunicationSetupProvider, null, /*#__PURE__*/_react["default"].createElement(CommunicationSetupWrapper, props));
};

/**
 * Custom hook for managing async text field control state.
 *
 * use for update value in sync way when using `updating` method,
 * in typing mode, that will not update the value immediately, that will wait for 500ms to update the value, to avoid too many rerender and async cause input cursor jump
 *
 * @param initValue - The initial value for the control state.
 */
var useAsyncTextFieldState = function useAsyncTextFieldState(initValue) {
  var _useRefState = (0, _juno.useRefState)(initValue),
    _useRefState2 = _slicedToArray(_useRefState, 2),
    state = _useRefState2[0],
    _setState = _useRefState2[1];
  var debouncingRef = (0, _react.useRef)(false);
  var setState = function setState(val, isUpdate) {
    debouncingRef.current = false;
    debounceSetState.cancel();
    _setState(val, isUpdate);
  };
  var debounceSetState = (0, _juno.useDebounce)(function () {
    setState(initValue);
  }, 500);
  (0, _juno.useDepsChange)(function () {
    if (state.current === initValue) {
      debouncingRef.current = false;
      return;
    }

    // when be empty from outside, cancel previous debounce prevent update show again
    if (state.current !== '' && initValue === '') {
      setState('', false);
    } else if (debouncingRef.current) {
      // use debounce to avoid too many rerender and async cause input cursor jump
      debounceSetState();
    } else {
      setState(initValue, false);
    }
  }, [initValue]);
  return [state.current, setState, {
    updating: function updating(value) {
      debouncingRef.current = value !== '';
      _setState(value);
    }
  }];
};
//# sourceMappingURL=CommunicationSetupPanel.js.map
