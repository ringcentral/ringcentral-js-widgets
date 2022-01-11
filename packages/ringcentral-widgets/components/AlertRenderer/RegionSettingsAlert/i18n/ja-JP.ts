import { regionSettingsMessages } from '@ringcentral-integration/commons/modules/RegionSettings/regionSettingsMessages';
export default {
  region: "地域",
  [regionSettingsMessages.saveSuccess]: "設定が正常に保存されました。",
  [regionSettingsMessages.dialingPlansChanged]: "前の地域は、お使いのアカウントでもうサポートされません。\n    新しい{regionSettingsLink}を確認してください。",
  regionSettings: "地域の設定",
  [regionSettingsMessages.areaCodeInvalid]: "有効な市外局番を入力してください。"
};

// @key: @#@"region"@#@ @source: @#@"Region"@#@
// @key: @#@"[regionSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[regionSettingsMessages.dialingPlansChanged]"@#@ @source: @#@"The previous region is no longer supported for your account.\n    Please verify your new {regionSettingsLink}."@#@
// @key: @#@"regionSettings"@#@ @source: @#@"region settings"@#@
// @key: @#@"[regionSettingsMessages.areaCodeInvalid]"@#@ @source: @#@"Please enter a valid area code."@#@
