import callingOptions from '@ringcentral-integration/commons/modules/CallingSettings/callingOptions';
export default {
  title: "A chamar",
  [callingOptions.softphone]: "{brand} para computador",
  [callingOptions.browser]: "Browser",
  [callingOptions.jupiter]: "{brand}",
  makeCallsWith: "Efetuar as minhas chamadas com",
  ringoutHint: "Ligar primeiro para mim na minha localização e, em seguida, ligar para o número marcado",
  myLocationLabel: "A minha localização",
  press1ToStartCallLabel: "Pedir para marcar 1 antes de efetuar a chamada",
  [`${callingOptions.browser}Tooltip`]: "Utilize esta opção para efetuar e receber chamadas através do microfone e do altifalante do computador.",
  [`${callingOptions.softphone}Tooltip`]: "Utilize esta opção para efetuar e receber chamadas através do {brand}.",
  [`${callingOptions.ringout}Tooltip`]: "Utilize esta opção para efetuar chamadas através do número de telefone selecionado ou introduzido.",
  [`${callingOptions.ringout}Tooltip1`]: "Para a chamada que efetuar, este telefone irá tocar primeiro e, em seguida, o do número marcado.",
  [`${callingOptions.jupiter}Tooltip`]: "Utilize esta opção para efetuar e receber chamadas através do {brand}."
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
