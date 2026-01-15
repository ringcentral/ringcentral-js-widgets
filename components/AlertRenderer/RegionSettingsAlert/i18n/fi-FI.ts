/* eslint-disable */
import { regionSettingsMessages } from '@ringcentral-integration/commons/modules/RegionSettings/regionSettingsMessages';
export default {
  region: 'Alue',
  [regionSettingsMessages.saveSuccess]: 'Asetusten tallennus onnistui.',
  [regionSettingsMessages.dialingPlansChanged]:
    'Aiempaa aluetta ei enää tueta tililläsi.\n    Vahvista uudet {regionSettingsLink}.',
  regionSettings: 'alueasetukset',
  [regionSettingsMessages.areaCodeInvalid]: 'Anna kelvollinen suuntanumero.',
} as const;

// @key: @#@"region"@#@ @source: @#@"Region"@#@
// @key: @#@"[regionSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[regionSettingsMessages.dialingPlansChanged]"@#@ @source: @#@"The previous region is no longer supported for your account.\n    Please verify your new {regionSettingsLink}."@#@
// @key: @#@"regionSettings"@#@ @source: @#@"region settings"@#@
// @key: @#@"[regionSettingsMessages.areaCodeInvalid]"@#@ @source: @#@"Please enter a valid area code."@#@
