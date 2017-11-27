import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';

export default {
  title: 'Anrufen',
  [callingOptions.softphone]: '{brand} für Desktop',
  [callingOptions.myphone]: 'Meinem {brand}-Telefon',
  [callingOptions.otherphone]: 'Anderem Telefon',
  [callingOptions.customphone]: 'Benutzerdefiniertem Telefon',
  makeCallsWith: 'Anrufe ausführen mit',
  ringoutHint: 'Zunächst am Standort anklingeln, dann Verbindung zum Anrufempfänger herstellen',
  myLocationLabel: 'Mein Standort',
  press1ToStartCallLabel: 'Vor dem Verbinden des Anrufs zum Wählen von "1" auffordern',
  [callingOptions.browser]: 'Browser',
  save: 'Speichern',
  [`${callingOptions.browser}Tooltip`]: 'Verwenden Sie diese Option, um Anrufe über das Mikrofon und die Lautsprecher Ihres Computers zu tätigen und entgegenzunehmen.',
  [`${callingOptions.softphone}Tooltip`]: 'Verwenden Sie diese Option, um Anrufe über die {brand} für Desktop-App zu tätigen und entgegenzunehmen.',
  [`${callingOptions.myphone}Tooltip`]: 'Verwenden Sie diese Option, um Anrufe über Ihr {brand}-Telefon zu tätigen und entgegenzunehmen.',
  [`${callingOptions.myphone}Tooltip1`]: 'Wenn Sie einen Anruf tätigen, klingelt zuerst Ihr {brand}-Telefon und dann das Telefon des Anrufempfängers.',
  [`${callingOptions.otherphone}Tooltip`]: 'Verwenden Sie diese Option, um Anrufe über Ihre anderen Telefone wie Festnetztelefone oder Mobiltelefone, die Sie der {brand}-Erweiterung hinzugefügt haben, zu tätigen.',
  [`${callingOptions.otherphone}Tooltip1`]: 'Wenn Sie einen Anruf tätigen, klingelt zuerst dieses Telefon und dann das Telefon des Anrufempfängers.',
  [`${callingOptions.customphone}Tooltip`]: 'Verwenden Sie diese Option, um Anrufe über ein Telefon Ihrer Wahl zu tätigen, indem Sie eine gültige Telefonnummer in das Feld unten eingeben.',
  [`${callingOptions.customphone}Tooltip1`]: 'Wenn Sie einen Anruf tätigen, klingelt zuerst dieses Telefon und dann das Telefon des Anrufempfängers.',
};
