"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelpTextSection = void 0;

require("core-js/modules/es6.object.define-property");

var _react = _interopRequireWildcard(require("react"));

var _formatMessage = _interopRequireDefault(require("format-message"));

var _juno = require("@ringcentral/juno");

var _icon = require("@ringcentral/juno/icon");

var _ContactSearchPanelEnum = require("./ContactSearchPanelEnum");

var _styles = require("./styles");

var _i18n = _interopRequireDefault(require("./i18n"));

var _HintsMap;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HintsMap = (_HintsMap = {}, _defineProperty(_HintsMap, _ContactSearchPanelEnum.TabsEnum.company, {
  noRecord: {
    title: '',
    context: ''
  },
  noFilterRecord: {
    title: _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsTitle,
    context: _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsContent
  }
}), _defineProperty(_HintsMap, _ContactSearchPanelEnum.TabsEnum.personal, {
  noRecord: {
    title: _ContactSearchPanelEnum.HintsType.personalNoRecordsTitle,
    context: _ContactSearchPanelEnum.HintsType.personalNoRecordsContent
  },
  noFilterRecord: {
    title: _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsTitle,
    context: _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsContent
  }
}), _defineProperty(_HintsMap, _ContactSearchPanelEnum.TabsEnum.thirdParty, {
  noRecord: {
    title: _ContactSearchPanelEnum.HintsType.thirdPartyNoRecordsTitle,
    context: _ContactSearchPanelEnum.HintsType.thirdPartyNoRecordsContent
  },
  noFilterRecord: {
    title: _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsTitle,
    context: _ContactSearchPanelEnum.HintsType.thirdPartyNoRecordsContent
  },
  noSearchRecord: {
    title: _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsTitle,
    context: _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsContent
  }
}), _HintsMap);
var HelpTextSection = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var inputLength = _ref.inputLength,
      activeTab = _ref.activeTab,
      hasRecords = _ref.hasRecords,
      onClick = _ref.onClick,
      showSearchResult = _ref.showSearchResult,
      currentLocale = _ref.currentLocale,
      sourceName = _ref.sourceName,
      _ref$searchMinimumLen = _ref.searchMinimumLength,
      searchMinimumLength = _ref$searchMinimumLen === void 0 ? 3 : _ref$searchMinimumLen;
  var thirdPartySearchBar;
  var hintsSection;
  var hintTitleKey;
  var hintContentKey;
  var recentlyCallTitle;
  var noInputString = inputLength === 0;
  var isThirdPartyTab = activeTab === _ContactSearchPanelEnum.TabsEnum.thirdParty;

  if (inputLength >= searchMinimumLength && isThirdPartyTab) {
    thirdPartySearchBar = /*#__PURE__*/_react["default"].createElement(_juno.RcListItem, {
      onClick: onClick,
      "data-sign": "HelpSectionSearchBar"
    }, /*#__PURE__*/_react["default"].createElement(_styles.StyledListItemText, {
      color: "neutral.f06",
      secondary: (0, _formatMessage["default"])(_i18n["default"].getString(_ContactSearchPanelEnum.HintsType.searchBarContent, currentLocale), {
        sourceName: sourceName
      })
    }), /*#__PURE__*/_react["default"].createElement(_juno.RcListItemSecondaryAction, null, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
      color: "action.primary",
      symbol: _icon.Search
    })));
  }

  if (!hasRecords) {
    var hintsKeyMap;
    var noRecordKey = noInputString ? 'noRecord' : 'noFilterRecord';

    if (isThirdPartyTab) {
      var mapKey = showSearchResult ? 'noSearchRecord' : noRecordKey;
      hintsKeyMap = HintsMap[activeTab][mapKey];
    } else {
      hintsKeyMap = HintsMap[activeTab][noRecordKey];
    }

    hintTitleKey = hintsKeyMap.title;
    hintContentKey = hintsKeyMap.context;
  }

  if (hasRecords && isThirdPartyTab) {
    if (!showSearchResult) {
      recentlyCallTitle = _ContactSearchPanelEnum.HintsType.thirdPartyRecordsTitle;
    }

    if (inputLength > 0 && inputLength < searchMinimumLength) {
      hintContentKey = _ContactSearchPanelEnum.HintsType.thirdPartyNoRecordsContent;
    }
  }

  if (hintTitleKey || hintContentKey || recentlyCallTitle) {
    hintsSection = /*#__PURE__*/_react["default"].createElement(_styles.HintsWrapper, null, !!hintTitleKey && /*#__PURE__*/_react["default"].createElement(_styles.StyledHintsTitle, {
      "data-sign": "HelpSectionHintTitle",
      variant: "caption2"
    }, _i18n["default"].getString(hintTitleKey, currentLocale)), !!hintContentKey && /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
      "data-sign": "HelpSectionHintContent",
      variant: "caption1",
      color: "neutral.b04",
      noWrap: false
    }, (0, _formatMessage["default"])(_i18n["default"].getString(hintContentKey, currentLocale), {
      sourceName: sourceName
    })), !!recentlyCallTitle && /*#__PURE__*/_react["default"].createElement(_styles.StyledHintsTitle, {
      "data-sign": "HelpSectionHintTitle",
      variant: "caption2"
    }, _i18n["default"].getString(recentlyCallTitle, currentLocale)));
  }

  return /*#__PURE__*/_react["default"].createElement(_styles.HelpTextSectionWrapper, null, thirdPartySearchBar, hintsSection);
});
exports.HelpTextSection = HelpTextSection;
//# sourceMappingURL=HelpTextSection.js.map
