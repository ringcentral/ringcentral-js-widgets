"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortByPhoneTypes = exports.filterByPhoneTypes = exports.phoneTypeOrderMap = exports.phoneTypeOrder = void 0;

require("core-js/modules/es6.object.freeze");

var _ramda = require("ramda");

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var _phoneTypes = require("../enums/phoneTypes");

var phoneTypeOrder = Object.freeze([_phoneTypes.phoneTypes.extension, _phoneTypes.phoneTypes.direct, _phoneTypes.phoneTypes.mobile, _phoneTypes.phoneTypes.business, _phoneTypes.phoneTypes.home, _phoneTypes.phoneTypes.fax, _phoneTypes.phoneTypes.other, // not in particular order
_phoneTypes.phoneTypes.phone, _phoneTypes.phoneTypes.unknown, _phoneTypes.phoneTypes.company]);
exports.phoneTypeOrder = phoneTypeOrder;
var phoneTypeOrderMap = Object.freeze((0, _ramda.addIndex)(_ramda.reduce)(function (acc, item, idx) {
  acc[item] = idx;
  return acc;
}, {}, phoneTypeOrder));
exports.phoneTypeOrderMap = phoneTypeOrderMap;
var filterByPhoneTypes = (0, _ramda.filter)(function (item) {
  return _ObjectMap.ObjectMap.hasValue(_phoneTypes.phoneTypes, item.phoneType);
});
exports.filterByPhoneTypes = filterByPhoneTypes;
var sortByPhoneTypes = (0, _ramda.sort)(function (a, b) {
  return phoneTypeOrderMap[a.phoneType] - phoneTypeOrderMap[b.phoneType];
});
exports.sortByPhoneTypes = sortByPhoneTypes;
//# sourceMappingURL=phoneTypeHelper.js.map
