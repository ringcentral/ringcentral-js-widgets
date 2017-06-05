import callingSettingsMessages from
  'ringcentral-integration/modules/CallingSettings/callingSettingsMessages';

export default {
  [callingSettingsMessages.saveSuccess]: 'Les paramètres ont été enregistrés.',
  [callingSettingsMessages.saveSuccessWithSoftphone]: 'Les paramètres ont été sauvegardés. Veuillez vous assurer que {brand} pour ordinateur de bureau est installé sur votre machine.',
  [callingSettingsMessages.firstLogin]: 'Dans la section Appel, veuillez sélectionner la manière dont vous souhaitez passer votre appel. Merci de nous indiquer votre emplacement en spécifiant le pays et l\'indicatif régional (si disponible) dans la section Région. Cela vous permettra de composer des numéros locaux avec l\'application.',
  [callingSettingsMessages.firstLoginOther]: 'Dans la section Appel, veuillez sélectionner la manière dont vous souhaitez passer votre appel.',
  [callingSettingsMessages.permissionChanged]: 'Vos autorisations ont été modifiées récemment. Veuillez vous rendre dans {link} pour vérifier vos options d\'appel.',
  [callingSettingsMessages.phoneNumberChanged]: 'Les informations de votre téléphone mobile ont été modifiées récemment. Veuillez vous rendre dans {link} pour vérifier vos options d\'appel.',
  link: 'Paramètres > Appel',
  [callingSettingsMessages.webphonePermissionRemoved]: 'Vos permissions ont été modifiées et vous ne pouvez pas passer d\'appel avec un navigateur. Pour plus de détails, veuillez contacter votre administrateur de compte.',
  [callingSettingsMessages.emergencyCallingNotAvailable]: 'Numéro d\'urgence ou service spécial non pris en charge. En cas d\'urgence, veuillez utiliser un téléphone fixe ou mobile traditionnel pour contacter les services compétents.',
};
