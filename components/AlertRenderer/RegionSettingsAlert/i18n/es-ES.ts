import { regionSettingsMessages } from '@ringcentral-integration/commons/modules/RegionSettings/regionSettingsMessages';
export default {
  region: "Región",
  [regionSettingsMessages.saveSuccess]: "La configuración se guardó correctamente.",
  [regionSettingsMessages.dialingPlansChanged]: "Su cuenta ya no es compatible con la región anterior.\n    Compruebe su nueva {regionSettingsLink}.",
  regionSettings: "configuración de región",
  [regionSettingsMessages.areaCodeInvalid]: "Introduzca un código de área válido."
};

// @key: @#@"region"@#@ @source: @#@"Region"@#@
// @key: @#@"[regionSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[regionSettingsMessages.dialingPlansChanged]"@#@ @source: @#@"The previous region is no longer supported for your account.\n    Please verify your new {regionSettingsLink}."@#@
// @key: @#@"regionSettings"@#@ @source: @#@"region settings"@#@
// @key: @#@"[regionSettingsMessages.areaCodeInvalid]"@#@ @source: @#@"Please enter a valid area code."@#@
