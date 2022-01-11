"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortByPhoneTypes = exports.phoneTypeOrderMap = exports.phoneTypeOrder = exports.isSupportedPhoneNumber = exports.filterByPhoneTypes = exports.convertUsageTypeToPhoneType = void 0;

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.freeze");

var _ramda = require("ramda");

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var _phoneTypes = require("../enums/phoneTypes");

var phoneTypeOrder = Object.freeze([_phoneTypes.phoneTypes.extension, _phoneTypes.phoneTypes.direct, _phoneTypes.phoneTypes.contact, _phoneTypes.phoneTypes.mobile, _phoneTypes.phoneTypes.business, _phoneTypes.phoneTypes.home, _phoneTypes.phoneTypes.fax, _phoneTypes.phoneTypes.other, // not in particular order
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
var supportedUsageTypePhoneTypeMap = {
  ContactNumber: _phoneTypes.phoneTypes.contact,
  MobileNumber: _phoneTypes.phoneTypes.mobile,
  DirectNumber: _phoneTypes.phoneTypes.direct
};
var SUPPORTED_USAGE_TYPES = Object.keys(supportedUsageTypePhoneTypeMap); // Support all direct number + Mobile and Contact Number

var isSupportedPhoneNumber = function isSupportedPhoneNumber(phone) {
  return phone.type || !phone.type && SUPPORTED_USAGE_TYPES.includes(phone.usageType);
};

exports.isSupportedPhoneNumber = isSupportedPhoneNumber;

var convertUsageTypeToPhoneType = function convertUsageTypeToPhoneType(usageType) {
  return supportedUsageTypePhoneTypeMap[usageType] || _phoneTypes.phoneTypes.direct;
};

exports.convertUsageTypeToPhoneType = convertUsageTypeToPhoneType;
//# sourceMappingURL=phoneTypeHelper.js.map
