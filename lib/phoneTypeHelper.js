"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortByPhoneTypes = exports.phoneTypeOrderMap = exports.phoneTypeOrder = void 0;

require("core-js/modules/es6.object.freeze");

var _ramda = require("ramda");

var _phoneTypes = _interopRequireDefault(require("../enums/phoneTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var phoneTypeOrder = Object.freeze([_phoneTypes.default.extension, _phoneTypes.default.direct, _phoneTypes.default.mobile, _phoneTypes.default.business, _phoneTypes.default.home, _phoneTypes.default.fax, _phoneTypes.default.other, // not in particular order
_phoneTypes.default.phone, _phoneTypes.default.unknown, _phoneTypes.default.company]);
exports.phoneTypeOrder = phoneTypeOrder;
var phoneTypeOrderMap = Object.freeze((0, _ramda.reduce)(function (acc, item, idx) {
  acc[item] = idx;
  return acc;
}, {}, phoneTypeOrder));
exports.phoneTypeOrderMap = phoneTypeOrderMap;
var sortByPhoneTypes = (0, _ramda.sort)(function (a, b) {
  return phoneTypeOrderMap[a.phoneType] - phoneTypeOrderMap[b.phoneType];
});
exports.sortByPhoneTypes = sortByPhoneTypes;
//# sourceMappingURL=phoneTypeHelper.js.map
