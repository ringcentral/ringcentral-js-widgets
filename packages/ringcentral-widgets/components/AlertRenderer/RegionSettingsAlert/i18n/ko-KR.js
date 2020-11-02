import regionSettingsMessages from 'ringcentral-integration/modules/RegionSettings/regionSettingsMessages';
export default {
  region: "지역",
  [regionSettingsMessages.saveSuccess]: "설정이 성공적으로 저장되었습니다.",
  [regionSettingsMessages.dialingPlansChanged]: "이전 지역은 계정에 대해 더 이상 지원되지 않습니다.\n    새 {regionSettingsLink}을(를) 확인하세요.",
  regionSettings: "지역 설정",
  [regionSettingsMessages.areaCodeInvalid]: "유효한 지역 코드를 입력하세요."
};

// @key: @#@"region"@#@ @source: @#@"Region"@#@
// @key: @#@"[regionSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[regionSettingsMessages.dialingPlansChanged]"@#@ @source: @#@"The previous region is no longer supported for your account.\n    Please verify your new {regionSettingsLink}."@#@
// @key: @#@"regionSettings"@#@ @source: @#@"region settings"@#@
// @key: @#@"[regionSettingsMessages.areaCodeInvalid]"@#@ @source: @#@"Please enter a valid area code."@#@
