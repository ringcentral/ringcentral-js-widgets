"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
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
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var HintsMap = {
  title: _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsTitle,
  context: _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsContent
};
var HelpTextSection = exports.HelpTextSection = /*#__PURE__*/(0, _react.memo)(function (_ref) {
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
//# sourceMappingURL=HelpTextSection.js.map
