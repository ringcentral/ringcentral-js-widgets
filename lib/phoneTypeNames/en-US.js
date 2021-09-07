"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _phoneTypes = require("@ringcentral-integration/commons/enums/phoneTypes");

var _phoneTypes$business$;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_phoneTypes$business$ = {}, _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.business, 'Business Phone'), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.extension, 'Extension Number'), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.home, 'Home Number'), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.mobile, 'Mobile Phone'), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.phone, 'Phone'), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.unknown, 'Unknown Phone Type'), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.company, 'Company Number'), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.direct, 'Direct Number'), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.contact, 'Contact Phone'), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.fax, 'Fax'), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.other, 'Other'), _phoneTypes$business$);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
