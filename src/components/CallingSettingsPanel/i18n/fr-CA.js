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
  press1ToStartCallLabel: 'Me demander de composer le\xA01 avant d\'établir la connexion',
  [callingOptions.browser]: 'Navigateur',
  save: 'Sauvegarder',
  [`${callingOptions.browser}Tooltip`]: 'Utilisez cette option pour faire et recevoir des appels au moyen du microphone et du haut-parleur de votre ordinateur.',
  [`${callingOptions.softphone}Tooltip`]: 'Utilisez cette option pour faire et recevoir des appels au moyen de votre application {brand} pour bureau.',
  [`${callingOptions.myphone}Tooltip`]: 'Utilisez cette option pour faire des appels en utilisant votre téléphone {brand}.',
  [`${callingOptions.myphone}Tooltip1`]: 'Pour l\'appel en cours, votre téléphone {brand} sonnera d\'abord, puis celui de la personne appelée.',
  [`${callingOptions.otherphone}Tooltip`]: 'Utilisez cette option pour faire des appels en utilisant vos autres téléphones, comme celui de votre domicile ou des téléphones cellulaires que vous avez ajoutés dans votre extension {brand}.',
  [`${callingOptions.otherphone}Tooltip1`]: 'Pour l\'appel en cours, ce téléphone sonnera d\'abord, puis celui de la personne appelée.',
  [`${callingOptions.customphone}Tooltip`]: 'Utilisez cette option pour faire des appels en utilisant n\'importe quel téléphone. Entrez un numéro de téléphone valide dans le champ ci-dessous.',
  [`${callingOptions.customphone}Tooltip1`]: 'Pour l\'appel en cours, ce téléphone sonnera d\'abord, puis celui de la personne appelée.',
};
