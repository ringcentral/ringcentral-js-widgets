import regionSettingsMessages from
  'ringcentral-integration/modules/RegionSettings/regionSettingsMessages';

export default {
  region: 'Région',
  [regionSettingsMessages.saveSuccess]: 'Les paramètres ont été enregistrés.',
  [regionSettingsMessages.dialingPlansChanged]: 'La région précédente n\'est plus prise en charge pour votre compte.\n     Veuillez vérifier vos nouveaux {regionSettingsLink}.',
  regionSettings: 'paramètres régionaux',
  [regionSettingsMessages.areaCodeInvalid]: 'Veuillez saisir un indicatif régional valide.',
};
