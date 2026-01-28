"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
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
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialerContactSearchPanel = void 0;
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.regexp.constructor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.trim.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _reactHooks = require("@ringcentral-integration/react-hooks");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _useContactSearchView2 = require("./useContactSearchView");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var DialerContactSearchPanel = exports.DialerContactSearchPanel = function DialerContactSearchPanel(_ref) {
  var _name;
  var openProp = _ref.open,
    defaultTab = _ref.defaultTab,
    _ref$source = _ref.source,
    source = _ref$source === void 0 ? 'dial' : _ref$source,
    recipient = _ref.recipient,
    inputValue = _ref.inputValue,
    thirdPartySourceName = _ref.thirdPartySourceName,
    companyContacts = _ref.companyContacts,
    personalContacts = _ref.personalContacts,
    otherContacts = _ref.otherContacts,
    thirdPartyContacts = _ref.thirdPartyContacts,
    showOtherContacts = _ref.showOtherContacts,
    isThirdPartySearching = _ref.isThirdPartySearching,
    placeholder = _ref.placeholder,
    ThirdPartyAvatar = _ref.ThirdPartyAvatar,
    _ref$keyToTags = _ref.keyToTags,
    keyToTags = _ref$keyToTags === void 0 ? ['↵', ',', ';'] : _ref$keyToTags,
    changeTabTrack = _ref.changeTabTrack,
    onInputValueChange = _ref.onInputValueChange,
    setFilterString = _ref.setFilterString,
    onSelect = _ref.onSelect,
    onRemove = _ref.onRemove,
    onExpanded = _ref.onExpanded,
    _ref$autoFocusInput = _ref.autoFocusInput,
    autoFocusInput = _ref$autoFocusInput === void 0 ? true : _ref$autoFocusInput;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var _useAsyncState = (0, _reactHooks.useAsyncState)(inputValue, function (value) {
      onInputValueChange(value);
      setFilterString(value);
    }),
    _useAsyncState2 = _slicedToArray(_useAsyncState, 2),
    value = _useAsyncState2[0],
    _setValue = _useAsyncState2[1];
  var renderRecipient = Boolean(recipient) && value.length === 0;
  var showDelete = value.length > 0 || renderRecipient;
  var setValue = function setValue(v) {
    // we not want show the value which be key to make select
    var regex = new RegExp("[".concat(keyToTags.join(''), "]"), 'g');
    var validValue = v.replace(regex, '');
    if (validValue === '') {
      // spring-ui need to set full props to trigger onClose event
      closeMenu({}, 'escape');
    }
    _setValue(validValue);
  };
  var _useContactSearchView = (0, _useContactSearchView2.useContactSearchView)({
      value: value,
      onChange: function onChange() {
        // do nothing, we handle the DialTextField onChange event
      },
      source: source,
      keyToTags: keyToTags,
      changeTabTrack: changeTabTrack,
      defaultTab: defaultTab,
      thirdPartySourceName: thirdPartySourceName,
      companyContacts: companyContacts,
      personalContacts: personalContacts,
      otherContacts: otherContacts,
      ThirdPartyAvatar: ThirdPartyAvatar,
      thirdPartyContacts: thirdPartyContacts || [],
      showOtherContacts: showOtherContacts,
      isThirdPartySearching: isThirdPartySearching,
      onOpen: function onOpen() {
        return onExpanded(true);
      },
      onClose: function onClose() {
        return onExpanded(false);
      },
      onContactSelected: function () {
        var _onContactSelected = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(option) {
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                if (!option.freeSolo) {
                  _context.n = 2;
                  break;
                }
                _context.n = 1;
                return onSelect === null || onSelect === void 0 ? void 0 : onSelect([{
                  phoneNumber: option.label,
                  name: option.label,
                  freeSolo: true
                }]);
              case 1:
                return _context.a(2);
              case 2:
                _context.n = 3;
                return onSelect === null || onSelect === void 0 ? void 0 : onSelect([_objectSpread(_objectSpread({}, option), {}, {
                  phoneNumber: option.phoneNumber,
                  name: option.name || option.label
                })]);
              case 3:
                return _context.a(2);
            }
          }, _callee);
        }));
        function onContactSelected(_x) {
          return _onContactSelected.apply(this, arguments);
        }
        return onContactSelected;
      }()
    }),
    closeMenu = _useContactSearchView.closeMenu,
    openMenu = _useContactSearchView.openMenu,
    inputRef = _useContactSearchView.inputRef,
    component = _useContactSearchView.component,
    InputProps = _useContactSearchView.InputProps,
    inputProps = _useContactSearchView.inputProps;
  (0, _react.useEffect)(function () {
    if (openProp && value.trim().length) {
      openMenu({});
    } else {
      // spring-ui need to set full props to trigger onClose event
      closeMenu({}, 'escape');
    }
  }, [openProp, value, openMenu, closeMenu]);
  (0, _reactHooks.usePageAutoFocus)(inputRef, autoFocusInput);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('flex flex-col gap-2 mx-4 justify-center items-center', openProp && 'flex-auto')
  }, /*#__PURE__*/_react["default"].createElement(_springUi.DialTextField, {
    inputRef: inputRef,
    variant: "quiet",
    fullWidth: true,
    onChange: setValue,
    placeholder: placeholder || t('enterANameOrNumber'),
    className: "max-w-[250px] rounded-xl",
    value: value,
    size: "medium",
    RootProps: InputProps,
    onClick: function onClick(e) {
      if (value.length) {
        openMenu(e);
      }
    },
    inputProps: _objectSpread(_objectSpread({}, inputProps), {}, {
      'data-sign': 'recipientsInput',
      readOnly: renderRecipient
    }),
    classes: renderRecipient ? {
      startAdornment: 'w-full mr-0',
      endAdornment: 'ml-0',
      input: 'hidden'
    } : undefined,
    startAdornment: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, showDelete && /*#__PURE__*/_react["default"].createElement("i", {
      className: "w-9"
    }), renderRecipient && /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-center flex-auto"
    }, /*#__PURE__*/_react["default"].createElement(_springUi.Chip, {
      label: (_name = recipient.name) !== null && _name !== void 0 ? _name : recipient.phoneNumber,
      onDelete: onRemove,
      DeleteIconProps: {
        'aria-label': 'Remove'
      }
    }))),
    endAdornment: showDelete && /*#__PURE__*/_react["default"].createElement(_springUi.DialDelete
    // currently we only support set one recipient, so we can use onRemove to clear recipient
    , {
      onDelete: recipient ? onRemove : undefined,
      onClear: recipient ? onRemove : undefined
    }, /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
      className: "flex-none mr-3",
      TooltipProps: {
        title: t('delete')
      },
      symbol: _springIcon.BackspaceMd,
      variant: "icon",
      "data-sign": "deleteButton",
      size: "small",
      color: "secondary"
    }))
  }), openProp && /*#__PURE__*/_react["default"].createElement("main", {
    className: "relative w-full flex flex-col flex-auto overflow-hidden mt-2"
  }, component));
};
//# sourceMappingURL=DialerContactSearchPanel.js.map
