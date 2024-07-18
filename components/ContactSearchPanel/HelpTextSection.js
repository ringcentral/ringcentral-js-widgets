"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelpTextSection = void 0;
var _utils = require("@ringcentral-integration/utils");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _ContactSearchPanelEnum = require("./ContactSearchPanelEnum");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = require("./styles");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
var HintsMap = {
  title: _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsTitle,
  context: _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsContent
};
var HelpTextSection = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var inputLength = _ref.inputLength,
    activeTab = _ref.activeTab,
    hasRecords = _ref.hasRecords,
    currentLocale = _ref.currentLocale,
    sourceName = _ref.sourceName,
    _ref$searchMinimumLen = _ref.searchMinimumLength,
    searchMinimumLength = _ref$searchMinimumLen === void 0 ? 3 : _ref$searchMinimumLen,
    isLoading = _ref.isLoading;
  var hintTitleKey;
  var hintContentKey;
  var isThirdPartyTab = activeTab === _ContactSearchPanelEnum.TabsEnum.thirdParty;
  if (isThirdPartyTab) {
    if (inputLength < searchMinimumLength) {
      hintContentKey = _ContactSearchPanelEnum.HintsType.thirdPartyNoRecordsContent;
    } else if (isLoading) {
      hintContentKey = _ContactSearchPanelEnum.HintsType.searching;
    } else if (!hasRecords) {
      hintTitleKey = HintsMap.title;
      hintContentKey = HintsMap.context;
    }
  }
  if (!isThirdPartyTab && !hasRecords) {
    hintTitleKey = HintsMap.title;
    hintContentKey = HintsMap.context;
  }
  if (!hintTitleKey && !hintContentKey) {
    return null;
  }
  return (
    /*#__PURE__*/
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    _react["default"].createElement(_styles.HelpTextSectionWrapper, {
      isLoading: isLoading
    }, /*#__PURE__*/_react["default"].createElement(_styles.HintsWrapper, null, !!hintTitleKey && /*#__PURE__*/_react["default"].createElement(_styles.StyledHintsTitle, {
      "data-sign": "HelpSectionHintTitle",
      variant: "caption2"
    }, _i18n["default"].getString(hintTitleKey, currentLocale)), !!hintContentKey && /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
      "data-sign": "HelpSectionHintContent",
      variant: "caption1",
      color: "neutral.b04",
      noWrap: false
    }, (0, _utils.format)(_i18n["default"].getString(hintContentKey, currentLocale), {
      sourceName: sourceName,
      minimumLength: searchMinimumLength
    }))))
  );
});
exports.HelpTextSection = HelpTextSection;
//# sourceMappingURL=HelpTextSection.js.map
