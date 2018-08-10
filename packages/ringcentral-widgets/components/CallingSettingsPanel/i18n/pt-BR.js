import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';

export default {
  title: 'Chamadas',
  [callingOptions.softphone]: '{brand} para Desktop',
  [callingOptions.myphone]: 'Meu telefone {brand}',
  [callingOptions.otherphone]: 'Outro telefone',
  [callingOptions.customphone]: 'Telefone personalizado',
  [callingOptions.browser]: 'Navegador',
  makeCallsWith: 'Fazer minhas chamadas com',
  ringoutHint: 'Ligar para meu local primeiro e, em seguida, conectar ao destinatário da chamada',
  myLocationLabel: 'Meu local',
  press1ToStartCallLabel: 'Solicitar discar 1 antes de conectar a chamada'
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
