import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';

export default {
  title: "Chiamata",
  [callingOptions.softphone]: "{brand} per desktop",
  [callingOptions.myphone]: "Il mio telefono {brand}",
  [callingOptions.otherphone]: "Altro telefono",
  [callingOptions.customphone]: "Telefono personalizzato",
  [callingOptions.browser]: "Browser",
  makeCallsWith: "Effettua chiamate con",
  ringoutHint: "Chiamami prima alla mia postazione, poi connetti la persona chiamata",
  myLocationLabel: "La mia postazione",
  press1ToStartCallLabel: "Chiedimi di comporre 1 prima di connettere la chiamata"
};

// @key: @#@"title"@#@ @source: @#@"Calling"@#@
// @key: @#@"[callingOptions.softphone]"@#@ @source: @#@"{brand} for Desktop"@#@
// @key: @#@"[callingOptions.myphone]"@#@ @source: @#@"My {brand} Phone"@#@
// @key: @#@"[callingOptions.otherphone]"@#@ @source: @#@"Other Phone"@#@
// @key: @#@"[callingOptions.customphone]"@#@ @source: @#@"Custom Phone"@#@
// @key: @#@"[callingOptions.browser]"@#@ @source: @#@"Browser"@#@
// @key: @#@"makeCallsWith"@#@ @source: @#@"Make my calls with"@#@
// @key: @#@"ringoutHint"@#@ @source: @#@"Ring me at my location first, then connect the called party"@#@
// @key: @#@"myLocationLabel"@#@ @source: @#@"My Location"@#@
// @key: @#@"press1ToStartCallLabel"@#@ @source: @#@"Prompt me to dial 1 before connecting the call"@#@
