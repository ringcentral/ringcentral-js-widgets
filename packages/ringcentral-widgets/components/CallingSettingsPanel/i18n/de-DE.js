import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';

export default {
  title: 'Anrufen',
  [callingOptions.softphone]: '{brand} für Desktop',
  [callingOptions.myphone]: 'Meinem {brand}-Telefon',
  [callingOptions.otherphone]: 'Anderem Telefon',
  [callingOptions.customphone]: 'Benutzerdefiniertem Telefon',
  [callingOptions.browser]: 'Browser',
  makeCallsWith: 'Anrufe ausführen mit',
  ringoutHint: 'Zunächst am Standort anklingeln, dann Verbindung zum Anrufempfänger herstellen',
  myLocationLabel: 'Mein Standort',
  press1ToStartCallLabel: 'Vor dem Verbinden des Anrufs zum Wählen von \'1\' auffordern'
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
