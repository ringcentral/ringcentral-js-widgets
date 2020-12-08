import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';
export default {
  title: "Chamadas",
  [callingOptions.softphone]: "{brand} for Desktop",
  [callingOptions.browser]: "Navegador",
  [callingOptions.jupiter]: "{brand}",
  makeCallsWith: "Fazer minhas chamadas com",
  ringoutHint: "Ligar para meu local primeiro e, em seguida, conectar ao destinatário da chamada",
  myLocationLabel: "Meu local",
  press1ToStartCallLabel: "Solicitar discar 1 antes de conectar a chamada",
  [`${callingOptions.browser}Tooltip`]: "Use esta opção para fazer e receber chamadas usando o microfone e o alto-falante do computador.",
  [`${callingOptions.softphone}Tooltip`]: "Use esta opção para fazer e receber chamadas usando o aplicativo {brand}.",
  [`${callingOptions.ringout}Tooltip`]: "Use esta opção para fazer chamadas usando o número de telefone selecionado ou inserido.",
  [`${callingOptions.ringout}Tooltip1`]: "Quando você fizer a chamada, primeiro este telefone tocará e só depois o da pessoa para a qual você ligou.",
  [`${callingOptions.jupiter}Tooltip`]: "Use esta opção para fazer e receber chamadas usando o aplicativo {brand}."
};

// @key: @#@"title"@#@ @source: @#@"Calling"@#@
// @key: @#@"[callingOptions.softphone]"@#@ @source: @#@"{brand} for Desktop"@#@
// @key: @#@"[callingOptions.browser]"@#@ @source: @#@"Browser"@#@
// @key: @#@"[callingOptions.jupiter]"@#@ @source: @#@"{brand}"@#@
// @key: @#@"makeCallsWith"@#@ @source: @#@"Make my calls with"@#@
// @key: @#@"ringoutHint"@#@ @source: @#@"Ring me at my location first, then connect the called party"@#@
// @key: @#@"myLocationLabel"@#@ @source: @#@"My Location"@#@
// @key: @#@"press1ToStartCallLabel"@#@ @source: @#@"Prompt me to dial 1 before connecting the call"@#@
// @key: @#@"[`${callingOptions.browser}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your computer’s microphone and speaker."@#@
// @key: @#@"[`${callingOptions.softphone}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your {brand}."@#@
// @key: @#@"[`${callingOptions.ringout}Tooltip`]"@#@ @source: @#@"Use this option to make calls using your selected or entered phone number."@#@
// @key: @#@"[`${callingOptions.ringout}Tooltip1`]"@#@ @source: @#@"For the call you make, this phone will ring first then the party you called."@#@
// @key: @#@"[`${callingOptions.jupiter}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your {brand}."@#@
