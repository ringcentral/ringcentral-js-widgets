"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _phoneTypes = require("@ringcentral-integration/commons/enums/phoneTypes");

var _phoneTypes$business$;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_phoneTypes$business$ = {}, _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.business, "Telefon (geschäftlich)"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.extension, "Durchwahlnummer"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.home, "Privatnummer"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.mobile, "Mobiltelefon"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.phone, "Telefon"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.unknown, "Unbekannter Telefontyp"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.company, "Firmennummer"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.direct, "Direktwahlnummer"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.contact, "Kontakttelefon"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.fax, "Fax"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.other, "Andere"), _phoneTypes$business$); // @key: @#@"[phoneTypes.business]"@#@ @source: @#@"Business Phone"@#@
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
//# sourceMappingURL=de-DE.js.map
