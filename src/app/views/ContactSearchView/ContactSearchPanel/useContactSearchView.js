"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useContactSearchView = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _components = require("@ringcentral-integration/micro-auth/src/app/components");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _nextCore = require("@ringcentral-integration/next-core");
var _components2 = require("@ringcentral-integration/next-widgets/components");
var _phoneTypeNames = _interopRequireDefault(require("@ringcentral-integration/next-widgets/i18n/phoneTypeNames"));
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _components3 = require("../../../components");
var _HelpTextSection = require("./HelpTextSection");
var _helper = require("./helper");
var _i18n = _interopRequireDefault(require("./i18n"));
var _excluded = ["onBlur"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var PrimaryAvatar = function PrimaryAvatar(_ref) {
  var activeTab = _ref.activeTab,
    ThirdPartyAvatar = _ref.ThirdPartyAvatar,
    type = _ref.type,
    contactName = _ref.contactName,
    contact = _ref.contact,
    phoneNumber = _ref.phoneNumber;
  var inThirdPartyTab = activeTab === 'thirdParty';
  var inOtherTab = activeTab === 'other';
  if (inOtherTab) {
    return /*#__PURE__*/_react["default"].createElement(_springUi.Avatar, {
      symbol: _springIcon.CallQueueMd,
      "data-sign": "callQueueAvatar",
      size: "medium"
    });
  }
  if (inThirdPartyTab && ThirdPartyAvatar) {
    return /*#__PURE__*/_react["default"].createElement(ThirdPartyAvatar, {
      type: type
    });
  }
  return /*#__PURE__*/_react["default"].createElement(_components3.ContactAvatar, {
    key: "avatar-".concat(contact === null || contact === void 0 ? void 0 : contact.id),
    showPresence: true,
    contact: contact,
    phoneNumber: phoneNumber,
    contactName: contactName
  });
};

/**
 * Custom hook for render contact search view
 */
var useContactSearchView = exports.useContactSearchView = function useContactSearchView(options) {
  var inputRef = (0, _react.useRef)(null);
  var multiple = options.multiple,
    source = options.source,
    showOtherContacts = options.showOtherContacts,
    isThirdPartySearching = options.isThirdPartySearching,
    thirdPartySourceName = options.thirdPartySourceName,
    companyContacts = options.companyContacts,
    otherContacts = options.otherContacts,
    personalContacts = options.personalContacts,
    thirdPartyContacts = options.thirdPartyContacts,
    value = options.value,
    keyToTags = options.keyToTags,
    defaultTab = options.defaultTab,
    ThirdPartyAvatar = options.ThirdPartyAvatar,
    _options$minimumSearc = options.minimumSearchLength,
    minimumSearchLength = _options$minimumSearc === void 0 ? 3 : _options$minimumSearc,
    onOptionSelected = options.onContactSelected,
    onChange = options.onChange,
    changeTabTrack = options.changeTabTrack,
    onOpen = options.onOpen,
    onClose = options.onClose;
  var _useLocale = (0, _hooks.useLocale)(_phoneTypeNames["default"]),
    phoneTypeNamesT = _useLocale.t;
  var _useLocale2 = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale2.t;
  var _useState = (0, _react.useState)(defaultTab ? thirdPartySourceName || defaultTab !== 'thirdParty' ? defaultTab : 'company' : thirdPartySourceName ? 'thirdParty' : 'company'),
    _useState2 = _slicedToArray(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];
  var contactSearchViewOptions = (0, _nextCore.useContainer)('ContactSearchViewOptions');
  var isAbleToSearch = value.length >= minimumSearchLength;
  var inThirdPartyTab = activeTab === 'thirdParty';
  var isLoading = inThirdPartyTab && isAbleToSearch && isThirdPartySearching;
  // display freeSolo item on suggestion list
  var showFreeSoloItem = (0, _helper.validateValidChars)(value);
  var _useMemo = (0, _react.useMemo)(function () {
      var _optionsMap = (0, _helper.generateOptionsMap)({
        showOtherContacts: showOtherContacts,
        isAbleToSearch: isAbleToSearch,
        companyContacts: companyContacts,
        otherContacts: otherContacts,
        personalContacts: personalContacts,
        thirdPartyContacts: thirdPartyContacts
      });
      var _tabItemsMap = (0, _helper.generateTabs)({
        optionsMap: _optionsMap,
        thirdPartySourceName: thirdPartySourceName,
        isLoading: isLoading,
        showOtherContacts: showOtherContacts,
        t: t
      });
      return {
        contacts: _optionsMap[activeTab],
        tabItemsMap: _tabItemsMap
      };
    }, [activeTab, isAbleToSearch, thirdPartyContacts, companyContacts, personalContacts, otherContacts, thirdPartySourceName, isLoading, showOtherContacts, t]),
    _useMemo$contacts = _useMemo.contacts,
    contacts = _useMemo$contacts === void 0 ? [] : _useMemo$contacts,
    tabItemsMap = _useMemo.tabItemsMap;
  var _useAutocomplete = (0, _springUi.useAutocomplete)({
      inputRef: inputRef,
      value: [],
      freeSolo: showFreeSoloItem,
      multiple: multiple,
      inputValue: value,
      options: contacts,
      keyToTags: keyToTags,
      autoHighlight: true,
      addNoOptionItem: 'first',
      onChange: function onChange(e) {
        if (multiple) {
          e.forEach(onOptionSelected);
        } else {
          onOptionSelected(e[0]);
        }
      },
      onInputChange: onChange,
      onOpen: onOpen,
      onClose: onClose
    }),
    optionItems = _useAutocomplete.optionItems,
    highlightedIndex = _useAutocomplete.highlightedIndex,
    getTagListBoxProps = _useAutocomplete.getTagListBoxProps,
    getSuggestionListProps = _useAutocomplete.getSuggestionListProps,
    getInputAriaProps = _useAutocomplete.getInputAriaProps,
    getInputProps = _useAutocomplete.getInputProps,
    getItemProps = _useAutocomplete.getItemProps,
    isOpen = _useAutocomplete.isOpen,
    inputValue = _useAutocomplete.inputValue,
    changeHighlightedIndexReason = _useAutocomplete.changeHighlightedIndexReason,
    isKeepHighlightedIndex = _useAutocomplete.isKeepHighlightedIndex,
    closeMenu = _useAutocomplete.closeMenu,
    openMenu = _useAutocomplete.openMenu;
  var _getInputProps = getInputProps(),
    onBlur = _getInputProps.onBlur,
    InputProps = _objectWithoutProperties(_getInputProps, _excluded);
  var components = (0, _react.useMemo)(function () {
    return {
      Footer: function Footer() {
        return /*#__PURE__*/_react["default"].createElement(_HelpTextSection.HelpTextSection, {
          sourceName: thirdPartySourceName,
          inputLength: value.length,
          isLoading: isLoading,
          activeTab: activeTab,
          hasRecords: !!optionItems.length,
          searchMinimumLength: minimumSearchLength
        });
      }
    };
  }, [activeTab, isLoading, minimumSearchLength, optionItems.length, thirdPartySourceName, value.length]);
  var phoneNumberRender = (0, _components.useFormattedPhoneNumberFn)();
  return {
    inputRef: inputRef,
    openMenu: openMenu,
    closeMenu: closeMenu,
    InputProps: _objectSpread(_objectSpread({}, getTagListBoxProps()), InputProps),
    // TODO: spring-ui readonly has bug, should remove it in spring-ui
    inputProps: (0, _springUi.omit)(getInputAriaProps(), ['readOnly']),
    component: isOpen ? /*#__PURE__*/_react["default"].createElement(_springUi.TabContext, {
      value: activeTab,
      onChange: function onChange(e, v) {
        var _inputRef$current;
        (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
        setActiveTab(v);
        changeTabTrack(v === 'thirdParty' ? thirdPartySourceName.toLocaleLowerCase() : v);
      }
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _clsx["default"])('overflow-hidden absolute flex flex-col w-full h-full left-0 top-0 bg-neutral-base z-drawer [&_.sui-tab]:h-6'),
      "data-sign": "contactDropdownList"
    }, /*#__PURE__*/_react["default"].createElement(_springUi.Tabs, {
      pill: true,
      variant: "moreMenu",
      "data-sign": "contactTabsTitle",
      MoreMenuProps: {
        ButtonProps: {
          'data-sign': 'moreMenu',
          size: 'small'
        }
      }
      // TODO: spring that padding should be removed in spring
      ,
      className: "flex-none mt-0.5 mb-2.5 [&_.sui-tabs-tab-list]:p-0"
    }, tabItemsMap.map(function (_ref2) {
      var label = _ref2.label,
        count = _ref2.count,
        value = _ref2.value;
      var tabName = "".concat(label, " (").concat(count, ")");
      return /*#__PURE__*/_react["default"].createElement(_springUi.Tab, {
        id: value,
        key: label,
        "data-sign": "".concat(value, "ContactSearchResult"),
        label: /*#__PURE__*/_react["default"].createElement("div", {
          title: tabName,
          "data-sign": "".concat(value, "ContactTabName"),
          className: "truncate text-xs normal-case"
        }, tabName),
        value: value
      });
    })), /*#__PURE__*/_react["default"].createElement(_springUi.SuggestionList, {
      className: "flex-auto m-0",
      highlightedIndex: highlightedIndex,
      components: components,
      options: optionItems,
      inputValue: inputValue,
      getItemProps: getItemProps,
      getSuggestionListProps: getSuggestionListProps,
      changeHighlightedIndexReason: changeHighlightedIndexReason,
      isKeepHighlightedIndex: isKeepHighlightedIndex,
      renderOption: function renderOption(itemProps, state) {
        var _ref3 = itemProps,
          ariaPosinset = _ref3['aria-posinset'],
          ariaSetsize = _ref3['aria-setsize'],
          dataItemIndex = _ref3['data-item-index'],
          key = _ref3.key,
          onClick = _ref3.onClick,
          onMouseDown = _ref3.onMouseDown,
          onMouseOver = _ref3.onMouseOver,
          onMouseUp = _ref3.onMouseUp,
          role = _ref3.role,
          label = _ref3.label,
          freeSolo = _ref3.freeSolo,
          type = _ref3.type,
          phoneType = _ref3.phoneType,
          phoneNumber = _ref3.phoneNumber,
          isPrimary = _ref3.isPrimary,
          contact = _ref3.contact,
          name = _ref3.name,
          doNotCall = _ref3.doNotCall;
        var secondaryContent = (contactSearchViewOptions === null || contactSearchViewOptions === void 0 ? void 0 : contactSearchViewOptions.renderListItemSecondary) ? contactSearchViewOptions.renderListItemSecondary(itemProps) : function () {
          var formattedPhoneNumber = phoneNumberRender(phoneNumber);
          return /*#__PURE__*/_react["default"].createElement("span", {
            title: formattedPhoneNumber
          }, formattedPhoneNumber);
        }();
        var isFirstItem = state.index === 0;
        var phoneTypeI18nString = phoneTypeNamesT(phoneType);

        // Check if doNotCall is truthy (could be string "true" or boolean true)
        var isDoNotCall = doNotCall === true || doNotCall === 'true';
        return /*#__PURE__*/_react["default"].createElement(_springUi.ListItem, {
          size: isPrimary || freeSolo ? 'large' : 'small',
          selected: state.highlighted,
          divider: false,
          'aria-posinset': ariaPosinset,
          'aria-setsize': ariaSetsize,
          'data-item-index': dataItemIndex,
          key: key,
          onClick: onClick,
          onMouseDown: onMouseDown,
          onMouseOver: onMouseOver,
          onMouseUp: onMouseUp,
          role: role,
          "data-sign": "".concat(freeSolo ? 'freeSolo' : 'contact', "Item")
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "flex flex-col w-full h-full"
        }, isPrimary && !isFirstItem && /*#__PURE__*/_react["default"].createElement(_springUi.Divider, {
          className: "w-full"
        }), freeSolo ? /*#__PURE__*/_react["default"].createElement("div", {
          className: "flex flex-auto items-center"
        }, /*#__PURE__*/_react["default"].createElement(_springUi.Avatar, {
          size: "medium"
        }), /*#__PURE__*/_react["default"].createElement(_springUi.ListItemText, {
          primary: /*#__PURE__*/_react["default"].createElement("span", {
            "data-sign": "freeSoloTitle"
          }, t(source)),
          secondary: /*#__PURE__*/_react["default"].createElement("span", {
            "data-sign": "freeSoloNumber"
          }, label)
        }), /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
          "data-sign": "freeSoloQuickButton",
          symbol: _springIcon.EnterMd,
          className: "text-neutral-b0"
        })) : /*#__PURE__*/_react["default"].createElement("div", {
          className: "flex flex-auto items-center"
        }, isPrimary && /*#__PURE__*/_react["default"].createElement(PrimaryAvatar, {
          contact: contact,
          activeTab: activeTab,
          type: type,
          ThirdPartyAvatar: ThirdPartyAvatar,
          phoneNumber: phoneNumber,
          contactName: name
        }), /*#__PURE__*/_react["default"].createElement(_springUi.ListItemText, {
          className: (0, _clsx["default"])(!isPrimary && 'pl-11'),
          primary: isPrimary ? function () {
            var text = /*#__PURE__*/_react["default"].createElement(_components2.TextWithHighlight, {
              "data-sign": "contactSearchItem",
              highLightText: value,
              text: name
            });
            return !isDoNotCall ? text : /*#__PURE__*/_react["default"].createElement("div", {
              className: "flex items-center gap-1 truncate"
            }, text, /*#__PURE__*/_react["default"].createElement(_springUi.Tooltip, {
              title: t('doNotCall')
            }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
              symbol: _springIcon.BlockMd,
              size: "xsmall",
              color: "secondary",
              className: "text-neutral-b2",
              "data-sign": "doNotCall"
            })));
          }() : undefined,
          secondary: secondaryContent
        }), /*#__PURE__*/_react["default"].createElement("span", {
          "data-sign": "phoneType",
          className: "text-neutral-b2 typography-descriptor text-nowrap sui-text-root flex-none",
          title: phoneTypeI18nString
        }, phoneTypeI18nString))));
      }
    }))) : null
  };
};
//# sourceMappingURL=useContactSearchView.js.map
