"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FullSizeWrapper = exports.ContactSearchPanel = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

var _react = _interopRequireWildcard(require("react"));

var _juno = require("@ringcentral/juno");

var _phoneTypes = require("@ringcentral-integration/commons/enums/phoneTypes");

var _contexts = require("../../contexts");

var _ContactSearchPanelEnum = require("./ContactSearchPanelEnum");

var _HelpTextSection = require("./HelpTextSection");

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 auto;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  background: #fff;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledContactSearchPanel = _juno.styled.div(_templateObject());

var FullSizeWrapper = _juno.styled.div(_templateObject2());

exports.FullSizeWrapper = FullSizeWrapper;

var ContactSearchPanel = function ContactSearchPanel(_ref) {
  var _optionsMap;

  var companyContacts = _ref.companyContacts,
      personalContacts = _ref.personalContacts,
      _ref$thirdPartyContac = _ref.thirdPartyContacts,
      thirdPartyContacts = _ref$thirdPartyContac === void 0 ? [] : _ref$thirdPartyContac,
      optionClickHandler = _ref.optionClickHandler,
      userInput = _ref.userInput,
      searchHandler = _ref.searchHandler,
      inputRef = _ref.inputRef,
      setFilterString = _ref.setFilterString,
      thirdPartySourceName = _ref.thirdPartySourceName,
      currentLocale = _ref.currentLocale,
      formatPhone = _ref.formatPhone;

  var _useState = (0, _react.useState)(_ContactSearchPanelEnum.TabsEnum.thirdParty),
      _useState2 = _slicedToArray(_useState, 2),
      activeTab = _useState2[0],
      setActiveTab = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isSearching = _useState4[0],
      setIsSearching = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      showSearchResult = _useState6[0],
      setShowSearchResult = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      searchResult = _useState8[0],
      setSearchResult = _useState8[1];

  var previousUserInput = (0, _juno.usePrevious)(function () {
    return userInput;
  });
  var optionsMap = (_optionsMap = {}, _defineProperty(_optionsMap, _ContactSearchPanelEnum.TabsEnum.thirdParty, thirdPartyContacts), _defineProperty(_optionsMap, _ContactSearchPanelEnum.TabsEnum.company, companyContacts), _defineProperty(_optionsMap, _ContactSearchPanelEnum.TabsEnum.personal, personalContacts), _optionsMap);
  var tabs = [{
    label: thirdPartySourceName,
    value: _ContactSearchPanelEnum.TabsEnum.thirdParty
  }, {
    label: _i18n["default"].getString('companyTabTitle', currentLocale),
    value: _ContactSearchPanelEnum.TabsEnum.company
  }, {
    label: _i18n["default"].getString('personalTabTitle', currentLocale),
    value: _ContactSearchPanelEnum.TabsEnum.personal
  }];
  (0, _react.useEffect)(function () {
    if (userInput !== previousUserInput) {
      setFilterString(userInput);
    }

    if (userInput === '') {
      setShowSearchResult(false);
    }
  }, [previousUserInput, userInput, setFilterString]);

  var searchContacts = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsSearching(true);
              _context.next = 3;
              return searchHandler(userInput);

            case 3:
              res = _context.sent;
              setSearchResult(res);
              setShowSearchResult(true);
              setIsSearching(false);
              inputRef === null || inputRef === void 0 ? void 0 : inputRef.current.focus();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function searchContacts() {
      return _ref2.apply(this, arguments);
    };
  }();

  var inThirdPartyTab = activeTab === _ContactSearchPanelEnum.TabsEnum.thirdParty;
  var isLoading = inThirdPartyTab && isSearching;
  var options = showSearchResult && inThirdPartyTab ? searchResult : optionsMap[activeTab];
  console.log('list item', options.length);

  var _useSuggestionList = (0, _juno.useSuggestionList)({
    inputValue: userInput,
    options: options,
    inputRef: inputRef,
    onSelect: function onSelect(e, option) {
      optionClickHandler(option);
    }
  }),
      optionItems = _useSuggestionList.optionItems,
      inputValue = _useSuggestionList.inputValue,
      getMenuProps = _useSuggestionList.getMenuProps,
      getItemProps = _useSuggestionList.getItemProps,
      highlightedIndex = _useSuggestionList.highlightedIndex,
      getInputProps = _useSuggestionList.getInputProps,
      getInputAriaProps = _useSuggestionList.getInputAriaProps,
      changeHighlightedIndexReason = _useSuggestionList.changeHighlightedIndexReason;

  var _useCommunicationSetu = (0, _contexts.useCommunicationSetupContext)(),
      inputAriaPropsRef = _useCommunicationSetu.inputAriaPropsRef,
      inputPropsRef = _useCommunicationSetu.inputPropsRef;

  (0, _react.useImperativeHandle)(inputPropsRef, function () {
    return getInputProps();
  });
  (0, _react.useImperativeHandle)(inputAriaPropsRef, function () {
    return getInputAriaProps();
  });
  var getFormattedLabel = (0, _react.useCallback)(function (_ref3) {
    var type = _ref3.type,
        phoneType = _ref3.phoneType,
        phoneNumber = _ref3.phoneNumber;
    var formattedPhoneType = type === _ContactSearchPanelEnum.TabsEnum.company || type === _ContactSearchPanelEnum.TabsEnum.personal ? _i18n["default"].getString(phoneType, currentLocale) : phoneType;

    if (type === _ContactSearchPanelEnum.TabsEnum.company && phoneType === _phoneTypes.phoneTypes.extension) {
      return "".concat(formattedPhoneType, ". ").concat(phoneNumber);
    }

    return "".concat(formatPhone(phoneNumber), " - ").concat(formattedPhoneType);
  }, [currentLocale, formatPhone]);
  return /*#__PURE__*/_react["default"].createElement(StyledContactSearchPanel, {
    "data-sign": "contactSearchPanel"
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcPaper, {
    square: true
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcTabs, {
    value: activeTab,
    onChange: function onChange(e, v) {
      inputRef === null || inputRef === void 0 ? void 0 : inputRef.current.focus();
      setActiveTab(v);
    },
    variant: "fullWidth",
    centered: true
  }, tabs.map(function (_ref4) {
    var label = _ref4.label,
        value = _ref4.value;
    return /*#__PURE__*/_react["default"].createElement(_juno.RcTab, {
      key: label,
      "data-sign": "".concat(value, "ContactSearchResult"),
      label: /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
        variant: "caption1"
      }, "".concat(label)),
      value: value
    });
  }))), /*#__PURE__*/_react["default"].createElement(FullSizeWrapper, null, /*#__PURE__*/_react["default"].createElement(_juno.RcLoading, {
    loading: isLoading
  }, /*#__PURE__*/_react["default"].createElement(_HelpTextSection.HelpTextSection, {
    showSearchResult: showSearchResult,
    sourceName: thirdPartySourceName,
    currentLocale: currentLocale,
    inputLength: userInput.length,
    activeTab: activeTab,
    hasRecords: !!optionItems.length,
    onClick: searchContacts
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcSuggestionList, {
    "data-sign": "contactSearchDropdown",
    tabIndex: -1,
    highlightedIndex: highlightedIndex,
    changeHighlightedIndexReason: changeHighlightedIndexReason,
    options: optionItems,
    inputValue: inputValue,
    getMenuProps: getMenuProps,
    getItemProps: getItemProps,
    renderOption: function renderOption(_ref5, state) {
      var name = _ref5.name,
          phoneNumber = _ref5.phoneNumber,
          phoneType = _ref5.phoneType,
          isPrimary = _ref5.isPrimary,
          type = _ref5.type,
          resourceType = _ref5.resourceType,
          doNotCall = _ref5.doNotCall,
          entityType = _ref5.entityType,
          restProps = _objectWithoutProperties(_ref5, ["name", "phoneNumber", "phoneType", "isPrimary", "type", "resourceType", "doNotCall", "entityType"]);

      return isPrimary ? /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, _extends({
        selected: state.selected,
        "data-sign": "contactSearchSelectMenuItem",
        avatar: /*#__PURE__*/_react["default"].createElement(_juno.RcAvatar, {
          color: "interactive.b02",
          size: "xsmall"
        }, name.slice(0, 1).toUpperCase())
      }, restProps), /*#__PURE__*/_react["default"].createElement(_juno.RcListItemText, {
        primary: name,
        secondary: getFormattedLabel({
          phoneType: phoneType,
          type: type,
          phoneNumber: phoneNumber
        })
      })) : /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, _extends({
        selected: state.selected,
        "data-sign": "contactSearchSelectMenuItem",
        avatar: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null)
      }, restProps), /*#__PURE__*/_react["default"].createElement(_juno.RcListItemText, {
        style: {
          marginLeft: '32px'
        },
        secondary: getFormattedLabel({
          phoneType: phoneType,
          type: type,
          phoneNumber: phoneNumber
        })
      }));
    }
  }))));
};

exports.ContactSearchPanel = ContactSearchPanel;
//# sourceMappingURL=ContactSearchPanel.js.map
