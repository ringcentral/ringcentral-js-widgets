import regionSettingsMessages from 'ringcentral-integration/modules/RegionSettings/regionSettingsMessages';
export default {
  region: "地区",
  [regionSettingsMessages.saveSuccess]: "设置已成功保存。",
  [regionSettingsMessages.dialingPlansChanged]: "您的帐户不再支持以前的地区。\n    请验证您的新 {regionSettingsLink}。",
  regionSettings: "地区设置",
  [regionSettingsMessages.areaCodeInvalid]: "请输入有效的区号。"
};

// @key: @#@"region"@#@ @source: @#@"Region"@#@
// @key: @#@"[regionSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[regionSettingsMessages.dialingPlansChanged]"@#@ @source: @#@"The previous region is no longer supported for your account.\n    Please verify your new {regionSettingsLink}."@#@
// @key: @#@"regionSettings"@#@ @source: @#@"region settings"@#@
// @key: @#@"[regionSettingsMessages.areaCodeInvalid]"@#@ @source: @#@"Please enter a valid area code."@#@
