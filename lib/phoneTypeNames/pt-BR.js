"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _phoneTypes = require("@ringcentral-integration/commons/enums/phoneTypes");
var _phoneTypes$business$;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_phoneTypes$business$ = {}, _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.business, "Telefone corporativo"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.extension, "Número do ramal"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.home, "Número da casa"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.mobile, "Telefone celular"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.phone, "Telefone"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.unknown, "Tipo de telefone desconhecido"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.company, "Número da empresa"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.direct, "Número direto"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.contact, "Telefone de contato"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.fax, "Fax"), _defineProperty(_phoneTypes$business$, _phoneTypes.phoneTypes.other, "Outro"), _phoneTypes$business$); // @key: @#@"[phoneTypes.business]"@#@ @source: @#@"Business Phone"@#@
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
//# sourceMappingURL=pt-BR.js.map
