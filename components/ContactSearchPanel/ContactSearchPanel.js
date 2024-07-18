"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.join");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.reduce");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.keys");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.split");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactSearchPanel = void 0;
var _phoneTypes = require("@ringcentral-integration/commons/enums/phoneTypes");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireWildcard(require("react"));
var _contexts = require("../../contexts");
var _ContactSearchHelper = require("../../modules/ContactSearchUI/ContactSearchHelper");
var _usePresence = require("../../react-hooks/usePresence");
var _helper = require("../CommunicationSetupPanel/helper");
var _Tooltip = require("../Rcui/Tooltip");
var _TextWithHighlight = require("../TextWithHighlight/TextWithHighlight");
var _ContactSearchPanelEnum = require("./ContactSearchPanelEnum");
var _DoNotCallIndicator = require("./DoNotCallIndicator");
var _HelpTextSection = require("./HelpTextSection");
var _i18n = _interopRequireDefault(require("./i18n"));
var _ContactSearchPanel = require("./styles/ContactSearchPanel");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) { o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var getCountsRes = function getCountsRes(counts) {
  return counts > 99 ? "99+" : counts;
};
var PrimaryAvatar = function PrimaryAvatar(_ref) {
  var inOtherTab = _ref.inOtherTab,
    isDirectlyProceed = _ref.isDirectlyProceed,
    inThirdPartyTab = _ref.inThirdPartyTab,
    ThirdPartyAvatar = _ref.ThirdPartyAvatar,
    profileImageUrl = _ref.profileImageUrl,
    type = _ref.type,
    name = _ref.name,
    getPresence = _ref.getPresence,
    needFetchPresence = _ref.needFetchPresence,
    contact = _ref.contact;
  var _ref2 = (name === null || name === void 0 ? void 0 : name.split(/\s+/)) || [],
    _ref3 = _slicedToArray(_ref2, 2),
    firstName = _ref3[0],
    lastName = _ref3[1];
  var presentAvatarName = (0, _juno.useAvatarShortName)({
    firstName: firstName,
    lastName: lastName
  });
  var presence = (0, _usePresence.usePresence)(contact, {
    fetch: needFetchPresence ? getPresence : undefined
  });
  var presentAvatarcolor = (0, _juno.useAvatarColorToken)(name);
  if (isDirectlyProceed) return /*#__PURE__*/_react["default"].createElement(_ContactSearchPanel.DefaultIcon, {
    size: "xxlarge",
    color: "neutral.f01",
    symbol: _junoIcon.UserDefault,
    "data-sign": "directlyProceedAvatar"
  });
  if (inOtherTab) {
    return /*#__PURE__*/_react["default"].createElement(_ContactSearchPanel.CallQueueIcon, {
      symbol: _junoIcon.CallQueue,
      "data-sign": "callQueueAvatar",
      size: "xxlarge",
      color: "neutral.f01"
    });
  }
  if (inThirdPartyTab && ThirdPartyAvatar) return /*#__PURE__*/_react["default"].createElement(ThirdPartyAvatar, {
    type: type
  });
  var presenceProps = presence ? {
    type: (0, _ContactSearchHelper.getPresenceStatus)(presence)
  } : undefined;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcAvatar, {
    presenceProps: presenceProps,
    color: presentAvatarcolor,
    size: "xsmall"
  }, profileImageUrl ? /*#__PURE__*/_react["default"].createElement("img", {
    src: profileImageUrl,
    alt: name
  }) : presentAvatarName);
};
var companyPhoneTypeMap = {
  mobile: 'MobileNumber',
  contact: 'ContactNumber',
  direct: 'DirectNumber',
  extension: 'extension'
};
var ContactSearchPanel = function ContactSearchPanel(_ref4) {
  var otherContacts = _ref4.otherContacts,
    companyContacts = _ref4.companyContacts,
    personalContacts = _ref4.personalContacts,
    _ref4$thirdPartyConta = _ref4.thirdPartyContacts,
    thirdPartyContacts = _ref4$thirdPartyConta === void 0 ? [] : _ref4$thirdPartyConta,
    optionClickHandler = _ref4.optionClickHandler,
    userInput = _ref4.userInput,
    isThirdPartySearching = _ref4.isThirdPartySearching,
    inputRef = _ref4.inputRef,
    centered = _ref4.centered,
    setFilterString = _ref4.setFilterString,
    thirdPartySourceName = _ref4.thirdPartySourceName,
    currentLocale = _ref4.currentLocale,
    formatPhone = _ref4.formatPhone,
    ThirdPartyAvatar = _ref4.ThirdPartyAvatar,
    _ref4$minimumSearchLe = _ref4.minimumSearchLength,
    minimumSearchLength = _ref4$minimumSearchLe === void 0 ? 0 : _ref4$minimumSearchLe,
    directlyProceedText = _ref4.directlyProceedText,
    getCompanyExtraInfoByIds = _ref4.getCompanyExtraInfoByIds,
    changeTabTrack = _ref4.changeTabTrack,
    getPresence = _ref4.getPresence,
    _ref4$defaultTab = _ref4.defaultTab,
    defaultTab = _ref4$defaultTab === void 0 ? _ContactSearchPanelEnum.TabsEnum.thirdParty : _ref4$defaultTab,
    showOtherContacts = _ref4.showOtherContacts,
    _ref4$triggerEventTra = _ref4.triggerEventTracking,
    triggerEventTracking = _ref4$triggerEventTra === void 0 ? function () {} : _ref4$triggerEventTra;
  var _useState = (0, _react.useState)(defaultTab),
    _useState2 = _slicedToArray(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];
  var previousUserInput = (0, _juno.usePrevious)(function () {
    return userInput;
  });
  var isAbleToSearch = userInput.length >= minimumSearchLength;
  var inThirdPartyTab = activeTab === _ContactSearchPanelEnum.TabsEnum.thirdParty;
  var isLoading = inThirdPartyTab && isAbleToSearch && isThirdPartySearching;
  var getPrimaryCount = function getPrimaryCount(items) {
    var count = items === null || items === void 0 ? void 0 : items.filter(function (i) {
      return i.isPrimary;
    }).length;
    return getCountsRes(count);
  };
  var _useMemo = (0, _react.useMemo)(function () {
      var _ref5, _ref6;
      var _optionsMap = showOtherContacts ? (_ref5 = {}, _defineProperty(_ref5, _ContactSearchPanelEnum.TabsEnum.thirdParty, !isAbleToSearch ? [] : thirdPartyContacts), _defineProperty(_ref5, _ContactSearchPanelEnum.TabsEnum.company, companyContacts), _defineProperty(_ref5, _ContactSearchPanelEnum.TabsEnum.personal, personalContacts), _defineProperty(_ref5, _ContactSearchPanelEnum.TabsEnum.other, otherContacts), _ref5) : (_ref6 = {}, _defineProperty(_ref6, _ContactSearchPanelEnum.TabsEnum.thirdParty, !isAbleToSearch ? [] : thirdPartyContacts), _defineProperty(_ref6, _ContactSearchPanelEnum.TabsEnum.company, companyContacts), _defineProperty(_ref6, _ContactSearchPanelEnum.TabsEnum.personal, personalContacts), _ref6);
      var _tabItemsMap = [{
        label: thirdPartySourceName,
        value: _ContactSearchPanelEnum.TabsEnum.thirdParty,
        count: isLoading ? 0 : getPrimaryCount(_optionsMap[_ContactSearchPanelEnum.TabsEnum.thirdParty])
      }, {
        label: _i18n["default"].getString('companyTabTitle', currentLocale),
        value: _ContactSearchPanelEnum.TabsEnum.company,
        count: getPrimaryCount(_optionsMap[_ContactSearchPanelEnum.TabsEnum.company])
      }, {
        label: _i18n["default"].getString('personalTabTitle', currentLocale),
        value: _ContactSearchPanelEnum.TabsEnum.personal,
        count: getPrimaryCount(_optionsMap[_ContactSearchPanelEnum.TabsEnum.personal])
      }, {
        label: _i18n["default"].getString('other', currentLocale),
        value: _ContactSearchPanelEnum.TabsEnum.other,
        count: getPrimaryCount(_optionsMap[_ContactSearchPanelEnum.TabsEnum.other])
      }];
      return {
        optionsMap: _optionsMap,
        tabItemsMap: showOtherContacts ? _tabItemsMap : _tabItemsMap.slice(0, 2)
      };
    }, [isAbleToSearch, thirdPartyContacts, companyContacts, personalContacts, otherContacts, thirdPartySourceName, currentLocale, isLoading, showOtherContacts]),
    optionsMap = _useMemo.optionsMap,
    tabItemsMap = _useMemo.tabItemsMap;
  var tabLabels = tabItemsMap.reduce(function (acc, tab) {
    acc[tab.value] = tab.label;
    return acc;
  }, {});
  var debounceTracking = (0, _juno.useDebounce)(function (optionsMap, tabLabels) {
    var result = Object.keys(optionsMap).filter(function (key) {
      var map = optionsMap;
      return map[key].length > 0;
    }).map(function (key) {
      return tabLabels[key];
    });
    if (result && result.length > 0) {
      triggerEventTracking(_trackEvents.trackEvents.getContactSearch, result.join(', '));
    }
  }, 1000);
  (0, _react.useEffect)(function () {
    debounceTracking(optionsMap, tabLabels);
  }, [optionsMap, tabLabels, debounceTracking]);
  (0, _react.useEffect)(function () {
    if (userInput !== previousUserInput) {
      setFilterString(userInput);
    }
  }, [previousUserInput, userInput, setFilterString]);
  var inOtherTab = activeTab === _ContactSearchPanelEnum.TabsEnum.other;
  var options = optionsMap[activeTab];
  var showDirectlyItem = (0, _helper.validateValidChars)(userInput);
  var finialOptions = (0, _react.useMemo)(function () {
    return showDirectlyItem ? [{
      isPrimary: true,
      isDirectlyProceed: true,
      name: directlyProceedText,
      phoneNumber: userInput
    }].concat(_toConsumableArray(options)) : options;
  }, [userInput, options, showDirectlyItem, directlyProceedText]);
  var setIndexHandlerRef = (0, _react.useRef)(null);
  var _useSuggestionList = (0, _juno.useSuggestionList)({
      inputValue: userInput,
      options: finialOptions,
      inputRef: inputRef,
      onSelect: function onSelect(e, option) {
        var item = _objectSpread({}, option);
        if (option.isDirectlyProceed) {
          item.name = item.phoneNumber;
        }
        optionClickHandler(item);
        triggerEventTracking(_trackEvents.trackEvents.searchedContactClicked, tabLabels[activeTab]);
      }
    }),
    optionItems = _useSuggestionList.optionItems,
    inputValue = _useSuggestionList.inputValue,
    getMenuProps = _useSuggestionList.getMenuProps,
    getItemProps = _useSuggestionList.getItemProps,
    highlightedIndex = _useSuggestionList.highlightedIndex,
    getInputProps = _useSuggestionList.getInputProps,
    getInputAriaProps = _useSuggestionList.getInputAriaProps,
    changeHighlightedIndexReason = _useSuggestionList.changeHighlightedIndexReason,
    setHighlightedIndex = _useSuggestionList.setHighlightedIndex;
  (0, _react.useImperativeHandle)(setIndexHandlerRef, function () {
    return setHighlightedIndex;
  });
  (0, _react.useEffect)(function () {
    if (finialOptions.length) {
      setIndexHandlerRef === null || setIndexHandlerRef === void 0 ? void 0 : setIndexHandlerRef.current(0, {
        reason: 'mouse',
        reRender: true
      });
    }
  }, [finialOptions]);
  var _useCommunicationSetu = (0, _contexts.useCommunicationSetupContext)(),
    inputAriaPropsRef = _useCommunicationSetu.inputAriaPropsRef,
    inputPropsRef = _useCommunicationSetu.inputPropsRef;
  (0, _react.useImperativeHandle)(inputPropsRef, function () {
    return getInputProps();
  });
  (0, _react.useImperativeHandle)(inputAriaPropsRef, function () {
    return getInputAriaProps();
  });
  var getFormattedLabel = (0, _react.useCallback)(function (_ref7) {
    var type = _ref7.type,
      phoneType = _ref7.phoneType,
      phoneNumber = _ref7.phoneNumber;
    var formattedPhoneType = phoneType;
    if (type === _ContactSearchPanelEnum.TabsEnum.personal) {
      formattedPhoneType = _i18n["default"].getString(phoneType, currentLocale);
    } else if (type === _ContactSearchPanelEnum.TabsEnum.company) {
      formattedPhoneType = _i18n["default"].getString(companyPhoneTypeMap[phoneType] || phoneType, currentLocale);
    }
    if (type === _ContactSearchPanelEnum.TabsEnum.company && phoneType === _phoneTypes.phoneTypes.extension) {
      return "".concat(formattedPhoneType, ". ").concat(phoneNumber);
    }
    return "".concat(formatPhone(phoneNumber), " - ").concat(formattedPhoneType);
  }, [currentLocale, formatPhone]);

  //! code will not to package into prod env.
  var additionProps = {};
  if (process.env.NODE_ENV === 'test') {
    additionProps.initialItemCount = optionItems.length;
    additionProps.key = optionItems.length;
  }
  return /*#__PURE__*/_react["default"].createElement(_ContactSearchPanel.StyledContactSearchPanel, {
    "data-sign": "contactSearchPanel"
  }, /*#__PURE__*/_react["default"].createElement(_ContactSearchPanel.StyledTabsWrapper, null, /*#__PURE__*/_react["default"].createElement(_juno.RcTabs, {
    "data-sign": "contactTabsTitle",
    value: activeTab,
    onChange: function onChange(e, v) {
      var _inputRef$current;
      (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
      setActiveTab(v);
      changeTabTrack(v === 'thirdParty' ? thirdPartySourceName.toLocaleLowerCase() : v);
    },
    variant: "moreMenu",
    centered: centered,
    MoreButtonProps: {
      datatype: 'moreMenu',
      // @ts-ignore
      'data-sign': 'moreMenu',
      style: {
        padding: 0
      },
      MoreIcon: function MoreIcon(isMenuOpen) {
        return isMenuOpen ? /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
          symbol: _junoIcon.ArrowUp2
        }) : /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
          symbol: _junoIcon.ArrowDown2
        });
      },
      MenuProps: {
        marginThreshold: 6
      }
    }
  }, tabItemsMap.map(function (_ref8) {
    var label = _ref8.label,
      count = _ref8.count,
      value = _ref8.value;
    var tabName = "".concat(label, " (").concat(count, ")");
    return /*#__PURE__*/_react["default"].createElement(_juno.RcTab, {
      style: {
        padding: '6px 8px'
      },
      key: label,
      "data-sign": "".concat(value, "ContactSearchResult"),
      label: /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, {
        title: tabName
      }, /*#__PURE__*/_react["default"].createElement(_ContactSearchPanel.TabText, {
        "data-sign": "".concat(value, "ContactTabName")
      }, tabName)),
      value: value
    });
  }))), /*#__PURE__*/_react["default"].createElement(_ContactSearchPanel.FullSizeWrapper, null, /*#__PURE__*/_react["default"].createElement(_HelpTextSection.HelpTextSection, {
    sourceName: thirdPartySourceName,
    currentLocale: currentLocale,
    inputLength: userInput.length,
    isLoading: isLoading,
    activeTab: activeTab,
    hasRecords: !!optionItems.length,
    searchMinimumLength: minimumSearchLength
  }), optionItems.length > 0 && /*#__PURE__*/_react["default"].createElement(_juno.RcSuggestionList, _extends({
    "data-sign": "contactSearchDropdown",
    tabIndex: -1,
    highlightedIndex: highlightedIndex,
    changeHighlightedIndexReason: changeHighlightedIndexReason,
    options: optionItems,
    inputValue: inputValue,
    getMenuProps: getMenuProps,
    getItemProps: getItemProps
  }, additionProps, {
    renderOption: function renderOption(props, state) {
      var name = props.name,
        phoneNumber = props.phoneNumber,
        phoneType = props.phoneType,
        isPrimary = props.isPrimary,
        type = props.type,
        doNotCall = props.doNotCall,
        _props$isDirectlyProc = props.isDirectlyProceed,
        isDirectlyProceed = _props$isDirectlyProc === void 0 ? false : _props$isDirectlyProc,
        _props$profileImageUr = props.profileImageUrl,
        profileImageUrl = _props$profileImageUr === void 0 ? '' : _props$profileImageUr,
        contact = props.contact,
        presenceStatus = props.presenceStatus,
        entityType = props.entityType,
        resourceType = props.resourceType,
        restProps = _objectWithoutProperties(props, ["name", "phoneNumber", "phoneType", "isPrimary", "type", "doNotCall", "isDirectlyProceed", "profileImageUrl", "contact", "presenceStatus", "entityType", "resourceType"]);
      var needFetchPresence = !!(activeTab === _ContactSearchPanelEnum.TabsEnum.company && isPrimary && (contact === null || contact === void 0 ? void 0 : contact.id));
      var content = getFormattedLabel({
        phoneType: phoneType,
        type: type,
        phoneNumber: phoneNumber
      });
      return isPrimary ? /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, _extends({
        focused: state.highlighted,
        "data-sign": isDirectlyProceed ? 'directlyProceedEntrance' : 'contactSearchSelectMenuItem',
        avatar: /*#__PURE__*/_react["default"].createElement(PrimaryAvatar, {
          contact: contact,
          needFetchPresence: needFetchPresence,
          getPresence: getPresence,
          isDirectlyProceed: isDirectlyProceed,
          type: type,
          ThirdPartyAvatar: ThirdPartyAvatar,
          name: name,
          inOtherTab: inOtherTab,
          inThirdPartyTab: inThirdPartyTab,
          profileImageUrl: profileImageUrl
        })
      }, restProps), /*#__PURE__*/_react["default"].createElement(_juno.RcListItemText, {
        primary: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_ContactSearchPanel.ContactName, {
          "data-sign": isDirectlyProceed ? 'DirectlyProceedTitle' : 'contactSearchItem'
        }, /*#__PURE__*/_react["default"].createElement(_TextWithHighlight.TextWithHighlight, {
          highLightText: inputValue,
          text: name
        })), doNotCall && /*#__PURE__*/_react["default"].createElement(_DoNotCallIndicator.DoNotCallIndicator, {
          currentLocale: currentLocale
        })),
        secondary: isDirectlyProceed ? /*#__PURE__*/_react["default"].createElement("span", {
          title: phoneNumber,
          "data-sign": "directlyProceedNumber"
        }, phoneNumber) : /*#__PURE__*/_react["default"].createElement("span", {
          title: content
        }, content)
      }), isDirectlyProceed && /*#__PURE__*/_react["default"].createElement(_juno.RcListItemSecondaryAction, {
        "data-sign": "dialIcon"
      }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
        color: "action.primary",
        symbol: _junoIcon.Dial
      }))) : /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, _extends({
        selected: state.selected,
        "data-sign": "contactSearchSelectMenuItem",
        avatar: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null)
      }, restProps), /*#__PURE__*/_react["default"].createElement(_ContactSearchPanel.StyledListItemText, {
        title: content,
        secondary: content,
        inset: inThirdPartyTab
      }));
    },
    itemsRendered: function itemsRendered(items) {
      if (activeTab !== _ContactSearchPanelEnum.TabsEnum.company) return;
      var ids = items.filter(function (_ref9) {
        var data = _ref9.data;
        return data && data.isPrimary && data.id;
      }).map(function (_ref10) {
        var data = _ref10.data;
        return data.id;
      });
      if (ids.length > 0) {
        getCompanyExtraInfoByIds(ids);
      }
    }
  }))));
};
exports.ContactSearchPanel = ContactSearchPanel;
//# sourceMappingURL=ContactSearchPanel.js.map
