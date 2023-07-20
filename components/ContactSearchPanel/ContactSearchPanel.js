"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.name");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.split");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactSearchPanel = void 0;
var _react = _interopRequireWildcard(require("react"));
var _phoneTypes = require("@ringcentral-integration/commons/enums/phoneTypes");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var getCountsRes = function getCountsRes(counts) {
  return counts > 99 ? "99+" : counts;
};
var PrimaryAvatar = function PrimaryAvatar(_ref) {
  var isDirectlyProceed = _ref.isDirectlyProceed,
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
  var companyContacts = _ref4.companyContacts,
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
    defaultTab = _ref4$defaultTab === void 0 ? _ContactSearchPanelEnum.TabsEnum.thirdParty : _ref4$defaultTab;
  var previousUserInput = (0, _juno.usePrevious)(function () {
    return userInput;
  });
  var isAbleToSearch = userInput.length >= minimumSearchLength;
  var getPrimaryCount = function getPrimaryCount(items) {
    var count = items === null || items === void 0 ? void 0 : items.filter(function (i) {
      return i.isPrimary;
    }).length;
    return getCountsRes(count);
  };
  var _useMemo = (0, _react.useMemo)(function () {
      var _optionsMap2;
      var _optionsMap = (_optionsMap2 = {}, _defineProperty(_optionsMap2, _ContactSearchPanelEnum.TabsEnum.thirdParty, !isAbleToSearch ? [] : thirdPartyContacts), _defineProperty(_optionsMap2, _ContactSearchPanelEnum.TabsEnum.company, companyContacts), _defineProperty(_optionsMap2, _ContactSearchPanelEnum.TabsEnum.personal, personalContacts), _optionsMap2);
      return {
        optionsMap: _optionsMap,
        tabItemsMap: [{
          label: thirdPartySourceName,
          value: _ContactSearchPanelEnum.TabsEnum.thirdParty,
          count: getPrimaryCount(_optionsMap[_ContactSearchPanelEnum.TabsEnum.thirdParty])
        }, {
          label: _i18n["default"].getString('companyTabTitle', currentLocale),
          value: _ContactSearchPanelEnum.TabsEnum.company,
          count: getPrimaryCount(_optionsMap[_ContactSearchPanelEnum.TabsEnum.company])
        }, {
          label: _i18n["default"].getString('personalTabTitle', currentLocale),
          value: _ContactSearchPanelEnum.TabsEnum.personal,
          count: getPrimaryCount(_optionsMap[_ContactSearchPanelEnum.TabsEnum.personal])
        }]
      };
    }, [isAbleToSearch, thirdPartyContacts, companyContacts, personalContacts, thirdPartySourceName, currentLocale]),
    optionsMap = _useMemo.optionsMap,
    tabItemsMap = _useMemo.tabItemsMap;
  var _useState = (0, _react.useState)(defaultTab),
    _useState2 = _slicedToArray(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];
  (0, _react.useEffect)(function () {
    if (userInput !== previousUserInput) {
      setFilterString(userInput);
    }
  }, [previousUserInput, userInput, setFilterString]);
  var inThirdPartyTab = activeTab === _ContactSearchPanelEnum.TabsEnum.thirdParty;
  var isLoading = inThirdPartyTab && isAbleToSearch && isThirdPartySearching;
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
  var getFormattedLabel = (0, _react.useCallback)(function (_ref5) {
    var type = _ref5.type,
      phoneType = _ref5.phoneType,
      phoneNumber = _ref5.phoneNumber;
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
      MenuProps: {
        marginThreshold: 6
      }
    }
  }, tabItemsMap.map(function (_ref6) {
    var label = _ref6.label,
      count = _ref6.count,
      value = _ref6.value;
    var tabName = "".concat(label, " (").concat(count, ")");
    return /*#__PURE__*/_react["default"].createElement(_juno.RcTab, {
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
        restProps = _objectWithoutProperties(props, ["name", "phoneNumber", "phoneType", "isPrimary", "type", "doNotCall", "isDirectlyProceed", "profileImageUrl", "contact", "presenceStatus"]);
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
      var ids = items.filter(function (_ref7) {
        var data = _ref7.data;
        return data && data.isPrimary && data.id;
      }).map(function (_ref8) {
        var data = _ref8.data;
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
