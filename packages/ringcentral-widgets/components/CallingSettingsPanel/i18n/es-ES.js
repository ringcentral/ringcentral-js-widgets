import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';

export default {
  title: 'Llamadas',
  [callingOptions.softphone]: '{brand} para escritorio',
  [callingOptions.myphone]: 'Mi teléfono {brand} ',
  [callingOptions.otherphone]: 'Otro teléfono',
  [callingOptions.customphone]: 'Personalizar teléfono',
  [callingOptions.browser]: 'Navegador',
  makeCallsWith: 'Realizar mis llamadas con',
  ringoutHint: 'Llamar primero a mi ubicación y conectar después con la parte que llama',
  myLocationLabel: 'Mi ubicación',
  press1ToStartCallLabel: 'Avisarme de que marque 1 para conectar la llamada'
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
