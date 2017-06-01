import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';

export default {
  title: 'Llamadas',
  [callingOptions.softphone]: '{brand} para escritorio',
  [callingOptions.myphone]: 'Mi teléfono {brand} ',
  [callingOptions.otherphone]: 'Otro teléfono',
  [callingOptions.customphone]: 'Personalizar teléfono',
  makeCallsWith: 'Realizar mis llamadas con',
  ringoutHint: 'Llamar primero a mi ubicación y conectar después con la parte que llama',
  myLocationLabel: 'Mi ubicación',
  press1ToStartCallLabel: 'Avisarme de que marque 1 para conectar la llamada',
};
