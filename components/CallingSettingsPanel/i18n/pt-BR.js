"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _callingOptions = _interopRequireDefault(require("ringcentral-integration/modules/CallingSettings/callingOptions"));

var _title$callingOptions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_title$callingOptions = {
  title: "Chamadas"
}, _defineProperty(_title$callingOptions, _callingOptions.default.softphone, "{brand} para Desktop"), _defineProperty(_title$callingOptions, _callingOptions.default.myphone, "Meu telefone {brand}"), _defineProperty(_title$callingOptions, _callingOptions.default.otherphone, "Outro telefone"), _defineProperty(_title$callingOptions, _callingOptions.default.customphone, "Telefone personalizado"), _defineProperty(_title$callingOptions, _callingOptions.default.browser, "Navegador"), _defineProperty(_title$callingOptions, "makeCallsWith", "Fazer minhas chamadas com"), _defineProperty(_title$callingOptions, "ringoutHint", "Ligar para meu local primeiro e, em seguida, conectar ao destinatário da chamada"), _defineProperty(_title$callingOptions, "myLocationLabel", "Meu local"), _defineProperty(_title$callingOptions, "press1ToStartCallLabel", "Solicitar discar 1 antes de conectar a chamada"), _defineProperty(_title$callingOptions, "".concat(_callingOptions.default.browser, "Tooltip"), "Use esta opção para fazer e receber chamadas usando o microfone e o alto-falante do computador."), _defineProperty(_title$callingOptions, "".concat(_callingOptions.default.softphone, "Tooltip"), "Use esta opção para fazer e receber chamadas usando o aplicativo {brand} para Desktop."), _defineProperty(_title$callingOptions, "".concat(_callingOptions.default.myphone, "Tooltip"), "Use esta opção para fazer chamadas usando o telefone {brand}."), _defineProperty(_title$callingOptions, "".concat(_callingOptions.default.myphone, "Tooltip1"), "Para a chamada efetuada, o telefone {brand} toca primeiro e, em seguida, a parte de destino."), _defineProperty(_title$callingOptions, "".concat(_callingOptions.default.otherphone, "Tooltip"), "Use esta opção para fazer chamadas usando outros telefones, como o residencial ou celular, adicionado no Ramal do {brand}."), _defineProperty(_title$callingOptions, "".concat(_callingOptions.default.otherphone, "Tooltip1"), "Para a chamada efetuada, o telefone toca primeiro e, em seguida, a parte de destino."), _defineProperty(_title$callingOptions, "".concat(_callingOptions.default.customphone, "Tooltip"), "Use esta opção para fazer chamadas usando qualquer telefone de sua escolha ao inserir um número de telefone válido no campo abaixo."), _defineProperty(_title$callingOptions, "".concat(_callingOptions.default.customphone, "Tooltip1"), "Para a chamada efetuada, o telefone toca primeiro e, em seguida, a parte de destino."), _title$callingOptions); // @key: @#@"title"@#@ @source: @#@"Calling"@#@
// @key: @#@"[callingOptions.softphone]"@#@ @source: @#@"{brand} for Desktop"@#@
// @key: @#@"[callingOptions.myphone]"@#@ @source: @#@"My {brand} Phone"@#@
// @key: @#@"[callingOptions.otherphone]"@#@ @source: @#@"Other Phone"@#@
// @key: @#@"[callingOptions.customphone]"@#@ @source: @#@"Custom Phone"@#@
// @key: @#@"[callingOptions.browser]"@#@ @source: @#@"Browser"@#@
// @key: @#@"makeCallsWith"@#@ @source: @#@"Make my calls with"@#@
// @key: @#@"ringoutHint"@#@ @source: @#@"Ring me at my location first, then connect the called party"@#@
// @key: @#@"myLocationLabel"@#@ @source: @#@"My Location"@#@
// @key: @#@"press1ToStartCallLabel"@#@ @source: @#@"Prompt me to dial 1 before connecting the call"@#@
// @key: @#@"[`${callingOptions.browser}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your computer’s microphone and speaker."@#@
// @key: @#@"[`${callingOptions.softphone}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your {brand} for Desktop app."@#@
// @key: @#@"[`${callingOptions.myphone}Tooltip`]"@#@ @source: @#@"Use this option to make calls using your {brand} phone."@#@
// @key: @#@"[`${callingOptions.myphone}Tooltip1`]"@#@ @source: @#@"For the call you make, your {brand} phone will ring first then the party you called."@#@
// @key: @#@"[`${callingOptions.otherphone}Tooltip`]"@#@ @source: @#@"Use this option to make calls using your other phones such as home or cell phones that you have added in your {brand} Extension."@#@
// @key: @#@"[`${callingOptions.otherphone}Tooltip1`]"@#@ @source: @#@"For the call you make, this phone will ring first then the party you called."@#@
// @key: @#@"[`${callingOptions.customphone}Tooltip`]"@#@ @source: @#@"Use this option to make calls using any phone of your choice by entering a valid phone number in the field below."@#@
// @key: @#@"[`${callingOptions.customphone}Tooltip1`]"@#@ @source: @#@"For the call you make, this phone will ring first then the party you called."@#@


exports.default = _default;
//# sourceMappingURL=pt-BR.js.map
