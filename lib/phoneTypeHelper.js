"use strict";

require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortByPhoneTypes = exports.phoneTypeOrderMap = exports.phoneTypeOrder = exports.isSupportedPhoneNumber = exports.filterByPhoneTypes = exports.convertUsageTypeToPhoneType = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.string.includes.js");
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var _ramda = require("ramda");
var _phoneTypes = require("../enums/phoneTypes");
var phoneTypeOrder = exports.phoneTypeOrder = Object.freeze([_phoneTypes.phoneTypes.extension, _phoneTypes.phoneTypes.direct, _phoneTypes.phoneTypes.contact, _phoneTypes.phoneTypes.mobile, _phoneTypes.phoneTypes.business, _phoneTypes.phoneTypes.home, _phoneTypes.phoneTypes.fax, _phoneTypes.phoneTypes.other,
// not in particular order
_phoneTypes.phoneTypes.phone, _phoneTypes.phoneTypes.unknown, _phoneTypes.phoneTypes.company]);
var phoneTypeOrderMap = exports.phoneTypeOrderMap = Object.freeze((0, _ramda.addIndex)(_ramda.reduce)(function (acc, item, idx) {
  acc[item] = idx;
  return acc;
}, {}, phoneTypeOrder));
var filterByPhoneTypes = exports.filterByPhoneTypes = (0, _ramda.filter)(function (item) {
  return _ObjectMap.ObjectMap.hasValue(_phoneTypes.phoneTypes, item.phoneType);
});
var sortByPhoneTypes = exports.sortByPhoneTypes = (0, _ramda.sort)(function (a, b) {
  return phoneTypeOrderMap[a.phoneType] - phoneTypeOrderMap[b.phoneType];
});
var supportedUsageTypePhoneTypeMap = {
  ContactNumber: _phoneTypes.phoneTypes.contact,
  MobileNumber: _phoneTypes.phoneTypes.mobile,
  DirectNumber: _phoneTypes.phoneTypes.direct
};
var SUPPORTED_USAGE_TYPES = Object.keys(supportedUsageTypePhoneTypeMap);

// Support all direct number + Mobile and Contact Number
var isSupportedPhoneNumber = exports.isSupportedPhoneNumber = function isSupportedPhoneNumber(phone) {
  return phone.type || !phone.type && SUPPORTED_USAGE_TYPES.includes(phone.usageType);
};
var convertUsageTypeToPhoneType = exports.convertUsageTypeToPhoneType = function convertUsageTypeToPhoneType(usageType) {
  return supportedUsageTypePhoneTypeMap[usageType] || _phoneTypes.phoneTypes.direct;
};
//# sourceMappingURL=phoneTypeHelper.js.map
