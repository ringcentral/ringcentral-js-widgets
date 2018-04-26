import regionSettingsMessages from
  'ringcentral-integration/modules/RegionSettings/regionSettingsMessages';

export default {
  region: 'Région',
  [regionSettingsMessages.saveSuccess]: 'Les paramètres ont été enregistrés.',
  [regionSettingsMessages.dialingPlansChanged]: 'La région précédente n\'est plus prise en charge pour votre compte.\n     Veuillez vérifier vos nouveaux {regionSettingsLink}.',
  regionSettings: 'paramètres régionaux',
  [regionSettingsMessages.areaCodeInvalid]: 'Veuillez saisir un indicatif régional valide.',
};

// @key: @#@"region"@#@ @source: @#@"Region"@#@
// @key: @#@"[regionSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[regionSettingsMessages.dialingPlansChanged]"@#@ @source: @#@"The previous region is no longer supported for your account.\n    Please verify your new {regionSettingsLink}."@#@
// @key: @#@"regionSettings"@#@ @source: @#@"region settings"@#@
// @key: @#@"[regionSettingsMessages.areaCodeInvalid]"@#@ @source: @#@"Please enter a valid area code."@#@
