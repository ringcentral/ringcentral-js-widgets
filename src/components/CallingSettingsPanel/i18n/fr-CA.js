import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';

export default {
  title: 'Appel',
  [callingOptions.softphone]: '{brand} pour ordinateur de bureau',
  [callingOptions.myphone]: 'Mon téléphone {brand}',
  [callingOptions.otherphone]: 'Autre téléphone',
  [callingOptions.customphone]: 'Téléphone personnalisé',
  makeCallsWith: 'Effectuer mes appels sortants avec',
  ringoutHint: 'Appeler d\'abord à mon emplacement, puis connecter le destinataire.',
  myLocationLabel: 'Mon emplacement',
  press1ToStartCallLabel: 'Me demander de composer le 1 avant d\'établir la connexion',
};
