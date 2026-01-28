"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateValidChars = exports.generateTabs = exports.generateOptionsMap = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.trim.js");
var _ContactSearchPanelEnum = require("./ContactSearchPanelEnum");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var getCountsRes = function getCountsRes(counts) {
  return counts > 99 ? "99+" : counts;
};
var getPrimaryCount = function getPrimaryCount(items) {
  var count = items === null || items === void 0 ? void 0 : items.filter(function (i) {
    return i.isPrimary;
  }).length;
  return getCountsRes(count);
};
var getPrimaryNumber = function getPrimaryNumber(items) {
  return items === null || items === void 0 ? void 0 : items.filter(function (i) {
    return i.isPrimary;
  }).length;
};
var generateOptionsMap = exports.generateOptionsMap = function generateOptionsMap(_ref) {
  var showOtherContacts = _ref.showOtherContacts,
    isAbleToSearch = _ref.isAbleToSearch,
    companyContacts = _ref.companyContacts,
    otherContacts = _ref.otherContacts,
    personalContacts = _ref.personalContacts,
    thirdPartyContacts = _ref.thirdPartyContacts;
  return showOtherContacts ? _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _ContactSearchPanelEnum.TabsEnum.thirdParty, !isAbleToSearch ? [] : thirdPartyContacts), _ContactSearchPanelEnum.TabsEnum.company, companyContacts), _ContactSearchPanelEnum.TabsEnum.personal, personalContacts), _ContactSearchPanelEnum.TabsEnum.other, otherContacts) : _defineProperty(_defineProperty(_defineProperty({}, _ContactSearchPanelEnum.TabsEnum.thirdParty, !isAbleToSearch ? [] : thirdPartyContacts), _ContactSearchPanelEnum.TabsEnum.company, companyContacts), _ContactSearchPanelEnum.TabsEnum.personal, personalContacts);
};
var generateTabs = exports.generateTabs = function generateTabs(_ref4) {
  var optionsMap = _ref4.optionsMap,
    thirdPartySourceName = _ref4.thirdPartySourceName,
    showOtherContacts = _ref4.showOtherContacts,
    isLoading = _ref4.isLoading,
    t = _ref4.t;
  var companyTabs = [{
    label: t('companyTabTitle'),
    value: _ContactSearchPanelEnum.TabsEnum.company,
    count: getPrimaryCount(optionsMap[_ContactSearchPanelEnum.TabsEnum.company]),
    number: getPrimaryNumber(optionsMap[_ContactSearchPanelEnum.TabsEnum.company])
  }, {
    label: t('personalTabTitle'),
    value: _ContactSearchPanelEnum.TabsEnum.personal,
    count: getPrimaryCount(optionsMap[_ContactSearchPanelEnum.TabsEnum.personal]),
    number: getPrimaryNumber(optionsMap[_ContactSearchPanelEnum.TabsEnum.personal])
  }, {
    label: t('other'),
    value: _ContactSearchPanelEnum.TabsEnum.other,
    count: getPrimaryCount(optionsMap[_ContactSearchPanelEnum.TabsEnum.other]),
    number: getPrimaryNumber(optionsMap[_ContactSearchPanelEnum.TabsEnum.other])
  }];
  if (!showOtherContacts) {
    companyTabs = companyTabs.slice(0, 2);
  }
  companyTabs = companyTabs.sort(function (a, b) {
    // both non-zero, maintain the original order
    if (a.number !== 0 && b.number !== 0) {
      return 0;
    }
    // If the count of a is 0 and the count of b is not 0, b should come before a
    if (a.number === 0 && b.number !== 0) {
      return 1;
    }
    // If the count of b is 0 and the count of a is not 0, a should come before b
    if (a.number !== 0 && b.number === 0) {
      return -1;
    }
    // both zero, maintain the original order
    return 0;
  });
  if (thirdPartySourceName) {
    return [{
      label: thirdPartySourceName,
      value: _ContactSearchPanelEnum.TabsEnum.thirdParty,
      count: isLoading ? 0 : getPrimaryCount(optionsMap[_ContactSearchPanelEnum.TabsEnum.thirdParty])
    }].concat(_toConsumableArray(companyTabs));
  }
  return companyTabs;
};
var invalidCharsRegExp = /[^\d*+#\-(). ]/;
var numberRegExp = /\d/;
var validateValidChars = exports.validateValidChars = function validateValidChars(input) {
  var chars = input.trim();
  return chars.length > 0 && !invalidCharsRegExp.test(chars) && numberRegExp.test(chars);
};
//# sourceMappingURL=helper.js.map
