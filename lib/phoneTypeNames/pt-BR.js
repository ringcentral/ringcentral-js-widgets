"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _phoneTypes = _interopRequireDefault(require("../../enums/phoneTypes"));

var _phoneTypes$business$;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_phoneTypes$business$ = {}, _defineProperty(_phoneTypes$business$, _phoneTypes["default"].business, "Telefone comercial"), _defineProperty(_phoneTypes$business$, _phoneTypes["default"].extension, "Número do ramal"), _defineProperty(_phoneTypes$business$, _phoneTypes["default"].home, "Número da casa"), _defineProperty(_phoneTypes$business$, _phoneTypes["default"].mobile, "Telefone celular"), _defineProperty(_phoneTypes$business$, _phoneTypes["default"].phone, "Telefone"), _defineProperty(_phoneTypes$business$, _phoneTypes["default"].unknown, "Tipo de telefone desconhecido"), _defineProperty(_phoneTypes$business$, _phoneTypes["default"].company, "Número da empresa"), _defineProperty(_phoneTypes$business$, _phoneTypes["default"].direct, "Número direto"), _defineProperty(_phoneTypes$business$, _phoneTypes["default"].fax, "Fax"), _defineProperty(_phoneTypes$business$, _phoneTypes["default"].other, "Outro"), _phoneTypes$business$); // @key: @#@"[phoneTypes.business]"@#@ @source: @#@"Business Phone"@#@
// @key: @#@"[phoneTypes.extension]"@#@ @source: @#@"Extension Number"@#@
// @key: @#@"[phoneTypes.home]"@#@ @source: @#@"Home Number"@#@
// @key: @#@"[phoneTypes.mobile]"@#@ @source: @#@"Mobile Phone"@#@
// @key: @#@"[phoneTypes.phone]"@#@ @source: @#@"Phone"@#@
// @key: @#@"[phoneTypes.unknown]"@#@ @source: @#@"Unknown Phone Type"@#@
// @key: @#@"[phoneTypes.company]"@#@ @source: @#@"Company Number"@#@
// @key: @#@"[phoneTypes.direct]"@#@ @source: @#@"Direct Number"@#@
// @key: @#@"[phoneTypes.fax]"@#@ @source: @#@"Fax"@#@
// @key: @#@"[phoneTypes.other]"@#@ @source: @#@"Other"@#@


exports["default"] = _default;
//# sourceMappingURL=pt-BR.js.map
