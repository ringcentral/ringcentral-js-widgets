import callingSettingsMessages from
  'ringcentral-integration/modules/CallingSettings/callingSettingsMessages';

export default {
  [callingSettingsMessages.saveSuccess]: 'Les paramètres ont été enregistrés.',
  [callingSettingsMessages.saveSuccessWithSoftphone]: 'Les paramètres ont été sauvegardés. Veuillez vous assurer que {brand} pour ordinateur de bureau est installé sur votre ordinateur.',
  [callingSettingsMessages.firstLogin]: 'Dans la section Appel, veuillez sélectionner la manière dont vous souhaitez effectuer votre appel. Merci de nous indiquer votre emplacement en spécifiant le pays et l\'indicatif régional (si disponible) dans la section Région. Cela vous permettra de composer des numéros locaux avec l\'application.',
  [callingSettingsMessages.firstLoginOther]: 'Dans la section Appel, veuillez sélectionner la manière dont vous souhaitez effectuer votre appel.',
  [callingSettingsMessages.permissionChanged]: 'Vos autorisations ont été modifiées récemment. Veuillez aller à {link} pour vérifier vos options d\'appel.',
  [callingSettingsMessages.phoneNumberChanged]: 'Les informations de votre téléphone mobile ont été modifiées récemment. Veuillez aller à {link} pour vérifier vos options d\'appel.',
  link: 'Paramètres > Appel',
  [callingSettingsMessages.webphonePermissionRemoved]: 'Vos autorisations ont été modifiées et vous ne pouvez pas faire des appels avec le navigateur. Pour plus de détails, veuillez communiquer avec votre administrateur de compte.',
  [callingSettingsMessages.emergencyCallingNotAvailable]: 'Les appels d\'urgence ou les numéros de service spéciaux ne sont pas pris en charge. En cas d\'urgence, utilisez votre téléphone filaire ou mobile traditionnel pour faire un appel d\'urgence.',
};
