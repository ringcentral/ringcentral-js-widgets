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
  press1ToStartCallLabel: 'Avisarme de que marque\xA01 para conectar la llamada',
  [callingOptions.browser]: 'Navegador',
  save: 'Guardar',
  [`${callingOptions.browser}Tooltip`]: 'Utilice esta opción para hacer y recibir llamadas con el micrófono y los altavoces de su equipo.',
  [`${callingOptions.softphone}Tooltip`]: 'Utilice esta opción para hacer y recibir llamadas con su teléfono {brand} para la aplicación de escritorio.',
  [`${callingOptions.myphone}Tooltip`]: 'Use esta opción para hacer llamadas usando su teléfono {brand}.',
  [`${callingOptions.myphone}Tooltip1`]: 'En la llamada que realice, primero sonará su teléfono {brand} y luego el de la persona a la que llama.',
  [`${callingOptions.otherphone}Tooltip`]: 'Utilice esta opción para realizar llamadas desde el resto de los teléfonos que ha añadido a su extensión {brand}, como el de su casa o el móvil.',
  [`${callingOptions.otherphone}Tooltip1`]: 'En la llamada que realice, este teléfono sonará primero y luego el de la persona a la que llama.',
  [`${callingOptions.customphone}Tooltip`]: 'Use esta opción para realizar llamadas usando el teléfono de su preferencia, introduciendo un número de teléfono válido en el campo que aparece a continuación.',
  [`${callingOptions.customphone}Tooltip1`]: 'En la llamada que realice, este teléfono sonará primero y luego el de la persona a la que llama.',
};
