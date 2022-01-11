"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _phoneTypes = require("@ringcentral-integration/commons/enums/phoneTypes");

var _phoneTypes$business$;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_phoneTypes$business$ = {}, _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.business, "Työpuhelin"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.extension, "Alanumero"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.home, "Kotinumero"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.mobile, "Matkapuhelin"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.phone, "Puhelin"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.unknown, "Tuntematon puhelintyyppi"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.company, "Yrityksen numero"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.direct, "Suora numero"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.contact, "Yhteystiedon puhelin"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.fax, "Faksi"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.other, "Muu"), _phoneTypes$business$); // @key: @#@"[phoneTypes.business]"@#@ @source: @#@"Business Phone"@#@
// @key: @#@"[phoneTypes.extension]"@#@ @source: @#@"Extension Number"@#@
// @key: @#@"[phoneTypes.home]"@#@ @source: @#@"Home Number"@#@
// @key: @#@"[phoneTypes.mobile]"@#@ @source: @#@"Mobile Phone"@#@
// @key: @#@"[phoneTypes.phone]"@#@ @source: @#@"Phone"@#@
// @key: @#@"[phoneTypes.unknown]"@#@ @source: @#@"Unknown Phone Type"@#@
// @key: @#@"[phoneTypes.company]"@#@ @source: @#@"Company Number"@#@
// @key: @#@"[phoneTypes.direct]"@#@ @source: @#@"Direct Number"@#@
// @key: @#@"[phoneTypes.contact]"@#@ @source: @#@"Contact Phone"@#@
// @key: @#@"[phoneTypes.fax]"@#@ @source: @#@"Fax"@#@
// @key: @#@"[phoneTypes.other]"@#@ @source: @#@"Other"@#@


exports["default"] = _default;
//# sourceMappingURL=fi-FI.js.map
