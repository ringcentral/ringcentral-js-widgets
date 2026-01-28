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
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _ContactSearchPanelEnum = require("./ContactSearchPanelEnum");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var HintsMap = {
  title: _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsTitle,
  context: _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsContent
};
var HelpTextSection = exports.HelpTextSection = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var inputLength = _ref.inputLength,
    activeTab = _ref.activeTab,
    hasRecords = _ref.hasRecords,
    sourceName = _ref.sourceName,
    _ref$searchMinimumLen = _ref.searchMinimumLength,
    searchMinimumLength = _ref$searchMinimumLen === void 0 ? 3 : _ref$searchMinimumLen,
    isLoading = _ref.isLoading;
  var hintTitleKey;
  var hintContentKey;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
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
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-2"
    });
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('flex flex-col mb-3', isLoading ? 'text-center' : 'text-left')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col mx-4 mt-4 text-center"
  }, !!hintTitleKey && /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
    "data-sign": "HelpSectionHintTitle",
    component: "p",
    className: "text-xs font-bold mb-1"
  }, t(hintTitleKey)), !!hintContentKey && /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
    "data-sign": "HelpSectionHintContent",
    component: "p",
    className: "font-normal text-xs text-neutral-b2",
    noWrap: false
  }, t(hintContentKey, {
    sourceName: sourceName,
    minimumLength: searchMinimumLength
  }))));
});
//# sourceMappingURL=HelpTextSection.js.map
