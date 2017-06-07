import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';

export default {
  title: 'Chiamata',
  [callingOptions.softphone]: '{brand} per il desktop',
  [callingOptions.myphone]: 'Il mio telefono {brand}',
  [callingOptions.otherphone]: 'Altro telefono',
  [callingOptions.customphone]: 'Telefono personalizzato',
  makeCallsWith: 'Effettua chiamate con',
  ringoutHint: 'Chiamami prima alla mia postazione, poi connetti il gruppo chiamato',
  myLocationLabel: 'La mia postazione',
  press1ToStartCallLabel: 'Chiedimi di comporre 1 prima di connettere la chiamata',
  [callingOptions.browser]: 'Browser',
};
