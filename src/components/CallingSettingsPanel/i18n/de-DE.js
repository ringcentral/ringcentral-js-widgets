import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';

export default {
  title: 'Anrufen',
  [callingOptions.softphone]: '{brand} für Desktop',
  [callingOptions.myphone]: 'Mein {brand}-Telefon',
  [callingOptions.otherphone]: 'Anderes Telefon',
  [callingOptions.customphone]: 'Benutzerdefiniertes Telefon',
  makeCallsWith: 'Anrufe ausführen mit',
  ringoutHint: 'Zunächst am Standort anklingeln, dann Verbindung zum Anrufempfänger herstellen',
  myLocationLabel: 'Mein Standort',
  press1ToStartCallLabel: 'Vor dem Verbinden des Anrufs zum Wählen von "1" auffordern',
};
