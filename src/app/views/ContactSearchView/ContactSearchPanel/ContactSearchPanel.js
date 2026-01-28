"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactSearchPanel = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.split.js");
require("core-js/modules/es.string.trim.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _reactHooks = require("@ringcentral-integration/react-hooks");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _helper = require("./helper");
var _i18n = _interopRequireDefault(require("./i18n"));
var _useContactSearchView2 = require("./useContactSearchView");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var ContactSearchPanel = exports.ContactSearchPanel = function ContactSearchPanel(_ref) {
  var openProp = _ref.open,
    defaultTab = _ref.defaultTab,
    maxRecipients = _ref.maxRecipients,
    inputValue = _ref.inputValue,
    _ref$source = _ref.source,
    source = _ref$source === void 0 ? 'message' : _ref$source,
    toNumbers = _ref.toNumbers,
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
    onSelect = _ref.onSelect,
    onInputValueChange = _ref.onInputValueChange,
    onRemove = _ref.onRemove,
    setFilterString = _ref.setFilterString,
    onExpanded = _ref.onExpanded,
    helperText = _ref.helperText;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var _useAsyncState = (0, _reactHooks.useAsyncState)(inputValue, function (value) {
      onInputValueChange(value);
      setFilterString(value);
    }),
    _useAsyncState2 = _slicedToArray(_useAsyncState, 2),
    value = _useAsyncState2[0],
    _setValue = _useAsyncState2[1];
  var renderTags = function renderTags(values, getTagProps) {
    return values.map(function (item, index) {
      var tagProps = getTagProps(item, index);
      var _ref2 = item,
        id = _ref2.id,
        profileImageUrl = _ref2.profileImageUrl,
        phoneNumber = _ref2.phoneNumber,
        name = _ref2.name;
      return /*#__PURE__*/_react["default"].createElement(_springUi.Chip, _extends({
        "data-sign": "chip-".concat(id !== null && id !== void 0 ? id : index),
        startSlot: profileImageUrl ? /*#__PURE__*/_react["default"].createElement(_springUi.Avatar, {
          src: profileImageUrl,
          size: "small"
        }) : undefined,
        key: index
      }, tagProps, {
        color: item.error ? 'error' : 'default',
        label: name || phoneNumber,
        onDelete: function onDelete() {
          onRemove(phoneNumber);
        },
        truncate: true
      }));
    });
  };
  var setValue = function setValue(v) {
    if (v === '') {
      // spring-ui need to set full props to trigger onClose event
      closeMenu({}, 'escape');
    }
    _setValue(v);
  };
  var _useContactSearchView = (0, _useContactSearchView2.useContactSearchView)({
      value: value,
      multiple: true,
      onChange: function onChange() {
        // do nothing, we handle the Autocomplete onInputChange event
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
      onContactSelected: function onContactSelected(option) {
        // for freeSolo option, only number is acceptable
        if (option.freeSolo && (0, _helper.validateValidChars)(option.label)) {
          onSelect === null || onSelect === void 0 ? void 0 : onSelect([{
            phoneNumber: option.label,
            name: option.label,
            freeSolo: true
          }]);
          return;
        }
        onSelect === null || onSelect === void 0 ? void 0 : onSelect([_objectSpread(_objectSpread({}, option), {}, {
          phoneNumber: option.phoneNumber,
          name: option.name || option.label
        })]);
      }
    }),
    closeMenu = _useContactSearchView.closeMenu,
    openMenu = _useContactSearchView.openMenu,
    inputRef = _useContactSearchView.inputRef,
    component = _useContactSearchView.component,
    InputProps = _useContactSearchView.InputProps,
    inputProps = _useContactSearchView.inputProps;

  // TODO: should use Autocomplete inputProps to control readonly when issue: UXSYS-3822 fixed
  (0, _react.useEffect)(function () {
    if (maxRecipients && toNumbers.length >= maxRecipients) {
      var _inputRef$current;
      (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.setAttribute('readonly', 'true');
    } else {
      var _inputRef$current2;
      (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 ? void 0 : _inputRef$current2.removeAttribute('readonly');
    }
  }, [toNumbers, inputRef, maxRecipients]);
  (0, _springUi.useEventListener)(inputRef.current, 'paste', function (e) {
    var _e$clipboardData$getD, _e$clipboardData;
    var pasteText = (_e$clipboardData$getD = (_e$clipboardData = e.clipboardData) === null || _e$clipboardData === void 0 ? void 0 : _e$clipboardData.getData('text/plain')) !== null && _e$clipboardData$getD !== void 0 ? _e$clipboardData$getD : '';
    if (pasteText.trim().length) {
      var validValues = pasteText.split((0, _springUi.stringArrToRegExp)(keyToTags)).map(function (item) {
        return item.replace(/\r?\n|\r/g, ' ').trim();
      }).filter(Boolean);
      var hasAddFreeSolo = false;
      e.preventDefault();
      e.stopPropagation();
      var selectedValues = validValues.reduce(function (acc, val) {
        if ((0, _helper.validateValidChars)(val)) {
          acc.push({
            phoneNumber: val,
            name: val,
            freeSolo: true
          });
        }
        return acc;
      }, []);
      if (selectedValues.length > 0) {
        onSelect === null || onSelect === void 0 ? void 0 : onSelect(selectedValues);
        hasAddFreeSolo = true;
      }
      if (!hasAddFreeSolo) {
        // should only set string before first keyToTags
        _setValue(validValues[0]);
      }
    }
  });
  (0, _react.useEffect)(function () {
    if (openProp && value.trim().length) {
      openMenu({});
    } else {
      // spring-ui need to set full props to trigger onClose event
      closeMenu({}, 'escape');
    }
  }, [openProp, value, openMenu, closeMenu]);
  var error = (0, _react.useMemo)(function () {
    return toNumbers.some(function (toNumber) {
      return toNumber.error;
    });
  }, [toNumbers]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('flex flex-col gap-2', openProp && 'flex-auto')
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Autocomplete, {
    multiple: true,
    size: "medium",
    clearBtn: !!value.length,
    ClearButtonProps: {
      'data-sign': 'removeBtn'
      // TODO: spring-ui issue with data-props miss, so must as any
    },
    PopperProps: {
      classes: {
        paper: 'hidden'
      }
    },
    error: error,
    inputRef: inputRef,
    inputValue: value,
    inputVariant: "outlined",
    RootProps: InputProps,
    inputProps: _objectSpread(_objectSpread({}, inputProps), {}, {
      'data-sign': 'recipientsInput',
      maxLength: 30
    }),
    label: t('to'),
    value: toNumbers,
    helperText: error ? helperText || t('invalidPhoneNumber') : helperText,
    renderTags: renderTags,
    onClick: function onClick(e) {
      if (value.length) {
        openMenu(e);
      }
    },
    placeholder: placeholder || t('enterNameOrNumber'),
    onInputChange: function onInputChange(val) {
      setValue(val);
    },
    options: []
  }), openProp && /*#__PURE__*/_react["default"].createElement("main", {
    className: "relative flex flex-col flex-auto overflow-hidden"
  }, component));
};
//# sourceMappingURL=ContactSearchPanel.js.map
