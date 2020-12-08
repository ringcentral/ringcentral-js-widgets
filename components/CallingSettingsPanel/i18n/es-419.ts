import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';
export default {
  title: "Llamadas",
  [callingOptions.softphone]: "{brand} para escritrorio",
  [callingOptions.browser]: "Navegador",
  [callingOptions.jupiter]: "{brand}",
  makeCallsWith: "Realizar mis llamadas con",
  ringoutHint: "Llamar primero a mi ubicación y luego conectar al número llamado",
  myLocationLabel: "Mi ubicación",
  press1ToStartCallLabel: "Avisarme que marque 1 para conectar la llamada",
  [`${callingOptions.browser}Tooltip`]: "Utilice esta opción para hacer y recibir llamadas con el micrófono y los altavoces de su computadora.",
  [`${callingOptions.softphone}Tooltip`]: "Utilice esta opción para hacer y recibir llamadas usando su {brand}.",
  [`${callingOptions.ringout}Tooltip`]: "Use esta opción para hacer llamadas con su número de teléfono seleccionado o ingresado.",
  [`${callingOptions.ringout}Tooltip1`]: "Para la llamada que hace, este teléfono sonará primero, y luego a quien llamó.",
  [`${callingOptions.jupiter}Tooltip`]: "Utilice esta opción para hacer y recibir llamadas usando su {brand}."
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
